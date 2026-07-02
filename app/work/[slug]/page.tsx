import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ScrollThread from "@/components/ScrollThread";
import ConsultationButton from "@/components/ConsultationButton";
import JsonLd from "@/components/JsonLd";
import {
  liveCaseStudies,
  getCaseStudy,
  nextCaseStudy,
  CASE_STUDY_CONTENT,
} from "@/lib/work";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return liveCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Work | Pink Tree Media" };
  return {
    title: `${study.name} | Pink Tree Media`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { images: [study.image] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const content = CASE_STUDY_CONTENT[slug];
  const next = nextCaseStudy(slug);

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.name,
    abstract: study.summary,
    url: `${SITE_URL}/work/${study.slug}`,
    image: `${SITE_URL}${study.image}`,
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const chapters: React.ReactNode[] = [];

  // 2 — The Challenge
  chapters.push(
    <section key="challenge">
      <h2 data-reveal className="text-eyebrow uppercase text-ink">
        The Challenge
      </h2>
      <p className="mt-8 max-w-[52ch] text-lede">{content.challenge}</p>
    </section>,
  );

  // 3 — What We Delivered (only applicable service areas)
  if (content.delivered.length > 0) {
    chapters.push(
      <section key="delivered">
        <h2 data-reveal className="text-eyebrow uppercase text-ink">
          What We Delivered
        </h2>
        <dl data-reveal-stagger className="mt-10 flex flex-col">
          {content.delivered.map((d, i) => (
            <div
              key={d.area}
              className={`border-b border-line py-8 md:py-10 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <dt className="font-display text-h3 font-light">{d.area}</dt>
              <dd className="mt-3 max-w-[52ch] text-ink">{d.line}</dd>
            </div>
          ))}
        </dl>
      </section>,
    );
  }

  // 4 — The Work (2 to 5 large images, loose mixed-width arrangement)
  chapters.push(
    <section key="work">
      <h2 data-reveal className="text-eyebrow uppercase text-ink">
        The Work
      </h2>
      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {content.work.map((img, i) => (
          <figure
            key={img.src}
            data-reveal
            className={i % 2 === 0 ? "w-full" : "w-full md:w-3/4 md:self-end"}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>,
  );

  // 5 — Results (only if measurable results exist)
  if (content.results && content.results.length > 0) {
    chapters.push(
      <section key="results">
        <h2 data-reveal className="text-eyebrow uppercase text-ink">
          Results
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {content.results.map((r) => (
            <li key={r} className="max-w-[52ch] text-lede">
              {r}
            </li>
          ))}
        </ul>
      </section>,
    );
  }

  // 6 — Next
  chapters.push(
    <section key="next">
      <h2 data-reveal className="text-eyebrow uppercase text-ink">Next</h2>
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group mt-8 inline-flex items-center gap-4"
        >
          <span className="font-display text-h2 font-light">{next.name}</span>
          <span
            aria-hidden
            className="inline-block w-10 border-t border-pink"
          />
        </Link>
      ) : (
        <Link
          href="/work"
          className="group mt-8 inline-flex items-center gap-4"
        >
          <span className="font-display text-h2 font-light">
            View all work
          </span>
          <span
            aria-hidden
            className="inline-block w-10 border-t border-pink"
          />
        </Link>
      )}
      <div className="mt-12">
        <ConsultationButton />
      </div>
    </section>,
  );

  return (
    <>
      <JsonLd data={creativeWorkJsonLd} />

      {/* 1 — Opener */}
      <PageHero
        align="bottom"
        image={study.image}
        imageAlt={study.imageAlt}
        title={study.name}
        subhead={study.positioning}
        minH="88vh"
      />

      {/* Chapters, separated by the pink thread */}
      <Container className="pb-[var(--space-section)]">
        {chapters.map((chapter, i) => (
          <div key={i}>
            <ScrollThread className="my-[var(--space-section)]" />
            {chapter}
          </div>
        ))}
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ScrollThread from "@/components/ScrollThread";
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

  // 4 — The Work. Balanced editorial rows: image on one side, text on the
  // other, alternating and vertically centred — not image-with-caption-stacked.
  chapters.push(
    <section key="work">
      <h2 data-reveal className="text-eyebrow uppercase text-ink">
        The Work
      </h2>
      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {content.work.map((img, i) => {
          const flip = i % 2 === 1; // odd rows put the image on the right
          return (
            <figure
              key={img.src}
              className="grid items-center gap-8 md:grid-cols-12 md:gap-14"
            >
              <div
                data-reveal-clip
                className={`md:col-span-7 ${flip ? "md:order-2" : "md:order-1"}`}
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption
                data-reveal
                className={`md:col-span-5 ${flip ? "md:order-1" : "md:order-2"}`}
              >
                <p className="text-eyebrow uppercase text-stone">
                  {String(i + 1).padStart(2, "0")} — {img.caption}
                </p>
                <p className="mt-5 max-w-[42ch] text-lede text-ink">
                  {img.blurb ?? img.caption}
                </p>
              </figcaption>
            </figure>
          );
        })}
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

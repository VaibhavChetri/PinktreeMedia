import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { visibleCaseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work | Pink Tree Media",
  description:
    "Selected work from Pink Tree Media, a marketing consultancy in Chigwell.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  const cases = visibleCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={["Depth over", "breadth."]}
        subhead="A small number of brands, handled completely. Each project shows the full breadth of what we do, through real work."
        image="/images/work-marquee-evening.png"
        imageAlt="An illuminated sailcloth event marquee glowing warm at night on the lawns of an English manor estate."
        minH="80vh"
      />
      <Container className="py-[var(--space-section)]">
      <div className="flex flex-col gap-[var(--space-section)]">
        {cases.map((c, i) => {
          const imageFirst = i % 2 === 0; // alternate alignment per row
          const media = (
            <div
              data-reveal-clip
              className={`overflow-hidden ${
                imageFirst ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`object-cover ${
                    c.live
                      ? "transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                      : "opacity-80"
                  }`}
                />
              </div>
            </div>
          );
          const body = (
            <div data-reveal className={imageFirst ? "md:order-2" : "md:order-1"}>
              <h2 className="font-display text-h2 font-light">{c.name}</h2>
              <p className="mt-4 max-w-[42ch] text-lede">{c.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {c.services.map((s) => (
                  <li key={s} className="text-eyebrow uppercase text-stone">
                    {s}
                  </li>
                ))}
              </ul>
              {c.live ? (
                <span className="mt-8 inline-flex items-center gap-3 text-eyebrow uppercase">
                  View case study
                  <span
                    aria-hidden
                    className="inline-block w-8 border-t border-pink"
                  />
                </span>
              ) : (
                <span className="mt-8 inline-flex items-center gap-3 text-eyebrow uppercase text-stone">
                  In preparation
                  <span
                    aria-hidden
                    className="inline-block w-8 border-t border-line"
                  />
                </span>
              )}
            </div>
          );
          return c.live ? (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              {media}
              {body}
            </Link>
          ) : (
            <div
              key={c.slug}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              {media}
              {body}
            </div>
          );
        })}
      </div>
      </Container>
    </>
  );
}

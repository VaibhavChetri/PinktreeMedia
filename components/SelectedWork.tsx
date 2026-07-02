import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import type { CaseStudy } from "@/lib/work";

// One large full-bleed block per case study. Accepts multiple for future work.
// Image hover scale is added in the Step 11 motion pass (frame is overflow-hidden).
export default function SelectedWork({ items }: { items: CaseStudy[] }) {
  return (
    <>
      {items.map((c) => (
        <Link
          key={c.slug}
          href={`/work/${c.slug}`}
          className="group relative block h-[78vh] min-h-[460px] w-full overflow-hidden"
        >
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
          />
          <Container className="relative flex h-full flex-col justify-end pb-[var(--space-section)]">
            <h2
              data-reveal
              className="font-display text-h2 font-light text-paper"
            >
              {c.name}
            </h2>
            <p className="mt-4 max-w-[46ch] text-paper/80">{c.summary}</p>
            <span className="mt-8 inline-flex items-center gap-3 text-eyebrow uppercase text-paper">
              View case study
              <span aria-hidden className="inline-block w-8 border-t border-pink" />
            </span>
          </Container>
        </Link>
      ))}
    </>
  );
}

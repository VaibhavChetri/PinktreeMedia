"use client";

import Image from "next/image";
import Container from "./Container";
import ConsultationButton from "./ConsultationButton";
import RevealLines from "./RevealLines";
import CursorSpotlight from "./CursorSpotlight";

// Reusable full-bleed page hero. The background sits in an oversized wrapper so
// MotionProvider's [data-parallax] can drift it on scroll, with a slow Ken Burns
// zoom on top; the headline reveals as masked kinetic lines. Sits under the
// transparent nav (mind Nav's darkHero list when adding a new page that uses it).
//   align="center" — vertically centred, left-anchored copy, home-style scrim.
//   align="bottom"  — copy pinned to the base, dark-from-bottom scrim (case study).
export default function PageHero({
  eyebrow,
  title,
  subhead,
  image,
  imageAlt,
  align = "center",
  minH = "82vh",
  priority = true,
  cta = false,
  spotlight = false,
}: {
  eyebrow?: string;
  title: string | string[];
  subhead?: string;
  image: string;
  imageAlt: string;
  align?: "center" | "bottom";
  minH?: string;
  priority?: boolean;
  cta?: boolean;
  spotlight?: boolean;
}) {
  const lines = Array.isArray(title) ? title : [title];
  const bottom = align === "bottom";

  return (
    <section
      className="relative flex w-full overflow-hidden"
      style={{ minHeight: minH }}
    >
      {/* Background — oversized (116% tall, offset up 8%) so the parallax drift
          and Ken Burns zoom never expose an edge. */}
      <div data-parallax className="absolute inset-x-0 -top-[8%] z-0 h-[116%]">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Scrim for legibility. */}
      <div
        aria-hidden
        className={`absolute inset-0 z-0 ${
          bottom
            ? "bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10"
            : "bg-[linear-gradient(to_right,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_52%,rgba(0,0,0,0.12)_100%)]"
        }`}
      />

      {spotlight && <CursorSpotlight />}

      <Container
        className={`relative z-[2] flex flex-col text-paper ${
          bottom
            ? "justify-end pb-[var(--space-section)] pt-[var(--nav-h)]"
            : "justify-center py-[var(--nav-h)]"
        }`}
      >
        {/* No ch-based max-width here: ch resolves against this div's body font,
            not the display serif, so it would clip the headline. Line breaks are
            controlled by passing `title` as an array of lines instead. */}
        <div className="max-w-[52rem]">
          {eyebrow && (
            <p className="mb-6 text-eyebrow uppercase text-paper/70">{eyebrow}</p>
          )}
          <RevealLines
            as="h1"
            lines={lines}
            className={`font-display font-light [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] ${
              bottom ? "text-h1" : "text-display"
            }`}
          />
          {/* the pink thread motif, echoing the home hero */}
          <div aria-hidden className="mt-8 h-px w-16 bg-pink" />
          {subhead && (
            <p className="mt-6 max-w-[42ch] text-lede text-paper/85 [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]">
              {subhead}
            </p>
          )}
          {cta && (
            <div className="mt-10">
              <ConsultationButton border="white" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

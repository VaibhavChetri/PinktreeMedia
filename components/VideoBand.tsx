"use client";

import { useEffect, useRef } from "react";
import Container from "./Container";
import RevealLines from "./RevealLines";

// Ambient full-bleed video band with an overlaid kinetic line. Muted + inline so
// it autoplays on mobile; the poster keeps it from flashing before the video
// paints. Reused across the service pages so the autoplay nudge lives in one place.
export default function VideoBand({
  src,
  poster,
  line,
  sub,
}: {
  src: string;
  poster: string;
  line: string | string[];
  sub?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Force muted as a DOM property and nudge play() — mobile browsers only
  // autoplay muted inline video; the catch keeps the poster if a browser blocks it.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  const lines = Array.isArray(line) ? line : [line];

  return (
    <section className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
      <video
        ref={ref}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25"
      />
      <Container className="relative z-[2] flex h-full flex-col justify-end pb-[var(--space-section)] text-paper">
        <RevealLines
          as="h2"
          lines={lines}
          trigger="scroll"
          className="max-w-[40rem] font-display text-h2 font-light [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]"
        />
        <div aria-hidden className="mt-6 h-px w-16 bg-pink" />
        {sub && (
          <p className="mt-6 max-w-[46ch] text-lede text-paper/85">{sub}</p>
        )}
      </Container>
    </section>
  );
}

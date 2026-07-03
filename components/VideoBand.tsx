"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import RevealLines from "./RevealLines";

// Ambient full-bleed video band with an overlaid kinetic line. The poster paints
// instantly; the video itself is deferred (preload="none", no autoPlay) and only
// loads + plays once the band is near the viewport — so it never competes with
// the hero LCP on initial page load. Muted + inline so it autoplays on mobile.
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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  // Arm the video only when the band approaches the viewport (300px early), so
  // the ~1–3 MB clip is never fetched during the initial load.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once armed, force muted (browsers only autoplay muted inline) and start it;
  // the catch keeps the poster if a browser blocks playback.
  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [active]);

  const lines = Array.isArray(line) ? line : [line];

  return (
    <section
      ref={sectionRef}
      className="relative h-[68vh] min-h-[420px] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
      >
        {active && <source src={src} type="video/mp4" />}
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

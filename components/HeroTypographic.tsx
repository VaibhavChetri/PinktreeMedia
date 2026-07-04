"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fraunces at optical size 144 — editorial thick/thin contrast. Shared by the
// h1 and the "ambitious" SVG so the outline matches the surrounding glyphs.
const HEADLINE_FONT: React.CSSProperties = {
  fontFamily: "var(--font-fraunces)",
  fontWeight: 400,
  fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
};

// The kinetic word: inline SVG <text> whose outline tweens into a solid fill.
// 1000 user units = 1em.
function Ambitious({
  textRef,
}: {
  textRef: React.RefObject<SVGTextElement | null>;
}) {
  const [w, setW] = useState(4400);

  useLayoutEffect(() => {
    const measure = () => {
      const t = textRef.current;
      if (t) setW(Math.ceil(t.getComputedTextLength()));
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
  }, [textRef]);

  return (
    <span style={{ display: "inline-block", verticalAlign: "baseline" }}>
      <svg
        aria-hidden
        viewBox={`0 0 ${w} 1000`}
        style={{
          height: "1em",
          width: `${w / 1000}em`,
          overflow: "visible",
          verticalAlign: "baseline",
          lineHeight: 0,
          transform: "translateY(0.06em)",
        }}
      >
        <text
          ref={textRef}
          x="0"
          y="1000"
          vectorEffect="non-scaling-stroke"
          strokeWidth={1}
          fillOpacity={0}
          style={{
            ...HEADLINE_FONT,
            fontSize: "1000px",
            letterSpacing: "-40px",
            fill: "var(--color-pink)",
            stroke: "var(--color-pink)",
          }}
        >
          ambitious
        </text>
      </svg>
    </span>
  );
}

export default function HeroTypographic() {
  const rootRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const ambitiousRef = useRef<SVGTextElement>(null);

  const setLine = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) lineRefs.current[i] = el;
  };

  useLayoutEffect(() => {
    const lines = lineRefs.current;
    const videoWrap = videoWrapRef.current;
    const scrim = scrimRef.current;
    const word = ambitiousRef.current;
    const videoEl = videoWrap?.querySelector("video");
    if (lines.length < 4) return;

    // Reduced motion: final state on load; hold the video on its first frame.
    if (prefersReduced()) {
      gsap.set(lines, { opacity: 1, y: 0 });
      if (videoWrap) gsap.set(videoWrap, { opacity: 1, scale: 1, filter: "blur(0px)" });
      if (scrim) gsap.set(scrim, { opacity: 1 });
      videoEl?.pause();
      if (word) gsap.set(word, { attr: { "stroke-width": 0, "fill-opacity": 1 } });
      return;
    }

    const ease = CustomEase.create("heroSoft", "M0,0 C0.22,1 0.36,1 1,1");

    const ctx = gsap.context(() => {
      if (videoWrap) gsap.set(videoWrap, { opacity: 0, scale: 1.16, filter: "blur(16px)" });
      if (scrim) gsap.set(scrim, { opacity: 0 });
      gsap.set(lines, { opacity: 0, y: 40 });

      const t = gsap.timeline({ defaults: { ease } });
      // Cinematic focus-in, then an endless slow Ken Burns drift.
      if (videoWrap) {
        t.to(videoWrap, { opacity: 1, scale: 1.06, filter: "blur(0px)", duration: 1.8 }, 0);
        gsap.to(videoWrap, {
          scale: 1.14,
          duration: 20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        });
      }
      if (scrim) t.to(scrim, { opacity: 1, duration: 1.4 }, 0.2);
      t.to(lines[0], { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .to(lines[1], { opacity: 1, y: 0, duration: 0.9 }, 0.85)
        .to(lines[2], { opacity: 1, y: 0, duration: 0.9 }, 1.0)
        .to(lines[3], { opacity: 1, y: 0, duration: 0.9 }, 1.15);
      if (word)
        t.to(word, { attr: { "stroke-width": 0, "fill-opacity": 1 }, duration: 0.9 }, 2.1);

      // Subtle, lerped cursor parallax on the video — fine pointer only.
      if (videoWrap && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(videoWrap, "xPercent", { duration: 0.9, ease: "power3" });
        const yTo = gsap.quickTo(videoWrap, "yPercent", { duration: 0.9, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -1.6);
          yTo((e.clientY / window.innerHeight - 0.5) * -1.6);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-paper"
    >
      {/* Full-bleed cinematic video — the glowing brand mark is the ambient light */}
      <div ref={videoWrapRef} className="absolute inset-[-4%] z-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src="/video/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* Directional scrim (heavy bottom-left) + soft vignette, token-based */}
      <div
        ref={scrimRef}
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top right, color-mix(in srgb, var(--color-ink) 90%, transparent) 0%, color-mix(in srgb, var(--color-ink) 52%, transparent) 46%, color-mix(in srgb, var(--color-ink) 10%, transparent) 100%), radial-gradient(120% 120% at 70% 34%, transparent 44%, color-mix(in srgb, var(--color-ink) 58%, transparent) 100%)",
        }}
      />

      {/* Filmic grain */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-[0.12] mix-blend-soft-light"
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Headline only — weighted low-left, generous negative space */}
      <div className="relative z-[3] mx-auto flex h-full max-w-[1600px] flex-col justify-end px-[clamp(32px,6vw,96px)] pb-[clamp(72px,12vh,150px)]">
        <h1
          className="text-left text-paper"
          style={{
            ...HEADLINE_FONT,
            fontSize: "clamp(40px, min(7.5vw, 11vh), 128px)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
          }}
        >
          <span ref={setLine(0)} className="block">
            Complete
          </span>
          <span ref={setLine(1)} className="block">
            marketing
          </span>
          <span ref={setLine(2)} className="block">
            for <Ambitious textRef={ambitiousRef} />
          </span>
          <span ref={setLine(3)} className="block">
            brands.
          </span>
        </h1>
      </div>
    </section>
  );
}

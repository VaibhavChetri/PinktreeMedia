"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The signature pink thread, drawn. A hairline track with a pink fill that
// scales from 0 -> full height, scrubbed to scroll — so the thread appears to
// draw itself as each chapter passes. Drop-in replacement for <PinkThread />.
// The fill starts visible (scaleY 1) so reduced-motion / no-JS shows a normal
// solid thread; JS re-arms it to draw only when motion is allowed.
export default function ScrollThread({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fill = el.querySelector<HTMLElement>("[data-fill]");
    if (!fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 52%",
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`mx-auto h-16 w-px overflow-hidden bg-line ${className}`}
    >
      <div
        data-fill
        className="h-full w-full origin-top bg-pink"
        style={{ transform: "scaleY(1)" }}
      />
    </div>
  );
}

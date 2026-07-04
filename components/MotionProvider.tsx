"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "@studio-freight/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// All site motion. Every effect short-circuits under prefers-reduced-motion,
// leaving content in its natural (visible, unscaled) state. Only the motions
// defined in the PRD tokens are used: reveal, hero scale, and (in CSS) hover.
export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Smooth scroll (lerp 0.1), synced to ScrollTrigger and driven by the GSAP
  // ticker so both share one clock. Set up once.
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Reveals + hero scale. Re-scanned per route (the layout provider persists
  // across client navigations, so this must depend on pathname).
  useEffect(() => {
    if (prefersReduced()) return;

    // --ease-out-soft = cubic-bezier(0.22, 1, 0.36, 1)
    const outSoft = CustomEase.create("outSoft", "M0,0 C0.22,1 0.36,1 1,1");

    // Elements already on screen at load must NOT animate in — only elements
    // that enter the viewport during scroll do. (Compose-on-scroll, not pop-in.)
    const inViewOnLoad = (el: HTMLElement) =>
      el.getBoundingClientRect().top < window.innerHeight * 0.9;

    const ctx = gsap.context(() => {
      // Reveal: opacity 0->1, translateY 40->0, 900ms, trigger at 75% viewport.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (inViewOnLoad(el)) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: outSoft,
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
      });

      // Staggered groups: direct children reveal 120ms apart.
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-stagger]")
        .forEach((group) => {
          if (inViewOnLoad(group)) return;
          gsap.from(Array.from(group.children), {
            opacity: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.12,
            ease: outSoft,
            scrollTrigger: { trigger: group, start: "top 75%" },
          });
        });

      // Clip-path reveal: image wipes in from the top as it scrolls into view.
      gsap.utils.toArray<HTMLElement>("[data-reveal-clip]").forEach((el) => {
        if (inViewOnLoad(el)) return;
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: outSoft,
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });

      // Parallax: full-bleed hero backgrounds (oversized wrappers) drift down
      // as the page scrolls, at a fraction of scroll speed. Not gated by
      // inViewOnLoad — heroes start in view and the scrub must run immediately.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // (Home hero motion now lives in HeroTypographic's own timeline.)
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}

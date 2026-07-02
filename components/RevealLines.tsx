"use client";

import {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

// Layout effect on the client (runs before paint, so the hidden start state is
// set without a flash); plain effect on the server (no-op, avoids the SSR warning).
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Kinetic headline: each line sits in an overflow-hidden mask and rises into
// view (yPercent 115 -> 0). This is the site's "bigger" reveal — distinct from
// the home hero's simple word fade. SSR renders the text in its natural, visible
// position (good for LCP/SEO/no-JS); JS hides then reveals it. Under
// prefers-reduced-motion the animation is skipped and the text just stays put.
export default function RevealLines({
  text,
  lines,
  as = "h1",
  className = "",
  delay = 0.15,
  trigger = "load",
}: {
  text?: string;
  lines?: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const ref = useRef<HTMLElement>(null);
  const rows = lines ?? (text ? [text] : []);

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.querySelectorAll<HTMLElement>("[data-line]");
    if (!inner.length) return;

    const ease = CustomEase.create("outSoftLines", "M0,0 C0.22,1 0.36,1 1,1");
    const ctx = gsap.context(() => {
      gsap.set(inner, { yPercent: 115 });
      gsap.to(inner, {
        yPercent: 0,
        duration: 0.95,
        stagger: 0.09,
        delay: trigger === "load" ? delay : 0,
        ease,
        scrollTrigger:
          trigger === "scroll" ? { trigger: el, start: "top 82%" } : undefined,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const children: ReactNode = rows.map((line, i) =>
    createElement(
      "span",
      { key: i, className: "block overflow-hidden pb-[0.12em]" },
      createElement(
        "span",
        { "data-line": "", className: "block will-change-transform" },
        line,
      ),
    ),
  );

  return createElement(as, { ref, className }, children);
}

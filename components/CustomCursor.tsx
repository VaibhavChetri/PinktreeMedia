"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Custom cursor: a pink dot that tracks the pointer exactly + a ring that trails
// with lerp and scales up over interactive elements. Also applies a subtle
// magnetic pull to [data-magnetic] elements. Desktop (fine pointer) only, and
// disabled under prefers-reduced-motion (native cursor stays).
export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    enabledRef.current = true;
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a,button,[data-cursor-hover]");
    const onOver = (e: PointerEvent) => {
      if (isInteractive(e.target)) hovering = true;
    };
    const onOut = (e: PointerEvent) => {
      if (isInteractive(e.target)) hovering = false;
    };
    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const show = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "0.9";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${hovering ? 0 : 1})`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 1.7 : 1})`;
      raf = requestAnimationFrame(tick);
    };
    show();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // Magnetic pull on [data-magnetic], re-bound per route (layout persists).
  useEffect(() => {
    if (!enabledRef.current) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const clamp = (v: number) => Math.max(-12, Math.min(12, v));
    const cleanups = els.map((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${clamp(dx * 0.3)}px, ${clamp(dy * 0.3)}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 border border-pink opacity-0 transition-opacity duration-300 md:block"
        style={{ borderRadius: "9999px", willChange: "transform" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 bg-pink opacity-0 md:block"
        style={{ borderRadius: "9999px", willChange: "transform" }}
      />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

// A soft pink glow that trails the pointer inside its positioned parent — the
// "premium interactive feel without WebGL" the animation reference endorses in
// place of the Lusion fluid effect. Lerped for a liquid lag, faded out when the
// pointer leaves. Desktop (fine pointer) + motion only; otherwise it renders
// invisible (no ambient glow), so nothing changes for reduced-motion/touch.
export default function CursorSpotlight({
  size = 380,
  color = "222,128,179", // --pink as an rgb tri: rgb(222,128,179)
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!active) {
        // jump to the entry point so the glow doesn't sweep in from a corner
        cx = tx;
        cy = ty;
        active = true;
      }
    };
    const onLeave = () => {
      active = false;
    };

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.setProperty("--sx", `${cx}px`);
      el.style.setProperty("--sy", `${cy}px`);
      el.style.opacity = active ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 ease-[var(--ease-out-soft)] ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 50%), rgba(${color},0.24), rgba(${color},0.08) 40%, transparent 68%)`,
        mixBlendMode: "screen",
      }}
    />
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Spawns small work images that drift up-right and fade as the cursor moves over
// the wrapped area — a "peek behind the work" effect. Desktop (fine pointer)
// only; disabled under prefers-reduced-motion. Sharp corners (brand) come from
// the global border-radius:0 rule.
//
// Contextual images: pass `groups` keyed by a row's [data-trail-key] and each
// line spawns its own relevant photos (e.g. print work over "Print & Merchandise").
// Falls back to the flat `images` pool when a row has no matching group. Nothing
// spawns when the cursor is between rows, so the imagery always stays on-context.
export default function CursorImageTrail({
  images,
  groups,
  children,
  className = "",
}: {
  images?: string[];
  groups?: Record<string, string[]>;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;
    const root = ref.current;
    if (!root) return;

    let lastX = 0;
    let lastY = 0;
    let primed = false;
    // Per-row cycle counters, so each capability steps through its own set.
    const counters = new Map<string, number>();

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!primed) {
        lastX = x;
        lastY = y;
        primed = true;
        return;
      }
      // Slightly longer spacing than before — calmer, less clutter.
      if (Math.hypot(x - lastX, y - lastY) < 120) return;
      lastX = x;
      lastY = y;

      // Which capability row is under the cursor? Spawn that row's photos.
      const el =
        e.target instanceof Element
          ? e.target.closest("[data-trail-key]")
          : null;
      const key = el?.getAttribute("data-trail-key") ?? "";
      const pool = groups && key && groups[key] ? groups[key] : images;
      if (!pool || !pool.length) return; // between rows / no context -> no spawn

      const n = counters.get(key) ?? 0;
      counters.set(key, n + 1);

      const img = document.createElement("img");
      img.src = pool[n % pool.length];
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      Object.assign(img.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "180px",
        height: "120px",
        objectFit: "cover",
        transform: "translate(-50%, -50%) scale(0.96)",
        opacity: "1",
        pointerEvents: "none",
        zIndex: "0",
        // Slower, more languid drift + fade (was 1.2s).
        transition:
          "transform 1.8s var(--ease-out-soft), opacity 1.8s var(--ease-out-soft)",
        willChange: "transform, opacity",
      });
      root.appendChild(img);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          img.style.opacity = "0";
          img.style.transform =
            "translate(calc(-50% + 42px), calc(-50% - 42px)) scale(1.04)";
        }),
      );
      window.setTimeout(() => img.remove(), 1900);
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, [images, groups]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* content sits above the spawned images (which are z-0) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

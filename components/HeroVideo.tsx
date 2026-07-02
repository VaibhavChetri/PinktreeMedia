"use client";

import { useEffect, useRef, useState } from "react";

// Cinematic hero sizzle, overlaid on the poster still (which stays as SSR/LCP
// image and as the fallback). Lazy-mounts AFTER first paint so LCP is the poster.
// Source by viewport: >=1024 the full 1080p cut, otherwise the lighter 720p
// (~2 MB) on phones and tablets. prefers-reduced-motion gets the poster only.
// Muted + playsInline so it autoplays inline on iOS/Android; sits at z0 above
// the image, under the gradient (z1) and content (z2).
export default function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones/tablets get the 720p cut, desktop the 1080p. Mobile plays too now.
    setSrc(window.innerWidth < 1024 ? "/video/hero-720.mp4" : "/video/hero.mp4");
  }, []);

  // Force `muted` as a DOM property (React can miss it) and nudge play() —
  // mobile browsers only autoplay muted + inline video. If a browser still
  // blocks it (e.g. iOS Low Power Mode), the catch keeps the poster visible.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-poster.jpg"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

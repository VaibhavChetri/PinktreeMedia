"use client";

import { useEffect, useState } from "react";

// Cinematic hero sizzle, overlaid on the poster still (which stays as SSR/LCP
// image and as the fallback). Lazy-mounts AFTER first paint so LCP is the poster.
// Source by viewport: >=1024 full 1080p, 768-1023 the 720p cut, <768 no video
// (poster only). prefers-reduced-motion also gets poster only. Muted/looped so
// it autoplays; sits at z0 above the image, under the gradient (z1) and content.
export default function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = window.innerWidth;
    if (w < 768) return; // mobile: poster only, never download the video
    setSrc(w < 1024 ? "/video/hero-720.mp4" : "/video/hero.mp4");
  }, []);

  if (!src) return null;

  return (
    <video
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

"use client";

import { useEffect, useRef, useState } from "react";

// Trust Signals as a physics pile: client-name pills drop in, collide, settle,
// and can be dragged/thrown. DOM pills are driven by a Matter.js world (so the
// names keep the Sentient serif + brand colours). Runs on phones too now;
// only prefers-reduced-motion gets a static, quiet list instead.
export default function TrustBadges({ names }: { names: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [physics, setPhysics] = useState(false);

  useEffect(() => {
    // Physics runs everywhere now (phones included) — Matter's Mouse binds touch
    // events, so drag/throw works on touch too. Only reduced-motion opts out.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduced) setPhysics(true);
    // ponytail: touch-drag on a pill throws it instead of scrolling; fine on this
    // short section. Add touch-action guards only if scroll-trapping is reported.
  }, []);

  useEffect(() => {
    if (!physics) return;
    const el = containerRef.current;
    if (!el) return;
    const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-pill]"));
    if (!pills.length) return;

    let cleanup = () => {};
    let cancelled = false;
    let started = false;

    // The drop is armed but only fires once the section scrolls into view, so it
    // lands as a surprise. Matter.js is loaded lazily here (never on mobile).
    const start = () => {
      if (started || cancelled) return;
      started = true;
      void (async () => {
      let Matter;
      try {
        Matter = (await import("matter-js")).default;
      } catch {
        // chunk failed to load (offline / redeploy 404 / blocked) — fall back to
        // the visible static list rather than stranding the pills at opacity:0.
        if (!cancelled) setPhysics(false);
        return;
      }
      if (cancelled || !containerRef.current) return;

      const W = el.clientWidth;
      const H = el.clientHeight;
      const {
        Engine,
        Runner,
        Bodies,
        Composite,
        Mouse,
        MouseConstraint,
      } = Matter;

      const engine = Engine.create();
      engine.gravity.y = 1;

    // Cache each pill's half-size once (fixed-size spans). Reading
    // offsetWidth/Height inside the RAF sync would force a layout reflow/frame.
    const dims = pills.map((p) => ({ hw: p.offsetWidth / 2, hh: p.offsetHeight / 2 }));

    const bodies = pills.map((p, i) => {
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      const slot = ((i + 1) * W) / (pills.length + 1);
      const x = Math.min(Math.max(w / 2 + 12, slot), W - w / 2 - 12);
      const y = -140 - i * 130; // staggered above, so they drop in sequence
      return Bodies.rectangle(x, y, w, h, {
        restitution: 0.25,
        friction: 0.6,
        frictionAir: 0.02,
        chamfer: { radius: h / 2 },
      });
    });

    const wall = { isStatic: true, render: { visible: false } };
    // Rest the pile on a shelf a few px inside the container, not on the very
    // bottom edge: the container clips at y=H (overflow-hidden), so a floor whose
    // top is exactly H shaves the pills' rounded bottoms and they read as
    // half-submerged. FLOOR_INSET lifts the surface so they touch it and sit
    // fully visible, blush showing beneath.
    const FLOOR_INSET = 24;
    const floorTop = H - FLOOR_INSET;
    const walls = [
      Bodies.rectangle(W / 2, floorTop + 40, W + 400, 80, wall), // floor top at H - FLOOR_INSET
      Bodies.rectangle(-40, H / 2, 80, H * 3, wall), // left
      Bodies.rectangle(W + 40, H / 2, 80, H * 3, wall), // right
    ];

    Composite.add(engine.world, [...bodies, ...walls]);

    const mouse = Mouse.create(el);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mc);
    // let the page keep scrolling when the wheel is over the pile
    el.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);

    pills.forEach((p) => {
      p.style.position = "absolute";
      p.style.left = "0";
      p.style.top = "0";
      p.style.opacity = "1";
      p.style.willChange = "transform";
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    let raf = 0;
    const sync = () => {
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        pills[i].style.transform = `translate(${b.position.x - dims[i].hw}px, ${
          b.position.y - dims[i].hh
        }px) rotate(${b.angle}rad)`;
      }
      raf = requestAnimationFrame(sync);
    };
    sync();

      cleanup = () => {
        cancelAnimationFrame(raf);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
      })();
    };

    // Arm: drop the pills only when ~a third of the section is in view.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, [physics]);

  if (!physics) {
    // Static fallback (SSR default, mobile, reduced motion): quiet wordmarks.
    return (
      <ul className="mt-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-x-14 md:gap-y-6">
        {names.map((name) => (
          <li key={name} className="text-lede text-stone">
            {name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-10 h-[440px] w-full select-none overflow-hidden"
      aria-label="Selected clients"
    >
      {names.map((name, i) => (
        <span
          key={name}
          data-pill
          className={`font-display text-[clamp(1.1rem,2vw,1.6rem)] font-light whitespace-nowrap bg-ink px-7 py-4 text-paper ${
            i === 1 ? "border border-pink" : ""
          }`}
          style={{ borderRadius: "9999px", opacity: 0 }}
          data-cursor-hover
        >
          {name}
        </span>
      ))}
    </div>
  );
}

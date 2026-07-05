# Pink Tree Media — project notes

Luxury marketing-consultancy site (Chigwell/London). Next.js 15 App Router · React 19 ·
Tailwind CSS v4 (`@theme` tokens) · GSAP + ScrollTrigger + Lenis · framer-motion (CTA) ·
next/font. Positioning: exclusive, understated, evening/cinematic — "photography and
typography do the talking."

## Design direction — "Dusk" (dark-dominant night gallery)

The whole site is a warm plum-black night world with rose as living light. The **home page**
descends dark → a single **blush (dusty-rose) daylight band** at "Selected clients" → back to
dark; interior pages stay fully dark. The dark cinematic **video hero** on the home page is
preserved as-is.

Chosen over a light-dominant option because PTM's world is evening (marquees at night, luxury
hospitality, dusk imagery) and it makes the whole site feel like the hero.

## Tokens — all in `app/globals.css` `@theme`. Never hardcode these in components.

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#191016` | warm plum-black — default surface + type-on-light |
| `--color-paper` | `#f6eef0` | pink-cast pearl — type-on-dark + light surfaces |
| `--color-pink` | `#e486b3` | rose — living accent/glow (on dark) |
| `--color-pink-deep` | `#b85c8b` | rose-deep — accent on light, hover |
| `--color-stone` | `#9e8e9a` | mauve-grey — captions/meta/eyebrows (tinted, not neutral) |
| `--color-line` | `#e4d8e0` | pearl-mauve hairline |
| `--color-blush` | `#e4cfd9` | dusty-rose "daylight" band (home only) |
| `--color-dusk-0..3` | `#191016 → #3c2a3d` | progressive dark section backgrounds |

- `body` defaults to **dark** (`--color-ink` bg, `--color-paper` text). Any **light band sets
  its own bg AND text** (e.g. home `Selected clients` = `bg-[--color-blush]` + `text-ink/70`).
- **Contrast rule (WCAG AA):** text only sits on clearly-dark or clearly-light surfaces, never on
  the muddy mid-dusk tones. Dusk transitions live in image/gradient "breaths," not under text.

## Type

- **Display: Fraunces** (variable, `opsz`/`SOFT`/`WONK`) — site-wide via `--font-display`, set on
  all `h1–h4` with `font-variation-settings: "opsz" 60, "SOFT" 24, "WONK" 0`. The hero h1 uses
  opsz 144. (Sentient was removed — Fraunces is the one characterful face.)
- **Body/UI: General Sans** (`--font-sans`), weights 400/500.

## Signature elements

- **The rose line** — `components/ScrollThread.tsx`, a hairline that draws down on scroll
  (scaleY, scrub). The site's one orchestrated motion moment.
- **Liquid-glass CTA** — `components/ui/liquid-glass-button.tsx`: an SVG `feTurbulence →
  feDisplacementMap` filter applied as `backdrop-filter`, so the button refracts the rose glow
  behind it (Chromium; Safari/Firefox fall back to frosted blur). Rounded (the one place the
  global `border-radius: 0` is intentionally broken). Used in the home closing CTA.
- **Client badge-fall** — `components/TrustBadges.tsx`, matter-js physics pile on the blush band.

## Component notes

- `ConsultationButton` — `variant="ghost"` (nav/persistent) or `"glass"`; `border="pink" | "white"`.
- `lib/utils.ts` `cn()` — minimal class combiner (no clsx/tailwind-merge; add if conflict-merge needed).
- `components/ui/` — shadcn-style folder for imported components.

## Motion & a11y (non-negotiable)

- Respect `prefers-reduced-motion` everywhere (GSAP guards, framer `useReducedMotion`, the global
  CSS rule). Content is visible with JS off / reduced motion on.
- `:focus-visible` uses `currentColor` so the ring is visible on dark and light.
- Transform/opacity only; images lazy-loaded with `aspect-ratio` to avoid CLS.

## Dev workflow gotchas

- **Do NOT run `pnpm build` while `next dev` is running** — they share `.next` and it corrupts the
  dev server (ENOENT on manifests). Stop dev → `rm -rf .next` → build → `rm -rf .next` → restart dev.
- Type-check without touching `.next`: `pnpm exec tsc --noEmit`.

## Forbidden (reads as generic / AI-slop)

Cream + terracotta; near-black + a single neon accent; `01/02/03` section markers; gradient stat
cards; default Tailwind blue; glassmorphism *cards*; Playfair Display; scattered micro-effects on
everything (one orchestrated moment only).

## Known follow-ups

- Scroll-reveals (`[data-reveal*]` via `MotionProvider`) hide below-fold content at opacity 0 until
  scrolled. Safe for no-JS/reduced-motion (stays visible), but a static/crawler render sees voids.
  Consider a visible-by-default reveal (CSS class + ScrollTrigger toggle) if SEO of below-fold copy matters.
- `framer-motion` is only used by the CTA path now; removable if that changes.

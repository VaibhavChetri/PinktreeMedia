import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import VideoBand from "@/components/VideoBand";

export const metadata: Metadata = {
  title: "Design & Branding | Pink Tree Media",
  description:
    "Brand strategy, identity and art direction for ambitious brands — identities built to endure, not to trend.",
  alternates: { canonical: "/services/design-branding" },
};

const OFFERINGS = [
  {
    t: "Brand strategy & positioning",
    d: "Where the brand sits, who it speaks to, and the idea it stands on.",
  },
  {
    t: "Logo & visual identity",
    d: "A distinct mark and a complete visual language around it.",
  },
  {
    t: "Typography & colour systems",
    d: "Considered type and palette that hold together everywhere.",
  },
  {
    t: "Brand guidelines",
    d: "A single reference so the brand stays itself as it grows.",
  },
  {
    t: "Art direction",
    d: "The look and feel of every photograph, layout and touchpoint.",
  },
];

const PROCESS = [
  { t: "Discover", d: "We learn the business, the market and the ambition." },
  { t: "Define", d: "We shape the strategy and the idea it rests on." },
  { t: "Design", d: "We build the identity, in detail, until it sings." },
  { t: "Deliver", d: "We hand over a system your team can run with." },
];

export default function DesignBrandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Service — Design & Branding"
        title={["Design &", "Branding"]}
        subhead="We shape the whole visual world of a brand — the mark, the palette, the type, the tone — into something coherent, considered and unmistakably yours."
        image="/images/services/design-hero.webp"
        imageAlt="Luxury brand identity materials — embossed cards, a blush leather guidelines book and colour swatches — on dark stone."
        cta
      />

      {/* Intro */}
      <Container className="py-[var(--space-section)]">
        <div className="grid gap-10 md:grid-cols-12">
          <h2
            data-reveal
            className="font-display text-h2 font-light md:col-span-7"
          >
            Identities built to endure, not to trend.
          </h2>
          <p
            data-reveal
            className="self-end text-lede text-stone md:col-span-5"
          >
            A luxury identity is a hundred small decisions made consistently. We
            make them with you, and then we make them repeatable.
          </p>
        </div>
      </Container>

      {/* What's included */}
      <Container className="pb-[var(--space-section)]">
        <p className="text-eyebrow uppercase text-stone">What&rsquo;s included</p>
        <ul data-reveal-stagger className="mt-10 flex flex-col">
          {OFFERINGS.map((o, i) => (
            <li
              key={o.t}
              className={`flex flex-col gap-2 border-b border-line py-7 md:flex-row md:items-baseline md:justify-between md:gap-12 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <span className="font-display text-h3 font-light">{o.t}</span>
              <span className="max-w-[46ch] text-stone md:text-right">
                {o.d}
              </span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Gallery */}
      <Container className="pb-[var(--space-section)]">
        <div className="flex flex-col gap-16 md:gap-24">
          <figure data-reveal-clip className="w-full">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/design-detail.webp"
                alt="Macro detail of a debossed monogram pressed into cotton paper with blush foil."
                fill
                sizes="(min-width: 768px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Debossed identity detail
            </figcaption>
          </figure>
          <figure data-reveal-clip className="w-full md:w-3/4 md:self-end">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/design-process.webp"
                alt="A designer's dark desk with mood boards, type specimens and fabric swatches."
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Art direction & mood
            </figcaption>
          </figure>
        </div>
      </Container>

      <VideoBand
        src="/video/services/design.mp4"
        poster="/images/services/design-video-poster.jpg"
        line={["Every detail,", "deliberate."]}
        sub="Nothing on the page by accident. Every choice earns its place."
      />

      {/* How we work */}
      <Container className="py-[var(--space-section)]">
        <p className="text-eyebrow uppercase text-stone">How we work</p>
        <ol
          data-reveal-stagger
          className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8"
        >
          {PROCESS.map((s, i) => (
            <li key={s.t}>
              <span className="text-eyebrow uppercase text-pink">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-h3 font-light">{s.t}</h3>
              <p className="mt-3 text-stone">{s.d}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}

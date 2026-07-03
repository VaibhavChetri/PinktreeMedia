import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import VideoBand from "@/components/VideoBand";

export const metadata: Metadata = {
  title: "Print & Merchandise | Pink Tree Media",
  description:
    "Brochures, stationery, packaging and branded merchandise — objects worth keeping, produced with care.",
  alternates: { canonical: "/services/print-merchandise" },
};

const OFFERINGS = [
  {
    t: "Brochures & lookbooks",
    d: "Editorial print that carries the brand at full weight.",
  },
  {
    t: "Stationery & collateral",
    d: "Cards, folders and the everyday pieces, done properly.",
  },
  { t: "Packaging", d: "The first thing held and the last thing remembered." },
  {
    t: "Branded merchandise",
    d: "Considered objects people actually want to keep.",
  },
  {
    t: "Large-format & signage",
    d: "Presence at scale, from event to storefront.",
  },
];

const PROCESS = [
  { t: "Specify", d: "Stocks, finishes and formats chosen with intent." },
  { t: "Prototype", d: "We proof and hold the real thing before the run." },
  { t: "Produce", d: "Managed production with trusted print partners." },
  { t: "Finish", d: "Foils, embossing and the details that elevate it." },
];

export default function PrintMerchandisePage() {
  return (
    <>
      <PageHero
        eyebrow="Service — Print & Merchandise"
        title={["Print &", "Merchandise"]}
        subhead="From the first press sheet to the final flourish, we produce print and merchandise that feels as considered in the hand as it looks on screen."
        image="/images/services/print-hero.webp"
        imageAlt="A stack of luxury printed brochures with matte and spot-gloss finishes on a dark walnut table."
        cta
      />

      {/* Intro */}
      <Container className="py-[var(--space-section)]">
        <div className="grid gap-10 md:grid-cols-12">
          <h2
            data-reveal
            className="font-display text-h2 font-light md:col-span-7"
          >
            Objects worth keeping.
          </h2>
          <p
            data-reveal
            className="self-end text-lede text-stone md:col-span-5"
          >
            Screens are borrowed; print is owned. We make the tangible pieces of
            a brand feel like they were meant to last.
          </p>
        </div>
      </Container>

      {/* Gallery — placed early: the material speaks first */}
      <Container className="pb-[var(--space-section)]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <figure data-reveal-clip>
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/print-merch.webp"
                alt="Branded merchandise flat lay — tote, enamel pin and letterpress cards on dark linen."
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Branded merchandise
            </figcaption>
          </figure>
          <figure data-reveal-clip className="md:mt-24">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/print-detail.webp"
                alt="Macro detail of foil-stamped packaging with a silk ribbon and wax seal."
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Finish & detail
            </figcaption>
          </figure>
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

      <VideoBand
        src="/video/services/print.mp4"
        poster="/images/services/print-video-poster.jpg"
        line={["Made to", "be held."]}
        sub="The weight of the stock, the bite of the emboss — details you feel before you read a word."
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

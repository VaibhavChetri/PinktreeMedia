import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import VideoBand from "@/components/VideoBand";

export const metadata: Metadata = {
  title: "Websites & Digital | Pink Tree Media",
  description:
    "Website design and build, digital product and motion — elegant, fast, and engineered to last.",
  alternates: { canonical: "/services/websites-digital" },
};

const OFFERINGS = [
  {
    t: "Website design & build",
    d: "Bespoke sites, designed and engineered end to end.",
  },
  {
    t: "Digital product & UI",
    d: "Interfaces that stay clear as the product grows.",
  },
  {
    t: "Motion & interaction",
    d: "Considered movement that guides, never distracts.",
  },
  {
    t: "CMS & content",
    d: "Editing your team can own without breaking the design.",
  },
  {
    t: "Performance & SEO",
    d: "Fast, findable, and built on solid technical ground.",
  },
];

const PROCESS = [
  { t: "Architect", d: "Structure, content model and the shape of the flow." },
  { t: "Design", d: "Interface and motion, resolved to the pixel." },
  { t: "Build", d: "Clean, fast front-end engineering you can trust." },
  { t: "Launch", d: "Tested, measured and handed over with care." },
];

export default function WebsitesDigitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Service — Websites & Digital"
        title={["Websites", "& Digital"]}
        subhead="We design and build fast, elegant websites and digital products — refined interfaces, thoughtful motion, and engineering that quietly holds it all together."
        image="/images/services/web-hero.png"
        imageAlt="A sleek laptop and phone showing an elegant minimal website, blush rim light on a dark desk."
        cta
        spotlight
      />

      {/* Intro */}
      <Container className="py-[var(--space-section)]">
        <div className="grid gap-10 md:grid-cols-12">
          <h2
            data-reveal
            className="font-display text-h2 font-light md:col-span-7"
          >
            Digital experiences with restraint.
          </h2>
          <p
            data-reveal
            className="self-end text-lede text-stone md:col-span-5"
          >
            The best interface disappears. We design digital that feels
            effortless because the effort went somewhere you can&rsquo;t see.
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

      <VideoBand
        src="/video/services/web.mp4"
        poster="/images/services/web-video-poster.jpg"
        line={["Considered", "in motion."]}
        sub="Interfaces that move with intent — every transition earns its keep."
      />

      {/* Gallery */}
      <Container className="py-[var(--space-section)]">
        <div className="flex flex-col gap-16 md:gap-24">
          <figure data-reveal-clip className="w-full md:w-3/4">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/web-ui.png"
                alt="An abstract elegant interface glowing on a monitor in a dim studio."
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Interface & system
            </figcaption>
          </figure>
          <figure data-reveal-clip className="w-full md:w-3/4 md:self-end">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/web-code.png"
                alt="Hands typing on a premium keyboard with warm screen glow in a dim studio."
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-eyebrow uppercase text-stone">
              Engineering & build
            </figcaption>
          </figure>
        </div>
      </Container>

      {/* How we work */}
      <Container className="pb-[var(--space-section)]">
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

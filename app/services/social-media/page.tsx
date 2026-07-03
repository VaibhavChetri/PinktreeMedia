import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import VideoBand from "@/components/VideoBand";

export const metadata: Metadata = {
  title: "Social Media | Pink Tree Media",
  description:
    "Social strategy, art direction and content — a feed with a point of view, built to grow the right audience.",
  alternates: { canonical: "/services/social-media" },
};

const OFFERINGS = [
  {
    t: "Content strategy",
    d: "A clear plan for what to say, and why it matters.",
  },
  {
    t: "Art direction & shoots",
    d: "A consistent, considered look across every post.",
  },
  {
    t: "Community management",
    d: "A voice that shows up and sounds like the brand.",
  },
  { t: "Paid social", d: "Campaigns that reach the right people, well." },
  {
    t: "Reporting & insight",
    d: "The numbers that matter, read plainly.",
  },
];

const PROCESS = [
  { t: "Plan", d: "Calendar, pillars and the story across the month." },
  { t: "Create", d: "Art-directed content, shot and edited in-house." },
  { t: "Publish", d: "Scheduled, captioned and community-managed." },
  { t: "Grow", d: "We read the data and sharpen what works." },
];

export default function SocialMediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service — Social Media"
        title={["Social", "Media"]}
        subhead="We craft social content and campaigns that carry a brand's voice with consistency and taste — art-directed, on-message, and built to grow an audience worth having."
        image="/images/services/social-hero-notext.webp"
        imageAlt="A styled social content flat lay — a phone showing an editorial feed, peonies and props on a dark surface."
        cta
      />

      {/* Intro */}
      <Container className="py-[var(--space-section)]">
        <div className="grid gap-10 md:grid-cols-12">
          <h2
            data-reveal
            className="font-display text-h2 font-light md:col-span-7"
          >
            A feed with a point of view.
          </h2>
          <p
            data-reveal
            className="self-end text-lede text-stone md:col-span-5"
          >
            Anyone can post. We build a presence — a considered, recognisable
            voice that compounds a little more every week.
          </p>
        </div>
      </Container>

      {/* Gallery — a curated three, like a feed */}
      <Container className="pb-[var(--space-section)]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          <figure data-reveal-clip className="col-span-2 md:col-span-2">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/images/services/social-feed.webp"
                alt="A curated grid of editorial lifestyle photographs laid out like a social feed."
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
          <figure data-reveal-clip>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/services/social-studio.webp"
                alt="A content-creation setup with camera and softbox in a chic dark interior."
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
        <p className="mt-6 text-eyebrow uppercase text-stone">
          Art direction, shoot & feed
        </p>
      </Container>

      <VideoBand
        src="/video/services/social.mp4"
        poster="/images/services/social-video-poster.jpg"
        line={["Presence,", "cultivated."]}
        sub="Consistency is the whole game. We show up, on brand, every single day."
      />

      {/* What's included */}
      <Container className="py-[var(--space-section)]">
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

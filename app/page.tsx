import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { BeamButton } from "@/components/ui/beam-button";
import SelectedWork from "@/components/SelectedWork";
import HeroTypographic from "@/components/HeroTypographic";
import CursorImageTrail from "@/components/CursorImageTrail";
import TrustBadges from "@/components/TrustBadges";

// Context-matched imagery for the capability-index cursor trail: each line
// spawns photos relevant to that capability. Websites/Social use the closest
// available placeholders until real per-service work is supplied.
const CAPABILITY_IMAGES: Record<string, string[]> = {
  "Design & Branding": [
    "/images/chigwell-stationery-flatlay.jpg",
    "/images/chigwell-brochure-detail.jpg",
    "/images/chigwell-marquee-night.jpg",
  ],
  "Print & Merchandise": [
    "/images/chigwell-brochure-detail.jpg",
    "/images/chigwell-stationery-flatlay.jpg",
  ],
  "Websites & Digital": [
    "/images/hero-evening-city.jpg",
    "/images/architecture-dusk.jpg",
  ],
  "Social Media": [
    "/images/interior-hospitality.jpg",
    "/images/fine-dining-detail.jpg",
    "/images/manor-house-golden.jpg",
  ],
};
import JsonLd from "@/components/JsonLd";
import { liveCaseStudies } from "@/lib/work";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pink Tree Media | Marketing Consultancy, Chigwell",
  description:
    "A UK luxury creative consultancy. Complete marketing solutions for ambitious brands.",
  alternates: { canonical: "/" },
};

// Organization + LocalBusiness (verified facts, PRD sections 2 and 10).
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-dark.png`,
      foundingDate: "2014",
      email: "info@pinktreemedia.com",
      telephone: "+44 20 7193 1033",
      sameAs: [
        "https://facebook.com/pinktreemediauk",
        "https://instagram.com/pinktreemediauk",
      ],
    },
    {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/images/hero-evening-city.jpg`,
      email: "info@pinktreemedia.com",
      telephone: "+44 20 7193 1033",
      address: {
        "@type": "PostalAddress",
        streetAddress: "High Road",
        addressLocality: "Chigwell",
        addressRegion: "Essex",
        postalCode: "IG7 5BD",
        addressCountry: "GB",
      },
    },
  ],
};

const CAPABILITIES = [
  "Design & Branding",
  "Print & Merchandise",
  "Websites & Digital",
  "Social Media",
];

// Each capability now has its own service page (was all -> /work).
const SERVICE_HREFS: Record<string, string> = {
  "Design & Branding": "/services/design-branding",
  "Print & Merchandise": "/services/print-merchandise",
  "Websites & Digital": "/services/websites-digital",
  "Social Media": "/services/social-media",
};

// Selected clients / brands (matches the v1 roster).
const SELECTED_CLIENTS = [
  "The Chigwell Marquees",
  "Aya Beauty",
  "Central Restaurant & Lounge",
  "North Mymms Park",
  "Swifty Beats",
];


export default function Home() {
  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* 1 — Hero (kinetic typography, light) */}
      <HeroTypographic />

      {/* 2 — Who we are (dusk: dark plum, pearl type) */}
      <section className="bg-[var(--color-dusk-0)] pb-[var(--space-section)] pt-[calc(var(--space-section)/2)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-9">
              <h2 className="mb-10 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-stone">
                The consultancy
              </h2>
              <p className="max-w-[720px] font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.3] text-paper">
                A luxury creative consultancy handling every aspect of a
                brand&rsquo;s marketing under one roof, quietly and{" "}
                <span className="text-pink">exceptionally</span> well.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — What we do (dusk: lifted plum). Editorial index, hairline rows. */}
      <section className="bg-[var(--color-dusk-1)] py-[var(--space-section)]">
        <Container>
          <CursorImageTrail groups={CAPABILITY_IMAGES}>
            <ul>
              {CAPABILITIES.map((capability, i) => (
                <li key={capability} data-trail-key={capability}>
                  <Link
                    href={SERVICE_HREFS[capability]}
                    className={`group flex items-center justify-between border-b border-white/12 py-7 ${
                      i === 0 ? "border-t border-white/12" : ""
                    }`}
                  >
                    <span className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-light text-paper transition-colors duration-300 group-hover:text-pink">
                      {capability}
                    </span>
                    <span
                      aria-hidden
                      className="translate-x-2 font-sans text-2xl text-stone opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </CursorImageTrail>
          <p className="mt-12 text-lede">
            <Link
              href="/work"
              className="text-stone transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:text-pink"
            >
              Demonstrated through our work, not our brochure.
            </Link>
          </p>
        </Container>
      </section>

      {/* 4 — Selected work — dusk breaks into daylight: plum resolves to blush. */}
      <section
        className="pb-[var(--space-section)] pt-[var(--space-section)]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-dusk-1) 0%, var(--color-blush) 46%)",
        }}
      >
        <Container>
          <p className="text-eyebrow uppercase text-stone">Selected work</p>
        </Container>
        <div className="mt-10 md:mt-14">
          <SelectedWork items={liveCaseStudies()} />
        </div>
      </section>

      {/* 5 — Trust signals — the light band. Client pills fall on the blush. */}
      <section className="bg-[var(--color-blush)] py-[var(--space-section)]">
        <Container>
          <h2 className="text-eyebrow uppercase text-ink/70">Selected clients</h2>
          <TrustBadges names={SELECTED_CLIENTS} />
        </Container>
      </section>

      {/* 6 — Closing. Rose glow refracted through liquid glass; night holds. */}
      <section
        className="relative py-[calc(var(--space-section)*1.4)]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-blush) 0%, var(--color-dusk-3) 32%)",
        }}
      >
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em] text-paper">
            Start a <span className="text-pink">conversation.</span>
          </h2>
          <div className="mt-11">
            <BeamButton />
          </div>
        </Container>
      </section>
    </>
  );
}

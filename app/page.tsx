import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import ConsultationButton from "@/components/ConsultationButton";
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

      {/* 2 — Who we are. 7/12 column, 5/12 deliberately empty (negative space). */}
      <section className="bg-paper py-[var(--space-section)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7" data-reveal-stagger>
              {/* label is General Sans, not the display serif */}
              <h2 className="mb-12 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-stone">
                The consultancy
              </h2>
              <p className="max-w-[640px] font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-light leading-[1.5] text-ink">
                A luxury creative consultancy handling every aspect of a
                brand&rsquo;s marketing under one roof, quietly and
                exceptionally well.
              </p>
            </div>
            <div className="hidden md:col-span-5 md:block" aria-hidden />
          </div>
        </Container>
      </section>

      {/* 3 — What we do. Editorial index: hairline rows, hover reveals a pink
          name + a sliding arrow. Rows link to the work (services live there). */}
      <section className="bg-paper pb-[var(--space-section)]">
        <Container>
          <CursorImageTrail groups={CAPABILITY_IMAGES}>
          <ul data-reveal-stagger>
            {CAPABILITIES.map((capability, i) => (
              <li key={capability} data-trail-key={capability}>
                <Link
                  href={SERVICE_HREFS[capability]}
                  className={`group flex items-center justify-between border-b border-line py-6 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <span className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-light text-ink transition-colors duration-300 group-hover:text-pink">
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

      {/* 4 — Selected work. No top padding: section 3's pb-[--space-section]
          already provides the gap (one boundary, one gap). */}
      <section className="bg-paper">
        <Container>
          <p className="text-eyebrow uppercase text-stone">Selected work</p>
        </Container>
        <div className="mt-10 md:mt-14">
          <SelectedWork items={liveCaseStudies()} />
        </div>
      </section>

      {/* 5 — Trust signals */}
      <section className="bg-paper py-[var(--space-section)]">
        <Container>
          <h2 data-reveal className="text-eyebrow uppercase text-ink">
            Selected clients
          </h2>
          <TrustBadges names={SELECTED_CLIENTS} />
        </Container>
      </section>

      {/* 6 — Closing CTA */}
      <section className="relative min-h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/architecture-dusk.jpg"
          alt="A modern building facade at dusk with a single window glowing warm."
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/40"
        />
        <Container className="relative flex min-h-[60vh] flex-col items-start justify-center py-[var(--space-section)] text-paper">
          <h2
            data-reveal
            className="max-w-[24ch] font-display text-h2 font-light"
          >
            Start a conversation.
          </h2>
          <div className="mt-10">
            <ConsultationButton />
          </div>
        </Container>
      </section>
    </>
  );
}

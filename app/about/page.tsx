import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About | Pink Tree Media",
  description:
    "A UK luxury creative consultancy built on taste, restraint and the long view. Complete marketing solutions for ambitious brands.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={["A consultancy built", "on taste, restraint", "and the long view."]}
        image="/images/about-rose-wide.png"
        video="/video/about-rose-wide.mp4"
        imageAlt="A luminous plume of rose ink blooming and unfurling in deep plum-black space — an idea taking form."
        minH="100svh"
      />
      <Container className="py-[var(--space-section)]">
      {/* Experience — wide texture band */}
      <section>
        <div
          data-reveal-clip
          className="relative aspect-[21/9] w-full overflow-hidden"
        >
          <Image
            src="/images/about-texture.jpg"
            alt="A macro of dark handmade paper with a single hairline of pink light."
            fill
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-12 md:grid md:grid-cols-2 md:gap-16">
          <h2 className="text-eyebrow uppercase text-stone">Experience</h2>
          <p className="mt-6 max-w-[46ch] text-lede md:mt-0">
            Years of work across luxury hospitality, events, beauty and
            lifestyle. Brands where presentation is everything and detail
            is non-negotiable.
          </p>
        </div>
      </section>

      {/* Approach — image left, text right */}
      <section className="mt-[var(--space-section)] grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div
          data-reveal-clip
          className="relative aspect-[3/2] w-full overflow-hidden"
        >
          <Image
            src="/images/interior-hospitality.jpg"
            alt="A candle-lit luxury restaurant interior at night."
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-eyebrow uppercase text-stone">Approach</h2>
          <p className="mt-6 max-w-[46ch] text-lede">
            Everything under one roof. Design and branding, print and
            merchandise, websites and digital, social media. All considered
            together, never in silos.
          </p>
        </div>
      </section>

      {/* Quality — text left, image right */}
      <section className="mt-[var(--space-section)] grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:order-2">
          <div
            data-reveal-clip
            className="relative aspect-[3/2] w-full overflow-hidden"
          >
            <Image
              src="/images/architecture-dusk.jpg"
              alt="A modern building facade at dusk with a single window glowing warm."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:order-1">
          <h2 className="text-eyebrow uppercase text-stone">Quality</h2>
          <p className="mt-6 max-w-[46ch] text-lede">
            We measure ourselves on craft. Fewer projects, more attention;
            nothing leaves the studio until it is genuinely worthy of the brands
            we serve.
          </p>
        </div>
      </section>

      {/* Partnership — text block */}
      <section className="mt-[var(--space-section)] md:grid md:grid-cols-2 md:gap-16">
        <h2 className="text-eyebrow uppercase text-stone">Partnership</h2>
        <p className="mt-6 max-w-[46ch] text-lede md:mt-0">
          We work with a small number of clients for the long term, as a
          trusted partner invested in the reputation we help to build.
        </p>
      </section>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | Pink Tree Media",
  description:
    "Tell us about your brand. Contact Pink Tree Media in Chigwell by email or telephone.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Start a", "conversation."]}
        subhead="A UK luxury creative consultancy. Complete marketing solutions for ambitious brands."
        image="/images/architecture-dusk.jpg"
        imageAlt="A modern building facade at dusk with a single window glowing warm."
        minH="64vh"
        spotlight
      />
      <Container className="py-[var(--space-section)]">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Left — clickable contact details */}
          <div>
            <div>
              <p className="text-eyebrow uppercase text-ink">Email</p>
              <p className="mt-3 text-h3 break-words">
                <a
                  href="mailto:info@pinktreemedia.com"
                  className="font-display font-light transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:text-pink-deep"
                >
                  info@pinktreemedia.com
                </a>
              </p>
            </div>

            <div className="mt-10">
              <p className="text-eyebrow uppercase text-ink">Telephone</p>
              <p className="mt-3 text-lede">
                <a
                  href="tel:+442071931033"
                  className="transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:text-pink-deep"
                >
                  +44 (0) 20 7193 1033
                </a>
              </p>
            </div>

            <div className="mt-10">
              <p className="text-eyebrow uppercase text-ink">Studio</p>
              <p className="mt-3 text-lede">
                High Road, Chigwell
                <br />
                IG7 5BD
              </p>
            </div>
          </div>

          {/* Right — the form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}

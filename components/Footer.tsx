import Image from "next/image";
import Container from "./Container";
import ThreadLink from "./ThreadLink";

const SOCIAL = [
  { href: "https://facebook.com/pinktreemediauk", label: "Facebook" },
  { href: "https://instagram.com/pinktreemediauk", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      {/* generous scale; extra bottom padding on mobile clears the fixed CTA bar */}
      <Container className="pt-28 pb-[calc(var(--space-section)+88px)] md:pt-40 md:pb-40">
        {/* brand mark — 32px, centred, above the columns */}
        <Image
          src="/brand/mark.avif"
          alt="Pink Tree Media"
          width={96}
          height={96}
          className="mx-auto mb-12 h-8 w-auto"
        />

        {/* big invitation — the footer's focal point */}
        <p className="text-eyebrow uppercase text-stone">Get in touch</p>
        <ThreadLink
          href="mailto:info@pinktreemedia.com"
          className="mt-6 font-display text-[clamp(1.5rem,5vw,3.5rem)] font-light leading-[1.05] text-paper"
        >
          info@pinktreemedia.com
        </ThreadLink>

        <div className="mt-16 h-px w-full bg-white/10" />

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-eyebrow uppercase text-stone">Telephone</p>
            <p className="mt-4 text-lede">
              <a
                href="tel:+442071931033"
                className="transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:text-pink"
              >
                +44 (0) 20 7193 1033
              </a>
            </p>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-stone">Studio</p>
            <p className="mt-4 text-lede">
              High Road, Chigwell
              <br />
              IG7 5BD
            </p>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-stone">Follow</p>
            <div className="mt-4 flex flex-col items-start gap-1 text-lede">
              {SOCIAL.map((s) => (
                <ThreadLink
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </ThreadLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          {/* bigger footer logo (48px, intrinsic ratio 129:32) */}
          <Image
            src="/brand/logo-light.png"
            alt="Pink Tree Media"
            width={194}
            height={48}
            className="block w-auto"
          />
          <p className="text-eyebrow uppercase text-stone">
            &copy; {year} Pink Tree Media
          </p>
        </div>
      </Container>
    </footer>
  );
}

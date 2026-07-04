"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultationButton from "./ConsultationButton";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock scroll + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Every page opens with a dark/cinematic hero under the transparent nav, so
  // the nav is paper (white) at the top and flips to ink once it turns solid
  // (paper + hairline) after 80px of scroll — or when the mobile menu is open.
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[500ms] ease-[var(--ease-out-soft)] ${
        solid ? "text-ink" : "text-paper"
      } ${
        solid && !menuOpen
          ? "border-b border-line bg-paper"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--nav-h)] max-w-[var(--shell-max)] items-center justify-between px-[var(--gutter)]">
        <Link
          href="/"
          aria-label="Pink Tree Media, home"
          className="relative z-[60] flex items-center gap-3"
        >
          {/* Mark at 20px, auto width; wordmark 12px General Sans, tracked. */}
          <Image
            src="/brand/mark.avif"
            alt="Pink Tree Media"
            width={96}
            height={96}
            priority
            className="h-5 w-auto"
          />
          <span
            className="font-sans font-medium"
            style={{ fontSize: "12px", letterSpacing: "0.15em" }}
          >
            PINK TREE MEDIA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="text-[15px] font-normal uppercase tracking-[0.1em] transition-opacity duration-[500ms] ease-[var(--ease-out-soft)] hover:opacity-60"
                  >
                    <span className={active ? "border-b border-pink pb-1" : ""}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ConsultationButton border={solid ? "pink" : "white"} />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] text-current md:hidden"
          data-cursor-hover
        >
          <span
            className={`block h-px w-7 bg-current transition-transform duration-300 ease-[var(--ease-out-soft)] ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-7 bg-current transition-transform duration-300 ease-[var(--ease-out-soft)] ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-paper px-[var(--gutter)] pb-[var(--space-section)] pt-[var(--nav-h)] text-ink transition-opacity duration-500 ease-[var(--ease-out-soft)] md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-3">
          {LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-[clamp(2.75rem,13vw,4rem)] font-light leading-[1.05] ${
                  active ? "text-pink" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ConsultationButton className="w-full" />
      </div>
    </header>
  );
}

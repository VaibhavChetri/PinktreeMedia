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
  // Pages that open with a dark full-bleed hero under the transparent nav.
  // Home, the work/about/contact heroes, and every case-study opener.
  const darkHero =
    pathname === "/" ||
    pathname === "/work" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    /^\/work\/[^/]+$/.test(pathname);
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

  // Paper mode = dark logo + ink text (scrolled, non-hero page, or menu open).
  const paperMode = scrolled || !darkHero || menuOpen;
  const solid = scrolled || !darkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[500ms] ease-[var(--ease-out-soft)] ${
        paperMode
          ? "text-ink"
          : "text-paper"
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
          className="relative z-[60] flex items-center"
        >
          {/* 48px on mobile, 56px on desktop. Widths keep the logo's true 4.04
              ratio so it fills the height without letterboxing or distortion.
              fill + fixed-ratio wrapper: no next/image warning, no flex-shrink. */}
          <span className="relative block h-12 w-[194px] md:h-14 md:w-[226px]">
            <Image
              src={paperMode ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
              alt="Pink Tree Media"
              fill
              priority
              sizes="178px"
              className="object-contain object-left"
            />
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

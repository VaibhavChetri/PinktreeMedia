import Link from "next/link";

// Persistent CTA. Ghost style, 1px --pink border, uppercase 12px label.
// On hover, fills --pink over 400ms. Hover text is --ink: the sampled pink is
// light, so --paper text on it fails contrast (2.6:1); --ink clears 7:1. Rest
// colour inherits from parent (paper over the hero, ink on paper) via text-current.
export default function ConsultationButton({
  className = "",
  border = "pink",
  variant = "ghost",
}: {
  className?: string;
  // Border tone. Pink is the brand signature (default); white only over the
  // dark hero (nav). Chosen by prop, not stacked classes, so there is no
  // Tailwind source-order conflict.
  border?: "pink" | "white";
  // "ghost" = persistent nav/hero CTA. "glass" = the primary closing CTA:
  // frosted glass (translucent + backdrop-blur) with a bright top highlight and
  // a soft rose glow. Best sat over a glow/gradient so the frost has depth.
  variant?: "ghost" | "glass";
}) {
  if (variant === "glass") {
    return (
      <Link
        href="/contact"
        data-magnetic
        className={`inline-flex items-center justify-center border border-white/25 bg-white/[0.08] px-8 py-4 text-eyebrow uppercase text-paper transition-[background-color,transform] duration-[400ms] ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-white/[0.16] ${className}`}
        style={{
          backdropFilter: "blur(14px) saturate(1.3)",
          WebkitBackdropFilter: "blur(14px) saturate(1.3)",
          boxShadow:
            "inset 0 1px 0 0 rgba(246,238,240,0.35), 0 20px 50px -22px rgba(228,134,179,0.55)",
        }}
      >
        Request a Consultation
      </Link>
    );
  }
  const borderClass = border === "white" ? "border-white" : "border-pink";
  return (
    <Link
      href="/contact"
      data-magnetic
      className={`inline-flex items-center justify-center border ${borderClass} px-6 py-3 text-eyebrow uppercase text-current transition-colors duration-[400ms] ease-[var(--ease-out-soft)] hover:bg-pink hover:text-ink ${className}`}
    >
      Request a Consultation
    </Link>
  );
}

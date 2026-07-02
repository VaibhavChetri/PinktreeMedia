import Link from "next/link";

// Persistent CTA. Ghost style, 1px --pink border, uppercase 12px label.
// On hover, fills --pink over 400ms. Hover text is --ink: the sampled pink is
// light, so --paper text on it fails contrast (2.6:1); --ink clears 7:1. Rest
// colour inherits from parent (paper over the hero, ink on paper) via text-current.
export default function ConsultationButton({
  className = "",
  border = "pink",
}: {
  className?: string;
  // Border tone. Pink is the brand signature (default); white only over the
  // dark hero (nav). Chosen by prop, not stacked classes, so there is no
  // Tailwind source-order conflict.
  border?: "pink" | "white";
}) {
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

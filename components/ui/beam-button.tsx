"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

// Closing CTA. A dark editorial pill with a rose light-comet tracing its border
// (the `.cta-beam` ring in globals.css — a conic gradient masked to the rim,
// rotated via @property --cta-angle). At rest the comet orbits slowly to catch
// the eye; on hover the beam speeds up, a rose gradient wipes in from the left,
// the label flips to ink for contrast, and an arrow slides out — a clear, warm
// "click me". Rounded (the one place the global radius-0 rule is broken).
export function BeamButton({
  href = "/contact",
  label = "Request a Consultation",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-magnetic
      className={cn(
        "cta-beam group relative inline-flex items-center justify-center overflow-hidden border border-paper/20 bg-ink/50 px-10 py-4 text-eyebrow uppercase text-paper backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_20px_50px_-20px_rgba(228,134,179,0.7)]",
        className,
      )}
      style={{ borderRadius: "9999px" }}
    >
      {/* rose fill — wipes in from the left on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 opacity-0 transition-[transform,opacity] duration-[600ms] ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-hover:opacity-100"
        style={{
          borderRadius: "inherit",
          background:
            "linear-gradient(90deg, var(--color-pink-deep), var(--color-pink))",
        }}
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
        {label}
      </span>
      {/* arrow — slides out on hover */}
      <span
        aria-hidden
        className="relative z-10 w-0 -translate-x-2 overflow-hidden text-base leading-none opacity-0 transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:ml-2 group-hover:w-4 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100"
      >
        →
      </span>
    </Link>
  );
}

import Link from "next/link";
import type { ComponentProps } from "react";

// Signature "thread" link: a 1px pink underline that draws in from the left on
// hover (scaleX — GPU-only, no layout) and retracts on leave. Brand ease, 400ms.
// Under prefers-reduced-motion the transition is neutralised globally, so the
// underline simply toggles instantly — still a valid hover affordance.
// (Scaffolded via the 21st.dev Magic MCP, then reduced to the brand tokens.)
export default function ThreadLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={`group relative inline-block ${className}`}>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-pink transition-transform duration-[400ms] ease-[var(--ease-out-soft)] group-hover:scale-x-100"
      />
    </Link>
  );
}

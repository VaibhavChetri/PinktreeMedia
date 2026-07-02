import type { ReactNode } from "react";

// Centred content shell: max-width 1440, token gutters (24 mobile / 48 desktop).
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--shell-max)] px-[var(--gutter)] ${className}`}
    >
      {children}
    </div>
  );
}

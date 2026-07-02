// The signature pink thread: a single 1px vertical line. Used as the divider
// between case study chapters, and beneath the hero headline.
export default function PinkThread({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`mx-auto h-16 w-px bg-pink ${className}`}
    />
  );
}

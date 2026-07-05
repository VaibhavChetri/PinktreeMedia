// Minimal shadcn-style class combiner. (No clsx/tailwind-merge dependency: our
// usage only concatenates conditional class strings, so a filtered join covers
// it. Swap in twMerge(clsx(...)) if class-conflict de-duping is ever needed.)
export type ClassValue = string | number | null | false | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

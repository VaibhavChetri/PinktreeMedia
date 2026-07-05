import localFont from "next/font/local";
import { Fraunces } from "next/font/google";

// Editorial display serif — the site-wide display face (via --font-display and
// --font-fraunces). opsz/SOFT/WONK give real thick/thin editorial character;
// opsz is driven through font-variation-settings on headings.
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body and UI. Weights 400 (Regular) and 500 (Medium) per PRD.
export const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

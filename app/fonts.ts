import localFont from "next/font/local";

// Display serif — headlines only. Weights 300 (Light) and 400 (Regular) per PRD.
export const sentient = localFont({
  src: [
    { path: "../public/fonts/Sentient-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Sentient-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-sentient",
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

import type { Metadata } from "next";
import { generalSans, fraunces } from "./fonts";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import CustomCursor from "@/components/CustomCursor";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pink Tree Media | Marketing Consultancy, Chigwell",
  description:
    "An exclusive marketing consultancy for ambitious brands. Established 2014 in Chigwell.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: ["/images/hero-evening-city.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${fraunces.variable}`}
    >
      <body>
        <MotionProvider>
          <CustomCursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

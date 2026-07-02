import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy WordPress portfolio URLs -> new Work section.
      // Specific case first, then the catch-all for every other portfolio item.
      {
        source: "/portfolio-item/the-chigwell-marquees",
        destination: "/work/the-chigwell-marquees",
        permanent: true,
      },
      {
        source: "/portfolio-item/the-chigwell-marquees/",
        destination: "/work/the-chigwell-marquees",
        permanent: true,
      },
      {
        source: "/portfolio-item",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/portfolio-item/:slug*",
        destination: "/work",
        permanent: true,
      },
      // Trailing-slash legacy URLs for the pages we kept.
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;

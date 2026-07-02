// Case study data — the single source for Home selected work, the Work index,
// and the case study template. Only The Chigwell Marquees is live at launch;
// Chigwell Hall and Novikov are placeholders, hidden unless
// SHOW_PLACEHOLDER_CASES=true (defaults to false).

export type CaseStudy = {
  slug: string;
  name: string;
  summary: string; // one-line summary (Home + Work index)
  positioning: string; // one-line client positioning (case study opener)
  image: string; // opener / index image
  imageAlt: string;
  services: string[]; // capability tags shown on the Work index
  live: boolean; // false = "in preparation" (shown on the index, no case page)
};

export type Delivered = { area: string; line: string };
export type WorkImage = { src: string; alt: string; caption: string };
export type CaseStudyContent = {
  challenge: string; // <= 50 words
  delivered: Delivered[]; // empty -> chapter omitted
  work: WorkImage[]; // 2-5 images
  results?: string[]; // omitted entirely when no measurable results exist
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "the-chigwell-marquees",
    name: "The Chigwell Marquees",
    summary: "A complete brand world for an exceptional private venue.",
    positioning:
      "Two luxury event venues on the grounds of Chigwell Hall, Essex.",
    image: "/images/chigwell-marquee-night.jpg",
    imageAlt:
      "An illuminated event marquee at night on the grounds of an English manor estate.",
    services: [
      "Design & Branding",
      "Print & Merchandise",
      "Websites & Digital",
      "Social Media",
    ],
    live: true,
  },
  {
    slug: "aya-beauty",
    name: "Aya Beauty",
    summary: "Case study in preparation.",
    positioning: "A luxury beauty brand.",
    image: "/images/about-texture.jpg",
    imageAlt: "Abstract dark textured paper with a single hairline of pink light.",
    services: ["Design & Branding", "Websites & Digital", "Social Media"],
    live: false,
  },
  {
    slug: "swifty-beats",
    name: "Swifty Beats",
    summary: "Case study in preparation.",
    positioning: "A music and audio brand.",
    image: "/images/architecture-dusk.jpg",
    imageAlt: "A modern building facade at dusk with one window glowing warm.",
    services: ["Design & Branding", "Social Media"],
    live: false,
  },
  {
    slug: "central-restaurant-lounge",
    name: "Central Restaurant & Lounge",
    summary: "Case study in preparation.",
    positioning: "A contemporary restaurant and lounge.",
    image: "/images/interior-hospitality.jpg",
    imageAlt: "A candle-lit luxury restaurant interior at night.",
    services: ["Design & Branding", "Print & Merchandise", "Social Media"],
    live: false,
  },
  {
    slug: "north-mymms-park",
    name: "North Mymms Park",
    summary: "Case study in preparation.",
    positioning: "A Grade II listed country estate.",
    image: "/images/manor-house-golden.jpg",
    imageAlt: "An English manor house at golden hour behind a long lawn.",
    services: ["Design & Branding", "Websites & Digital", "Print & Merchandise"],
    live: false,
  },
];

export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {
  "the-chigwell-marquees": {
    challenge:
      "Two new luxury event venues on the grounds of Chigwell Hall needed a brand of their own: a distinct identity, print and a digital presence to introduce them to the market and to stand apart from the estate itself.",
    delivered: [
      {
        area: "Design & Branding",
        line: "A distinct logo and visual identity for the two venues.",
      },
      {
        area: "Print & Merchandise",
        line: "A venue brochure, printed collateral and branded merchandise.",
      },
      {
        area: "Websites & Digital",
        line: "Design and development of thechigwellmarquees.com.",
      },
    ],
    work: [
      {
        src: "/images/chigwell-stationery-flatlay.jpg",
        alt: "Brand stationery for the venues laid out on dark linen.",
        caption: "Brand stationery",
      },
      {
        src: "/images/chigwell-brochure-detail.jpg",
        alt: "A macro detail of the printed venue brochure.",
        caption: "Venue brochure",
      },
    ],
    // Results chapter omitted: no measurable results verified.
  },
};

// Live cases only (Home selected work + case-study routing).
export const liveCaseStudies = () => CASE_STUDIES.filter((c) => c.live);

// Every case shown on the Work index (live + "in preparation").
export const visibleCaseStudies = () => CASE_STUDIES;

// Only live cases get a case-study page; "in preparation" rows are not linked.
export const getCaseStudy = (slug: string) =>
  liveCaseStudies().find((c) => c.slug === slug);

// The next live case study after the given slug, wrapping; null if it is the only one.
export const nextCaseStudy = (slug: string) => {
  const list = liveCaseStudies();
  if (list.length < 2) return null;
  const i = list.findIndex((c) => c.slug === slug);
  return list[(i + 1) % list.length];
};

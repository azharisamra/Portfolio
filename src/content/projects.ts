export interface ProjectImage {
  /** Path under public/. */
  src: string;
  /** Written for a screen reader: what is actually on screen, not keywords. */
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Human-readable, e.g. "Jun – Aug 2023". */
  timeframe: string;
  /**
   * The problem this solves for a person, in one sentence, naming no
   * technology. First draft — rewrite the wording.
   */
  problem: string;
  description: string;
  stack: readonly string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  /** Omitted when no real screenshot exists. */
  image?: ProjectImage;
}

export const projects: readonly Project[] = [
  {
    slug: "portfolio",
    title: "This Portfolio",
    timeframe: "2026",
    problem:
      "Someone deciding whether to read further has under a minute, and most personal sites spend it on decoration instead of saying what the person builds and how to reach them.",
    description:
      "The site you are reading. Next.js App Router with React Server Components, TypeScript in strict mode, and Tailwind CSS v4 driven by a single token block. Light and dark themes run off CSS custom properties with no flash on first paint, every string is served from a typed content module, and the social preview image is generated from that same data so it cannot drift.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://samraazhari.netlify.app",
    repoUrl: "https://github.com/azharisamra/Portfolio",
    featured: true,
    image: {
      src: "/images/portfolio-home.webp",
      alt: "This portfolio in dark mode: the name set large in condensed capitals, a role line in orange, a short bio, and a rule-separated list of contact links above the Selected Work heading.",
      width: 1408,
      height: 880,
    },
  },
  {
    slug: "artify",
    title: "Artify",
    timeframe: "Jul 2025",
    // Rewritten to match the deployed site, which is an AI image-generation
    // product rather than the artist showcase this previously described.
    problem:
      "Wanting a specific image and having no way to make it — hiring an illustrator costs more than the idea is worth, and stock libraries never have the exact thing.",
    description:
      "Marketing site for an AI image-generation product, with hero, features, how-it-works, gallery and pricing sections. Built with Next.js and Framer Motion.",
    stack: ["Next.js", "Framer Motion"],
    liveUrl: "https://artifying.netlify.app/",
    repoUrl: "https://github.com/azharisamra/artify",
    featured: true,
    image: {
      src: "/images/artify-landing.webp",
      alt: "The Artify landing page. A large headline reads \u201cTransform your ideas into stunning artwork with AI\u201d above two buttons, beside a photograph of a person holding a phone.",
      width: 1408,
      height: 880,
    },
  },
  {
    slug: "athletee",
    title: "Athletee",
    timeframe: "Jul 2025",
    problem:
      "Athletes and sports brands depend on platforms they don't own and can't shape to present themselves the way they want.",
    description: "Next.js and Framer Motion animated athlete site.",
    stack: ["Next.js", "Framer Motion"],
    liveUrl: "https://athletee.netlify.app/",
    repoUrl: "https://github.com/azharisamra/athletes-sports",
    featured: true,
    image: {
      src: "/images/athletee-landing.webp",
      alt: "The Athletee landing page. \u201cAthlete Showcase\u201d is set in large type on a black background, with a countdown timer and a panel linking to a live stream.",
      width: 1408,
      height: 880,
    },
  },
];

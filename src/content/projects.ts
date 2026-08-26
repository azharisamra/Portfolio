import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    slug: "household-finance-app",
    title: "Household Finance App",
    period: "2025 — Present",
    summary:
      "React and Firebase expense tracker with real-time two-user sync, proportional bill splitting, and shared savings goals. Deployed on Netlify.",
    tags: ["React", "Firebase", "Real-time sync", "Netlify"],
    imageSrc: "/assets/projects/ExpenseApp.png",
  },
  {
    slug: "artify",
    title: "Artify",
    period: "Jun — Aug 2023",
    summary:
      "A showcase site for visual artists, who usually have to choose between a social feed that buries older work and a static PDF portfolio nobody opens. Built with Next.js and Framer Motion so browsing feels like moving through a gallery, with image loading and animation tuned so the motion doesn't cost page speed.",
    tags: ["Next.js", "Framer Motion", "Image optimization"],
    sourceUrl: "https://github.com/azharisamra/artify",
  },
  {
    slug: "athletee",
    title: "Athletee",
    period: "Apr — Jun 2023",
    summary:
      "A profile site for athletes and sports brands who depend on social platforms they don't own and can't shape. Next.js with Framer Motion and component-level animation, structured so a non-technical owner can swap content without touching the layout.",
    tags: ["Next.js", "Framer Motion", "Lucide React"],
    sourceUrl: "https://github.com/azharisamra/athletes-sports",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    period: "2024",
    summary:
      "A React, TypeScript and Vite portfolio with a single motion system, CSS-custom-property theming, and all copy served from a typed content module.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    imageSrc: "/assets/projects/portfolio.png",
    sourceUrl: "https://github.com/azharisamra/Portfolio",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

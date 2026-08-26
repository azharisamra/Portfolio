import type { Profile, SocialLink } from "./types";

export const profile: Profile = {
  name: "Samra Hifzur Rahman",
  shortName: "Samra",
  role: "Software Engineer",
  location: "Mumbai, India",
  email: "azharisamra@gmail.com",
  summary:
    "Software engineer with 4+ years across frontend, full stack, and AI training and evaluation. I ship React and TypeScript products, write the prompts and task scenarios used in AI model training pipelines, and audit AI coding benchmarks.",
  resumeUrl: "/resume/Samra-Hifzur-Rahman-Resume.pdf",
};

export const socialLinks: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/azharisamra",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansarisamra/",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:azharisamra@gmail.com",
    icon: "mail",
  },
];

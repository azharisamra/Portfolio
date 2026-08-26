export interface Profile {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  summary: string;
  resumeUrl: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export interface Capability {
  title: string;
  description: string;
  icon: "code" | "brain" | "server";
}

export interface SkillGroup {
  category: string;
  items: readonly string[];
}

export interface Role {
  role: string;
  organisation: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: readonly string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface Project {
  slug: string;
  title: string;
  period: string;
  summary: string;
  tags: readonly string[];
  imageSrc?: string;
  sourceUrl?: string;
  demoUrl?: string;
}

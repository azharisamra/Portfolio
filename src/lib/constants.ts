export const SITE_URL = "https://example.com" as const;

export const ROUTES = {
  home: "/",
  project: (slug: string): string => `/projects/${slug}`,
  projectPattern: "/projects/:slug",
} as const;

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

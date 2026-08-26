/**
 * Absolute origin for canonical URLs, OG image URLs, sitemap and robots.
 *
 * Defaults to the production deployment. NEXT_PUBLIC_SITE_URL overrides it,
 * which is what preview deployments should set so their canonical tags do not
 * point at production.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const SITE_URL = configured ?? "https://samraazhari.netlify.app";

/**
 * Mirrors the light/dark tokens in globals.css. Satori cannot read CSS custom
 * properties, so the OG image needs literal values. Keep in sync by hand -
 * these are the only hard-coded colours in the codebase.
 */
export const OG_COLORS = {
  ground: "#0c0a09",
  ink: "#fafaf9",
  muted: "#a8a29e",
  accent: "#fb923c",
  rule: "#292524",
} as const;

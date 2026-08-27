/** Strips protocol and any trailing slash for display. Derived, never typed by hand. */
/**
 * Link text for a URL: no protocol, no leading www, no trailing slash. The
 * stored URL keeps its canonical form, including www where the site uses one,
 * because that is what belongs in JSON-LD sameAs; only what the reader sees is
 * trimmed, so every contact row reads the same way.
 */
export const displayUrl = (url: string): string =>
  url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

/**
 * One date format for the whole site. A null end date means the role is
 * current, so it reads "Present" rather than being left open.
 */
export const formatRange = (start: string, end: string | null): string =>
  `${start} to ${end ?? "Present"}`;

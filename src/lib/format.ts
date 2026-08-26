/** Strips protocol and any trailing slash for display. Derived, never typed by hand. */
export const displayUrl = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * One date format for the whole site. A null end date means the role is
 * current, so it reads "Present" rather than being left open.
 */
export const formatRange = (start: string, end: string | null): string =>
  `${start} — ${end ?? "Present"}`;

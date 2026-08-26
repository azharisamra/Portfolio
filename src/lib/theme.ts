export const THEME_STORAGE_KEY = "theme";

export const THEMES = ["light", "system", "dark"] as const;

export type Theme = (typeof THEMES)[number];
/** What actually gets applied to the document - "system" resolves to one of these. */
export type ResolvedTheme = "light" | "dark";

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && (THEMES as readonly string[]).includes(value);

export const prefersDark = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const resolveTheme = (theme: Theme): ResolvedTheme => {
  if (theme === "system") return prefersDark() ? "dark" : "light";
  return theme;
};

export const applyTheme = (resolved: ResolvedTheme): void => {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
};

/**
 * Runs blocking in <head>, before the browser paints anything, so the correct
 * theme is on <html> from the very first frame. Kept as a string because it
 * has to ship as an inline script, not as a module the client fetches.
 *
 * Deliberately minimal and wrapped in try/catch: localStorage throws outright
 * in some privacy modes, and a failure here must not block the page.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var resolved =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    var root = document.documentElement;
    if (resolved === "dark") root.classList.add("dark");
    root.style.colorScheme = resolved;
  } catch (e) {}
})();
`.trim();

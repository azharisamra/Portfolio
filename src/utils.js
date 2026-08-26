/**
 * Resolves a path under `public/assets` to a URL.
 *
 * Deliberately a plain string join rather than `new URL(..., import.meta.url)`:
 * Vite statically rewrites that form at build time and cannot resolve a
 * dynamic path against the `public/` directory, which yields `undefined`
 * in the production bundle. `BASE_URL` keeps this correct if the site is
 * ever deployed under a sub-path (e.g. GitHub Pages).
 */
export const getImageUrl = (path) =>
  `${import.meta.env.BASE_URL}assets/${String(path).replace(/^\/+/, "")}`;

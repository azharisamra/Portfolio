/**
 * Netlify's CDN injects a promotional HTML comment into production pages
 * (deploy previews are left alone), directly after the charset meta inside
 * <head>. React 19 hydrates the whole document, so a node the server render
 * never produced fails hydration (minified React error #418) and React
 * regenerates the tree on the client. That regeneration is what a visitor
 * pays for it: a wasted full re-render on every page view, and it rebuilds
 * <html> without the theme class THEME_INIT_SCRIPT applied, so an explicit
 * light/dark choice stops surviving a reload.
 *
 * The host injects into every response at the edge, so the page cannot keep
 * the comment out; it can only remove it again before React looks. This runs
 * as a blocking inline script in <head>: parsing has passed the injection
 * point by the time it executes, and hydration cannot start before the
 * parser reaches the bundle scripts after it.
 *
 * Head only, on purpose. Comments in <body> are React's own boundary
 * markers and must survive. Blank text nodes are stripped with the comment
 * because the injection adds its own newline, which is just as foreign to
 * the server-rendered markup; the head the build produces contains neither
 * (asserted in head-sanitizer.test.ts).
 */
export const HEAD_SANITIZER_SCRIPT = `
(function () {
  try {
    var node = document.head.firstChild;
    while (node) {
      var next = node.nextSibling;
      if (
        node.nodeType === 8 ||
        (node.nodeType === 3 && !/\\S/.test(node.nodeValue))
      ) {
        document.head.removeChild(node);
      }
      node = next;
    }
  } catch (e) {}
})();
`.trim();

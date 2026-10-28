import { profile } from "@/content";

/**
 * Closes the page. No links to repeat: the hero carries them and Contact asks
 * for the reply (see contact-section.tsx for why there is one copy). The date
 * is the build's, so it moves with every deploy without anyone editing it.
 */
const updated = new Date().toLocaleDateString("en-GB", {
  month: "short",
  year: "numeric",
});

export function SiteFooter() {
  return (
    <footer className="frame-wide mt-16 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-6 font-condensed text-label text-muted uppercase">
      <p>
        {profile.name} · Updated {updated}
      </p>
      <a href="#top" className="inline-block py-1.5">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}

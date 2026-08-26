import { profile } from "@/content";
import { displayUrl } from "@/lib/format";
import { ThemeToggle } from "@/components/theme-toggle";

interface ContactLink {
  label: string;
  href: string;
  text: string;
  external: boolean;
}

export function SiteHeader() {
  const links: ContactLink[] = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      text: profile.email,
      external: false,
    },
    {
      label: "GitHub",
      href: profile.githubUrl,
      text: displayUrl(profile.githubUrl),
      external: true,
    },
    {
      label: "LinkedIn",
      href: profile.linkedinUrl,
      text: displayUrl(profile.linkedinUrl),
      external: true,
    },
    // Rendered only when a real URL exists - an empty resumeUrl produces no
    // row rather than a dead link.
    ...(profile.resumeUrl
      ? [
          {
            label: "Résumé",
            href: profile.resumeUrl,
            text: "Download PDF",
            external: true,
          },
        ]
      : []),
  ];

  return (
    <header className="border-b-2 border-ink pb-8">
      {/* Pinned masthead bar. In flow it contributes nothing, so the header
          below keeps its natural height at every width and no spacer is
          needed. At scroll 0 it is transparent and shows only the toggle, in
          the same place the toggle sits today. */}
      <div className="masthead-bar fixed inset-x-0 top-0 z-50">
        <div className="masthead-bar-inner mx-auto flex max-w-3xl items-center gap-4 px-5 sm:px-8">
          <p className="masthead-bar-fade truncate font-condensed text-label uppercase">
            {profile.name}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="masthead-bar-fade ml-auto hidden truncate font-condensed text-label text-muted uppercase sm:block"
          >
            {profile.email}
          </a>
          {/* flex, not block: the inline-flex radiogroup would otherwise sit on a
              text baseline and gain 2px of leading, shifting it off the position
              it occupies today. */}
          <div className="ml-auto flex shrink-0 sm:ml-0">
            <ThemeToggle />
          </div>
        </div>
        {/* Reading progress. The track gives the bar a deliberate bottom edge
            once it has a background, so section rules do not simply vanish as
            they scroll under it. The accent fills across the whole document. */}
        <span
          aria-hidden="true"
          className="masthead-track block h-px w-full bg-rule"
        >
          <span className="masthead-progress block h-px w-full origin-left bg-accent" />
        </span>
      </div>

      {/* min-height reserves the row the theme toggle used to occupy, so
          moving the toggle into the pinned bar does not shift the name
          upward at scroll 0. 27px is the toggle's rendered height. */}
      <div className="flex min-h-[27px] flex-wrap items-start justify-between gap-4">
        <p className="font-condensed text-label text-muted uppercase">
          {profile.location}
        </p>
      </div>

      <h1 className="masthead-name mt-4 origin-left font-condensed text-display uppercase">
        {profile.name}
      </h1>

      <p className="mt-1 font-condensed text-section text-accent uppercase">
        {profile.headline}
      </p>

      <p className="masthead-bio mt-6 text-body text-muted">{profile.bio}</p>

      <ul className="mt-8 border-t border-rule">
        {links.map((link) => (
          <li
            key={link.label}
            className="grid gap-0.5 border-b border-rule py-3 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="font-condensed text-label text-muted uppercase">
              {link.label}
            </span>
            <a
              href={link.href}
              className="text-body break-words"
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

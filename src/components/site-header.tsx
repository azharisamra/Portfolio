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
    // Rendered only when a real URL exists — an empty resumeUrl produces no
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="font-condensed text-label text-muted uppercase">
          {profile.location}
        </p>
        <ThemeToggle />
      </div>

      <h1 className="mt-4 font-condensed text-display uppercase">
        {profile.name}
      </h1>

      <p className="mt-1 font-condensed text-section text-accent uppercase">
        {profile.headline}
      </p>

      <p className="mt-6 text-body text-muted">{profile.bio}</p>

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

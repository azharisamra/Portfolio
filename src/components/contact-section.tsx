import { profile } from "@/content";
import { displayUrl } from "@/lib/format";
import { Section } from "@/components/section";

export function ContactSection() {
  const socials = [
    {
      label: "GitHub",
      href: profile.githubUrl,
      text: displayUrl(profile.githubUrl),
    },
    {
      label: "LinkedIn",
      href: profile.linkedinUrl,
      text: displayUrl(profile.linkedinUrl),
    },
    // Moved here when the hero's duplicate contact list was removed. Still
    // rendered only when a real URL exists, so an empty resumeUrl produces no
    // row rather than a dead link.
    ...(profile.resumeUrl
      ? [{ label: "Resume", href: profile.resumeUrl, text: "Download PDF" }]
      : []),
  ];

  return (
    <Section id="contact" title="Contact">
      <div className="reveal-on-scroll mt-6">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-condensed text-lead text-ground uppercase no-underline"
        >
          {profile.email}
          <span aria-hidden="true">→</span>
        </a>

        <ul className="mt-8 border-t border-rule">
          {socials.map((social) => (
            <li
              key={social.label}
              className="grid gap-0.5 border-b border-rule py-3 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-condensed text-label text-muted uppercase">
                {social.label}
              </span>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-body break-words"
              >
                {social.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

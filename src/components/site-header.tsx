import { profile, sectionLinks } from "@/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  // Resume only when a real URL exists, the same rule ContactSection uses, so
  // an empty resumeUrl produces three rows rather than a dead link.
  const footLinks = [
    { label: "Email", href: `mailto:${profile.email}`, external: false },
    { label: "GitHub", href: profile.githubUrl, external: true },
    { label: "LinkedIn", href: profile.linkedinUrl, external: true },
    ...(profile.resumeUrl
      ? [{ label: "Resume", href: profile.resumeUrl, external: true }]
      : []),
  ];

  return (
    <header className="frame-wide border-b-2 border-ink">
      {/* Pinned masthead bar. Out of flow, so the header below keeps its
          natural height at every width and no spacer is needed. At scroll 0 it
          is transparent and shows only the toggle, in the same place the toggle
          sits today. `position` is set in globals.css rather than here: it is
          only `fixed` where the scroll animation that gives it a background
          runs, and `absolute` otherwise. */}
      <div className="masthead-bar inset-x-0 top-0 z-50">
        <div className="masthead-bar-inner mx-auto flex max-w-3xl items-center gap-4 px-5 sm:px-8">
          <p className="masthead-bar-fade truncate font-condensed text-label uppercase">
            {profile.name}
          </p>
          {/* flex, not block: the inline-flex radiogroup would otherwise sit on a
              text baseline and gain 2px of leading, shifting it off the position
              it occupies today. ml-auto at every width now: it used to carry
              sm:ml-0 because the email sat between the name and the toggle and
              did the pushing, and removing the email left the toggle sliding
              back to the middle. */}
          <div className="ml-auto flex shrink-0">
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

      {/* The hero owns the first screen. Name and role take the wide frame;
          the bio and contacts drop back to the reading measure below. */}
      <div className="hero-inner">
        <div className="hero-top">
          {/* min-height reserves the row the theme toggle used to occupy, so
            moving the toggle into the pinned bar does not shift the name
            upward at scroll 0. 27px is the toggle's rendered height. */}
          <div className="hero-rise flex min-h-[27px] flex-wrap items-start justify-between gap-4">
            <p className="font-condensed text-label text-muted uppercase">
              {profile.location}
            </p>
          </div>

          {/* The entrance rides a wrapper, not the element itself. Both the
            entrance and the scroll compression are `animation` shorthands, and
            an element carries only one animation-name list, so whichever rule
            came later in the stylesheet silently replaced the other. A wrapper
            gives each its own element and they compose. */}
          <div className="hero-rise hero-rise-2">
            <h1 className="masthead-name mt-10 origin-left font-condensed text-display uppercase">
              {profile.name}
            </h1>
          </div>

          <div className="hero-rise hero-rise-3">
            <p className="masthead-role mt-1 font-condensed text-section text-accent uppercase">
              {profile.headline}
            </p>
          </div>

          <div className="hero-measure mt-10">
            <div className="hero-rise hero-rise-4">
              <p className="masthead-bio text-body text-muted">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Foot of the first screen. Anchoring this is what stops the leftover
            height pooling into one dead band below everything, and it puts a
            way to make contact above the fold again: the bar's email does not
            arrive until 30vh. Labels rather than full URLs, so the block stays
            short enough to sit inside the air that is already there and the
            name does not move. The addresses are spelled out in Contact. */}
        <div className="hero-foot hero-measure hero-rise hero-rise-4">
          {/* A section index, not a sentence. It is the only thing that adds
              a function the first screen did not have: wayfinding on a long
              single page, and a visible signal that there is more below. The
              ids are the anchors the sections already render, so nothing new
              is invented, and scroll-padding-top clears the pinned bar. */}
          <nav aria-label="Sections">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {sectionLinks.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-condensed text-label text-muted uppercase"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
            {footLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-condensed text-label uppercase"
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

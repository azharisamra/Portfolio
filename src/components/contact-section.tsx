import { profile } from "@/content";
import { Section } from "@/components/section";

/**
 * The closing call to action, and deliberately NOT a second copy of the hero's
 * contact list.
 *
 * The hero foot now carries the full set of links, so repeating them here would
 * put every address in the document twice and a screen reader would read the
 * email out three times counting the pinned bar. There is no honest markup fix
 * for that: aria-hidden on a focusable link is a violation, and tabindex="-1"
 * leaves a control that a mouse can reach and a keyboard cannot. The fix is to
 * not have two copies. So the hero is where you find the links, and this is the
 * one place that asks for the reply.
 */
export function ContactSection() {
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
      </div>
    </Section>
  );
}

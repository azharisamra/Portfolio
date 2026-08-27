import type { ReactNode } from "react";

interface SectionProps {
  /** Also the anchor id and the aria-labelledby target. */
  id: string;
  title: string;
  /**
   * Lets the section break the page's 48rem column at 1024px and up. Only the
   * pinned project viewer uses it, and only where its guards pass - so the
   * heading rule widens with the content instead of sitting short above it.
   */
  wide?: boolean;
  children: ReactNode;
}

/** Every section on the page gets the same rule, heading and labelling. */
export function Section({ id, title, wide = false, children }: SectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={wide ? "section-wide mt-16" : "mt-16"}
    >
      <div className="border-b-2 border-ink pb-2">
        <h2 id={id} className="font-condensed text-section uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

import type { ReactNode } from "react";

interface SectionProps {
  /** Also the anchor id and the aria-labelledby target. */
  id: string;
  title: string;
  /**
   * Whether this section's CONTENT also spans the wide frame. Every section's
   * heading and rule span it regardless: that is what stops one wide section
   * reading as a mistake. Only the pinned project viewer sets this; everything
   * else is sentences, and sentences stay in the reading measure.
   */
  wide?: boolean;
  children: ReactNode;
}

/** Every section on the page gets the same rule, heading and labelling. */
export function Section({ id, title, wide = false, children }: SectionProps) {
  return (
    <section aria-labelledby={id} className="frame-wide mt-16">
      <div className="section-rule pb-2">
        <h2 id={id} className="font-serif text-section">
          {title}
        </h2>
      </div>
      {wide ? children : <div className="hero-measure">{children}</div>}
    </section>
  );
}

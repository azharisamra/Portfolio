import type { ReactNode } from "react";

interface SectionProps {
  /** Also the anchor id and the aria-labelledby target. */
  id: string;
  title: string;
  children: ReactNode;
}

/** Every section on the page gets the same rule, heading and labelling. */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <div className="border-b-2 border-ink pb-2">
        <h2 id={id} className="font-condensed text-section uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export interface SectionLink {
  /** Must match a <Section id> rendered on the page. content.test.ts checks it. */
  id: string;
  /** Short form for the hero's index, where the full heading would be too long. */
  label: string;
}

/**
 * The hero's section index, in page order.
 *
 * Kept here rather than in the component because the labels are copy, and every
 * string on this site comes from the content layer. The ids are the anchors the
 * sections already render, so this adds no new markup contract: it only names
 * what exists. A test asserts every id below is still rendered, because a
 * removed section would otherwise leave a link that scrolls nowhere.
 */
export const sectionLinks: readonly SectionLink[] = [
  { id: "selected-work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "ask", label: "Ask" },
  { id: "contact", label: "Contact" },
];

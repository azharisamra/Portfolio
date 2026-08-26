export interface Certification {
  name: string;
  issuer: string;
  /** Human-readable, matching the site's date format, e.g. "Nov 2022". */
  date: string;
  /**
   * Verification link. Omit entirely until a real one exists - a card with no
   * link is better than a link that goes nowhere.
   */
  credentialUrl?: string;
}

export const certifications: readonly Certification[] = [
  {
    name: "React: The Complete Guide 2023 (incl. React Router & Redux)",
    issuer: "Udemy",
    date: "Dec 2023",
    // TODO(samra): credential URL
  },
  {
    name: "React.js Essential Training",
    issuer: "LinkedIn",
    date: "Mar 2023",
    // TODO(samra): credential URL
  },
  {
    name: "HTML & CSS Course",
    issuer: "Cisco thingQbator, RGIPT",
    date: "Nov 2022",
    // TODO(samra): credential URL
  },
];

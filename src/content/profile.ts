export interface Profile {
  name: string;
  headline: string;
  location: string;
  bio: string;
  /**
   * Hiring status, in one sentence. A typed field rather than copy inside a
   * component so /api/ask can ground on it: a visitor asking the panel whether
   * she is available gets the real answer instead of "not listed".
   */
  availability: string;
  /** ~155 chars, written for a recruiter scanning search results. */
  metaDescription: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export const profile: Profile = {
  // TODO(samra): confirm display form - full name, or just "Samra"?
  name: "Samra Hifzur Rahman",
  // TODO(samra): headline drafted from the target roles in your brief.
  headline: "Full Stack Developer & Frontend Engineer",
  location: "Mumbai, India",
  bio: "I work across the front end and the data side: React and TypeScript in the browser, Python and SQL against MongoDB, MySQL and Firebase. I'm currently Quality Manager, Operations at Outlier AI, and I build and ship my own projects alongside it, including the site you are reading. I'm looking for Full Stack Developer and Frontend Engineer roles in Dubai and the UAE, including teams building AI and LLM products.",
  availability:
    "Available immediately with no notice period. Based in Mumbai, open to relocation, targeting roles in Dubai and the UAE.",
  metaDescription:
    "Full Stack Developer and Frontend Engineer working in React, TypeScript, Python and AWS. Based in Mumbai, looking for roles in Dubai and the UAE.",
  email: "azharisamra@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/samrahifzurrahman",
  githubUrl: "https://github.com/azharisamra",
  // TODO(samra): real URL needed
  resumeUrl: "",
};

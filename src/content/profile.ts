export interface Profile {
  name: string;
  headline: string;
  location: string;
  bio: string;
  /** ~155 chars, written for a recruiter scanning search results. */
  metaDescription: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export const profile: Profile = {
  // TODO(samra): confirm display form — full name, or just "Samra"?
  name: "Samra Hifzur Rahman",
  // TODO(samra): headline drafted from the target roles in your brief.
  headline: "Full Stack Developer & Frontend Engineer",
  location: "Mumbai, India",
  bio: "I work across the full stack — React and TypeScript on the front end, Node.js, Spring Boot and Flask behind it. I'm currently Quality Manager, Operations at Outlier AI, and I build and ship my own projects alongside it, most recently a household finance app with real-time sync. I'm looking for Full Stack Developer and Frontend Engineer roles in Dubai and the UAE, including teams building AI and LLM products.",
  metaDescription:
    "Full Stack Developer and Frontend Engineer working in React, TypeScript, Node.js and AWS. Based in Mumbai, looking for roles in Dubai and the UAE.",
  email: "azharisamra@gmail.com",
  linkedinUrl: "https://linkedin.com/in/ansarisamra",
  githubUrl: "https://github.com/azharisamra",
  // TODO(samra): real URL needed
  resumeUrl: "",
};

export interface Education {
  degree: string;
  institution: string;
  location: string;
  /** Year awarded. */
  year: string;
}

export const education: readonly Education[] = [
  {
    degree: "Master of Computer Applications",
    institution: "SNDT Women's University",
    location: "Mumbai",
    year: "2023",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "Savitribai Phule Pune University",
    location: "Pune",
    year: "2021",
  },
];

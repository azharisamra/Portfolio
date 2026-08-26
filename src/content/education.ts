export interface Education {
  degree: string;
  institution: string;
  location: string;
  /** Year awarded. */
  year: string;
}

export const education: readonly Education[] = [
  {
    degree: "Master of Computer Application",
    institution: "SNDT Women's University",
    location: "Mumbai",
    year: "2023",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "JAT Arts, Science & Commerce College",
    location: "Mumbai",
    year: "2021",
  },
];

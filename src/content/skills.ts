export interface SkillGroup {
  category: string;
  items: readonly string[];
}

/** Mirrors the STACK section of the brief exactly — same groups, same order. */
export const skills: readonly SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Redux", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Spring Boot", "Flask", "REST APIs"],
  },
  {
    category: "Cloud & infra",
    items: ["AWS", "AWS CDK", "Docker", "LocalStack", "CI/CD", "Jenkins"],
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library", "Enzyme"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "Firebase"],
  },
];

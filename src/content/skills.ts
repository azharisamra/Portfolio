export interface SkillGroup {
  category: string;
  items: readonly string[];
}

/** Mirrors the STACK section of the brief exactly - same groups, same order. */
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
    // Renamed from "Backend", and Node.js removed. The bullets show these
    // being consumed rather than built: the Baker Hughes dashboards integrated
    // against Spring Boot and Flask services written by the backend team.
    // Calling that "Backend" was the overclaim; naming it accurately is a
    // stronger position than a longer list nobody can check.
    category: "APIs & integration",
    items: ["REST APIs", "Spring Boot", "Flask"],
  },
  {
    category: "Cloud & infra",
    items: ["AWS", "AWS CDK", "Docker", "LocalStack", "CI/CD", "Jenkins"],
  },
  {
    category: "Testing",
    items: ["Jest", "Cucumber", "React Testing Library", "Enzyme"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "Firebase"],
  },
];

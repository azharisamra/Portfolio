import type { Education, Role, SkillGroup } from "./types";

export const roles: readonly Role[] = [
  {
    role: "Quality Manager, Operations (QMO)",
    organisation: "Outlier AI",
    location: "Mumbai",
    startDate: "Oct 2024",
    endDate: "Present",
    highlights: [
      "Write prompts and task scenarios used directly in AI model training and fine-tuning pipelines, and design the rubrics and verifiers that evaluate them.",
      "Own quality standards for AI coding benchmarks: write and audit task rubrics for atomicity, outcome-based framing, and non-overlapping criteria.",
      "Review and validate coding-benchmark projects spanning Python, JavaScript, TypeScript, Java, HTML/CSS, YAML, and JSON, checking verifier scripts and test suites for synthetic environments provisioned with AWS CDK, Docker, and LocalStack.",
      "Extended benchmark auditing to agentic tasks: reviewed rubrics and verifiers for MCP-based tool-calling workflows and multi-agent coordination scenarios.",
      "Built onboarding materials, including a training deck and a scored practice course, to ramp up new contributors on quality standards.",
    ],
  },
  {
    role: "Early Career Trainee (Frontend)",
    organisation: "Baker Hughes",
    location: "Mumbai",
    startDate: "Mar 2023",
    endDate: "Feb 2024",
    highlights: [
      "Built interactive dashboards for real-time oil and gas well data using React.js, TypeScript, and Redux, reducing load time by 30%.",
      "Wrote unit tests with Jest & Enzyme and took part in code reviews within an Agile/Scrum team, improving code coverage and reducing bugs by 20%.",
      "Contributed to frontend features across the full SDLC, from design through deployment.",
    ],
  },
  {
    role: "Web Developer",
    organisation: "Adguru Online",
    location: "Mumbai",
    startDate: "Jul 2022",
    endDate: "Sep 2022",
    highlights: [
      "Delivered 4+ responsive, SEO-optimized websites with cross-browser compatibility and improved load performance.",
    ],
  },
  {
    role: "Web Developer",
    organisation: "Resume Jar",
    location: "Mumbai",
    startDate: "Oct 2020",
    endDate: "May 2021",
    highlights: [
      "Maintained and enhanced the company website, implementing responsive design and SEO optimizations to improve user engagement.",
    ],
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "AI & Evaluation",
    items: [
      "Prompt engineering",
      "Task authoring for model training",
      "Benchmark rubric design",
      "Verifier auditing",
      "False-pass detection",
      "LLM output evaluation",
      "Agentic / tool-calling review (MCP)",
    ],
  },
  {
    category: "Languages",
    items: [
      "TypeScript",
      "JavaScript (ES6)",
      "Java",
      "Python",
      "SQL",
      "HTML",
      "CSS",
      "YAML",
    ],
  },
  {
    category: "Frontend",
    items: ["React.js", "Redux", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Spring Boot", "Flask", "REST APIs"],
  },
  {
    category: "Cloud & Infra",
    items: [
      "AWS",
      "Infrastructure as Code (AWS CDK)",
      "Docker",
      "LocalStack",
      "CI/CD",
      "Jenkins",
    ],
  },
  {
    category: "Testing",
    items: ["Jest", "Enzyme", "React Testing Library"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "Storybook", "Webpack", "NPM"],
  },
];

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

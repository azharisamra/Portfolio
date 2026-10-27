export interface Role {
  company: string;
  title: string;
  location: string;
  /** Human-readable, e.g. "Oct 2024". */
  startDate: string;
  /** `null` means this is the current role. */
  endDate: string | null;
  /**
   * Earlier titles held at the same company, newest first. Used when one set
   * of bullets covers the whole stint, as the CV lists it: the row's own dates
   * stay the current title's, and each earlier title shows its own range.
   */
  earlierTitles?: readonly EarlierTitle[];
  bullets: readonly string[];
}

export interface EarlierTitle {
  title: string;
  startDate: string;
  endDate: string;
}

/**
 * Titles, companies, locations and dates come from the brief.
 *
 * The bullets do NOT - the brief lists no role descriptions. They are drafted
 * from your resume PDF, which the brief names as the source of truth for this
 * section. Every figure in them ("30%", "20%", "4") is yours, from that
 * document; none was invented here. The Scale AI (Outlier), Adguru Online and
 * Resume Jar entries follow the Oct 2026 CV word for word, except the last
 * Scale AI bullet: it is kept from the earlier resume because the bio's
 * MongoDB, MySQL and Firebase claim rests on it. Review before shipping.
 */
export const experience: readonly Role[] = [
  {
    company: "Scale AI (Outlier)",
    title: "GenAI Code, Queue Manager",
    location: "Contract, Remote, India",
    startDate: "Sep 2026",
    endDate: null,
    earlierTitles: [
      {
        title: "Queue Manager, Operations (QMO)",
        startDate: "Oct 2024",
        endDate: "Aug 2026",
      },
    ],
    bullets: [
      "Built AI agent skills in Claude Code (Python and Bash scripts, Markdown instructions and system prompts) that run as agents to automate quality checks on each task against the pass or fail threshold, working daily with LLM APIs, agentic workflows and MCP tool calling.",
      "Wrote golden trajectories for multi-step MCP tool-calling tasks and tested multi-agent workflows end to end, checking both the task design and the grading code.",
      "Built and debugged verifier scripts and test suites in Python, TypeScript and JavaScript that automatically grade AI coding tasks used to train and evaluate large language models (LLMs), across 7 benchmark projects (coding, MCP tool calling, Infrastructure as Code and cybersecurity).",
      "Built cloud test environments with AWS CDK in TypeScript (ECS Fargate, DynamoDB, IAM, KMS), Docker and LocalStack so that benchmark tasks run the same way on every attempt.",
      "Fixed tests in a 34-check Infrastructure as Code suite that wrongly penalised correct least-privilege solutions, and rebuilt a cloud benchmark task that could be passed by accident, then re-verified it across repeated runs.",
      "Debugged code across Python, JavaScript, TypeScript and Java benchmarks, finding false passes and missing test cases and getting them fixed before release.",
      "Reviewed deliberately vulnerable web apps (SQL injection, IDOR, path traversal) for a cybersecurity benchmark, checking each exploit path and its grading.",
      "Wrote the programs task scenarios call for in Python and SQL, including work against MongoDB, MySQL and Firebase.",
    ],
  },
  {
    company: "Baker Hughes",
    title: "Early Career Trainee (Frontend)",
    location: "Mumbai",
    startDate: "Mar 2023",
    endDate: "Feb 2024",
    bullets: [
      "Built interactive dashboards for real-time oil and gas well data using React, TypeScript and Redux, reducing load time by 30%.",
      "Wrote unit tests with Jest and Enzyme inside an Agile/Scrum team, improving code coverage and reducing bugs by 20%.",
      "Integrated the dashboards with REST APIs built by the backend team in Spring Boot and Flask.",
      "Worked as QA alongside the frontend delivery, writing automated test cases in Java and behaviour-driven scenarios with Cucumber.",
      "Shipped frontend features across the full SDLC, from design through deployment on Jenkins CI/CD pipelines.",
    ],
  },
  {
    company: "Adguru Online",
    title: "Web Developer",
    location: "Mumbai",
    startDate: "Jul 2022",
    endDate: "Sep 2022",
    bullets: [
      "Delivered 4 responsive, SEO-friendly client websites with cross-browser compatibility and faster page loads.",
      "Turned client requirements into working web pages on agreed timelines.",
    ],
  },
  {
    company: "Resume Jar",
    title: "Web Developer",
    location: "Mumbai",
    startDate: "Oct 2020",
    endDate: "May 2021",
    bullets: [
      "Maintained and improved the company website with responsive layouts and SEO optimisation.",
    ],
  },
];

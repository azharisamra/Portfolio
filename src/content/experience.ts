export interface Role {
  company: string;
  title: string;
  location: string;
  /** Human-readable, e.g. "Oct 2024". */
  startDate: string;
  /** `null` means this is the current role. */
  endDate: string | null;
  bullets: readonly string[];
}

/**
 * Titles, companies, locations and dates come from the brief.
 *
 * The bullets do NOT - the brief lists no role descriptions. They are drafted
 * from your resume PDF, which the brief names as the source of truth for this
 * section. Every figure in them ("30%", "20%", "4+") is yours, from that
 * document; none was invented here. Review before shipping.
 */
export const experience: readonly Role[] = [
  {
    company: "Outlier AI",
    title: "Quality Manager, Operations (QMO)",
    location: "Mumbai",
    startDate: "Oct 2024",
    endDate: null,
    bullets: [
      "Write prompts and task scenarios used directly in AI model training and fine-tuning pipelines, and design the rubrics and verifiers that evaluate them.",
      "Audit task rubrics across AI coding benchmarks for atomicity, outcome-based framing, and non-overlapping criteria.",
      "Review verifier scripts and test suites for synthetic environments provisioned with AWS CDK, Docker and LocalStack, catching test gaps and false passes before they ship.",
      "Write the programs a task scenario calls for, in Python and SQL, including work against MongoDB, MySQL and Firebase.",
      "Build onboarding material for new contributors, including a training deck and a scored practice course.",
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
    // TODO(samra): your resume carries one bullet for this role; these two are
    // that sentence split in half. Send more detail if you want real coverage.
    bullets: [
      "Delivered 4+ responsive, SEO-optimised client websites across different domains.",
      "Ensured cross-browser compatibility and improved load performance on every site delivered.",
    ],
  },
  {
    company: "Resume Jar",
    title: "Web Developer",
    location: "Mumbai",
    startDate: "Oct 2020",
    endDate: "May 2021",
    // TODO(samra): same as above - one resume bullet, split into two.
    bullets: [
      "Maintained and extended the company website, implementing responsive layouts across breakpoints.",
      "Applied SEO optimisations to improve user engagement.",
    ],
  },
];

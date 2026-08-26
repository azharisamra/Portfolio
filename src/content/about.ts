import type { Capability } from "./types";

export const aboutIntro =
  "I'm a software engineer based in Mumbai, working where product engineering meets AI evaluation. I've built real-time dashboards for oil and gas well data at Baker Hughes, and I now own quality standards for AI coding benchmarks at Outlier AI — writing task rubrics, auditing verifier scripts, and hardening tasks that aren't testing what they claim to.";

export const capabilities: readonly Capability[] = [
  {
    title: "Frontend Engineering",
    description:
      "I ship React and TypeScript products — interactive dashboards, responsive interfaces, and design systems built with Next.js, Redux and Framer Motion.",
    icon: "code",
  },
  {
    title: "AI Training & Evaluation",
    description:
      "I write prompts and task scenarios for model training pipelines, design benchmark rubrics, and audit verifiers to catch false passes before they ship.",
    icon: "brain",
  },
  {
    title: "Full Stack & Cloud",
    description:
      "I build REST APIs with Node.js, Spring Boot and Flask, and work across AWS CDK, Docker and LocalStack to provision the environments they run in.",
    icon: "server",
  },
];

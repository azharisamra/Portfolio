import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 writes AGENTS.md / CLAUDE.md into the project root on dev and
  // build. Off, to keep the repo to files this project actually owns.
  agentRules: false,
};

export default nextConfig;

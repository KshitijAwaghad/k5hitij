import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables clean builds and standard Next.js App Router features
  reactStrictMode: true,
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/lib/translations": ["lib/translations"],
    },
  },
};

export default nextConfig;

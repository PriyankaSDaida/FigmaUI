import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    unoptimized: true, // Allow blob: and data: URLs for local previews
  },
};

export default nextConfig;

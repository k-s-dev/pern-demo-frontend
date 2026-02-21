import { appConfig } from "@/lib/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.5"],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nvpljyvubavbnfdf.public.blob.vercel-storage.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: `/api/auth/:path*`,
        destination: `${appConfig.betterAuth.baseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;

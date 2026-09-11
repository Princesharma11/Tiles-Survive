import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ------------------------------------------------------------------
  //  Cache strategy for fast-iterating deployments:
  //  • HTML routes must always revalidate — a year-long s-maxage lets
  //    stale pages reference deleted JS chunks, breaking hydration
  //    (buttons appear dead after every redeploy).
  //  • /_next/static assets are content-hashed → safe to cache forever.
  // ------------------------------------------------------------------
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ------------------------------------------------------------------
  //  Production headers for titantilessurvive.com (Vercel):
  //  • HTML revalidates every load — stale HTML referencing deleted
  //    chunks breaks hydration (buttons appear dead after redeploys).
  //  • /_next/static assets are content-hashed → immutable cache.
  //  • Sensible security defaults (no frame-blocking: the app is
  //    designed to be embeddable in preview panes).
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
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel-friendly defaults: no custom server, no webpack hacks.
  // The 3D bundle (three / r3f / drei) is code-split behind next/dynamic
  // inside components/three/LazyHeroCanvas.tsx so it never blocks first paint.
};

export default nextConfig;

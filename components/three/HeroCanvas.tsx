"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TitanScene from "./TitanScene";

/* ------------------------------------------------------------------ */
/*  HeroCanvas — the dedicated R3F canvas for the hero stage.          */
/*  Client-only (dynamic import via LazyHeroCanvas), pointer-events    */
/*  disabled so UI overlays stay fully interactive.                    */
/* ------------------------------------------------------------------ */

export default function HeroCanvas() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.5 : 1.75]}
      camera={{ position: [0, 3.4, 9.5], fov: 42, near: 0.1, far: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none", background: "transparent" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <TitanScene isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

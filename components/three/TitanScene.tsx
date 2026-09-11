"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import TileTerrain from "./TileTerrain";
import TitanMonolith from "./TitanMonolith";
import CommandRings from "./CommandRings";
import EmberField from "./EmberField";

/* ------------------------------------------------------------------ */
/*  TitanScene — the hero "command table": a breathing tile grid,      */
/*  a glowing tile monolith, orbiting command rings, drifting embers.  */
/*  Parallax is driven by a window-level pointer listener so the       */
/*  canvas itself can stay pointer-events: none.                       */
/* ------------------------------------------------------------------ */

const pointerTarget = { x: 0, y: 0 };

export default function TitanScene({ isMobile = false }: { isMobile?: boolean }) {
  const root = useRef<THREE.Group>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera }, delta) => {
    const g = root.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(
        g.rotation.y,
        pointerTarget.x * 0.18,
        2,
        delta
      );
    }
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointerTarget.x * 0.9,
      1.8,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      3.4 + pointerTarget.y * 0.45,
      1.8,
      delta
    );
    camera.lookAt(0, 0.7, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#04060c", 13, 30]} />

      <ambientLight intensity={0.5} color="#7f93b8" />
      <directionalLight position={[6, 9, 4]} intensity={1.2} color="#ffe3b0" />
      <pointLight
        position={[-7, 3, -5]}
        intensity={70}
        distance={22}
        decay={2}
        color="#ff5c33"
      />

      <group ref={root}>
        <TileTerrain isMobile={isMobile} />
        <TitanMonolith />
        <CommandRings />
        <EmberField count={isMobile ? 120 : 240} />
        <Sparkles
          count={isMobile ? 50 : 90}
          scale={[13, 6, 13]}
          position={[0, 2.2, 0]}
          size={2.4}
          speed={0.25}
          opacity={0.5}
          color="#f5b942"
        />
      </group>
    </>
  );
}

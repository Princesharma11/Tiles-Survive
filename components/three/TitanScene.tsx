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
/*  TitanScene — a warm, sunlit floating tile island: grass-topped     */
/*  tiles breathing in waves, a rock totem with a molten-gold core,    */
/*  drift rings and rising embers. Pointer parallax via window         */
/*  listener so the canvas itself stays pointer-events: none.          */
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
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointerTarget.x * 0.16, 2, delta);
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerTarget.x * 0.8, 1.8, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 3.4 + pointerTarget.y * 0.4, 1.8, delta);
    camera.lookAt(0, 0.7, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#fbd9a8", 13, 30]} />

      {/* Golden-hour lighting */}
      <ambientLight intensity={0.85} color="#ffe8c4" />
      <directionalLight position={[6, 10, 4]} intensity={1.6} color="#fff1d6" />
      <pointLight
        position={[-7, 3, -5]}
        intensity={50}
        distance={22}
        decay={2}
        color="#f07d2e"
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
          size={2.6}
          speed={0.25}
          opacity={0.65}
          color="#fff1c9"
        />
      </group>
    </>
  );
}

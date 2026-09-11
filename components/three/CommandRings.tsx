"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  CommandRings — sunlit drift rings circling the totem.              */
/* ------------------------------------------------------------------ */

export default function CommandRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (r1.current) {
      r1.current.rotation.z += delta * 0.25;
      r1.current.rotation.x = 1.15 + Math.sin(t * 0.4) * 0.12;
    }
    if (r2.current) {
      r2.current.rotation.z -= delta * 0.18;
      r2.current.rotation.x = 1.35 - Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0.9, 0]}>
      <mesh ref={r1} rotation={[1.15, 0.3, 0]}>
        <torusGeometry args={[2.7, 0.016, 8, 96]} />
        <meshBasicMaterial color="#fff7e6" transparent opacity={0.85} />
      </mesh>
      <mesh ref={r2} rotation={[1.35, -0.4, 0]}>
        <torusGeometry args={[3.5, 0.024, 8, 96]} />
        <meshBasicMaterial color="#f6c445" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

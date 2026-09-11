"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  TitanMonolith — a rotating totem of glowing slabs rising out of    */
/*  the tile grid, crowned by a pulsing octahedron command core.       */
/* ------------------------------------------------------------------ */

export default function TitanMonolith() {
  const spin = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (spin.current) spin.current.rotation.y += delta * 0.18;
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 2.6) * 0.09);
      core.current.rotation.y -= delta * 0.6;
    }
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 1.6 + Math.sin(t * 2.6) * 0.7;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      <Float
        speed={1.3}
        rotationIntensity={0.12}
        floatIntensity={0.55}
        floatingRange={[-0.12, 0.18]}
      >
        <group ref={spin}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[2.3, 0.5, 2.3]} />
            <meshStandardMaterial
              color="#0d1526"
              metalness={0.65}
              roughness={0.35}
            />
            <Edges scale={1.001} threshold={15} color="#f5b942" linewidth={1.5} />
          </mesh>

          <mesh position={[0, 0.95, 0]}>
            <boxGeometry args={[1.7, 0.5, 1.7]} />
            <meshStandardMaterial
              color="#12203a"
              metalness={0.65}
              roughness={0.32}
            />
            <Edges scale={1.001} threshold={15} color="#f9ca72" linewidth={1.5} />
          </mesh>

          <mesh position={[0, 1.65, 0]}>
            <boxGeometry args={[1.15, 0.5, 1.15]} />
            <meshStandardMaterial
              color="#231a08"
              metalness={0.5}
              roughness={0.3}
              emissive={new THREE.Color("#f5b942")}
              emissiveIntensity={0.5}
            />
            <Edges scale={1.001} threshold={15} color="#ffe1a1" linewidth={2} />
          </mesh>

          <mesh ref={core} position={[0, 2.5, 0]}>
            <octahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              ref={coreMat}
              color="#2a1e06"
              emissive={new THREE.Color("#ffd166")}
              emissiveIntensity={1.6}
              metalness={0.4}
              roughness={0.25}
            />
            <Edges scale={1.06} color="#ffe1a1" linewidth={2} />
          </mesh>
        </group>
      </Float>

      {/* Command-gold under-glow */}
      <pointLight
        position={[0, 2.4, 0]}
        intensity={55}
        distance={11}
        decay={2}
        color="#f5b942"
      />
    </group>
  );
}

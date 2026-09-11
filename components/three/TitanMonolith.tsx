"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  TitanMonolith — a stacked rock totem rising from the island,       */
/*  crowned by a molten-gold command core. Warm bark/earth palette.    */
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
      coreMat.current.emissiveIntensity = 1.5 + Math.sin(t * 2.6) * 0.6;
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
            <meshStandardMaterial color="#8d6e46" metalness={0.05} roughness={0.8} />
            <Edges scale={1.001} threshold={15} color="#5d4037" linewidth={2} />
          </mesh>

          <mesh position={[0, 0.95, 0]}>
            <boxGeometry args={[1.7, 0.5, 1.7]} />
            <meshStandardMaterial color="#a1815a" metalness={0.05} roughness={0.75} />
            <Edges scale={1.001} threshold={15} color="#5d4037" linewidth={2} />
          </mesh>

          <mesh position={[0, 1.65, 0]}>
            <boxGeometry args={[1.15, 0.5, 1.15]} />
            <meshStandardMaterial color="#6fae3e" metalness={0.05} roughness={0.7} />
            <Edges scale={1.001} threshold={15} color="#3e7a2e" linewidth={2} />
          </mesh>

          <mesh ref={core} position={[0, 2.5, 0]}>
            <octahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              ref={coreMat}
              color="#a03f10"
              emissive={new THREE.Color("#ffd166")}
              emissiveIntensity={1.5}
              metalness={0.2}
              roughness={0.3}
            />
            <Edges scale={1.06} color="#fff1c9" linewidth={2} />
          </mesh>
        </group>
      </Float>

      {/* Molten under-glow */}
      <pointLight
        position={[0, 2.4, 0]}
        intensity={45}
        distance={11}
        decay={2}
        color="#ffb03a"
      />
    </group>
  );
}

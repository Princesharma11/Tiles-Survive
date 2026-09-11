"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  TileTerrain — an instanced grid of map tiles breathing in waves.   */
/*  A handful of "hot" tactical tiles rise and glow command-gold.      */
/*  Single InstancedMesh = one draw call per layer.                    */
/* ------------------------------------------------------------------ */

const dummy = new THREE.Object3D();

/** Deterministic hash → [0, 1). Keeps the layout stable across renders. */
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function TileTerrain({ isMobile = false }: { isMobile?: boolean }) {
  const N = isMobile ? 9 : 13;
  const SPACING = 1.55;
  const MAX_R = ((N - 1) / 2) * SPACING + 0.9;

  const baseRef = useRef<THREE.InstancedMesh>(null);
  const hotRef = useRef<THREE.InstancedMesh>(null);

  const { positions, hotIndices } = useMemo(() => {
    const positions: Array<{ x: number; z: number }> = [];
    const hotIndices: number[] = [];
    for (let ix = 0; ix < N; ix++) {
      for (let iz = 0; iz < N; iz++) {
        const x = (ix - (N - 1) / 2) * SPACING;
        const z = (iz - (N - 1) / 2) * SPACING;
        const d = Math.hypot(x, z);
        if (d > MAX_R || d < 1.6) continue; // circular stage, hollow core
        const i = positions.length;
        positions.push({ x, z });
        if ((i % 9 === 0 || rand(ix * 31 + iz * 17) > 0.9) && d > 2.6) {
          hotIndices.push(i);
        }
      }
    }
    return { positions, hotIndices };
  }, [N, MAX_R]);

  const phases = useMemo(
    () => positions.map((_, i) => rand(i * 7.3) * Math.PI * 2),
    [positions]
  );

  const baseGeo = useMemo(() => new THREE.BoxGeometry(1.3, 0.32, 1.3), []);
  const hotGeo = useMemo(() => new THREE.BoxGeometry(1.3, 0.36, 1.3), []);

  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111b30",
        metalness: 0.55,
        roughness: 0.45,
        emissive: new THREE.Color("#0a1428"),
        emissiveIntensity: 0.35,
      }),
    []
  );
  const hotMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#221906",
        metalness: 0.4,
        roughness: 0.35,
        emissive: new THREE.Color("#f5b942"),
        emissiveIntensity: 1.4,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = baseRef.current;
    const hot = hotRef.current;

    if (base) {
      for (let i = 0; i < positions.length; i++) {
        const { x, z } = positions[i];
        dummy.position.set(
          x,
          Math.sin(t * 0.9 + x * 0.45 + z * 0.35 + phases[i] * 0.2) * 0.14,
          z
        );
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        base.setMatrixAt(i, dummy.matrix);
      }
      base.instanceMatrix.needsUpdate = true;
    }

    if (hot && hotIndices.length > 0) {
      hotMat.emissiveIntensity = 1.15 + Math.sin(t * 2.2) * 0.55;
      for (let k = 0; k < hotIndices.length; k++) {
        const { x, z } = positions[hotIndices[k]];
        dummy.position.set(x, 0.3 + Math.sin(t * 1.4 + phases[hotIndices[k]] * 3) * 0.3, z);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        hot.setMatrixAt(k, dummy.matrix);
      }
      hot.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      <instancedMesh
        ref={baseRef}
        args={[baseGeo, baseMat, positions.length]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={hotRef}
        args={[hotGeo, hotMat, Math.max(1, hotIndices.length)]}
        frustumCulled={false}
      />
    </group>
  );
}

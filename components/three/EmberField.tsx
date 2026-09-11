"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  EmberField — warm furnace sparks drifting upward. Single draw call.*/
/* ------------------------------------------------------------------ */

const SPREAD_XZ = 18;
const CEILING = 6.5;
const FLOOR = -1.8;

export default function EmberField({ count = 240 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * SPREAD_XZ;
      arr[i * 3 + 1] = Math.random() * (CEILING - FLOOR) + FLOOR;
      arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_XZ;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(
    () => new Float32Array(Array.from({ length: count }, () => 0.15 + Math.random() * 0.4)),
    [count]
  );

  useFrame((_, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > CEILING) {
        arr[i * 3 + 1] = FLOOR;
        arr[i * 3] = (Math.random() - 0.5) * SPREAD_XZ;
        arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_XZ;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ffd27a"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

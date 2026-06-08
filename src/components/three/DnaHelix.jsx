"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll";

/* Clinical palette (UX brief §2/§3) */
const CLINICAL = new THREE.Color("#7fb5c9");
const CORAL = new THREE.Color("#c97f7f");
const SLATE = new THREE.Color("#a99cc4");
const SAND = new THREE.Color("#c9b896");

/* Base-pair color scheme, alternating down the helix (§3) */
const PAIRS = [
  [CLINICAL, CORAL],
  [SLATE, SAND],
  [CLINICAL, SAND],
  [CORAL, SLATE],
];

/* Believable B-DNA proportions (§3) */
const RUNGS = 45;
const RADIUS = 4.4;
const RISE = 0.9;
const TWIST = 0.4;

const SPHERE_R = 0.62;
const CYL_R = 0.16;

const UP = new THREE.Vector3(0, 1, 0);

export default function DnaHelix({ reducedMotion = false }) {
  const spinRef = useRef(); // rotates around the helix long axis
  const sphereRef = useRef();
  const cylRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();

  const auto = useRef(0);

  const { tubeA, tubeB, spheres, cylinders } = useMemo(() => {
    const ptsA = [];
    const ptsB = [];
    const spheres = []; // { p: Vector3, color }
    const cylinders = []; // { p: Vector3, q: Quaternion, len, color }

    for (let i = 0; i < RUNGS; i++) {
      const angle = i * TWIST;
      const y = (i - RUNGS / 2) * RISE;

      const pA = new THREE.Vector3(
        RADIUS * Math.cos(angle),
        y,
        RADIUS * Math.sin(angle)
      );
      const pB = new THREE.Vector3(
        -RADIUS * Math.cos(angle),
        y,
        -RADIUS * Math.sin(angle)
      );
      ptsA.push(pA);
      ptsB.push(pB);

      const [cA, cB] = PAIRS[i % PAIRS.length];
      spheres.push({ p: pA, color: cA });
      spheres.push({ p: pB, color: cB });

      // Base-pair rung = two solid cylinders meeting at the middle (§3)
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);

      for (const [start, end, color] of [
        [pA, mid, cA],
        [mid, pB, cB],
      ]) {
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();
        dir.normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(UP, dir);
        const center = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5);
        cylinders.push({ p: center, q, len, color });
      }
    }

    const curveA = new THREE.CatmullRomCurve3(ptsA);
    const curveB = new THREE.CatmullRomCurve3(ptsB);
    const tubeA = new THREE.TubeGeometry(curveA, RUNGS * 6, 0.5, 12, false);
    const tubeB = new THREE.TubeGeometry(curveB, RUNGS * 6, 0.5, 12, false);

    return { tubeA, tubeB, spheres, cylinders };
  }, []);

  // Write per-instance matrices + colors once.
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const s = new THREE.Vector3();
    const qI = new THREE.Quaternion();

    const sm = sphereRef.current;
    spheres.forEach(({ p, color }, i) => {
      m.compose(p, qI, s.set(1, 1, 1));
      sm.setMatrixAt(i, m);
      sm.setColorAt(i, color);
    });
    sm.instanceMatrix.needsUpdate = true;
    if (sm.instanceColor) sm.instanceColor.needsUpdate = true;

    const cm = cylRef.current;
    cylinders.forEach(({ p, q, len, color }, i) => {
      m.compose(p, q, s.set(1, len, 1));
      cm.setMatrixAt(i, m);
      cm.setColorAt(i, color);
    });
    cm.instanceMatrix.needsUpdate = true;
    if (cm.instanceColor) cm.instanceColor.needsUpdate = true;
  }, [spheres, cylinders]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp after tab refocus

    // Slow constant auto-rotation around the long axis (§3)
    auto.current += (reducedMotion ? 0.0008 : 0.0045) * (d * 60);

    // Scroll "turns" the molecule (§3) — disabled under reduced motion
    const scrollPhase = reducedMotion ? 0 : scrollProgress.value * Math.PI * 1.5;

    if (spinRef.current) {
      spinRef.current.rotation.y = auto.current + scrollPhase;
    }

    // Key/fill lights slowly orbit the molecule (§3)
    const t = state.clock.elapsedTime;
    if (keyLightRef.current) {
      keyLightRef.current.position.set(
        Math.cos(t * 0.12) * 14,
        6,
        Math.sin(t * 0.12) * 14 + 6
      );
    }
    if (fillLightRef.current) {
      fillLightRef.current.position.set(
        Math.cos(t * 0.12 + Math.PI) * 12,
        -4,
        Math.sin(t * 0.12 + Math.PI) * 12 + 6
      );
    }
  });

  return (
    <group ref={spinRef}>
      {/* glossy backbones */}
      <mesh geometry={tubeA}>
        <meshStandardMaterial
          color={CLINICAL}
          roughness={0.18}
          metalness={0.25}
        />
      </mesh>
      <mesh geometry={tubeB}>
        <meshStandardMaterial color={CORAL} roughness={0.18} metalness={0.25} />
      </mesh>

      {/* nucleotides */}
      <instancedMesh
        ref={sphereRef}
        args={[undefined, undefined, spheres.length]}
      >
        <sphereGeometry args={[SPHERE_R, 28, 28]} />
        <meshStandardMaterial roughness={0.22} metalness={0.15} />
      </instancedMesh>

      {/* base-pair rung halves */}
      <instancedMesh
        ref={cylRef}
        args={[undefined, undefined, cylinders.length]}
      >
        <cylinderGeometry args={[CYL_R, CYL_R, 1, 10]} />
        <meshStandardMaterial roughness={0.3} metalness={0.1} />
      </instancedMesh>

      {/* soft studio lighting that orbits (§3) */}
      <pointLight
        ref={keyLightRef}
        color="#cde3ec"
        intensity={120}
        distance={60}
        decay={1.4}
      />
      <pointLight
        ref={fillLightRef}
        color="#d6b0b0"
        intensity={70}
        distance={60}
        decay={1.4}
      />
    </group>
  );
}

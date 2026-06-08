"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress, molecule } from "@/lib/scroll";

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

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
  const outerRef = useRef(); // position (which side) + diagonal tilt
  const spinRef = useRef(); // rotates around the helix long axis
  const sphereRef = useRef();
  const cylRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const dirLightRef = useRef();

  const auto = useRef(0);
  const dim = useRef(0);

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
    const tubeA = new THREE.TubeGeometry(curveA, RUNGS * 8, 0.5, 20, false);
    const tubeB = new THREE.TubeGeometry(curveB, RUNGS * 8, 0.5, 20, false);

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
    if (typeof document !== "undefined" && document.hidden) return; // pause when tab hidden
    const d = Math.min(delta, 0.05); // clamp after tab refocus

    // Slow constant auto-rotation around the long axis (§3)
    auto.current += (reducedMotion ? 0.0008 : 0.0045) * (d * 60);

    // Scroll "turns" the molecule (§3) — disabled under reduced motion
    const scrollPhase = reducedMotion ? 0 : scrollProgress.value * Math.PI * 1.5;

    if (spinRef.current) {
      spinRef.current.rotation.y = auto.current + scrollPhase;
    }

    // Glide to whichever side the active section's copy leaves open (§6)
    if (outerRef.current) {
      outerRef.current.position.x = damp(
        outerRef.current.position.x,
        molecule.targetX,
        2.2,
        d
      );
    }

    // Dim under text-heavy sections so legibility always wins (§6)
    dim.current = damp(dim.current, molecule.targetDim, 2.5, d);
    const lit = 1 - 0.6 * dim.current;
    if (keyLightRef.current) keyLightRef.current.intensity = 70 * lit;
    if (fillLightRef.current) fillLightRef.current.intensity = 40 * lit;
    if (dirLightRef.current) dirLightRef.current.intensity = 0.7 * lit;

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
    <group ref={outerRef} rotation={[0, 0, -0.5]} position={[5.2, 0, 0]}>
      <group ref={spinRef}>
      <directionalLight
        ref={dirLightRef}
        color="#b8c4d6"
        intensity={1.1}
        position={[-8, 4, 6]}
      />
      {/* glossy backbones — wet clinical clearcoat over a satin base */}
      <mesh geometry={tubeA}>
        <meshPhysicalMaterial
          color={CLINICAL}
          roughness={0.32}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.14}
          envMapIntensity={1.1}
          sheen={0.4}
          sheenColor="#cde3ec"
        />
      </mesh>
      <mesh geometry={tubeB}>
        <meshPhysicalMaterial
          color={CORAL}
          roughness={0.32}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.14}
          envMapIntensity={1.1}
          sheen={0.4}
          sheenColor="#e6c4c4"
        />
      </mesh>

      {/* nucleotides — glossy beads with strong reflections */}
      <instancedMesh
        ref={sphereRef}
        args={[undefined, undefined, spheres.length]}
      >
        <sphereGeometry args={[SPHERE_R, 48, 48]} />
        <meshPhysicalMaterial
          roughness={0.16}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.25}
        />
      </instancedMesh>

      {/* base-pair rung halves — slightly more matte so beads read as the highlight */}
      <instancedMesh
        ref={cylRef}
        args={[undefined, undefined, cylinders.length]}
      >
        <cylinderGeometry args={[CYL_R, CYL_R, 1, 24]} />
        <meshPhysicalMaterial
          roughness={0.4}
          metalness={0}
          clearcoat={0.7}
          clearcoatRoughness={0.3}
          envMapIntensity={0.9}
        />
      </instancedMesh>

      {/* moving studio speculars — env map does the heavy lifting now (§3) */}
      <pointLight
        ref={keyLightRef}
        color="#cde3ec"
        intensity={70}
        distance={60}
        decay={1.4}
      />
      <pointLight
        ref={fillLightRef}
        color="#d6b0b0"
        intensity={40}
        distance={60}
        decay={1.4}
      />
      </group>
    </group>
  );
}

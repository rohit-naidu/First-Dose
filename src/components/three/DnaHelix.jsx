"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress, molecule } from "@/lib/scroll";

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

/* Clinical palette (UX brief §2/§3) */
const CLINICAL = new THREE.Color("#7fb5c9"); // strand A backbone
const CORAL = new THREE.Color("#c97f7f"); // strand B backbone

/* Distinct base colors, paired biologically (A–T, G–C) so each rung reads as
   a real base pair (§3) */
const BASE_COLOR = {
  A: new THREE.Color("#6fa8c4"), // adenine  — blue
  T: new THREE.Color("#d08a6a"), // thymine  — warm
  G: new THREE.Color("#9d8fc4"), // guanine  — violet
  C: new THREE.Color("#ccb878"), // cytosine — sand
};
const COMPLEMENT = { A: "T", T: "A", G: "C", C: "G" };

/* Believable B-DNA proportions: ~10.5 base pairs per turn, and a strand phase
   offset so the two backbones are NOT diametrically opposite — that asymmetry
   is what produces the major and minor grooves real DNA has (§3) */
const RUNGS = 48;
const RADIUS = 4.1;
const RISE = 0.92;
const TWIST = 0.598; // 2π / 10.5
const PHASE = 2.5; // strand B angular offset (~143°) → grooves

const BEAD_R = 0.42; // sugar-phosphate backbone bead
const BACKBONE_R = 0.3; // backbone tube radius
const BASE_THICK = 0.34; // base plate thickness (along helix axis)
const BASE_WIDTH = 1.45; // base plate width (tangential)
const PAIR_GAP = 0.55; // gap at the pairing interface (reads as H-bonds)

const UP = new THREE.Vector3(0, 1, 0);

/* Deterministic pseudo-random sequence so the strand looks varied but stable */
function makeSequence(n) {
  const order = ["A", "G", "C", "T", "A", "C", "G", "T"];
  let seed = 7;
  const seq = [];
  for (let i = 0; i < n; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    seq.push(order[seed % order.length]);
  }
  return seq;
}

export default function DnaHelix({ reducedMotion = false }) {
  const outerRef = useRef();
  const spinRef = useRef(); // rotates around the helix long axis
  const beadRef = useRef();
  const plateRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const dirLightRef = useRef();

  const auto = useRef(0);
  const dim = useRef(0);

  const { tubeA, tubeB, beads, plates } = useMemo(() => {
    const ptsA = [];
    const ptsB = [];
    const beads = []; // { p, color }
    const plates = []; // { p, q, scale:Vector3, color }
    const seq = makeSequence(RUNGS);

    const dir = new THREE.Vector3();
    const w = new THREE.Vector3();
    const basis = new THREE.Matrix4();

    for (let i = 0; i < RUNGS; i++) {
      const angle = i * TWIST;
      const y = (i - RUNGS / 2) * RISE;

      const pA = new THREE.Vector3(
        RADIUS * Math.cos(angle),
        y,
        RADIUS * Math.sin(angle)
      );
      const pB = new THREE.Vector3(
        RADIUS * Math.cos(angle + PHASE),
        y,
        RADIUS * Math.sin(angle + PHASE)
      );
      ptsA.push(pA);
      ptsB.push(pB);

      const baseA = seq[i];
      const baseB = COMPLEMENT[baseA];

      // Backbone beads carry the strand colour (sugar-phosphate)
      beads.push({ p: pA, color: CLINICAL });
      beads.push({ p: pB, color: CORAL });

      // Flat base plates spanning the rung, meeting near the centre with a
      // small gap (the pairing interface). Both plates are coplanar and thin
      // along the helix axis → stacked-base look.
      dir.subVectors(pB, pA);
      const len = dir.length();
      dir.normalize();
      // Orthonormal basis: local X→rung dir, local Y→up, local Z→tangent
      w.set(-dir.z, 0, dir.x); // = cross(dir, up), horizontal & unit
      basis.makeBasis(dir, UP, w);
      const q = new THREE.Quaternion().setFromRotationMatrix(basis);

      const half = len / 2;
      const plateLen = half - PAIR_GAP / 2;
      const scale = new THREE.Vector3(plateLen, BASE_THICK, BASE_WIDTH);

      const centerA = pA.clone().addScaledVector(dir, plateLen / 2);
      const centerB = pB.clone().addScaledVector(dir, -plateLen / 2);

      plates.push({ p: centerA, q, scale, color: BASE_COLOR[baseA] });
      plates.push({ p: centerB, q, scale, color: BASE_COLOR[baseB] });
    }

    const curveA = new THREE.CatmullRomCurve3(ptsA);
    const curveB = new THREE.CatmullRomCurve3(ptsB);
    const tubeA = new THREE.TubeGeometry(curveA, RUNGS * 5, BACKBONE_R, 8, false);
    const tubeB = new THREE.TubeGeometry(curveB, RUNGS * 5, BACKBONE_R, 8, false);

    return { tubeA, tubeB, beads, plates };
  }, []);

  // Write per-instance matrices + colors once.
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const unit = new THREE.Vector3(1, 1, 1);
    const qI = new THREE.Quaternion();

    const bm = beadRef.current;
    beads.forEach(({ p, color }, i) => {
      m.compose(p, qI, unit);
      bm.setMatrixAt(i, m);
      bm.setColorAt(i, color);
    });
    bm.instanceMatrix.needsUpdate = true;
    if (bm.instanceColor) bm.instanceColor.needsUpdate = true;

    const pm = plateRef.current;
    plates.forEach(({ p, q, scale, color }, i) => {
      m.compose(p, q, scale);
      pm.setMatrixAt(i, m);
      pm.setColorAt(i, color);
    });
    pm.instanceMatrix.needsUpdate = true;
    if (pm.instanceColor) pm.instanceColor.needsUpdate = true;
  }, [beads, plates]);

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

    // Horizontal position is fixed — the molecule stays in the same vicinity
    // instead of sliding off-screen between sections.

    // Dim under text-heavy sections so legibility always wins (§6)
    dim.current = damp(dim.current, molecule.targetDim, 2.5, d);
    const lit = 1 - 0.6 * dim.current;
    if (keyLightRef.current) keyLightRef.current.intensity = 90 * lit;
    if (fillLightRef.current) fillLightRef.current.intensity = 50 * lit;
    if (dirLightRef.current) dirLightRef.current.intensity = 0.9 * lit;

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

        {/* sugar-phosphate backbones — Lambert: per-vertex lighting, cheap */}
        <mesh geometry={tubeA}>
          <meshLambertMaterial color={CLINICAL} />
        </mesh>
        <mesh geometry={tubeB}>
          <meshLambertMaterial color={CORAL} />
        </mesh>

        {/* backbone beads */}
        <instancedMesh
          ref={beadRef}
          args={[undefined, undefined, beads.length]}
        >
          <sphereGeometry args={[BEAD_R, 16, 16]} />
          <meshLambertMaterial />
        </instancedMesh>

        {/* flat stacked base pairs */}
        <instancedMesh
          ref={plateRef}
          args={[undefined, undefined, plates.length]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial />
        </instancedMesh>

        {/* two soft lights for shape (§3) */}
        <pointLight
          ref={keyLightRef}
          color="#cde3ec"
          intensity={90}
          distance={60}
          decay={1.4}
        />
        <pointLight
          ref={fillLightRef}
          color="#d6b0b0"
          intensity={50}
          distance={60}
          decay={1.4}
        />
      </group>
    </group>
  );
}

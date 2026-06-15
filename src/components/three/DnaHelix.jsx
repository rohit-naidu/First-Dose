"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress, molecule } from "@/lib/scroll";

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

/* Brand palette (UX brief §2/§3) — swap STRAND/BASE for reds to match a
   stock-style mRNA clip. */
const STRAND = new THREE.Color("#7fb5c9"); // clinical blue backbones
const BASE_WARM = new THREE.Color("#c97f7f"); // coral base accents
const BASE_COOL = new THREE.Color("#a99cc4"); // violet base accents
const HOT = new THREE.Color("#eaf4f8"); // bright sparkle highlights

/* Helix geometry */
const TURNS = 3.6;
const HEIGHT = 46;
const RADIUS = 4.0;
const PHASE = 2.45; // strand offset → major/minor grooves

const STRAND_PTS = 4200; // particles per backbone strand
const RUNGS = 42;
const RUNG_PTS = 80; // particles per base-pair rung
const HALO_PTS = 450; // faint surrounding haze

/* Soft round glow sprite so each particle reads as light, not a square */
function makeGlowTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  // Tight bright core + quick falloff = crisp particles, not fuzzy blobs
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.16, "rgba(255,255,255,0.98)");
  g.addColorStop(0.38, "rgba(255,255,255,0.28)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export default function DnaHelix({ reducedMotion = false }) {
  const outerRef = useRef();
  const spinRef = useRef();
  const pointsRef = useRef();

  const auto = useRef(0);
  const dim = useRef(0);

  const { geometry, texture } = useMemo(() => {
    const positions = [];
    const colors = [];
    const c = new THREE.Color();

    const rand = (a, b) => a + Math.random() * (b - a);
    const push = (x, y, z, color, bright) => {
      positions.push(x, y, z);
      c.copy(color).multiplyScalar(bright);
      colors.push(c.r, c.g, c.b);
    };

    // Two backbone strands — dense particle clouds with slight jitter
    for (let s = 0; s < 2; s++) {
      const offset = s === 0 ? 0 : PHASE;
      for (let i = 0; i < STRAND_PTS; i++) {
        const t = i / (STRAND_PTS - 1);
        const a = t * TURNS * Math.PI * 2 + offset;
        const y = (t - 0.5) * HEIGHT;
        const r = RADIUS + rand(-0.16, 0.16);
        const x = r * Math.cos(a) + rand(-0.09, 0.09);
        const z = r * Math.sin(a) + rand(-0.09, 0.09);
        const sparkle = Math.random() < 0.06;
        push(x, y + rand(-0.09, 0.09), z, sparkle ? HOT : STRAND, rand(0.65, 1.25));
      }
    }

    // Base-pair rungs — particles strung across the chord between the strands
    for (let k = 0; k < RUNGS; k++) {
      const t = k / (RUNGS - 1);
      const a = t * TURNS * Math.PI * 2;
      const y = (t - 0.5) * HEIGHT;
      const ax = RADIUS * Math.cos(a);
      const az = RADIUS * Math.sin(a);
      const bx = RADIUS * Math.cos(a + PHASE);
      const bz = RADIUS * Math.sin(a + PHASE);
      const warm = k % 2 === 0;
      for (let j = 0; j < RUNG_PTS; j++) {
        const u = j / (RUNG_PTS - 1);
        const x = ax + (bx - ax) * u + rand(-0.08, 0.08);
        const z = az + (bz - az) * u + rand(-0.08, 0.08);
        const yy = y + rand(-0.08, 0.08);
        push(x, yy, z, warm ? BASE_WARM : BASE_COOL, rand(0.55, 1.1));
      }
    }

    // Faint surrounding haze for the "millions of elements" depth
    for (let i = 0; i < HALO_PTS; i++) {
      const a = rand(0, Math.PI * 2);
      const r = RADIUS + rand(-1.4, 2.0);
      const y = rand(-0.5, 0.5) * HEIGHT;
      push(
        r * Math.cos(a),
        y,
        r * Math.sin(a),
        STRAND,
        rand(0.07, 0.18)
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return { geometry, texture: makeGlowTexture() };
  }, []);

  useFrame((state, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const d = Math.min(delta, 0.05);

    auto.current += (reducedMotion ? 0.0009 : 0.005) * (d * 60);
    const scrollPhase = reducedMotion ? 0 : scrollProgress.value * Math.PI * 1.5;
    if (spinRef.current) {
      spinRef.current.rotation.y = auto.current + scrollPhase;
    }

    // Dim under text-heavy sections via particle opacity (legibility, §6)
    dim.current = damp(dim.current, molecule.targetDim, 2.5, d);
    if (pointsRef.current) {
      pointsRef.current.material.opacity = 0.95 * (1 - 0.55 * dim.current);
    }
  });

  return (
    <group ref={outerRef} rotation={[0, 0, -0.5]} position={[5.2, 0, 0]} scale={1.2}>
      <group ref={spinRef}>
        <points ref={pointsRef} geometry={geometry}>
          <pointsMaterial
            map={texture}
            size={0.5}
            sizeAttenuation
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}

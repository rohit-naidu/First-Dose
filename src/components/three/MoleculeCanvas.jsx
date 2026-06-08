"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import DnaHelix from "./DnaHelix";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Persistent spine: one fixed, full-height canvas living behind all content.
 * The helix is tilted diagonally and offset to the right so hero copy occupies
 * the left negative space (UX brief §3 / §6 option B).
 */
export default function MoleculeCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 17], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor("#0a0e14", 1)}
      >
        {/* Exponential fog matched to the background so the helix fades into the page (§3) */}
        <fogExp2 attach="fog" args={["#0a0e14", 0.032]} />

        {/* Low warm ambient — directional rim + orbiting lights live in DnaHelix
            so they can dim per section (§3/§6) */}
        <ambientLight color="#3a4452" intensity={0.75} />

        <Suspense fallback={null}>
          <DnaHelix reducedMotion={reducedMotion} />

          {/* Restrained bloom — a soft light bleed, not a nightclub sign (§3) */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.9}
              luminanceSmoothing={0.4}
              intensity={0.35}
              radius={0.3}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

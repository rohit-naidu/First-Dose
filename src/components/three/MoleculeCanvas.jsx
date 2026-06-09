"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
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
 * Persistent spine: one fixed, full-height canvas behind all content.
 * Deliberately lightweight — simple lit geometry, no environment maps, no
 * post-processing — so it stays cheap to render on any machine (§3 / §6).
 */
export default function MoleculeCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 17], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => gl.setClearColor("#0a0e14", 1)}
      >
        {/* Fog matched to the background so the helix fades into the page (§3) */}
        <fogExp2 attach="fog" args={["#0a0e14", 0.03]} />
        <ambientLight color="#3a4452" intensity={0.7} />

        <Suspense fallback={null}>
          <DnaHelix reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

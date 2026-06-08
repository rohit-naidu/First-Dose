"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
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
 * The molecule is rendered like a real specimen under studio lighting —
 * physically-based clearcoat materials, image-based reflections from a
 * procedural softbox environment, macro depth-of-field, and filmic tone
 * mapping (UX brief §3 / §6 option B).
 */
export default function MoleculeCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 17], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => gl.setClearColor("#0a0e14", 1)}
      >
        {/* Exponential fog matched to the background so the helix fades into the page (§3) */}
        <fogExp2 attach="fog" args={["#0a0e14", 0.03]} />

        {/* Low warm ambient — most of the light is now image-based (§3) */}
        <ambientLight color="#3a4452" intensity={0.5} />

        <Suspense fallback={null}>
          {/* Procedural studio environment — gives the glossy surfaces real,
              clinical reflections without loading any external HDR. */}
          <Environment resolution={256} frames={1}>
            <color attach="background" args={["#070a0f"]} />
            <Lightformer
              intensity={2.4}
              color="#dcebf2"
              position={[10, 6, 6]}
              scale={[12, 12, 1]}
            />
            <Lightformer
              intensity={1.3}
              color="#e6c4c4"
              position={[-11, -4, 4]}
              scale={[12, 12, 1]}
            />
            <Lightformer
              intensity={1.6}
              color="#c3d2e6"
              position={[0, 9, -6]}
              scale={[16, 5, 1]}
            />
            <Lightformer
              intensity={1}
              color="#ffffff"
              position={[0, 0, 13]}
              scale={[9, 9, 1]}
            />
          </Environment>

          <DnaHelix reducedMotion={reducedMotion} />

          <EffectComposer multisampling={4}>
            {/* macro-photography focus falloff: center sharp, front/back beads soften */}
            <DepthOfField
              target={[4, 0, 0]}
              focalLength={0.018}
              bokehScale={2.4}
            />
            {/* restrained light bleed off the speculars — not a nightclub sign (§3) */}
            <Bloom
              luminanceThreshold={0.85}
              luminanceSmoothing={0.5}
              intensity={0.4}
              radius={0.4}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.25} darkness={0.65} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

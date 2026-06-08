"use client";

import { useEffect, useRef } from "react";
import { molecule } from "@/lib/scroll";

/**
 * Page section that, while it's the dominant section in view, tells the
 * persistent helix which side to occupy (moleculeX) and how far to dim
 * (moleculeDim, 0–1). See UX brief §6.
 */
export default function Section({
  id,
  moleculeX = 0,
  moleculeDim = 0,
  className = "",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            molecule.targetX = moleculeX;
            molecule.targetDim = moleculeDim;
          }
        }
      },
      { threshold: [0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [moleculeX, moleculeDim]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}

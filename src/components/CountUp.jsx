"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up that fires once when scrolled into view (UX brief §11).
 * Ease-out cubic, ~1.8s. Respects prefers-reduced-motion (snaps to value).
 */
export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
}) {
  const ref = useRef(null);
  const started = useRef(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || started.current) continue;
          started.current = true;

          if (reduce) {
            setVal(to);
            return;
          }
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

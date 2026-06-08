"use client";

import { motion } from "framer-motion";

/**
 * Calm fade + slide-up on scroll-enter. Reveals once. Honors reduced motion
 * automatically via framer-motion's reduced-motion handling.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 20,
  className = "",
  amount = 0.3,
}) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

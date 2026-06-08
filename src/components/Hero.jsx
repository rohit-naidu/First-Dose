"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STATS = [
  {
    node: <CountUp to={9} suffix="/10" />,
    color: "text-clinical glow-clinical",
    label: "GLP-1 patients never complete their first year of therapy",
  },
  {
    node: <CountUp to={71.7} decimals={1} prefix="$" suffix="B" />,
    color: "text-coral glow-coral",
    label: "Spent on GLP-1s in the US annually",
  },
  {
    node: <CountUp to={28} suffix="%" />,
    color: "text-slate glow-slate",
    label: "Of discontinuations are caused by predictable side effects",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-12 sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <div className="max-w-xl text-over-molecule">
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[2.05rem] font-light leading-[1.18] tracking-[-0.6px] text-ink sm:text-[2.75rem]"
          >
            For 200 years, medicine has been built for the{" "}
            <em className="font-light not-italic text-clinical italic">
              average
            </em>{" "}
            patient.
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-[1.2rem] font-light text-coral"
          >
            There is no average patient.
          </motion.p>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-[27rem] text-sm leading-[1.7] text-ink-55"
          >
            First Dose predicts individual drug response before the first
            prescription — so your patients get the right drug, at the right
            dose, the first time.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Partner with us
            </a>
            <a
              href="#how-it-works"
              className="rounded-[2px] border border-hairline bg-white/[0.02] px-6 py-3 text-[13px] text-ink backdrop-blur-sm transition-colors hover:border-ink/30"
            >
              Learn more
            </a>
          </motion.div>
        </div>

        {/* Three inline glowing stats along the bottom (§5.1) */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-16 grid max-w-3xl grid-cols-1 gap-px sm:grid-cols-3"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="px-1 py-2 sm:px-5 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-hairline"
            >
              <div
                className={`text-[2rem] font-extralight tracking-tight ${s.color}`}
              >
                {s.node}
              </div>
              <p className="mt-2 max-w-[15rem] text-[11px] leading-[1.5] text-ink-35">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

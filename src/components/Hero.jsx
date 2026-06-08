"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-12 sm:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-xl text-over-molecule">
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[2.05rem] font-light leading-[1.18] tracking-[-0.6px] text-ink sm:text-[2.75rem]"
          >
            For 200 years, medicine has been built for the{" "}
            <em className="font-light italic text-clinical">average</em>{" "}
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
            className="mt-6 max-w-[28rem] text-sm leading-[1.7] text-ink-55"
          >
            First Dose predicts how an individual will respond to a medication
            before the first prescription — so patients get the right drug, at
            the right dose, the first time. Starting with GLP-1s. Built for
            every drug class.
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
      </div>
    </section>
  );
}

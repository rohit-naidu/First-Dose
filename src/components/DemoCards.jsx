"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const DEMO_BASE = "https://first-dose-v3.vercel.app";

const CARDS = [
  {
    label: "Personalized Intake",
    body: "Adaptive assessment to identify your biological brakes and therapeutic accelerators — creates a personalized Dose Readiness Report.",
    cta: "Start Intake",
    href: `${DEMO_BASE}/patient/welcome`,
    accent: "clinical",
  },
  {
    label: "Clinician Portal",
    body: "Review patient data, risk profiles, and Dose Readiness signals to approve or adjust weekly dose escalations.",
    cta: "Open Dashboard",
    href: `${DEMO_BASE}/clinician`,
    accent: "slate",
  },
  {
    label: "Patient Management",
    body: "Track injections, log weekly weight, report side effects, and see your dose-pacing timeline update in real time.",
    cta: "Open Patient App",
    href: `${DEMO_BASE}/patient/home`,
    accent: "coral",
  },
];

const accentClasses = {
  clinical: {
    border: "border-clinical/30 hover:border-clinical/60",
    label: "text-clinical/60",
    cta: "text-clinical",
    dot: "bg-clinical",
  },
  slate: {
    border: "border-slate/30 hover:border-slate/60",
    label: "text-slate/60",
    cta: "text-slate",
    dot: "bg-slate",
  },
  coral: {
    border: "border-coral/30 hover:border-coral/60",
    label: "text-coral/60",
    cta: "text-coral",
    dot: "bg-coral",
  },
};

export default function DemoCards() {
  return (
    <section className="relative px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px w-4 bg-clinical/40" />
            <p className="section-label text-clinical/60">Interactive demo</p>
          </div>
          <p className="mt-1 max-w-lg text-sm leading-[1.7] text-ink-55">
            Explore how First Dose Health works — from adaptive intake to
            clinician review and patient tracking.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CARDS.map((card, i) => {
            const a = accentClasses[card.accent];
            return (
              <Reveal key={card.label} delay={i * 0.08}>
                <Link
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div
                    className={`glass flex h-full flex-col rounded-md border p-6 transition-all duration-200 ${a.border}`}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                      <p className={`section-label ${a.label}`}>{card.label}</p>
                    </div>
                    <p className="flex-1 text-sm leading-[1.7] text-ink-55">
                      {card.body}
                    </p>
                    <span className={`mt-5 text-[13px] font-medium ${a.cta}`}>
                      {card.cta} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

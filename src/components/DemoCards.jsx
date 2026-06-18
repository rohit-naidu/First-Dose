"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const CARDS = [
  {
    label: "Personalized Intake",
    step: "01",
    body: "Adaptive assessment to identify your biological brakes and therapeutic accelerators — creates a personalized Dose Readiness Report.",
    cta: "Start Intake",
    href: "/demo/intake",
    borderColor: "rgba(127,181,201,0.25)",
    hoverBorderColor: "rgba(127,181,201,0.55)",
    accentColor: "#7fb5c9",
    glowColor: "rgba(127,181,201,0.07)",
  },
  {
    label: "Clinician Portal",
    step: "02",
    body: "Review patient data, risk profiles, and Dose Readiness signals to approve or adjust weekly dose escalations.",
    cta: "Open Dashboard",
    href: "/demo/clinician",
    borderColor: "rgba(169,156,196,0.25)",
    hoverBorderColor: "rgba(169,156,196,0.55)",
    accentColor: "#a99cc4",
    glowColor: "rgba(169,156,196,0.07)",
  },
  {
    label: "Patient Management",
    step: "03",
    body: "Track injections, log weekly weight, report side effects, and see your dose-pacing timeline update in real time.",
    cta: "Open Patient App",
    href: "/demo/patient/home",
    borderColor: "rgba(201,127,127,0.25)",
    hoverBorderColor: "rgba(201,127,127,0.55)",
    accentColor: "#c97f7f",
    glowColor: "rgba(201,127,127,0.07)",
  },
];

export default function DemoCards() {
  return (
    <Reveal delay={0.2}>
      <div className="mt-16 rounded-md border border-hairline" style={{ background: "rgba(255,255,255,0.015)" }}>
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-clinical animate-pulse" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-clinical/70">
              Interactive demo — GLP-1 platform
            </p>
          </div>
          <p className="hidden text-[11px] text-ink-35 sm:block">
            No login required
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-px bg-hairline sm:grid-cols-3">
          {CARDS.map((card, i) => (
            <Link
              key={card.label}
              href={card.href}
              className="group relative flex flex-col p-6 transition-all duration-300"
              style={{ background: "rgba(10,14,20,0.9)" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = card.glowColor;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10,14,20,0.9)";
              }}
            >
              {/* Step + label */}
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="text-[10px] font-semibold tracking-[0.12em]"
                  style={{ color: card.accentColor, opacity: 0.6 }}
                >
                  {card.step}
                </span>
                <div className="h-px flex-1" style={{ background: card.borderColor }} />
              </div>

              <p className="mb-3 text-sm font-medium text-ink">{card.label}</p>
              <p className="flex-1 text-[13px] leading-[1.7] text-ink-45">
                {card.body}
              </p>

              {/* CTA */}
              <div className="mt-5 flex items-center gap-1.5">
                <span
                  className="text-[12px] font-medium transition-all duration-200 group-hover:gap-2"
                  style={{ color: card.accentColor }}
                >
                  {card.cta}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: card.accentColor }}
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, ${card.accentColor}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

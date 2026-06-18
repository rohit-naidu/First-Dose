import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

/* ---- stage icons (simple stroke line art) ---- */
const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function IntakeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function ClinicianIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function PatientIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5" />
      <path d="M3 21v-1a7 7 0 0114 0v1" />
      <path d="M16 11l1.5 4.5L19 14l1.5 1.5" />
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Personalized Intake",
    Icon: IntakeIcon,
    body: "Adaptive assessment to identify your biological brakes and therapeutic accelerators — creates a personalized Dose Readiness Report.",
    chipLabel: "What it covers",
    chips: [
      "Safety screening",
      "Nausea sensitivity",
      "Appetite signals",
      "GI baseline",
      "Mood & autonomic flags",
      "Prior GLP-1 response",
    ],
    href: "/demo/intake",
    cta: "Start Intake",
  },
  {
    n: "02",
    title: "Clinician Portal",
    Icon: ClinicianIcon,
    body: "Review patient data, risk profiles, and Dose Readiness signals to approve or adjust weekly dose escalations.",
    chipLabel: "Clinician tools",
    chips: [
      "Dose Readiness Report",
      "Risk flag review",
      "Weekly escalation approval",
      "Patient timeline",
    ],
    href: "/demo/clinician",
    cta: "Open Dashboard",
  },
  {
    n: "03",
    title: "Patient Management",
    Icon: PatientIcon,
    body: "Track injections, log weekly weight, report side effects, and see your dose-pacing timeline update in real time.",
    chipLabel: "Patient features",
    chips: [
      "Injection tracking",
      "Weekly weight log",
      "Side-effect check-in",
      "Dose-pacing timeline",
    ],
    href: "/demo/patient/home",
    cta: "Open Patient App",
  },
];

function Chip({ children }) {
  return (
    <li className="rounded-full border border-hairline bg-white/[0.02] px-2.5 py-1 text-[11px] leading-none text-ink-55">
      {children}
    </li>
  );
}

function Step({ step }) {
  const { Icon } = step;
  return (
    <Link href={step.href} className="block h-full">
      <div className="glass group flex h-full flex-col rounded-md border border-hairline p-7 transition-colors duration-200 hover:border-clinical/40">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-clinical/30 bg-clinical/[0.06] text-clinical">
            <Icon />
          </span>
          <div>
            <span className="block text-[11px] font-medium tracking-[0.14em] text-clinical/60">
              STEP {step.n}
            </span>
            <h3 className="text-lg font-light text-ink">{step.title}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-[1.6] text-ink-55">{step.body}</p>

        <div className="mt-6 border-t border-hairline pt-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-35">
            {step.chipLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {step.chips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-center gap-1 text-[13px] font-medium text-clinical">
          {step.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center text-clinical/40 md:flex">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}


export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      moleculeX={6.5}
      moleculeDim={0.42}
      className="relative px-6 py-24 sm:px-10"
    >
      <SectionBackdrop {...PHOTOS.howItWorks} />
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="section-label text-clinical/60">How it works</p>
          <h2 className="mt-4 max-w-2xl text-[2rem] font-light leading-[1.2] tracking-[-0.5px] text-ink sm:text-[2.4rem]">
            How First Dose works
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-[1.7] text-ink-55">
            One pipeline, three stages: from raw patient signals to a
            prescription a clinician can act on.
          </p>
        </Reveal>

        {/* Flow: Profile -> Predict -> Prescribe */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Reveal>
            <Step step={STEPS[0]} />
          </Reveal>
          <FlowArrow />
          <Reveal delay={0.1}>
            <Step step={STEPS[1]} />
          </Reveal>
          <FlowArrow />
          <Reveal delay={0.2}>
            <Step step={STEPS[2]} />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-base font-light text-ink-60">
            Starting with GLP-1s.{" "}
            <span className="text-clinical">Built for every drug class.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const cards = [
  {
    href: "/demo/intake",
    label: "Patient Intake",
    description:
      "Complete the clinical intake questionnaire. Your responses shape the personalised dosing plan.",
    cta: "Start intake",
  },
  {
    href: "/demo/clinician",
    label: "Clinician Portal",
    description:
      "Review flagged safety signals, approve the titration schedule, and monitor both active patients.",
    cta: "Open portal",
  },
  {
    href: "/demo/patient/home",
    label: "Patient Dashboard",
    description:
      "Track injections, log symptoms, view weight progress, and prepare for each check-in.",
    cta: "View dashboard",
  },
];

export default function DemoPage() {
  return (
    <Section
      id="demo-hub"
      moleculeX={0}
      moleculeDim={0.3}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <Reveal className="text-center mb-14 flex flex-col items-center gap-4">
        <span className="section-label text-clinical tracking-widest">
          Interactive Demo
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold text-ink leading-tight max-w-xl text-over-molecule">
          See First Dose in action
        </h1>
        <p className="text-ink-55 max-w-md text-base leading-relaxed">
          Step through the full GLP-1 titration workflow — from patient intake
          to clinician review to injection-day guidance.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3 w-full max-w-4xl">
        {cards.map((card, i) => (
          <Reveal key={card.href} delay={i * 0.1}>
            <Link
              href={card.href}
              className="group glass border border-hairline rounded-2xl p-7 flex flex-col gap-4 hover:border-clinical/40 transition-colors duration-300"
            >
              <span className="section-label text-clinical">{card.label}</span>
              <p className="text-ink-55 text-sm leading-relaxed flex-1">
                {card.description}
              </p>
              <span className="flex items-center gap-2 text-ink text-sm font-medium group-hover:text-clinical transition-colors duration-200">
                {card.cta}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

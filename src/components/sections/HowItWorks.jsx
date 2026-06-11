import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const STEPS = [
  {
    n: "01",
    title: "Profile",
    body: "We assemble the full picture of the individual: the genetic, molecular, and clinical signals that shape how their body will metabolize and respond to a drug.",
    chipLabel: "Signals we read",
    chips: [
      "Pharmacogenomic markers",
      "Drug-target pathway variants",
      "Metabolic & inflammatory bloodwork",
      "Clinical & family history",
    ],
  },
  {
    n: "02",
    title: "Predict",
    body: "The model converts that profile into calibrated, per-patient predictions: not a single yes/no, but a probability for each outcome that matters.",
    chipLabel: "What the model outputs",
    chips: [
      "Response probability",
      "Adverse-event risk by class",
      "Optimal starting dose",
      "Time-to-response estimate",
    ],
  },
  {
    n: "03",
    title: "Prescribe",
    body: "The prediction arrives as a specific recommendation inside the tools the clinician already uses. Not a report to interpret. A decision, ready to act on.",
    chipLabel: "How it's delivered",
    chips: [
      "EHR-native order suggestion",
      "Confidence + key drivers",
      "Monitoring plan",
      "Auditable, cited reasoning",
    ],
  },
];

function Chip({ children }) {
  return (
    <li className="rounded-full border border-hairline bg-white/[0.02] px-2.5 py-1 text-[11px] leading-none text-ink-55">
      {children}
    </li>
  );
}

/* Illustrative model output a clinician would see — grounds the abstract
   pipeline in something concrete (planning doc §4). */
function SampleOutput() {
  return (
    <div className="glass overflow-hidden rounded-lg border border-clinical/25">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <span className="text-[11px] uppercase tracking-[0.15em] text-clinical/70">
          Illustrative output
        </span>
        <span className="rounded-full bg-clinical/15 px-2 py-0.5 text-[10px] font-medium text-clinical">
          GLP-1 · semaglutide
        </span>
      </div>

      <div className="grid gap-px bg-hairline sm:grid-cols-3">
        <div className="bg-bg/40 px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-ink-35">
            Predicted response
          </p>
          <p className="mt-1.5 text-2xl font-light text-clinical">87%</p>
          <p className="mt-1 text-[11px] text-ink-45">
            ≥5% weight loss at 6 mo
          </p>
        </div>
        <div className="bg-bg/40 px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-ink-35">
            GI intolerance risk
          </p>
          <p className="mt-1.5 text-2xl font-light text-ink">Low</p>
          <p className="mt-1 text-[11px] text-ink-45">
            below population baseline
          </p>
        </div>
        <div className="bg-bg/40 px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-ink-35">
            Recommended titration
          </p>
          <p className="mt-1.5 text-2xl font-light text-ink">Conservative</p>
          <p className="mt-1 text-[11px] text-ink-45">
            slower ramp than standard
          </p>
        </div>
      </div>

      <div className="border-t border-hairline px-5 py-3">
        <p className="text-[12px] leading-[1.6] text-ink-45">
          <span className="text-ink-60">Key drivers:</span> target-pathway
          genotype, baseline metabolic trajectory, and no significant
          drug-drug interactions.
        </p>
      </div>
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
            prescription a clinician can act on. Here is what moves through it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="glass flex h-full flex-col rounded-md border border-hairline p-7">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extralight tracking-tight text-clinical glow-clinical">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-light text-ink">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-[1.7] text-ink-55">
                  {s.body}
                </p>

                <div className="mt-6 border-t border-hairline pt-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ink-35">
                    {s.chipLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-6">
            <SampleOutput />
          </div>
        </Reveal>

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

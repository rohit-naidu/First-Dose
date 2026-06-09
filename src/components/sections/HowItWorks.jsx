import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const STEPS = [
  {
    n: "01",
    title: "Profile",
    body: "We bring together the full picture of the individual: genetics, bloodwork, clinical and family history. Every signal that shapes how their body will respond.",
  },
  {
    n: "02",
    title: "Predict",
    body: "Our model turns that profile into a clear prediction: whether the drug will work for this patient, the side effects they're likely to face, and the dose most likely to succeed, all before the first dose.",
  },
  {
    n: "03",
    title: "Prescribe",
    body: "The clinician receives a specific recommendation: the right drug, at the right dose, for this patient. It arrives inside the tools they already use. Not a report to interpret. A decision already made.",
  },
];

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
            Three steps stand between a patient and the right prescription. We
            turn each one from a guess into a decision.
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
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-base font-light text-ink-60">
            Starting with GLP-1s.{" "}
            <span className="text-clinical">Built for every drug class.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Profile",
    body: "Before a patient starts a new medication, we analyze the biological markers that predict how their body will process it.",
  },
  {
    n: "02",
    title: "Predict",
    body: "Our model identifies each patient's individual response profile — who will respond, who will struggle, and why.",
  },
  {
    n: "03",
    title: "Prescribe",
    body: "Clinicians receive a clear recommendation embedded in their existing workflow. Not a report to interpret. A decision already made.",
  },
];

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      moleculeX={6.5}
      moleculeDim={0.55}
      className="relative px-6 py-32 sm:px-10"
    >
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="section-label text-clinical/60">How it works</p>
          <h2 className="mt-4 max-w-2xl text-[2rem] font-light leading-[1.2] tracking-[-0.5px] text-ink sm:text-[2.4rem]">
            How First Dose works
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="max-w-sm">
                <span className="text-sm font-light tracking-[0.2em] text-clinical">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-light text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-ink-55">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 text-base font-light text-ink-60">
            Starting with GLP-1s.{" "}
            <span className="text-clinical">Built for every drug class.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const STATS = [
  {
    value: "9 in 10",
    color: "text-clinical glow-clinical",
    lead: "GLP-1 patients never complete their first year of therapy.",
    accent: "Most don't fail the drug. The drug fails them.",
  },
  {
    value: "$71.7B",
    color: "text-coral glow-coral",
    lead: "Spent on GLP-1s in the US annually — much of it prescribed to patients who will discontinue within months.",
    accent: "The waste isn't a billing problem. It's a precision problem.",
  },
  {
    value: "28%",
    color: "text-slate glow-slate",
    lead: "Of discontinuations have side effects as a documented reason — many of them predictable before the first dose.",
    accent: "We already know who will struggle. We just haven't been using that knowledge.",
  },
];

export default function Problem() {
  return (
    <Section
      id="problem"
      moleculeX={-7}
      moleculeDim={0.62}
      className="relative px-6 py-32 sm:px-10"
    >
      <SectionBackdrop {...PHOTOS.problem} />
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="section-label text-clinical/60">The problem</p>
          <h2 className="mt-4 max-w-2xl text-[2rem] font-light leading-[1.2] tracking-[-0.5px] text-ink sm:text-[2.4rem]">
            The drug works. The matching doesn&apos;t.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.1}>
              <div className="glass h-full rounded-md border border-clinical/15 p-7">
                <div className={`text-[2.2rem] font-extralight tracking-tight ${s.color}`}>
                  {s.value}
                </div>
                <p className="mt-4 text-sm leading-[1.7] text-ink-55">
                  {s.lead}
                </p>
                <p className="mt-3 text-sm italic leading-[1.6] text-ink-60">
                  {s.accent}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-lg font-light text-ink-60">
            These aren&apos;t failures of medicine.{" "}
            <span className="text-clinical">They&apos;re failures of matching.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

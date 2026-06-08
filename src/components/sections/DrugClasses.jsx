import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const CARDS = [
  {
    name: "GLP-1s",
    live: true,
    href: "/glp-1",
    body: "The fastest growing drug class in America. The highest discontinuation rate of any medication. 9 in 10 patients don't complete their first year. Side effects, wrong dosing, wrong patient. First Dose predicts individual response before the first prescription — so your patients stay on therapy.",
  },
  {
    name: "Antidepressants",
    live: false,
    href: "/antidepressants",
    body: "1 in 3 patients don't respond to their first antidepressant. Most wait months to find out. Pharmacogenomic-guided prescribing increases remission rates by 58% at 8 weeks. The data exists. The application doesn't — yet.",
  },
  {
    name: "Cardiovascular",
    live: false,
    href: "/cardiovascular",
    body: "The wrong anticoagulant dose doesn't cause side effects. It causes strokes. CYP2C19 genotyping already guides clopidogrel prescribing in leading cardiac centers. We're bringing that precision to every clinic.",
  },
  {
    name: "Oncology",
    live: false,
    href: "/oncology",
    body: "In cancer treatment, the wrong drug isn't an inconvenience. It's a lost window. Pharmacogenomics has the strongest evidence base in all of medicine here. We're making precision response prediction universal.",
  },
];

function Pill({ live }) {
  return live ? (
    <span className="rounded-full bg-clinical px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bg">
      Live
    </span>
  ) : (
    <span className="rounded-full border border-hairline px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-35">
      Coming soon
    </span>
  );
}

export default function DrugClasses() {
  return (
    <Section
      id="drug-classes"
      moleculeX={9.5}
      moleculeDim={0.8}
      className="relative px-6 py-32 sm:px-10"
    >
      <SectionBackdrop {...PHOTOS.drugClasses} />
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="section-label text-clinical/60">One platform</p>
          <h2 className="mt-4 max-w-2xl text-[2rem] font-light leading-[1.2] tracking-[-0.5px] text-ink sm:text-[2.4rem]">
            One platform. Every medication.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.7] text-ink-55">
            We&apos;re starting where the evidence is strongest and the need is
            most urgent. The rest is coming.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {CARDS.map((c, i) => {
            const inner = (
              <div
                className={`glass flex h-full flex-col rounded-md border p-7 transition-all ${
                  c.live
                    ? "border-clinical/40 hover:border-clinical/70"
                    : "border-hairline opacity-80 hover:opacity-100 hover:border-hairline"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg text-ink">{c.name}</h3>
                  <Pill live={c.live} />
                </div>
                <p className="mt-4 flex-1 text-sm leading-[1.7] text-ink-55">
                  {c.body}
                </p>
                <span
                  className={`mt-6 text-[13px] font-medium ${
                    c.live ? "text-clinical" : "text-ink-45"
                  }`}
                >
                  {c.live ? "Learn more →" : "Read more →"}
                </span>
              </div>
            );

            return (
              <Reveal key={c.name} delay={(i % 2) * 0.1}>
                <Link href={c.href} className="block h-full">
                  {inner}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

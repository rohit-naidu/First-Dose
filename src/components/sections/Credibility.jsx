import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const INSTITUTIONS = ["Bristol Myers Squibb", "Johnson & Johnson", "GSK"];

const ADVISORS = [
  {
    name: "Dr. Chowdari",
    org: "Bristol Myers Squibb",
    focus: "Drug development and clinical pharmacology",
  },
  {
    name: "Dr. Eltepu",
    org: "Johnson & Johnson",
    focus: "Precision medicine and regulatory strategy",
  },
  {
    name: "Dr. Peddi",
    org: "GSK",
    focus: "Pharmacogenomics and therapeutic response",
  },
];

const PUBLICATIONS = [
  { label: "Publication 01", href: "#" },
  { label: "Publication 02", href: "#" },
  { label: "Publication 03", href: "#" },
];

export default function Credibility() {
  return (
    <Section
      id="credibility"
      moleculeX={-6.5}
      moleculeDim={0.62}
      className="relative px-6 py-32 sm:px-10"
    >
      <SectionBackdrop {...PHOTOS.credibility} />
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="section-label text-clinical/60">Built on real science</p>
          <h2 className="mt-4 max-w-3xl text-[1.6rem] font-light leading-[1.35] tracking-[-0.3px] text-ink sm:text-[2rem]">
            First Dose is built by researchers, validated by clinicians, and
            trusted by the institutions that set the standard for drug
            development.
          </h2>
        </Reveal>

        {/* Layer 1 — institutional bar */}
        <Reveal delay={0.05}>
          <div className="mt-14">
            <p className="text-[11px] uppercase tracking-[0.15em] text-ink-35">
              Advisory board from
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {INSTITUTIONS.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-hairline px-4 py-2 text-[13px] text-ink-60"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Layer 2 — advisors */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-hairline sm:grid-cols-3">
          {ADVISORS.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.1}>
              <div className="glass h-full p-6">
                <h3 className="text-base text-ink">{a.name}</h3>
                <p className="mt-1 text-[13px] text-clinical/80">{a.org}</p>
                <p className="mt-3 text-[13px] leading-[1.6] text-ink-45">
                  {a.focus}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Layer 3 — research */}
        <Reveal delay={0.05}>
          <div className="mt-12 max-w-2xl">
            <p className="text-sm leading-[1.7] text-ink-55">
              Six years of computational pharmacology research across USC, UCI,
              and Texas Tech. Three peer-reviewed publications.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {PUBLICATIONS.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="text-[13px] text-clinical underline decoration-clinical/30 underline-offset-4 transition-colors hover:decoration-clinical"
                >
                  {p.label} →
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Layer 4 — traction + closing */}
        <Reveal delay={0.05}>
          <div className="mt-10 border-t border-hairline pt-8">
            <p className="text-sm text-ink-45">
              Currently in pilot with{" "}
              <span className="text-ink-60">[clinic partner]</span>.
            </p>
            <p className="mt-2 text-base font-light text-ink-60">
              Early data is validating what the science predicted.{" "}
              <span className="text-clinical">More to come.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

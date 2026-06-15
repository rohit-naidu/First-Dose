import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const INSTITUTIONS = ["Bristol Myers Squibb", "Johnson & Johnson", "GSK"];

// Telehealth clinic pilot partners shown in the scrolling marquee.
// To use a real logo: drop the file in public/images/partners/ and set
// `logo` to its path, e.g. logo: "/images/partners/gorocky.svg".
// `h` optionally tunes that logo's rendered height in px (defaults to 28).
const PARTNERS = [
  { name: "GoRocky", logo: "/images/partners/gorocky-clean.png", h: 40 },
  { name: "Saaya", logo: "/images/partners/saaya.png", h: 68 },
  { name: "TeleMed2U", logo: "/images/partners/telemed2u.png", h: 54 },
  { name: "MiDocOnline", logo: "/images/partners/midoconline.webp", h: 40 },
];

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

export default function Credibility() {
  return (
    <Section
      id="credibility"
      moleculeX={-6.5}
      moleculeDim={0.45}
      className="relative px-6 py-24 sm:px-10"
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

        {/* Pilot band — lead proof point */}
        <Reveal delay={0.05}>
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-45">
              Currently piloting with
            </p>
            <div className="marquee-mask relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
              <div className="marquee-track flex w-max items-center py-2">
                {[...PARTNERS, ...PARTNERS].map((p, i) => (
                  <span
                    key={`${p.name}-${i}`}
                    className="mr-20 flex items-center whitespace-nowrap"
                  >
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo}
                        alt={p.name}
                        style={{ height: p.h ? `${p.h}px` : "40px" }}
                        className="w-auto opacity-90 transition-opacity hover:opacity-100"
                      />
                    ) : (
                      <span className="text-2xl font-medium text-ink-60">
                        {p.name}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-6 text-base font-light text-ink-60">
              Early data is validating what the science predicted.{" "}
              <span className="text-clinical">More to come.</span>
            </p>
          </div>
        </Reveal>

        {/* Institutional bar */}
        <Reveal delay={0.05}>
          <div className="mt-14 border-t border-hairline pt-10">
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

        {/* Layer 3 — research blog (highlighted callout) */}
        <Reveal delay={0.05}>
          <a
            href="https://sideeffect.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex flex-col gap-6 rounded-xl border border-clinical/25 bg-clinical/[0.05] p-7 transition-colors hover:border-clinical/50 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="max-w-2xl">
              <p className="section-label text-clinical/70">Our research</p>
              <p className="mt-3 text-xl font-light leading-[1.45] text-ink sm:text-2xl">
                Six-plus years studying how individuals respond to medication,{" "}
                <span className="text-clinical">published openly.</span>
              </p>
              <p className="mt-2 text-sm leading-[1.6] text-ink-50">
                We write about what we learn at sideeffect.me.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-[2px] bg-clinical px-6 py-3.5 text-[13px] font-semibold text-bg transition-opacity group-hover:opacity-90">
              Read the blog →
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

import Link from "next/link";
import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "GLP-1s | First Dose Health",
  description:
    "9 in 10 GLP-1 patients never complete their first year of therapy. First Dose predicts individual GLP-1 response before the first prescription.",
};

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="hairline" />
    </div>
  );
}

export default function Glp1Page() {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      <main className="relative z-10">
        <Section
          id="top"
          moleculeX={5.2}
          moleculeDim={0}
          className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-16 sm:px-10"
        >
          <div className="mx-auto w-full max-w-7xl text-over-molecule">
            <Reveal y={0}>
              <Link
                href="/"
                className="text-[13px] text-ink-45 transition-colors hover:text-ink"
              >
                ← First Dose Health
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-10 flex items-center gap-3">
                <span className="rounded-full bg-clinical px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bg">
                  Live
                </span>
                <span className="section-label text-clinical/60">GLP-1s</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-[2.05rem] font-light leading-[1.18] tracking-[-0.6px] text-ink sm:text-[2.9rem]">
                Predicting individual GLP-1 response,{" "}
                <em className="font-light italic text-clinical">
                  before the first prescription.
                </em>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[30rem] text-sm leading-[1.7] text-ink-55">
                9 in 10 GLP-1 patients never complete their first year. First
                Dose predicts who will respond, who will struggle, and why, so
                your patients stay on therapy.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact-form"
                  className="rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90"
                >
                  Partner with us
                </a>
                <Link
                  href="/#drug-classes"
                  className="rounded-[2px] border border-hairline bg-white/[0.05] px-6 py-3 text-[13px] text-ink transition-colors hover:border-ink/30"
                >
                  See all drug classes
                </Link>
              </div>
            </Reveal>
          </div>
        </Section>

        <Divider />
        <Problem />
        <Divider />
        <HowItWorks />
        <Divider />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

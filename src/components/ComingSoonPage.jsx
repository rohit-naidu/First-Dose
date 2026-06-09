import Link from "next/link";
import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/**
 * Lightweight placeholder for the not-yet-live drug classes (planning doc §5).
 * Same shell + spine as the rest of the site; one punchy claim + the
 * consequence copy, then routes the reader back to what's live.
 */
export default function ComingSoonPage({ name, headline, body }) {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      <main className="relative z-10">
        <Section
          id="top"
          moleculeX={6}
          moleculeDim={0.4}
          className="relative flex min-h-[100svh] flex-col justify-center px-6 py-32 sm:px-10"
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
                <span className="rounded-full border border-hairline px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-35">
                  Coming soon
                </span>
                <span className="section-label text-clinical/60">{name}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-[1.9rem] font-light leading-[1.22] tracking-[-0.5px] text-ink sm:text-[2.6rem]">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[34rem] text-sm leading-[1.7] text-ink-55">
                {body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/glp-1"
                  className="rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90"
                >
                  See what&apos;s live →
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-[2px] border border-hairline bg-white/[0.05] px-6 py-3 text-[13px] text-ink transition-colors hover:border-ink/30"
                >
                  Get in touch
                </Link>
              </div>
            </Reveal>
          </div>
        </Section>
        <Footer />
      </main>
    </>
  );
}

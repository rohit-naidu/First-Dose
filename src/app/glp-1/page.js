import Link from "next/link";

export const metadata = {
  title: "GLP-1s — First Dose Health",
  description:
    "Predicting individual GLP-1 response before the first prescription.",
};

// Placeholder. The full GLP-1 sub-page (deeper problem framing, product detail,
// pilot data) is a later milestone — open item #7 in the planning brief.
export default function Glp1Page() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-32 sm:px-10">
      <Link
        href="/"
        className="text-[13px] text-ink-45 transition-colors hover:text-ink"
      >
        ← First Dose Health
      </Link>
      <p className="section-label mt-12 text-clinical/60">GLP-1s · Live</p>
      <h1 className="mt-4 text-[2rem] font-light leading-[1.2] tracking-[-0.5px] text-ink sm:text-[2.6rem]">
        Predicting individual GLP-1 response,{" "}
        <em className="font-light italic text-clinical">
          before the first prescription.
        </em>
      </h1>
      <p className="mt-6 max-w-xl text-sm leading-[1.7] text-ink-55">
        9 in 10 GLP-1 patients never complete their first year of therapy. Most
        don&apos;t fail the drug — the drug fails them. This page is being built
        out with the full problem framing, product detail, and pilot data.
      </p>
      <div className="mt-10">
        <Link
          href="/#contact"
          className="rounded-[2px] bg-clinical px-6 py-3 text-[13px] font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Partner with us
        </Link>
      </div>
    </main>
  );
}

// The scientific-photography "scale arc" (UX brief §9–10). Each section gets a
// real microscopy image at very low opacity as texture. Drop files into
// public/images/science/ and set `src` below — components already render them.
// Until then `src: null` keeps the persistent molecule as the sole texture.
//
// Source everything from credible, license-clear archives (see
// public/images/science/README.md). Do NOT use stock photography.

export const PHOTOS = {
  // Problem (GLP-1 sub-page) — dividing cell / mitosis. ~Cellular scale.
  problem: {
    src: null, // e.g. "/images/science/mitosis.jpg"
    overlay: "rgba(10,14,20,0.90)",
    animation: "kenburns",
    opacity: 0.1,
  },
  // How It Works — neuron network / synapses. ~Tissue scale.
  howItWorks: {
    src: null,
    overlay: "rgba(10,14,20,0.88)",
    animation: "pan",
    opacity: 0.1,
  },
  // Drug Classes — red blood cells in a capillary. ~Organ-system scale.
  drugClasses: {
    src: null,
    overlay: "rgba(10,14,20,0.91)",
    animation: "drift",
    opacity: 0.09,
  },
  // Credibility — chromosome spread / karyotype. ~Genomic scale.
  credibility: {
    src: null,
    overlay: "rgba(10,14,20,0.90)",
    animation: "pulse",
    opacity: 0.1,
  },
  // CTA — SEM tissue surface. ~Human-body scale.
  cta: {
    src: null,
    overlay: "rgba(10,14,20,0.92)",
    animation: "drift",
    opacity: 0.09,
  },
};

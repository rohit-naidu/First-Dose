import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />

        {/* Temporary scroll runway so scroll-driven helix rotation is visible.
            Replaced by Problem / How It Works / etc. in the next milestone. */}
        <div className="flex h-[120vh] items-start justify-center pt-24">
          <span className="section-label text-clinical/60">
            More sections coming
          </span>
        </div>
      </main>
    </>
  );
}

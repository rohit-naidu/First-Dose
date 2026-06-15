import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PilotBand from "@/components/PilotBand";
import HowItWorks from "@/components/sections/HowItWorks";
import Credibility from "@/components/sections/Credibility";
import DrugClasses from "@/components/sections/DrugClasses";
import Trajectory from "@/components/sections/Trajectory";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="hairline" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <PilotBand />
        <Divider />
        <HowItWorks />
        <Divider />
        <Credibility />
        <Divider />
        <DrugClasses />
        <Divider />
        <Trajectory />
        <Divider />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

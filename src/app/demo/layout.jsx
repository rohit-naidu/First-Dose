import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";

export default function DemoLayout({ children }) {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </>
  );
}

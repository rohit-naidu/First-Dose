import MoleculeCanvas from "@/components/three/MoleculeCanvas";
import Navbar from "@/components/Navbar";

export default function DemoLayout({ children }) {
  return (
    <>
      <MoleculeCanvas />
      <Navbar />
      {/* pt-16 clears the fixed navbar (h-16 = 64px) so content is never overlapped */}
      <main className="relative z-10 pt-16">{children}</main>
    </>
  );
}

import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Oncology — First Dose Health",
  description:
    "Pharmacogenomics has the strongest evidence base in all of medicine in oncology. Coming soon to First Dose.",
};

export default function Page() {
  return (
    <ComingSoonPage
      name="Oncology"
      headline="In cancer treatment, the wrong drug isn't an inconvenience. It's a lost window."
      body="Pharmacogenomics has the strongest evidence base in all of medicine here. We're making precision response prediction universal."
    />
  );
}

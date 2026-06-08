import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Cardiovascular — First Dose Health",
  description:
    "CYP2C19 genotyping already guides clopidogrel prescribing in leading cardiac centers. Coming soon to First Dose.",
};

export default function Page() {
  return (
    <ComingSoonPage
      name="Cardiovascular"
      headline="The wrong anticoagulant dose doesn't cause side effects. It causes strokes."
      body="CYP2C19 genotyping already guides clopidogrel prescribing in leading cardiac centers. We're bringing that precision to every clinic."
    />
  );
}

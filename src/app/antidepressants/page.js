import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Antidepressants — First Dose Health",
  description:
    "Pharmacogenomic-guided prescribing increases remission rates by 58% at 8 weeks. Coming soon to First Dose.",
};

export default function Page() {
  return (
    <ComingSoonPage
      name="Antidepressants"
      headline="1 in 3 patients don't respond to their first antidepressant. Most wait months to find out."
      body="Pharmacogenomic-guided prescribing increases remission rates by 58% at 8 weeks. The data exists. The application doesn't — yet."
    />
  );
}

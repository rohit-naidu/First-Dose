import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Cardiovascular — First Dose Health",
  description:
    "Understand each person well enough and cardiovascular risk becomes solvable. Coming soon to First Dose.",
};

export default function Page() {
  return (
    <ComingSoonPage
      name="Cardiovascular"
      headline="The breakthrough isn't a new drug. It's understanding each person well enough to solve it."
      body="Cardiovascular care has been built on population averages. Read an individual's biology precisely enough — their genetics, their markers — and the right prevention, the right therapy, the right dose become predictable, not trial-and-error. We're bringing that precision to every clinic."
    />
  );
}

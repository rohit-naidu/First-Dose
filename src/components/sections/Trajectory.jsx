import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function Trajectory() {
  return (
    <Section
      id="trajectory"
      moleculeX={9}
      moleculeDim={0.5}
      className="relative px-6 py-40 sm:px-10"
    >
      <div className="mx-auto max-w-3xl text-center text-over-molecule">
        <Reveal amount={0.4}>
          <p className="text-[1.35rem] font-extralight leading-[1.5] tracking-[-0.2px] text-ink-60 sm:text-[1.6rem]">
            The next frontier of medicine isn&apos;t a new drug. It&apos;s
            understanding each human being at a biological level with enough
            depth that disease becomes predictable, treatment becomes personal,
            and the question of{" "}
            <span className="text-clinical">how to live longer</span> finally
            has a real answer.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

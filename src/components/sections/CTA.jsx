import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import SectionBackdrop from "@/components/SectionBackdrop";
import { PHOTOS } from "@/lib/photography";

const BLOCKS = [
  {
    label: "For clinics",
    body: "Reduce side effects. Improve retention. Prescribe with precision. Join the growing number of telehealth providers using First Dose to match patients to the right medication before they take it.",
    cta: "Partner with First Dose →",
  },
  {
    label: "For investors & partners",
    body: "The precision layer for medicine doesn't exist yet. We're building it, starting with the drug decision, expanding to the full picture of individual health. If you want to be part of that, we want to hear from you.",
    cta: "Get in touch →",
  },
];

export default function CTA() {
  return (
    <Section
      id="contact"
      moleculeX={9}
      moleculeDim={0.55}
      className="relative px-6 py-24 sm:px-10"
    >
      <SectionBackdrop {...PHOTOS.cta} />
      <div className="mx-auto max-w-4xl text-over-molecule">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-[1.6rem] font-light leading-[1.4] tracking-[-0.3px] text-ink sm:text-[2rem]">
            Medicine has treated populations for 200 years. We&apos;re building
            the infrastructure to treat individuals. If that matters to you,
            let&apos;s talk.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.1}>
              <div className="glass flex h-full flex-col rounded-md border border-hairline p-7">
                <p className="section-label text-clinical/70">{b.label}</p>
                <p className="mt-4 flex-1 text-sm leading-[1.7] text-ink-55">
                  {b.body}
                </p>
                <a
                  href="#contact-form"
                  className="mt-6 text-[13px] font-medium text-clinical underline decoration-clinical/30 underline-offset-4 hover:decoration-clinical"
                >
                  {b.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div id="contact-form" className="mx-auto mt-14 max-w-xl scroll-mt-24">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

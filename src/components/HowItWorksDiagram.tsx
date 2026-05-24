function StoryIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="32" viewBox="0 0 32 32" width="32">
      <path
        d="M9 7h14a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2H13l-4 3v-3H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M12 12h8M12 16h6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function BiologyIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="32" viewBox="0 0 32 32" width="32">
      <path
        d="M11 6c0 4.5 2 7 5 7s5-2.5 5-7M11 26c0-4.5 2-7 5-7s5 2.5 5 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M9.5 10c2.2 1.2 3.5 3.2 3.5 6s-1.3 4.8-3.5 6M22.5 10c-2.2 1.2-3.5 3.2-3.5 6s1.3 4.8 3.5 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" fill="currentColor" r="1.5" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="32" viewBox="0 0 32 32" width="32">
      <path
        d="M12 6h8l2 3h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h3l2-3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11.5 17.5 14 20l6.5-6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const steps = [
  {
    Icon: StoryIcon,
    title: 'Tell us your story',
    line: 'Side effects, stalls, dose history',
  },
  {
    Icon: BiologyIcon,
    title: 'We match your biology',
    line: 'Genes, biomarkers & intake',
  },
  {
    Icon: PlanIcon,
    title: 'Start with a clear plan',
    line: 'Built for what you tolerate',
  },
];

export function HowItWorksDiagram() {
  return (
    <section aria-label="How First Dose works" className="how-diagram-section">
      <div className="how-diagram">
        {steps.map((step, index) => (
          <div className="how-diagram__step-wrap" key={step.title}>
            <article className="how-diagram__step">
              <div className="how-diagram__icon">
                <step.Icon />
              </div>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </article>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="how-diagram__arrow">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

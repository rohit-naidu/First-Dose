import { LeadForm } from '@/src/components/LeadForm';

const proofPoints = [
  'Medication response patterns',
  'Side-effect risk signals',
  'Clearer next-step conversations',
];

const processSteps = [
  {
    title: 'Upload raw data',
    description: 'Submit your contact details and raw genetic .txt file from your testing provider.',
  },
  {
    title: 'Review key markers',
    description: 'First Dose evaluates pharmacogenomic signals connected to efficacy and tolerability.',
  },
  {
    title: 'Plan the next dose',
    description: 'You get a clearer starting point for discussion with a qualified clinician.',
  },
];

const trustItems = [
  'Designed for privacy-first intake',
  'Built around pharmacogenomic evidence',
  'Focused on decision support, not guesswork',
];

export default function Page() {
  return (
    <main>
      <section className="hero-section">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand-mark" href="#top" aria-label="First Dose home">
            <span>FD</span>
            First Dose
          </a>
          <a className="nav-cta" href="#intake">
            Start intake
          </a>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Precision medication starts earlier</p>
            <h1>Predict drug efficacy and side effects before the first dose.</h1>
            <p className="hero-description">
              First Dose uses your genetic data to help identify how your body may respond to
              medications, giving you and your clinician a smarter starting point.
            </p>

            <div className="hero-actions">
              <a className="primary-link" href="#intake">
                Submit your raw data
              </a>
              <a className="secondary-link" href="#how-it-works">
                See how it works
              </a>
            </div>

            <div className="proof-row" aria-label="First Dose value points">
              {proofPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel" aria-label="Medication response preview">
            <div className="panel-header">
              <span>Response preview</span>
              <strong>Genetic signal map</strong>
            </div>
            <div className="signal-card high">
              <span>Efficacy</span>
              <strong>Higher confidence</strong>
            </div>
            <div className="signal-card medium">
              <span>Side effects</span>
              <strong>Elevated sensitivity</strong>
            </div>
            <div className="signal-card low">
              <span>Dose guidance</span>
              <strong>Review recommended</strong>
            </div>
            <p>
              Your data is reviewed to surface medication response patterns that are easy to discuss
              with a care team.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Simple intake. Serious signal.</h2>
          <p>
            First Dose turns raw genetic data into a more informed medication conversation, with a
            workflow designed to be easy for patients and useful for clinical decision-making.
          </p>
        </div>

        <div className="steps-grid">
          {processSteps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Built for trust</p>
          <h2>Professional, careful, and privacy-aware from the first interaction.</h2>
        </div>
        <div className="trust-list">
          {trustItems.map((item) => (
            <div key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="intake-section" id="intake">
        <div className="intake-copy">
          <p className="eyebrow">Secure intake</p>
          <h2>Send your raw genetic file and the best way to reach you.</h2>
          <p>
            Upload the .txt file from services that provide raw genetic downloads. First Dose will
            use it to evaluate pharmacogenomic relevance and follow up with next steps.
          </p>
          <div className="privacy-note">
            <strong>Important:</strong> This site is for intake only. First Dose does not replace a
            clinician, diagnosis, or emergency care.
          </div>
        </div>

        <LeadForm />
      </section>
    </main>
  );
}

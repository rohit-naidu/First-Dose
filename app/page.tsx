import Image from 'next/image';
import { LeadForm } from '@/src/components/LeadForm';
import { SideEffectRoulette } from '@/src/components/SideEffectRoulette';
import firstDoseLogo from '../First Dose Logo.png';

const painPoints = ['Failed meds', 'Side effects', 'Wrong dose'];

const steps = [
  {
    title: 'Tell us the problem',
    body: 'What you tried. What happened. What you want to avoid.',
  },
  {
    title: 'We review the signal',
    body: 'Our team screens for medication-response patterns worth investigating.',
  },
  {
    title: 'You get a next step',
    body: 'If there is a fit, we follow up with a clearer path forward.',
  },
];

const outcomes = [
  'Fewer blind medication starts',
  'Cleaner conversations with providers',
  'Earlier awareness of risk signals',
];

export default function Page() {
  return (
    <main>
      <section className="hero-section">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-lockup" href="#top" aria-label="First Dose home">
            <Image
              className="brand-logo"
              src={firstDoseLogo}
              alt="First Dose Health"
              priority
            />
          </a>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="kicker">Medication response, before the guesswork</p>
            <h1>Stop gambling with the next prescription.</h1>
            <p className="hero-subtitle">
              First Dose helps identify medication efficacy and side-effect risk signals before you
              start another trial-and-error cycle.
            </p>

            <div className="pain-row" aria-label="Common medication pain points">
              {painPoints.map((painPoint) => (
                <span key={painPoint}>{painPoint}</span>
              ))}
            </div>

            <SideEffectRoulette />
          </div>

          <div id="intake" className="hero-form-shell">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <p className="kicker">The real pain</p>
          <h2>Most people do not need more guessing.</h2>
          <p>
            They need a better starting point before losing weeks to the wrong drug, wrong dose, or
            avoidable side effects.
          </p>
        </div>
      </section>

      <section className="process-section">
        {steps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </section>

      <section className="outcome-section">
        <div>
          <p className="kicker">Why it matters</p>
          <h2>Better inputs. Better medication decisions.</h2>
        </div>
        <div className="outcome-list">
          {outcomes.map((outcome) => (
            <p key={outcome}>{outcome}</p>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="kicker">Start here</p>
        <h2>Tell us what happened.</h2>
        <a href="#intake">Get reviewed</a>
      </section>
    </main>
  );
}

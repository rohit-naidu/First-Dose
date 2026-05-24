import Image from 'next/image';
import { HowItWorksDiagram } from '@/src/components/HowItWorksDiagram';
import { LeadForm } from '@/src/components/LeadForm';
import { INTAKE_HREF, RESEARCH_BLOG_URL } from '@/src/constants/navigation';

const products = [
  {
    title: 'Compounded GLP-1 + B12',
    image: '/images/brand/glp-product-mockup.webp',
    imageAlt: 'First Dose compounded GLP-1 and B12 vial',
    body: 'Start with a plan designed around appetite control, tolerability, and follow-up.',
    href: INTAKE_HREF,
  },
  {
    title: 'Biomarker Review',
    image: '/images/brand/biomarker-mockup.webp',
    imageAlt: 'Biomarker lab dashboard for personalized treatment review',
    body: 'Use key lab signals to avoid treating your body like everyone else’s.',
    href: INTAKE_HREF,
  },
  {
    title: 'Gene-Guided Plan',
    image: '/images/brand/gene-plan-mockup.webp',
    imageAlt: 'DNA report preview for gene-guided medication planning',
    body: 'Use genetic context to flag dose fit, side-effect risk, and poor-response patterns.',
    href: INTAKE_HREF,
  },
  {
    title: 'Side-Effect Support',
    image: '/images/brand/supplement-mockup.webp',
    imageAlt: 'First Dose side-effect support supplement kit',
    body: 'Support nausea, hydration, constipation, fatigue, and lean-mass preservation from day one.',
    href: INTAKE_HREF,
  },
];

export default function Page() {
  return (
    <main>
      <section className="hero-section">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-lockup" href="#top" aria-label="First Dose home">
            <Image
              className="brand-logo"
              src="/images/brand/first-dose-logo.webp"
              alt="First Dose Health"
              width={980}
              height={300}
            />
          </a>
          <div className="nav-actions">
            <a
              className="nav-link"
              href={RESEARCH_BLOG_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Research
            </a>
            <a className="nav-cta" href={INTAKE_HREF}>
              Speak With Us
            </a>
          </div>
        </nav>

        <div className="hero-banner" id="top">
          <Image
            className="hero-banner__media"
            src="/images/brand/hero-first-dose.webp"
            alt=""
            width={2048}
            height={886}
            priority
            quality={88}
            sizes="(max-width: 1180px) 100vw, 1180px"
            aria-hidden="true"
          />

          <div className="hero-banner__copy">
            <h1>Lose weight with medication matched to your body.</h1>
            <p>Fewer side effects. Better dose fit. Matched to your biology.</p>
            <a className="hero-banner__cta" href={INTAKE_HREF}>
              Speak With Us
            </a>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="personalized-grid">
          <div>
            <p className="kicker">Personalized care</p>
            <h2>Personalized treatment based on your biomarkers &amp; genes.</h2>
            <p>
              Most weight-loss plans fail because they treat everyone the same. First Dose
              uses your intake, biomarkers, and genetic context to help identify the plan
              you are most likely to tolerate and stick with.
            </p>
          </div>

          <div className="gene-card">
            <Image
              src="/images/brand/gene-test-mockup.webp"
              alt="At-home genetic sample collection for First Dose personalization"
              width={900}
              height={675}
              sizes="(max-width: 860px) 100vw, 470px"
            />
          </div>
        </div>

        <div className="product-wheel" aria-label="First Dose product options">
          {products.map((product) => (
            <article className="product-card" key={product.title}>
              <div className="product-card__image">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={900}
                  height={675}
                  sizes="(max-width: 860px) 82vw, 32vw"
                />
              </div>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <a
                aria-label={`Start intake for ${product.title}`}
                className="product-card__link"
                href={product.href}
              >
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="products-match">
          <p className="products-match__kicker">Your plan starts here</p>
          <h2 className="products-match__title">Find your match.</h2>
          <p className="products-match__subtitle">
            Not sure which option fits? That is the point — start with the intake and we
            will help you land on the right plan.
          </p>
          <a className="products-match__cta" href={INTAKE_HREF}>
            Speak With Us
          </a>
        </div>

        <div className="products-banner">
          <Image
            src="/images/brand/products-mockup.webp"
            alt="First Dose product lineup including GLP-1, tirzepatide, and B12 plus MIC"
            width={1100}
            height={472}
            sizes="(max-width: 1180px) 100vw, 1180px"
          />
        </div>
      </section>

      <HowItWorksDiagram />

      <section className="research-section">
        <div>
          <p className="kicker">Our research</p>
          <h2>GLP-1 side-effect science, published and in progress.</h2>
          <p>
            Our team publishes findings on making GLP-1 treatment more tolerable — from
            in-silico modeling to clinic-backed mitigation strategies. Read the full
            research blog at{' '}
            <a href={RESEARCH_BLOG_URL} rel="noopener noreferrer" target="_blank">
              sideeffect.me
            </a>
            .
          </p>
        </div>
        <a
          className="research-section__cta"
          href={RESEARCH_BLOG_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Read our research blog
        </a>
      </section>

      <section className="intake-section" id="intake">
        <div className="intake-layout">
          <div className="intake-section__intro">
            <p className="intake-eyebrow">Free consultation</p>
            <h2>Stop guessing the next dose.</h2>
            <p className="intake-section__lead">
              Share your history in about two minutes. We review every submission and follow
              up if there is a fit.
            </p>
            <ul className="intake-trust-list">
              <li>2-minute intake</li>
              <li>No obligation</li>
              <li>Reviewed by our clinical team</li>
            </ul>
          </div>

          <div className="intake-form-wrap">
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} First Dose Health</p>
        <div className="site-footer__links">
          <a href={RESEARCH_BLOG_URL} rel="noopener noreferrer" target="_blank">
            Research blog (sideeffect.me)
          </a>
          <a href={INTAKE_HREF}>Speak With Us</a>
        </div>
        <p className="site-footer__disclaimer">
          First Dose connects you with licensed providers for evaluation. This site is not
          medical advice.
        </p>
      </footer>
    </main>
  );
}

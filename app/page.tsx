// /app/page.tsx
// Oklahoma Security Guard Bond - main landing page. Marshal chat widget sits at
// the bottom. Every price, fee, link and CLEET process fact comes from lib/site.ts.

import CrossSellForm from '@/components/CrossSellForm';
import MarshalChatWidget from '@/components/MarshalChatWidget';
import { HeaderLogo, FooterLogo, BrandIcon } from '@/components/BrandLogo';
import {
  BRAND,
  DBA,
  STATE,
  SERVICE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  BUSINESS_HOURS,
  AGENCY_LICENSE_PHRASE,
  AGENT_PHRASE,
  REGULATOR_NAME,
  REGULATOR_PHONE,
  REGULATOR_URL,
  LICENSES,
  LOWEST_PRICE,
  COMBO_LICENSE_FEE,
  COMBO_HOURS,
  COMBO_CE_HOURS,
  CLEET_NAME,
  CLEET_URL,
  CLEET_PORTAL_URL,
  IDENTOGO_URL,
  IDENTOGO_SERVICE_CODE,
  FINGERPRINT_WINDOW_DAYS,
  EXAM_PASS_PERCENT,
  TESTING_FEE,
  LAPSE_DAYS,
  ARMED_WAIVER_LEGAL_BLOCK_HOURS,
} from '@/lib/site';

// Small filled disc used as a bullet accent. Inherits color via currentColor.
function BrandDot({ size = 10, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '0.05em' }}
    >
      <circle cx="5" cy="5" r="5" fill="currentColor" />
    </svg>
  );
}

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const money = (n: number) => `$${n}`;
const openStore = (url: string) => (url.startsWith('http') ? ext : {});

export default function HomePage() {
  const unarmedGuard = LICENSES[0];
  const terms = unarmedGuard.prices; // every license carries the same term pricing
  const threeYear = terms.find((t) => t.years === 3)!;
  const perYear3 = Math.round(threeYear.total / 3);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container header-inner">
          <HeaderLogo />
          <nav className="nav">
            <a href="#licenses">Which License</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="header-cta">
            <span className="phone">{SITE_PHONE_DISPLAY}</span>
            <a href="#pricing" className="btn">Get My Bond</a>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-eyebrow"><BrandDot className="mark" /> CLEET Security Guard &amp; Private Investigator Bonds</span>
              <h1>{STATE} Security Guard Bond. <span className="price">From {money(LOWEST_PRICE)}.</span></h1>
              <p className="hero-lede">
                The surety bond your CLEET license requires, for armed and unarmed security guards
                and private investigators. Pick your license, pick a 1, 2, or 3-year term, and your
                bond is emailed in minutes <strong>with the whole CLEET process laid out in order</strong>,
                from training hours to the {FINGERPRINT_WINDOW_DAYS}-day fingerprint rule.
              </p>
              <div className="hero-actions">
                <a href="#licenses" className="btn">Find My License</a>
                <a href="#how" className="btn btn-outline">See Every Step</a>
              </div>
              <div className="hero-trust">
                <div><span className="check">✓</span> All four CLEET license bonds</div>
                <div><span className="check">✓</span> A-rated underwriter, emailed in minutes</div>
                <div><span className="check">✓</span> 1, 2, or 3-year terms</div>
              </div>
            </div>
            <div className="hero-mark" style={{ padding: 22 }}>
              <div className="seal-large" style={{ marginBottom: 6 }}>
                <BrandIcon height={96} priority />
              </div>
              <div className="price-old">Choose your license</div>
              <div className="license-grid">
                {LICENSES.map((l) => (
                  <div className="license-card" key={l.key}>
                    <div className="lc-name">{l.name}</div>
                    <div className="lc-bond">{l.bondAmount} bond</div>
                    <div className="lc-price">{money(l.prices[0].total)}<small>/ 1 yr</small></div>
                    <a href={l.storeUrl} {...openStore(l.storeUrl)} className="btn">Get My Bond</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="num"><span className="accent">$</span>{LOWEST_PRICE}</div>
              <div className="label">1-Year Bond, Any License</div>
            </div>
            <div className="trust-item">
              <div className="num">A-rated</div>
              <div className="label">Underwriter</div>
            </div>
            <div className="trust-item">
              <div className="num">1 to 3 yrs</div>
              <div className="label">Term Options</div>
            </div>
            <div className="trust-item">
              <div className="num">{FINGERPRINT_WINDOW_DAYS} days</div>
              <div className="label">Fingerprint Window</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHICH LICENSE ===== */}
      <section className="how" id="licenses">
        <div className="container">
          <div className="how-header">
            <span className="eyebrow">Which License Do I Need?</span>
            <h2>Four Licenses. Four Bonds. One Place.</h2>
            <p>CLEET, the {STATE} {CLEET_NAME}, licenses security guards and private investigators separately, and armed separately from unarmed. Each license has its own training, exams, fee, and bond amount. Here&apos;s the whole picture.</p>
          </div>
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>License</th>
                  <th>Bond</th>
                  <th>Training</th>
                  <th>Exams</th>
                  <th>CLEET Fee</th>
                  <th>CE / Period</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {LICENSES.map((l) => (
                  <tr key={l.key}>
                    <td>{l.name}</td>
                    <td>{l.bondAmount}</td>
                    <td>{l.phases}<br /><span style={{ color: 'var(--muted)' }}>{l.hours} hours</span></td>
                    <td>{l.exams}</td>
                    <td>{money(l.licenseFee)}</td>
                    <td>{l.ceHours} hours</td>
                    <td><a href={l.storeUrl} {...openStore(l.storeUrl)} className="btn">Get My Bond</a></td>
                  </tr>
                ))}
                <tr>
                  <td>Armed Guard + Armed PI<br /><span style={{ color: 'var(--muted)', fontWeight: 400 }}>Combination</span></td>
                  <td>$10,000</td>
                  <td>Phase I, II, III, and IV<br /><span style={{ color: 'var(--muted)' }}>{COMBO_HOURS} hours</span></td>
                  <td>All three exams</td>
                  <td>{money(COMBO_LICENSE_FEE)}</td>
                  <td>{COMBO_CE_HOURS} hours</td>
                  <td><a href="#faq" className="btn btn-outline" style={{ padding: '8px 12px', fontSize: 13 }}>See FAQ</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 14, fontSize: 14 }}>
            Private investigators who are self-employed also complete a CLEET agency license. Armed private investigators also need a current MMPI.
          </p>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="explain" id="how">
        <div className="container">
          <div className="explain-header">
            <span className="explain-callout"><BrandDot size={9} /> Train · Test · Bond · Fingerprint · Apply</span>
            <h2>How It Works</h2>
            <p>The same five steps for every license. The hours and exams change; the order doesn&apos;t.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Complete CLEET Training</h3>
              <p>Finish the training phases for your license: {unarmedGuard.hours} hours for an unarmed guard, up to {COMBO_HOURS} for the armed combination. Documented experience can waive some training, but armed waivers still require the {ARMED_WAIVER_LEGAL_BLOCK_HOURS}-hour legal block unless you&apos;re a CLEET-certified peace officer.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Pass the State Exam</h3>
              <p>{EXAM_PASS_PERCENT}% or higher on the exam for your license. Armed licenses add the Firearms exam. The testing fee is {money(TESTING_FEE)}, paid to CLEET.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Get Your Bond Here</h3>
              <p>Pick your license and a 1, 2, or 3-year term. American Surety Company underwrites the bond and emails your documents, usually within minutes. Order a passport-size color photo while you wait; CLEET needs one with your application.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h3>Fingerprints at IdentoGO</h3>
              <p>Book an <a href={IDENTOGO_URL} {...ext}>IdentoGO</a> appointment with service code <strong>{IDENTOGO_SERVICE_CODE}</strong> (guards and investigators only). Prints must be taken within {FINGERPRINT_WINDOW_DAYS} days of the day you submit your application, so schedule them last.</p>
            </div>
            <div className="step">
              <div className="step-num">05</div>
              <h3>Apply on the CLEET Portal</h3>
              <p>Submit everything through the <a href={CLEET_PORTAL_URL} {...ext}>CLEET portal</a> with your license fee. You submit this yourself; we don&apos;t file it for you. CLEET reviews the application and lets you know.</p>
            </div>
          </div>

          <div className="explain-grid" style={{ marginTop: 36 }}>
            <div className="explain-card">
              <div className="label">The {FINGERPRINT_WINDOW_DAYS}-Day Clock</div>
              <h4>Fingerprints Expire Fast</h4>
              <p>CLEET rejects prints older than {FINGERPRINT_WINDOW_DAYS} days at submission. Get the bond, the photo, and your records together first, then book IdentoGO, then apply within the window.</p>
            </div>
            <div className="explain-card">
              <div className="label">The Lapse Rule</div>
              <h4>Don&apos;t Let It Expire</h4>
              <p>A license expired more than {LAPSE_DAYS} days can&apos;t be renewed; you reapply as new, training and all. A 2 or 3-year bond takes the bond off that list of things to track.</p>
            </div>
            <div className="explain-card">
              <div className="label">Held a CLEET License Before?</div>
              <h4>Verify Your Email First</h4>
              <p>Anyone who has ever held a CLEET license, law enforcement or security, has to contact CLEET to verify the email address on file before submitting a new application.</p>
            </div>
          </div>

          <p className="explain-links" style={{ textAlign: 'center', marginTop: '28px', color: 'var(--muted)' }}>
            Official resources:{' '}
            <a href={CLEET_URL} {...ext}>CLEET</a>
            {' · '}
            <a href={CLEET_PORTAL_URL} {...ext}>CLEET Application Portal</a>
            {' · '}
            <a href={IDENTOGO_URL} {...ext}>IdentoGO Fingerprinting</a>
          </p>

          <div className="explain-faq">
            <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>Application Checklist</h3>
            <div className="explain-faq-item">
              <h5>What goes in with my CLEET application?</h5>
              <p>A certified court judgment and sentence, or a letter of no record, for each arrest or charge; a current passport-size color photo; a letter of employment or your bond; documented proof of experience or comparable training; your IdentoGO fingerprints; and the license fee. Non-U.S. citizens add verifiable documentation of legal residence. Armed private investigators add a current MMPI.</p>
            </div>
            <div className="explain-faq-item">
              <h5>Does the bond replace a letter of employment?</h5>
              <p>CLEET&apos;s checklist reads &ldquo;Letter of Employment or Bond/Insurance,&rdquo; so independent applicants and self-employed investigators use the bond where an employee would use a letter. If your situation is unusual, confirm it with CLEET before you apply.</p>
            </div>
            <div className="explain-faq-item">
              <h5>Do you file anything with CLEET for me?</h5>
              <p>No. You submit your own application through the CLEET portal. What we do: issue your bond, email your documents within minutes, and lay out every step so nothing gets missed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="pricing-header">
            <span className="eyebrow">Transparent Pricing</span>
            <h2>One Price Per Term. Any License.</h2>
            <p style={{ color: 'var(--muted)', marginTop: '12px' }}>The bond is priced by term, not by license. Pick the term that matches how long you plan to hold the license.</p>
          </div>

          <div className="pricing-grid">
            <div className="price-breakdown">
              <h3>What You Pay {BRAND}</h3>
              <div className="term-grid">
                {terms.map((t) => (
                  <div className={`term${t.years === 3 ? ' best' : ''}`} key={t.years}>
                    <div className="t-years">{t.years}-Year Bond</div>
                    <div className="t-price">{money(t.total)}</div>
                    <div className="t-note">{t.years === 1 ? 'Renew every year' : t.years === 2 ? `${money(Math.round(t.total / 2))} per year` : `${money(perYear3)} per year, fewest renewals`}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, margin: '6px 0 0' }}>Same price for the $5,000 unarmed bond and the $10,000 armed bond. Underwritten by American Surety Company (A-rated).</p>

              <h3 style={{ marginTop: '28px' }}>Paid Directly to CLEET</h3>
              {LICENSES.map((l) => (
                <div className="price-line" key={l.key}>
                  <div className="item">
                    {l.name} license
                    <span className="note">CLEET application fee</span>
                  </div>
                  <div className="amount">{money(l.licenseFee)}</div>
                </div>
              ))}
              <div className="price-line">
                <div className="item">
                  Armed Guard + Armed PI combination
                  <span className="note">CLEET application fee for the combination license</span>
                </div>
                <div className="amount">{money(COMBO_LICENSE_FEE)}</div>
              </div>
              <div className="price-line">
                <div className="item">
                  State exam
                  <span className="note">Per exam sitting, paid to CLEET</span>
                </div>
                <div className="amount">{money(TESTING_FEE)}</div>
              </div>
              <div className="price-total">
                <span className="label">Unarmed guard, 1-year bond, before training and fingerprints</span>
                <span className="amount">{money(terms[0].total + unarmedGuard.licenseFee + TESTING_FEE)}</span>
              </div>
            </div>

            <div className="price-cta">
              <h3>Ready for your bond?</h3>
              <p>Pick your license below. Your documents are emailed after purchase, and Marshal walks you through fingerprints and the CLEET application.</p>
              <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
                {LICENSES.map((l) => (
                  <a href={l.storeUrl} {...openStore(l.storeUrl)} className="btn" key={l.key} style={{ display: 'block', textAlign: 'center' }}>{l.short} Bond</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EMPLOYERS ===== */}
      <section className="employer" id="employers">
        <div className="container">
          <div className="employer-grid">
            <div>
              <span className="eyebrow"><BrandDot size={9} /> Security Companies &amp; PI Agencies</span>
              <h2>Bonding a Whole Crew?</h2>
              <p>If you run a security company or an investigation agency, you&apos;re handling bonds, renewals, and CLEET deadlines for everyone on the roster. We can handle the bonds as a group, line up the terms so they renew together, and review your business liability coverage while we&apos;re at it.</p>
              <ul>
                <li>One contact for every licensee&apos;s bond</li>
                <li>Terms matched so renewals land on the same date</li>
                <li>General liability and commercial auto review from a licensed agent, no obligation</li>
              </ul>
              <a href="#crosssell" className="btn">Request a Callback</a>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="employer-icon"><BrandIcon height={200} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CROSS-SELL ===== */}
      <section className="crosssell" id="crosssell">
        <div className="container">
          <span className="eyebrow"><BrandDot size={9} /> Free, No-Obligation Reviews</span>
          <h2>While You&apos;re Here</h2>
          <p className="lede">Guards and investigators carry more risk than most people, at work and on the road. Check any box below and {AGENT_PHRASE} will reach out with a no-obligation quote review. Your call.</p>
          <CrossSellForm />
          <p className="fineprint">By submitting, you authorize {AGENT_PHRASE} from our partner agency Stockton-Hill Insurance LLC to contact you. No purchase required, no obligation.</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-header">
            <span className="eyebrow">Common Questions</span>
            <h2>What {STATE} Guards and Investigators Ask</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How much is an {STATE} security guard bond?</h4>
              <p>{money(terms[0].total)} for one year, {money(terms[1].total)} for two, or {money(terms[2].total)} for three, for the $5,000 unarmed guard bond or the $10,000 armed guard bond. The CLEET license fee is separate: {money(LICENSES[0].licenseFee)} unarmed, {money(LICENSES[1].licenseFee)} armed.</p>
            </div>
            <div className="faq-item">
              <h4>How much is an {STATE} private investigator bond?</h4>
              <p>The same {money(terms[0].total)} / {money(terms[1].total)} / {money(terms[2].total)} by term. Unarmed investigators need a $5,000 bond and pay CLEET {money(LICENSES[2].licenseFee)} for the license; armed investigators need a $10,000 bond, pay CLEET {money(LICENSES[3].licenseFee)}, and also need a current MMPI.</p>
            </div>
            <div className="faq-item">
              <h4>What does the bond do? Is it insurance for me?</h4>
              <p>No. The bond protects the public and the state: if a licensee causes a loss through misconduct, the surety pays the claim and then collects it back from the licensee. It&apos;s a licensing requirement, not liability coverage. If you want coverage that protects <em>you</em> or your company, that&apos;s a separate policy, and {AGENT_PHRASE} can review it with you.</p>
            </div>
            <div className="faq-item">
              <h4>Which term should I pick?</h4>
              <p>That depends on how long you plan to hold the license, and the choice is yours. The 3-year bond works out to about {money(perYear3)} a year and means two fewer renewals to track; the 1-year bond is the lowest cost up front. We publish the prices, we don&apos;t pick the term for you.</p>
            </div>
            <div className="faq-item">
              <h4>Do I need a separate bond for the armed guard and armed PI combination?</h4>
              <p>The combination license has its own CLEET fee ({money(COMBO_LICENSE_FEE)}), training ({COMBO_HOURS} hours), and exams. Whether it carries one bond or two depends on how CLEET processes your application. Ask Marshal in the chat and a real person will confirm for your situation.</p>
            </div>
            <div className="faq-item">
              <h4>How do training waivers work?</h4>
              <p>CLEET may waive some training for documented experience, including prior law enforcement or military service. Armed waivers still require the {ARMED_WAIVER_LEGAL_BLOCK_HOURS}-hour legal block course unless you&apos;re a CLEET-certified peace officer. Whether your experience qualifies is CLEET&apos;s decision.</p>
            </div>
            <div className="faq-item">
              <h4>What is service code {IDENTOGO_SERVICE_CODE}?</h4>
              <p>It&apos;s the IdentoGO service code for CLEET security guard and private investigator applicants. Use it when you book your fingerprint appointment so the prints route to CLEET. Prints must be taken within {FINGERPRINT_WINDOW_DAYS} days of submitting your application.</p>
            </div>
            <div className="faq-item">
              <h4>Will an arrest or an old charge disqualify me?</h4>
              <p>That&apos;s CLEET&apos;s call, not ours, and we can&apos;t advise on it. What we can tell you: the application requires a certified court judgment and sentence, or a letter of no record, for every arrest or charge, and a felony or crime of moral turpitude conviction is disqualifying. Contact CLEET directly before you spend money on training if you have a question about your record.</p>
            </div>
            <div className="faq-item">
              <h4>How much continuing education do I need?</h4>
              <p>Security guards complete at least {LICENSES[0].ceHours} hours from an approved source during each license period; private investigators complete at least {LICENSES[2].ceHours}. The combination license follows the {COMBO_CE_HOURS}-hour investigator requirement.</p>
            </div>
            <div className="faq-item">
              <h4>Am I eligible for an {STATE} security guard or PI license?</h4>
              <p>You must be at least 18, a U.S. citizen or an alien legally residing in the country, of good moral character, and have no conviction for a felony or a crime of moral turpitude.</p>
            </div>
            <div className="faq-item">
              <h4>What if I have questions during the process?</h4>
              <p>Click the chat in the bottom right corner anytime. Our AI assistant, Marshal, handles questions about the four licenses, the bond, fingerprints, and the CLEET application 24/7. For complex situations, a real person follows up the next business day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section className="cta-strip">
        <div className="container">
          <h2>Ready when you are.</h2>
          <p>{STATE} security guard and private investigator bonds from {money(LOWEST_PRICE)}, emailed in minutes, with every CLEET step laid out in order.</p>
          <a href="#pricing" className="btn">Get My Bond</a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <FooterLogo />
              <p>CLEET security guard and private investigator bonds for {STATE}, emailed in minutes, plus step-by-step guidance through the application.</p>
            </div>
            <div className="footer-col">
              <h5>Bonds</h5>
              <ul>
                <li><a href="#licenses">Which License</a></li>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Licenses</h5>
              <ul>
                {LICENSES.map((l) => <li key={l.key}><a href="#licenses">{l.name}</a></li>)}
              </ul>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <ul>
                <li><a href={SITE_PHONE_HREF}>{SITE_PHONE_DISPLAY}</a></li>
                <li><a href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}</a></li>
                <li>{BUSINESS_HOURS}</li>
                <li><a href="#employers">Security companies</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p><strong style={{ color: 'rgba(246, 241, 230, 0.7)' }}>{BRAND}</strong> is a service of Stockton-Hill Insurance LLC, {AGENCY_LICENSE_PHRASE}. Surety bonds are underwritten by American Surety Company, an A-rated carrier. Insurance services subject to availability and underwriting approval. {BRAND} is not affiliated with CLEET or the State of {STATE}.</p>
            <p>For complaints, contact the {REGULATOR_NAME} at {REGULATOR_PHONE} or {REGULATOR_URL}.</p>
            <p>© 2026 {DBA}. All rights reserved. · <a href="/privacy" style={{ color: 'rgba(246, 241, 230, 0.5)' }}>Privacy</a> · <a href="/terms" style={{ color: 'rgba(246, 241, 230, 0.5)' }}>Terms</a> · <a href="/sms-opt-in" style={{ color: 'rgba(246, 241, 230, 0.5)' }}>SMS Opt-In</a></p>
          </div>
        </div>
      </footer>

      {/* ===== MARSHAL CHAT WIDGET ===== */}
      <MarshalChatWidget />
    </>
  );
}

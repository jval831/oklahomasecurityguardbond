// /app/terms/page.tsx
// Terms and Conditions. Includes SMS/text messaging terms required for 10DLC / TCR registration.

import { HeaderLogo } from '@/components/BrandLogo';

import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  BRAND,
  STATE,
  LICENSES,
  TESTING_FEE,
  FINGERPRINT_WINDOW_DAYS,
  AGENCY_LICENSE_PHRASE,
  AGENT_PHRASE,
  REGULATOR_NAME,
  REGULATOR_PHONE,
  REGULATOR_URL,
} from '@/lib/site';

export const metadata = {
  title: 'Terms & Conditions | Oklahoma Security Guard Bond',
  description:
    'Terms & Conditions for Oklahoma Security Guard Bond, a service of Stockton-Hill Insurance LLC. Includes SMS/text messaging terms.',
};

const NAVY = 'var(--navy)';
const LINK = 'var(--navy)'; // links on light backgrounds are navy, never gold
const CREAM = 'var(--cream-dark)';
const TEXT = '#243240';

const s = {
  band: { background: CREAM, borderBottom: `4px solid ${NAVY}` } as const,
  bandInner: { maxWidth: 820, margin: '0 auto', padding: '56px 24px 40px' } as const,
  h1: {
    color: NAVY,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 40,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.15,
  } as const,
  updated: { color: '#5b6b7a', fontSize: 14, marginTop: 12 } as const,
  wrap: { background: '#fff' } as const,
  content: {
    maxWidth: 820,
    margin: '0 auto',
    padding: '40px 24px 80px',
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    color: TEXT,
  } as const,
  h2: {
    color: NAVY,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 700,
    marginTop: 38,
    marginBottom: 10,
  } as const,
  p: { fontSize: 16, lineHeight: 1.7, margin: '12px 0' } as const,
  ul: { fontSize: 16, lineHeight: 1.7, paddingLeft: 22, margin: '12px 0' } as const,
  li: { margin: '6px 0' } as const,
  a: { color: LINK, textDecoration: 'underline' } as const,
  smsBox: {
    background: CREAM,
    borderLeft: `5px solid ${NAVY}`,
    borderRadius: 6,
    padding: '18px 22px',
    margin: '16px 0',
  } as const,
  smsLabel: {
    display: 'inline-block',
    background: NAVY,
    color: CREAM,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    padding: '4px 10px',
    borderRadius: 4,
    marginBottom: 10,
  } as const,
};

export default function TermsPage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container header-inner">
          <HeaderLogo />
          <nav className="nav">
            <a href="/#how">How It Works</a>
            <a href="/#education">The Steps</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
          </nav>
          <div className="header-cta">
            <span className="phone">{SITE_PHONE_DISPLAY}</span>
            <a href="/#pricing" className="btn">Get My Bond</a>
          </div>
        </div>
      </header>

      {/* ===== TITLE BAND ===== */}
      <div style={s.band}>
        <div style={s.bandInner}>
          <h1 style={s.h1}>Terms &amp; Conditions</h1>
          <p style={s.updated}>Effective Date: September 18, 2026</p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <main style={s.wrap}>
        <div style={s.content}>
          <p style={s.p}>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of
            oklahomasecurityguardbond.com (the &quot;Site&quot;) and the services provided by Stockton-Hill
            Insurance LLC, doing business as Oklahoma Security Guard Bond (&quot;Oklahoma Security Guard
            Bond,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using the Site or our
            services, you agree to these Terms.
          </p>

          <h2 style={s.h2}>1. Services</h2>
          <p style={s.p}>
            {BRAND} helps people in {STATE} obtain the surety bond required for a security guard or
            private investigator license issued by the {STATE} Council on Law Enforcement Education
            and Training (CLEET), underwritten by American Surety Company (ASC). We also provide
            general guidance about the steps CLEET requires to complete a license application.
          </p>

          <h2 style={s.h2}>2. Eligibility</h2>
          <p style={s.p}>
            To use our bond services you must be at least 18 years old and otherwise eligible for the
            CLEET license you are applying for. Eligibility is determined by CLEET, not by us.
          </p>

          <h2 style={s.h2}>3. Bond Purchases, Fees, and Payment</h2>
          <p style={s.p}>
            Bond premiums are {LICENSES[0].prices.map((p) => `$${p.total} for ${p.years} year${p.years > 1 ? 's' : ''}`).join(', ')},
            for each of the four license bonds ({LICENSES.map((l) => `${l.name}, ${l.bondAmount}`).join('; ')}).
            The total shown at checkout is the amount charged. Fees owed to others are paid
            separately and directly, including CLEET license application fees
            ({LICENSES.map((l) => `$${l.licenseFee} ${l.short.toLowerCase()}`).join(', ')}), the ${TESTING_FEE} CLEET
            testing fee, IdentoGO fingerprinting fees, and training provider fees. All fees are
            subject to change, and state fees are set by CLEET and the State of {STATE}.
          </p>

          <h2 style={s.h2}>4. SMS/Text Messaging Terms</h2>
          <div style={s.smsBox}>
            <span style={s.smsLabel}>SMS Terms</span>
            <p style={{ ...s.p, marginTop: 0 }}>
              By providing your mobile phone number to Stockton-Hill Insurance LLC dba Oklahoma Security Guard Bond, you agree to receive SMS/text messages regarding surety bond
              applications, policy and service updates, billing, document requests, appointment
              scheduling, and related account communications. Message frequency varies. Message and
              data rates may apply. Reply STOP to opt out or HELP for assistance.
            </p>
          </div>
          <p style={s.p}>
            Consent to receive text messages is not a condition of purchasing any goods or services.
            Carriers are not liable for delayed or undelivered messages. For help, reply HELP or
            contact us at <a href={SITE_PHONE_HREF} style={s.a}>{SITE_PHONE_DISPLAY}</a> or{' '}
            <a href="mailto:service@oklahomasecurityguardbond.com" style={s.a}>service@oklahomasecurityguardbond.com</a>.
            For details on how we handle your mobile information, see our{' '}
            <a href="/privacy" style={s.a}>Privacy Policy</a>.
          </p>

          <h2 style={s.h2}>5. Licensing Process Disclaimer</h2>
          <p style={s.p}>
            CLEET requires applicants to complete the training and examinations for their license,
            obtain a surety bond, submit fingerprints through IdentoGO within {FINGERPRINT_WINDOW_DAYS}
            days of applying, and submit the application and supporting documents through the CLEET
            portal. The customer completes and submits each of these steps. We do not file, submit,
            or upload any document with CLEET on the customer&apos;s behalf, and we do not determine
            eligibility. Any guidance we offer is informational only. Any guidance we offer, including
            renewal reminders, is informational only.
          </p>

          <h2 style={s.h2}>6. Insurance and Agency Disclosure</h2>
          <p style={s.p}>
            {BRAND} is a service of Stockton-Hill Insurance LLC, {AGENCY_LICENSE_PHRASE}. Surety
            bonds are underwritten by American Surety Company, an A-rated carrier. Insurance
            services are subject to availability and underwriting approval. Any optional insurance
            discussion is conducted by {AGENT_PHRASE} and carries no obligation.
          </p>

          <h2 style={s.h2}>7. No Legal Advice</h2>
          <p style={s.p}>
            Information on this Site is provided for general informational purposes and is not legal
            advice. For legal questions about licensing or eligibility, consult CLEET or a licensed
            attorney.
          </p>

          <h2 style={s.h2}>8. Intellectual Property</h2>
          <p style={s.p}>
            All content on the Site is owned by or licensed to Stockton-Hill Insurance LLC and
            may not be copied or reused without permission.
          </p>

          <h2 style={s.h2}>9. Disclaimers and Limitation of Liability</h2>
          <p style={s.p}>
            The Site and services are provided &quot;as is&quot; without warranties of any kind. To
            the fullest extent permitted by law, we are not liable for indirect, incidental, or
            consequential damages arising from your use of the Site or services. We do not guarantee
            approval, timing, or outcomes determined by CLEET.
          </p>

          <h2 style={s.h2}>10. Governing Law</h2>
          <p style={s.p}>
            These Terms are governed by the laws of the State of {STATE}, without regard to
            conflict-of-law principles.
          </p>

          <h2 style={s.h2}>11. Changes to These Terms</h2>
          <p style={s.p}>
            We may update these Terms from time to time. The Effective Date above shows when they
            were last revised. Continued use of the Site means you accept the updated Terms.
          </p>

          <h2 style={s.h2}>12. Contact Us</h2>
          <p style={s.p}>
            Stockton-Hill Insurance LLC dba Oklahoma Security Guard Bond
            <br />
            Phone: <a href={SITE_PHONE_HREF} style={s.a}>{SITE_PHONE_DISPLAY}</a>
            <br />
            Email: <a href="mailto:service@oklahomasecurityguardbond.com" style={s.a}>service@oklahomasecurityguardbond.com</a>
            <br />
            For complaints, contact the {REGULATOR_NAME} at {REGULATOR_PHONE} or {REGULATOR_URL}.
          </p>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>
              <strong style={{ color: 'rgba(244, 236, 216, 0.7)' }}>Oklahoma Security Guard Bond</strong> is
              a service of Stockton-Hill Insurance LLC, {AGENCY_LICENSE_PHRASE}.
              Surety bonds are underwritten by American Surety Company, an A-rated carrier. Insurance
              services subject to availability and underwriting approval.
            </p>
            <p>For complaints, contact the {REGULATOR_NAME} at {REGULATOR_PHONE} or {REGULATOR_URL}.</p>
            <p>
              © 2026 Stockton-Hill Insurance LLC dba Oklahoma Security Guard Bond. All rights
              reserved. · <a href="/privacy" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>Privacy</a> ·{' '}
              <a href="/terms" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>Terms</a> · <a href="/sms-opt-in" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>SMS Opt-In</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

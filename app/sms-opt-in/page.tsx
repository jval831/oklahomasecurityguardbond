// /app/sms-opt-in/page.tsx
// Public SMS opt-in page for 10DLC / TCR written consent + double opt-in flow.

import { HeaderLogo } from '@/components/BrandLogo';
import OptInForm from './OptInForm';
import { SITE_PHONE_DISPLAY, AGENCY_LICENSE_PHRASE, REGULATOR_NAME, REGULATOR_PHONE, REGULATOR_URL } from '@/lib/site';

export const metadata = {
  title: 'SMS Opt-In | Oklahoma Security Guard Bond',
  description:
    'Opt in to receive SMS/text messages from Oklahoma Security Guard Bond, a service of Stockton-Hill Insurance LLC.',
};

const NAVY = 'var(--navy)';
const CREAM = 'var(--cream-dark)';
const TEXT = '#243240';

const s = {
  band: { background: CREAM, borderBottom: `4px solid ${NAVY}` } as const,
  bandInner: { maxWidth: 720, margin: '0 auto', padding: '56px 24px 40px' } as const,
  h1: {
    color: NAVY,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 38,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.15,
  } as const,
  sub: { color: '#3a4a59', fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 620 } as const,
  wrap: { background: '#fff' } as const,
  content: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '36px 24px 80px',
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    color: TEXT,
  } as const,
};

export default function SmsOptInPage() {
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
          <h1 style={s.h1}>SMS Opt-In</h1>
          <p style={s.sub}>
            Sign up to receive text messages from Oklahoma Security Guard Bond, a service of Stockton-Hill
            Insurance LLC. Complete the form below and confirm by replying YES to the text we send
            you. Consent is not a condition of purchase.
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <main style={s.wrap}>
        <div style={s.content}>
          <OptInForm />
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>
              <strong style={{ color: 'rgba(244, 236, 216, 0.7)' }}>Oklahoma Security Guard Bond</strong> is
              a service of Stockton-Hill Insurance LLC, {AGENCY_LICENSE_PHRASE}. Surety
              bonds are underwritten by American Surety Company, an A-rated carrier. Insurance
              services subject to availability and underwriting approval.
            </p>
            <p>For complaints, contact the {REGULATOR_NAME} at {REGULATOR_PHONE} or {REGULATOR_URL}.</p>
            <p>
              © 2026 Stockton-Hill Insurance LLC dba Oklahoma Security Guard Bond. All rights reserved. ·{' '}
              <a href="/privacy" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>Privacy</a> ·{' '}
              <a href="/terms" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>Terms</a> ·{' '}
              <a href="/sms-opt-in" style={{ color: 'rgba(244, 236, 216, 0.5)' }}>SMS Opt-In</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

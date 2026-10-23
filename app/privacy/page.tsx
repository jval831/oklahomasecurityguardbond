// /app/privacy/page.tsx
// Privacy Policy. Includes SMS/text consent language required for 10DLC / TCR registration.

import { HeaderLogo } from '@/components/BrandLogo';

import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  STATE,
  AGENCY_LICENSE_PHRASE,
  AGENT_PHRASE,
  REGULATOR_NAME,
  REGULATOR_PHONE,
  REGULATOR_URL,
} from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy | Oklahoma Security Guard Bond',
  description:
    'Privacy Policy for Oklahoma Security Guard Bond, a service of Stockton-Hill Insurance LLC. Includes SMS/text messaging privacy terms.',
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

export default function PrivacyPage() {
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
          <h1 style={s.h1}>Privacy Policy</h1>
          <p style={s.updated}>Effective Date: September 18, 2026</p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <main style={s.wrap}>
        <div style={s.content}>
          <p style={s.p}>
            This Privacy Policy explains how Stockton-Hill Insurance LLC, doing business as
            Oklahoma Security Guard Bond (&quot;Oklahoma Security Guard Bond,&quot; &quot;we,&quot; &quot;us,&quot;
            or &quot;our&quot;), collects, uses, and protects your information when you visit
            oklahomasecurityguardbond.com (the &quot;Site&quot;) or use our services.
          </p>

          <h2 style={s.h2}>1. Information We Collect</h2>
          <p style={s.p}>We collect information you provide directly to us, including:</p>
          <ul style={s.ul}>
            <li style={s.li}>Contact details such as your name, email address, mailing address, and mobile phone number.</li>
            <li style={s.li}>Bond application and order information needed to issue your {STATE} security guard or private investigator surety bond.</li>
            <li style={s.li}>Payment information processed through our secure payment providers. We do not store full card numbers.</li>
            <li style={s.li}>Optional information you provide at checkout, such as occupation, homeowner status, insurance review timing, age range, and how you heard about us.</li>
            <li style={s.li}>Messages and inquiries you send us, including through our website chat assistant.</li>
          </ul>
          <p style={s.p}>
            We also automatically collect limited technical information such as IP address, browser
            type, and pages visited, through cookies and similar technologies.
          </p>

          <h2 style={s.h2}>2. How We Use Your Information</h2>
          <ul style={s.ul}>
            <li style={s.li}>Process and issue your surety bond and related documents.</li>
            <li style={s.li}>Communicate with you about your application, order, account, and service requests.</li>
            <li style={s.li}>Send SMS/text messages you have consented to receive (see Section 3).</li>
            <li style={s.li}>Provide customer support and respond to inquiries.</li>
            <li style={s.li}>Improve our Site and services.</li>
            <li style={s.li}>Comply with legal, regulatory, and underwriting requirements.</li>
            <li style={s.li}>With your consent, have {AGENT_PHRASE} contact you about additional insurance products.</li>
          </ul>

          <h2 style={s.h2}>3. SMS/Text Messaging</h2>
          <div style={s.smsBox}>
            <span style={s.smsLabel}>SMS Privacy</span>
            <p style={{ ...s.p, marginTop: 0 }}>
              SMS consent and mobile information are not shared with third parties or affiliates for
              marketing purposes. Mobile information will not be sold, rented, or shared with third
              parties for promotional or marketing purposes.
            </p>
          </div>
          <p style={s.p}>
            We use your mobile number only to send the categories of messages described in our{' '}
            <a href="/terms" style={s.a}>Terms &amp; Conditions</a> and to support your account and
            service requests. You may opt out at any time by replying STOP, or reply HELP for
            assistance.
          </p>

          <h2 style={s.h2}>4. How We Share Information</h2>
          <p style={s.p}>
            We do not sell your personal information. We share information only as needed to provide
            our services, including with:
          </p>
          <ul style={s.ul}>
            <li style={s.li}>American Surety Company (ASC), the carrier that underwrites your bond.</li>
            <li style={s.li}>CLEET, only where you direct us to share information for your license application. You submit your own application; we do not file it for you.</li>
            <li style={s.li}>Service providers who help us operate the Site, process payments, and deliver messages, all bound by confidentiality obligations.</li>
            <li style={s.li}>Legal or regulatory authorities when required by law.</li>
          </ul>
          <p style={s.p}>
            As stated in Section 3, your mobile information and SMS consent are never shared with
            third parties or affiliates for marketing purposes.
          </p>

          <h2 style={s.h2}>5. Cookies and Tracking</h2>
          <p style={s.p}>
            Our Site uses cookies and similar technologies to operate the Site, remember
            preferences, and understand usage. You can control cookies through your browser settings.
          </p>

          <h2 style={s.h2}>6. Data Security</h2>
          <p style={s.p}>
            We use reasonable administrative, technical, and physical safeguards designed to protect
            your information. No method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>

          <h2 style={s.h2}>7. Your Choices and Rights</h2>
          <ul style={s.ul}>
            <li style={s.li}>Update or correct your information by contacting us.</li>
            <li style={s.li}>Opt out of text messages by replying STOP, or opt out of marketing emails using the unsubscribe link.</li>
            <li style={s.li}>Request information about the personal data we hold about you, subject to applicable law.</li>
          </ul>

          <h2 style={s.h2}>8. Children&apos;s Privacy</h2>
          <p style={s.p}>
            Our Site and services are intended for adults age 18 and older. We do not knowingly
            collect information from children.
          </p>

          <h2 style={s.h2}>9. Changes to This Policy</h2>
          <p style={s.p}>
            We may update this Privacy Policy from time to time. The Effective Date above shows when
            it was last revised. Continued use of the Site after changes means you accept the updated
            policy.
          </p>

          <h2 style={s.h2}>10. Governing Law</h2>
          <p style={s.p}>
            This Privacy Policy is governed by the laws of the State of {STATE}, without regard to
            conflict-of-law principles.
          </p>

          <h2 style={s.h2}>11. Contact Us</h2>
          <p style={s.p}>
            Stockton-Hill Insurance LLC dba Oklahoma Security Guard Bond
            <br />
            Phone: <a href={SITE_PHONE_HREF} style={s.a}>{SITE_PHONE_DISPLAY}</a>
            <br />
            Email: <a href="mailto:service@oklahomasecurityguardbond.com" style={s.a}>service@oklahomasecurityguardbond.com</a>
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

'use client';

// /app/sms-opt-in/OptInForm.tsx
// Interactive opt-in form. Checkbox is NOT pre-checked (10DLC requirement).

import { useState } from 'react';

import { SITE_PHONE_DISPLAY } from '@/lib/site';

const NAVY = 'var(--navy)';
const GOLD = 'var(--gold)';
const ERROR = 'var(--error)';
const CREAM = 'var(--cream-dark)';
const TEXT = '#243240';

// Must stay identical to CONSENT_TEXT in /app/api/sms-opt-in/route.ts
const CONSENT_TEXT =
  'By checking this box, I agree to receive SMS/text messages from Oklahoma Security Guard Bond / Stockton-Hill Insurance LLC at the mobile number provided. Messages may include bond application updates, document requests, payment or billing reminders, completed bond notifications, renewal reminders, customer service messages, and limited marketing messages about related products or services, including business liability insurance. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out or HELP for assistance. View our Privacy Policy at https://www.oklahomasecurityguardbond.com/privacy and SMS Terms at https://www.oklahomasecurityguardbond.com/terms.';

const f = {
  card: {
    background: '#fff',
    border: '1px solid #e3e0d6',
    borderRadius: 10,
    padding: '28px 26px',
    boxShadow: '0 2px 14px rgba(0,40,104,0.06)',
  } as const,
  label: { display: 'block', fontWeight: 600, color: NAVY, fontSize: 15, marginBottom: 6 } as const,
  input: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '12px 14px',
    fontSize: 16,
    border: '1px solid #c9d2dc',
    borderRadius: 7,
    marginBottom: 18,
    color: TEXT,
    background: '#fff',
  } as const,
  consentRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    background: CREAM,
    borderLeft: `5px solid ${NAVY}`,
    borderRadius: 6,
    padding: '16px 18px',
    margin: '6px 0 18px',
  } as const,
  checkbox: { width: 22, height: 22, marginTop: 2, flexShrink: 0, cursor: 'pointer' } as const,
  consentText: { fontSize: 13.5, lineHeight: 1.6, color: TEXT } as const,
  links: { fontSize: 14, margin: '0 0 20px' } as const,
  a: { color: NAVY, textDecoration: 'underline' } as const,
  button: (enabled: boolean) =>
    ({
      width: '100%',
      padding: '15px 20px',
      fontSize: 17,
      fontWeight: 700,
      color: enabled ? NAVY : '#fff',
      background: enabled ? GOLD : '#c9c2ae',
      border: 'none',
      borderRadius: 8,
      cursor: enabled ? 'pointer' : 'not-allowed',
      letterSpacing: '0.02em',
    } as const),
  error: { color: ERROR, fontSize: 14, marginTop: 12, fontWeight: 600 } as const,
  successWrap: {
    background: '#fff',
    border: '1px solid #e3e0d6',
    borderRadius: 10,
    padding: '34px 30px',
    textAlign: 'center' as const,
  } as const,
  successH: { color: NAVY, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, margin: '0 0 12px' } as const,
  successP: { color: TEXT, fontSize: 16, lineHeight: 1.7, margin: '10px 0' } as const,
  confirmBox: {
    background: CREAM,
    borderLeft: `5px solid ${NAVY}`,
    borderRadius: 6,
    padding: '16px 18px',
    margin: '18px 0 4px',
    textAlign: 'left' as const,
    fontSize: 15,
    lineHeight: 1.6,
    color: TEXT,
  } as const,
};

export default function OptInForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const digits = phone.replace(/\D/g, '');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 1 && digits.length >= 10 && emailOk && consent && status !== 'submitting';

  async function handleSubmit() {
    if (!canSubmit) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/sms-opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim(), consent }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={f.successWrap}>
        <h2 style={f.successH}>Almost done. Check your phone.</h2>
        <p style={f.successP}>
          Thanks, {name.trim().split(' ')[0] || 'there'}. We received your request to receive text
          messages.
        </p>
        <div style={f.confirmBox}>
          <strong>One more step:</strong> we just sent a text to the number you provided. Reply{' '}
          <strong>YES</strong> to that message to confirm. You will not receive any other texts until
          you confirm. Reply <strong>STOP</strong> anytime to opt out, or <strong>HELP</strong> for
          assistance.
        </div>
        <p style={{ ...f.successP, fontSize: 14, color: '#5b6b7a' }}>
          Questions? Call {SITE_PHONE_DISPLAY} or email service@oklahomasecurityguardbond.com.
        </p>
      </div>
    );
  }

  return (
    <div style={f.card}>
      <label style={f.label} htmlFor="optin-name">Name</label>
      <input
        id="optin-name"
        style={f.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        autoComplete="name"
      />

      <label style={f.label} htmlFor="optin-phone">Mobile phone number</label>
      <input
        id="optin-phone"
        style={f.input}
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="(512) 555-0123"
        autoComplete="tel"
      />

      <label style={f.label} htmlFor="optin-email">Email</label>
      <input
        id="optin-email"
        style={f.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        autoComplete="email"
      />

      <div style={f.consentRow}>
        <input
          id="optin-consent"
          style={f.checkbox}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="optin-consent" style={f.consentText}>
          {CONSENT_TEXT}
        </label>
      </div>

      <p style={f.links}>
        <a href="/privacy" style={f.a} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        {'  ·  '}
        <a href="/terms" style={f.a} target="_blank" rel="noopener noreferrer">SMS Terms</a>
      </p>

      <button style={f.button(canSubmit)} onClick={handleSubmit} disabled={!canSubmit}>
        {status === 'submitting' ? 'Submitting...' : 'Submit'}
      </button>

      {status === 'error' && (
        <p style={f.error}>
          Something went wrong. Please try again, or call {SITE_PHONE_DISPLAY}.
        </p>
      )}
    </div>
  );
}

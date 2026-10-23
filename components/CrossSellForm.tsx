'use client';

// /components/CrossSellForm.tsx
// Functional "While You're Here" cross-sell capture.
// Checkboxes + contact info -> POST /api/cross-sell -> Supabase + lead alert email + HubSpot webhook.

import { useState } from 'react';

import { SITE_PHONE_DISPLAY, AGENT_PHRASE } from '@/lib/site';

const NAVY = 'var(--navy)';
const GOLD = 'var(--gold)'; // brand colors live in app/globals.css
const ERROR = 'var(--error)';

const OPTIONS = [
  { id: 'auto_home', label: 'Auto + Home Insurance', sub: 'A quick review of what you pay now' },
  { id: 'commercial', label: 'Business / Liability', sub: 'Security companies, PI agencies, and independents' },
  { id: 'life', label: 'Life Insurance Review', sub: 'Protect your family. 5-minute quote.' },
] as const;

export default function CrossSellForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const digits = phone.replace(/\D/g, '');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    selected.length > 0 && name.trim().length > 1 && digits.length >= 10 && emailOk && status !== 'submitting';

  async function handleSubmit() {
    if (!canSubmit) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/cross-sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests: selected,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      setStatus(res.ok && data.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          background: '#fff',
          border: `2px solid ${NAVY}`,
          borderRadius: 10,
          padding: '28px 26px',
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        <strong style={{ color: NAVY, fontSize: 20, display: 'block', marginBottom: 8 }}>
          Got it, {name.trim().split(' ')[0]}.
        </strong>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          {AGENT_PHRASE.charAt(0).toUpperCase() + AGENT_PHRASE.slice(1)} will reach out for a free, no-obligation review. No spam, no pressure.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="crosssell-options">
        {OPTIONS.map((opt) => {
          const on = selected.includes(opt.id);
          return (
            <div
              key={opt.id}
              className="crosssell-option"
              onClick={() => toggle(opt.id)}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(opt.id)}
              style={{ cursor: 'pointer', outline: on ? `2px solid ${GOLD}` : 'none' }}
            >
              <div
                className="check-box"
                style={{
                  background: on ? GOLD : '#fff',
                  border: `2px solid ${on ? GOLD : NAVY}`,
                  color: NAVY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  minWidth: 22,
                  minHeight: 22,
                }}
              >
                {on ? '\u2713' : ''}
              </div>
              <div className="label">
                <strong>{opt.label}</strong>
                <span>{opt.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div
          style={{
            maxWidth: 560,
            margin: '22px auto 0',
            background: '#fff',
            border: '1px solid #e3e0d6',
            borderRadius: 10,
            padding: '22px 20px',
          }}
        >
          <p style={{ margin: '0 0 14px', fontWeight: 600, color: NAVY }}>
            Where should the agent reach you?
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            style={inputStyle}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile phone"
            autoComplete="tel"
            style={inputStyle}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            style={inputStyle}
          />
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: '100%',
              padding: '14px 18px',
              fontSize: 16,
              fontWeight: 700,
              color: canSubmit ? NAVY : '#fff',
              background: canSubmit ? GOLD : '#c9c2ae',
              border: 'none',
              borderRadius: 8,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Request My Free Review'}
          </button>
          {status === 'error' && (
            <p style={{ color: ERROR, fontSize: 14, marginTop: 10, fontWeight: 600 }}>
              Something went wrong. Please try again or call {SITE_PHONE_DISPLAY}.
            </p>
          )}
        </div>
      )}
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  fontSize: 16,
  border: '1px solid #c9d2dc',
  borderRadius: 7,
  marginBottom: 12,
  background: '#fff',
};

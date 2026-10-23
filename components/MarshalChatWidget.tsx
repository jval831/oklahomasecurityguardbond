'use client';

// /components/MarshalChatWidget.tsx
// Floating chat widget for Marshal, the Oklahoma Security Guard Bond AI assistant.
// Talks to /api/marshal. Captures email/phone from user messages so lead
// alerts carry contact info.

import { useEffect, useRef, useState } from 'react';
import { BrandIcon } from '@/components/BrandLogo';

// Brand colors live in app/globals.css.
const NAVY = 'var(--navy)';
const GOLD = 'var(--gold)';
const CREAM = 'var(--cream)';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

export default function MarshalChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hi, I'm Marshal. Which license are you working on?" },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const sessionId = useRef('');
  const userEmail = useRef<string | undefined>(undefined);
  const userPhone = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId.current) {
      sessionId.current =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const em = text.match(EMAIL_RE);
    if (em) userEmail.current = em[0];
    const ph = text.match(PHONE_RE);
    if (ph) userPhone.current = ph[0];

    const history = messages.slice(1); // drop greeting from API history
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch('/api/marshal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: text,
          conversationHistory: history,
          userEmail: userEmail.current,
          userPhone: userPhone.current,
        }),
      });
      const data = await res.json();
      const reply =
        res.ok && data.reply
          ? data.reply
          : "Sorry, I'm having trouble connecting. Please try again, or email service@oklahomasecurityguardbond.com.";
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Please try again, or email service@oklahomasecurityguardbond.com.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Marshal"
          style={{
            position: 'fixed',
            bottom: 22,
            right: 22,
            zIndex: 1000,
            width: 64,
            height: 64,
            padding: 0,
            borderRadius: '50%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 22px rgba(1,36,79,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BrandIcon height={64} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 18,
            right: 18,
            zIndex: 1000,
            width: 'min(380px, calc(100vw - 24px))',
            height: 'min(560px, calc(100vh - 40px))',
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 12px 44px rgba(1,36,79,0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily:
              "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: NAVY,
              color: CREAM,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <BrandIcon height={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Marshal</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>
                <span style={{ color: '#6fd08c' }}>●</span> Online · Oklahoma Security Guard Bond
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                color: CREAM,
                fontSize: 22,
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: 'auto', padding: 14, background: CREAM }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: 12,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    background: m.role === 'user' ? NAVY : '#fff',
                    color: m.role === 'user' ? CREAM : '#243240',
                    border: m.role === 'user' ? 'none' : '1px solid #e3dcc9',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div style={{ color: '#5b6b7a', fontSize: 13, padding: '2px 6px' }}>
                Marshal is typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: 12,
              borderTop: '1px solid #e3dcc9',
              background: '#fff',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about the bond, CLEET, fingerprints, anything…"
              style={{
                flex: 1,
                padding: '11px 14px',
                fontSize: 15,
                border: '1px solid #c9d2dc',
                borderRadius: 100,
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={busy || !input.trim()}
              aria-label="Send"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: busy || !input.trim() ? '#c9d2dc' : GOLD,
                color: busy || !input.trim() ? '#fff' : NAVY,
                fontSize: 18,
                cursor: busy || !input.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              ➤
            </button>
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#5b6b7a',
              textAlign: 'center',
              padding: '0 12px 10px',
              background: '#fff',
            }}
          >
            Marshal is an AI assistant. For complex questions, a real person follows up.
          </div>
        </div>
      )}
    </>
  );
}

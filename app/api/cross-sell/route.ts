// /app/api/cross-sell/route.ts
// Captures "While You're Here" cross-sell leads.
// Stores to Supabase (osgb_crosssell_leads), emails a lead alert via Resend,
// and fires the HubSpot webhook if configured. Email alert works even if
// the Supabase table doesn't exist yet, so leads are never lost.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
// Comma-separated list, so alerts can go to more than one inbox.
const LEAD_ALERT_TO = (process.env.LEAD_ALERT_TO || 'service@oklahomasecurityguardbond.com')
  .split(',')
  .map((a) => a.trim())
  .filter(Boolean);
const LEAD_ALERT_FROM = process.env.LEAD_ALERT_FROM || 'Marshal Leads <leads@send.oklahomasecurityguardbond.com>';

const INTEREST_LABELS: Record<string, string> = {
  auto_home: 'Auto + Home Insurance',
  commercial: 'Business / Liability',
  life: 'Life Insurance Review',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name || '').toString().trim();
    const phone = (body?.phone || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const interests: string[] = Array.isArray(body?.interests)
      ? body.interests.filter((i: unknown) => typeof i === 'string' && i in INTEREST_LABELS)
      : [];

    if (!name || !phone || !email || interests.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Name, phone, email, and at least one interest are required.' },
        { status: 400 }
      );
    }

    const interestLabels = interests.map((i) => INTEREST_LABELS[i]).join(', ');
    const record = {
      name,
      phone,
      email,
      interests,
      source: 'while-youre-here-form',
      created_at: new Date().toISOString(),
    };

    // 1. Store to Supabase (best effort)
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error } = await supabase.from('osgb_crosssell_leads').insert(record);
        if (error) console.error('[cross-sell] Supabase insert error:', error.message);
      } catch (e) {
        console.error('[cross-sell] Supabase client error:', e);
      }
    }

    // 2. Lead alert email (short-term until HubSpot workflows are wired)
    if (resend) {
      try {
        const { error: sendError } = await resend.emails.send({
          from: LEAD_ALERT_FROM,
          to: LEAD_ALERT_TO,
          replyTo: email,
          subject: `[Site Lead] ${interestLabels} \u2014 oklahomasecurityguardbond.com`,
          text: [
            'New cross-sell lead from the "While You\u2019re Here" form on oklahomasecurityguardbond.com',
            '',
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Interested in: ${interestLabels}`,
            '',
            'Action: licensed agent callback \u2014 same business day.',
          ].join('\n'),
        });
        if (sendError) console.error('[lead alert] Resend error:', JSON.stringify(sendError));
      } catch (e) {
        console.error('[cross-sell] Lead alert email error:', e);
      }
    }

    // 3. HubSpot webhook (if configured)
    if (process.env.HUBSPOT_WEBHOOK_URL) {
      try {
        await fetch(process.env.HUBSPOT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...record, tag: 'crosssell_form_lead' }),
        });
      } catch (e) {
        console.error('[cross-sell] HubSpot webhook error:', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[cross-sell] route error:', e);
    return NextResponse.json({ ok: false, error: 'Server error.' }, { status: 500 });
  }
}

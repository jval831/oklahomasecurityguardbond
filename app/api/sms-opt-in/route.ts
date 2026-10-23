// /app/api/sms-opt-in/route.ts
// Captures SMS opt-in submissions with a full consent record for 10DLC / TCR proof.
// Stores to Supabase table `osgb_sms_optins` (run the provided SQL once to create it).
// Reuses the project's existing Supabase env vars; no new keys needed if Marshal/lead
// capture already work on this site.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

// Keep this string identical to the checkbox text shown on the opt-in page.
const CONSENT_VERSION = '2026-09-18';
const CONSENT_TEXT =
  'By checking this box, I agree to receive SMS/text messages from Oklahoma Security Guard Bond / Stockton-Hill Insurance LLC at the mobile number provided. Messages may include bond application updates, document requests, payment or billing reminders, completed bond notifications, renewal reminders, customer service messages, and limited marketing messages about related products or services, including business liability insurance. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out or HELP for assistance. View our Privacy Policy at https://www.oklahomasecurityguardbond.com/privacy and SMS Terms at https://www.oklahomasecurityguardbond.com/terms.';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name || '').toString().trim();
    const phone = (body?.phone || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const consent = body?.consent === true;

    if (!name || !phone || !email || !consent) {
      return NextResponse.json(
        { ok: false, error: 'Name, mobile number, email, and consent are all required.' },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const record = {
      name,
      phone,
      email,
      consent: true,
      consent_text: CONSENT_TEXT,
      consent_version: CONSENT_VERSION,
      double_optin_status: 'pending', // becomes 'confirmed' when the customer replies YES
      source: 'sms-opt-in-form',
      ip_address: ip,
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    };

    let stored = false;
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error } = await supabase.from('osgb_sms_optins').insert(record);
        if (error) {
          console.error('[sms-opt-in] Supabase insert error:', error.message);
        } else {
          stored = true;
        }
      } catch (e) {
        console.error('[sms-opt-in] Supabase client error:', e);
      }
    } else {
      console.error('[sms-opt-in] Supabase env vars not found.');
    }

    // Optional: forward to HubSpot if a webhook URL is configured.
    const hubspotWebhook =
      process.env.HUBSPOT_SMS_OPTIN_WEBHOOK_URL || process.env.HUBSPOT_WEBHOOK_URL || '';
    if (hubspotWebhook) {
      try {
        await fetch(hubspotWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...record, tag: 'sms_optin_pending' }),
        });
      } catch (e) {
        console.error('[sms-opt-in] HubSpot webhook error:', e);
      }
    }

    // ---------------------------------------------------------------------
    // DOUBLE OPT-IN CONFIRMATION TEXT
    // Fire this AFTER the 10DLC campaign is approved and you have a provider.
    // It sends the "reply YES to confirm" message. Wire it once we know the
    // sending platform (Twilio / Telnyx / Lightspeed / HubSpot). Example shape:
    //
    // await sendDoubleOptIn(phone);
    //
    // async function sendDoubleOptIn(to: string) {
    //   // Provider API call goes here. Message body:
    //   // "Oklahoma Security Guard Bond / Stockton-Hill Insurance LLC: Please reply YES
    //   //  to confirm you want to receive SMS messages about bond service
    //   //  updates, renewal reminders, and related offers such as Errors &
    //   //  Omissions insurance. Msg frequency varies. Msg & data rates may apply.
    //   //  Reply STOP to opt out or HELP for help."
    // }
    // ---------------------------------------------------------------------

    return NextResponse.json({ ok: true, stored });
  } catch (e) {
    console.error('[sms-opt-in] route error:', e);
    return NextResponse.json({ ok: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}

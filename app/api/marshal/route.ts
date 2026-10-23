// /app/api/marshal/route.ts
// Marshal chat endpoint - handles conversation with Claude, intent extraction, and logging.

import { NextRequest, NextResponse } from 'next/server';
import { anthropic, anthropicReady, SOL_MODEL } from '@/lib/anthropic';
import { supabaseAdmin } from '@/lib/supabase';
import { MARSHAL_SYSTEM_PROMPT } from '@/lib/marshal-prompt';
import { Resend } from 'resend';

// Short-term lead alerts by email until HubSpot workflows are wired.
// Set RESEND_API_KEY and LEAD_ALERT_TO in Vercel env (Production).
const RESEND_KEY = (process.env.RESEND_API_KEY || '').trim();
const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;
// Comma-separated list, so alerts can go to more than one inbox.
const LEAD_ALERT_TO = (process.env.LEAD_ALERT_TO || 'service@oklahomasecurityguardbond.com')
  .split(',')
  .map((a) => a.trim())
  .filter(Boolean);
const LEAD_ALERT_FROM = process.env.LEAD_ALERT_FROM || 'Marshal Leads <leads@send.oklahomasecurityguardbond.com>';

const TAG_LABELS: Record<string, string> = {
  insurance_ask_auto: 'AUTO insurance ask',
  insurance_ask_home: 'HOME insurance ask',
  insurance_ask_life: 'LIFE insurance ask',
  insurance_ask_commercial: 'COMMERCIAL insurance ask',
  homeowner_new: 'New homeowner signal',
  human_followup_priority: 'Priority follow-up',
  occupation_realestate: 'Real estate occupation',
  occupation_finance: 'Finance/CU occupation',
  occupation_professional: 'Professional occupation',
  business_owner: 'Business owner',
  multi_vehicle: 'Multi-vehicle household',
  age_medicare_eligible: 'Medicare eligible (60-64)',
  age_medicare_active: 'Medicare active (65+)',
  life_insurance_signal: 'Life insurance signal',
  retirement_planning: 'Retirement planning signal',
};

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  sessionId: string;
  message: string;
  conversationHistory: ChatMessage[];
  userEmail?: string;
  userPhone?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { sessionId, message, conversationHistory = [], userEmail, userPhone } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing sessionId or message' }, { status: 400 });
    }

    // Without ANTHROPIC_API_KEY the SDK call fails and the visitor sees a raw
    // error. Answer in character instead, and point them at a human.
    if (!anthropicReady) {
      return NextResponse.json({
        reply:
          "I'm offline at the moment. Email service@oklahomasecurityguardbond.com and a real person will pick this up, usually the next business day.",
        tags: [],
        sessionId,
      });
    }

    // Build messages array — keep last 20 turns to control token cost
    const trimmedHistory = conversationHistory.slice(-20);

    // Call Claude
    const response = await anthropic.messages.create({
      model: SOL_MODEL,
      max_tokens: 1024,
      system: MARSHAL_SYSTEM_PROMPT,
      messages: [
        ...trimmedHistory,
        { role: 'user', content: message },
      ],
    });

    // Extract text from response
    const textBlock = response.content.find((block) => block.type === 'text');
    let reply = textBlock && 'text' in textBlock ? textBlock.text : '';

    // Extract intent tags before sending to user
    const tagMatch = reply.match(/\[TAG:\s*([^\]]+)\]/);
    let tags: string[] = [];
    if (tagMatch) {
      const rawTags = tagMatch[1].split(',').map((t) => t.trim()).filter((t) => t && t !== 'none');
      tags = rawTags;
      reply = reply.replace(/\[TAG:[^\]]+\]/g, '').trim();
    }

    // Log to Supabase (don't block response if logging fails)
    try {
      if (supabaseAdmin) await supabaseAdmin.from('sol_conversations').insert({
        session_id: sessionId,
        user_message: message,
        bot_reply: reply,
        intent_tags: tags,
        user_email: userEmail || null,
        user_phone: userPhone || null,
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      });
    } catch (logError) {
      console.error('Supabase log error:', logError);
    }

    // Fire HubSpot webhook if priority tag detected
    const priorityTags = [
      'human_followup_priority',
      'homeowner_new',
      'insurance_ask_auto',
      'insurance_ask_home',
      'insurance_ask_life',
      'insurance_ask_commercial',
    ];
    const hasPriority = tags.some((tag) => priorityTags.includes(tag));

    // Short-term: email the lead alert immediately (works without HubSpot)
    if (hasPriority && resend) {
      try {
        const tagList = tags.map((t) => TAG_LABELS[t] || t).join(', ');
        const subjectTag =
          tags.find((t) => t.startsWith('insurance_ask_')) ||
          tags.find((t) => t !== 'human_followup_priority') ||
          'lead';
        const { error: sendError } = await resend.emails.send({
          from: LEAD_ALERT_FROM,
          to: LEAD_ALERT_TO,
          ...(userEmail ? { replyTo: userEmail } : {}),
          subject: `[Marshal Lead] ${TAG_LABELS[subjectTag] || subjectTag} — oklahomasecurityguardbond.com`,
          text: [
            'New lead captured by Marshal on oklahomasecurityguardbond.com',
            '',
            `Signals: ${tagList}`,
            `Email: ${userEmail || 'not captured yet'}`,
            `Phone: ${userPhone || 'not captured yet'}`,
            `Session: ${sessionId}`,
            '',
            'Last customer message:',
            message,
            '',
            'Marshal\'s reply:',
            reply,
            '',
            'Action: licensed agent callback — same business day.',
          ].join('\n'),
        });
        if (sendError) console.error('[lead alert] Resend error:', JSON.stringify(sendError));
      } catch (emailError) {
        console.error('Lead alert email error:', emailError);
      }
    }

    if (hasPriority && process.env.HUBSPOT_WEBHOOK_URL) {
      try {
        await fetch(process.env.HUBSPOT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            tags,
            lastMessage: message,
            email: userEmail,
            phone: userPhone,
            source: 'oklahomasecurityguardbond.com',
          }),
        });
      } catch (webhookError) {
        console.error('HubSpot webhook error:', webhookError);
      }
    }

    return NextResponse.json({
      reply,
      tags,
      sessionId,
    });
  } catch (error: any) {
    console.error('Marshal API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  // `ready` is false until ANTHROPIC_API_KEY is set, so this endpoint can be
  // curled after a deploy to confirm the env var landed.
  return NextResponse.json({
    status: anthropicReady ? 'Marshal is online' : 'Marshal is missing ANTHROPIC_API_KEY',
    model: SOL_MODEL,
    ready: anthropicReady,
  });
}

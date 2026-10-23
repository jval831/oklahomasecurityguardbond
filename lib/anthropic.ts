// /lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

// Soft-fail when the key is missing so the site builds/deploys without env
// vars. Marshal returns a friendly error until ANTHROPIC_API_KEY is set.
// Trim: a key pasted into Vercel with a trailing newline or space is rejected
// by the SDK as an illegal HTTP header value.
const API_KEY = (process.env.ANTHROPIC_API_KEY || '').trim();
export const anthropicReady = Boolean(API_KEY);

export const anthropic = new Anthropic({
  apiKey: API_KEY || 'not-set',
});

export const SOL_MODEL = 'claude-haiku-4-5-20251001';

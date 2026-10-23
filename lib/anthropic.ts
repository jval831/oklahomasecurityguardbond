// /lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

// Soft-fail when the key is missing so the site builds/deploys without env
// vars. Marshal returns a friendly error until ANTHROPIC_API_KEY is set.
export const anthropicReady = Boolean(process.env.ANTHROPIC_API_KEY);

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'not-set',
});

export const SOL_MODEL = 'claude-haiku-4-5-20251001';

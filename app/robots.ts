import type { MetadataRoute } from 'next';

// Allow search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini)
// to read the site. Only the API routes are excluded.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Bingbot', 'Applebot-Extended'], allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://oklahomasecurityguardbond.com/sitemap.xml',
  };
}

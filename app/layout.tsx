// /app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { BRAND, SITE_URL } from '@/lib/site';
import './globals.css';
import { STRUCTURED_DATA } from '@/lib/structured-data';

const TITLE = 'Oklahoma Security Guard & Private Investigator Bonds from $100 | CLEET License Bonds';
const SHARE_DESCRIPTION =
  'CLEET surety bonds for armed and unarmed security guards and private investigators in Oklahoma. 1, 2, or 3-year terms, emailed in minutes, with every licensing step laid out.';

// Share images need absolute URLs. Until the custom domain is attached, Vercel
// reports the project's production URL (the .vercel.app address); once the
// domain is live it reports that instead. Outside Vercel, fall back to the
// canonical domain.
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: { canonical: '/' },
  title: TITLE,
  description:
    'Oklahoma security guard and private investigator surety bonds for CLEET licensing: $5,000 unarmed and $10,000 armed bonds from $100 for 1 year, $175 for 2, $250 for 3. Underwritten by American Surety Company, emailed in minutes, with the training hours, exams, fingerprint rule, and CLEET application steps explained.',
  keywords: [
    'oklahoma security guard bond',
    'oklahoma private investigator bond',
    'cleet bond',
    'cleet security guard license bond',
    'oklahoma armed security guard bond',
    'oklahoma unarmed security guard bond',
    'oklahoma private investigator license requirements',
    'identogo 2B7Q6Z',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [{ url: '/og-image.png', alt: BRAND }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B2545', // logo navy; matches --navy in globals.css
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
      </head>
      <body>{children}</body>
    </html>
  );
}

// /components/BrandLogo.tsx
// Every logo placement on the site goes through here, so the files, sizes and
// alt text are defined once. Logo files live in public/images.
//
// The PNG is the source: next/image serves it as WebP (or AVIF) to browsers
// that accept it and falls back to the PNG for the rest. Standalone .webp copies
// sit beside each PNG for use outside the site (email, partner documents).
//
// Width and height are always passed at the displayed size, so the browser
// reserves the exact box before the file loads and nothing shifts.

import Image from 'next/image';
import { BRAND } from '@/lib/site';

export const LOGOS = {
  color: { src: '/images/osgb-logo-color.png', w: 1981, h: 593 }, // light backgrounds
  reversed: { src: '/images/osgb-logo-reversed.png', w: 1981, h: 593 }, // navy backgrounds
  navy: { src: '/images/osgb-logo-color.png', w: 1981, h: 593 }, // one-color / print (same as color for now)
  icon: { src: '/images/osgb-icon.png', w: 512, h: 512 }, // shield mark
} as const;

type Logo = (typeof LOGOS)[keyof typeof LOGOS];
const atHeight = (logo: Logo, height: number) => ({
  width: Math.round((logo.w * height) / logo.h),
  height,
});

// Header: full-color logo at 56px tall (184px wide). On phones the header row
// drops to 40px, where the full logo would be under 140px wide, so CSS swaps
// in the circular icon alone (see .logo-full / .logo-icon in globals.css).
export function HeaderLogo() {
  return (
    <a href="/" className="logo-mark">
      <Image src={LOGOS.color.src} alt={BRAND} className="logo-full" {...atHeight(LOGOS.color, 56)} priority />
      <Image src={LOGOS.icon.src} alt={BRAND} className="logo-icon" {...atHeight(LOGOS.icon, 40)} />
    </a>
  );
}

// Footer sits on navy, so it gets the reversed logo.
export function FooterLogo() {
  return (
    <a href="/" className="logo-mark">
      <Image src={LOGOS.reversed.src} alt={BRAND} className="footer-logo" {...atHeight(LOGOS.reversed, 48)} />
    </a>
  );
}

// The circular mark on its own, at any height.
export function BrandIcon({ height, className, priority = false }: { height: number; className?: string; priority?: boolean }) {
  return <Image src={LOGOS.icon.src} alt={BRAND} className={className} {...atHeight(LOGOS.icon, height)} priority={priority} />;
}

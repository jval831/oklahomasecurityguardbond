// /lib/site.ts
// Single source of truth for brand, contact, pricing, links and Oklahoma
// CLEET licensing facts. Pages, legal copy and forms read from here, so a
// change made once shows up everywhere. Marshal's prompt (lib/marshal-prompt.ts)
// is plain text and restates these figures - update it too whenever a number
// here changes.
//
// Anything not yet confirmed is wrapped in pending(), which renders a visible
// "[PENDING: ...]" marker on the site. Before launch, a repo-wide search for
// "PENDING" must come back empty.

export const pending = (what: string) => `[PENDING: ${what}]`;

// ---------------------------------------------------------------------------
// Brand and contact
// ---------------------------------------------------------------------------
export const BRAND = 'Oklahoma Security Guard Bond';
export const LEGAL_ENTITY = 'Stockton-Hill Insurance LLC';
export const DBA = `${LEGAL_ENTITY} dba ${BRAND}`;
export const STATE = 'Oklahoma';
export const DOMAIN = 'oklahomasecurityguardbond.com';
export const SITE_URL = `https://${DOMAIN}`;
export const SERVICE_EMAIL = `service@${DOMAIN}`;
export const ASSISTANT_NAME = 'Marshal';

// Phone: using the Lone Star line until an Oklahoma (405) line is provisioned. Change both values.
export const SITE_PHONE_DISPLAY = '(512) 806-0045';
export const SITE_PHONE_HREF = 'tel:+15128060045';
export const BUSINESS_HOURS = 'Mon-Fri 8am-6pm CT';

// Agency licensing. Generic wording until the Oklahoma agency license is
// confirmed; then this can name the state license.
export const AGENCY_LICENSE_PHRASE = 'a licensed insurance agency';
export const AGENT_PHRASE = 'a licensed agent';

// Insurance regulator.
export const REGULATOR_NAME = 'Oklahoma Insurance Department';
export const REGULATOR_PHONE = '1-800-522-0071';
export const REGULATOR_URL = 'oid.ok.gov';

// ---------------------------------------------------------------------------
// The four licenses. Pricing from ASC (Cody Dinsmore, Oct 22, 2026): the
// $5,000 unarmed bond and the $10,000 armed bond were both quoted at $100 for
// 1 year, $175 for 2 years, $250 for 3 years. ASC is confirming that the two
// bond amounts are meant to carry the same premium. Site language must match
// checkout to the penny.
// ---------------------------------------------------------------------------
export type LicenseKey = 'unarmed_guard' | 'armed_guard' | 'unarmed_pi' | 'armed_pi';

export interface License {
  key: LicenseKey;
  name: string; // "Unarmed Security Guard"
  short: string; // "Unarmed Guard"
  bondAmount: string; // "$5,000"
  prices: { years: 1 | 2 | 3; total: number }[];
  licenseFee: number; // CLEET application fee
  phases: string; // "Phase I and II"
  hours: number; // training hours
  exams: string; // which CLEET exams
  ceHours: number; // continuing education per license period
  armed: boolean;
  pi: boolean;
  storeUrl: string; // ASC checkout link
}

const TERMS = [
  { years: 1 as const, total: 100 },
  { years: 2 as const, total: 175 },
  { years: 3 as const, total: 250 },
];

// Store links - placeholders until ASC sends the Oklahoma store links.
// They anchor to the pricing section so buttons stay usable in preview.
const STORE_PLACEHOLDER = '#pricing'; // PENDING: ASC store links for all four licenses

export const LICENSES: License[] = [
  {
    key: 'unarmed_guard',
    name: 'Unarmed Security Guard',
    short: 'Unarmed Guard',
    bondAmount: '$5,000',
    prices: TERMS,
    licenseFee: 50,
    phases: 'Phase I and Phase II',
    hours: 40,
    exams: 'Unarmed Security Guard exam',
    ceHours: 8,
    armed: false,
    pi: false,
    storeUrl: STORE_PLACEHOLDER,
  },
  {
    key: 'armed_guard',
    name: 'Armed Security Guard',
    short: 'Armed Guard',
    bondAmount: '$10,000',
    prices: TERMS,
    licenseFee: 100,
    phases: 'Phase I, II, and IV',
    hours: 72,
    exams: 'Unarmed Security Guard exam and the Firearms exam',
    ceHours: 8,
    armed: true,
    pi: false,
    storeUrl: STORE_PLACEHOLDER,
  },
  {
    key: 'unarmed_pi',
    name: 'Unarmed Private Investigator',
    short: 'Unarmed PI',
    bondAmount: '$5,000',
    prices: TERMS,
    licenseFee: 50,
    phases: 'Phase I and Phase III',
    hours: 55,
    exams: 'Unarmed Private Investigator exam',
    ceHours: 16,
    armed: false,
    pi: true,
    storeUrl: STORE_PLACEHOLDER,
  },
  {
    key: 'armed_pi',
    name: 'Armed Private Investigator',
    short: 'Armed PI',
    bondAmount: '$10,000',
    prices: TERMS,
    licenseFee: 100,
    phases: 'Phase I, III, and IV',
    hours: 87,
    exams: 'Unarmed Private Investigator exam and the Firearms exam',
    ceHours: 16,
    armed: true,
    pi: true,
    storeUrl: STORE_PLACEHOLDER,
  },
];

export const LOWEST_PRICE = Math.min(...LICENSES.flatMap((l) => l.prices.map((p) => p.total)));
export const COMBO_LICENSE_FEE = 150; // Armed Security Guard + Armed Private Investigator combination
export const COMBO_HOURS = 115; // Phase I, II, III and IV
export const COMBO_CE_HOURS = 16;

// ---------------------------------------------------------------------------
// CLEET process - from the Oklahoma Council on Law Enforcement Education and
// Training requirements as provided by ASC, and oklahoma.gov/cleet.
// ---------------------------------------------------------------------------
export const CLEET_NAME = 'Council on Law Enforcement Education and Training';
export const CLEET_URL = 'https://oklahoma.gov/cleet.html';
export const CLEET_PORTAL_URL = 'https://cleet.us.thentiacloud.net/webs/cleet/application/#/login';
export const IDENTOGO_URL = 'https://www.identogo.com/';
export const IDENTOGO_SERVICE_CODE = '2B7Q6Z'; // security guards and private investigators only
export const FINGERPRINT_WINDOW_DAYS = 30; // fingerprints must be within 30 days of submitting the application
export const EXAM_PASS_PERCENT = 70;
export const TESTING_FEE = 50; // per CLEET exam sitting
export const LAPSE_DAYS = 30; // a license expired more than this cannot be renewed
export const ARMED_WAIVER_LEGAL_BLOCK_HOURS = 2; // armed waivers still need the legal block unless CLEET-certified peace officer

# Oklahoma Security Guard Bond - Deploy Checklist

Oklahoma CLEET security guard and private investigator bond site. Stack:
Next.js 14 + Vercel + Supabase (optional) + Anthropic (Marshal) + Resend.

All brand, price, link and process values live in `lib/site.ts`. Accent colors
live in `app/globals.css` (:root). Marshal's prompt (`lib/marshal-prompt.ts`)
restates the prices and must be updated alongside `lib/site.ts`.

## Go-live gate
- [ ] `grep -rn "PENDING" app components lib` returns nothing.
- [ ] Every price on the site matches ASC checkout to the penny.
- [ ] All four `storeUrl` values in `lib/site.ts` are ASC store links, not `#pricing`.

## Pending from ASC (Cody Dinsmore)
- [ ] Store links for all four licenses (unarmed guard, armed guard, unarmed PI, armed PI).
- [ ] Confirm the $5,000 unarmed bond and the $10,000 armed bond both carry
      $100 / $175 / $250 for 1 / 2 / 3 years (quoted identically on Oct 22).
- [ ] Unarmed pricing vs. the $50 one-year market rate.
- [ ] Combination license (armed guard + armed PI): one bond or two?
- [ ] Whether the ASC bond alone satisfies CLEET's "Letter of Employment or
      Bond/Insurance" line, or applicants also need liability insurance.
- [ ] Sample bond docs and cover letter with the right ASC contact for Oklahoma.

## Pending from Stockton-Hill
- [ ] Confirm the Oklahoma agency license (AGENCY_LICENSE_PHRASE) and that
      cross-sell callback agents are Oklahoma licensed (AGENT_PHRASE).
- [ ] (405) phone number. Using the Lone Star line until then.
- [x] Final logo set in public/images (color lockup, reversed lockup, shield icon).
- [ ] Mailbox service@oklahomasecurityguardbond.com, forwarding to bonds@stocktonhillinsurance.com.

## Vercel
- Project: oklahomasecurityguardbond, connected to jval831/oklahomasecurityguardbond, main.
- Domains: oklahomasecurityguardbond.com (production), www (308 to apex),
  oklahomasecuritybond.com (308 to apex).
- Env: ANTHROPIC_API_KEY, RESEND_API_KEY (Full access key), LEAD_ALERT_TO,
  LEAD_ALERT_FROM. Supabase vars are optional.
- Status (Oct 23, 2026): project created, first deploy live at
  https://oklahomasecurityguardbond.vercel.app. LEAD_ALERT_TO and
  LEAD_ALERT_FROM set. ANTHROPIC_API_KEY and RESEND_API_KEY still to be added,
  then redeploy. Resend sending domain send.oklahomasecurityguardbond.com
  added and GoDaddy DNS records (DKIM TXT, two CNAMEs) in place.

## Post-deploy tests
- Home page renders; every Get My Bond button opens the right ASC checkout in a new tab.
- Marshal: "how much is an unarmed guard bond" -> $100 / $175 / $250, $5,000 bond
- Marshal: "what's the armed PI bond" -> $10,000 bond, same prices, MMPI required
- Marshal: "do I need the bond before training" -> no, training and exam first
- Marshal: "how long are fingerprints good" -> 30 days before submission, code 2B7Q6Z
- Marshal: "will my DUI disqualify me" -> CLEET's call, won't advise
- Marshal: "is the bond liability insurance" -> no, protects the public; offers agent review
- Marshal: "I run a security company with 12 guards" -> callback, collects headcount
- Marshal: "do you file with CLEET for me" -> no
- Cross-sell form submits and a [Site Lead] email arrives.
- /robots.txt, /sitemap.xml, /llms.txt all load.

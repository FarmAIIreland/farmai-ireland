# FarmAI Ireland — Master Context Document

*Last updated: March 16, 2026 · Session 7*

---

## One-Line Pitch

A polished, AI-powered media brand making practical AI knowledge accessible to Irish farmers — with a repeatable playbook to clone into any blue-collar vertical.

---

## Business Entity

| Item | Detail |
|------|--------|
| Operating brand | FarmAI Ireland |
| Parent entity | Samac Consulting (John Robinson) |
| Model | Samac is the invisible commercial backbone. FarmAI Ireland is the public brand. |
| Scalability | Clone to ConstructionAI.ie, TradeAI.ie etc. |

---

## Infrastructure — Status

| Item | Status |
|------|--------|
| farmai.ie + defensive domains | ✅ Done |
| WHOIS privacy on all domains | ✅ Done |
| Google Workspace Business Starter | ✅ Done + downgraded |
| 2FA on all accounts | ✅ Done |
| GitHub org + repo (master only) | ✅ Done |
| Vercel connected + auto-deploying | ✅ Done |
| Mailchimp connected to newsletter form | ✅ Done — Session 5 |
| Airtable base + env vars in Vercel | ✅ Done — Session 5 |
| ArticleFeedback wired to Airtable | ✅ Done — Session 5 |
| farmai.ie pointed at Vercel | ❌ Pending — DNS A record in Hosting Ireland (see instructions below) |
| Cloudflare in front of Vercel | ❌ Pending — manual Cloudflare account setup |
| Google Analytics ID added | ⏳ GA script wired in layout.tsx — replace G-XXXXXXXXXX in config/site.json with real ID |

---

## Site Build — Status

| Page / Feature | Status |
|----------------|--------|
| Homepage — all 6 sections | ✅ Built |
| Departures board hero | ✅ Built |
| Newsletter strip → Mailchimp | ✅ Connected Session 5 |
| ArticleFeedback → Airtable | ✅ Wired Session 5 |
| /read + /guides listing | ✅ Built |
| /read/[slug] + /guides/[slug] | ✅ Built |
| Lora font | ⏳ Confirm live on Vercel |
| /about, /contact, /sources, /tools | ⏳ Confirm live on Vercel |
| All 4 legal pages | ⏳ Confirm live on Vercel |
| Hero centering + button border fix | ✅ Done Session 7 — border-2 border-white/75 |
| Ampersand fix + OfficialAdviceBanner | ✅ Confirmed correct in code — verify on live site |
| Mobile 375px check | ⏳ Visual check needed on live site |
| Cookie banner | ❌ Not yet |
| sitemap.xml + robots.txt | ✅ Done Session 7 — app/sitemap.ts + public/robots.txt live |

---

## Credentials

| Item | Value |
|------|-------|
| Mailchimp form action URL | https://farmai.us8.list-manage.com/subscribe/post?u=1f348941acbc5a0faa981e4f0&id=2757c8b36c |
| Airtable Base ID | app53fvQL3Imcp2ao |
| Airtable Table ID | tbldrruA63sW4ieVj |
| Airtable API key location | 1Password — Airtable API Token FarmAI |

---

## Content — Status

| Article | Status |
|---------|--------|
| weekly-roundup-march-23.md | ✅ Live |
| save-time-calving-apps.md | ✅ Live |
| pasturebase-phone-grass-measurement.md | ✅ Live |
| chatgpt-biss-application-guide.md | ✅ Live |
| ai-glossary.md | ✅ Live |
| chatgpt-first-10-prompts-farmers.md | ✅ Live |
| faq-getting-started-ai-farming.md | ✅ Live |
| does-ai-replace-teagasc-advisor.md | ✅ Live |
| ndvi-satellite-maps-irish-farms.md | ✅ Live |
| ai-glossary-plain-english-farmers.md | ✅ Live |
| ai-acres-scheme-paperwork.md | ✅ Live — Session 7 |
| heat-detection-apps-ireland-review.md | ✅ Live — Session 7 |

---

## Budget

| Item | Cost |
|------|------|
| Domains (all 3 + WHOIS) | €25 one-off ✅ |
| Claude Max | €93/month |
| Google Workspace Starter | €6/month ✅ |
| Vercel free tier | €0 |
| Mailchimp free tier | €0 |
| Airtable free tier | €0 |
| ElevenLabs (Month 3+) | €20/month |
| Pictory (Month 3+) | €17/month |
| Core monthly burn | €99/month |
| Full with YouTube | €136/month |

---

## KPIs — Six Numbers Every Monday

| Metric | Month 3 Target |
|--------|----------------|
| Monthly unique visitors | 2,000 |
| Email subscribers | 200 |
| Newsletter open rate | 40%+ |
| Articles published (cumulative) | 30+ |
| Airtable thumbs up rate | 70%+ |
| Active sponsors | 0 (outreach begins M3) |

---

## Session Log

| Session | Key Outputs |
|---------|-------------|
| Session 1 | Strategy, brand, infrastructure, domain setup |
| Session 2 | Content strategy, sponsors, media contacts, newsletter, wireframes, Claude Code brief v3 |
| Session 3 | Launch article, 4 expert filters, 2-month calendar, sponsorship model, 2FA complete |
| Session 4 | Site live on Vercel, departures board hero, warmth design, 10 articles live, routing built |
| Session 5 | Mailchimp connected, Airtable created + wired, ArticleFeedback live, homepage reviewed — all 6 sections confirmed |
| Session 6 | Outstanding items: DNS, Cloudflare, Analytics, polish pass, Unsplash images, 2 articles, sitemap/robots |
| Session 7 | Docs migrated to /docs as .md files; 2 new articles moved to content/articles/ and live; app/sitemap.ts created (sitemap.xml now generating); GA script wired in layout.tsx (needs real ID in site.json); button border polished; CSP updated for GA; robots.txt confirmed live; Airtable API route confirmed correct — verify by thumbing article on live site; DNS/Cloudflare pending manual setup |

---

## Standing Instruction — End of Every Session

At the end of every Claude Code session, do the following before closing:

1. Update `/docs/master-context.md` — add session entry to Session Log, update all status tables to reflect what was done
2. Update any other `/docs` files if their content changed
3. `git add docs/ content/`
4. `git commit -m "docs: update master context after Session N"`
5. `git push`

This keeps the context document live and accurate for the next session opener.

---

## Session 8 — Next Actions (Priority Order)

| # | Action | Status |
|---|--------|--------|
| 1 | Verify Airtable feedback — thumb article on live site, confirm row in base app53fvQL3Imcp2ao | ❌ Manual test needed |
| 2 | Point farmai.ie at Vercel — add A record 76.76.21.21 in Hosting Ireland DNS panel | ❌ Manual |
| 3 | Set up Cloudflare free account — proxy farmai.ie through Cloudflare after DNS is live | ❌ Manual |
| 4 | Replace G-XXXXXXXXXX in /config/site.json with real Google Analytics ID | ❌ Needs real GA ID |
| 5 | Mobile 375px visual check on live site | ❌ Manual |
| 6 | Cookie banner | ❌ Not started |
| 7 | Draft PR outreach copy + create social accounts — soft launch prep | ❌ Not started |

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*

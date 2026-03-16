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
| Airtable base + env vars in Vercel | ✅ Done — Session 5; table ID corrected Session 7 |
| ArticleFeedback wired to Airtable | ✅ Done — Session 5; confirmed working Session 7 |
| farmai.ie pointed at Vercel | ❌ Pending — DNS A record in Hosting Ireland (see instructions below) |
| Cloudflare in front of Vercel | ❌ Pending — manual Cloudflare account setup |
| Google Analytics ID added | ✅ Done — Session 7 (G-VQC756088N in config/site.json) |

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
| Section spacing — 80px desktop / 48px mobile | ⏳ py-12 → py-12 md:py-20 needed on article/guide pages + home sections |
| Mobile 375px check | ⏳ Visual check needed on live site |
| Cookie banner | ❌ Not yet |
| sitemap.xml + robots.txt | ✅ Done Session 7 — app/sitemap.ts + public/robots.txt live |

---

## Credentials

| Item | Value |
|------|-------|
| Mailchimp form action URL | https://farmai.us8.list-manage.com/subscribe/post?u=1f348941acbc5a0faa981e4f0&id=2757c8b36c |
| Airtable Base ID | app53fvQL3Imcp2ao |
| Airtable Feedback Table ID | tbldrruA63sW4ieVj |
| Airtable API key location | 1Password — Airtable API Token FarmAI |

---

## Environment Variables — Vercel

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| `AIRTABLE_API_KEY` | Airtable write access (feedback + KPI snapshots) | 1Password — Airtable API Token FarmAI |
| `AIRTABLE_BASE_ID` | Airtable base | `app53fvQL3Imcp2ao` |
| `AIRTABLE_TABLE_ID` | Feedback table | `tbldrruA63sW4ieVj` |
| `AIRTABLE_KPI_TABLE_ID` | KPI snapshots table (week-on-week) | Create table in Airtable — see note below |
| `MAILCHIMP_API_KEY` | Mailchimp subscriber + open rate data | Mailchimp → Account → Extras → API keys |
| `MAILCHIMP_LIST_ID` | Mailchimp audience ID | Mailchimp → Audience → Settings → Audience name and defaults |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp data centre prefix | `us8` (from form URL) |
| `VERCEL_API_TOKEN` | Read Vercel Web Analytics | vercel.com/account/tokens |
| `VERCEL_PROJECT_ID` | Vercel project identifier | Vercel project → Settings → General |
| `RESEND_API_KEY` | Send Monday KPI email | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | From address for KPI email (optional) | Default: `KPI Report <reports@farmaiireland.ie>` — domain must be verified in Resend |
| `DASHBOARD_PASSWORD` | Password for /dashboard | Set any strong password |

### Airtable KPI Snapshots table setup
Create a table called **KPI Snapshots** in base `app53fvQL3Imcp2ao` with these fields:
- `Date` — Date field
- `Visitors` — Number
- `Subscribers` — Number
- `OpenRate` — Number (stores 0–100)
- `ThumbsUpRate` — Number (stores 0–100)
- `ArticleCount` — Number
- `Sponsors` — Number

Copy the table ID and set it as `AIRTABLE_KPI_TABLE_ID` in Vercel. Week-on-week deltas on the dashboard appear after the second Monday report.

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
| Session 7 | Docs migrated to /docs as .md files; 2 new articles moved to content/articles/ and live; app/sitemap.ts created; GA script wired in layout.tsx; button border polished; robots.txt confirmed live; Airtable feedback broken — diagnosed incorrect AIRTABLE_TABLE_ID in Vercel env vars, corrected to tbldrruA63sW4ieVj, redeployed, confirmed working; Google Analytics ID G-VQC756088N added to config/site.json; section spacing fix identified (not yet applied); DNS/Cloudflare pending manual setup |

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
| 1 | Section spacing fix — py-12 → py-12 md:py-20 on article/guide pages; py-12 sm:py-20 on home sections + TopicPillars | ❌ Code change needed |
| 2 | Point farmai.ie at Vercel — add A record 76.76.21.21 in Hosting Ireland DNS panel | ❌ Manual |
| 3 | Set up Cloudflare free account — proxy farmai.ie through Cloudflare after DNS is live | ❌ Manual |
| 4 | Mobile 375px visual check on live site | ❌ Manual |
| 5 | Cookie banner | ❌ Not started |
| 6 | Draft PR outreach copy + create social accounts — soft launch prep | ❌ Not started |

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*

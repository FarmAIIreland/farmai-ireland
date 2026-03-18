# FarmAI Ireland — Master Context Document

*Last updated: March 16, 2026 · Session 11*

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
| farmai.ie pointed at Vercel | ✅ Done — Session 12 — confirmed live (HTTP 200) |
| Cloudflare in front of Vercel | ❌ Pending — manual Cloudflare account setup |
| Google Analytics ID added | ✅ Done — Session 7 (G-VQC7560BBN in config/site.json) |
| Google Search Console | ❌ Pending — verify farmai.ie at https://search.google.com/search-console (DNS TXT record method via Hosting Ireland) |
| KPI dashboard (/dashboard) | ✅ Done — Session 8/9 — password-protected, WoW deltas, farmland hero |
| Monday KPI email + broken link check | ✅ Done — Session 8/9 — cron-job.org scheduled Mon 8am UTC — email delivery confirmed Session 11 |
| Sunday content pipeline | ✅ Done — Session 9 — cron-job.org scheduled Sun 8pm UTC — end-to-end untested |
| Daily email responder drafts | ✅ Done — Session 9 — cron-job.org scheduled daily 8am UTC — end-to-end untested |
| Cron jobs moved to cron-job.org | ✅ Done — Session 12 — CRON_SECRET secured, 3 jobs live at farmai.ie URLs |
| Gmail labels + filters setup | ✅ Done — Session 9 — /api/gmail-setup one-time route |
| Gmail unread inbox monitor on dashboard | ✅ Done — Session 9 — Sponsorship + Media label counts |

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
| Cookie banner | ✅ Done — Session 10 — localStorage flag, Accept/Decline, GA loads on Accept only |
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
| `ANTHROPIC_API_KEY` | Claude API for content pipeline article generation | console.anthropic.com → API Keys |
| `UNSPLASH_ACCESS_KEY` | Unsplash image search for generated articles | unsplash.com/developers → Your apps |
| `GMAIL_CLIENT_ID` | Gmail OAuth2 — client ID | Google Cloud Console → APIs & Services → Credentials |
| `GMAIL_CLIENT_SECRET` | Gmail OAuth2 — client secret | Google Cloud Console → APIs & Services → Credentials |
| `GMAIL_REFRESH_TOKEN` | Gmail OAuth2 — long-lived refresh token | Generate via OAuth2 playground with gmail.modify + gmail.settings.basic scopes |
| `GOOGLE_SHEETS_ID` | Google Sheet ID for idea capture form | Extract from sheet URL — `docs.google.com/spreadsheets/d/{ID}/edit` |
| `GITHUB_TOKEN` | GitHub PAT for committing draft articles | github.com → Settings → Developer settings → Personal access tokens (repo scope) |
| `GITHUB_REPO` | GitHub repo for content commits (optional) | Default: `FarmAIIreland/farmai-ireland` |

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

## Automation — Vercel Cron Jobs

| Cron | Schedule | What it does |
|------|----------|--------------|
| `/api/kpi-report` | Monday 8am UTC | Fetches 6 KPIs, checks broken links, sends plain-text email via Resend, saves Airtable snapshot |
| `/api/content-pipeline` | Sunday 8pm UTC | Reads Google Sheet ideas + content-strategy.md backlog, generates 3 draft articles via Claude API, commits to `/content/drafts/` via GitHub API, emails preview |
| `/api/email-responder` | Daily 8am UTC | Reads unread Gmail per label (Sponsorship/Media/Reader/Partnership/Complaint), creates draft replies from `/docs/email-templates.md`, marks as read, sends notification email if drafts created |

### One-time setup routes

| Route | Purpose |
|-------|---------|
| `GET /api/gmail-setup` | Creates Gmail labels and keyword filters from `/docs/gmail-config.md`. Safe to re-run (idempotent). |

### Config files (edit in /docs, auto-deploys on push)

| File | Controls |
|------|---------|
| `docs/gmail-config.md` | Gmail label list + filter keywords per label + notification address |
| `docs/email-templates.md` | Reply templates per label with `{{firstName}}`, `{{originalSubject}}`, `{{todayDate}}` variables |
| `docs/content-strategy.md` | 50-topic backlog — pipeline picks unpublished topics from here |
| `docs/content-review-prompt.md` | 4-persona quality gate (Síle, Declan, Aoife, Pádraic) — run on every article before commit |
| `docs/link-exceptions.md` | Sites that return false-positive 403s in link checker (moocall, chat.openai.com, pasturebase.ie) — do not flag as broken |

---

## Content — Status

| Article | Pillar | Status |
|---------|--------|--------|
| weekly-roundup-march-23.md | whats-changing | ✅ Live |
| save-time-calving-apps.md | save-time | ✅ Live |
| pasturebase-phone-grass-measurement.md | tools-explained | ✅ Live |
| chatgpt-biss-application-guide.md | save-time | ✅ Live |
| ai-glossary.md | tools-explained | ✅ Live |
| chatgpt-first-10-prompts-farmers.md | tools-explained | ✅ Live |
| faq-getting-started-ai-farming.md | tools-explained | ✅ Live |
| does-ai-replace-teagasc-advisor.md | tools-explained | ✅ Live |
| ndvi-satellite-maps-irish-farms.md | tools-explained | ✅ Live |
| ai-glossary-plain-english-farmers.md | tools-explained | ✅ Live |
| ai-acres-scheme-paperwork.md | save-time | ✅ Live — Session 7 |
| heat-detection-apps-ireland-review.md | does-this-work | ✅ Live — Session 7 |
| chatgpt-herd-register-icbf.md | save-time | ✅ Live |
| icbf-ai-ebi-explained.md | tools-explained | ✅ Live |
| variable-rate-fertiliser-ireland.md | does-this-work | ✅ Live |
| chatgpt-and-the-tams-application.md | save-time | ✅ Live |
| how-to-use-ai-to-audit-your-biss.md | save-time | ✅ Live |
| using-ai-to-track-acres-compliance.md | save-time | ✅ Live |
| ai-nitrates-compliance-checklist.md | save-time | ✅ Written Session 14 |
| body-condition-scoring-apps-tested.md | does-this-work | ✅ Written Session 14 |
| sheep-scanning-ai-tools.md | does-this-work | ✅ Written Session 14 |
| carbon-calculator-apps-ireland.md | whats-changing | ✅ Written Session 14 |
| eu-ai-act-irish-agri-software.md | whats-changing | ✅ Written Session 14 |
| chatgpt-claude-gemini-which-for-farmers.md | does-this-work | ✅ Written Session 14 |
| teagasc-using-ai-whats-coming.md | whats-changing | ✅ Written Session 14 |
| irish-co-ops-ai-milk-prices.md | whats-changing | ✅ Written Session 14 |

**Pillar distribution:** save-time: 8 · tools-explained: 9 · does-this-work: 5 · whats-changing: 5 — all pillars at 5+ target

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
| Session 7 | Docs migrated to /docs as .md files; 2 new articles moved to content/articles/ and live; app/sitemap.ts created; GA script wired in layout.tsx; button border polished; robots.txt confirmed live; Airtable feedback broken — diagnosed incorrect AIRTABLE_TABLE_ID in Vercel env vars, corrected to tbldrruA63sW4ieVj, redeployed, confirmed working; Google Analytics ID G-VQC7560BBN added to config/site.json; section spacing fix identified (not yet applied); DNS/Cloudflare pending manual setup |
| Session 8 | KPI dashboard built (/dashboard + login + middleware); Monday KPI email + Vercel Cron; Unsplash images curated for all 10 content files; hero redesigned to h-[40vh]/h-[50vh] banner with larger departures board text |
| Session 9 | Full automation build: content pipeline (Claude API → GitHub drafts → Resend preview), idea capture (Google Sheets), email responder (Gmail drafts from templates), Gmail filters setup, broken link checker, dashboard upgraded (subscriber hero + Gmail inbox monitor + farmland bg), all crons configured in vercel.json, all config editable in /docs markdown files |
| Session 10 | **Completed:** Permanent Claude Code operating instructions added to master-context.md; 4-persona content review prompt at /docs/content-review-prompt.md; GA4 ID G-VQC7560BBN added to config/site.json; cookie banner built and deployed; crons confirmed in vercel.json; CLONE.md, press-release.md, social-setup.md committed; farmai-pipeline.html and future-ideas-monetization.md committed; departures board font +25%; UI polish pass (spacing, OfficialAdviceBanner). **Blocked → Session 11:** Automation pipeline not functional — env vars missing from Vercel production (RESEND_API_KEY, ANTHROPIC_API_KEY, GITHUB_TOKEN, GMAIL_* x3, MAILCHIMP_* x2, VERCEL_API_TOKEN, VERCEL_PROJECT_ID, AIRTABLE_KPI_TABLE_ID); hero centering and mobile 375px outstanding; GitHub template repo checkbox not done; social accounts not launched; three articles written but not committed pending automation test. |
| Session 11 | **Completed:** All Vercel env vars set (RESEND, Anthropic, GitHub, Gmail OAuth x3, Mailchimp x2, Vercel API, Airtable KPI); Gmail OAuth confirmed working; Resend domain verified (farmai.ie); MX records added in Hosting Ireland DNS for Google Workspace; DMARC requirement added to CLONE.md; `/api/kpi-report` fully working — HTTP 200, email confirmed delivered to hello@farmai.ie; fixed build failure caused by API routes missing `force-dynamic` export; all Resend from addresses corrected from farmaiireland.ie → farmai.ie; 21 broken source links diagnosed and fixed across 11 content files (gov.ie restructure, Teagasc restructure, ICBF path changes, Merck/SenseHub brand change); `/docs/link-exceptions.md` created; source URL validation rule added to operating instructions and memory; 3 new articles written, persona-reviewed, and committed (chatgpt-first-10-prompts-farmers, icbf-ai-ebi-explained, variable-rate-fertiliser-ireland) — 16 articles total. **Deferred → Session 12:** `/api/content-pipeline` test; `/api/email-responder` test; UI polish; social launch; press release. |
| Session 12 | **Completed:** Vercel cron blocker fixed — removed `crons` from vercel.json, created `docs/cron-setup.md` for manual cron-job.org setup; full UI polish sprint: Header (16px nav, Subscribe CTA, 72px height), Hero (clamp font sizing), ArticleCard full redesign (3px pillar bar, monospace tag, payoff line, verdict badge, hover lift), NewsletterForm shared component + `/api/newsletter` route (no Mailchimp redirect, inline confirm), site.json pillars restructured to 4 editorial categories, pillarImages added, FAQ expanded to 8 questions, Facebook removed, TopicPillars 4-tile grid, /read filter tabs + image dedup, /guides image dedup, About page 3-section redesign, Tools page clean placeholder, typography tightened (H1 clamp). Build clean, deployed. **Deferred → Session 13:** `/api/content-pipeline` end-to-end test; `/api/email-responder` test; review 3 existing drafts in /content/drafts/; mobile 375px visual check on live site; social launch; press release; cron-job.org manual setup. |
| Session 14 | **Completed:** Content expansion — 8 new articles written (nitrates compliance, BCS apps, sheep scanning AI, carbon calculators, EU AI Act, ChatGPT vs Claude vs Gemini, Teagasc AI internally, co-ops AI milk prices); AI glossary expanded with 5 new terms (Prompt, AI Model, Token, Computer Vision, updated LLM); 3 stale duplicate drafts deleted. **SEO overhaul:** all 30 content files migrated from topic pillars to 4 editorial pillars (save-time, tools-explained, whats-changing, does-this-work); SEO frontmatter (seo.title, seo.description, seo.keywords) wired into generateMetadata; canonical URLs on all articles/guides; JSON-LD Article schema on every content page + Organization schema in root layout; site keywords expanded from 4 to 14; content-pipeline.ts updated for new pillars + SEO frontmatter. **Image system:** /api/og edge route built with @vercel/og for branded article images (pillar colour bar, title, FarmAI logo); ArticleCard redesigned with CSS pillar headers replacing duplicate Unsplash photos; OG images wired into social sharing metadata; image dedup logic removed. **Housekeeping:** Google Search Console added to infrastructure list; master-context updated with full content inventory and pillar distribution. All 4 pillars at 5+ target (save-time: 8, tools-explained: 9, does-this-work: 5, whats-changing: 5). 27 total articles/guides. |

---

## Autonomy Rules — Claude Code Operating Instructions

Proceed autonomously on all standard development and content tasks. Only stop if:
1. Something is about to be permanently deleted
2. A build error blocks progress and cannot be resolved
3. A credential is needed that isn't in 1Password or Vercel env vars

### Bash autonomy — session warmup
At the start of every session, before doing anything else, run this warmup block to pre-approve all common command patterns:

```
cd C:/Users/johnf/farmai-ireland && git status && npx vercel env ls 2>&1 && npm --version && curl --version 2>&1
```

Select "Yes, and don't ask again" for every pattern that appears. This clears the permission prompts for the rest of the session.

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

## Session 15 — Next Actions (Priority Order)

### Priority 1 — Visual QA & Hero Fix

| # | Action | Status |
|---|--------|--------|
| 1 | Mobile 375px visual check on live site — review all pages, note issues | ❌ Manual (John on mobile) |
| 2 | Confirm Lora font loading on live Vercel | ❌ Manual (John on mobile) |
| 3 | Fix hero departures board bounce — "Cut Paperwork" and "Tips & Tricks" wrap to 2 lines on mobile, pushing CTA buttons down; consider making phrases static or fixing min-height | ❌ |
| 4 | Full review of site with fresh eyes — are operating instructions still relevant? Anything missing? | ❌ |

### Priority 2 — Automation testing (carried from Session 13)

| # | Action | Status |
|---|--------|--------|
| 5 | Trigger `/api/content-pipeline` — confirm drafts generated, GitHub commit, preview email sent | ❌ |
| 6 | Trigger `/api/email-responder` — confirm Gmail OAuth works, labels found, draft replies created | ❌ |

### Priority 3 — Manual steps (carried)

| # | Action | Status |
|---|--------|--------|
| 7  | Verify farmai.ie in Google Search Console — DNS TXT record method via Hosting Ireland: https://search.google.com/search-console | ❌ Manual |
| 8  | Link Search Console to GA4 property (G-VQC7560BBN) | ❌ Manual |
| 9  | Social accounts: follow /docs/social-setup.md | ❌ Manual |
| 10 | Press release: send same day social goes live | ❌ Manual |
| 11 | Set up Cloudflare after DNS is live | ❌ Manual |
| 12 | GitHub template repo: Settings → Template repository → tick box | ❌ Manual |

### Priority 4 — Recurring

| # | Action | Cadence |
|---|--------|---------|
| 13 | SEO review: top keywords, article performance by pillar, Search Console data | Monthly |
| 14 | Content gap check: ensure all pillars stay at 5+ articles | Monthly |

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*

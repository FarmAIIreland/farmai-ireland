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
| farmai.ie pointed at Vercel | ❌ Session 6 — pending |
| Cloudflare in front of Vercel | ❌ Session 6 — pending |
| Google Analytics ID added | ❌ Session 6 — pending |

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
| Hero centering + button border fix | ⏳ Session 6 polish pass |
| Ampersand fix + OfficialAdviceBanner | ⏳ Session 6 polish pass |
| Mobile 375px check | ⏳ Session 6 polish pass |
| Cookie banner | ❌ Not yet |
| sitemap.xml + robots.txt | ❌ Not yet |

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
| ai-acres-scheme-paperwork.md | ✅ Written — Session 7 |
| heat-detection-apps-ireland-review.md | ✅ Written — Session 7 |

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
| Session 7 | Docs migrated to /docs as .md files; ai-acres-scheme-paperwork.md and heat-detection-apps-ireland-review.md written; standing instruction for end-of-session updates added |

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

## Session 7 — Next Actions (Priority Order)

| # | Action |
|---|--------|
| 1 | Verify Airtable feedback is working — thumb an article, check row in Airtable |
| 2 | Point farmai.ie at Vercel (DNS in Hosting Ireland) |
| 3 | Set up Cloudflare free account in front of Vercel |
| 4 | Add Google Analytics ID to /config/site.json |
| 5 | Polish pass — hero centering, button border, ampersand fix, OfficialAdviceBanner, mobile 375px |
| 6 | Add individual Unsplash images to each article frontmatter |
| 7 | Confirm sitemap.xml and robots.txt are live — create if missing |
| 8 | Draft PR outreach copy + create social accounts — soft launch prep |

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*

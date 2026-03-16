# Clone Checklist — Launching a New FarmAI Vertical

*Use this checklist when launching ConstructionAI.ie, TradeAI.ie, or any new vertical.*
*Estimated time: 3–4 hours setup + 1 session of Claude Code config.*

---

## The 10 Steps

### Step 1 — Register Domain + WHOIS Privacy

- Register the new domain at Hosting Ireland (hostingireland.ie)
- Enable WHOIS privacy at registration — not after, at registration
- Register the .ie and the .com if the .com is available and affordable
- Also register obvious typos if the brand name allows it
- Cost: ~€15–25/year

---

### Step 2 — Create Google Workspace Alias (or New Account)

- If budget allows: new Google Workspace Business Starter account (€6/month) tied to the new domain
- If budget is tight: create a Gmail alias from the existing farmai.ie Google Workspace account
- Set up hello@[newdomain].ie as the primary contact address
- Enable 2FA on the new account immediately

---

### Step 3 — Fork farmai-ireland Repo → Rename

- Go to github.com/FarmAIIreland/farmai-ireland
- Fork → rename to the new vertical slug (e.g. `constructionai-ireland`)
- Clone locally: `git clone [new-repo-url]`
- Rename the working directory locally to match
- Delete the `/content/articles/` and `/content/guides/` content — start fresh
- Keep all `/docs/` template files as starting points — update them in Step 5/6

---

### Step 4 — Update /config/site.json

Update these fields for the new vertical:

```json
{
  "site": {
    "name": "ConstructionAI Ireland",
    "url": "https://constructionai.ie",
    "description": "Plain English AI guides for Irish builders and tradespeople."
  },
  "brand": {
    "primaryColor": "#[NEW_HEX]",
    "secondaryColor": "#[NEW_HEX]"
  },
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX"
  },
  "hero": {
    "line1": "AI for Irish builders.",
    "phrases": ["Save time.", "Cut paperwork.", "Quote faster.", "Work smarter."]
  }
}
```

Do not touch the component files at this stage — the site structure carries over.

---

### Step 5 — Update /docs/brand-personality.md

Rewrite for the new audience:
- New one-line brand truth
- New founding story angle
- New reader personas (4 profiles — same format as FarmAI Ireland)
- New "what we are not" list
- New writing rules specific to the vertical

Keep the structure. Rewrite the content entirely.

---

### Step 6 — Update /docs/content-strategy.md

Rewrite for the new vertical:
- New three editorial lanes
- New primary reader persona
- New 50-topic backlog (organised by pillar)
- New content calendar framework

Keep the structure. Rewrite the content entirely.

---

### Step 7 — Connect Vercel → New Repo → Auto-Deploy

- Log into vercel.com
- New Project → Import Git Repository → select new repo
- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Add all env vars (see /docs/master-context.md for full list — update values for new vertical)
- Deploy → confirm build succeeds
- Note the Vercel preview URL for testing before DNS is pointed

---

### Step 8 — Add Domain DNS in Hosting Ireland → Point to Vercel

- Log into Hosting Ireland → DNS Management for new domain
- Add A record: `@` → `76.76.21.21` (Vercel's IP)
- Add CNAME: `www` → `cname.vercel-dns.com`
- In Vercel → Project → Settings → Domains → Add domain
- SSL provisioned automatically — allow up to 24 hours for propagation
- Confirm at whatsmydns.net before announcing live

---

### Step 9 — Set Up Cloudflare in Front of Vercel

- Create free Cloudflare account (cloudflare.com)
- Add site → enter new domain
- Cloudflare scans existing DNS records — confirm they match what you set in Step 8
- Change nameservers at Hosting Ireland to Cloudflare's nameservers (provided in Cloudflare setup)
- In Cloudflare: SSL/TLS → set to Full (strict)
- In Cloudflare: Speed → Auto Minify → tick JS, CSS, HTML
- In Cloudflare: Caching → Browser Cache TTL → 4 hours
- Done. Cloudflare handles CDN, DDoS protection, and performance from here.

---

### Step 10 — Set Up Airtable, Mailchimp, All Env Vars

**Airtable:**
- Create a new base in Airtable for the new vertical
- Duplicate the FarmAI Ireland base structure (Feedback table + KPI Snapshots table)
- Copy the new Base ID and Table IDs
- Set `AIRTABLE_BASE_ID` and `AIRTABLE_TABLE_ID` in Vercel for the new project

**Mailchimp:**
- Log into Mailchimp → Create Audience → name it after the new vertical
- Get the new audience ID and form action URL
- Update the newsletter subscribe form in the new site
- Set `MAILCHIMP_LIST_ID` in Vercel

**All env vars in Vercel:**
See /docs/master-context.md for the full variable list. Each vertical needs its own values for:
- `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID`, `AIRTABLE_KPI_TABLE_ID`
- `MAILCHIMP_LIST_ID`
- `GOOGLE_SHEETS_ID` (new idea capture sheet)
- `RESEND_FROM_EMAIL` (e.g. `reports@constructionaiireland.ie`)
- `DASHBOARD_PASSWORD`
- `GITHUB_REPO` (e.g. `FarmAIIreland/constructionai-ireland`)
- `GMAIL_*` tokens (new Gmail account for the vertical)

Shared across all verticals (same values):
- `ANTHROPIC_API_KEY`
- `UNSPLASH_ACCESS_KEY`
- `RESEND_API_KEY`
- `GITHUB_TOKEN`
- `VERCEL_API_TOKEN`

---

## Post-Launch Checklist

- [ ] sitemap.xml generating correctly (check /sitemap.xml in browser)
- [ ] robots.txt in place (check /robots.txt)
- [ ] Google Analytics ID active (check GA dashboard for first hits)
- [ ] Airtable feedback working (test with a thumbs up on an article)
- [ ] Mailchimp subscribe working (test with a real email)
- [ ] /dashboard accessible (test password)
- [ ] Vercel Cron jobs scheduled (check vercel.json matches master-context.md)
- [ ] 10+ articles live before press release is sent
- [ ] Social accounts created (see /docs/social-setup.md for template)
- [ ] Press release sent (see /docs/press-release.md for template)

---

*This checklist is maintained by Samac Consulting. Update it if the stack changes.*
*FarmAI Ireland is the reference implementation — if in doubt, check how it's done there.*

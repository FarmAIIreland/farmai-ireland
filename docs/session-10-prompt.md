# FarmAI Ireland — Session 10 Opening Prompt

*Paste everything below this line into Claude Code*

---

For this session: proceed autonomously on all standard development and content tasks. Only stop if something is about to be permanently deleted, a build error blocks progress, or you need a credential.

Read /docs/master-context.md before doing anything else. We are in Session 10.

---

## Priority 1 — Complete outstanding technical items

Work through these in order. Do not skip ahead.

**1. Add new docs to repo**
The following files were created in the chat session and need to be added to /docs:
- Copy farmai-pipeline.html into /docs/farmai-pipeline.html
- Create /docs/future-ideas-monetization.md — content is in the master context brain dump section
- Confirm /docs/email-templates.md exists with all five response templates (Sponsorship, Media, Reader, Partnership, Complaint) written in FarmAI Ireland brand voice from /docs/brand-personality.md
- If email-templates.md does not exist or is incomplete, write it now

**2. Hero banner resize**
The hero is still taking up too much viewport on desktop — articles are below the fold.
- Reduce hero height to max 50vh desktop, 40vh mobile
- Departures board text: increase font size 20–30%
- Content (badge, departures board, buttons) must be vertically centred in the reduced space
- The departures board scrolling logic and copy are intentional — do NOT change them
- Test at 1080p desktop and 375px mobile before committing

**3. Cookie banner**
Still missing. Implement a simple GDPR-compliant cookie banner:
- Appears on first visit only (localStorage flag)
- Two options: Accept / Decline
- On Accept: enable GA4 tracking
- On Decline: GA4 stays inactive
- Matches FarmAI Ireland design tokens (brand green #1D9E75, off-white #F7F5F0)
- Links to /legal/cookies

**4. Verify Session 9 automation**
Check that the following are wired correctly in vercel.json:
- Sunday 8pm cron → /api/content-pipeline
- Monday 8am cron → /api/kpi-report
- Daily 8am cron → /api/email-responder
If any cron is missing or misconfigured, fix it.

**5. Verify env vars are documented**
Check /docs/master-context.md has the full list of env vars needed for Session 9 automation. If any are missing from the list, add them. The actual values live in 1Password and Vercel — just confirm the variable names are documented.

---

## Priority 2 — Soft launch prep

**6. Social account placeholder pages**
Create a /docs/social-setup.md file with:
- The exact handle for each platform (X, Facebook, LinkedIn, YouTube, Instagram)
- The bio copy for each (max 160 chars): "Plain English AI guides for Irish farmers. Independent. Free. farmai.ie"
- Instructions for profile image (FarmAI Ireland logo) and header (Irish farmland)
- A note that TikTok is deferred to Month 6

Do not create the social accounts — that is a manual step. Just document what's needed so the setup takes 20 minutes when the time comes.

**7. Press release draft**
Create /docs/press-release.md with:
- The full press release (under 400 words) from /docs/sponsors-media.md
- The full primary target list with email addresses
- A follow-up email template (send 5 working days after initial if no response)
- A note: send on the day social accounts are live, not before

**8. CLONE.md**
Create CLONE.md in the repo root — the 10-step checklist for launching the next vertical (ConstructionAI.ie, TradeAI.ie etc.):
1. Register domain + WHOIS privacy (Hosting Ireland)
2. Create Google Workspace alias (or new account)
3. Fork farmai-ireland repo → rename to new vertical
4. Update /config/site.json — brand name, colours, domain, pillars, GA ID placeholder
5. Update /docs/brand-personality.md — new audience, new voice, new reader personas
6. Update /docs/content-strategy.md — new topic pillars and 50-topic backlog
7. Connect Vercel → new repo → auto-deploy
8. Add domain DNS in Hosting Ireland → point to Vercel
9. Set up Cloudflare in front of Vercel
10. Set up Airtable base, Mailchimp audience, all env vars in Vercel

**9. Flip repo to GitHub template**
Go to GitHub → farmai-ireland repo → Settings → scroll to "Template repository" → tick the box.
If Claude Code can do this via GitHub API, do it. If not, note it as a manual step for John.

---

## Priority 3 — Content pipeline test

**10. Write one article directly**
Write a new article using the content pipeline — no copy-paste, no file downloading:
- Topic: "How Irish suckler farmers are using AI to cut time on herd register submissions"
- Pillar: livestock
- Difficulty: beginner
- OfficialAdviceBanner: false
- Read /docs/brand-personality.md for voice — farmer-to-farmer, plain English, dry
- Run through quality filter in /docs/content-strategy.md
- Ground claims in ICBF data and Teagasc sources
- Add relevant Unsplash image to frontmatter
- Save to /content/chatgpt-herd-register-icbf.md
- Show preview in terminal
- Wait for approval before committing

---

## End of session — mandatory

Before closing Session 10:
1. Update /docs/master-context.md — mark completed items, add Session 10 to session log, update Session 11 next actions
2. Commit all /docs changes: `git commit -m "docs: update master context after Session 10"`
3. Push to GitHub
4. Confirm Vercel deployment is clean — no build errors

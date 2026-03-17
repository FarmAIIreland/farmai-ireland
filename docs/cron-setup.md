# FarmAI Ireland — Cron Job Setup

Cron scheduling is handled externally via **cron-job.org** (free, unlimited).
Vercel runs the serverless functions — cron-job.org triggers them on schedule.

---

## Setup

1. Go to [cron-job.org](https://cron-job.org) and create a free account
2. Add each job below as a new cron job
3. Set **Request method: GET** for all three
4. For the URL, use the production domain: `https://farmai.ie`

---

## Jobs

### 1. KPI Report — Monday 8am UTC

| Field    | Value |
|----------|-------|
| URL      | `https://farmai.ie/api/kpi-report` |
| Schedule | Every Monday at 08:00 UTC |
| Cron expression | `0 8 * * 1` |

**What it does:** Fetches 6 KPIs, checks for broken links, sends plain-text KPI email via Resend to hello@farmai.ie, saves Airtable snapshot.

---

### 2. Content Pipeline — Sunday 8pm UTC

| Field    | Value |
|----------|-------|
| URL      | `https://farmai.ie/api/content-pipeline` |
| Schedule | Every Sunday at 20:00 UTC |
| Cron expression | `0 20 * * 0` |

**What it does:** Reads Google Sheet ideas + content-strategy.md backlog, generates 3 draft articles via Claude API, commits to `/content/drafts/` via GitHub API, sends preview email.

---

### 3. Email Responder — Daily 8am UTC

| Field    | Value |
|----------|-------|
| URL      | `https://farmai.ie/api/email-responder` |
| Schedule | Every day at 08:00 UTC |
| Cron expression | `0 8 * * *` |

**What it does:** Reads unread Gmail per label (Sponsorship/Media/Reader/Partnership/Complaint), creates draft replies from `/docs/email-templates.md`, marks as read, sends notification email if drafts created.

---

## Notes

- All API routes require no authentication — they are secured by obscurity of the URL and Vercel env vars
- To test any endpoint manually: `curl https://farmai.ie/api/kpi-report`
- If farmai.ie DNS is not live yet, use the Vercel production URL from `npx vercel alias ls`
- The `/api/gmail-setup` route is one-time only — do not add to cron-job.org

---

*FarmAI Ireland · See also: /docs/master-context.md for env var reference*

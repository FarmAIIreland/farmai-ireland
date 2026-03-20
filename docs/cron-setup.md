# FarmAI Ireland — Cron Job Setup

Cron scheduling is handled by **cron-job.org** (free, unlimited).
Vercel runs the functions. cron-job.org triggers them on schedule.

**Status:** All 3 jobs configured and active on cron-job.org (confirmed Session 19).

---

## One-time setup

1. Create a free account at [cron-job.org](https://cron-job.org)
2. Create three cron jobs with the settings below
3. For each job add a custom request header:
   - **Key:** `x-cron-secret`
   - **Value:** copy from `CRON_SECRET` in the Vercel dashboard

### Adding CRON_SECRET to Vercel

In Vercel dashboard → Project → Settings → Environment Variables:
- Add `CRON_SECRET` with any strong random value (e.g. generate with `openssl rand -hex 32`)
- Apply to Production, Preview, and Development environments

---

## Cron jobs

| Job | URL | Schedule | Cron expression |
|-----|-----|----------|-----------------|
| KPI Report | `https://farmai.ie/api/kpi-report` | Every Monday 08:00 UTC | `0 8 * * 1` |
| Content Pipeline | `https://farmai.ie/api/content-pipeline` | Every Sunday 20:00 UTC | `0 20 * * 0` |
| Email Responder | `https://farmai.ie/api/email-responder` | Every day 08:00 UTC | `0 8 * * *` |

---

## Required environment variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `CRON_SECRET` | All endpoints | Auth — must match cron-job.org header |
| `RESEND_API_KEY` | KPI, Content, Email | Sends notification emails |
| `RESEND_FROM_EMAIL` | KPI, Content, Email | e.g. `reports@farmai.ie` |
| `ANTHROPIC_API_KEY` | Content Pipeline | Generates articles and tweets |
| `GITHUB_TOKEN` | Content Pipeline | Commits drafts to GitHub |
| `GMAIL_CLIENT_ID` | Email Responder | Google OAuth |
| `GMAIL_CLIENT_SECRET` | Email Responder | Google OAuth |
| `GMAIL_REFRESH_TOKEN` | Email Responder | Google OAuth |
| `GOOGLE_SHEETS_ID` | Content Pipeline | Reader-submitted topic ideas |
| `VERCEL_API_TOKEN` | KPI Report | Fetches visitor analytics |
| `VERCEL_PROJECT_ID` | KPI Report | Vercel project identifier |
| `MAILCHIMP_API_KEY` | KPI Report | Subscriber + open rate data |
| `MAILCHIMP_LIST_ID` | KPI Report | Mailchimp audience ID |
| `AIRTABLE_API_KEY` | KPI Report | Thumbs-up rate + KPI snapshots |
| `AIRTABLE_BASE_ID` | KPI Report | Airtable base |
| `AIRTABLE_TABLE_ID` | KPI Report | Thumbs-up votes table |
| `AIRTABLE_KPI_TABLE_ID` | KPI Report | Week-on-week KPI snapshots |

---

## Notes

- All times UTC (Dublin = UTC+0 in winter, UTC+1 in summer)
- cron-job.org free tier: unlimited jobs, email alerts on failure
- If `CRON_SECRET` is not set in Vercel, the endpoints return 401
- If farmai.ie is not yet pointed at Vercel, use the stable alias `farmai-ireland.vercel.app` temporarily
- The `/api/gmail-setup` route is one-time only — do not add to cron-job.org

---

*FarmAI Ireland · See also: /docs/master-context.md for full env var reference*

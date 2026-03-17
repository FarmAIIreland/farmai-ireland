# FarmAI Ireland — Cron Job Setup

Cron scheduling is handled by **cron-job.org** (free, unlimited).
Vercel runs the functions. cron-job.org triggers them on schedule.

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

## Notes

- All times UTC
- cron-job.org free tier: unlimited jobs, email alerts on failure
- If `CRON_SECRET` is not set in Vercel, the endpoints are open (safe for manual testing) — set it before going live
- If farmai.ie domain is not yet pointed at Vercel, use the stable alias `farmai-ireland.vercel.app` temporarily
- The `/api/gmail-setup` route is one-time only — do not add to cron-job.org

---

*FarmAI Ireland · See also: /docs/master-context.md for full env var reference*

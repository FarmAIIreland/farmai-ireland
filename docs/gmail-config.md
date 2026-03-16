# Gmail Automation Config

> Edit this file to change monitored labels, routing keywords, and notification settings.
> Changes take effect automatically on the next Vercel deploy (triggered by a git push).

---

## Monitored Labels

Labels read by the daily email-responder cron, in priority order.
The email responder creates a draft reply for each unread message in these labels.

- Sponsorship
- Media
- Partnership
- Complaint
- Reader

---

## Filter Keywords

Each section lists comma-separated keywords for that label.
Gmail filter matches case-insensitively in Subject and Body.
Matched emails are labelled automatically. Reader is catch-all (no keywords).

Run `/api/gmail-setup` once to create these labels and filters in Gmail.

### Sponsorship
sponsor, advertis, media pack, rate card, pricing, commerc, monetis, brand partner

### Media
journalist, press, interview, article about, feature, reporter, publication, coverage, podcast

### Partnership
partner, collaborat, work together, joint venture, affiliate, cross-promot, referral

### Complaint
wrong, correction, mistake, disagree, inaccurate, misleading, incorrect, complaint, error

### Reader
(catch-all — all other emails from new senders not matched above)

---

## Notification

Draft-ready notification sent to:
hello@farmai.ie

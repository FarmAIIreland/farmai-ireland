# FarmAI Ireland — Claude Code Build Brief (v3)
*Updated March 2026 — use this version, discard v1 and v2*

---

## Project Overview

Build a polished, fast, mobile-first content website for FarmAI Ireland — an independent Irish platform that aggregates, translates, and explains AI developments for Irish farmers in plain English.

**Editorial position**: Curator and translator, not authority. Every guide is grounded in cited public sources (Teagasc, gov.ie, ICBF, Bord Bia, Met Éireann). The site must feel like a modern media brand — clean, credible, and easy to navigate for users who may not be tech-savvy or on fast mobile connections in rural Ireland.

**Brand positioning**: "AI is moving faster than anyone can track. FarmAI Ireland reads everything, filters the noise, and explains what matters for your farm — in plain English. No jargon. No hype. Just useful."

**Editorial lanes** (what makes this different from mainstream farming media):
- "Can AI help me with this?" — practical tool guides
- "What's changing that I need to know about?" — policy and tech, translated
- "Is this worth my time and money?" — honest cost-benefit, Irish context

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Deployment**: Vercel (Pro plan)
- **Styling**: Tailwind CSS
- **Content**: Markdown files with frontmatter (in /content folder — provided)
- **Markdown parsing**: gray-matter + next-mdx-remote or remark
- **Newsletter**: Mailchimp embed (free tier)
- **Analytics**: Vercel Analytics + Google Analytics (ID: G-XXXXXXXXXX — update when live)
- **Feedback**: Airtable (free tier) via API — article thumbs up/down
- **No database required at launch**

---

## Design Tokens

**Primary green**: #1D9E75 — main brand colour, CTAs, links, active states, tags
**Dark green**: #085041 — newsletter strip, footer, heavy backgrounds
**Warm off-white**: #F7F5F0 — page background (not pure white — easier on the eye)
**Near black**: #1A1A1A — body text (not pure black — reduces eye strain on mobile)
**Amber**: #E8A020 — used sparingly for badges, pull quotes, hover accents
**Muted**: #6B7280 — meta text, dates, read times
**Border**: #E5E7EB — card borders, dividers

**Typography**: Inter via next/font/google. Headings weight 600, body weight 400, line-height 1.75, max reading width 700px. Never below 16px body text on mobile.

**Spacing**: Section padding 80px desktop / 48px mobile. Container max-width 1200px. Card grid gap 24px.

**Corners**: border-radius 12px on cards, 6px on buttons and badges.

**Mobile first**: Design for 375px width upward. Every component must be tested at 375px before moving on.

---

## Folder Structure

```
farmai-ireland/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── read/
│   │   ├── page.tsx                # All articles listing
│   │   └── [slug]/page.tsx         # Individual article
│   ├── guides/
│   │   ├── page.tsx                # All guides listing
│   │   └── [slug]/page.tsx         # Individual guide
│   ├── tools/page.tsx              # Tools page (placeholder at launch)
│   ├── about/page.tsx              # About page
│   ├── contact/page.tsx            # Contact / Ask FarmAI
│   ├── sources/page.tsx            # Our sources page
│   └── legal/
│       ├── privacy/page.tsx
│       ├── terms/page.tsx
│       ├── cookies/page.tsx
│       └── disclaimer/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── NewsletterStrip.tsx         # Dark green strip, FarmAI Monthly
│   ├── ArticleCard.tsx
│   ├── TopicPillars.tsx
│   ├── FAQStrip.tsx
│   ├── CookieBanner.tsx
│   ├── ArticleFeedback.tsx
│   ├── SourcesFootnote.tsx
│   ├── OfficialAdviceBanner.tsx
│   └── AdSlot.tsx
├── content/                        # PROVIDED — do not recreate
│   ├── guides/
│   ├── pages/
│   └── legal/
├── config/
│   └── site.json                   # PROVIDED — use for all global config
├── public/
│   ├── llms.txt                    # PROVIDED
│   ├── robots.txt                  # Generate
│   └── sitemap.xml                 # Auto-generate via next-sitemap
└── lib/
    ├── getContent.ts
    ├── getSiteConfig.ts
    ├── airtable.ts
    └── seo.ts
```

---

## Navigation

**Desktop nav**: Logo left · Home · Read · Guides · Tools · About · [Get Started button — green, right aligned]

**Mobile nav**: Hamburger menu. Same links stacked vertically. Get Started button full width at bottom of menu.

**Footer — three columns**:
- Column 1 — Quick links: Read, Guides, Tools, About, Our Sources
- Column 2 — Legal: Privacy Policy, Terms of Use, Cookie Policy, Disclaimer
- Column 3 — Connect: FarmAI Monthly email signup (inline input + button), YouTube, social links

Footer bottom bar: "© 2026 FarmAI Ireland. Independent. Not affiliated with Teagasc or any government body." | Cookie Settings

---

## Page Specifications

### Homepage (/)

Sections in order — top to bottom:

**1. Nav bar**
Logo + nav links + Get Started CTA button.

**2. Hero section**
Full-width. Autoplaying muted looping video of Irish farmland (`/video/hero.mp4`), poster image fallback. Dark gradient overlay. Centred content over video:
- Small badge above headline: "Built for Irish farmers"
- H1: "AI knowledge that actually makes sense on the farm"
- Subheadline: "Plain English guides, practical tools, and honest advice — helping Irish farmers get to grips with AI without the hype."
- Two buttons: [Browse articles — primary green] [Start here if you're new — secondary outline]
- On mobile: use poster image, no video autoplay

**3. Newsletter strip**
Background: #085041 (dark green). Full width.
- Eyebrow text (small caps): "FarmAI Monthly"
- Headline: "Join Irish farmers staying one step ahead"
- Subheadline: "Real AI advice for Irish farms, delivered once a month — straight from the field"
- Inline form: email input + "Sign me up" button (green)
- Below form: "No spam. Unsubscribe any time. One email a month, that's it."
- Mailchimp embed for form submission

**4. Latest articles**
- Section heading: "Latest articles"
- Section subheading: "What's working on farms right now"
- 3 most recent articles as ArticleCard grid (3 cols desktop, 1 col mobile)

**5. Browse by topic**
- Section heading: "Browse by topic"
- Section subheading: "Find what's relevant to your type of farming"
- 3 topic tiles: Dairy · Beef & Sheep · Tillage (read from site.json pillars)
- Each tile: tag badge, title, short description, arrow link

**6. Footer**

---

### Read listing (/read)

- Page heading: "All articles"
- Subheading: "Practical, plain-English AI knowledge for Irish farmers"
- Filter tabs: All · Livestock health · Dairy · Beef & Sheep · Grants · Getting started
- ArticleCard grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Sort: newest first
- Muted note above grid: "All articles draw from publicly available information from Teagasc, gov.ie, ICBF, and other trusted Irish agricultural bodies. Sources cited in every article."

---

### Individual article (/read/[slug])

Layout: main content column (65%) + sidebar (35%) on desktop. Single column on mobile.

**Main column**:
- Breadcrumb: Home › Read › [Article title]
- Hero image (full width of column)
- Tag badge + date + read time
- H1 title
- OfficialAdviceBanner (if article touches grants, livestock health, or compliance)
- Article body (markdown rendered)
- YouTube embed (if youtubeEmbed field populated in frontmatter)
- SourcesFootnote
- ArticleFeedback

**Sidebar**:
- Ad slot placeholder (inactive at launch, labelled "Advertisement")
- Related articles (2, same pillar)
- Browse by topic links

Schema: Article JSON-LD with author "FarmAI Ireland"

---

### Guides (/guides)

Same layout as /read but filtered to guides only. Guides are longer, more structured how-to content vs shorter articles.

---

### Individual guide (/guides/[slug])

Same layout as individual article. OfficialAdviceBanner appears on all guides — no exceptions.

---

### Tools (/tools)

Placeholder page at launch. Heading: "AI Tools for Irish Farmers — Coming Soon". Subtext: "We're building a directory of the best AI tools for Irish farming — tested, reviewed, and explained plainly. Sign up to FarmAI Monthly to be the first to know when it launches." Newsletter signup form embedded.

---

### Contact (/contact)

- Heading: "Ask FarmAI a Question"
- Subtext: "Every question gets read. We use them to decide what to write about next. If something's wrong in a guide, tell us here too."
- Form: name (optional), email (optional), question (required textarea), submit
- On submit: POST to /api/contact, send to hello@farmai.ie via Resend (free tier)
- After submit: "Thanks — we read every question. We'll use this to shape our next guides."
- Honeypot field: hidden input `name="website"` — if populated, discard silently (spam protection)

---

### Sources (/sources)

Credibility-building page. Sections: Irish Government & Agencies · Farming Bodies · Research & Data · Weather & Environment. Each entry: source name, URL, one-line description of what FarmAI Ireland uses it for. Linked in footer. Signals editorial rigour. Good for SEO trust signals.

---

### About (/about)

- Heading: "About FarmAI Ireland"
- Body: "FarmAI Ireland exists because AI is changing farming faster than anyone can track — and nobody was explaining it clearly for Irish farmers. We're not Teagasc. We're not the Department of Agriculture. We're an independent platform that reads everything out there and translates it into plain English. Every guide we publish is grounded in publicly available information from Teagasc, gov.ie, ICBF, and other trusted Irish agricultural bodies. We cite our sources in every article. We are not affiliated with any government body, co-op, or agri-business. We don't sell anything. We don't tell you what to buy. Our job is to make sure you have the information you need to make your own decisions."
- Mission: "Plain English. Cited sources. Always free."
- Contact: hello@farmai.ie
- Links to /sources and legal pages

---

### Legal pages (/legal/*)

Read from /content/legal/. Clean reading layout, max-width 700px, show last updated date from frontmatter.

---

## Component Specifications

### OfficialAdviceBanner
- Renders on every guide page and any article touching grants, livestock health, or compliance
- Subtle left-border style — green, warm and helpful, not a scary red warning
- Copy: "This guide is a starting point. For decisions about grants, animal health, or significant farm investments, always check with your Teagasc advisor or relevant authority."
- Link to teagasc.ie/contact opens in new tab
- Read copy from site.json so it can be updated globally

### NewsletterStrip
- Full-width dark green (#085041) strip
- Used on homepage between hero and articles
- Also used on Tools placeholder page
- Eyebrow: "FarmAI Monthly" in small, spaced caps, colour #5DCAA5
- Headline white, subheadline #9FE1CB
- Email input dark green with light placeholder text
- Submit button #1D9E75

### ArticleFeedback
- Bottom of every article and guide, after SourcesFootnote
- Two elements side by side (stacked on mobile):
  - "Was this helpful?" — thumbs up / thumbs down. On click: log to Airtable via /api/feedback (slug, vote, timestamp). Show "Thanks for the feedback" after click. No login required.
  - "Something wrong or missing?" — mailto link to hello@farmai.ie with subject pre-filled: "Feedback: [article title]"
- Light grey background, subtle border, not prominent

### SourcesFootnote
- Reads sources array from frontmatter
- Renders as bordered block: "Sources used in this article" + linked citations
- If sources array empty, renders nothing

### AdSlot
```tsx
export function AdSlot({ position }: { position: string }) {
  if (!siteConfig.ads.enabled) return null;
  return <div data-ad-slot={position} className="ad-slot min-h-[90px] bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">Advertisement</div>;
}
```
Inactive at launch. Placements: article sidebar, between articles on listing pages.

---

## Content Frontmatter Schema

```yaml
---
title: ""
slug: ""
pillar: grants-subsidies | livestock | dairy | beef-sheep | tillage | getting-started
date: YYYY-MM-DD
readTime: 5
difficulty: beginner | intermediate | advanced
seo:
  title: ""
  description: ""
  keywords: []
youtubeEmbed: ""
featured: false
officialAdviceBanner: true
sources:
  - label: ""
    url: ""
    description: ""
---
```

---

## SEO Requirements

Every page:
- `<title>` from frontmatter using titleTemplate from site.json
- `<meta name="description">` from frontmatter
- Open Graph tags: og:title, og:description, og:image, og:url
- Twitter card: summary_large_image
- `<link rel="canonical">`
- `lang="en-IE"` on `<html>`

Homepage: FAQPage JSON-LD
Article/guide pages: Article JSON-LD, author "FarmAI Ireland"
Site-wide: Organization JSON-LD from site.json

`public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://farmai.ie/sitemap.xml
```

Install next-sitemap — auto-generate sitemap including all article and guide slugs.

Add `public/llms.txt` — already provided in repo.

---

## Security Requirements

- Honeypot on contact form (hidden field, silently discard if populated)
- Security headers in next.config.js:
  - Content-Security-Policy
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
- No personal names anywhere in codebase, templates, or pages
- Git config before first commit:
  - `git config user.name "FarmAI Ireland"`
  - `git config user.email "hello@farmai.ie"`

---

## Performance Requirements

Target Lighthouse mobile score: 90+

- Hero video: poster image default on mobile, autoplay only on desktop
- All images: Next.js `<Image>` component throughout
- Fonts: Inter via next/font/google — no render blocking
- No external scripts at launch except Mailchimp and Vercel Analytics
- Test on simulated 4G in Chrome DevTools before marking complete

---

## Privacy & Anonymity

- No author names anywhere in codebase or pages
- Contact is hello@farmai.ie only — no personal details anywhere
- Git commits use brand identity only (see Security Requirements above)
- No personal social profiles linked — brand accounts only

---

## Launch Checklist

- [ ] Homepage renders correctly with all six sections
- [ ] Newsletter strip appears between hero and articles on homepage
- [ ] Nav: Home · Read · Guides · Tools · About + Get Started button
- [ ] All articles render at /read/[slug]
- [ ] All guides render at /guides/[slug]
- [ ] OfficialAdviceBanner appears on all guides
- [ ] SourcesFootnote renders when sources present
- [ ] ArticleFeedback connects to Airtable via /api/feedback
- [ ] All 4 legal pages render correctly
- [ ] /sources page live
- [ ] /tools placeholder page live with newsletter signup
- [ ] Contact form sends to hello@farmai.ie via Resend
- [ ] Honeypot on contact form
- [ ] Security headers configured in next.config.js
- [ ] Homepage FAQ has FAQPage JSON-LD
- [ ] Article pages have Article JSON-LD
- [ ] sitemap.xml includes all article and guide URLs
- [ ] llms.txt accessible at /llms.txt
- [ ] robots.txt accessible at /robots.txt
- [ ] AdSlot renders as placeholder only (not live)
- [ ] Mailchimp connected to newsletter form
- [ ] Cookie banner on first visit
- [ ] Git commits show "FarmAI Ireland" as author
- [ ] Hero video poster image on mobile, no autoplay
- [ ] Lighthouse mobile 90+ before go-live
- [ ] Fully responsive at 375px
- [ ] No console errors on any page
- [ ] Deployed and live on farmai.ie

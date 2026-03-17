# FarmAI Ireland — Future Ideas, Monetization & Growth

*March 2026 · Brain dump — review and prioritise quarterly*

---

## Monetization Roadmap

### Phase 1 — Month 3 (first revenue)

Sponsorship is the priority. One deal at €400–800/month covers all costs and puts the operation in profit. Approach Tier 1 sponsors only once you have 3 months of traffic data and 200+ subscribers.

Do not approach sponsors before you have data. "200 engaged Irish farmers reading every guide" beats "we just launched" every time.

See /docs/sponsors-media.md for full target list, rate card, and outreach strategy.

### Phase 2 — Month 6 (passive revenue)

**Display advertising**
- Platform: Google AdSense
- Placement: Article sidebar, between articles on listing pages (AdSlot component already built)
- Timing: Not before Month 6 — ads on a new site look cheap and damage trust with the exact audience you're building
- Revenue expectation: Irish farming audience CPM likely €3–8. At 10,000 monthly page views = €30–80/month. Not material until traffic scales.
- Rule: Never let ads appear above the fold or interrupt article reading flow

**YouTube Partner Programme**
- Requires: 1,000 subscribers + 4,000 watch hours in 12 months
- Realistic timeline: Month 6 with 2 videos/week from Month 3
- Revenue: €2–5 per 1,000 views (Irish audience, niche content). At 50,000 views/month = €100–250/month
- Not a primary revenue stream — YouTube's value is audience growth and brand credibility, not direct revenue

### Phase 3 — Year 2 (scale)

**Licensing the playbook**
- The FarmAI Ireland build — Next.js template, content pipeline, automation suite — is a valuable asset
- Potential licensees: agricultural co-ops wanting their own content platform, industry bodies, international equivalents (FarmAI UK, FarmAI Australia)
- Price point: €5,000–15,000 setup fee + monthly support retainer
- This is a Samac Consulting revenue stream, not FarmAI Ireland

**Site acquisition**
- Content sites with engaged audiences sell at 30–40× monthly revenue
- At €800/month revenue by Month 12 → site value €24,000–32,000
- At €2,000/month revenue by Month 18 → site value €60,000–80,000
- Build it right and it's a saleable asset, not just a hobby project

**Consulting (via Samac)**
- "We built and operate Ireland's leading AI farming platform" is a powerful consulting credential
- Target clients: agri-businesses wanting AI content strategy, co-ops wanting farmer digital engagement programmes, government bodies wanting plain-English AI communication
- Rate: €500–1,500/day consulting

---

## Video Creation — Full Process

### The Pipeline (Month 3+)

Every published article becomes a video automatically. The process:

**Step 1 — Script**
Article markdown is already the script. Claude reformats it for speaking — shorter sentences, conversational transitions, removes hyperlinks. Output: clean script file.

**Step 2 — Voiceover**
ElevenLabs generates Irish-accented AI voiceover from script. Voice character to be developed — warm, dry, approachable. Not a tech bro. Not a Silicon Valley AI voice. Think: someone who moved to rural Ireland and genuinely cares.

Cost: ~€0.30 per 1,000 characters. A 700-word article = ~4,200 characters = ~€1.26 per video.

**Step 3 — Video assembly**
Pictory takes the script + voiceover and assembles video automatically:
- Matches stock footage to script keywords
- Adds captions automatically
- Applies FarmAI Ireland template (brand colours, logo, end card)

Stock footage sources:
- Pexels (free, high quality Irish farm footage available)
- Pixabay (free)
- Storyblocks (€149/year unlimited — worth it at Month 6+)

**Step 4 — Thumbnail**
Canva template — consistent style, article title in large text, FarmAI Ireland branding. Takes 3 minutes.

**Step 5 — Upload**
YouTube upload with:
- SEO-optimised title (same as article but phrased for YouTube search)
- Description: first 3 paragraphs of article + link to farmai.ie article
- Tags: Irish farming, AI, specific topic keywords
- End screen: subscribe + link to related video
- Cards: link to farmai.ie at 30 seconds

Target: 2 videos/week. Time per video once pipeline established: ~20 minutes.

### Animated Content (the premium option)

For flagship content — scheme explainers, tool reviews, "Does This Actually Work?" series — simple 2D animation is more memorable than stock footage.

**Tools to evaluate:**
- **Doodly** — whiteboard-style animation, approachable feel, €20/month
- **Vyond** — character-based animation, more polished, €49/month
- **Adobe Express** — template-based, integrates with Adobe ecosystem
- **Canva Pro** — animated presentations exported as video, lowest cost

**Style direction:**
- Simple flat Irish farm illustrations
- Warm colour palette matching site (#1D9E75 green, #E8A020 amber, #F7F5F0 off-white)
- Character: a generic Irish farmer silhouette — not named, not AI avatar
- Not: Generic corporate animation. Not: AI avatar talking head. Not: AI slop stock footage montage.

**Use animated content for:**
- "Does This Actually Work?" series (trust-critical, needs premium feel)
- Grant scheme explainers (ACRES, BISS, TAMS) — complex topics benefit from animation
- Any content that will be used for paid promotion

### TikTok Strategy

**The case for TikTok:**
- Farmers are on TikTok — #FarmTok has billions of views globally
- Short-form content (30–60 seconds) works for simple tips and tool demos
- Irish farming TikTok community is small but growing — early mover advantage
- Algorithm rewards consistency — 3 posts/week is sufficient to grow

**The case against (for now):**
- Audience skews younger than our primary reader (Eoin, 47)
- Content format (vertical, fast-paced) doesn't suit nuanced AI explanations
- Regulatory uncertainty around TikTok in EU markets
- Bandwidth risk — spreads content operation too thin before core platform is stable

**Verdict:** Revisit at Month 6 once YouTube is established. If pursuing TikTok, repurpose YouTube Shorts (vertical crop of existing videos) rather than creating native TikTok content. No additional production cost.

**If TikTok — content that works:**
- "One AI tip for farmers in 30 seconds"
- Tool demos — show the screen, show the result
- "Would Eoin use this?" — quick verdict format
- Behind the scenes of building FarmAI Ireland (the meta-story)

---

## Soft Launch Plan

### Sequencing (do not skip steps)

1. ✅ farmai.ie live on own domain
2. ✅ 12 articles published
3. ✅ Airtable feedback working
4. ✅ Cloudflare in front of Vercel
5. ⏳ Hero banner resize and polish complete
6. ⏳ Cookie banner live
7. ⏳ Social accounts created (after domain confirmed live)
8. ⏳ Press release sent
9. ⏳ Soft launch outreach begins

### Social Account Setup

Create these in order. All use FarmAI Ireland branding — no personal names.

| Platform | Handle | Priority | Why |
|----------|--------|----------|-----|
| X (Twitter) | @FarmAIIreland | High | Agri journalists and advisors are here |
| Facebook Page | FarmAI Ireland | High | Farmers 35–60 are on Facebook, not Instagram |
| LinkedIn | FarmAI Ireland | Medium | For B2B — co-ops, sponsors, media |
| YouTube | FarmAI Ireland | Medium | Needed for Month 3 video launch |
| Instagram | @farmai.ireland | Low | Secondary — repurpose content |
| TikTok | @farmaiiireland | Defer | Revisit Month 6 |

**Profile setup rules:**
- Bio: "Plain English AI guides for Irish farmers. Independent. Free. farmai.ie"
- Profile image: FarmAI Ireland logo (green F badge)
- Header/banner: Irish farmland image matching site aesthetic
- Link: farmai.ie in every bio
- No personal names anywhere

### Press Release — Send on Launch Day

Target list in /docs/sponsors-media.md. Send to primary targets first.

**Email subject:** New Irish platform helps farmers cut through AI noise — in plain English, for free

**Body (under 400 words):**

AI is changing farming faster than most farmers have time to track. FarmAI Ireland is a new independent platform giving Irish farmers practical, plain-English guides to the AI tools that actually matter on the farm — from BISS applications to cattle health monitoring.

Every guide is free. Every guide cites public sources. Every guide links to official Teagasc advice where relevant.

The platform launches with 12 guides covering grants, livestock management, and getting started with AI tools — with two new guides published every week.

Quote: "AI is moving at a pace nobody can keep up with. FarmAI Ireland reads everything and tells you what matters for your farm — in five minutes or less."

farmai.ie

**Follow-up:** If no response in 5 working days, one follow-up email only. No phone calls at this stage.

### Grassroots Outreach

**Irish farming Facebook groups — post the guide that answers a question already being asked:**
- Beef Farmers of Ireland
- Irish Farmers
- County-level groups (Wexford Farmers, Roscommon Farming etc.)

Rule: Don't post "check out our new website." Find a thread where someone is asking about ACRES paperwork, AI tools, heat detection — post the relevant guide as a genuine answer. No promotional language.

**WhatsApp — identify 3–5 connectors:**
Farmers or advisors who are active in farming WhatsApp groups. Share the most relevant guide directly — "thought you might find this useful, no pressure." One guide, one person, personal message.

**Agri Twitter/X:**
Share each new article with a one-line hook. Tag Teagasc if the article cites them. Don't beg for retweets. Consistency over time beats one viral moment.

---

## The Meta-Story (PR angle — use when ready)

When media asks, the honest answer is the interesting one:

FarmAI Ireland is a platform about AI, built using AI, explaining AI to farmers. The founder isn't a farmer. The content is written by AI, reviewed by AI personas (Síle, Declan, Aoife, Pádraic), published by AI automation, and promoted by AI-generated social posts. The human role is strategy, quality control, and approving content before it goes live.

This is the story. It's not a weakness — it's the point. If AI can build a trusted, editorially rigorous, genuinely useful media platform for Irish farmers, that's exactly what FarmAI Ireland is proving.

The journalist angle: "Irish founder builds entire farming media platform using AI — and farmers love it."

Save this story for Month 3 when there's audience data to back it up.

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*
*Review quarterly — update when strategy shifts*

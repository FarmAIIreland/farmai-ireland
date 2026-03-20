# FarmAI Ireland — YouTube Brand Rules & Video Pipeline

*Created March 2026 · Reference for all video production*

---

## Purpose

Turn every FarmAI Ireland article and guide into a 60–90 second YouTube video. Same editorial voice, same visual identity, fully automated from the existing content pipeline. No manual video editing. No stock footage. No AI avatar in v1.

---

## Visual Identity — Carry from Site

Every frame must feel like a moving version of the article cards on farmai.ie. The Economist-style editorial look — geometric patterns, bold colour blocks, monospace labels — is the brand. Do not introduce stock photos, gradients to nowhere, or generic "tech" imagery.

### Colour System (per pillar — identical to PillarIllustration.tsx)

| Pillar | Background | Accent | Accent Light | Tag Label |
|--------|-----------|--------|-------------|-----------|
| save-time | `#0B4D3B` | `#1D9E75` | `#2CC98F` | TIME SAVER |
| tools-explained | `#0A3D5C` | `#1D9E75` | `#4DB89A` | TOOLS EXPLAINED |
| whats-changing | `#1A3A2F` | `#1D9E75` | `#5EC4A0` | WHAT'S CHANGING |
| does-this-work | `#4A1515` | `#E24B4A` | `#F07070` | HONEST REVIEW |

### Typography

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Title text | Georgia / serif | 600 | Same as OG image + site headings |
| Labels & tags | Monospace | 700 | Uppercase, letter-spacing 0.15em |
| Body text on cards | Georgia / serif | 400 | Max 20 words per card |
| Source citations | Monospace | 400 | Smaller, reduced opacity |

### Frame Elements

- **Top accent bar**: 6px solid line in pillar accent colour — present on every frame
- **Green F logo badge**: Bottom-left corner, always visible (matches article cards)
- **"farmai.ie" watermark**: Bottom-right, monospace, 50% opacity
- **Pillar tag**: Top-left, monospace, uppercase — appears on title card and persists as small overlay
- **Background patterns**: Same geometric SVG patterns from PillarIllustration — diagonal speed lines (save-time), circuit grid (tools-explained), wave lines (whats-changing), crosshairs (does-this-work)

### What Never Appears in a Video

- Stock photos or stock video footage
- Faces (no AI avatars, no presenter in v1)
- Animated text effects (no fly-ins, bounces, zooms)
- Background music (clean voice-over only — reassess at 1,000 subs)
- Logos of tools being reviewed (unless showing a genuine screenshot)
- Anything that makes it look like a tech startup pitch deck

---

## Video Structure — The 5-Card Format

Every video follows the same structure. No exceptions. Consistency is the brand.

### Card 1: Title Card (8 seconds)

- Full pillar background colour
- Geometric pattern (matching pillar)
- Pillar tag label top-left
- Article title centred, large serif font
- "farmai.ie" bottom-right
- Green F badge bottom-left
- Voice-over: reads the title + one-sentence hook

### Card 2–5: Key Point Cards (10–15 seconds each)

- Each card = one key takeaway from the article
- Layout: pillar background, accent bar top, large text statement centred
- Max 20 words on screen at once — if longer, split across two cards
- Source citation appears below the statement when citing Teagasc/gov.ie/ICBF (monospace, smaller, reduced opacity)
- Voice-over: expands on the on-screen text (not just reading it aloud)
- Subtle transition between cards: simple crossfade, 0.3s — nothing flashy

### Card 6: Outro Card (8 seconds)

- Pillar background
- "Read the full guide at farmai.ie" — centred, serif
- Article URL below in monospace
- "Subscribe" call-to-action
- Green F badge centred, larger than usual
- Voice-over: "Full guide on farmai.ie. Subscribe for more plain English AI guides for Irish farmers."

### Total Duration Target

- 60–90 seconds per video
- Never exceed 120 seconds
- If the article can't be compressed to 5 key points in 90 seconds, it's two videos or we cut harder

---

## Voice-Over Rules

### Tone

Matches brand-personality.md exactly:
- Second person: "you", "your farm", "your herd"
- Plain English — no jargon without immediate explanation
- Dry, grounded, not over-produced
- Active voice always
- Max 25 words per sentence

### Script Generation

The Claude API generates the voice-over script from the article. The prompt must enforce:
1. Open with what the farmer saves (time, money, or headache) — the Core Filter
2. 5 key points, each 2–3 sentences
3. Every claim attributed to a source ("according to Teagasc", "ICBF data shows")
4. Close with one clear action
5. Total word count: 150–220 words (maps to 60–90 seconds at natural pace)

### What the Voice Never Says

Same as brand-personality.md writing rules:
- "Leverage" anything
- "Game-changing" or "revolutionary"
- "In today's fast-paced world"
- "AI is transforming the agricultural sector"
- Any sentence that could have been written by anyone, about anything, anywhere
- "Don't forget to like and subscribe" — never. The CTA is "Full guide on farmai.ie."

### Voice Selection

- ElevenLabs free tier (10,000 chars/month — roughly 8–10 videos)
- Voice: male, neutral Irish/British accent, conversational pace — not a radio presenter
- If ElevenLabs free tier runs out mid-month: Google Cloud TTS (free tier: 1M chars/month, less natural but reliable)
- Fallback: no voice-over, text-only cards with ambient silence (still works as a short)

---

## Thumbnail Rules

Use the OG image from `/api/og` directly. It's already 1200x630 — close to YouTube's 1280x720.

Adjustments for YouTube:
- Crop/pad to 1280x720 (add 45px top/bottom of pillar bg colour)
- Ensure title text is readable at 168x94px (YouTube mobile thumbnail size)
- No additional text overlays — the OG image already has title, pillar tag, and brand mark
- If OG endpoint is still broken: use PillarIllustration-style static images, one per pillar, generated once

---

## YouTube Channel Settings

### Channel Name
FarmAI Ireland

### Channel Description
Plain English AI guides for Irish farmers. New videos weekly. Independent. Free. All guides also at farmai.ie

### Channel Keywords
AI for farmers, Irish farming technology, farm tech Ireland, precision farming, ChatGPT farming, smart farming Ireland, Teagasc AI, farm grants Ireland

### Default Upload Settings

| Field | Value |
|-------|-------|
| Category | Education |
| Language | English (Ireland) |
| Visibility | Public |
| License | Standard YouTube License |
| Comments | Hold for review (prevent spam) |
| Made for kids | No |

### Video Title Format
Same as article title — value-first. Examples:
- "Cut Your ACRES Paperwork in Half With One Free Tool"
- "3 Free AI Apps That Actually Work at Calving"

### Video Description Template
```
{First 2 sentences of article excerpt}

Read the full guide: https://farmai.ie/{type}/{slug}

Subscribe to the newsletter for weekly AI guides: https://farmai.ie/#newsletter

---

FarmAI Ireland — practical AI knowledge, built for Irish farming.
Independent. Free. No affiliate deals.

Sources cited in this video:
{bullet list of sources from article frontmatter}
```

### Tags
Pull directly from article `seo.keywords` array + add: "FarmAI Ireland", "AI farming Ireland", "Irish farming"

### Playlists (auto-assign by pillar)

| Playlist | Pillar | Description |
|----------|--------|-------------|
| Time Savers | save-time | Practical AI guides that save you hours on farm admin |
| Tools Explained | tools-explained | Plain English breakdowns of AI tools for farming |
| What's Changing | whats-changing | Policy, tech, and market shifts translated for Irish farms |
| Does This Actually Work? | does-this-work | Honest reviews — no affiliate deals, no sponsored content |

---

## Automation Pipeline — Technical Spec

### Trigger
Runs as part of the Sunday content-pipeline cron, or on-demand via `/api/video-pipeline`.

### Steps

```
1. READ article .md from /content/articles/ or /content/guides/
2. EXTRACT via Claude API:
   - voiceOverScript: string (150–220 words)
   - keyPoints: string[] (5 items, max 20 words each)
   - sourceCitations: string[] (sources mentioned in script)
3. GENERATE audio via ElevenLabs API (or Google TTS fallback)
   - Input: voiceOverScript
   - Output: .mp3 file
4. RENDER video via Remotion
   - Template: pillar-video-template
   - Props: { title, pillar, keyPoints, sourceCitations, audioDuration }
   - Output: .mp4 file (1920x1080, H.264)
5. GENERATE thumbnail
   - Fetch from /api/og?title=...&pillar=...&readTime=...
   - Pad to 1280x720
6. UPLOAD via YouTube Data API v3
   - Title, description (from template), tags, playlist, thumbnail
7. LOG to /docs/youtube-queue.md
   - Date, article slug, YouTube URL, duration, status
```

### Dependencies to Install (Week 2)

```json
{
  "@remotion/cli": "latest",
  "@remotion/renderer": "latest",
  "remotion": "latest",
  "elevenlabs": "latest"
}
```

### Environment Variables Needed (add to Vercel when ready)

| Variable | Purpose |
|----------|---------|
| `ELEVENLABS_API_KEY` | Text-to-speech voice generation |
| `ELEVENLABS_VOICE_ID` | Selected voice for narration |
| `YOUTUBE_CLIENT_ID` | YouTube Data API v3 OAuth |
| `YOUTUBE_CLIENT_SECRET` | YouTube Data API v3 OAuth |
| `YOUTUBE_REFRESH_TOKEN` | Long-lived token for uploads |

---

## 30-Day Prep Plan

### Week 1 (March 20–26)
- [ ] Pick one article, manually write the 60-second script
- [ ] Read it aloud, time it — should be 60–90 seconds
- [ ] Adjust script generation prompt until the output sounds natural spoken aloud
- [ ] Sign up for ElevenLabs free tier, test one voice-over generation

### Week 2 (March 27 – April 2)
- [ ] Install Remotion in the repo
- [ ] Build the pillar-video-template component (React/JSX — reuse PillarIllustration patterns)
- [ ] Render one test video locally — title card + 3 key point cards + outro
- [ ] Verify colours, fonts, timing match the site

### Week 3 (April 3–9)
- [ ] Wire ElevenLabs API into the pipeline
- [ ] Combine voice-over audio with Remotion render
- [ ] Render 3 test videos from existing articles (one per pillar)
- [ ] Review: do they feel like FarmAI Ireland, or do they feel generic?

### Week 4 (April 10–16)
- [ ] Build the full automation script (Claude extraction → TTS → Remotion → MP4)
- [ ] Create YouTube channel (should be unlocked by now)
- [ ] Set up channel with settings from this doc
- [ ] Upload 3 test videos manually to verify quality
- [ ] If good: wire YouTube Data API for automated uploads

---

## Quality Gate

Before any video goes live, it must pass these checks (mirrors content-review-prompt.md):

| Check | Pass criteria |
|-------|---------------|
| Core Filter | Video states what the farmer saves (time, money, or headache) in the first 10 seconds |
| The Eoin test | Would a 47-year-old Roscommon beef farmer watch past the title card? |
| Source test | Every factual claim has a visible source citation on screen |
| Slop test | No AI-sounding phrases in voice-over |
| Duration test | 60–90 seconds. If over 90, cut. No exceptions. |
| Brand test | Colours, fonts, patterns match the site exactly |
| Audio test | Voice is clear, natural pace, no robotic artifacts |
| Thumbnail test | Title readable at 168x94px (YouTube mobile size) |

---

*FarmAI Ireland · Operated by Samac Consulting · hello@farmai.ie*
*This document feeds all video production. Run everything through it before publishing.*

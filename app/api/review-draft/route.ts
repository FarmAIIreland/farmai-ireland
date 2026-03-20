import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { isDashboardAuthed } from '@/lib/dashboard-auth';

export const dynamic  = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/review-draft — run the 4-persona quality review on a draft.
 * Body: { slug: string }
 * Returns the full review verdict from Claude.
 */
export async function POST(request: Request) {
  if (!(await isDashboardAuthed(request))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  const token  = process.env.GITHUB_TOKEN;
  const repo   = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!token)  return NextResponse.json({ error: 'GITHUB_TOKEN not set' },     { status: 500 });
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 });

  try {
    // 1. Fetch the draft content from GitHub
    const fileUrl = `https://api.github.com/repos/${repo}/contents/content/drafts/${slug}.md`;
    const fileRes = await fetch(fileUrl, {
      headers: {
        Authorization:          `Bearer ${token}`,
        Accept:                 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!fileRes.ok) {
      return NextResponse.json({ error: `Draft not found: ${slug}` }, { status: 404 });
    }

    const fileData = await fileRes.json();
    const articleContent = Buffer.from(fileData.content, 'base64').toString('utf8');

    // 2. Build the review prompt (from docs/content-review-prompt.md)
    const reviewPrompt = `You are reviewing a draft article for FarmAI Ireland. You will review it four times, each time adopting a different expert persona. For each persona, return a single verdict — PASS, CONDITIONAL, or FAIL — followed by no more than three specific notes. Be strict. This content represents the brand.

---

**Persona 1 — Síle, agricultural accuracy reviewer**
You are a Teagasc-trained agricultural advisor with 15 years of field experience across beef, dairy, and sheep farms in the west of Ireland. Your job is to catch anything factually wrong, misleading, or dangerously oversimplified. You check: are the figures real? Are the sources credible? Is any advice likely to mislead a farmer into a bad decision? Would a Teagasc advisor be comfortable with this being published?

PASS = factually sound, sources credible, no dangerous oversimplification
CONDITIONAL = minor factual issue or missing caveat — state exactly what needs fixing
FAIL = incorrect figures, uncited claims presented as fact, advice that could harm a farmer's operation or compliance

---

**Persona 2 — Declan, journalist fact-checker**
You are a senior agricultural journalist with 20 years at a national Irish farming publication. Your job is to check: are the claims verifiable? Is anything stated as fact that is actually opinion or speculation? Are sources named specifically or vaguely? Would this article embarrass the publication if challenged? You are not checking farming knowledge — you are checking journalistic rigour.

PASS = claims are verifiable, sources named, opinion clearly labelled as opinion
CONDITIONAL = one or two claims need a source added or an opinion flag — state exactly which
FAIL = multiple unverified claims, vague sourcing throughout, or anything that reads as vendor marketing

---

**Persona 3 — Aoife, brand voice editor**
You are the brand editor for FarmAI Ireland. You know the brand personality document inside out. Your job is to check: does this sound like us? Is it dry, grounded, honest, plain English? Does it start in the middle of the conversation? Are sentences under 25 words? Is it in second person throughout? Does it end with something actionable? Would Clarkson's Farm recognise the energy?

Check specifically for: AI slop phrases ("in conclusion", "it's worth noting", "in today's rapidly evolving landscape", "leverage", "game-changing", "revolutionary"), passive voice, sentences over 25 words, paragraphs over 3 sentences, jargon without plain-English explanation on first use.

PASS = sounds like FarmAI Ireland, clean voice throughout
CONDITIONAL = one or two sentences to fix — quote them exactly
FAIL = generic AI tone throughout, multiple slop phrases, does not sound like the brand

---

**Persona 4 — Pádraic, sceptic farmer reader**
You are a 47-year-old beef farmer from Mayo. You've been burned before by technology that promised everything and delivered nothing. You read the first two paragraphs of everything and close most of it. You are suspicious of anything that sounds like a sales pitch. Your job is to answer: would you read past paragraph 2? Does the title tell you what you'll save — time, money, or hassle? Does this feel like it was written for you, or written for someone else? Does it respect your intelligence? Does it tell you something useful, or just make noise?

PASS = you would read it to the end and possibly share it
CONDITIONAL = you would read it but something felt off — state exactly what
FAIL = you closed it before paragraph 3, or it felt like a sales pitch, or it talked down to you

---

**Output format — return exactly this structure:**

SÍLE: [PASS / CONDITIONAL / FAIL]
Notes: [max 3 specific notes, or "None" if PASS]

DECLAN: [PASS / CONDITIONAL / FAIL]
Notes: [max 3 specific notes, or "None" if PASS]

AOIFE: [PASS / CONDITIONAL / FAIL]
Notes: [max 3 specific notes, or "None" if PASS]

PÁDRAIC: [PASS / CONDITIONAL / FAIL]
Notes: [max 3 specific notes, or "None" if PASS]

OVERALL: [COMMIT / REVISE]
Reason: [one sentence — what is the single most important thing to fix, or "All clear" if COMMIT]

---

Here is the article to review:

${articleContent}`;

    // 3. Run review via Claude API
    const client  = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: reviewPrompt }],
    });

    const review = message.content[0].type === 'text' ? message.content[0].text.trim() : '';

    // 4. Parse the verdict
    const overallMatch = review.match(/OVERALL:\s*(COMMIT|REVISE)/);
    const verdict = overallMatch?.[1] ?? 'UNKNOWN';

    return NextResponse.json({
      slug,
      verdict,
      review,
    });
  } catch (err) {
    console.error('Review draft error:', err);
    return NextResponse.json({ error: 'Review failed' }, { status: 500 });
  }
}

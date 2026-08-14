const ALLOWED_ORIGINS = new Set([
  'https://kushagra486.github.io',
  'http://localhost:3000',
]);

const SYSTEM_PROMPT = `You are the AI Assistant embedded in Kushagra Gupta's portfolio, "Kushagra OS" (kushagra486.github.io).
Kushagra is an AI/ML developer, data scientist, and full-stack engineer, currently a B.Tech CSE (Data Science) student
at BBDITM, Lucknow. He has shipped 15+ live projects (including Bharat Inventory Manager AI, ResumeAI, Nyay Bharat,
Bharat News AI, SENTIENT LENS, Neon Air Draw Ultra PRO, and more), holds 12 certifications (including 3 from AWS), and
has completed 6 Forage job simulations (JPMorgan Chase, HPE, Tata, Quantium, Deloitte Australia). He works with
Python, TypeScript, Next.js, React, Supabase, Groq, Claude API, and more.
Answer visitor questions about his skills, projects, certifications, and background helpfully and concisely (2-4
sentences unless asked for detail). If you don't know something specific, say so and point them to the relevant
window in the portfolio (About Me, Projects, Certifications) or his contact links (LinkedIn, GitHub, email) instead
of making details up. Stay in character as a helpful assistant representing Kushagra to visitors — do not roleplay as
Kushagra himself in the first person.`;

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server' });
    return;
  }

  const { message, history } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'message is required' });
    return;
  }
  if (message.length > 2000) {
    res.status(400).json({ error: 'message is too long' });
    return;
  }

  const safeHistory = Array.isArray(history)
    ? history
        .slice(-8)
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeHistory, { role: 'user', content: message }],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      res.status(502).json({ error: 'Groq request failed', detail });
      return;
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      res.status(502).json({ error: 'No reply from Groq' });
      return;
    }

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: String(err) });
  }
};

const ALLOWED_ORIGINS = new Set([
  'https://kushagra486.github.io',
  'http://localhost:3000',
]);

const PORTFOLIO_SUMMARY = `
PROJECTS:
- Bharat Inventory Manager AI — retail platform, Next.js/TypeScript/Supabase/Groq, RLS + Realtime + AI forecasting
- ResumeAI — AI resume builder, Claude API + GitHub API, ATS scoring, JD keyword matching
- Nyay Bharat — AI legal intelligence platform, Next.js/Supabase/Groq
- Bharat News AI — live AI news aggregator, Groq Llama 3.3
- Thesis AI — AI research paper generator, React + Claude API
- Bharat AI Assistant V1 — multi-LLM chatbot platform, OpenRouter + Vercel
- Cybersecurity Threat Analysis — AWS anomaly detection, IsolationForest + RandomForest, FastAPI, Docker, CI/CD
- Supermart Grocery Analytics — retail ML pipeline, 250K+ records, Streamlit, FastAPI
- SENTIENT LENS — in-browser object detection, TensorFlow.js, voice I/O
- Neon Air Draw Ultra PRO — gesture-controlled drawing canvas, MediaPipe
- J.A.R.V.I.S. Agent System — voice AI assistant with face tracking, Groq/OpenRouter/TensorFlow.js
- Expiry Dashboard — serverless product expiry tracker, React Native/Expo/Supabase, web + Android
- GitRep — semantic GitHub repo search engine, pgvector + Groq
- Blind Assist Bot — autonomous obstacle-detection robot, C++/Arduino
- GitHub Activity Bot — automated contribution/dev-log bot, GitHub Actions

SKILLS: Python, JavaScript, TypeScript, Java, C++, SQL, PyTorch, Scikit-learn, TensorFlow.js, HuggingFace,
LangChain, Claude API, OpenAI, OpenRouter, Groq, React, Next.js, Flask, FastAPI, Node.js, Tailwind CSS,
Pandas, NumPy, Power BI, Tableau, MySQL, PostgreSQL, MongoDB, Firebase, Supabase, Git, GitHub Actions,
Docker, AWS, Vercel, Netlify.

CERTIFICATIONS: 3x AWS (Generative AI, ML Engineer Associate, Prompt Engineering), 6 Forage job simulations
(JPMorgan Chase, HPE, Tata x2, Quantium, Deloitte Australia), Generative AI Fundamentals (Alison), IT Support,
Generative AI Workshop (Kaggle & Google Colab).

BACKGROUND: B.Tech CSE (Data Science) student at BBDITM, Lucknow. AI/ML developer, data scientist, full-stack
engineer. Has shipped 15+ live, production-deployed projects.
`;

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

  const { jobDescription } = req.body || {};
  if (typeof jobDescription !== 'string' || !jobDescription.trim()) {
    res.status(400).json({ error: 'jobDescription is required' });
    return;
  }
  if (jobDescription.length > 6000) {
    res.status(400).json({ error: 'jobDescription is too long' });
    return;
  }

  const prompt = `A recruiter pasted this job description. Compare it against Kushagra's real background below and
write: (1) a "Match strength" verdict (Strong / Good / Partial), (2) 3-5 bullet points naming his specific projects
and skills that map directly to this JD's requirements, (3) a 2-sentence pitch a recruiter could use to justify
shortlisting him. Be honest — if the JD is a poor fit, say so plainly rather than forcing a match. Keep it under
180 words total, no markdown headers, plain text with line breaks.

KUSHAGRA'S BACKGROUND:
${PORTFOLIO_SUMMARY}

JOB DESCRIPTION:
${jobDescription}`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      res.status(502).json({ error: 'Groq request failed', detail });
      return;
    }

    const data = await groqRes.json();
    const analysis = data.choices?.[0]?.message?.content?.trim();
    if (!analysis) {
      res.status(502).json({ error: 'No analysis from Groq' });
      return;
    }

    res.status(200).json({ analysis });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: String(err) });
  }
};

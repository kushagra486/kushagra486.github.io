# Kushagra OS — Groq Proxy

A minimal serverless function that keeps the Groq API key server-side, so the
static portfolio (`kushagra486.github.io`, deployed on GitHub Pages with no
backend) can still have a real LLM-backed AI Assistant.

## How it works

`api/chat.js` accepts `POST { message, history }` and returns `{ reply }`,
forwarding to Groq's `llama-3.3-70b-versatile` model with a system prompt
that grounds it in Kushagra's actual portfolio content. CORS is restricted to
`https://kushagra486.github.io` (and `http://localhost:3000` for local dev).

## Setup

1. Deploy this directory to Vercel as its own project.
2. In the Vercel project's **Settings → Environment Variables**, add:
   - `GROQ_API_KEY` — get one free at [console.groq.com](https://console.groq.com)
3. Redeploy after adding the env var (Vercel doesn't pick up new env vars on
   an already-built deployment).
4. Note the deployed URL (e.g. `https://kushagra-ai-proxy.vercel.app`) and set
   it as `GROQ_PROXY_URL` in `desktop-os/src/lib/chatbot.ts`.

No other configuration needed — it's a single serverless function, no
database, no build step beyond what Vercel does automatically for a bare
`api/` directory.

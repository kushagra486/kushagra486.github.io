export interface Note {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  body: string;
}

export const notes: Note[] = [
  {
    slug: 'why-desktop-os',
    title: 'Why I built my portfolio as a desktop OS',
    date: 'Aug 2026',
    tags: ['meta', 'ux'],
    body: `Most portfolios are a scroll of sections — hero, about, projects, contact. I wanted mine to be a place, not a page. So Kushagra OS is a small windowing system: real draggable windows, a dock, a menu bar, widgets you can pin.

The bet is that a recruiter who has seen five hundred identical one-page portfolios will remember the one that behaved like software. It's also a genuinely useful constraint — every new thing I add (a project, a game, an AI feature) has to fit into "an app on a desktop," which keeps the whole thing coherent instead of turning into an unstructured pile of sections.

It's built on Next.js with a static export, Zustand for the window manager, and Framer Motion for the parts that move. No backend for the desktop itself — the few features that do need a server (the AI Assistant, the JD matcher) talk to small serverless functions that hold API keys, while everything else ships as static files on GitHub Pages.`,
  },
  {
    slug: 'groq-vs-others',
    title: 'Why Groq for the real-time AI features',
    date: 'Aug 2026',
    tags: ['ai', 'infra'],
    body: `The AI Assistant, the JD Matcher, and a few of my other projects (Bharat News AI, Nyay Bharat, Bharat Inventory Manager) all run on Groq's LPU inference instead of the usual OpenAI/Anthropic API calls for their live, latency-sensitive paths.

The reason is simple: Groq is fast enough that an AI feature can feel like a normal interactive UI element instead of "wait for the spinner." When a visitor asks the AI Assistant a question or pastes a job description into the JD Matcher, the reply starts arriving in well under a second. That changes what you're willing to build — a matcher that runs on every keystroke, an assistant that feels conversational rather than transactional.

I still use Claude and OpenAI where quality matters more than latency (ResumeAI's writing, Thesis AI's long-form generation). Picking the right model per use case, not defaulting to one vendor everywhere, is itself part of the engineering.`,
  },
  {
    slug: 'shipping-fast',
    title: 'Shipping 15+ projects as a student',
    date: 'Jul 2026',
    tags: ['career'],
    body: `Every project on this portfolio is live and deployed — not a local demo, not a "run npm install to see it." That was a deliberate rule I set for myself early on: if it isn't deployed, it doesn't count as done.

The practical effect is that I spend a lot of time on the boring 20% — CI, environment variables, CORS, free-tier hosting limits, Row-Level Security — because that's the part that separates "I built a thing" from "I shipped a thing." It's also the part that actually teaches you how production software fails.

The fastest way I've found to get good at this is to build for real constraints: free-tier Supabase and Vercel, no budget for paid APIs beyond what a generous free tier gives you, and a hard rule against fake data. Bharat Inventory Manager's three connected apps sharing one live Supabase backend with Row-Level Security, or Bharat News AI merging four real news sources — those constraints are what make the projects worth putting in a portfolio in the first place.`,
  },
];

export const profile = {
  name: 'Kushagra Gupta',
  role: 'AI Engineer • Data Scientist • Full-Stack Developer',
  education: 'B.Tech CSE (Data Science) @ BBDITM, Lucknow (2024–2028)',
  location: 'Prayagraj, Uttar Pradesh, India',
  bio: "I'm a results-driven developer who builds AI-powered, data-driven applications end-to-end — from raw data ingestion and ML modelling to production deployment on cloud infrastructure. My work spans LLM integration, computer vision, embedded systems, retail analytics, and developer tooling. Every project I build is deployed, live, and production-ready.",
  links: {
    linkedin: 'https://www.linkedin.com/in/kushagra-gupta-18b4151ba/',
    github: 'https://github.com/kushagra486',
    email: 'mailto:kushagra.gupta.ald@gmail.com',
    portfolio: 'https://kushagra486.github.io',
  },
  openToRoles: [
    'AI Engineer / AI-ML Engineer',
    'Generative AI Developer',
    'Data Scientist / Data Analyst',
    'AI Automation Developer',
    'Machine Learning Engineer',
  ],
};

export const expertise: { label: string; percent: number }[] = [
  { label: 'Artificial Intelligence', percent: 95 },
  { label: 'Machine Learning', percent: 93 },
  { label: 'Python Programming', percent: 94 },
  { label: 'Data Science & Analytics', percent: 92 },
  { label: 'Generative AI / LLMs', percent: 90 },
  { label: 'SQL & Database Systems', percent: 90 },
  { label: 'Data Visualization (Power BI)', percent: 90 },
  { label: 'Agentic AI & AI Agents', percent: 88 },
  { label: 'AI Automation', percent: 88 },
  { label: 'Full-Stack Development', percent: 85 },
];

export interface LiveApp {
  slug: string;
  name: string;
  emoji: string;
  url: string;
}

/** Live, embeddable apps shown as launchable tiles in the App Dashboard. */
export const liveApps: LiveApp[] = [
  { slug: 'bim-owner', name: 'Bharat Inventory Manager', emoji: '🛒', url: 'https://bharat-inventory-manager.vercel.app' },
  { slug: 'bim-shop', name: 'Bharat Store', emoji: '🛍️', url: 'https://bharat-inventory-manager.vercel.app/shop' },
  { slug: 'bim-delivery', name: 'Bharat Door Droppers', emoji: '🛵', url: 'https://bharat-inventory-manager.vercel.app/delivery' },
  { slug: 'resumeai', name: 'ResumeAI', emoji: '🤖', url: 'https://kushagra486.github.io/resumeai/' },
  { slug: 'nyaya-agent', name: 'Nyay Bharat', emoji: '⚖️', url: 'https://nyaya-agent-git-main-kushagra486s-projects.vercel.app' },
  { slug: 'bharat-news-ai', name: 'Bharat News AI', emoji: '📰', url: 'https://kushagra486.github.io/bharat-news-ai/' },
  { slug: 'thesis-ai', name: 'Thesis AI', emoji: '📄', url: 'https://kushagra486.github.io/thesis-ai/' },
  { slug: 'sentient-lens', name: 'SENTIENT LENS', emoji: '👁️', url: 'https://kushagra486.github.io/sentient-lens/' },
  { slug: 'neon-air-draw', name: 'Neon Air Draw', emoji: '🖐️', url: 'https://kushagra486.github.io/neon-air-paint-/' },
  { slug: 'anvil', name: 'Anvil', emoji: '⚒️', url: 'https://kushagra486.github.io/anvil/' },
  { slug: 'bharat-ai-office', name: 'Bharat AI Office', emoji: '🏢', url: 'https://bharat-ai-office-frontend.vercel.app' },
  { slug: 'smart-budget-assistant', name: 'Smart Budget Assistant', emoji: '💰', url: 'https://app-7xilyrtwp9fl.appmedo.com/' },
  { slug: 'bharat-news-ai-demo', name: 'BharatNews.ai Demo', emoji: '📰', url: 'https://kushagra486.github.io/news-demo-ai/' },
];

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'SQL'],
  'AI / ML / GenAI': [
    'PyTorch',
    'Scikit-learn',
    'TensorFlow.js',
    'HuggingFace',
    'LangChain',
    'Claude API',
    'OpenAI',
    'OpenRouter',
    'Groq',
  ],
  'Frameworks & Web': ['React', 'Next.js', 'Flask', 'FastAPI', 'Node.js', 'Tailwind CSS', 'Bootstrap'],
  'Data & Analytics': ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Tableau', 'Jupyter'],
  Databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
  'DevOps & Cloud': ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Netlify'],
};

export interface CaseStudy {
  problem: string;
  approach: string[];
  outcome: string;
}

export interface Project {
  slug: string;
  emoji: string;
  name: string;
  tagline: string;
  description: string[];
  stack: string[];
  /** Live demo/app URL, when one exists. */
  url?: string;
  /** GitHub repository URL. */
  repoUrl: string;
  /** Deep-dive (problem/approach/outcome) shown for a handful of flagship projects. */
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: 'bharat-inventory-manager',
    emoji: '🛒',
    name: 'Bharat Inventory Manager AI',
    tagline: 'AI-Powered Retail Platform — Owner, Store & Delivery',
    description: [
      'Three connected apps on one Supabase backend: an owner dashboard, a customer marketplace, and a delivery-partner platform, all sharing one live database.',
      'Row-Level Security enforced at the database layer, not just app code',
      'Supabase Realtime — one order updates all three apps instantly',
      'Groq (Llama 3.3) powers forecasts, restock suggestions, and business insights',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Groq', 'Vercel'],
    url: 'https://bharat-inventory-manager.vercel.app',
    repoUrl: 'https://github.com/kushagra486/Bharat-Inventory-Manager-',
    caseStudy: {
      problem:
        'Small retailers juggle inventory, storefront, and delivery as disconnected tools (a notebook, a WhatsApp group, a separate delivery app) — stock goes stale the moment one channel updates without the others knowing.',
      approach: [
        'Designed one Supabase schema shared by three apps (owner dashboard, customer marketplace, delivery platform) instead of three separate backends',
        'Enforced Row-Level Security at the database layer so each role only ever sees what it is allowed to, even if app-side code has a bug',
        'Wired Supabase Realtime so a single order event propagates to all three apps within milliseconds — no polling',
        'Used Groq (Llama 3.3) for fast, cheap restock forecasts and business insights instead of a slower/costlier model',
      ],
      outcome:
        'One order update is instantly consistent across owner, storefront, and delivery — with zero custom sync code and stock-level security enforced by the database itself, not application logic that could be bypassed.',
    },
  },
  {
    slug: 'resumeai',
    emoji: '🤖',
    name: 'ResumeAI',
    tagline: 'AI Portfolio & Resume Builder',
    description: [
      'Fully client-side resume builder powered by Claude API and GitHub REST API. Zero backend, zero build step.',
      'Claude API rewrites summaries & bullets',
      '8-category ATS compatibility scorer',
      'JD keyword matcher, 5 resume templates',
      'GitHub profile/repo import',
    ],
    stack: ['Claude API', 'GitHub API', 'Vanilla JS', 'GitHub Pages'],
    url: 'https://kushagra486.github.io/resumeai/',
    repoUrl: 'https://github.com/kushagra486/resumeai',
  },
  {
    slug: 'nyaya-agent',
    emoji: '⚖️',
    name: 'Nyay Bharat',
    tagline: "India's AI Legal Intelligence Platform",
    description: [
      "Bridges India's old criminal codes (IPC/CrPC/Evidence Act) and new ones (BNS/BNSS/BSA) with AI-assisted research, drafting, and document review.",
      'AI-assisted legal research and document review',
      'Lawyer discovery + live legal news feed',
      'Zero-cost, fully open-source stack',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Groq'],
    url: 'https://nyaya-agent-git-main-kushagra486s-projects.vercel.app',
    repoUrl: 'https://github.com/kushagra486/nyaya-agent',
    caseStudy: {
      problem:
        "India rewrote its core criminal codes in 2024 (IPC→BNS, CrPC→BNSS, Evidence Act→BSA), leaving most legal research still anchored to the old codes — with no simple way to bridge the two for someone researching either era's law.",
      approach: [
        'Built a cross-reference layer mapping old-code sections to their new-code equivalents so research works regardless of which system a document uses',
        'Used Groq for AI-assisted research and drafting, prioritizing response speed since legal lookup is an interactive, iterative workflow',
        'Added lawyer discovery and a live legal-news feed so the platform is useful beyond one-off lookups',
        'Kept the whole stack zero-cost/open-source (Supabase + Vercel free tiers) to make it realistically usable, not a funded-only tool',
      ],
      outcome:
        'A single platform where old-code and new-code legal research meet — with AI assistance fast enough to be part of an active research workflow rather than a slow batch lookup.',
    },
  },
  {
    slug: 'bharat-news-ai',
    emoji: '📰',
    name: 'Bharat News AI',
    tagline: 'Live AI-Powered Daily Intelligence for India',
    description: [
      '4 live news sources merged and deduped, with an Instagram-style feed and per-article AI analysis.',
      'Groq Llama 3.3 70B for per-article summaries and "why it matters"',
      'India-focused feed, stories viewer, live search',
      'AI assistant in news-grounded and general chat modes',
    ],
    stack: ['Groq', 'Supabase Auth', 'JavaScript'],
    url: 'https://kushagra486.github.io/bharat-news-ai/',
    repoUrl: 'https://github.com/kushagra486/bharat-news-ai',
    caseStudy: {
      problem:
        'Any single news source has blind spots and bias. Reading four sources separately to cross-check a story is slow enough that most people just... don’t.',
      approach: [
        'Aggregated 4 live news sources and deduped overlapping stories client-side',
        'Used Groq Llama 3.3 for per-article "why it matters" summaries fast enough to run on every article, not just on-demand',
        'Built an Instagram-style feed UI so scanning many stories is fast, with a dedicated stories viewer for depth',
        'Added an AI assistant with two explicit modes — news-grounded (only reasons from the fetched articles) and general chat — so answers are never accidentally presented as sourced when they are not',
      ],
      outcome:
        'A single feed that reads faster than checking four apps, with AI-generated context on every story rather than only the ones worth manually summarizing.',
    },
  },
  {
    slug: 'thesis-ai',
    emoji: '📄',
    name: 'Thesis AI',
    tagline: 'AI-Powered Publication-Grade Research Paper Generator',
    description: ['Generates publication-grade research papers with Claude AI, deployed as a static site on GitHub Pages.'],
    stack: ['React', 'Claude API', 'GitHub Pages'],
    url: 'https://kushagra486.github.io/thesis-ai/',
    repoUrl: 'https://github.com/kushagra486/thesis-ai',
  },
  {
    slug: 'bharat-ai-assistant',
    emoji: '🇮🇳',
    name: 'Bharat AI Assistant V1',
    tagline: 'Multi-LLM AI Chatbot Platform',
    description: [
      'Full-stack AI chatbot integrating multiple LLMs via OpenRouter API with serverless deployment on Vercel.',
      'Real-time AI responses',
      'Secure serverless API layer',
      'Mobile-responsive UI, 100% free-tier infra',
    ],
    stack: ['React', 'Next.js', 'OpenRouter API', 'Vercel'],
    repoUrl: 'https://github.com/kushagra486/Bharat-AI-Assistant-V1',
  },
  {
    slug: 'cybersecurity-threat-analysis',
    emoji: '🛡️',
    name: 'Cybersecurity Threat Analysis',
    tagline: 'AWS CloudWatch Anomaly Detection',
    description: [
      'Production ML pipeline for detecting suspicious web traffic using dual-model architecture.',
      'IsolationForest (unsupervised) + RandomForest (supervised)',
      'FastAPI prediction endpoint',
      'Docker + GitHub Actions CI/CD',
    ],
    stack: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Docker'],
    repoUrl: 'https://github.com/kushagra486/cybersecurity-threat-analysis',
  },
  {
    slug: 'supermart-grocery-analytics',
    emoji: '🛒',
    name: 'Supermart Grocery Analytics',
    tagline: 'Retail ML Pipeline — 250K+ Records',
    description: [
      'End-to-end analytics and ML pipeline from raw CSV to deployed prediction API.',
      'EDA + feature engineering',
      'Random Forest & regression models',
      'Streamlit dashboard, Docker containerised',
    ],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'FastAPI'],
    repoUrl: 'https://github.com/kushagra486/supermart-grocery-sales-analytics',
  },
  {
    slug: 'sentient-lens',
    emoji: '👁️',
    name: 'SENTIENT LENS',
    tagline: 'Serverless Browser Object Intelligence',
    description: [
      'Real-time object detection — 100% in-browser, $0 cost, no backend.',
      'TensorFlow.js COCO-SSD',
      'AI voice personality (50+ responses)',
      'IndexedDB persistence, bidirectional voice I/O',
    ],
    stack: ['TensorFlow.js', 'COCO-SSD', 'IndexedDB', 'Web Speech API'],
    url: 'https://kushagra486.github.io/sentient-lens/',
    repoUrl: 'https://github.com/kushagra486/sentient-lens',
  },
  {
    slug: 'neon-air-draw',
    emoji: '🖐️',
    name: 'Neon Air Draw Ultra PRO',
    tagline: 'AI Gesture-Controlled Drawing Canvas',
    description: [
      'Draw in the air using hand gestures — Google MediaPipe for millimetric tracking.',
      '5 gesture modes (draw, rainbow, erase, hover, Z-depth)',
      'HSL rainbow + particle physics',
      'Persistent gallery + PNG export',
    ],
    stack: ['MediaPipe', 'Canvas API', 'JavaScript'],
    url: 'https://kushagra486.github.io/neon-air-paint-/',
    repoUrl: 'https://github.com/kushagra486/neon-air-paint-',
  },
  {
    slug: 'jarvis-agent-system',
    emoji: '🤖',
    name: 'J.A.R.V.I.S. Agent System',
    tagline: 'Cinematic AI Voice Assistant',
    description: [
      'Marvel-inspired AI assistant with real-time voice, face tracking, and live weather.',
      'Full voice I/O (Web Speech API)',
      'TensorFlow BlazeFace face tracking',
      'Live weather + geolocation, serverless API keys via Vercel',
    ],
    stack: ['Groq API', 'OpenRouter', 'TensorFlow.js', 'Vercel'],
    repoUrl: 'https://github.com/kushagra486/jarvis',
  },
  {
    slug: 'expiry-dashboard',
    emoji: '⏰',
    name: 'Expiry Dashboard',
    tagline: 'Free Serverless Product Expiry Tracker — Web & Android',
    description: [
      'Track products and get alerts before they expire, with analytics and zero paid services.',
      'Smart alerts at 30/15/7/3/1 days before expiry',
      'Barcode scanner, calendar view, PDF/CSV reports',
      'Same app runs in-browser and as an Android APK',
    ],
    stack: ['React Native', 'Expo', 'Supabase'],
    repoUrl: 'https://github.com/kushagra486/Bharat-Inventory',
  },
  {
    slug: 'gitrep',
    emoji: '🔍',
    name: 'GitRep',
    tagline: 'AI-Powered GitHub Repository Scraper & Discovery Engine',
    description: [
      'Find the right open-source tool by describing what you need, not by guessing keywords.',
      'Semantic search across 50K+ GitHub repos',
      'Health scoring by star velocity, activity, and issue health',
      'Streaming AI chat (Groq) with on-demand deep repo analysis',
    ],
    stack: ['Next.js', 'Supabase', 'pgvector', 'Groq', 'OpenRouter'],
    repoUrl: 'https://github.com/kushagra486/GitRep',
  },
  {
    slug: 'blind-assist-bot',
    emoji: '🦯',
    name: 'Blind Assist Bot',
    tagline: 'Autonomous Obstacle Detection Robot',
    description: [
      'Self-moving assistive robot using Arduino + ultrasonic sensors for real-time navigation.',
      'Multi-directional ultrasonic sensing',
      'Real-time C++ motor control firmware',
      'Sensor fusion for autonomous navigation',
    ],
    stack: ['C++', 'Arduino Uno', 'HC-SR04', 'L298N'],
    repoUrl: 'https://github.com/kushagra486/blind-assist-bot',
  },
  {
    slug: 'github-activity-bot',
    emoji: '🌿',
    name: 'GitHub Activity Bot',
    tagline: 'Automated Contribution Graph & Dev-Log Keeper',
    description: [
      'GitHub Actions-powered bot that keeps a running daily dev log and contribution activity.',
      'Daily commits with a dev tip & quote, 3x per day',
      'Weekly README stats refresh and issue rotation',
    ],
    stack: ['GitHub Actions', 'Node.js'],
    repoUrl: 'https://github.com/kushagra486/github-activity-bot',
  },
  {
    slug: 'anvil',
    emoji: '⚒️',
    name: 'Anvil',
    tagline: 'Forge Sharper Prompts, Build Lasting Skills',
    description: [
      'A workshop for anyone who writes prompts or builds skills for Claude — score work live, test it for real, and keep everything in one place.',
      'Prompt Studio: live 0–100 quality score against a checklist (clarity, examples, structure), then run it for real',
      'Skill Builder: guided form for triggers/steps/examples, generates a ready-to-use SKILL.md preview',
      'Zero backend — everything saved to the visitor\'s own browser; signups land as GitHub Issues instead of a database',
      'No framework, no bundler — plain HTML/CSS/JS, deployed to GitHub Pages entirely via GitHub Actions on every push',
    ],
    stack: ['HTML/CSS/JS', 'GitHub Actions', 'GitHub Pages', 'localStorage'],
    url: 'https://kushagra486.github.io/anvil/',
    repoUrl: 'https://github.com/kushagra486/anvil',
  },
  {
    slug: 'bharat-ai-office',
    emoji: '🏢',
    name: 'Bharat AI Office',
    tagline: 'A Brief Becomes a Fully Staffed AI Office',
    description: [
      'One orchestrator (Nova) and 10 specialist AI employees — architect, backend, frontend, design, QA, data, security, docs, DevOps, coordination — decompose a project brief into a task graph and work it in parallel with real file/shell tool access, visualized as a live 3D office floor.',
      'Each employee runs its own tool-use loop, sandboxed to its own working directory, with escalation triage and a QA pass once all tasks complete',
      '11 concurrent agent seats spread across 3 LLM providers (NVIDIA NIM, Groq, OpenRouter) with automatic fallback, so no single rate limit bottlenecks the office',
      'Serverless frontend (Vercel/Netlify) + managed Postgres/Realtime (Supabase) + one persistent Railway worker for the one thing serverless can\'t do — real git commits',
    ],
    stack: ['Next.js', 'Three.js', 'Supabase', 'Railway', 'NVIDIA NIM', 'Groq', 'OpenRouter'],
    url: 'https://bharat-ai-office-frontend.vercel.app',
    repoUrl: 'https://github.com/kushagra486/BharatAi-office',
  },
  {
    slug: 'nova-agent',
    emoji: '🧠',
    name: 'NØVA',
    tagline: 'Autonomous AI Optimization Agent — Minimum Sufficient Intelligence',
    description: [
      'A serverless agent that sits between a request and available compute, and decides the minimum sufficient intelligence to answer it — deterministic computation, a lightweight model, or a full reasoning model — while enforcing a privacy policy on what leaves the process.',
      'Scout → Guardian → Thinker → Router → Execute → Verify → Respond pipeline',
      'Guardian classifies privacy risk (P0–P3) and blocks highly-sensitive requests from external transmission by default',
      'Router picks the cheapest capable execution path; a failed verification escalates once to a stronger model before giving up',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'pgvector', 'NVIDIA NIM', 'DeepSeek'],
    repoUrl: 'https://github.com/kushagra486/Nova',
  },
  {
    slug: 'janseva-ai',
    emoji: '🏛️',
    name: 'Janseva AI',
    tagline: 'सरकार की बात, आपकी भाषा में — Civic Platform for Indian Cities',
    description: [
      'A two-way civic platform for Indian cities, starting with Lucknow — citizens decode government notices, find services/schemes they qualify for, and report local problems; AI agents route reports, and a human officer approves every action.',
      'Sahayak: notice decoder (photo/PDF/text → plain English), service navigator with cited answers, scheme finder, deadline reminders',
      'Shikayat: report by text, voice or photo with GPS — agents classify, rate severity, merge duplicates, draft a fix plan',
      'Prashasan: officer dashboard with issue map, approval queue, SLA timers, and ward analytics',
    ],
    stack: ['Next.js', 'FastAPI', 'Supabase', 'Groq', 'Ollama'],
    repoUrl: 'https://github.com/kushagra486/Janseva-Ai',
  },
  {
    slug: 'smart-budget-assistant',
    emoji: '💰',
    name: 'Smart Budget & Expenses Assistant',
    tagline: 'Full-Stack Expense Tracker — Web + Android',
    description: [
      'A Next.js + Express + MongoDB expense tracker with a contact-form API documented via OpenAPI, packaged with an Android WebView wrapper so the same web app ships as a native-feeling app.',
    ],
    stack: ['Next.js', 'Express', 'MongoDB', 'Android WebView'],
    url: 'https://app-7xilyrtwp9fl.appmedo.com/',
    repoUrl: 'https://github.com/kushagra486/Smart-Budget-Assistant',
  },
  {
    slug: 'bharat-news-ai-demo',
    emoji: '📰',
    name: 'BharatNews.ai — Demo',
    tagline: 'Instagram-Style Redesign of Bharat News AI',
    description: [
      'Standalone GitHub Pages demo of Bharat News AI, redesigned in an Instagram-style layout — same 4-source live feed, Groq per-article analysis, and stories viewer as the main app.',
    ],
    stack: ['Vanilla JS', 'Groq', 'Supabase Auth', 'GitHub Pages'],
    url: 'https://kushagra486.github.io/news-demo-ai/',
    repoUrl: 'https://github.com/kushagra486/news-demo-ai',
  },
  {
    slug: 'friday-desk-assistant',
    emoji: '🎙️',
    name: 'Friday Desk Assistant',
    tagline: 'ESP32 Voice AI Chatbot (MCP Protocol)',
    description: [
      'A personal build of the open-source XiaoZhi ESP32 voice assistant — offline wake-word detection, a streaming ASR + LLM + TTS pipeline over WebSocket/MQTT, and device-side MCP control (speaker, LED, servo, GPIO) across six ESP32 chip variants.',
    ],
    stack: ['ESP-IDF', 'C++', 'MCP Protocol', 'ESP-SR'],
    repoUrl: 'https://github.com/kushagra486/Friday-Desk-assistant',
  },
  {
    slug: 'bharat-ai-mobile',
    emoji: '📱',
    name: 'Bharat AI Mobile',
    tagline: 'Futuristic AI Chatbot — React Native / Expo',
    description: [
      'A mobile-first AI chatbot app inspired by Google Gemini, with an Indian tricolor brand identity, designed for one-handed portrait use.',
      'Expo Router frontend with a bundled server core, Drizzle ORM over Postgres',
    ],
    stack: ['React Native', 'Expo', 'Drizzle ORM', 'PostgreSQL'],
    repoUrl: 'https://github.com/kushagra486/bharat-ai-demo',
  },
  {
    slug: 'kushagra-ai-agent',
    emoji: '🦙',
    name: 'Kushagra AI',
    tagline: 'Smart Web-Based Personal AI Agent (Local Ollama)',
    description: [
      'A full-stack personal AI assistant — a React chat frontend and a Node/Express backend that proxies to a local Ollama (Llama 3) instance, with placeholders for future vision, gesture, and voice modes.',
      'Private repository',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Ollama', 'Tailwind CSS'],
    repoUrl: 'https://github.com/kushagra486/AI',
  },
  {
    slug: 'swynex-ai-problem-design',
    emoji: '🎓',
    name: 'AI Problem Design — SWYNEX Internship',
    tagline: 'Closed-Domain Q&A System Design for College Admissions',
    description: [
      'An internship task for SWYNEX Technologies: designs a closed-domain question-answering system over a curated FAQ dataset (40–60 pairs) covering college admission and internship queries.',
    ],
    stack: ['NLP', 'Q&A System Design'],
    repoUrl: 'https://github.com/kushagra486/SWYNEX-AI-Problem-Design',
  },
  {
    slug: 'newslens-ai',
    emoji: '🔎',
    name: 'NewsLens AI',
    tagline: 'Gemini-Powered News Analysis (AI Studio Prototype)',
    description: [
      'A Google AI Studio prototype for AI-assisted news analysis, backed by Firebase/Firestore.',
      'Private repository',
    ],
    stack: ['Vite', 'TypeScript', 'Gemini API', 'Firebase'],
    repoUrl: 'https://github.com/kushagra486/newslensAI-v1',
  },
  {
    slug: 'bharat-ai-core',
    emoji: '🇮🇳',
    name: 'Bharat AI (Core)',
    tagline: 'Next.js Scaffold — Early Stage',
    description: [
      'An early-stage private Next.js scaffold, not yet built out beyond the default create-next-app starter.',
    ],
    stack: ['Next.js'],
    repoUrl: 'https://github.com/kushagra486/bharat-ai',
  },
  {
    slug: 'visionforge-ai',
    emoji: '🖼️',
    name: 'VisionForge AI',
    tagline: 'Vite + React Starter — Early Stage',
    description: [
      'An early-stage Vite + React scaffold reserved for a computer-vision AI tool — no feature code committed yet.',
    ],
    stack: ['Vite', 'React'],
    repoUrl: 'https://github.com/kushagra486/visionforge-ai',
  },
  {
    slug: 'bharatui-ux-canvas',
    emoji: '🎨',
    name: 'BharatUi UX Canvas',
    tagline: 'Design System Workspace — Early Stage',
    description: [
      'A repository reserved for a Bharat-branded UI/UX design canvas — no content committed yet.',
    ],
    stack: [],
    repoUrl: 'https://github.com/kushagra486/BharatUi-Ux-Canvas',
  },
  {
    slug: 'smart-budget-assistant-app',
    emoji: '📊',
    name: 'Smart Budget Assistant (App)',
    tagline: 'Private Repository — Early Stage',
    description: [
      'A private repository reserved for a future Smart Budget Assistant mobile build — only a license file committed so far.',
    ],
    stack: [],
    repoUrl: 'https://github.com/kushagra486/Smart-Budget-Assistant-app',
  },
];

export interface Certification {
  slug: string;
  name: string;
  issuer: string;
  year: string;
  imageUrl: string | null;
}

export const certifications: Certification[] = [
  { slug: 'aws-genai', name: 'Introduction to Generative AI – Art of the Possible', issuer: 'AWS Training & Certification', year: '2026', imageUrl: '/certs/aws-genai.png' },
  { slug: 'aws-ml-engineer', name: 'AWS ML Engineer Associate Curriculum Overview', issuer: 'AWS Training & Certification', year: '2026', imageUrl: '/certs/aws-ml-engineer.png' },
  { slug: 'aws-prompt-engineering', name: 'Foundations of Prompt Engineering', issuer: 'AWS Training & Certification', year: '2026', imageUrl: '/certs/aws-prompt-engineering.png' },
  { slug: 'jpmorgan-quant-research', name: 'Quantitative Research Job Simulation', issuer: 'JPMorgan Chase & Co. (Forage)', year: '2026', imageUrl: '/certs/jpmorgan-quant-research.jpg' },
  { slug: 'tata-genai-analytics', name: 'GenAI Powered Data Analytics Simulation', issuer: 'Tata (Forage)', year: '2026', imageUrl: '/certs/tata-genai-analytics.jpg' },
  { slug: 'tata-cybersecurity', name: 'Cybersecurity Analyst Simulation', issuer: 'Tata (Forage)', year: '2026', imageUrl: '/certs/tata-cybersecurity.jpg' },
  { slug: 'quantium-data-analytics', name: 'Data Analytics Job Simulation', issuer: 'Quantium (Forage)', year: '2026', imageUrl: '/certs/quantium-data-analytics.jpg' },
  { slug: 'deloitte-data-analytics', name: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia (Forage)', year: '2025', imageUrl: '/certs/deloitte-data-analytics.jpg' },
  { slug: 'hpe-software-engineering', name: 'Software Engineering Job Simulation', issuer: 'HPE (Forage)', year: '2026', imageUrl: '/certs/hpe-software-engineering.png' },
  { slug: 'alison-genai', name: 'Generative AI Fundamentals', issuer: 'Alison', year: '2026', imageUrl: null },
  { slug: 'it-support', name: 'IT Support Certificate', issuer: 'Data Expert Technical Institution', year: '2024', imageUrl: null },
  { slug: 'genai-workshop', name: 'Generative AI Workshop — 5 Day Workshop', issuer: 'Kaggle & Google Colab', year: '2026', imageUrl: null },
];

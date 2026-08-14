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

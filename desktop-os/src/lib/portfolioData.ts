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
};

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'SQL'],
  'AI / ML / GenAI': [
    'PyTorch',
    'Scikit-learn',
    'TensorFlow.js',
    'HuggingFace',
    'LangChain',
    'Claude API',
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
  url: string;
}

export const projects: Project[] = [
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
    url: 'https://github.com/kushagra486/Bharat-AI-Assistant-V1',
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
    url: 'https://github.com/kushagra486/cybersecurity-threat-analysis',
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
    url: 'https://github.com/kushagra486/supermart-grocery-sales-analytics',
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
    url: 'https://github.com/kushagra486',
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
    url: 'https://github.com/kushagra486/blind-assist-bot',
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
];

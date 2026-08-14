import { certifications, profile, projects, skills } from '@/lib/portfolioData';

const allSkills = Object.values(skills).flat();

interface Rule {
  test: RegExp;
  reply: () => string;
}

const rules: Rule[] = [
  {
    test: /\b(hi|hello|hey|yo)\b/i,
    reply: () => `Hey! I'm Kushagra's portfolio assistant. Ask me about his projects, skills, certifications, or how to reach him.`,
  },
  {
    // No trailing \b: these roots need to match plural/inflected forms too
    // (e.g. "skills", "technologies") — a trailing \b would only match the
    // bare root and silently miss those.
    test: /\b(skill|tech stack|technolog|know|stack)/i,
    reply: () => `Kushagra works with: ${allSkills.slice(0, 12).join(', ')}, and more. Open the "About Me" window for the full breakdown by category.`,
  },
  {
    test: /\b(project|work|built|build|portfolio)/i,
    reply: () =>
      `He's shipped ${projects.length} production projects — including ${projects[0].name} (${projects[0].tagline}) and ${projects[4].name} (${projects[4].tagline}). Open the "Projects" window to see all of them.`,
  },
  {
    test: /\b(certif|aws|credential)/i,
    reply: () => `${certifications.length} certifications so far, including 3 AWS credentials (Generative AI, ML Engineering, Prompt Engineering). Check the "Certifications" window for the full list.`,
  },
  {
    test: /\b(contact|email|reach|hire|linkedin|github)/i,
    reply: () =>
      `Best ways to reach Kushagra: LinkedIn (${profile.links.linkedin}) or GitHub (${profile.links.github}). Both links are also in the "About Me" window.`,
  },
  {
    test: /\b(education|study|college|degree|cgpa)/i,
    reply: () => profile.education,
  },
  {
    test: /\b(who are you|what are you|bot|ai)\b/i,
    reply: () => `I'm a lightweight rule-based assistant — ask about projects, skills, certifications, or contact info.`,
  },
];

const fallback = [
  "I'm not sure about that one yet — try asking about projects, skills, certifications, or contact info.",
  "Good question! I don't have a scripted answer for that yet. Try the Projects or About Me windows.",
];

/** Scripted, offline fallback — always available, no network required. */
export function getReply(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return "Ask me something about Kushagra's work!";

  for (const rule of rules) {
    if (rule.test.test(trimmed)) return rule.reply();
  }

  return fallback[Math.floor(Math.random() * fallback.length)];
}

// Set this once the groq-proxy/ serverless function (see its README) is deployed,
// e.g. 'https://kushagra-ai-proxy.vercel.app/api/chat'. Left blank, the assistant
// runs on the rule-based getReply() above only.
const GROQ_PROXY_URL = 'https://kushagra486-github-io.vercel.app/api/chat';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Tries the Groq-backed proxy first (if configured), falling back to the
 * rule-based getReply() on any failure — network error, proxy down, or
 * GROQ_PROXY_URL left unset. Never throws.
 */
export async function getSmartReply(message: string, history: ChatMessage[] = []): Promise<string> {
  if (!GROQ_PROXY_URL) return getReply(message);

  try {
    const res = await fetch(GROQ_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) return getReply(message);

    const data = await res.json();
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply : getReply(message);
  } catch {
    return getReply(message);
  }
}

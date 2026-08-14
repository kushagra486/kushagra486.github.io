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
    test: /\b(skill|tech stack|technolog|know|stack)\b/i,
    reply: () => `Kushagra works with: ${allSkills.slice(0, 12).join(', ')}, and more. Open the "About Me" window for the full breakdown by category.`,
  },
  {
    test: /\b(project|work|built|build|portfolio)\b/i,
    reply: () =>
      `He's shipped ${projects.length} production projects — including ${projects[0].name} (${projects[0].tagline}) and ${projects[4].name} (${projects[4].tagline}). Open the "Projects" window to see all of them.`,
  },
  {
    test: /\b(certif|aws|credential)\b/i,
    reply: () => `${certifications.length} certifications so far, including 3 AWS credentials (Generative AI, ML Engineering, Prompt Engineering). Check the "Certifications" window for the full list.`,
  },
  {
    test: /\b(contact|email|reach|hire|linkedin|github)\b/i,
    reply: () =>
      `Best ways to reach Kushagra: LinkedIn (${profile.links.linkedin}) or GitHub (${profile.links.github}). Both links are also in the "About Me" window.`,
  },
  {
    test: /\b(education|study|college|degree|cgpa)\b/i,
    reply: () => profile.education,
  },
  {
    test: /\b(who are you|what are you|bot|ai)\b/i,
    reply: () => `I'm a lightweight rule-based assistant for now — a real LLM (Groq) backend is coming soon.`,
  },
];

const fallback = [
  "I'm not sure about that one yet — try asking about projects, skills, certifications, or contact info.",
  "Good question! I don't have a scripted answer for that yet. Try the Projects or About Me windows.",
];

export function getReply(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return "Ask me something about Kushagra's work!";

  for (const rule of rules) {
    if (rule.test.test(trimmed)) return rule.reply();
  }

  return fallback[Math.floor(Math.random() * fallback.length)];
}

// Hook point for a real LLM backend (e.g. Groq). Wire this up once an API
// key is available — note that a purely static export has no server, so a
// client-side call here would expose the key; route it through an edge
// function or serverless proxy instead of calling the provider directly.
export async function getReplyFromGroq(message: string): Promise<string> {
  throw new Error(`Groq integration not configured yet — cannot answer "${message}". Falling back to getReply().`);
}

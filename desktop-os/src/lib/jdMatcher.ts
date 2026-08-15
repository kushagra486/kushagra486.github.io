const MATCH_PROXY_URL = 'https://kushagra486-github-io.vercel.app/api/match';

export type MatchResult = { ok: true; analysis: string } | { ok: false; error: string };

/** Sends a job description to the Groq-backed /api/match proxy; never throws. */
export async function matchJobDescription(jobDescription: string): Promise<MatchResult> {
  const trimmed = jobDescription.trim();
  if (!trimmed) return { ok: false, error: 'Paste a job description first.' };

  try {
    const res = await fetch(MATCH_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription: trimmed }),
    });
    if (!res.ok) return { ok: false, error: `Matcher service returned ${res.status}. Try again shortly.` };

    const data = await res.json();
    if (typeof data.analysis !== 'string' || !data.analysis.trim()) {
      return { ok: false, error: 'No analysis returned.' };
    }
    return { ok: true, analysis: data.analysis };
  } catch {
    return { ok: false, error: 'Could not reach the matcher service right now — please try again.' };
  }
}

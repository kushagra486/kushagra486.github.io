'use client';

import { FormEvent, useState } from 'react';
import { matchJobDescription } from '@/lib/jdMatcher';

export function JDMatcher() {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!jd.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const res = await matchJobDescription(jd);
    setLoading(false);
    if (res.ok) setResult(res.analysis);
    else setError(res.error);
  }

  return (
    <div className="flex h-[65vh] flex-col gap-3 text-sm">
      <div>
        <p className="font-semibold text-white">🎯 JD Matcher</p>
        <p className="mt-1 text-xs text-white/50">
          Paste a job description — the AI compares it against Kushagra&apos;s real projects, skills, and
          certifications and gives you a straight verdict on fit.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2 overflow-hidden">
        <label htmlFor="jd-input" className="sr-only">
          Job description
        </label>
        <textarea
          id="jd-input"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste a job description here…"
          className="h-28 shrink-0 resize-none rounded-md border border-white/15 bg-white/5 p-2.5 text-xs text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60"
        />
        <button
          type="submit"
          disabled={loading || !jd.trim()}
          className="shrink-0 self-start rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300 disabled:opacity-50"
        >
          {loading ? 'Analyzing…' : 'Analyze Match'}
        </button>
        <div className="flex-1 overflow-auto rounded-md border border-white/10 bg-black/20 p-3" aria-live="polite">
          {!result && !error && !loading && <p className="text-xs text-white/30">Results will appear here.</p>}
          {loading && <p className="text-xs text-white/40">Comparing against the portfolio…</p>}
          {error && <p className="text-xs text-red-300/80">{error}</p>}
          {result && <p className="whitespace-pre-wrap text-xs leading-relaxed text-white/85">{result}</p>}
        </div>
      </form>
    </div>
  );
}

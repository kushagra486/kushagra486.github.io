'use client';

import { useEffect, useState } from 'react';
import { fetchLatestRepos } from '@/lib/githubAPI';
import { profile } from '@/lib/portfolioData';

export function GitHubStatsWidget() {
  const [stats, setStats] = useState<{ repoCount: number; stars: number } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLatestRepos('kushagra486', 20)
      .then((repos) => {
        if (cancelled) return;
        setStats({
          repoCount: repos.length,
          stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={profile.links.github}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <p className="text-xs text-white/50">GitHub</p>
      {error && <p className="mt-2 text-sm text-white/40">Unavailable</p>}
      {!error && !stats && <p className="mt-2 text-sm text-white/40">Loading…</p>}
      {stats && (
        <div className="mt-1 flex items-center gap-4">
          <div>
            <p className="text-2xl font-semibold text-white">{stats.repoCount}</p>
            <p className="text-[11px] text-white/50">recent repos</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">{stats.stars}</p>
            <p className="text-[11px] text-white/50">stars</p>
          </div>
        </div>
      )}
    </a>
  );
}

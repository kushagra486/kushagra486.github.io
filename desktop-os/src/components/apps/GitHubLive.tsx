'use client';

import { useEffect, useState } from 'react';
import { fetchLatestRepos, GitHubRepo } from '@/lib/githubAPI';

const USERNAME = 'kushagra486';

export function GitHubLive() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchLatestRepos(USERNAME)
      .then((data) => {
        if (!cancelled) setRepos(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load repos');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="text-sm text-white/60">Loading latest repositories…</p>;
  if (error) return <p className="text-sm text-red-300">{error}</p>;

  return (
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li key={repo.id} className="rounded-md border border-white/10 bg-white/5 p-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-cyan-300 hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && <p className="text-xs text-white/60">{repo.description}</p>}
          <div className="mt-1 flex gap-3 text-[11px] text-white/40">
            {repo.language && <span>{repo.language}</span>}
            <span>★ {repo.stargazers_count}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

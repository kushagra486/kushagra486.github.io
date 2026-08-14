'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubUser, GitHubUser } from '@/lib/githubAPI';
import { profile } from '@/lib/portfolioData';

export function GitHubActivityWidget() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubUser('kushagra486')
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const memberSince = user ? new Date(user.created_at).getFullYear() : null;

  return (
    <a
      href={profile.links.github}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <p className="text-xs text-white/50">GitHub Activity</p>
      {error && <p className="mt-2 text-sm text-white/40">Unavailable</p>}
      {!error && !user && <p className="mt-2 text-sm text-white/40">Loading…</p>}
      {user && (
        <div className="mt-1 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-semibold text-white">{user.public_repos}</p>
            <p className="text-[10px] text-white/50">public repos</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{user.followers}</p>
            <p className="text-[10px] text-white/50">followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{memberSince}</p>
            <p className="text-[10px] text-white/50">on GitHub since</p>
          </div>
        </div>
      )}
    </a>
  );
}

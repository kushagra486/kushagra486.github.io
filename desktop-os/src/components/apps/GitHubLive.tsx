'use client';

import { useEffect, useState } from 'react';
import { fetchLatestRepos, GitHubRepo } from '@/lib/githubAPI';
import { computeStats, ContributionDay, formatDay, useContributions } from '@/lib/contributions';
import { ContributionGraph, ContributionLegend } from '@/components/os/ContributionGraph';
import { Reveal } from '@/components/os/Reveal';

function ContributionsPanel() {
  const { data, error, loading, retry } = useContributions(USERNAME);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const stats = data ? computeStats(data.days) : null;

  return (
    <Reveal className="rounded-[14px] bg-white/[0.05] p-4 ring-[0.5px] ring-white/10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-white">
          {stats ? `${stats.total.toLocaleString()} contributions in the last year` : 'Contributions'}
        </h3>
        {stats && (
          <p className="text-[12px] text-white/55">
            Current streak <span className="font-semibold text-white">{stats.currentStreak}d</span> · Best{' '}
            <span className="font-semibold text-white">{stats.longestStreak}d</span>
            {stats.bestDay && (
              <>
                {' '}· Busiest day <span className="font-semibold text-white">{stats.bestDay.count}</span>
              </>
            )}
          </p>
        )}
      </div>
      {error ? (
        <p className="mt-3 text-[13px] text-white/60">
          Couldn&apos;t load contributions.{' '}
          <button onClick={retry} className="font-medium text-[#409cff] hover:underline">
            Retry
          </button>
        </p>
      ) : (
        <>
          <div className="mac-scroll mt-3 overflow-x-auto">
            <ContributionGraph days={data?.days ?? []} loading={loading} onHover={setHovered} cell={10} gap={3} />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="truncate text-[11.5px] text-white/55" aria-live="polite">
              {hovered
                ? `${hovered.count === 0 ? 'No' : hovered.count} contribution${hovered.count === 1 ? '' : 's'} on ${formatDay(hovered.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
                : 'Hover a day for details'}
            </p>
            <ContributionLegend />
          </div>
        </>
      )}
    </Reveal>
  );
}

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

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="px-1">
        <h2 className="text-[26px] font-bold tracking-tight text-white">GitHub</h2>
        <p className="text-[13px] text-white/50">Live activity from @{USERNAME}.</p>
      </div>
      <ContributionsPanel />
      <h3 className="px-1 pt-1 text-[13px] font-semibold text-white/50">Recently updated repositories</h3>
      {loading && <p className="px-1 text-sm text-white/60">Loading latest repositories…</p>}
      {error && <p className="px-1 text-sm text-red-300">{error}</p>}
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li key={repo.id} className="rounded-xl bg-white/[0.05] p-3 ring-[0.5px] ring-white/10">
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
    </div>
  );
}

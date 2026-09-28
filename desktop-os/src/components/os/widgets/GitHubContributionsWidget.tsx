'use client';

import { useState } from 'react';
import { ArrowUpRight, Flame, RotateCw } from 'lucide-react';
import { computeStats, ContributionDay, formatDay, useContributions } from '@/lib/contributions';
import { ContributionGraph } from '@/components/os/ContributionGraph';
import { GitHubMark } from '@/components/os/BrandMarks';
import { profile } from '@/lib/portfolioData';

const USERNAME = 'kushagra486';

/** Live GitHub contribution calendar with streak stats, refreshed in the background. */
export function GitHubContributionsWidget() {
  const { data, error, loading, retry } = useContributions(USERNAME);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const stats = data ? computeStats(data.days) : null;

  const readout = hovered
    ? `${hovered.count === 0 ? 'No' : hovered.count} contribution${hovered.count === 1 ? '' : 's'} · ${formatDay(hovered.date)}`
    : stats
      ? `${data!.total.toLocaleString()} contributions in the last year`
      : 'Loading contributions…';

  return (
    <div className="mac-widget p-3.5">
      <div className="flex items-center justify-between">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1.5 text-[13px] font-semibold text-white/90"
        >
          <GitHubMark className="h-3.5 w-3.5" />
          Contributions
          <ArrowUpRight className="h-3 w-3 text-white/40 transition group-hover:text-white/80" strokeWidth={2.5} />
        </a>
        {!error && (
          <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-white/50" title="Refreshes automatically">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39d353] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#39d353]" />
            </span>
            Live
          </span>
        )}
      </div>

      {error ? (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5">
          <p className="text-[12px] text-white/60">Couldn&apos;t load contributions.</p>
          <button
            onClick={retry}
            className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white/85 hover:bg-white/20"
          >
            <RotateCw className="h-3 w-3" strokeWidth={2.5} /> Retry
          </button>
        </div>
      ) : (
        <>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {[
              { label: 'Last year', value: stats?.total },
              { label: 'Current streak', value: stats ? `${stats.currentStreak}d` : undefined, flame: !!stats?.currentStreak },
              { label: 'Best streak', value: stats ? `${stats.longestStreak}d` : undefined },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/[0.06] px-2 py-1.5">
                <p className="flex items-center gap-0.5 text-[16px] font-semibold leading-none tracking-tight tabular-nums text-white">
                  {s.value ?? <span className="inline-block h-4 w-8 animate-pulse rounded bg-white/10" />}
                  {s.flame && <Flame className="h-3.5 w-3.5 text-[#ff9f0a]" strokeWidth={2.5} />}
                </p>
                <p className="mt-1 text-[10px] leading-tight text-white/50">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <ContributionGraph days={data?.days ?? []} loading={loading} onHover={setHovered} cell={8} gap={2} />
          </div>
          <p className="mt-2 h-3.5 truncate text-[11px] tabular-nums text-white/55" aria-live="polite">
            {readout}
          </p>
        </>
      )}
    </div>
  );
}

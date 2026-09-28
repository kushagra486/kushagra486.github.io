'use client';

import { useEffect, useState } from 'react';

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
  fetchedAt: number;
}

export interface ContributionStats {
  total: number;
  currentStreak: number;
  longestStreak: number;
  bestDay: ContributionDay | null;
}

// Public, CORS-enabled mirror of the GitHub contribution calendar (no token needed).
const endpoint = (username: string) => `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
const REFRESH_MS = 30 * 60 * 1000;

// One shared cache so the desktop widget, Notification Center and the GitHub app don't each fetch.
const cache = new Map<string, ContributionData>();
const inflight = new Map<string, Promise<ContributionData>>();

async function load(username: string, force = false): Promise<ContributionData> {
  const cached = cache.get(username);
  if (!force && cached && Date.now() - cached.fetchedAt < REFRESH_MS) return cached;
  const pending = inflight.get(username);
  if (pending) return pending;

  const request = fetch(endpoint(username))
    .then(async (res) => {
      if (!res.ok) throw new Error(`Contributions request failed: ${res.status}`);
      const json: { total: Record<string, number>; contributions: ContributionDay[] } = await res.json();
      const days = [...json.contributions].sort((a, b) => a.date.localeCompare(b.date));
      const data: ContributionData = {
        total: json.total.lastYear ?? days.reduce((sum, d) => sum + d.count, 0),
        days,
        fetchedAt: Date.now(),
      };
      cache.set(username, data);
      return data;
    })
    .finally(() => inflight.delete(username));

  inflight.set(username, request);
  return request;
}

/** Live contribution calendar: refreshes every 30 minutes and whenever the tab becomes visible again. */
export function useContributions(username: string) {
  const [data, setData] = useState<ContributionData | null>(() => cache.get(username) ?? null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const refresh = (force: boolean) =>
      load(username, force)
        .then((d) => {
          if (!cancelled) {
            setData(d);
            setError(null);
          }
        })
        .catch((err) => {
          if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load contributions');
        });

    refresh(attempt > 0);
    const interval = setInterval(() => refresh(true), REFRESH_MS);
    const onVisible = () => document.visibilityState === 'visible' && refresh(false);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [username, attempt]);

  return { data, error, loading: !data && !error, retry: () => setAttempt((n) => n + 1) };
}

export function computeStats(days: ContributionDay[]): ContributionStats {
  let longest = 0;
  let run = 0;
  let bestDay: ContributionDay | null = null;
  let total = 0;
  for (const day of days) {
    total += day.count;
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (!bestDay || day.count > bestDay.count) bestDay = day;
  }

  // Today not having a contribution *yet* shouldn't break the streak — start from yesterday then.
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) current++;

  return { total, currentStreak: current, longestStreak: longest, bestDay: bestDay && bestDay.count > 0 ? bestDay : null };
}

export function formatDay(date: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }) {
  // Parse as a local calendar date, not UTC midnight, so the label never shifts by a day.
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString([], opts);
}

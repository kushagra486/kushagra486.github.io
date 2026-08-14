const PREFIX = 'kushagra-os:game-stats:';

export function getStat(key: string, fallback = 0): number {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(PREFIX + key);
  return raw === null ? fallback : Number(raw);
}

export function setStat(key: string, value: number): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PREFIX + key, String(value));
}

export function bumpBest(key: string, value: number): number {
  const best = Math.max(getStat(key), value);
  setStat(key, best);
  return best;
}

/** Lower is better (e.g. move count). Missing/zero stat means "no record yet". */
export function bumpBestLow(key: string, value: number): number {
  const current = getStat(key);
  const best = current === 0 ? value : Math.min(current, value);
  setStat(key, best);
  return best;
}

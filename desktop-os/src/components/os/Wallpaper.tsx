'use client';

import { usePreferences, WallpaperTheme } from '@/lib/preferences';

const THEMES: Record<WallpaperTheme, { base: string; blobs: [string, string, string] }> = {
  aurora: {
    base: 'from-[#0a1a2e] via-[#0f2740] to-[#040810]',
    blobs: ['bg-cyan-400/20', 'bg-blue-500/20', 'bg-purple-500/10'],
  },
  sunset: {
    base: 'from-[#2e150a] via-[#40200f] to-[#0a0604]',
    blobs: ['bg-orange-400/20', 'bg-pink-500/20', 'bg-red-500/10'],
  },
  emerald: {
    base: 'from-[#0a2e1f] via-[#0f4030] to-[#04100a]',
    blobs: ['bg-emerald-400/20', 'bg-teal-500/20', 'bg-lime-500/10'],
  },
  nebula: {
    base: 'from-[#1a0a2e] via-[#271040] to-[#0a0410]',
    blobs: ['bg-fuchsia-400/20', 'bg-purple-500/20', 'bg-indigo-500/10'],
  },
};

export function Wallpaper() {
  const wallpaper = usePreferences((s) => s.wallpaper);
  const theme = THEMES[wallpaper];

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br ${theme.base}`}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className={`absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full ${theme.blobs[0]} blur-3xl`} />
      <div
        className={`absolute -bottom-32 -right-16 h-[28rem] w-[28rem] animate-pulse rounded-full ${theme.blobs[1]} blur-3xl`}
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className={`absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 animate-pulse rounded-full ${theme.blobs[2]} blur-3xl`}
        style={{ animationDelay: '3s' }}
      />
    </div>
  );
}

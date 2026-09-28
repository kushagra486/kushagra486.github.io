'use client';

import { usePreferences, WallpaperTheme } from '@/lib/preferences';

interface Theme {
  base: string;
  /** Three soft color fields that slowly drift, like a macOS dynamic wallpaper. */
  fields: [string, string, string];
  /** Colors for the flowing "wave" ribbons layered on top. */
  waves: [string, string];
}

const THEMES: Record<WallpaperTheme, Theme> = {
  // Deep blues and violets.
  aurora: {
    base: '#050a1f',
    fields: ['#1d4ed8', '#7c3aed', '#0ea5e9'],
    waves: ['#3b82f6', '#a855f7'],
  },
  // Warm golden-hour tones.
  sunset: {
    base: '#1a0a05',
    fields: ['#f97316', '#db2777', '#facc15'],
    waves: ['#fb923c', '#f43f5e'],
  },
  // Coastal greens.
  emerald: {
    base: '#03140f',
    fields: ['#059669', '#0d9488', '#65a30d'],
    waves: ['#34d399', '#2dd4bf'],
  },
  // Dusky magenta and indigo.
  nebula: {
    base: '#12051f',
    fields: ['#c026d3', '#4f46e5', '#db2777'],
    waves: ['#e879f9', '#818cf8'],
  },
};

export function Wallpaper() {
  const wallpaper = usePreferences((s) => s.wallpaper);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const t = THEMES[wallpaper];
  const anim = (name: string, seconds: number) => (reducedMotion ? undefined : `${name} ${seconds}s ease-in-out infinite`);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ background: t.base }}>
      <div
        className="absolute -left-[20%] -top-[30%] h-[90%] w-[80%] rounded-full opacity-70 blur-[90px]"
        style={{ background: t.fields[0], animation: anim('mac-drift-a', 22) }}
      />
      <div
        className="absolute -bottom-[35%] -right-[15%] h-[95%] w-[75%] rounded-full opacity-60 blur-[100px]"
        style={{ background: t.fields[1], animation: anim('mac-drift-b', 28) }}
      />
      <div
        className="absolute left-[30%] top-[35%] h-[55%] w-[45%] rounded-full opacity-40 blur-[90px]"
        style={{ background: t.fields[2], animation: anim('mac-drift-c', 34) }}
      />

      {/* Flowing ribbons — the signature swoosh of recent macOS wallpapers. */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ animation: anim('mac-drift-c', 40) }}
      >
        <defs>
          <linearGradient id="wave-a" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={t.waves[0]} stopOpacity="0" />
            <stop offset="0.5" stopColor={t.waves[0]} stopOpacity="0.55" />
            <stop offset="1" stopColor={t.waves[1]} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-b" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={t.waves[1]} stopOpacity="0" />
            <stop offset="0.45" stopColor={t.waves[1]} stopOpacity="0.45" />
            <stop offset="1" stopColor={t.waves[0]} stopOpacity="0" />
          </linearGradient>
          <filter id="wave-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <path
          d="M-100 620 C 250 420, 520 820, 860 600 S 1400 380, 1720 560 L 1720 980 L -100 980 Z"
          fill="url(#wave-a)"
          filter="url(#wave-blur)"
        />
        <path
          d="M-100 700 C 300 560, 600 900, 980 700 S 1450 520, 1720 700 L 1720 980 L -100 980 Z"
          fill="url(#wave-b)"
          filter="url(#wave-blur)"
        />
      </svg>

      {/* Subtle film grain + vignette for depth. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}

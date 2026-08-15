'use client';

import { usePreferences, WallpaperTheme } from '@/lib/preferences';

const WALLPAPER_OPTIONS: { id: WallpaperTheme; label: string; swatch: string }[] = [
  { id: 'aurora', label: 'Aurora (default)', swatch: 'from-cyan-400 to-blue-600' },
  { id: 'sunset', label: 'Sunset', swatch: 'from-orange-400 to-pink-600' },
  { id: 'emerald', label: 'Emerald', swatch: 'from-emerald-400 to-teal-600' },
  { id: 'nebula', label: 'Nebula', swatch: 'from-fuchsia-400 to-purple-600' },
];

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <section className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="text-[11px] text-white/40">{hint}</p>
      </div>
      <button
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-cyan-400' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 block h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </section>
  );
}

export function SystemPreferences() {
  const { wallpaper, setWallpaper, soundEnabled, toggleSound, reducedMotion, toggleReducedMotion } = usePreferences();

  return (
    <div className="space-y-5 text-sm">
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Wallpaper</p>
        <div className="grid grid-cols-2 gap-2">
          {WALLPAPER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setWallpaper(opt.id)}
              aria-pressed={wallpaper === opt.id}
              className={`overflow-hidden rounded-lg border text-left transition ${
                wallpaper === opt.id ? 'border-cyan-300' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`h-12 w-full bg-gradient-to-br ${opt.swatch}`} />
              <p className="px-1.5 py-1 text-[11px] text-white/70">{opt.label}</p>
            </button>
          ))}
        </div>
      </section>

      <Toggle label="Sound effects" hint="Click/open/close blips" checked={soundEnabled} onChange={toggleSound} />
      <Toggle
        label="Reduce motion"
        hint="Turns off ambient/looping animations (floating chips, glow, screensaver)"
        checked={reducedMotion}
        onChange={toggleReducedMotion}
      />

      <p className="text-[11px] text-white/30">Preferences are saved to this browser only.</p>
    </div>
  );
}

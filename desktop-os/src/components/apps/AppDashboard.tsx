'use client';

import { liveApps } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';

export function AppDashboard() {
  const openApp = useDesktopStore((s) => s.openApp);

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/50">
        Click any app to open it live, right here on the desktop.
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {liveApps.map((app) => (
          <button
            key={app.slug}
            onClick={() => openApp({ name: app.name, url: app.url })}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition hover:border-cyan-300/30 hover:bg-white/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              {app.emoji}
            </span>
            <span className="text-[11px] leading-tight text-white/80">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

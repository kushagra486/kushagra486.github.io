'use client';

import { useState } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';

function Frame({ url, name }: { url: string; name: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10 bg-black/30">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">
          Loading {name}…
        </div>
      )}
      <iframe src={url} title={name} onLoad={() => setLoading(false)} className="h-full w-full" />
    </div>
  );
}

export function AppViewer() {
  const activeApp = useDesktopStore((s) => s.activeApp);
  const [reloadKey, setReloadKey] = useState(0);

  if (!activeApp) {
    return <p className="text-sm text-white/60">No app selected.</p>;
  }

  return (
    <div className="flex h-[70vh] flex-col gap-2">
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="rounded-md bg-white/10 px-2 py-1 text-white/80 transition hover:bg-white/20"
        >
          ↻ Reload
        </button>
        <span className="min-w-0 flex-1 truncate rounded-md bg-black/30 px-2 py-1 text-white/50">
          {activeApp.url}
        </span>
        <a
          href={activeApp.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-md bg-cyan-400/90 px-2 py-1 font-medium text-black transition hover:bg-cyan-300"
        >
          Open in new tab ↗
        </a>
      </div>

      <Frame key={`${activeApp.url}-${reloadKey}`} url={activeApp.url} name={activeApp.name} />

      <p className="text-[11px] text-white/40">
        Some sites don&apos;t allow being embedded and may show blank here — use &quot;Open in new
        tab&quot; if that happens.
      </p>
    </div>
  );
}

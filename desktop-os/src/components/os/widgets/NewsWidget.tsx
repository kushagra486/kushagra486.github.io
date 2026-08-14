'use client';

import { useState } from 'react';
import { liveApps } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';

const newsApp = liveApps.find((a) => a.slug === 'bharat-news-ai')!;

export function NewsWidget() {
  const openApp = useDesktopStore((s) => s.openApp);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between px-4 pt-3">
        <p className="flex items-center gap-1.5 text-xs text-white/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          Live · {newsApp.name}
        </p>
        <button
          onClick={() => openApp({ name: newsApp.name, url: newsApp.url })}
          className="text-[10px] text-cyan-300/80 transition hover:text-cyan-200"
        >
          Open ↗
        </button>
      </div>
      <button
        onClick={() => openApp({ name: newsApp.name, url: newsApp.url })}
        className="relative mt-2 block h-40 w-full overflow-hidden bg-black/30"
        aria-label={`Open ${newsApp.name}`}
      >
        {!loaded && (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-white/40">
            Loading live feed…
          </span>
        )}
        <iframe
          src={newsApp.url}
          title={newsApp.name}
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          className="pointer-events-none h-[400px] w-[250%] origin-top-left scale-[0.4]"
        />
      </button>
    </div>
  );
}

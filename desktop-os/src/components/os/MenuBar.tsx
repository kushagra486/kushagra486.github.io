'use client';

import { useEffect, useState } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';

export function MenuBar() {
  const windows = useDesktopStore((s) => s.windows);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Client-only: avoids a server/client hydration mismatch on the initial timestamp.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const focused = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .reduce<(typeof windows)[number] | null>((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between border-b border-white/10 bg-black/40 px-3 text-xs text-white/85 backdrop-blur-xl sm:px-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">🖥️</span>
        <span className="font-semibold">Kushagra OS</span>
        {focused && <span className="hidden text-white/50 sm:inline">{focused.title}</span>}
      </div>
      <div className="flex items-center gap-3 tabular-nums text-white/70">
        {now && (
          <>
            <span className="hidden sm:inline">
              {now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </>
        )}
      </div>
    </div>
  );
}

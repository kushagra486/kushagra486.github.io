'use client';

import { useDesktopStore } from '@/store/useDesktopStore';

export function Taskbar({ onToggleWidgets }: { onToggleWidgets: () => void }) {
  const windows = useDesktopStore((s) => s.windows);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-white/15 bg-black/40 px-4 py-2 backdrop-blur-xl">
      <span className="pr-1 text-sm font-semibold tracking-wide text-white/90">Kushagra OS</span>
      <button
        onClick={onToggleWidgets}
        aria-label="Toggle widgets"
        className="rounded-md px-2 py-1 text-xs text-white/80 transition hover:bg-white/10"
      >
        📌 Widgets
      </button>
      <div className="flex flex-1 gap-2">
        {openWindows.map((w) => (
          <button
            key={w.id}
            onClick={() => focusWindow(w.id)}
            className={`rounded-md px-3 py-1 text-xs text-white/90 transition ${
              w.isMinimized ? 'bg-white/10' : 'bg-white/20'
            } hover:bg-white/25`}
          >
            {w.title}
          </button>
        ))}
      </div>
      <span className="text-xs text-white/60">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}

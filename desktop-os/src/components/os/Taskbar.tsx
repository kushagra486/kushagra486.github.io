'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';
import { usePreferences } from '@/lib/preferences';

interface DockApp {
  id: string;
  title: string;
  icon: string;
}

export function Taskbar({ apps, onToggleWidgets }: { apps: readonly DockApp[]; onToggleWidgets: () => void }) {
  const windows = useDesktopStore((s) => s.windows);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  function handleClick(app: DockApp) {
    const win = windows.find((w) => w.id === app.id);
    sound.click();
    if (!win || !win.isOpen) {
      openWindow(app.id, app.title);
      if (!reducedMotion) {
        setBouncingId(app.id);
        setTimeout(() => setBouncingId((v) => (v === app.id ? null : v)), 500);
      }
    } else if (win.isMinimized) {
      focusWindow(app.id);
    } else {
      minimizeWindow(app.id);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-2 z-50 flex justify-center px-2">
      <div className="flex max-w-full items-end gap-1 overflow-x-auto rounded-2xl border border-white/15 bg-black/40 px-2 py-1.5 shadow-2xl backdrop-blur-xl">
        <button
          onClick={onToggleWidgets}
          aria-label="Toggle widgets"
          title="Widgets"
          className="group flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition hover:-translate-y-1 hover:bg-white/10"
        >
          <span className="text-xl transition-transform group-hover:scale-110">📌</span>
        </button>
        <div className="mx-1 h-8 w-px shrink-0 bg-white/15" />
        {apps.map((app) => {
          const win = windows.find((w) => w.id === app.id);
          const isOpen = !!win?.isOpen;
          return (
            <button
              key={app.id}
              onClick={() => handleClick(app)}
              title={app.title}
              aria-label={app.title}
              aria-pressed={isOpen}
              className="group flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <motion.span
                className="text-xl drop-shadow transition-transform group-hover:scale-125"
                animate={bouncingId === app.id ? { y: [0, -16, 0, -8, 0] } : { y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {app.icon}
              </motion.span>
              <span className={`h-1 w-1 rounded-full ${isOpen ? 'bg-cyan-300' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

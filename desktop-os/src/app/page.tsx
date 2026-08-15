'use client';

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopIcon } from '@/components/os/DesktopIcon';
import { Taskbar } from '@/components/os/Taskbar';
import { WindowManager } from '@/components/os/WindowManager';
import { Wallpaper } from '@/components/os/Wallpaper';
import { BootScreen } from '@/components/os/BootScreen';
import { GreetingPopup } from '@/components/os/GreetingPopup';
import { WidgetsPanel } from '@/components/os/WidgetsPanel';
import { DesktopWidgets } from '@/components/os/DesktopWidgets';
import { DesktopHero } from '@/components/os/DesktopHero';
import { MenuBar } from '@/components/os/MenuBar';
import { GlobalShortcuts } from '@/components/os/GlobalShortcuts';
import { Screensaver } from '@/components/os/Screensaver';
import { APPS, WINDOW_ONLY_APPS } from '@/lib/apps';
import { useDesktopStore } from '@/store/useDesktopStore';

export default function Home() {
  const windows = useDesktopStore((s) => s.windows);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const [booted, setBooted] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const windowsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>

      <Wallpaper />
      <DesktopHero />
      <MenuBar />

      <div className="relative z-10 flex flex-row flex-wrap gap-1 p-3 pt-10 sm:flex-col sm:gap-2 sm:p-4 sm:pt-12 sm:w-24">
        {APPS.map((app) => (
          <DesktopIcon key={app.id} id={app.id} title={app.title} icon={app.icon} />
        ))}
      </div>

      <DesktopWidgets />

      <div ref={windowsContainerRef} className="pointer-events-none fixed inset-0 z-20">
        {[...APPS, ...WINDOW_ONLY_APPS].map(({ id, Component }) => {
          const win = windows.find((w) => w.id === id);
          if (!win || !win.isOpen) return null;
          return (
            <WindowManager
              key={id}
              id={id}
              title={win.title}
              zIndex={win.zIndex}
              isMinimized={win.isMinimized}
              constraintsRef={windowsContainerRef}
            >
              <Component />
            </WindowManager>
          );
        })}
      </div>

      {booted && <GreetingPopup onOpenAssistant={() => openWindow('ai-assistant', 'AI Assistant')} />}

      <WidgetsPanel open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />

      <Taskbar apps={APPS} onToggleWidgets={() => setWidgetsOpen((v) => !v)} />

      <GlobalShortcuts />
      <Screensaver />
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopIcon } from '@/components/os/DesktopIcon';
import { ScreenFrame } from '@/components/os/ScreenFrame';
import { Taskbar } from '@/components/os/Taskbar';
import { WindowManager } from '@/components/os/WindowManager';
import { Wallpaper } from '@/components/os/Wallpaper';
import { BootScreen } from '@/components/os/BootScreen';
import { DesktopAssistant } from '@/components/os/DesktopAssistant';
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
  const [booted, setBooted] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const windowsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ScreenFrame>
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>

        <Wallpaper />
        <DesktopHero />
        <MenuBar />

        {/* Mobile: a simple wrapping row grid. Desktop: a height-bounded column that wraps into
            new columns once it runs out of vertical room — like a real OS icon grid — instead
            of a single column that could overflow past the bottom of the screen. */}
        <div className="relative z-10 flex flex-row flex-wrap gap-1 p-3 pt-10 sm:hidden">
          {APPS.map((app) => (
            <DesktopIcon key={app.id} id={app.id} title={app.title} icon={app.icon} />
          ))}
        </div>
        <div className="absolute left-0 top-12 z-10 hidden sm:flex sm:flex-col sm:flex-wrap sm:content-start sm:gap-1 sm:bottom-20 sm:p-3 sm:pt-2">
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

        {booted && <DesktopAssistant />}

        <WidgetsPanel open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />

        <Taskbar apps={APPS} onToggleWidgets={() => setWidgetsOpen((v) => !v)} />

        <GlobalShortcuts />
        <Screensaver />
      </div>
    </ScreenFrame>
  );
}

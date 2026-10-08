'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
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
import { StatusBar } from '@/components/ios/StatusBar';
import { HomeScreen } from '@/components/ios/HomeScreen';
import { IOSDock } from '@/components/ios/IOSDock';
import { APPS, WINDOW_ONLY_APPS } from '@/lib/apps';
import { useDesktopStore } from '@/store/useDesktopStore';
import { usePreferences } from '@/lib/preferences';

const iconGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};

export default function Home() {
  const windows = useDesktopStore((s) => s.windows);
  const widgetsOpen = useDesktopStore((s) => s.widgetsOpen);
  const setWidgetsOpen = useDesktopStore((s) => s.setWidgetsOpen);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [booted, setBooted] = useState(false);
  const windowsContainerRef = useRef<HTMLDivElement>(null);

  const focusedId = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .reduce<(typeof windows)[number] | null>((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null)?.id;

  const icons = APPS.map((app) => <DesktopIcon key={app.id} id={app.id} title={app.title} appIcon={app.appIcon} />);

  return (
    // "user" follows the OS-level Reduce Motion setting; the in-app toggle forces it on.
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <ScreenFrame>
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>

          <Wallpaper />
          <DesktopHero />
          <MenuBar />
          <StatusBar />

          {/* Mobile gets an iOS home screen; desktop a height-bounded icon column that wraps into
              new columns once it runs out of vertical room, like a real macOS desktop. */}
          <HomeScreen booted={booted} />
          <motion.div
            variants={iconGrid}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            className="absolute left-0 top-9 z-10 hidden sm:bottom-24 sm:flex sm:flex-col sm:flex-wrap sm:content-start sm:gap-0.5 sm:p-2"
          >
            {icons}
          </motion.div>

          <DesktopWidgets />

          <div ref={windowsContainerRef} className="pointer-events-none fixed inset-0 z-20">
            <AnimatePresence>
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
                    isFocused={focusedId === id}
                    constraintsRef={windowsContainerRef}
                  >
                    <Component />
                  </WindowManager>
                );
              })}
            </AnimatePresence>
          </div>

          {booted && <DesktopAssistant />}

          <WidgetsPanel open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />

          <Taskbar apps={APPS} />
          <IOSDock booted={booted} />

          <GlobalShortcuts />
          <Screensaver />
        </div>
      </ScreenFrame>
    </MotionConfig>
  );
}

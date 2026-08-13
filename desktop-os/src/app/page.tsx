'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopIcon } from '@/components/os/DesktopIcon';
import { Taskbar } from '@/components/os/Taskbar';
import { WindowManager } from '@/components/os/WindowManager';
import { Wallpaper } from '@/components/os/Wallpaper';
import { BootScreen } from '@/components/os/BootScreen';
import { AIMantram } from '@/components/apps/AIMantram';
import { NeonAirDraw } from '@/components/apps/NeonAirDraw';
import { SudhaVatika } from '@/components/apps/SudhaVatika';
import { GitHubLive } from '@/components/apps/GitHubLive';
import { useDesktopStore } from '@/store/useDesktopStore';

const APPS = [
  { id: 'ai-mantram', title: 'AI Mantram Console', icon: '🖥️', Component: AIMantram },
  { id: 'neon-air-draw', title: 'Neon Air Draw Ultra PRO', icon: '🎨', Component: NeonAirDraw },
  { id: 'sudha-vatika', title: 'Sudha Vatika Dashboard', icon: '🏡', Component: SudhaVatika },
  { id: 'github-live', title: 'Live GitHub Feed', icon: '🐙', Component: GitHubLive },
] as const;

export default function Home() {
  const windows = useDesktopStore((s) => s.windows);
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>

      <Wallpaper />

      <div className="relative z-10 flex flex-row flex-wrap gap-1 p-3 sm:flex-col sm:gap-2 sm:p-4 sm:w-24">
        {APPS.map((app) => (
          <DesktopIcon key={app.id} id={app.id} title={app.title} icon={app.icon} />
        ))}
      </div>

      {APPS.map(({ id, title, Component }) => {
        const win = windows.find((w) => w.id === id);
        if (!win || !win.isOpen) return null;
        return (
          <WindowManager key={id} id={id} title={title} zIndex={win.zIndex} isMinimized={win.isMinimized}>
            <Component />
          </WindowManager>
        );
      })}

      <Taskbar />
    </div>
  );
}

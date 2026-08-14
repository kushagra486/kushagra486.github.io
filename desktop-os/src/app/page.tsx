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
import { AboutMe } from '@/components/apps/AboutMe';
import { Projects } from '@/components/apps/Projects';
import { Certifications } from '@/components/apps/Certifications';
import { AIAssistant } from '@/components/apps/AIAssistant';
import { Games } from '@/components/apps/Games';
import { AIMantram } from '@/components/apps/AIMantram';
import { NeonAirDraw } from '@/components/apps/NeonAirDraw';
import { SudhaVatika } from '@/components/apps/SudhaVatika';
import { GitHubLive } from '@/components/apps/GitHubLive';
import { useDesktopStore } from '@/store/useDesktopStore';

const APPS = [
  { id: 'about-me', title: 'About Me', icon: '🧑‍💻', Component: AboutMe },
  { id: 'projects', title: 'Projects', icon: '🗂️', Component: Projects },
  { id: 'certifications', title: 'Certifications', icon: '🏅', Component: Certifications },
  { id: 'ai-assistant', title: 'AI Assistant', icon: '💬', Component: AIAssistant },
  { id: 'games', title: 'Games', icon: '🎮', Component: Games },
  { id: 'ai-mantram', title: 'AI Mantram Console', icon: '🖥️', Component: AIMantram },
  { id: 'neon-air-draw', title: 'Neon Air Draw Ultra PRO', icon: '🎨', Component: NeonAirDraw },
  { id: 'sudha-vatika', title: 'Sudha Vatika Dashboard', icon: '🏡', Component: SudhaVatika },
  { id: 'github-live', title: 'Live GitHub Feed', icon: '🐙', Component: GitHubLive },
] as const;

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

      <div className="relative z-10 flex flex-row flex-wrap gap-1 p-3 sm:flex-col sm:gap-2 sm:p-4 sm:w-24">
        {APPS.map((app) => (
          <DesktopIcon key={app.id} id={app.id} title={app.title} icon={app.icon} />
        ))}
      </div>

      <div ref={windowsContainerRef} className="pointer-events-none fixed inset-0 z-20">
        {APPS.map(({ id, title, Component }) => {
          const win = windows.find((w) => w.id === id);
          if (!win || !win.isOpen) return null;
          return (
            <WindowManager
              key={id}
              id={id}
              title={title}
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

      <Taskbar onToggleWidgets={() => setWidgetsOpen((v) => !v)} />
    </div>
  );
}

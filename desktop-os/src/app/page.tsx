'use client';

import { DesktopIcon } from '@/components/os/DesktopIcon';
import { Taskbar } from '@/components/os/Taskbar';
import { WindowManager } from '@/components/os/WindowManager';
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1a2e] via-[#0f2740] to-[#040810]">
      <div className="grid grid-cols-1 gap-2 p-4 sm:w-24">
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

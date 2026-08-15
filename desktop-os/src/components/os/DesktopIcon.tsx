'use client';

import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
}

export function DesktopIcon({ id, title, icon }: DesktopIconProps) {
  const openWindow = useDesktopStore((s) => s.openWindow);

  function handleOpen() {
    sound.open();
    openWindow(id, title);
  }

  return (
    <button
      onClick={handleOpen}
      aria-label={`Open ${title}`}
      className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-white/90 outline-none transition hover:bg-white/10 focus-visible:bg-white/15 active:scale-95"
    >
      <span aria-hidden="true" className="text-3xl drop-shadow-lg transition-transform group-hover:scale-105">
        {icon}
      </span>
      <span className="text-center text-xs leading-tight text-white/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        {title}
      </span>
    </button>
  );
}

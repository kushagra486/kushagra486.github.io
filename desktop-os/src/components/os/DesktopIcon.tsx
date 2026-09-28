'use client';

import { motion, Variants } from 'framer-motion';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';

interface DesktopIconProps {
  id: string;
  title: string;
  appIcon: AppIconStyle;
}

export const desktopIconVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 24 } },
};

export function DesktopIcon({ id, title, appIcon }: DesktopIconProps) {
  const openWindow = useDesktopStore((s) => s.openWindow);

  function handleOpen() {
    sound.open();
    openWindow(id, title);
  }

  return (
    <motion.button
      variants={desktopIconVariants}
      onClick={handleOpen}
      aria-label={`Open ${title}`}
      whileTap={{ scale: 0.94 }}
      className="group flex w-[84px] cursor-pointer flex-col items-center gap-1 rounded-lg p-1.5 outline-none"
    >
      <span className="rounded-[14px] p-1 transition-colors group-hover:bg-white/10 group-focus-visible:bg-white/20">
        <AppIcon icon={appIcon} size={46} />
      </span>
      <span className="rounded-[5px] px-1.5 py-px text-center text-[11.5px] font-medium leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] group-focus-visible:bg-[#0a84ff] group-focus-visible:[text-shadow:none]">
        {title}
      </span>
    </motion.button>
  );
}

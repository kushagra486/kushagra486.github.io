'use client';

import { motion } from 'framer-motion';
import { ClockWidget } from '@/components/os/widgets/ClockWidget';
import { AchievementsWidget } from '@/components/os/widgets/AchievementsWidget';
import { GitHubStreakWidget } from '@/components/os/widgets/GitHubStreakWidget';
import { NewsWidget } from '@/components/os/widgets/NewsWidget';
import { useDesktopStore } from '@/store/useDesktopStore';

/** Widgets pinned on the desktop. They step aside while Notification Center is open, as on macOS. */
export function DesktopWidgets() {
  const widgetsOpen = useDesktopStore((s) => s.widgetsOpen);
  return (
    <motion.div
      animate={{ opacity: widgetsOpen ? 0 : 1, x: widgetsOpen ? 24 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={`absolute right-3 top-10 z-10 hidden w-64 space-y-2.5 sm:block ${widgetsOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <ClockWidget />
      <NewsWidget />
      <AchievementsWidget />
      <GitHubStreakWidget />
    </motion.div>
  );
}

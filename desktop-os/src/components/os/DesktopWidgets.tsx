'use client';

import { motion } from 'framer-motion';
import { ClockWidget } from '@/components/os/widgets/ClockWidget';
import { AchievementsWidget } from '@/components/os/widgets/AchievementsWidget';
import { GitHubContributionsWidget } from '@/components/os/widgets/GitHubContributionsWidget';
import { useDesktopStore } from '@/store/useDesktopStore';

/**
 * Widgets pinned on the desktop (more live in Notification Center). They step aside while
 * Notification Center is open, as on macOS, and scroll rather than run under the dock.
 */
export function DesktopWidgets() {
  const widgetsOpen = useDesktopStore((s) => s.widgetsOpen);
  return (
    <motion.div
      animate={{ opacity: widgetsOpen ? 0 : 1, x: widgetsOpen ? 24 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={`mac-scroll absolute right-3 top-10 z-10 hidden max-h-[calc(100%-8rem)] w-64 space-y-2.5 overflow-y-auto sm:block ${widgetsOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <ClockWidget />
      <GitHubContributionsWidget />
      <AchievementsWidget />
    </motion.div>
  );
}

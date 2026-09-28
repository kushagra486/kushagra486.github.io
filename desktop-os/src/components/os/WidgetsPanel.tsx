'use client';

import { Children, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockWidget } from '@/components/os/widgets/ClockWidget';
import { CalendarWidget } from '@/components/os/widgets/CalendarWidget';
import { WeatherWidget } from '@/components/os/widgets/WeatherWidget';
import { GitHubStatsWidget } from '@/components/os/widgets/GitHubStatsWidget';
import { GitHubActivityWidget } from '@/components/os/widgets/GitHubActivityWidget';
import { AchievementsWidget } from '@/components/os/widgets/AchievementsWidget';
import { GamesWidget } from '@/components/os/widgets/GamesWidget';
import { NewsWidget } from '@/components/os/widgets/NewsWidget';
import { VisitorBadgesWidget } from '@/components/os/widgets/VisitorBadgesWidget';
import { WakaTimeWidget } from '@/components/os/widgets/WakaTimeWidget';

function Stagger({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 360, damping: 32, delay: i * 0.035 }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

/** macOS Notification Center: widgets float in from the right edge over the desktop. */
export function WidgetsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/10"
          />
          <motion.aside
            aria-label="Notification Center"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="mac-scroll fixed bottom-[84px] right-2 top-9 z-[160] w-[min(calc(100%-1rem),20rem)] space-y-2.5 overflow-y-auto pb-2 pr-1"
          >
            <div className="flex items-center justify-between px-1 pb-0.5">
              <p className="text-[13px] font-semibold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">Widgets</p>
              <button
                aria-label="Close widgets"
                onClick={onClose}
                className="mac-menu rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white/80 hover:text-white"
              >
                Done
              </button>
            </div>
            <Stagger>
              <ClockWidget />
              <WeatherWidget />
              <CalendarWidget />
              <NewsWidget />
              <WakaTimeWidget />
              <VisitorBadgesWidget />
              <AchievementsWidget />
              <GitHubActivityWidget />
              <GitHubStatsWidget />
              <GamesWidget />
            </Stagger>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

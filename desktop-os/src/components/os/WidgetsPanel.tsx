'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ClockWidget } from '@/components/os/widgets/ClockWidget';
import { CalendarWidget } from '@/components/os/widgets/CalendarWidget';
import { WeatherWidget } from '@/components/os/widgets/WeatherWidget';
import { GitHubStatsWidget } from '@/components/os/widgets/GitHubStatsWidget';
import { GitHubActivityWidget } from '@/components/os/widgets/GitHubActivityWidget';
import { AchievementsWidget } from '@/components/os/widgets/AchievementsWidget';
import { GamesWidget } from '@/components/os/widgets/GamesWidget';

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
            className="fixed inset-0 z-[150] bg-black/20 sm:bg-transparent"
          />
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-14 left-2 top-4 z-[160] w-72 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0a1a2e]/90 p-3 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-white">Widgets</p>
              <button aria-label="Close widgets" onClick={onClose} className="text-white/50 hover:text-white/90">
                ✕
              </button>
            </div>
            <ClockWidget />
            <WeatherWidget />
            <CalendarWidget />
            <AchievementsWidget />
            <GitHubActivityWidget />
            <GitHubStatsWidget />
            <GamesWidget />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

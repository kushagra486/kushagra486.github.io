'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { APPS } from '@/lib/apps';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';

const VIEWER_ICON: AppIconStyle = { Glyph: Globe, gradient: 'from-sky-400 to-blue-600' };

function SignalBars() {
  return (
    <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor" aria-hidden="true">
      <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Z" />
      <path d="M8 5.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.2 7.2 0 0 0 8 3.8c-1.9 0-3.6.7-4.9 1.9L4.3 7A5.4 5.4 0 0 1 8 5.6Z" />
      <path d="M8 9c.6 0 1.1.2 1.5.6L8 11.3 6.5 9.6c.4-.4.9-.6 1.5-.6Z" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg viewBox="0 0 27 13" className="h-[12px] w-[26px]" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" />
      <path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

/**
 * iOS-style status bar (mobile only): time, a Dynamic Island that briefly expands with the
 * app you just opened, and status glyphs. Tapping the right side opens the widgets view.
 */
export function StatusBar() {
  const windows = useDesktopStore((s) => s.windows);
  const setWidgetsOpen = useDesktopStore((s) => s.setWidgetsOpen);
  const setSpotlightOpen = useDesktopStore((s) => s.setSpotlightOpen);
  const [now, setNow] = useState<Date | null>(null);
  const [activity, setActivity] = useState<{ id: string; title: string } | null>(null);
  const lastFocused = useRef<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  const focused = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .reduce<(typeof windows)[number] | null>((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null);

  // Expand the island for a moment whenever a different app comes to the front.
  useEffect(() => {
    const id = focused?.id ?? null;
    if (id === lastFocused.current) return;
    lastFocused.current = id;
    if (!focused) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActivity({ id: focused.id, title: focused.title });
    const t = setTimeout(() => setActivity(null), 1800);
    return () => clearTimeout(t);
  }, [focused]);

  const activityIcon = activity ? (APPS.find((a) => a.id === activity.id)?.appIcon ?? VIEWER_ICON) : null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-between px-7 text-white sm:hidden [text-shadow:0_0.5px_1px_rgba(0,0,0,0.3)]">
      <span className="w-14 text-[15px] font-semibold tabular-nums tracking-tight">
        {now ? now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M$/i, '') : ''}
      </span>

      <motion.button
        type="button"
        aria-label="Search"
        onClick={() => setSpotlightOpen(true)}
        animate={{ width: activity ? 164 : 104 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="absolute left-1/2 top-[7px] flex h-[30px] -translate-x-1/2 items-center justify-between overflow-hidden rounded-full bg-black px-2"
      >
        <AnimatePresence mode="popLayout">
          {activity && activityIcon && (
            <motion.span
              key={activity.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <AppIcon icon={activityIcon} size={20} />
              <span className="truncate text-[12px] font-semibold text-white">{activity.title}</span>
            </motion.span>
          )}
        </AnimatePresence>
        {activity && <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#30d158]" />}
      </motion.button>

      <button
        type="button"
        aria-label="Open widgets"
        onClick={() => setWidgetsOpen((v) => !v)}
        className="flex w-20 items-center justify-end gap-[5px]"
      >
        <SignalBars />
        <WifiGlyph />
        <BatteryGlyph />
      </button>
    </div>
  );
}

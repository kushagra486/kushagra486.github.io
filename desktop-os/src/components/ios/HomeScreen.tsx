'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { APPS } from '@/lib/apps';
import { profile } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';
import { GitHubContributionsWidget } from '@/components/os/widgets/GitHubContributionsWidget';

export const DOCK_IDS = ['about-me', 'projects', 'ai-assistant', 'contact'] as const;
const homeApps = APPS.filter((a) => !(DOCK_IDS as readonly string[]).includes(a.id));
const PAGES = [homeApps.slice(0, 8), homeApps.slice(8)];
const LONG_PRESS_MS = 480;
const AI_GRADIENT = '#ff9f0a,#ff375f,#bf5af2,#0a84ff,#64d2ff,#ff9f0a';

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 24 } },
};

export function HomeIcon({
  id,
  title,
  appIcon,
  jiggle,
  index,
  onLongPress,
  showLabel = true,
  size = 60,
}: {
  id: string;
  title: string;
  appIcon: AppIconStyle;
  jiggle: boolean;
  index: number;
  onLongPress: () => void;
  showLabel?: boolean;
  size?: number;
}) {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressed = useRef(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  function clear() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      aria-label={`Open ${title}`}
      onPointerDown={(e) => {
        longPressed.current = false;
        start.current = { x: e.clientX, y: e.clientY };
        timer.current = setTimeout(() => {
          longPressed.current = true;
          onLongPress();
        }, LONG_PRESS_MS);
      }}
      onPointerMove={(e) => {
        // A swipe between pages is not a long press.
        if (start.current && Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 10) clear();
      }}
      onPointerUp={clear}
      onPointerLeave={clear}
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        if (longPressed.current || jiggle) return;
        sound.open();
        openWindow(id, title);
      }}
      className="flex select-none flex-col items-center gap-1.5 outline-none [-webkit-touch-callout:none]"
    >
      <motion.span
        animate={jiggle ? { rotate: [-2.2, 2.2, -2.2] } : { rotate: 0 }}
        transition={
          jiggle ? { duration: 0.26, repeat: Infinity, ease: 'easeInOut', delay: (index % 5) * 0.04 } : { duration: 0.15 }
        }
        whileTap={jiggle ? undefined : { scale: 0.88, filter: 'brightness(0.7)' }}
        className="block"
      >
        <AppIcon icon={appIcon} size={size} />
      </motion.span>
      {showLabel && (
        <span className="w-[72px] truncate text-center text-[11.5px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
          {title}
        </span>
      )}
    </motion.button>
  );
}

function ProfileWidget() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={() => {
        sound.open();
        openWindow('about-me', 'About Me');
      }}
      whileTap={{ scale: 0.97 }}
      className="mac-widget col-span-4 flex items-center gap-4 p-4 text-left"
    >
      <span className="relative h-[62px] w-[62px] shrink-0">
        <span className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 0deg, ${AI_GRADIENT})` }} />
        <span className="absolute inset-[3px] flex items-center justify-center rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 text-lg font-semibold text-white">
          {initials}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[19px] font-bold tracking-tight text-white">{profile.name}</span>
        <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-white/70">{profile.role}</span>
        <span className="mt-1 flex items-center gap-1 text-[11px] text-white/45">
          <MapPin className="h-3 w-3" /> {profile.location}
        </span>
      </span>
    </motion.button>
  );
}

/** iOS home screen: swipeable pages of apps and widgets, page dots, Search pill, jiggle mode. */
export function HomeScreen({ booted }: { booted: boolean }) {
  const setSpotlightOpen = useDesktopStore((s) => s.setSpotlightOpen);
  const [page, setPage] = useState(0);
  const [jiggle, setJiggle] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!jiggle) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setJiggle(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [jiggle]);

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className="absolute inset-x-0 bottom-[112px] top-11 z-10 sm:hidden">
      <AnimatePresence>
        {jiggle && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setJiggle(false)}
            className="mac-menu absolute right-4 top-1 z-20 rounded-full px-3.5 py-1 text-[13px] font-semibold text-white"
          >
            Done
          </motion.button>
        )}
      </AnimatePresence>

      <div
        ref={scrollerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
        }}
        onClick={(e) => {
          if (jiggle && e.target === e.currentTarget) setJiggle(false);
        }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PAGES.map((apps, p) => (
          <motion.div
            key={p}
            variants={gridVariants}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            onClick={(e) => {
              if (jiggle && e.target === e.currentTarget) setJiggle(false);
            }}
            className="grid h-full w-full shrink-0 snap-center auto-rows-min grid-cols-4 content-start justify-items-center gap-x-2 gap-y-5 px-5 pt-3"
          >
            {p === 0 ? (
              <ProfileWidget />
            ) : (
              <motion.div variants={itemVariants} className="col-span-4 w-full">
                <GitHubContributionsWidget />
              </motion.div>
            )}
            {apps.map((app, i) => (
              <HomeIcon
                key={app.id}
                id={app.id}
                title={app.title}
                appIcon={app.appIcon}
                jiggle={jiggle}
                index={i}
                onLongPress={() => setJiggle(true)}
              />
            ))}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-x-0 -bottom-[6px] flex flex-col items-center gap-2">
        <div className="flex gap-2" role="tablist" aria-label="Home screen pages">
          {PAGES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={page === i}
              aria-label={`Page ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[7px] w-[7px] rounded-full transition-colors ${page === i ? 'bg-white' : 'bg-white/35'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSpotlightOpen(true)}
          className="mac-glass flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[12.5px] font-medium text-white/90 active:scale-95"
        >
          <Search className="h-3 w-3" strokeWidth={2.6} /> Search
        </button>
      </div>
    </div>
  );
}

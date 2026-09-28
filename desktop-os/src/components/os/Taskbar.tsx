'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';
import { usePreferences } from '@/lib/preferences';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';
import { Launchpad } from '@/components/os/Launchpad';

interface DockApp {
  id: string;
  title: string;
  appIcon: AppIconStyle;
}

const LAUNCHPAD_ICON: AppIconStyle = { Glyph: LayoutGrid, gradient: 'from-zinc-300 to-zinc-500' };
const MAGNIFICATION = 1.7;
const INFLUENCE_PX = 140;

/** Picks a base icon size that lets the whole dock fit the (letterboxed) screen width. */
function useBaseSize(count: number) {
  const [base, setBase] = useState(46);
  useEffect(() => {
    function measure() {
      const frame = document.querySelector('.screen-frame');
      const width = frame?.clientWidth ?? window.innerWidth;
      const mobile = width < 640;
      // Leave room for magnified neighbours on desktop; mobile scrolls instead.
      const fit = (width * (mobile ? 1 : 0.78)) / count - 8;
      setBase(Math.round(Math.max(mobile ? 40 : 34, Math.min(mobile ? 44 : 52, fit))));
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [count]);
  return base;
}

function DockItem({
  label,
  icon,
  base,
  mouseX,
  magnify,
  running,
  bouncing,
  onClick,
}: {
  label: string;
  icon: AppIconStyle;
  base: number;
  mouseX: MotionValue<number>;
  magnify: boolean;
  running: boolean;
  bouncing: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !Number.isFinite(x)) return INFLUENCE_PX * 2;
    return x - box.left - box.width / 2;
  });
  const target = useTransform(distance, [-INFLUENCE_PX, 0, INFLUENCE_PX], [base, base * MAGNIFICATION, base]);
  const spring = useSpring(target, { mass: 0.1, stiffness: 190, damping: 14 });
  const size = magnify ? spring : base;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={running}
      style={{ width: size, height: size }}
      className="group relative flex shrink-0 cursor-pointer items-end justify-center outline-none"
    >
      {/* Name label that floats above the icon, like the real dock. */}
      <span className="mac-menu pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-[3px] text-[12px] font-medium text-white/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
      <motion.span
        className="block h-full w-full"
        animate={bouncing ? { y: [0, -22, 0, -10, 0] } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span className="block h-full w-full" whileTap={{ scale: 0.9, filter: 'brightness(0.75)' }}>
          <AppIcon icon={icon} size="fill" className="group-focus-visible:ring-2 group-focus-visible:ring-[#0a84ff]" />
        </motion.span>
      </motion.span>
      <span
        className={`absolute -bottom-[7px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white/85 transition-opacity ${
          running ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.button>
  );
}

export function Taskbar({ apps }: { apps: readonly DockApp[] }) {
  const windows = useDesktopStore((s) => s.windows);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [bouncingId, setBouncingId] = useState<string | null>(null);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const base = useBaseSize(apps.length + 2);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const magnify = finePointer && !reducedMotion;

  function launch(app: DockApp) {
    const win = windows.find((w) => w.id === app.id);
    sound.click();
    if (!win || !win.isOpen) {
      openWindow(app.id, app.title);
      if (!reducedMotion) {
        setBouncingId(app.id);
        setTimeout(() => setBouncingId((v) => (v === app.id ? null : v)), 700);
      }
    } else if (win.isMinimized) {
      focusWindow(app.id);
    } else {
      minimizeWindow(app.id);
    }
  }

  return (
    <>
      <Launchpad
        open={launchpadOpen}
        apps={apps}
        onClose={() => setLaunchpadOpen(false)}
        onLaunch={(app) => {
          setLaunchpadOpen(false);
          launch(app);
        }}
      />
      <nav aria-label="Dock" className="fixed inset-x-0 bottom-1.5 z-50 flex justify-center px-2">
        <div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
          className="mac-glass flex max-w-full items-end gap-[6px] overflow-x-auto rounded-[20px] px-[7px] pb-[7px] pt-[7px] sm:overflow-visible"
          style={{ height: base + 14 }}
        >
          <DockItem
            label="Launchpad"
            icon={LAUNCHPAD_ICON}
            base={base}
            mouseX={mouseX}
            magnify={magnify}
            running={false}
            bouncing={false}
            onClick={() => {
              sound.click();
              setLaunchpadOpen((v) => !v);
            }}
          />
          <div className="mx-[3px] w-px shrink-0 self-stretch bg-white/20" aria-hidden="true" />
          {apps.map((app) => (
            <DockItem
              key={app.id}
              label={app.title}
              icon={app.appIcon}
              base={base}
              mouseX={mouseX}
              magnify={magnify}
              running={!!windows.find((w) => w.id === app.id)?.isOpen}
              bouncing={bouncingId === app.id}
              onClick={() => launch(app)}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

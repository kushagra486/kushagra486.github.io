'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BatteryFull, Search, SlidersHorizontal, Wifi } from 'lucide-react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { APPS } from '@/lib/apps';
import { sound } from '@/lib/sound';

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  disabled?: boolean;
  checked?: boolean;
}
type MenuEntry = MenuItem | 'separator';

/** The logo that stands in for the Apple menu — a simple monogram, not Apple's mark. */
function LogoMark() {
  return (
    <svg viewBox="0 0 20 20" className="h-[15px] w-[15px]" aria-hidden="true">
      <defs>
        <linearGradient id="kos-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d4d4d8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="18" height="18" rx="5.5" fill="url(#kos-logo)" />
      <path d="M7 5.2v9.6M7 10l5-4.8M8.6 8.6 13 14.8" stroke="#111" strokeWidth="1.9" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Menu({
  id,
  label,
  entries,
  openMenu,
  setOpenMenu,
  bold,
  className = '',
}: {
  id: string;
  label: React.ReactNode;
  entries: MenuEntry[];
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
  bold?: boolean;
  className?: string;
}) {
  const isOpen = openMenu === id;
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpenMenu(isOpen ? null : id)}
        // macOS lets you slide across the bar once any menu is open.
        onMouseEnter={() => openMenu && openMenu !== id && setOpenMenu(id)}
        className={`flex h-[22px] items-center rounded-[5px] px-2 text-[13px] transition-colors ${
          bold ? 'font-bold' : 'font-medium'
        } ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
      >
        {label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mac-menu absolute left-0 top-[26px] z-[60] min-w-[230px] rounded-[10px] p-[5px] text-[13px]"
          >
            {entries.map((entry, i) =>
              entry === 'separator' ? (
                <div key={`sep-${i}`} className="mx-2 my-[5px] h-px bg-white/10" />
              ) : (
                <button
                  key={entry.label}
                  role="menuitem"
                  type="button"
                  disabled={entry.disabled}
                  onClick={() => {
                    setOpenMenu(null);
                    entry.action?.();
                  }}
                  className="group flex w-full items-center gap-2 rounded-[5px] px-2 py-[3px] text-left text-white/90 enabled:hover:bg-[#0a84ff] enabled:hover:text-white disabled:text-white/30"
                >
                  <span className="w-3 text-[11px]">{entry.checked ? '✓' : ''}</span>
                  <span className="flex-1 truncate">{entry.label}</span>
                  {entry.shortcut && (
                    <span className="text-white/40 group-enabled:group-hover:text-white/80">{entry.shortcut}</span>
                  )}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MenuBar() {
  const windows = useDesktopStore((s) => s.windows);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const setSpotlightOpen = useDesktopStore((s) => s.setSpotlightOpen);
  const setWidgetsOpen = useDesktopStore((s) => s.setWidgetsOpen);
  const [now, setNow] = useState<Date | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-only: avoids a server/client hydration mismatch on the initial timestamp.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(e: PointerEvent) {
      if (!barRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null);
    }
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const openWins = windows.filter((w) => w.isOpen);
  const focused = openWins
    .filter((w) => !w.isMinimized)
    .reduce<(typeof windows)[number] | null>((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null);

  function launch(id: string, title: string) {
    sound.open();
    openWindow(id, title);
  }

  const logoMenu: MenuEntry[] = [
    { label: 'About Kushagra', action: () => launch('about-me', 'About Me') },
    'separator',
    { label: 'System Settings…', action: () => launch('system-preferences', 'System Preferences') },
    { label: 'Spotlight Search', shortcut: '⌘K', action: () => setSpotlightOpen(true) },
    'separator',
    { label: 'Get in Touch…', action: () => launch('contact', 'Contact') },
    { label: 'Download Resume', action: () => launch('resume', 'Resume') },
  ];

  const goMenu: MenuEntry[] = APPS.filter((a) =>
    ['projects', 'app-dashboard', 'about-me', 'certifications', 'skill-graph', 'notes', 'games'].includes(a.id)
  ).map((a) => ({ label: a.title, action: () => launch(a.id, a.title) }));

  const windowMenu: MenuEntry[] = [
    { label: 'Minimize', shortcut: '⌘M', disabled: !focused, action: () => focused && minimizeWindow(focused.id) },
    { label: 'Close Window', shortcut: 'Esc', disabled: !focused, action: () => focused && closeWindow(focused.id) },
    'separator',
    ...(openWins.length === 0
      ? [{ label: 'No Open Windows', disabled: true } as MenuItem]
      : openWins.map((w) => ({
          label: w.title,
          checked: focused?.id === w.id,
          action: () => focusWindow(w.id),
        }))),
  ];

  const helpMenu: MenuEntry[] = [
    { label: 'Ask the AI Assistant', action: () => launch('ai-assistant', 'AI Assistant') },
    { label: 'Match a Job Description', action: () => launch('jd-matcher', 'JD Matcher') },
    'separator',
    { label: 'Search Everything', shortcut: '⌘K', action: () => setSpotlightOpen(true) },
  ];

  return (
    <div
      ref={barRef}
      className="mac-menubar fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-between px-1.5 text-white/90 [text-shadow:0_0.5px_1px_rgba(0,0,0,0.25)] sm:px-2.5"
    >
      <div className="flex min-w-0 items-center gap-0.5">
        <Menu
          id="logo"
          label={<LogoMark />}
          entries={logoMenu}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          className="[&>button]:px-2.5"
        />
        <Menu
          id="app"
          label={<span className="max-w-[40vw] truncate">{focused?.title ?? 'Kushagra OS'}</span>}
          entries={[
            { label: `About ${focused?.title ?? 'Kushagra OS'}`, action: () => launch('about-me', 'About Me') },
            'separator',
            { label: 'Hide Others', disabled: !focused, action: () => openWins.filter((w) => w.id !== focused?.id).forEach((w) => minimizeWindow(w.id)) },
            { label: `Quit ${focused?.title ?? ''}`.trim(), shortcut: 'Esc', disabled: !focused, action: () => focused && closeWindow(focused.id) },
          ]}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          bold
        />
        <Menu id="go" label="Go" entries={goMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} className="hidden sm:block" />
        <Menu id="window" label="Window" entries={windowMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} className="hidden sm:block" />
        <Menu id="help" label="Help" entries={helpMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} className="hidden sm:block" />
      </div>

      <div className="flex items-center gap-0.5 text-[13px] font-medium tabular-nums">
        <span className="hidden items-center gap-3 px-2 text-white/85 sm:flex" aria-hidden="true">
          <BatteryFull className="h-[17px] w-[17px]" strokeWidth={1.6} />
          <Wifi className="h-[15px] w-[15px]" strokeWidth={2} />
        </span>
        <button
          type="button"
          aria-label="Spotlight Search"
          onClick={() => setSpotlightOpen(true)}
          className="flex h-[22px] w-7 items-center justify-center rounded-[5px] hover:bg-white/10"
        >
          <Search className="h-[14px] w-[14px]" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          aria-label="Control Center and widgets"
          onClick={() => setWidgetsOpen((v) => !v)}
          className="hidden h-[22px] w-7 items-center justify-center rounded-[5px] hover:bg-white/10 sm:flex"
        >
          <SlidersHorizontal className="h-[14px] w-[14px]" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          aria-label="Open Notification Center"
          onClick={() => setWidgetsOpen((v) => !v)}
          className="flex h-[22px] items-center gap-2 rounded-[5px] px-2 hover:bg-white/10"
        >
          {now && (
            <>
              <span className="hidden sm:inline">
                {now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

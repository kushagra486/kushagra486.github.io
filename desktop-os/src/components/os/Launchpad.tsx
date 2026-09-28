'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';

interface LaunchpadApp {
  id: string;
  title: string;
  appIcon: AppIconStyle;
}

/** Full-screen app grid, like macOS Launchpad: zooms in over a blurred desktop with staggered icons. */
export function Launchpad<T extends LaunchpadApp>({
  open,
  apps,
  onClose,
  onLaunch,
}: {
  open: boolean;
  apps: readonly T[];
  onClose: () => void;
  onLaunch: (app: T) => void;
}) {
  const [query, setQuery] = useState('');
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setQuery('');
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    }
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const visible = q ? apps.filter((a) => a.title.toLowerCase().includes(q)) : apps;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Launchpad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[45] flex flex-col items-center bg-black/30 px-6 pb-28 pt-12 backdrop-blur-[40px] backdrop-saturate-150"
        >
          <div className="relative mb-8 w-[min(80%,16rem)]" onClick={(e) => e.stopPropagation()}>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/60" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && visible[0]) onLaunch(visible[0]);
              }}
              placeholder="Search"
              aria-label="Search apps"
              className="h-7 w-full rounded-lg border border-white/15 bg-white/10 pl-8 pr-2 text-[13px] text-white outline-none placeholder:text-white/50 focus:border-[#0a84ff]/70"
            />
          </div>

          <motion.ul
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="grid w-full max-w-5xl grid-cols-4 content-start gap-x-4 gap-y-7 overflow-y-auto sm:grid-cols-6 lg:grid-cols-7"
          >
            {visible.map((app, i) => (
              <motion.li
                key={app.id}
                initial={{ opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26, delay: i * 0.025 }}
                className="flex justify-center"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunch(app);
                  }}
                  className="group flex w-24 flex-col items-center gap-2 rounded-xl p-1 outline-none focus-visible:bg-white/10"
                >
                  <motion.span whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                    <AppIcon icon={app.appIcon} size={64} />
                  </motion.span>
                  <span className="line-clamp-2 text-center text-[12px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    {app.title}
                  </span>
                </button>
              </motion.li>
            ))}
            {visible.length === 0 && (
              <li className="col-span-full text-center text-sm text-white/60">No apps match &ldquo;{query}&rdquo;.</li>
            )}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

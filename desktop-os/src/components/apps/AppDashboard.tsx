'use client';

import { motion } from 'framer-motion';
import { liveApps } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';
import { RevealItem } from '@/components/os/Reveal';

// Cycled per tile so the grid reads like a colorful macOS app folder.
const TILE_GRADIENTS = [
  'from-sky-400 to-blue-600',
  'from-indigo-400 to-violet-600',
  'from-rose-400 to-pink-600',
  'from-emerald-400 to-green-600',
  'from-amber-300 to-orange-500',
  'from-fuchsia-400 to-purple-600',
  'from-teal-300 to-cyan-600',
];

export function AppDashboard() {
  const openApp = useDesktopStore((s) => s.openApp);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="px-1">
        <h2 className="text-[26px] font-bold tracking-tight text-white">Live Apps</h2>
        <p className="text-[13px] text-white/50">{liveApps.length} apps, running live — click any to open it right here.</p>
      </div>
      <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5">
        {liveApps.map((app, i) => (
          <RevealItem key={app.slug} index={i} as="li">
            <button
              onClick={() => openApp({ name: app.name, url: app.url })}
              className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 text-center outline-none focus-visible:bg-white/10"
            >
              <motion.span
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className={`mac-app-icon flex h-16 w-16 items-center justify-center bg-gradient-to-b text-[30px] ${TILE_GRADIENTS[i % TILE_GRADIENTS.length]}`}
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{app.emoji}</span>
              </motion.span>
              <span className="line-clamp-2 text-[12px] font-medium leading-tight text-white/85">{app.name}</span>
            </button>
          </RevealItem>
        ))}
      </ul>
    </div>
  );
}

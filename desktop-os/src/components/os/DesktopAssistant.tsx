'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { usePreferences } from '@/lib/preferences';
import { sound } from '@/lib/sound';

const HINTS = [
  "👋 Hey! I'm Kushagra's AI assistant — ask me about his projects.",
  '🎯 Try the JD Matcher — paste a job description and see the fit.',
  '🕸️ Check out the Skill Graph to see how everything connects.',
];

/** Always-on-desktop assistant avatar (Kushagra's own photo) — click to chat, with an occasional speech bubble. */
export function DesktopAssistant() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [bubble, setBubble] = useState<string | null>(null);

  useEffect(() => {
    const firstTimer = setTimeout(() => setBubble(HINTS[0]), 1200);
    let hintIndex = 0;
    const cycle = setInterval(() => {
      hintIndex = (hintIndex + 1) % HINTS.length;
      setBubble((current) => (current ? HINTS[hintIndex] : current));
    }, 14000);
    return () => {
      clearTimeout(firstTimer);
      clearInterval(cycle);
    };
  }, []);

  function openAssistant() {
    sound.open();
    setBubble(null);
    openWindow('ai-assistant', 'AI Assistant');
  }

  return (
    <div className="pointer-events-auto fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-64 rounded-xl border border-cyan-300/20 bg-[#0f2740]/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <button
              aria-label="Dismiss"
              onClick={() => setBubble(null)}
              className="absolute right-1.5 top-1.5 text-white/40 hover:text-white/80"
            >
              ✕
            </button>
            <p className="pr-3 text-xs leading-relaxed text-white/80">{bubble}</p>
            <button
              onClick={openAssistant}
              className="mt-2 rounded-md bg-cyan-400/90 px-2.5 py-1 text-[11px] font-medium text-black transition hover:bg-cyan-300"
            >
              Chat with me
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={openAssistant}
        aria-label="Open AI Assistant"
        title="Chat with Kushagra's AI Assistant"
        className="group relative h-16 w-16 shrink-0"
      >
        {!reducedMotion && (
          <motion.span
            className="absolute -inset-1.5 rounded-full bg-cyan-400/30 blur-md"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <motion.span
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#a855f7,#22d3ee)]"
          animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-[3px] overflow-hidden rounded-full border border-white/20 bg-[#0f2740]"
          animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.03, 1] }}
          transition={reducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar/face.jpg" alt="Kushagra Gupta" className="h-full w-full object-cover" />
        </motion.span>
        <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#0a1a2e] bg-emerald-400" />
      </button>
    </div>
  );
}

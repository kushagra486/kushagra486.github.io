'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GreetingPopup({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-16 right-4 z-[200] w-72 rounded-xl border border-cyan-300/20 bg-[#0f2740]/95 p-4 shadow-2xl backdrop-blur-xl sm:right-6"
        >
          <button
            aria-label="Dismiss"
            onClick={() => setVisible(false)}
            className="absolute right-2 top-2 text-white/40 hover:text-white/80"
          >
            ✕
          </button>
          <p className="text-sm font-medium text-white">👋 Welcome to Kushagra OS!</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Explore the desktop, check out the projects, or ask the AI Assistant anything about my work.
          </p>
          <button
            onClick={() => {
              setVisible(false);
              onOpenAssistant();
            }}
            className="mt-3 rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300"
          >
            Chat with the AI Assistant
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

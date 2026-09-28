'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** macOS-style startup: a white monogram on black with a thin progress bar. */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1500;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      // Ease so it moves quickly, pauses, then finishes — like a real boot.
      const eased = t < 0.6 ? t * 1.25 : 0.75 + (t - 0.6) * 0.625;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-14 bg-black"
      role="progressbar"
      aria-label="Starting Kushagra OS"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.svg
        viewBox="0 0 64 64"
        className="h-20 w-20"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <motion.path
          d="M22 14v36M22 34 42 14M28.5 28 43 50"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.svg>
      <div className="h-[5px] w-44 overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}

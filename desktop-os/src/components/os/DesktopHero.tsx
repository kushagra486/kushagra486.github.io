'use client';

import { motion } from 'framer-motion';
import { expertise, profile, skills } from '@/lib/portfolioData';

const EXTRA_KEYWORDS = ['GenAI', 'LLMs', 'AI Agents', 'Neural Networks', 'Prompt Engineering', 'Computer Vision'];

const KEYWORDS = Array.from(
  new Set([...expertise.map((e) => e.label), ...skills['AI / ML / GenAI'], ...EXTRA_KEYWORDS])
);

/** Deterministic (index-based) scatter layout — avoids Math.random so server/client markup always matches. */
function layoutFor(i: number, total: number) {
  const angle = (i / total) * Math.PI * 2 + i * 0.6;
  const radiusX = 30 + ((i * 13) % 20);
  const radiusY = 26 + ((i * 9) % 18);
  const top = 50 + Math.sin(angle) * radiusY;
  const left = 50 + Math.cos(angle) * radiusX;
  const duration = 5 + (i % 5);
  const delay = (i % 6) * 0.35;
  return { top: `${top}%`, left: `${left}%`, duration, delay };
}

/** Animated name banner + floating AI/skill keyword chips scattered across the desktop background. */
export function DesktopHero() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div className="absolute inset-x-0 top-14 flex flex-col items-center gap-1 text-center sm:top-16">
        <h1
          className="bg-[length:200%_auto] bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent [animation:name-shimmer_5s_linear_infinite] sm:text-3xl"
        >
          {profile.name}
        </h1>
        <p className="text-xs font-medium text-white/50 sm:text-sm">{profile.role}</p>
      </div>

      {KEYWORDS.map((word, i) => {
        const { top, left, duration, delay } = layoutFor(i, KEYWORDS.length);
        return (
          <motion.span
            key={word}
            className="absolute hidden rounded-full border border-cyan-300/10 bg-cyan-300/5 px-2.5 py-1 text-[10px] font-medium text-cyan-100/40 sm:block"
            style={{ top, left }}
            animate={{ y: [0, -14, 0], opacity: [0.12, 0.32, 0.12] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

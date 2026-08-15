'use client';

import { motion } from 'framer-motion';
import { expertise, skills } from '@/lib/portfolioData';
import { ProfileCard } from '@/components/os/ProfileCard';
import { usePreferences } from '@/lib/preferences';

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

/** Default-visible profile card + floating AI/skill keyword chips scattered across the desktop background. */
export function DesktopHero() {
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <ProfileCard />

      {KEYWORDS.map((word, i) => {
        const { top, left, duration, delay } = layoutFor(i, KEYWORDS.length);
        return (
          <motion.span
            key={word}
            aria-hidden="true"
            className="absolute hidden rounded-full border border-cyan-300/10 bg-cyan-300/5 px-2.5 py-1 text-[10px] font-medium text-cyan-100/40 sm:block"
            style={{ top, left }}
            animate={reducedMotion ? { opacity: 0.2 } : { y: [0, -14, 0], opacity: [0.12, 0.32, 0.12] }}
            transition={reducedMotion ? { duration: 0.3 } : { duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

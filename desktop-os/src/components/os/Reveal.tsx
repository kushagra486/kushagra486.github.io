'use client';

import { createContext, ReactNode, RefObject, useContext } from 'react';
import { motion } from 'framer-motion';

/**
 * Each window's scrollable content area. Scroll-reveal animations use it as their
 * IntersectionObserver root — the page itself never scrolls, only window contents do.
 */
export const WindowScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

const SPRING = { type: 'spring', stiffness: 240, damping: 30, mass: 0.9 } as const;

/** Fades + lifts its children into place the first time they scroll into view inside a window. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a list item so it can sit directly inside a <ul>. */
  as?: 'div' | 'li';
}) {
  const root = useContext(WindowScrollContext);
  const Component = as === 'li' ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ root: root ?? undefined, once: true, amount: 0.12 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Component>
  );
}

/** Staggered variant for grids/lists: pass the item index, delay caps so long lists don't lag. */
export function RevealItem({
  index,
  children,
  className,
  as,
}: {
  index: number;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  return (
    <Reveal delay={Math.min(index % 12, 8) * 0.045} className={className} as={as}>
      {children}
    </Reveal>
  );
}

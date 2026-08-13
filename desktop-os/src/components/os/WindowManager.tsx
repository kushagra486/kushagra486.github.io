'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';

interface WindowManagerProps {
  id: string;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  children: ReactNode;
}

export function WindowManager({ id, title, zIndex, isMinimized, children }: WindowManagerProps) {
  const constraintsRef = useRef(null);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);

  return (
    <div ref={constraintsRef} className="pointer-events-none fixed inset-0">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        onMouseDown={() => focusWindow(id)}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: isMinimized ? 0 : 1,
          scale: isMinimized ? 0.9 : 1,
          pointerEvents: isMinimized ? 'none' : 'auto',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{ zIndex }}
        className="pointer-events-auto absolute top-24 left-24 w-[min(90vw,640px)] overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex cursor-grab items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 active:cursor-grabbing">
          <span className="text-sm font-medium text-white/90">{title}</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Minimize"
              onClick={() => minimizeWindow(id)}
              className="h-3 w-3 rounded-full bg-yellow-400/90 transition hover:brightness-110"
            />
            <button
              aria-label="Close"
              onClick={() => closeWindow(id)}
              className="h-3 w-3 rounded-full bg-red-400/90 transition hover:brightness-110"
            />
          </div>
        </div>
        <div className="max-h-[70vh] overflow-auto p-4 text-white/90">{children}</div>
      </motion.div>
    </div>
  );
}

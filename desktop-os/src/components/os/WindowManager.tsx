'use client';

import { motion, useDragControls } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';

interface WindowManagerProps {
  id: string;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  children: ReactNode;
}

export function WindowManager({ id, title, zIndex, isMinimized, children }: WindowManagerProps) {
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);

  return (
    <div ref={constraintsRef} className="pointer-events-none fixed inset-0">
      <motion.div
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        onPointerDown={() => focusWindow(id)}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{
          opacity: isMinimized ? 0 : 1,
          scale: isMinimized ? 0.9 : 1,
          y: 0,
          pointerEvents: isMinimized ? 'none' : 'auto',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{ zIndex }}
        className="pointer-events-auto absolute inset-x-3 top-32 bottom-16 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl sm:inset-auto sm:top-24 sm:left-24 sm:h-auto sm:w-[min(90vw,640px)]"
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex cursor-grab items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 active:cursor-grabbing"
        >
          <span className="text-sm font-medium text-white/90">{title}</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Minimize"
              onClick={() => {
                sound.click();
                minimizeWindow(id);
              }}
              className="h-3 w-3 rounded-full bg-yellow-400/90 transition hover:brightness-110"
            />
            <button
              aria-label="Close"
              onClick={() => {
                sound.close();
                closeWindow(id);
              }}
              className="h-3 w-3 rounded-full bg-red-400/90 transition hover:brightness-110"
            />
          </div>
        </div>
        <div className="max-h-[70vh] overflow-auto p-4 text-white/90">{children}</div>
      </motion.div>
    </div>
  );
}

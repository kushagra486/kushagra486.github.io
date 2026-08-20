'use client';

import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode, RefObject, useRef, useState } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';

interface WindowManagerProps {
  id: string;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  constraintsRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

interface Size {
  width: number;
  height: number;
}

const DEFAULT_SIZE: Size = { width: 640, height: 480 };
const MIN_SIZE: Size = { width: 320, height: 240 };
// Matches the sm:top-24 sm:left-24 anchor position in the className below.
const ANCHOR = { top: 96, left: 96 };
const EDGE_MARGIN = { right: 12, bottom: 88 }; // bottom leaves room for the dock

/** Desktop-only resizing/maximizing — mobile windows stay full-width/edge-to-edge via CSS. */
export function WindowManager({ id, title, zIndex, isMinimized, constraintsRef, children }: WindowManagerProps) {
  const dragControls = useDragControls();
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [maximized, setMaximized] = useState(false);
  const sizeBeforeMaximizeRef = useRef<Size>(DEFAULT_SIZE);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  function containerBounds() {
    const el = constraintsRef.current;
    return { width: el?.clientWidth ?? 1200, height: el?.clientHeight ?? 800 };
  }

  function handleResizeStart(e: ReactPointerEvent) {
    e.stopPropagation();
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    resizeStartRef.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height };
    setMaximized(false);
    focusWindow(id);
  }

  function handleResizeMove(e: ReactPointerEvent) {
    const start = resizeStartRef.current;
    if (!start) return;
    const bounds = containerBounds();
    const nextWidth = Math.min(bounds.width - 24, Math.max(MIN_SIZE.width, start.width + (e.clientX - start.x)));
    const nextHeight = Math.min(bounds.height - 24, Math.max(MIN_SIZE.height, start.height + (e.clientY - start.y)));
    setSize({ width: nextWidth, height: nextHeight });
  }

  function handleResizeEnd(e: ReactPointerEvent) {
    resizeStartRef.current = null;
    (e.target as Element).releasePointerCapture(e.pointerId);
  }

  function toggleMaximize() {
    sound.click();
    focusWindow(id);
    if (maximized) {
      setSize(sizeBeforeMaximizeRef.current);
      setMaximized(false);
      return;
    }
    sizeBeforeMaximizeRef.current = size;
    // Read (not set) the current drag offset — never programmatically `.set()` a controlled
    // motion value that `dragConstraints` also measures against, or framer-motion's cached
    // drag origin gets out of sync and silently disables dragging afterwards.
    const bounds = containerBounds();
    const currentLeft = ANCHOR.left + dragX.get();
    const currentTop = ANCHOR.top + dragY.get();
    setSize({
      width: Math.max(MIN_SIZE.width, bounds.width - currentLeft - EDGE_MARGIN.right),
      height: Math.max(MIN_SIZE.height, bounds.height - currentTop - EDGE_MARGIN.bottom),
    });
    setMaximized(true);
  }

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setMaximized(false)}
      onPointerDown={() => focusWindow(id)}
      role="region"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: isMinimized ? 0 : 1,
        scale: isMinimized ? 0.9 : 1,
        pointerEvents: isMinimized ? 'none' : 'auto',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{
        x: dragX,
        y: dragY,
        zIndex,
        ...({ '--win-w': `${size.width}px`, '--win-h': `${size.height}px` } as CSSProperties),
      }}
      className="pointer-events-auto absolute inset-x-3 top-32 bottom-16 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl sm:inset-auto sm:top-24 sm:left-24 sm:[height:var(--win-h)] sm:[width:var(--win-w)]"
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex cursor-grab items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 active:cursor-grabbing"
      >
        <span className="text-sm font-medium text-white/90">{title}</span>
        <div className="flex items-center gap-2">
          <button
            aria-label={`Minimize ${title}`}
            onClick={() => {
              sound.click();
              minimizeWindow(id);
            }}
            className="h-3 w-3 rounded-full bg-yellow-400/90 transition hover:brightness-110"
          />
          <button
            aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title}`}
            onClick={toggleMaximize}
            className="hidden h-3 w-3 rounded-full bg-emerald-400/90 transition hover:brightness-110 sm:block"
          />
          <button
            aria-label={`Close ${title}`}
            onClick={() => {
              sound.close();
              closeWindow(id);
            }}
            className="h-3 w-3 rounded-full bg-red-400/90 transition hover:brightness-110"
          />
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-auto p-4 text-white/90">{children}</div>

      <div
        onPointerDown={handleResizeStart}
        onPointerMove={handleResizeMove}
        onPointerUp={handleResizeEnd}
        aria-hidden="true"
        title="Drag to resize"
        className="absolute bottom-0.5 right-0.5 hidden h-4 w-4 cursor-nwse-resize touch-none sm:block"
      >
        <svg viewBox="0 0 16 16" className="h-full w-full text-white/30">
          <path d="M14 3 3 14M14 8 8 14M14 13l-1 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

'use client';

import { motion, useDragControls, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode, RefObject, useRef, useState } from 'react';
import { ChevronLeft, Maximize2, Minimize2, Minus, X } from 'lucide-react';
import { WindowScrollContext } from '@/components/os/Reveal';
import { useDesktopStore } from '@/store/useDesktopStore';
import { sound } from '@/lib/sound';
import { useIsMobile } from '@/lib/useIsMobile';

interface WindowManagerProps {
  id: string;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  isFocused: boolean;
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
export function WindowManager({ id, title, zIndex, isMinimized, isFocused, constraintsRef, children }: WindowManagerProps) {
  const dragControls = useDragControls();
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  // Below `sm` apps run full-screen like iOS: no dragging, a nav bar and a home indicator.
  const isMobile = useIsMobile();

  // Cascade new windows like macOS instead of stacking them exactly. This is the motion
  // values' *initial* value — never `.set()` them later (see toggleMaximize).
  const [cascade] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches ? (zIndex % 6) * 26 : 0
  );
  const dragX = useMotionValue(cascade);
  const dragY = useMotionValue(cascade);
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [maximized, setMaximized] = useState(false);
  const sizeBeforeMaximizeRef = useRef<Size>(DEFAULT_SIZE);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({ container: contentRef });
  // macOS only draws the toolbar hairline once content has scrolled underneath it.
  const hairline = useTransform(scrollY, [0, 12], [0, 1]);

  function goHome() {
    sound.click();
    minimizeWindow(id);
  }

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
      drag={!isMobile}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setMaximized(false)}
      onPointerDown={() => focusWindow(id)}
      role="region"
      aria-label={title}
      data-focused={isFocused}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isMinimized ? 0 : 1,
        // Shrinks toward the dock on minimize — a light nod to the genie effect.
        scale: isMinimized ? 0.35 : 1,
        pointerEvents: isMinimized ? 'none' : 'auto',
      }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
      transition={{
        opacity: { duration: isMinimized ? 0.22 : 0.18 },
        scale: { type: 'spring', stiffness: 420, damping: 32, mass: 0.8 },
      }}
      style={{
        x: dragX,
        y: dragY,
        zIndex,
        transformOrigin: isMinimized ? '50% 130%' : '50% 50%',
        ...({ '--win-w': `${size.width}px`, '--win-h': `${size.height}px` } as CSSProperties),
      }}
      className="mac-window pointer-events-auto absolute inset-0 flex flex-col overflow-hidden pt-11 max-sm:!rounded-none max-sm:!border-0 max-sm:!bg-black max-sm:!shadow-none sm:inset-auto sm:top-24 sm:left-24 sm:block sm:rounded-[12px] sm:pt-0 sm:[height:var(--win-h)] sm:[width:var(--win-w)]"
    >
      {/* iOS navigation bar (mobile). */}
      <div className="relative flex h-11 shrink-0 items-center justify-center px-2 sm:hidden">
        <button
          type="button"
          onClick={goHome}
          className="absolute left-1 flex items-center rounded-lg py-1 pl-0.5 pr-2 text-[17px] text-[#0a84ff] active:opacity-40"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
          Home
        </button>
        <span className="max-w-[52%] truncate text-[17px] font-semibold text-white">{title}</span>
        <motion.div style={{ opacity: hairline }} className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#0a84ff] to-[#5ac8fa]"
        />
      </div>

      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="relative hidden h-[38px] cursor-default select-none items-center px-3 active:cursor-grabbing sm:flex"
      >
        {/* Traffic lights. Pointer-down is stopped here so a quick double-click on a light can
            never fire dragControls.start twice — that combination corrupts framer's drag state. */}
        <div className="group/lights relative z-10 flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <button
            aria-label={`Close ${title}`}
            onClick={() => {
              sound.close();
              closeWindow(id);
            }}
            className={`flex h-3 w-3 items-center justify-center rounded-full ring-[0.5px] ring-black/25 transition-colors ${
              isFocused ? 'bg-[#ff5f57]' : 'bg-white/20 group-hover/lights:bg-[#ff5f57]'
            }`}
          >
            <X className="h-2 w-2 text-black/70 opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
          </button>
          <button
            aria-label={`Minimize ${title}`}
            onClick={() => {
              sound.click();
              minimizeWindow(id);
            }}
            className={`flex h-3 w-3 items-center justify-center rounded-full ring-[0.5px] ring-black/25 transition-colors ${
              isFocused ? 'bg-[#febc2e]' : 'bg-white/20 group-hover/lights:bg-[#febc2e]'
            }`}
          >
            <Minus className="h-2 w-2 text-black/70 opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
          </button>
          <button
            aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title}`}
            onClick={toggleMaximize}
            className={`hidden h-3 w-3 items-center justify-center rounded-full ring-[0.5px] ring-black/25 transition-colors sm:flex ${
              isFocused ? 'bg-[#28c840]' : 'bg-white/20 group-hover/lights:bg-[#28c840]'
            }`}
          >
            {maximized ? (
              <Minimize2 className="h-[7px] w-[7px] text-black/70 opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
            ) : (
              <Maximize2 className="h-[7px] w-[7px] text-black/70 opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
            )}
          </button>
        </div>
        <span
          className={`pointer-events-none absolute inset-x-24 truncate text-center text-[13px] font-semibold transition-colors ${
            isFocused ? 'text-white/90' : 'text-white/40'
          }`}
        >
          {title}
        </span>
        <motion.div style={{ opacity: hairline }} className="absolute inset-x-0 bottom-0 h-px bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#0a84ff] to-[#5ac8fa]"
        />
      </div>
      <WindowScrollContext.Provider value={contentRef}>
        <div
          ref={contentRef}
          className="mac-scroll relative min-h-0 flex-1 overflow-auto px-4 pb-10 pt-3 text-white/90 sm:h-[calc(100%-38px)] sm:flex-none sm:p-4"
        >
          {children}
        </div>
      </WindowScrollContext.Provider>

      {/* iOS home indicator: tap or swipe up to go back to the home screen. */}
      <motion.button
        type="button"
        aria-label="Go to home screen"
        onClick={goHome}
        onPanEnd={(_, info) => info.offset.y < -20 && goHome()}
        className="absolute inset-x-0 bottom-0 flex h-7 touch-none items-end justify-center pb-2 sm:hidden"
      >
        <span className="h-[5px] w-[134px] rounded-full bg-white/85" />
      </motion.button>

      <div
        onPointerDown={handleResizeStart}
        onPointerMove={handleResizeMove}
        onPointerUp={handleResizeEnd}
        aria-hidden="true"
        title="Drag to resize"
        className="absolute bottom-0 right-0 hidden h-4 w-4 cursor-nwse-resize touch-none opacity-0 transition-opacity hover:opacity-100 sm:block"
      >
        <svg viewBox="0 0 16 16" className="h-full w-full text-white/30">
          <path d="M14 3 3 14M14 8 8 14M14 13l-1 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

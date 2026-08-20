'use client';

import { ReactNode } from 'react';

/**
 * Locks the whole OS to a fixed-ratio "screen" — 16:9 in landscape (desktop/Windows-style),
 * 9:16 in portrait (mobile) — letterboxed to fit whatever the actual browser viewport is.
 * Sizing math lives in globals.css (.screen-frame): width/height each default to 100% of
 * the viewport but are capped by a max- computed from the *other* axis, so whichever axis
 * is the binding constraint wins automatically (the standard letterbox/pillarbox trick).
 *
 * `transform: translateZ(0)` here is load-bearing: it makes this div the containing block
 * for every `position: fixed` element inside the OS (MenuBar, Taskbar, WindowManager,
 * DesktopAssistant, Screensaver, CommandPalette, ...), so all of them scope to the frame
 * instead of the real browser viewport, without needing to touch each of those components.
 */
export function ScreenFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#02040a]">
      <div className="screen-frame relative overflow-hidden shadow-2xl" style={{ transform: 'translateZ(0)' }}>
        {children}
      </div>
    </div>
  );
}

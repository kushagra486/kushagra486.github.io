'use client';

import { useEffect, useState } from 'react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { CommandPalette } from '@/components/os/CommandPalette';

/** ⌘/Ctrl-K command palette, ⌘/Ctrl-` window cycling, Esc closes the focused window or the palette. */
export function GlobalShortcuts() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const windows = useDesktopStore((s) => s.windows);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing = target && ['INPUT', 'TEXTAREA'].includes(target.tagName);
      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }

      if (e.key === 'Escape') {
        if (paletteOpen) {
          setPaletteOpen(false);
          return;
        }
        if (typing) return;
        const top = windows
          .filter((w) => w.isOpen && !w.isMinimized)
          .reduce<(typeof windows)[number] | null>((acc, w) => (!acc || w.zIndex > acc.zIndex ? w : acc), null);
        if (top) closeWindow(top.id);
        return;
      }

      if (meta && e.key === '`') {
        e.preventDefault();
        const open = windows.filter((w) => w.isOpen);
        if (open.length < 2) return;
        const sorted = [...open].sort((a, b) => a.zIndex - b.zIndex);
        const next = sorted[0];
        focusWindow(next.id);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paletteOpen, windows, focusWindow, closeWindow]);

  return <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />;
}

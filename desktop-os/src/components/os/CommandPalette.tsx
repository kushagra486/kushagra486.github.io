'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APPS } from '@/lib/apps';
import { projects, skills } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';

interface Result {
  id: string;
  label: string;
  hint: string;
  icon: string;
  action: () => void;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useDesktopStore((s) => s.openWindow);

  // React's documented "adjust state on prop change" pattern — reset search state during
  // render (not in an effect) whenever `open` flips, however it was toggled.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }

  const allResults = useMemo<Result[]>(() => {
    const appResults: Result[] = APPS.map((app) => ({
      id: `app-${app.id}`,
      label: app.title,
      hint: 'App',
      icon: app.icon,
      action: () => openWindow(app.id, app.title),
    }));

    const projectResults: Result[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.name,
      hint: p.tagline,
      icon: p.emoji,
      action: () => openWindow('projects', 'Projects'),
    }));

    const flatSkills = Array.from(new Set(Object.values(skills).flat()));
    const skillResults: Result[] = flatSkills.map((skill) => ({
      id: `skill-${skill}`,
      label: skill,
      hint: 'Skill — open Skill Graph',
      icon: '🧩',
      action: () => openWindow('skill-graph', 'Skill Graph'),
    }));

    return [...appResults, ...projectResults, ...skillResults];
  }, [openWindow]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResults.filter((r) => r.hint === 'App');
    return allResults.filter((r) => r.label.toLowerCase().includes(q) || r.hint.toLowerCase().includes(q)).slice(0, 20);
  }, [query, allResults]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = results[activeIndex];
      if (chosen) {
        chosen.action();
        onClose();
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-24 z-[301] w-[min(92vw,32rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0a1a2e]/95 shadow-2xl backdrop-blur-2xl"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search apps, projects, skills…"
              aria-label="Search"
              className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />
            <ul role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-4 text-center text-xs text-white/40">No results.</li>}
              {results.map((r, i) => (
                <li key={r.id} role="option" aria-selected={i === activeIndex}>
                  <button
                    onClick={() => {
                      r.action();
                      onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                      i === activeIndex ? 'bg-cyan-400/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{r.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white">{r.label}</span>
                      <span className="block truncate text-[11px] text-white/40">{r.hint}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-white/10 px-3 py-1.5 text-[10px] text-white/30">
              <span>↑↓ navigate · ↵ open</span>
              <span>⌘K toggle · Esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

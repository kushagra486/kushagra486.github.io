'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderOpen, Puzzle, Search } from 'lucide-react';
import { APPS } from '@/lib/apps';
import { projects, skills } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';
import { AppIcon, AppIconStyle } from '@/components/os/AppIcon';

type Group = 'Applications' | 'Projects' | 'Skills';

interface Result {
  id: string;
  label: string;
  hint: string;
  group: Group;
  icon: AppIconStyle;
  action: () => void;
}

const PROJECT_ICON: AppIconStyle = { Glyph: FolderOpen, gradient: 'from-sky-300 to-sky-600' };
const SKILL_ICON: AppIconStyle = { Glyph: Puzzle, gradient: 'from-fuchsia-400 to-purple-600' };

/** macOS Spotlight: a floating glass search field with grouped, keyboard-navigable results. */
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
      hint: 'Application',
      group: 'Applications',
      icon: app.appIcon,
      action: () => openWindow(app.id, app.title),
    }));

    const projectResults: Result[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.name,
      hint: p.tagline,
      group: 'Projects',
      icon: PROJECT_ICON,
      action: () => openWindow('projects', 'Projects'),
    }));

    const flatSkills = Array.from(new Set(Object.values(skills).flat()));
    const skillResults: Result[] = flatSkills.map((skill) => ({
      id: `skill-${skill}`,
      label: skill,
      hint: 'Open in Skill Graph',
      group: 'Skills',
      icon: SKILL_ICON,
      action: () => openWindow('skill-graph', 'Skill Graph'),
    }));

    return [...appResults, ...projectResults, ...skillResults];
  }, [openWindow]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResults.filter((r) => r.group === 'Applications').slice(0, 8);
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
            className="fixed inset-0 z-[300] bg-black/15"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight Search"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: 'spring', stiffness: 460, damping: 34 }}
            className="mac-menu fixed left-1/2 top-[16%] z-[301] w-[min(92vw,38rem)] -translate-x-1/2 overflow-hidden rounded-[22px]"
          >
            <div className="flex items-center gap-3 px-5">
              <Search className="h-[22px] w-[22px] shrink-0 text-white/55" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Spotlight Search"
                aria-label="Spotlight Search"
                className="h-[58px] w-full bg-transparent text-[22px] font-light text-white outline-none placeholder:text-white/35"
              />
            </div>
            {results.length > 0 && <div className="h-px bg-white/10" />}
            <ul role="listbox" className="mac-scroll max-h-[22rem] overflow-y-auto p-2">
              {results.map((r, i) => {
                const showHeader = i === 0 || results[i - 1].group !== r.group;
                return (
                  <li key={r.id} role="option" aria-selected={i === activeIndex}>
                    {showHeader && (
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold text-white/40">{r.group}</p>
                    )}
                    <button
                      onClick={() => {
                        r.action();
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-[9px] px-3 py-1.5 text-left ${
                        i === activeIndex ? 'bg-[#0a84ff] text-white' : 'text-white/90'
                      }`}
                    >
                      <AppIcon icon={r.icon} size={26} />
                      <span className="min-w-0 flex-1 truncate text-[14px]">{r.label}</span>
                      <span className={`max-w-[45%] truncate text-[12px] ${i === activeIndex ? 'text-white/80' : 'text-white/40'}`}>
                        {r.hint}
                      </span>
                    </button>
                  </li>
                );
              })}
              {query && results.length === 0 && (
                <li className="px-3 py-6 text-center text-[13px] text-white/45">No results for &ldquo;{query}&rdquo;</li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

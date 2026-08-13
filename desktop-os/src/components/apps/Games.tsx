'use client';

import { useState } from 'react';
import { SnakeGame } from '@/components/apps/games/SnakeGame';
import { MemoryGame } from '@/components/apps/games/MemoryGame';

const TABS = [
  { id: 'snake', label: 'Snake', Component: SnakeGame },
  { id: 'memory', label: 'Memory Match', Component: MemoryGame },
] as const;

export function Games() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('snake');
  const Active = TABS.find((t) => t.id === tab)!.Component;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-md px-3 py-1 text-xs transition ${
              tab === t.id ? 'bg-cyan-400/90 text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Active />
    </div>
  );
}

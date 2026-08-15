'use client';

import { useState } from 'react';
import { notes } from '@/lib/notes';

export function Notes() {
  const [selected, setSelected] = useState<string | null>(null);
  const note = notes.find((n) => n.slug === selected);

  if (note) {
    return (
      <div className="text-sm">
        <button onClick={() => setSelected(null)} className="mb-3 text-xs text-cyan-300/80 hover:text-cyan-200">
          ← All notes
        </button>
        <p className="text-[11px] text-white/40">{note.date}</p>
        <h1 className="mt-1 text-base font-semibold text-white">{note.title}</h1>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-3 space-y-3 text-xs leading-relaxed text-white/75">
          {note.body
            .trim()
            .split('\n\n')
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-2 text-sm">
      {notes.map((n) => (
        <li key={n.slug}>
          <button
            onClick={() => setSelected(n.slug)}
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-left transition hover:border-cyan-300/30 hover:bg-white/10"
          >
            <p className="text-[11px] text-white/40">{n.date}</p>
            <p className="mt-0.5 font-medium text-white">{n.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-white/50">{n.body.trim().split('\n\n')[0]}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

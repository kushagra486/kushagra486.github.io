'use client';

import { FormEvent, useState } from 'react';

interface LogLine {
  role: 'user' | 'assistant';
  text: string;
}

export function AIMantram() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<LogLine[]>([
    { role: 'assistant', text: 'AI Mantram Console — mock shell. Type a message and press enter.' },
  ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setLog((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'assistant', text: 'This is a mock response. Wire this up to a real endpoint to go live.' },
    ]);
    setInput('');
  }

  return (
    <div className="flex h-72 flex-col font-mono text-sm">
      <div className="flex-1 space-y-1 overflow-auto pr-1">
        {log.map((line, i) => (
          <div key={i} className={line.role === 'user' ? 'text-cyan-300' : 'text-white/80'}>
            <span className="mr-2 text-white/40">{line.role === 'user' ? '>' : '#'}</span>
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2 border-t border-white/10 pt-2">
        <span className="text-white/40">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder:text-white/30"
          placeholder="ask mantram..."
        />
      </form>
    </div>
  );
}

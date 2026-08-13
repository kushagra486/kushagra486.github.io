'use client';

import { FormEvent, useState } from 'react';
import { getReply } from '@/lib/chatbot';

interface Message {
  role: 'bot' | 'visitor';
  text: string;
}

export function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Kushagra's portfolio assistant. Ask me about his projects, skills, or how to get in touch." },
  ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const reply = getReply(text);
    setMessages((prev) => [...prev, { role: 'visitor', text }, { role: 'bot', text: reply }]);
    setInput('');
  }

  return (
    <div className="flex h-80 flex-col text-sm">
      <div className="flex-1 space-y-2 overflow-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'visitor' ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`max-w-[80%] rounded-lg px-3 py-1.5 ${
                m.role === 'visitor' ? 'bg-cyan-500/80 text-black' : 'bg-white/10 text-white/90'
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2 border-t border-white/10 pt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, skills, contact..."
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60"
        />
        <button
          type="submit"
          className="rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

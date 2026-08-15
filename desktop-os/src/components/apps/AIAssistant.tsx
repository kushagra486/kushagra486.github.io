'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage, getSmartReply } from '@/lib/chatbot';
import { recordChatMessage } from '@/lib/achievements';

interface Message {
  role: 'bot' | 'visitor';
  text: string;
}

// Not standardized in lib.dom.d.ts yet — narrow shape of the bits we actually use.
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition as new () => SpeechRecognitionLike) || (w.webkitSpeechRecognition as new () => SpeechRecognitionLike) || null;
}

export function AIAssistant() {
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupport, setVoiceSupport] = useState({ mic: false, tts: false });
  const [voiceReplies, setVoiceReplies] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Kushagra's portfolio assistant. Ask me about his projects, skills, or how to get in touch." },
  ]);

  useEffect(() => {
    // Client-only feature detection — avoids a server/client mismatch on first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVoiceSupport({
      mic: !!getSpeechRecognitionCtor(),
      tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;

    const history: ChatMessage[] = messages.map((m) => ({
      role: m.role === 'visitor' ? 'user' : 'assistant',
      content: m.text,
    }));

    recordChatMessage();
    setMessages((prev) => [...prev, { role: 'visitor', text }]);
    setInput('');
    setThinking(true);
    const reply = await getSmartReply(text, history);
    setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    setThinking(false);

    if (voiceReplies && voiceSupport.tts) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(reply));
    }
  }

  function toggleListening() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setInput(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  return (
    <div className="flex h-80 flex-col text-sm">
      <div className="flex-1 space-y-2 overflow-auto pr-1" aria-live="polite">
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
        {thinking && (
          <div className="flex justify-start">
            <span className="max-w-[80%] rounded-lg bg-white/10 px-3 py-1.5 text-white/50">Thinking…</span>
          </div>
        )}
      </div>
      {voiceSupport.tts && (
        <button
          type="button"
          onClick={() => setVoiceReplies((v) => !v)}
          aria-pressed={voiceReplies}
          className={`mb-2 self-start rounded-full border px-2 py-0.5 text-[10px] transition ${
            voiceReplies ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-200' : 'border-white/15 text-white/50 hover:text-white/80'
          }`}
        >
          🔊 Voice replies {voiceReplies ? 'on' : 'off'}
        </button>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 pt-2">
        <label htmlFor="ai-assistant-input" className="sr-only">
          Message
        </label>
        <input
          id="ai-assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, skills, contact..."
          disabled={thinking}
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60 disabled:opacity-50"
        />
        {voiceSupport.mic && (
          <button
            type="button"
            onClick={toggleListening}
            aria-pressed={listening}
            aria-label={listening ? 'Stop voice input' : 'Start voice input'}
            title={listening ? 'Stop listening' : 'Speak your question'}
            className={`rounded-md px-2.5 py-1.5 text-xs transition ${
              listening ? 'animate-pulse bg-red-500/80 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            🎤
          </button>
        )}
        <button
          type="submit"
          disabled={thinking}
          className="rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

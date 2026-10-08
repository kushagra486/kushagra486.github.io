'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useDesktopStore } from '@/store/useDesktopStore';
import { usePreferences } from '@/lib/preferences';
import { sound } from '@/lib/sound';
import { profile } from '@/lib/portfolioData';
import { AppIcon } from '@/components/os/AppIcon';

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const HINTS = [
  { title: 'Say hello', body: "I'm Kushagra's AI assistant — ask me anything about his projects, skills, or experience." },
  { title: 'Hiring?', body: 'Paste a job description into JD Matcher and see how well Kushagra fits the role.' },
  { title: 'Explore the Skill Graph', body: 'See how every project, language, and framework connects.' },
];

const ASSISTANT_ICON = { Glyph: MessageCircle, gradient: 'from-emerald-400 to-green-600' };
const ORB = 'conic-gradient(from 0deg, #ff9f0a, #ff375f, #bf5af2, #0a84ff, #64d2ff, #ff9f0a)';

/** Always-on-desktop assistant: a Siri-style orb, plus macOS notification banners with hints. */
export function DesktopAssistant() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [silenced, setSilenced] = useState(false);

  // Like real notifications: each banner shows briefly, then the next one arrives much later.
  // Dismissing one (or opening the assistant) silences the rest.
  useEffect(() => {
    if (silenced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    HINTS.forEach((_, i) => {
      const showAt = 1400 + i * 40000;
      timers.push(setTimeout(() => setHintIndex(i), showAt));
      timers.push(setTimeout(() => setHintIndex((cur) => (cur === i ? null : cur)), showAt + 7000));
    });
    return () => timers.forEach(clearTimeout);
  }, [silenced]);

  function dismiss() {
    setHintIndex(null);
    setSilenced(true);
  }

  function openAssistant() {
    sound.open();
    dismiss();
    openWindow('ai-assistant', 'AI Assistant');
  }

  const hint = hintIndex === null ? null : HINTS[hintIndex];

  return (
    <>
      <div className="pointer-events-none fixed inset-x-2 top-12 z-40 sm:inset-x-auto sm:right-2 sm:top-9 sm:w-[22rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {hint && (
            <motion.div
              key={hint.title}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="mac-menu group pointer-events-auto relative flex gap-3 rounded-[18px] p-3 pr-4"
            >
              <button
                aria-label="Dismiss notification"
                onClick={dismiss}
                className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-zinc-700 text-white/80 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
              </button>
              <AppIcon icon={ASSISTANT_ICON} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-white">{hint.title}</p>
                  <span className="shrink-0 text-[11px] text-white/45">now</span>
                </div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white/75">{hint.body}</p>
                <button
                  onClick={openAssistant}
                  className="mt-2 rounded-md bg-white/15 px-2.5 py-[3px] text-[12px] font-medium text-white transition hover:bg-white/25 active:scale-95"
                >
                  Chat with me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-auto fixed bottom-24 right-6 z-[15] hidden sm:block">
        <motion.button
          onClick={openAssistant}
          aria-label="Open AI Assistant"
          title="Chat with Kushagra's AI Assistant"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative block h-14 w-14 rounded-full"
        >
          {!reducedMotion && (
            <motion.span
              className="absolute -inset-2 rounded-full opacity-70 blur-lg"
              style={{ background: ORB }}
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ rotate: { duration: 7, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            />
          )}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: ORB }}
            animate={reducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute inset-[3px] flex items-center justify-center rounded-full bg-black/70 text-sm font-semibold tracking-tight text-white backdrop-blur-md">
            {initials}
          </span>
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-black bg-[#30d158]" />
        </motion.button>
      </div>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/portfolioData';
import { usePreferences } from '@/lib/preferences';

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const roleWords = profile.openToRoles.length > 0 ? profile.openToRoles : [profile.role];

/** Types + deletes through a list of words, cycling forever. Client-only (setInterval-driven). */
function useTypewriter(words: string[], typingMs = 55, deletingMs = 30, pauseMs = 1400) {
  const [text, setText] = useState(words[0]);
  const wordsRef = useRef(words);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = wordsRef.current[0].length;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const list = wordsRef.current;
      const current = list[wordIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          charIndex = current.length;
          deleting = true;
          setText(current.slice(0, charIndex));
          timeout = setTimeout(tick, pauseMs);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % list.length;
          charIndex = 0;
        }
      }

      setText(current.slice(0, Math.max(charIndex, 0)));
      timeout = setTimeout(tick, deleting ? deletingMs : typingMs);
    }

    timeout = setTimeout(tick, pauseMs);
    return () => clearTimeout(timeout);
  }, [typingMs, deletingMs, pauseMs]);

  return text;
}

const links = [
  { label: 'LinkedIn', icon: '💼', href: profile.links.linkedin },
  { label: 'GitHub', icon: '🐙', href: profile.links.github },
  { label: 'Email', icon: '✉️', href: profile.links.email },
];

/** Default-visible "about me" card on the desktop — animated avatar ring + typewriter role, no window needed. */
export function ProfileCard() {
  const role = useTypewriter(roleWords);
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  return (
    <div className="pointer-events-auto absolute left-1/2 top-11 z-10 hidden w-[min(90vw,26rem)] -translate-x-1/2 sm:block">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
        {/* Ambient moving glow — a video-loop-style animated backdrop, no video asset needed. */}
        {!reducedMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
              animate={{ x: [0, 24, 0], y: [0, 14, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute -right-12 -bottom-16 h-44 w-44 rounded-full bg-fuchsia-400/10 blur-3xl"
              animate={{ x: [0, -18, 0], y: [0, -12, 0], scale: [1.1, 1, 1.1] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <div className="relative flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <motion.div
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#a855f7,#22d3ee)]"
              animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-[#0f2740] text-lg font-bold text-white">
              {initials}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="bg-[length:200%_auto] bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-lg font-bold tracking-tight text-transparent [animation:name-shimmer_5s_linear_infinite] sm:text-xl">
              {profile.name}
            </h1>
            <p className="mt-0.5 h-4 text-xs font-medium text-cyan-200/80">
              {role}
              <span className="animate-pulse text-cyan-300">▌</span>
            </p>
            <p className="mt-1 truncate text-[11px] text-white/40">
              {profile.location} · {profile.education}
            </p>
          </div>
        </div>

        <p className="relative mt-3 line-clamp-2 text-[11px] leading-relaxed text-white/55">{profile.bio}</p>

        <div className="relative mt-3 flex gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 transition hover:border-cyan-300/40 hover:bg-white/10 hover:text-white"
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

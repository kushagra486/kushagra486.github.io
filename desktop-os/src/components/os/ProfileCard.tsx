'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { profile } from '@/lib/portfolioData';
import { GitHubMark } from '@/components/os/BrandMarks';
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

function LinkedInMark() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      <path d="M13.63 13.63h-2.37V9.92c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.96v3.78H6.22V6h2.28v1.04h.03c.32-.6 1.09-1.24 2.25-1.24 2.4 0 2.85 1.58 2.85 3.64v4.19zM3.54 4.96a1.37 1.37 0 110-2.75 1.37 1.37 0 010 2.75zm1.19 8.67H2.35V6h2.38v7.63zM14.81 0H1.18C.53 0 0 .52 0 1.15v13.7C0 15.48.53 16 1.18 16h13.63c.65 0 1.19-.52 1.19-1.15V1.15C16 .52 15.46 0 14.81 0z" />
    </svg>
  );
}

const links = [
  { label: 'LinkedIn', icon: <LinkedInMark />, href: profile.links.linkedin },
  { label: 'GitHub', icon: <GitHubMark />, href: profile.links.github },
  { label: 'Email', icon: <Mail className="h-3 w-3" strokeWidth={2.2} />, href: profile.links.email },
];

/** Apple Intelligence-style multicolor gradient used for the avatar ring and name shimmer. */
const AI_GRADIENT = '#ff9f0a,#ff375f,#bf5af2,#0a84ff,#64d2ff,#ff9f0a';

/** Default-visible "about me" card on the desktop — animated avatar ring + typewriter role, no window needed. */
export function ProfileCard() {
  const role = useTypewriter(roleWords);
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  return (
    <motion.div
      initial={{ opacity: 0, y: -14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 1.9 }}
      className="pointer-events-auto absolute left-1/2 top-10 z-10 hidden w-[min(90vw,26rem)] -translate-x-1/2 sm:block"
    >
      <div className="mac-widget relative overflow-hidden p-5">
        {/* Ambient moving glow — a video-loop-style animated backdrop, no video asset needed. */}
        {!reducedMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-[#0a84ff]/25 blur-3xl"
              animate={{ x: [0, 24, 0], y: [0, 14, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute -right-12 -bottom-16 h-44 w-44 rounded-full bg-[#ff375f]/15 blur-3xl"
              animate={{ x: [0, -18, 0], y: [0, -12, 0], scale: [1.1, 1, 1.1] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <div className="relative flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(from 0deg, ${AI_GRADIENT})` }}
              animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 text-lg font-semibold tracking-tight text-white">
              {initials}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h1
              className="bg-[length:200%_auto] bg-clip-text text-[22px] font-bold tracking-tight text-transparent [animation:name-shimmer_8s_linear_infinite]"
              style={{ backgroundImage: `linear-gradient(90deg, #fff 0%, #fff 30%, ${AI_GRADIENT}, #fff 70%, #fff 100%)` }}
            >
              {profile.name}
            </h1>
            <p className="mt-0.5 h-4 text-[13px] font-medium text-white/75">
              {role}
              <span className="ml-px inline-block h-[13px] w-[2px] translate-y-[2px] animate-pulse bg-[#0a84ff]" />
            </p>
            <p className="mt-1 truncate text-[11px] text-white/45">
              {profile.location} · {profile.education}
            </p>
          </div>
        </div>

        <p className="relative mt-3 line-clamp-2 text-[12px] leading-relaxed text-white/65">{profile.bio}</p>

        <div className="relative mt-3 flex gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/85 transition hover:bg-white/20 hover:text-white active:scale-95"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { expertise, profile, skills } from '@/lib/portfolioData';
import { usePreferences } from '@/lib/preferences';

function MotionPhoto() {
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  return (
    <div className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-xl border border-cyan-300/20 shadow-2xl">
      <motion.img
        src="/avatar/photo.jpg"
        alt={profile.name}
        className="h-full w-full object-cover"
        animate={
          reducedMotion
            ? { scale: 1 }
            : { scale: [1, 1.1, 1.03, 1.1, 1], x: [0, -6, 4, -3, 0], y: [0, -4, 3, -2, 0] }
        }
        transition={reducedMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1a2e]/70 via-transparent to-transparent" />
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-cyan-300/25 to-transparent"
          animate={{ top: ['-10%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
        LIVE
      </div>
    </div>
  );
}

export function AboutMe() {
  return (
    <div className="space-y-4 text-sm">
      <MotionPhoto />

      <div>
        <h2 className="text-lg font-semibold text-white">{profile.name}</h2>
        <p className="text-cyan-300/90">{profile.role}</p>
        <p className="mt-1 text-xs text-white/50">{profile.education}</p>
        <p className="text-xs text-white/50">{profile.location}</p>
      </div>

      <p className="leading-relaxed text-white/80">{profile.bio}</p>

      <div className="flex flex-wrap gap-2">
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[#0A66C2] px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
        >
          GitHub
        </a>
        <a
          href={profile.links.email}
          className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
        >
          Email
        </a>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Core Expertise</p>
        <div className="space-y-1.5">
          {expertise.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span>{item.label}</span>
                <span className="text-white/40">{item.percent}%</span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(skills).map(([category, list]) => (
          <div key={category}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">{category}</p>
            <div className="flex flex-wrap gap-1.5">
              {list.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">Open to Roles</p>
        <ul className="list-disc space-y-0.5 pl-4 text-xs text-white/70">
          {profile.openToRoles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

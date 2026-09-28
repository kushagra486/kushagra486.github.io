'use client';

import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, GraduationCap } from 'lucide-react';
import { expertise, profile, skills } from '@/lib/portfolioData';
import { Reveal, RevealItem, WindowScrollContext } from '@/components/os/Reveal';

const AI_GRADIENT = 'linear-gradient(90deg, #ff9f0a, #ff375f, #bf5af2, #0a84ff, #64d2ff)';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 px-1 text-[13px] font-semibold text-white/50">{children}</h3>;
}

/** Bar fills (via scaleX, not width) the first time it scrolls into view. */
function ExpertiseBar({ label, percent, index }: { label: string; percent: number; index: number }) {
  const root = useContext(WindowScrollContext);
  return (
    <div className="px-3.5 py-2.5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-white/90">{label}</span>
        <span className="tabular-nums text-white/45">{percent}%</span>
      </div>
      <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ width: `${percent}%`, background: AI_GRADIENT }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ root: root ?? undefined, once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20, delay: index * 0.05 }}
        />
      </div>
    </div>
  );
}

export function AboutMe() {
  return (
    <div className="mx-auto max-w-2xl space-y-7 pb-4 text-sm">
      <Reveal className="pt-2 text-center">
        <h2 className="text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">{profile.name}</h2>
        <p
          className="mt-1 bg-clip-text text-[15px] font-semibold text-transparent sm:text-[17px]"
          style={{ backgroundImage: AI_GRADIENT }}
        >
          {profile.role}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-white/50">
          <span className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" /> {profile.education}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="text-center text-[15px] leading-relaxed text-white/80">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#0a84ff] px-4 py-1.5 text-[13px] font-medium text-white transition hover:brightness-110 active:scale-95"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-white/20 active:scale-95"
          >
            GitHub
          </a>
          <a
            href={profile.links.email}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-white/20 active:scale-95"
          >
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        </div>
      </Reveal>

      <Reveal>
        <SectionTitle>Core Expertise</SectionTitle>
        <div className="divide-y divide-white/[0.07] overflow-hidden rounded-xl bg-white/[0.05] ring-[0.5px] ring-white/10">
          {expertise.map((item, i) => (
            <ExpertiseBar key={item.label} label={item.label} percent={item.percent} index={i} />
          ))}
        </div>
      </Reveal>

      <div className="space-y-5">
        {Object.entries(skills).map(([category, list], i) => (
          <RevealItem key={category} index={i}>
            <SectionTitle>{category}</SectionTitle>
            <div className="flex flex-wrap gap-1.5 px-1">
              {list.map((skill) => (
                <span key={skill} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[12px] text-white/85 ring-[0.5px] ring-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </RevealItem>
        ))}
      </div>

      <Reveal>
        <SectionTitle>Open to Roles</SectionTitle>
        <ul className="divide-y divide-white/[0.07] overflow-hidden rounded-xl bg-white/[0.05] ring-[0.5px] ring-white/10">
          {profile.openToRoles.map((role) => (
            <li key={role} className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
              {role}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

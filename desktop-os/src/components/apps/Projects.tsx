'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/portfolioData';
import { RevealItem } from '@/components/os/Reveal';

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ul className="mx-auto max-w-3xl space-y-3">
      <li className="px-1 pb-1">
        <h2 className="text-[26px] font-bold tracking-tight text-white">Projects</h2>
        <p className="text-[13px] text-white/50">{projects.length} projects, built and shipped end to end.</p>
      </li>
      {projects.map((project, index) => (
        <RevealItem
          key={project.slug}
          index={index}
          as="li"
          className="rounded-[14px] bg-white/[0.05] p-4 ring-[0.5px] ring-white/10 transition-colors hover:bg-white/[0.08]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[15px] font-semibold tracking-tight text-white">
                <span className="mr-1.5">{project.emoji}</span>
                {project.name}
              </p>
              <p className="mt-0.5 text-[12.5px] text-white/55">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-0.5 rounded-full bg-[#0a84ff] px-3 py-1 text-[12px] font-medium text-white transition hover:brightness-110 active:scale-95"
                >
                  Open <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-0.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white transition hover:bg-white/20 active:scale-95"
              >
                Code <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              </a>
            </div>
          </div>
          <ul className="mt-2.5 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-white/75 marker:text-white/30">
            {project.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] text-white/65"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.caseStudy && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded((cur) => (cur === project.slug ? null : project.slug))}
                aria-expanded={expanded === project.slug}
                className="flex items-center gap-1 text-[12.5px] font-medium text-[#409cff] hover:text-[#6cb6ff]"
              >
                <motion.span animate={{ rotate: expanded === project.slug ? 90 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </motion.span>
                {expanded === project.slug ? 'Hide case study' : 'View case study'}
              </button>
              <AnimatePresence initial={false}>
              {expanded === project.slug && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  className="mt-2 space-y-2.5 rounded-xl bg-black/25 p-3 text-[12.5px] leading-relaxed text-white/75"
                >
                  <div>
                    <p className="font-semibold text-white/90">Problem</p>
                    <p className="mt-0.5">{project.caseStudy.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/90">Approach</p>
                    <ul className="mt-0.5 list-disc space-y-0.5 pl-4">
                      {project.caseStudy.approach.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white/90">Outcome</p>
                    <p className="mt-0.5">{project.caseStudy.outcome}</p>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          )}
        </RevealItem>
      ))}
    </ul>
  );
}

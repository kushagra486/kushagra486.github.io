'use client';

import { useState } from 'react';
import { projects } from '@/lib/portfolioData';

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ul className="space-y-3">
      {projects.map((project) => (
        <li key={project.slug} className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white">
                {project.emoji} {project.name}
              </p>
              <p className="text-xs text-cyan-300/80">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-cyan-400/90 px-2.5 py-1 text-[11px] font-medium text-black transition hover:bg-cyan-300"
                >
                  Live ↗
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-white/20"
              >
                Code ↗
              </a>
            </div>
          </div>
          <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-white/70">
            {project.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.caseStudy && (
            <div className="mt-2">
              <button
                onClick={() => setExpanded((cur) => (cur === project.slug ? null : project.slug))}
                aria-expanded={expanded === project.slug}
                className="text-[11px] font-medium text-cyan-300/80 hover:text-cyan-200"
              >
                {expanded === project.slug ? '▾ Hide case study' : '▸ View case study'}
              </button>
              {expanded === project.slug && (
                <div className="mt-2 space-y-2 rounded-md border border-white/10 bg-black/20 p-2.5 text-xs text-white/75">
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
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

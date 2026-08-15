'use client';

import { useMemo, useState } from 'react';
import { projects, skills } from '@/lib/portfolioData';

const CATEGORIES = Object.keys(skills) as (keyof typeof skills)[];

interface Positioned {
  id: string;
  x: number;
  y: number;
}

function matchedCategories(stack: string[]): (keyof typeof skills)[] {
  return CATEGORIES.filter((cat) =>
    skills[cat].some((skill) =>
      stack.some((s) => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))
    )
  );
}

/** Deterministic bipartite layout: skill categories on an inner ring, projects on an outer ring near their matched categories. */
function useGraphLayout() {
  return useMemo(() => {
    const categoryPos: Record<string, Positioned> = {};
    CATEGORIES.forEach((cat, i) => {
      const angle = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
      categoryPos[cat] = { id: cat, x: 50 + Math.cos(angle) * 26, y: 50 + Math.sin(angle) * 26 };
    });

    const projectLinks: Record<string, (keyof typeof skills)[]> = {};
    const projectPos: Record<string, Positioned> = {};

    projects.forEach((project, i) => {
      const matches = matchedCategories(project.stack);
      projectLinks[project.slug] = matches;

      let angle: number;
      if (matches.length > 0) {
        const vec = matches.reduce(
          (acc, cat) => {
            const p = categoryPos[cat];
            const a = Math.atan2(p.y - 50, p.x - 50);
            return { x: acc.x + Math.cos(a), y: acc.y + Math.sin(a) };
          },
          { x: 0, y: 0 }
        );
        angle = Math.atan2(vec.y, vec.x);
      } else {
        angle = (i / projects.length) * Math.PI * 2;
      }
      const radius = 44 + ((i * 7) % 6);
      projectPos[project.slug] = {
        id: project.slug,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    });

    return { categoryPos, projectPos, projectLinks };
  }, []);
}

type Selection = { kind: 'category'; id: string } | { kind: 'project'; id: string } | null;

export function SkillGraph() {
  const { categoryPos, projectPos, projectLinks } = useGraphLayout();
  const [selected, setSelected] = useState<Selection>(null);

  const selectedProject = selected?.kind === 'project' ? projects.find((p) => p.slug === selected.id) : null;
  const relatedProjects =
    selected?.kind === 'category' ? projects.filter((p) => projectLinks[p.slug].includes(selected.id as keyof typeof skills)) : [];

  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="text-xs text-white/50">
        Skill categories (cyan) and projects (dots) — click any node to see how they connect.
      </p>

      <div className="relative h-[52vh] min-h-72 overflow-hidden rounded-lg border border-white/10 bg-black/20">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {projects.map((project) =>
            projectLinks[project.slug].map((cat) => {
              const from = projectPos[project.slug];
              const to = categoryPos[cat];
              const highlighted =
                (selected?.kind === 'project' && selected.id === project.slug) ||
                (selected?.kind === 'category' && selected.id === cat);
              return (
                <line
                  key={`${project.slug}-${cat}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={highlighted ? 0.4 : 0.2}
                />
              );
            })
          )}
        </svg>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected({ kind: 'category', id: cat })}
            style={{ left: `${categoryPos[cat].x}%`, top: `${categoryPos[cat].y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap transition ${
              selected?.kind === 'category' && selected.id === cat
                ? 'border-cyan-300 bg-cyan-400/30 text-white'
                : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100/80 hover:bg-cyan-400/20'
            }`}
          >
            {cat}
          </button>
        ))}

        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => setSelected({ kind: 'project', id: project.slug })}
            aria-label={project.name}
            title={project.name}
            style={{ left: `${projectPos[project.slug].x}%`, top: `${projectPos[project.slug].y}%` }}
            className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs transition ${
              selected?.kind === 'project' && selected.id === project.slug
                ? 'border-white bg-white/20 scale-125'
                : 'border-white/20 bg-white/5 hover:bg-white/15'
            }`}
          >
            {project.emoji}
          </button>
        ))}
      </div>

      <div className="min-h-20 rounded-lg border border-white/10 bg-white/5 p-3" aria-live="polite">
        {!selected && <p className="text-xs text-white/40">Select a node to see its connections.</p>}
        {selectedProject && (
          <div>
            <p className="font-semibold text-white">
              {selectedProject.emoji} {selectedProject.name}
            </p>
            <p className="mt-0.5 text-xs text-cyan-300/80">{selectedProject.tagline}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedProject.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {selected?.kind === 'category' && (
          <div>
            <p className="font-semibold text-white">{selected.id}</p>
            <p className="mt-0.5 text-xs text-white/50">{skills[selected.id as keyof typeof skills].join(', ')}</p>
            <p className="mt-2 text-[11px] text-white/40">Used in {relatedProjects.length} project(s):</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-white/70">
              {relatedProjects.map((p) => (
                <li key={p.slug}>{p.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

import { projects } from '@/lib/portfolioData';

export function Projects() {
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
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-white/20"
            >
              Open ↗
            </a>
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
        </li>
      ))}
    </ul>
  );
}

import { profile, skills } from '@/lib/portfolioData';

export function AboutMe() {
  return (
    <div className="space-y-4 text-sm">
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
    </div>
  );
}

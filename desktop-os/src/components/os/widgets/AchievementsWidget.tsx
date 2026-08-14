'use client';

import { certifications, liveApps, projects } from '@/lib/portfolioData';
import { useDesktopStore } from '@/store/useDesktopStore';

export function AchievementsWidget() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const awsCerts = certifications.filter((c) => c.issuer.includes('AWS')).length;

  const stats = [
    { label: 'Projects shipped', value: projects.length, onClick: () => openWindow('projects', 'Projects') },
    { label: 'Live apps', value: liveApps.length, onClick: () => openWindow('app-dashboard', 'Live Apps') },
    {
      label: 'Certifications',
      value: certifications.length,
      onClick: () => openWindow('certifications', 'Certifications'),
    },
    { label: 'AWS credentials', value: awsCerts, onClick: () => openWindow('certifications', 'Certifications') },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/50">Achievements</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className="rounded-lg bg-white/5 p-2 text-left transition hover:bg-white/10"
          >
            <p className="text-lg font-semibold text-white">{stat.value}</p>
            <p className="text-[10px] leading-tight text-white/50">{stat.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

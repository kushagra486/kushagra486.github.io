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
    <div className="mac-widget p-4">
      <p className="text-[13px] font-semibold text-white/90">Achievements</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className="rounded-xl bg-white/[0.07] p-2.5 text-left transition hover:bg-white/[0.14] active:scale-[0.97]"
          >
            <p className="text-[22px] font-semibold leading-none tracking-tight text-white tabular-nums">{stat.value}</p>
            <p className="mt-1 text-[11px] leading-tight text-white/55">{stat.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

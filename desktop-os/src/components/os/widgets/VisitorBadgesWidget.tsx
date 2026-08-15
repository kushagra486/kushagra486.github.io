'use client';

import { useEffect, useState } from 'react';
import { Achievement, getAchievements } from '@/lib/achievements';

export function VisitorBadgesWidget() {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);

  useEffect(() => {
    // Client-only: reads localStorage, refreshed each time this widget mounts (panel opens).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAchievements(getAchievements());
  }, []);

  const unlocked = achievements?.filter((a) => a.unlocked).length ?? 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/50">Your Badges</p>
        {achievements && <p className="text-[10px] text-white/30">{unlocked}/{achievements.length}</p>}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {(achievements ?? []).map((a) => (
          <div
            key={a.id}
            title={a.description}
            className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center transition ${
              a.unlocked ? 'bg-cyan-400/10' : 'bg-white/5 opacity-30 grayscale'
            }`}
          >
            <span className="text-lg">{a.icon}</span>
            <span className="text-[9px] leading-tight text-white/70">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

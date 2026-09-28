'use client';

import { ProfileCard } from '@/components/os/ProfileCard';

/** Default-visible desktop hero — the profile card, floating over the wallpaper like a widget. */
export function DesktopHero() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <ProfileCard />
    </div>
  );
}

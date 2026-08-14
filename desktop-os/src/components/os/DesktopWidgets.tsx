import { ClockWidget } from '@/components/os/widgets/ClockWidget';
import { AchievementsWidget } from '@/components/os/widgets/AchievementsWidget';
import { GitHubStreakWidget } from '@/components/os/widgets/GitHubStreakWidget';

/** Widgets pinned directly on the desktop background, always visible (no panel toggle needed). */
export function DesktopWidgets() {
  return (
    <div className="pointer-events-auto absolute right-4 top-4 z-10 hidden w-64 space-y-3 sm:block">
      <ClockWidget />
      <AchievementsWidget />
      <GitHubStreakWidget />
    </div>
  );
}

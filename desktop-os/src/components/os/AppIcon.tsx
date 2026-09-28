import type { LucideIcon } from 'lucide-react';

export interface AppIconStyle {
  Glyph: LucideIcon;
  /** Tailwind gradient stops for the squircle background, e.g. 'from-sky-400 to-blue-600'. */
  gradient: string;
}

/**
 * macOS Big Sur-style app icon: a gradient squircle with a white glyph and a soft top sheen.
 * `size="fill"` stretches to the parent (used by the dock, whose icon size is spring-animated).
 */
export function AppIcon({
  icon,
  size = 48,
  className = '',
}: {
  icon: AppIconStyle;
  size?: number | 'fill';
  className?: string;
}) {
  const { Glyph, gradient } = icon;
  const box = size === 'fill' ? { width: '100%', height: '100%' } : { width: size, height: size };
  return (
    <span
      aria-hidden="true"
      className={`mac-app-icon relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b ${gradient} ${className}`}
      style={box}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <Glyph
        className="relative h-[52%] w-[52%] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
        strokeWidth={1.9}
      />
    </span>
  );
}

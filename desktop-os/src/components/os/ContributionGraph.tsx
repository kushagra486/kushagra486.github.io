'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ContributionDay, formatDay } from '@/lib/contributions';

// GitHub's dark-theme contribution greens, level 0-4.
export const LEVEL_COLORS = ['rgba(255,255,255,0.07)', '#0e4429', '#006d32', '#26a641', '#39d353'];

type Cell = ContributionDay | null;

function toWeeks(days: ContributionDay[]): Cell[][] {
  if (days.length === 0) return [];
  const [y, m, d] = days[0].date.split('-').map(Number);
  const pad = new Date(y, m - 1, d).getDay(); // align first column to Sunday like GitHub
  const cells: Cell[] = [...Array<Cell>(pad).fill(null), ...days];
  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/**
 * GitHub-style contribution calendar that shows as many recent weeks as fit its width.
 * Cells cascade in column by column; hovering (or focusing) a cell reports it via `onHover`.
 */
export function ContributionGraph({
  days,
  cell = 9,
  gap = 2,
  onHover,
  loading = false,
}: {
  days: ContributionDay[];
  cell?: number;
  gap?: number;
  onHover?: (day: ContributionDay | null) => void;
  loading?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const allWeeks = useMemo(() => toWeeks(days), [days]);
  const fit = Math.max(1, Math.floor((width + gap) / (cell + gap)));
  const weeks = loading ? Array.from({ length: fit }, () => Array<Cell>(7).fill(null)) : allWeeks.slice(-fit);

  const monthLabels = useMemo(() => {
    const labels: { index: number; text: string }[] = [];
    let prevMonth = -1;
    weeks.forEach((week, i) => {
      const first = week.find((c): c is ContributionDay => !!c);
      if (!first) return;
      const month = Number(first.date.slice(5, 7));
      if (month !== prevMonth) {
        const last = labels[labels.length - 1];
        // Skip a label that would collide with the previous one (e.g. a partial first week).
        if (!last || i - last.index >= 3) labels.push({ index: i, text: formatDay(first.date, { month: 'short' }) });
        prevMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const step = cell + gap;

  return (
    <div ref={ref} className="w-full" onMouseLeave={() => onHover?.(null)}>
      <div className="relative mb-1 h-3 text-[9.5px] text-white/40">
        {monthLabels.map((l) => (
          <span key={`${l.index}-${l.text}`} className="absolute top-0" style={{ left: l.index * step }}>
            {l.text}
          </span>
        ))}
      </div>
      <div
        role="grid"
        aria-label="GitHub contributions calendar"
        className="grid"
        style={{
          gridAutoFlow: 'column',
          gridTemplateRows: `repeat(7, ${cell}px)`,
          gridAutoColumns: `${cell}px`,
          gap,
        }}
      >
        {weeks.map((week, wi) =>
          Array.from({ length: 7 }, (_, di) => {
            const day = week[di] ?? null;
            const style = {
              background: day ? LEVEL_COLORS[day.level] : loading ? LEVEL_COLORS[0] : 'transparent',
              animationDelay: `${wi * 14}ms`,
            };
            if (!day) {
              return (
                <span
                  key={`${wi}-${di}`}
                  className={`rounded-[2px] ${loading ? 'animate-pulse' : ''}`}
                  style={style}
                  aria-hidden="true"
                />
              );
            }
            const label = `${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDay(day.date)}`;
            return (
              <span
                key={day.date}
                role="gridcell"
                aria-label={label}
                title={label}
                tabIndex={-1}
                onMouseEnter={() => onHover?.(day)}
                className="mac-contrib-cell rounded-[2px] ring-inset transition-shadow hover:ring-1 hover:ring-white/70"
                style={style}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export function ContributionLegend() {
  return (
    <div className="flex items-center gap-1 text-[10px] text-white/40" aria-hidden="true">
      Less
      {LEVEL_COLORS.map((c) => (
        <span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
      ))}
      More
    </div>
  );
}

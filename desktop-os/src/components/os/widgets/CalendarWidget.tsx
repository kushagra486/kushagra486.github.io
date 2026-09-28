'use client';

import { useMemo } from 'react';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarWidget() {
  const { monthLabel, cells, today } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return {
      monthLabel: now.toLocaleDateString([], { month: 'long', year: 'numeric' }),
      cells,
      today: now.getDate(),
    };
  }, []);

  return (
    <div className="mac-widget p-4">
      <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-[#ff453a]">{monthLabel}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="text-white/40">
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={`flex h-6 w-6 items-center justify-center justify-self-center rounded-full ${
              day === today ? 'bg-[#ff453a] font-semibold text-white' : 'text-white/80'
            }`}
          >
            {day ?? ''}
          </span>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

/** Sonoma-style clock widget: red weekday, large light numerals. */
export function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Client-only: avoids a server/client hydration mismatch on the initial timestamp.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mac-widget px-4 py-3.5">
      {now ? (
        <>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#ff453a]">
            {now.toLocaleDateString([], { weekday: 'long' })}
          </p>
          <p className="mt-0.5 text-[40px] font-light leading-none tracking-tight tabular-nums text-white">
            {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            <span className="ml-1 align-top text-[15px] font-normal text-white/45">
              {String(now.getSeconds()).padStart(2, '0')}
            </span>
          </p>
          <p className="mt-1.5 text-[12px] text-white/55">
            {now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </>
      ) : (
        <p className="text-[40px] font-light text-white/20">--:--</p>
      )}
    </div>
  );
}

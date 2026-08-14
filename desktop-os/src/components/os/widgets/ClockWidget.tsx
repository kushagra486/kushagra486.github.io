'use client';

import { useEffect, useState } from 'react';

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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {now ? (
        <>
          <p className="text-3xl font-semibold tabular-nums text-white">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="mt-1 text-xs text-white/50">
            {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </>
      ) : (
        <p className="text-3xl font-semibold text-white/20">--:--:--</p>
      )}
    </div>
  );
}

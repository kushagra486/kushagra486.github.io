'use client';

import { useEffect, useState } from 'react';

/** True below Tailwind's `sm` breakpoint — the iOS-style layout. False during SSR and first paint. */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639.98px)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return mobile;
}

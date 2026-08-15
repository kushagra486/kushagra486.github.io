'use client';

import { useState } from 'react';

// Set this to your WakaTime username to enable the widget (Settings → Badge → make it public
// at wakatime.com/settings/badges). Left blank, the widget renders nothing.
const WAKATIME_USERNAME = '';

export function WakaTimeWidget() {
  const [failed, setFailed] = useState(false);

  if (!WAKATIME_USERNAME || failed) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="mb-1 text-xs text-white/50">⌨️ Currently coding on</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://wakatime.com/badge/user/${WAKATIME_USERNAME}.svg`}
        alt="WakaTime coding activity"
        className="w-full"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

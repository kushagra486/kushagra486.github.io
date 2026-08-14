'use client';

import { useState } from 'react';
import { certifications, type Certification } from '@/lib/portfolioData';

export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);
  const pendingCount = certifications.filter((c) => !c.imageUrl).length;

  return (
    <div className="space-y-3">
      {pendingCount > 0 && (
        <p className="text-xs text-white/50">
          {pendingCount} image{pendingCount === 1 ? '' : 's'} still pending — drop files under{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">public/certs/</code> and set{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">imageUrl</code> in{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">lib/portfolioData.ts</code> to show them.
        </p>
      )}
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.slug}>
            <button
              onClick={() => cert.imageUrl && setSelected(cert)}
              className={`flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2 text-left transition ${
                cert.imageUrl ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/10 text-xl">
                {cert.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cert.imageUrl} alt={cert.name} className="h-full w-full rounded-md object-cover" />
                ) : (
                  '🏅'
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white/90">{cert.name}</p>
                <p className="truncate text-xs text-white/50">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-2xl overflow-auto rounded-xl border border-white/15 bg-[#0f2740] p-3 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white">{selected.name}</p>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="text-white/50 hover:text-white/90"
              >
                ✕
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.imageUrl!} alt={selected.name} className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

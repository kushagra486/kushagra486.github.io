'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { certifications, type Certification } from '@/lib/portfolioData';
import { RevealItem } from '@/components/os/Reveal';

export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);
  const pendingCount = certifications.filter((c) => !c.imageUrl).length;

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <div className="px-1">
        <h2 className="text-[26px] font-bold tracking-tight text-white">Certifications</h2>
        <p className="text-[13px] text-white/50">{certifications.length} credentials across AI, cloud, and analytics.</p>
      </div>
      {pendingCount > 0 && (
        <p className="text-xs text-white/50">
          {pendingCount} image{pendingCount === 1 ? '' : 's'} still pending — drop files under{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">public/certs/</code> and set{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">imageUrl</code> in{' '}
          <code className="rounded bg-white/10 px-1 py-0.5">lib/portfolioData.ts</code> to show them.
        </p>
      )}
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {certifications.map((cert, index) => (
          <RevealItem key={cert.slug} index={index} as="li">
            <button
              onClick={() => cert.imageUrl && setSelected(cert)}
              className={`flex w-full items-center gap-3 rounded-[14px] bg-white/[0.05] p-2.5 text-left ring-[0.5px] ring-white/10 transition ${
                cert.imageUrl ? 'cursor-pointer hover:bg-white/[0.09] active:scale-[0.98]' : 'cursor-default'
              }`}
            >
              <div className="mac-app-icon flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-300 to-amber-500">
                {cert.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cert.imageUrl} alt={cert.name} className="h-full w-full object-cover" />
                ) : (
                  <Award className="h-6 w-6 text-white" strokeWidth={2} />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-white/90">{cert.name}</p>
                <p className="truncate text-[12px] text-white/50">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </button>
          </RevealItem>
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.14 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="mac-menu max-h-[85vh] max-w-2xl overflow-auto rounded-[16px] p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-4 px-1">
                <p className="text-[13px] font-semibold text-white">{selected.name}</p>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.imageUrl!} alt={selected.name} className="w-full rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

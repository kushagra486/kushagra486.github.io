'use client';

import { FormEvent, useState } from 'react';

export function SudhaVatika() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Placeholder: point at the real inquiry webhook URL to go live.
    setStatus('sent');
  }

  return (
    <div className="space-y-3 text-sm">
      <div>
        <h3 className="font-semibold text-white">Sudha Vatika — Guest House</h3>
        <p className="text-xs text-white/60">Property management inquiry dashboard preview.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          required
          placeholder="Guest name"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-white placeholder:text-white/40 outline-none focus:border-cyan-300/60"
        />
        <input
          type="date"
          required
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-white outline-none focus:border-cyan-300/60"
        />
        <textarea
          placeholder="Inquiry details"
          rows={3}
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-white placeholder:text-white/40 outline-none focus:border-cyan-300/60"
        />
        <button
          type="submit"
          className="rounded-md bg-cyan-400/90 px-4 py-1.5 text-sm font-medium text-black transition hover:bg-cyan-300"
        >
          Send Inquiry
        </button>
        {status === 'sent' && (
          <p className="text-xs text-emerald-300">Inquiry queued for webhook delivery.</p>
        )}
      </form>
    </div>
  );
}

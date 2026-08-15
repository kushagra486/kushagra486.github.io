'use client';

import { FormEvent, useState } from 'react';
import { profile } from '@/lib/portfolioData';
import { sendContactMessage } from '@/lib/contact';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus({ kind: 'sending' });

    const result = await sendContactMessage(name, email, message);
    if (result.ok) {
      setStatus({ kind: 'sent' });
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

    if (result.fallbackToMailto) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      // Not an internal route — opens the visitor's own mail client via the mailto: protocol.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `${profile.links.email}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'sent' });
      return;
    }

    setStatus({ kind: 'error', message: result.error });
  }

  if (status.kind === 'sent') {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
        <span className="text-3xl">✅</span>
        <p className="text-sm font-medium text-white">Thanks for reaching out!</p>
        <p className="text-xs text-white/50">Kushagra will get back to you soon.</p>
        <button
          onClick={() => setStatus({ kind: 'idle' })}
          className="mt-2 text-xs text-cyan-300/80 hover:text-cyan-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <p className="text-xs text-white/50">
        Send a message directly — it&apos;s delivered by email. If the mail service isn&apos;t reachable, this
        falls back to opening your own email client instead.
      </p>
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-[11px] text-white/50">
          Name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-[11px] text-white/50">
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-[11px] text-white/50">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="h-28 w-full resize-none rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/60"
        />
      </div>
      {status.kind === 'error' && <p className="text-xs text-red-300/80">{status.message}</p>}
      <button
        type="submit"
        disabled={status.kind === 'sending'}
        className="rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300 disabled:opacity-50"
      >
        {status.kind === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

const CONTACT_PROXY_URL = 'https://kushagra486-github-io.vercel.app/api/contact';

export type ContactResult = { ok: true } | { ok: false; fallbackToMailto: boolean; error: string };

/** Tries the serverless email endpoint; signals whether the caller should fall back to a mailto: link. */
export async function sendContactMessage(name: string, email: string, message: string): Promise<ContactResult> {
  try {
    const res = await fetch(CONTACT_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.status === 501) {
      return { ok: false, fallbackToMailto: true, error: 'Email delivery is not configured yet.' };
    }
    if (!res.ok) {
      return { ok: false, fallbackToMailto: true, error: `Delivery failed (${res.status}).` };
    }
    return { ok: true };
  } catch {
    return { ok: false, fallbackToMailto: true, error: 'Could not reach the mail service.' };
  }
}

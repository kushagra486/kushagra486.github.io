const ALLOWED_ORIGINS = new Set([
  'https://kushagra486.github.io',
  'http://localhost:3000',
]);

const OWNER_EMAIL = 'kushagra.gupta.ald@gmail.com';

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(501).json({ error: 'Email delivery is not configured on the server' });
    return;
  }

  const { name, email, message } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.length > 200) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    res.status(400).json({ error: 'a valid email is required' });
    return;
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 4000) {
    res.status(400).json({ error: 'message is required' });
    return;
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kushagra OS <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      res.status(502).json({ error: 'Email delivery failed', detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: String(err) });
  }
};

import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEMO_EMAIL = 'sund.serik@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, subject } = (req.body ?? {}) as { name?: string; contact?: string; subject?: string };
  if (!name?.trim() || !contact?.trim()) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${DEMO_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        contact: contact.trim(),
        _subject: subject?.trim().slice(0, 120) || 'Заявка на демо — proji studio Knowledge',
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(502).json({ error: 'Email service error', details: data });
    }

    return res.status(200).json({ ok: true, ...data });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

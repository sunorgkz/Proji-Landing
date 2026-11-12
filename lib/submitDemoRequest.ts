const DEMO_EMAIL = 'sund.serik@gmail.com';

const DEFAULT_SUBJECT = 'Заявка на демо — proji studio Knowledge';

const FORMSUBMIT_BODY = (name: string, contact: string, subject = DEFAULT_SUBJECT) => ({
  name,
  contact,
  _subject: subject,
  _template: 'table',
  _captcha: 'false',
});

async function postFormSubmit(name: string, contact: string, subject?: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${DEMO_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(FORMSUBMIT_BODY(name, contact, subject)),
  });
  if (!res.ok) throw new Error('FormSubmit failed');
  const data = await res.json();
  if (data?.success === 'false') throw new Error('FormSubmit rejected');
}

async function postApiRoute(name: string, contact: string, subject?: string) {
  const res = await fetch('/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, contact, subject }),
  });
  if (!res.ok) throw new Error('API failed');
}

/** Sends demo request to sund.serik@gmail.com; subject — тема письма (по умолчанию «Заявка на демо») */
export async function submitDemoRequest(name: string, contact: string, subject?: string) {
  const trimmedName = name.trim();
  const trimmedContact = contact.trim();
  if (!trimmedName || !trimmedContact) {
    throw new Error('Заполните все поля');
  }

  try {
    await postApiRoute(trimmedName, trimmedContact, subject);
    return;
  } catch {
    // Local dev (Vite) has no /api — use FormSubmit directly
  }

  await postFormSubmit(trimmedName, trimmedContact, subject);
}

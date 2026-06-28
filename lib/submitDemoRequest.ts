const DEMO_EMAIL = 'sund.serik@gmail.com';

const FORMSUBMIT_BODY = (name: string, contact: string) => ({
  name,
  contact,
  _subject: 'Заявка на демо — proji studio Knowledge',
  _template: 'table',
  _captcha: 'false',
});

async function postFormSubmit(name: string, contact: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${DEMO_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(FORMSUBMIT_BODY(name, contact)),
  });
  if (!res.ok) throw new Error('FormSubmit failed');
  const data = await res.json();
  if (data?.success === 'false') throw new Error('FormSubmit rejected');
}

async function postApiRoute(name: string, contact: string) {
  const res = await fetch('/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, contact }),
  });
  if (!res.ok) throw new Error('API failed');
}

/** Sends demo request to sund.serik@gmail.com */
export async function submitDemoRequest(name: string, contact: string) {
  const trimmedName = name.trim();
  const trimmedContact = contact.trim();
  if (!trimmedName || !trimmedContact) {
    throw new Error('Заполните все поля');
  }

  try {
    await postApiRoute(trimmedName, trimmedContact);
    return;
  } catch {
    // Local dev (Vite) has no /api — use FormSubmit directly
  }

  await postFormSubmit(trimmedName, trimmedContact);
}

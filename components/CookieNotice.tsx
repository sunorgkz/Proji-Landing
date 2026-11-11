import React, { useState } from 'react';
import { getConsent, setConsent } from '../analytics';

export const CookieNotice: React.FC = () => {
  const [choice, setChoice] = useState(getConsent);
  if (choice) return null;

  const decide = (value: 'all' | 'necessary') => {
    setConsent(value);
    setChoice(value);
  };

  return (
    <div className="ph-cookie" role="dialog" aria-label="Использование cookie">
      <p>
        Мы используем cookie, чтобы понимать, как работает сайт. Аналитика включится только с вашего согласия.{' '}
        <a href="/legal/politika-konfidencialnosti.pdf">Политика конфиденциальности</a>
      </p>
      <div className="ph-cookie-actions">
        <button type="button" className="is-primary" onClick={() => decide('all')}>Принять</button>
        <button type="button" onClick={() => decide('necessary')}>Только необходимые</button>
      </div>
    </div>
  );
};

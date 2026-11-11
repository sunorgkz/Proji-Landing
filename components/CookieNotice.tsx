import React, { useState } from 'react';
import { getConsent, setConsent } from '../analytics';
import { getLang } from '../lib/projiPrefs';
import './cookie.css';

/** Согласие на cookie: без «Принять» аналитика не включается. Показывается на всех React-лендингах, язык — из общих настроек. */
const POLICY: Record<string, string> = { ru: 'Политика конфиденциальности', kk: 'Құпиялылық саясаты', en: 'Privacy policy', ar: 'سياسة الخصوصية' };
const TEXT: Record<string, [string, string, string, string]> = {
  ru: ['Мы используем cookie, чтобы понимать, как работает сайт. Аналитика включится только с вашего согласия.', 'Принять', 'Только необходимые', 'Использование cookie'],
  kk: ['Сайттың қалай жұмыс істейтінін түсіну үшін cookie қолданамыз. Аналитика тек сіздің келісіміңізбен қосылады.', 'Қабылдау', 'Тек қажеттілері', 'Cookie қолдану'],
  en: ['We use cookies to understand how the site works. Analytics turns on only with your consent.', 'Accept', 'Necessary only', 'Cookie use'],
  ar: ['نستخدم ملفات تعريف الارتباط لفهم كيفية عمل الموقع. لا تُفعَّل التحليلات إلا بموافقتك.', 'قبول', 'الضرورية فقط', 'استخدام ملفات تعريف الارتباط'],
};

export const CookieNotice: React.FC = () => {
  const [choice, setChoice] = useState(getConsent);
  if (choice) return null;
  const lang = new URLSearchParams(window.location.search).get('lang') ?? getLang();
  const [text, accept, necessary, label] = TEXT[lang] ?? TEXT.ru;

  const decide = (value: 'all' | 'necessary') => {
    setConsent(value);
    setChoice(value);
  };

  return (
    <div className="ph-cookie" role="dialog" aria-label={label} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <p>{text} <a href="/privacy">{POLICY[lang] ?? POLICY.ru}</a></p>
      <div className="ph-cookie-actions">
        <button type="button" className="is-primary" onClick={() => decide('all')}>{accept}</button>
        <button type="button" onClick={() => decide('necessary')}>{necessary}</button>
      </div>
    </div>
  );
};

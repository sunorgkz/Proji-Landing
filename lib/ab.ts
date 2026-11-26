import { useEffect, useState } from 'react';
import { trackEvent } from '../analytics';

/**
 * A/B-тест: посетителю один раз случайно выпадает вариант, и он запоминается в браузере.
 * Ссылка ?ab=<номер с нуля> включает вариант вручную (проверка, реклама).
 * В аналитику уходит ab_exposure; вариант передаётся и в cta_trial. Правила тестов — STRATEGY.md, раздел 5.
 */
export function useVariant<T>(test: string, variants: readonly T[]): { index: number; id: string; value: T } {
  const [index] = useState(() => {
    const n = variants.length;
    const forced = Number(new URLSearchParams(window.location.search).get('ab'));
    if (Number.isInteger(forced) && forced >= 0 && forced < n) return forced;
    const key = `proji.ab.${test}`;
    try {
      const saved = Number(localStorage.getItem(key));
      if (localStorage.getItem(key) !== null && saved >= 0 && saved < n) return saved;
      const pick = Math.floor(Math.random() * n);
      localStorage.setItem(key, String(pick));
      return pick;
    } catch {
      return Math.floor(Math.random() * n);
    }
  });
  const id = String.fromCharCode(65 + index);
  useEffect(() => {
    const send = () => trackEvent('ab_exposure', { test, variant: id });
    send();
    /* согласие на cookie дают уже после показа: тогда отметку о варианте отправляем ещё раз, иначе она теряется */
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === 'all') send();
    };
    window.addEventListener('proji:consent', onConsent);
    return () => window.removeEventListener('proji:consent', onConsent);
  }, [test, id]);
  return { index, id, value: variants[index] };
}

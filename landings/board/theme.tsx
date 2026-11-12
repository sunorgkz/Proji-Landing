import React, { useEffect, useState } from 'react';
import { trackEvent } from '../../analytics';
import { getTheme, resolveTheme, setTheme as persistTheme, THEME_KEY } from '../../lib/projiPrefs';
import type { Lang } from './copy';
import './light.css';

/**
 * Тема сайта для всех страниц на .bd-root (/board, /hire, /why, /agents и лендинги на AiShell).
 * Выбор общий для всего landing.proji.org (lib/projiPrefs): нажали на одной странице — действует везде, и в других вкладках тоже.
 * Светлая тема — light.css.
 */
export type Theme = 'dark' | 'light';

export function useSiteTheme(slug: string): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(getTheme()));
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY || e.key === null) setTheme(resolveTheme(getTheme()));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const choose = (next: Theme) => {
    setTheme(next);
    persistTheme(next);
    trackEvent(`${slug}_theme_switch`, { theme: next });
  };
  return [theme, choose];
}

const THEME_LABEL: Record<Lang, [string, string, string]> = {
  ru: ['Тема', 'Тёмная', 'Светлая'],
  kk: ['Тақырып', 'Қараңғы', 'Жарық'],
  en: ['Theme', 'Dark', 'Light'],
  ar: ['المظهر', 'داكن', 'فاتح'],
};

/* «Тёмная / Светлая»: в бургере и в подвале */
export const ThemeSwitch: React.FC<{ lang: Lang; theme: Theme; onChoose: (t: Theme) => void }> = ({ lang, theme, onChoose }) => (
  <div className="ai-theme" role="group" aria-label={THEME_LABEL[lang][0]}>
    {(['dark', 'light'] as const).map((t, i) => (
      <button key={t} type="button" aria-pressed={theme === t} onClick={() => onChoose(t)}>{THEME_LABEL[lang][i + 1]}</button>
    ))}
  </div>
);

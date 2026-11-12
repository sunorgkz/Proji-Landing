import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { trackEvent } from '../analytics';
import { getTheme, resolveTheme, setTheme } from '../lib/projiPrefs';

/**
 * Кнопка «светлая / тёмная тема» для лендингов без бургера (/ai-agents, /os-engine, /talent-manager, /antigravity).
 * Тема общая для всего сайта (lib/projiPrefs). Эти страницы считают цвета при загрузке, поэтому после выбора перезагружаем страницу.
 */
export const ThemeIconButton: React.FC<{ landing: string }> = ({ landing }) => {
  const light = resolveTheme(getTheme()) === 'light';
  const label = light ? 'Тёмная тема' : 'Светлая тема';
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        setTheme(light ? 'dark' : 'light');
        trackEvent(`${landing}_theme_switch`, { theme: light ? 'dark' : 'light' });
        window.location.reload();
      }}
      style={{ display: 'inline-grid', placeItems: 'center', width: 38, height: 38, flex: 'none', borderRadius: 999, border: '1px solid color-mix(in srgb, currentColor 22%, transparent)', background: 'transparent', color: 'inherit', cursor: 'pointer' }}
    >
      {light ? <Moon size={17} aria-hidden /> : <Sun size={17} aria-hidden />}
    </button>
  );
};

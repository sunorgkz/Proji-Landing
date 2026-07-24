import { getTheme, resolveTheme, type ProjiResolvedTheme } from './projiPrefs';

/** Document background per landing — applied before lazy chunks load. */
export const LANDING_PAGE_BG: Record<string, { dark: string; light: string }> = {
  knowledge: { dark: '#05070E', light: '#F4F7FC' },
  antigravity: { dark: 'oklch(0.07 0.018 268)', light: 'oklch(0.97 0.01 268)' },
  'talent-manager': { dark: 'oklch(0.15 0.006 85)', light: 'oklch(0.97 0.008 85)' },
  'os-engine': { dark: 'oklch(0.16 0.02 230)', light: 'oklch(0.97 0.01 230)' },
  'ai-agents': { dark: 'oklch(0.15 0.016 55)', light: 'oklch(0.97 0.01 55)' },
};

export function applyLandingPageBg(slug: string, theme?: ProjiResolvedTheme) {
  const palette = LANDING_PAGE_BG[slug];
  if (!palette) return;

  const resolved = theme ?? resolveTheme(getTheme());
  const bg = resolved === 'light' ? palette.light : palette.dark;

  const { documentElement: html, body } = document;
  const root = document.getElementById('root');

  html.dataset.landing = slug;
  html.style.backgroundColor = bg;
  html.style.colorScheme = resolved;
  body.style.backgroundColor = bg;
  body.style.margin = '0';
  body.style.overflowX = 'hidden';

  if (root) {
    root.style.backgroundColor = bg;
    root.style.minHeight = '100%';
  }
}

/** Document background per landing — applied before lazy chunks load. */
export const LANDING_PAGE_BG: Record<string, string> = {
  knowledge: '#05070E',
};

export function applyLandingPageBg(slug: string) {
  const bg = LANDING_PAGE_BG[slug];
  if (!bg) return;

  const { documentElement: html, body } = document;
  const root = document.getElementById('root');

  html.dataset.landing = slug;
  html.style.backgroundColor = bg;
  html.style.colorScheme = 'dark';
  body.style.backgroundColor = bg;
  body.style.margin = '0';
  body.style.overflowX = 'hidden';

  if (root) {
    root.style.backgroundColor = bg;
    root.style.minHeight = '100%';
  }
}

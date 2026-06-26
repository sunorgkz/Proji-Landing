/**
 * Resets document-level styles between landings so each page keeps its own design.
 */
export function resetDocumentShell() {
  const { documentElement: html, body } = document;

  html.className = '';
  html.removeAttribute('style');
  html.removeAttribute('data-landing');
  html.lang = 'ru';
  html.dir = 'ltr';

  body.className = '';
  body.style.cssText = '';
}

import { syncPrefsFromStorage } from './projiPrefs';

/**
 * Resets document-level styles between landings so each page keeps its own design.
 * Re-applies shared theme/lang from localStorage so light/dark follows the main page.
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

  // Restore shared prefs after clearing — keeps theme consistent across landings.
  syncPrefsFromStorage();
}

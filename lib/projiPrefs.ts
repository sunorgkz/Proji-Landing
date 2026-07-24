/**
 * Shared theme + language across all landings on landing.proji.kz.
 * Canonical keys match CRM / context-flow: `proji.theme`, `proji.lang`.
 * Aliases keep older Lovable / SPA keys in sync on the same origin.
 */

export const THEME_KEY = 'proji.theme';
export const LANG_KEY = 'proji.lang';

export type ProjiTheme = 'light' | 'dark' | 'system';
export type ProjiResolvedTheme = 'light' | 'dark';

/** All known theme keys used by different landings in this repo */
export const THEME_ALIASES = [
  THEME_KEY,
  'proji-theme',
  'proji_theme',
  'theme',
  'main-landing-theme',
  'chrome_extension_theme',
  'secondbrain-theme',
] as const;

/** All known language keys used by different landings in this repo */
export const LANG_ALIASES = [
  LANG_KEY,
  'proji-lang',
  'proji_lang',
  'lang',
  'chrome_extension_lang',
  'secondbrain-lang',
] as const;

function readFirst(keys: readonly string[]): string | null {
  if (typeof window === 'undefined') return null;
  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);
      if (value) return value;
    } catch {
      /* private mode */
    }
  }
  return null;
}

function writeAll(keys: readonly string[], value: string) {
  if (typeof window === 'undefined') return;
  for (const key of keys) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode */
    }
  }
}

export function resolveTheme(theme: ProjiTheme): ProjiResolvedTheme {
  if (theme === 'system') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export function getTheme(): ProjiTheme {
  const raw = readFirst(THEME_ALIASES);
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  return 'dark';
}

export function setTheme(theme: ProjiTheme) {
  writeAll(THEME_ALIASES, theme);
  if (typeof document !== 'undefined') {
    const resolved = resolveTheme(theme);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }
}

export function getLang(fallback = 'ru'): string {
  return readFirst(LANG_ALIASES) ?? fallback;
}

export function setLang(lang: string) {
  writeAll(LANG_ALIASES, lang);
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

/** One-time: promote any legacy key into canonical + broadcast to all aliases */
export function syncPrefsFromStorage() {
  const theme = getTheme();
  const lang = getLang();
  setTheme(theme);
  setLang(lang);
  return { theme, lang, resolved: resolveTheme(theme) };
}

/** Inline bootstrap for static HTML under public/<slug>/ (no React). */
export const PREFS_BOOTSTRAP_SCRIPT = `(function(){try{var TK=["proji.theme","proji-theme","proji_theme","theme","main-landing-theme","chrome_extension_theme","secondbrain-theme"];var LK=["proji.lang","proji-lang","proji_lang","lang","chrome_extension_lang","secondbrain-lang"];function r(a){for(var i=0;i<a.length;i++){var v=localStorage.getItem(a[i]);if(v)return v}return null}function w(a,v){for(var i=0;i<a.length;i++)try{localStorage.setItem(a[i],v)}catch(e){}}var t=r(TK)||"dark";if(t!=="light"&&t!=="dark"&&t!=="system")t="dark";w(TK,t);var resolved=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.toggle("dark",resolved==="dark");document.documentElement.dataset.theme=resolved;document.documentElement.style.colorScheme=resolved;var l=r(LK)||"ru";w(LK,l);document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}catch(e){}})();`;

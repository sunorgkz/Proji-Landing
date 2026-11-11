import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import { setLang as persistLang } from '../../lib/projiPrefs';
import { CHOSEN_KEY, LangMenu, Logo, initialLang } from '../board/BoardLanding';
import { COPY as BOARD, type Lang } from '../board/copy';
import { SketchDefs } from '../board/Sketches';
import './ai.css';

/**
 * Общая основа трёх сайтов про Proji AI (/ask, /morning, /phrase): шапка, языки, появление блоков, подвал.
 * Рисунки и токены — из /board, правила — BRANDBOOK.md.
 * На сайтах только функции со статусом «работает по справке»: без цен, расписаний и внутренних названий.
 */

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap';
export const REGISTER_URL = 'https://proji.org/register';
export const LOGIN_URL = 'https://proji.org/login';
export const KB_URL = 'https://proji.org/knowledge-base';
const THEME_KEY = 'proji.home.theme';
type Theme = 'dark' | 'light';
const THEME_LABEL: Record<Lang, [string, string, string]> = {
  ru: ['Тема', 'Тёмная', 'Светлая'],
  kk: ['Тақырып', 'Қараңғы', 'Жарық'],
  en: ['Theme', 'Dark', 'Light'],
  ar: ['المظهر', 'داكن', 'فاتح'],
};
const initialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* приватный режим */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};
const PRIVACY_LABEL: Record<Lang, string> = { ru: 'Политика конфиденциальности', kk: 'Құпиялылық саясаты', en: 'Privacy policy', ar: 'سياسة الخصوصية' };
const KB_LABEL: Record<Lang, string> = { ru: 'База знаний', kk: 'Білім базасы', en: 'Knowledge base', ar: 'قاعدة المعرفة' };

export const Cta: React.FC<{ slug: string; place: string; label: string; lang: Lang; variant?: string }> = ({ slug, place, label, lang, variant }) => (
  <a className="bd-btn" href={REGISTER_URL} data-cta-dest={REGISTER_URL} onClick={() => trackEvent('cta_trial', { landing: slug, place, lang, variant })}>{label}</a>
);

/* описание страницы и разметка для поиска и ИИ-поисковиков; снимаются при уходе со страницы */
const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

export const AiShell: React.FC<{
  slug: string;
  title: (l: Lang) => string;
  cta: (l: Lang) => string;
  links: (l: Lang) => [string, string][];
  children: (l: Lang) => React.ReactNode;
  /** переключатель светлой и тёмной темы в подвале */
  themed?: boolean;
  /** описание для поиска и превью в мессенджерах */
  desc?: (l: Lang) => string;
  /** JSON-LD: вопросы-ответы, инструкция, словарь */
  ld?: (l: Lang) => object;
}> = ({ slug, title, cta, links, children, themed, desc, ld }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => (themed ? initialTheme() : 'dark'));
  const chooseTheme = (next: Theme) => {
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent(`${slug}_theme_switch`, { theme: next });
  };
  const b = BOARD[lang];

  const chooseLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(CHOSEN_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent(`${slug}_lang_switch`, { lang: next });
  };

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = slug;
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, [slug]);

  useLayoutEffect(() => {
    persistLang(lang);
    document.title = title(lang);
    setMeta('property', 'og:title', title(lang));
    if (desc) {
      setMeta('name', 'description', desc(lang));
      setMeta('property', 'og:description', desc(lang));
    }
    if (!ld) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', inLanguage: lang, ...ld(lang) });
    document.head.appendChild(script);
    return () => script.remove();
  }, [lang, title, desc, ld]);

  useEffect(() => {
    const id = 'ai-landing-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONTS_URL;
      document.head.appendChild(link);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  /* блоки появляются при прокрутке; после смены языка новые блоки тоже подхватываются; без JS всё видно сразу */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    root.classList.add('js');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 },
    );
    root.querySelectorAll('.ai-in:not(.is-in)').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [lang]);

  const nav = links(lang);
  return (
    <div className="bd-root ai-root" ref={rootRef} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} data-theme={themed ? theme : undefined}>
      <SketchDefs />
      <header className="bd-nav glass">
        <a href="#top" className="bd-nav-home" aria-label="proji"><Logo /></a>
        <nav className="bd-nav-links" aria-label={b.nav.menu}>
          {nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <LangMenu lang={lang} label={b.nav.lang} onChoose={chooseLang} />
        <a className="bd-nav-login" href={LOGIN_URL}>{b.nav.login}</a>
        <a className="bd-btn is-small bd-nav-cta" href={REGISTER_URL} onClick={() => trackEvent('cta_trial', { landing: slug, place: 'nav', lang })}>{cta(lang)}</a>
        <button type="button" className="bd-burger" aria-label={b.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        {menuOpen && (
          <nav className="bd-sheet" aria-label={b.nav.menu}>
            {nav.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="is-login" href={LOGIN_URL}>{b.nav.login}</a>
          </nav>
        )}
      </header>
      <main id="top">{children(lang)}</main>
      <footer className="ai-foot">
        <Logo />
        <span>{b.foot.address}</span>
        <a href={KB_URL}>{KB_LABEL[lang]}</a>
        <a href={LOGIN_URL}>{b.foot.login}</a>
        <a href="/privacy">{PRIVACY_LABEL[lang]}</a>
        {themed && (
          <div className="ai-theme" role="group" aria-label={THEME_LABEL[lang][0]}>
            {(['dark', 'light'] as const).map((t, i) => (
              <button key={t} type="button" aria-pressed={theme === t} onClick={() => chooseTheme(t)}>{THEME_LABEL[lang][i + 1]}</button>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
};

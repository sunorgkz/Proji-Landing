import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { ThemeSwitch, useSiteTheme } from '../board/theme';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import { setLang as persistLang } from '../../lib/projiPrefs';
import logoUnesco from '../../assets/logos/unesco-clubs.png';
import logoNarxoz from '../../assets/logos/narxoz.svg';
import logoZhubanov from '../../assets/logos/zhubanov.svg';
import { CHOSEN_KEY, LangMenu, Logo, initialLang } from '../board/BoardLanding';
import { COPY as BOARD, type Lang } from '../board/copy';
import { Act, Fill, Line, Sketch, SketchDefs } from '../board/Sketches';
import { HIRE } from './copy';
import './hire.css';

/**
 * Лендинг-резюме: Proji устраивается к вам на работу.
 * Шапка, языки, рисунки и токены — из /board, правила — BRANDBOOK.md. Кандидат — ИЛЛЮСТРАЦИЯ.
 */

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap';
const START_URL = 'https://proji.org/register';
const LOGIN_URL = 'https://proji.org/login';
const WA_PHONE = '77766006636';
const CASE_LOGOS = [logoUnesco, logoNarxoz, logoZhubanov, null];

/* Кандидат: простой человечек в галстуке машет рукой */
const SketchCandidate: React.FC = () => {
  const head = 'M100 14C116 13 128 25 127 40C126 54 114 64 100 63C85 62 73 51 74 37C75 24 86 15 100 14Z';
  const body = 'M56 136C57 104 72 78 100 77C128 77 143 104 144 136Z';
  return (
    <Sketch>
      <g className="sk-bob">
        <Fill d={body} o={2} />
        <Line d={head} o={0} />
        <Line d={body} o={1.2} />
        <Line d="M90 37C90 38 90 39 90 40" o={2.4} />
        <Line d="M110 37C110 38 110 39 110 40" o={2.6} />
        <Line d="M92 49C97 53 104 53 109 49" o={3} />
        <Act d="M100 80C97 88 96 96 100 112C104 96 103 88 100 80Z" o={4} />
      </g>
      <g className="hr-wave"><Line d="M142 100C154 88 162 74 166 58" o={5} /></g>
    </Sketch>
  );
};

export default function HireLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, chooseTheme] = useSiteTheme('hire');
  const [asked, setAsked] = useState(0);
  const c = HIRE[lang];
  const b = BOARD[lang];

  const talk = (place: string) => {
    trackEvent('cta_talk', { landing: 'hire', place, lang });
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(c.talkMessage)}`, '_blank', 'noopener');
  };
  const hire = (place: string) => trackEvent('cta_trial', { landing: 'hire', place, lang });

  const chooseLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(CHOSEN_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent('hire_lang_switch', { lang: next });
  };

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'hire';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useLayoutEffect(() => {
    persistLang(lang);
    document.title = c.title;
  }, [lang, c.title]);

  useEffect(() => {
    const id = 'hire-landing-fonts';
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

  /* блоки появляются при прокрутке, штамп ставится, когда дочитали; без JS всё видно сразу */
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
      { threshold: 0.2 },
    );
    root.querySelectorAll('.hr-in').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  const links: [string, string][] = [
    ['#skills', c.nav.skills],
    ['#exp', c.nav.exp],
    ['#interview', c.nav.interview],
    ['#salary', c.nav.salary],
  ];
  const actions = (place: string) => (
    <div className="hr-actions">
      <a className="bd-btn" href={START_URL} onClick={() => hire(place)} data-cta-dest={START_URL}>{c.cta}</a>
      <button type="button" className="bd-btn is-glass" onClick={() => talk(place)} data-cta-dest={`https://wa.me/${WA_PHONE}`}>{c.talk}</button>
    </div>
  );
  const [question, answer] = c.interview.qa[asked];

  return (
    <div className="bd-root hr-root" ref={rootRef} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} data-theme={theme}>
      <SketchDefs />
      <header className="bd-nav glass">
        <a href="#top" className="bd-nav-home" aria-label="proji"><Logo /></a>
        <nav className="bd-nav-links" aria-label={b.nav.menu}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <LangMenu lang={lang} label={b.nav.lang} onChoose={chooseLang} />
        <a className="bd-nav-login" href={LOGIN_URL}>{b.nav.login}</a>
        <a className="bd-btn is-small bd-nav-cta" href={START_URL} onClick={() => hire('nav')}>{c.cta}</a>
        <button type="button" className="bd-burger" aria-label={b.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        {menuOpen && (
          <nav className="bd-sheet" aria-label={b.nav.menu}>
            {links.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="is-login" href={LOGIN_URL}>{b.nav.login}</a>
            <ThemeSwitch lang={lang} theme={theme} onChoose={chooseTheme} />
          </nav>
        )}
      </header>

      <main id="top" className="hr-wrap">
        {/* Обложка: заявление и анкета */}
        <section className="hr-hero" aria-labelledby="hr-title">
          <div>
            <h1 id="hr-title">{c.hero.h}</h1>
            <p className="hr-lead">{c.hero.sub}</p>
            {actions('hero')}
          </div>
          <aside className="hr-card" aria-label={c.hero.role}>
            <span className="hr-status">{c.hero.status}</span>
            <SketchCandidate />
            <p className="hr-name" dir="ltr">Proji</p>
            <p className="hr-role">{c.hero.role}</p>
            <dl>
              {c.hero.rows.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd dir="auto">{v}</dd></div>
              ))}
            </dl>
          </aside>
        </section>

        <section className="hr-row hr-in">
          <h2>{c.about.label}</h2>
          <p className="hr-about">{c.about.x}</p>
        </section>

        <section className="hr-row hr-in">
          <h2>{c.day.label}</h2>
          <ol className="hr-day">
            {c.day.rows.map(([time, text]) => (
              <li key={time}><time dir="ltr">{time}</time><span>{text}</span></li>
            ))}
          </ol>
        </section>

        <section className="hr-row hr-in" id="skills">
          <h2>{c.skills.label}</h2>
          <ul className="hr-skills">
            {c.skills.items.map(([t, x]) => (
              <li key={t} className="glass"><h3>{t}</h3><p>{x}</p></li>
            ))}
          </ul>
        </section>

        <section className="hr-row hr-in" id="exp">
          <h2>{c.exp.label}</h2>
          <ul className="hr-jobs">
            {b.cases.items.map((it, i) => (
              <li key={it.name}>
                <div className="hr-logo">{CASE_LOGOS[i] && <img src={CASE_LOGOS[i]!} alt="" loading="lazy" />}</div>
                <div><h3>{it.name}</h3><p>{it.text}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="hr-row hr-in">
          <h2>{c.weak.label}</h2>
          <ul className="hr-weak">{c.weak.items.map(t => <li key={t}>{t}</li>)}</ul>
        </section>

        {/* Собеседование: посетитель сам задаёт вопросы */}
        <section className="hr-row hr-in" id="interview">
          <h2>{c.interview.label}</h2>
          <div className="hr-talk glass">
            <p className="hr-hint">{c.interview.hint}</p>
            <div className="hr-chips">
              {c.interview.qa.map(([q], i) => (
                <button
                  key={q}
                  type="button"
                  aria-pressed={i === asked}
                  onClick={() => {
                    setAsked(i);
                    trackEvent('hire_interview_question', { index: i, lang });
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="hr-chat" key={question + lang} aria-live="polite">
              <p className="is-q">{question}</p>
              <p className="is-a">{answer}</p>
            </div>
          </div>
        </section>

        <section className="hr-row hr-in" id="salary">
          <h2>{c.salary.label}</h2>
          <div>
            <ul className="hr-pay">
              {c.salary.plans.map(([sum, what]) => (
                <li key={sum}><b dir="auto">{sum}</b><span>{what}</span></li>
              ))}
            </ul>
            <p className="hr-note">{c.salary.note}</p>
          </div>
        </section>

        {/* Финал: штамп */}
        <section className="hr-end glass hr-in" aria-labelledby="hr-end-h">
          <span className="hr-stamp" aria-hidden>{c.end.stamp}</span>
          <h2 id="hr-end-h">{c.end.h}</h2>
          <p className="hr-lead">{c.end.x}</p>
          {actions('final')}
        </section>
      </main>

      <footer className="hr-foot hr-wrap">
        <Logo />
        <span>{b.foot.address}</span>
        <a href="tel:+77766006636" dir="ltr">+7 776 600 66 36</a>
        <a href="mailto:sund.serik@gmail.com">sund.serik@gmail.com</a>
        <a href={LOGIN_URL}>{b.foot.login}</a>
        <small>{b.foot.logos}</small>
        <ThemeSwitch lang={lang} theme={theme} onChoose={chooseTheme} />
      </footer>
    </div>
  );
}

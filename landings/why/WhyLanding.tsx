import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import { setLang as persistLang } from '../../lib/projiPrefs';
import phoneChat from '../../assets/pexels-6415626.jpg';
import logoUnesco from '../../assets/logos/unesco-clubs.png';
import logoNarxoz from '../../assets/logos/narxoz.svg';
import logoZhubanov from '../../assets/logos/zhubanov.svg';
import { CHOSEN_KEY, LangMenu, Logo, initialLang } from '../board/BoardLanding';
import { COPY as BOARD, type Lang } from '../board/copy';
import { SketchClock, SketchDefs, SketchRead, SketchSun, SketchTask } from '../board/Sketches';
import { WHY } from './copy';
import './why.css';

/**
 * Лендинг «почему я давно это не взял»: короткая страница вокруг фразы «ну что там?».
 * Шапка, языки, рисунки и токены — из /board, правила — BRANDBOOK.md.
 * Сводка на первом экране — ИЛЛЮСТРАЦИЯ на примерных данных, не скриншот живого Proji.
 */

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap';
const START_URL = 'https://proji.org/register';
const LOGIN_URL = 'https://proji.org/login';
const WA_PHONE = '77766006636';
const GAIN_PICS = [SketchTask, SketchClock, SketchSun, SketchRead];
const CASE_LOGOS = [logoUnesco, logoNarxoz, logoZhubanov, null];

export default function WhyLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dayRef = useRef<HTMLDivElement | null>(null);
  const touched = useRef(false);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [withProji, setWithProji] = useState(false);
  const c = WHY[lang];
  const b = BOARD[lang];

  const audit = (place: string) => {
    trackEvent('cta_ai_audit', { landing: 'why', place, lang });
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(c.auditMessage)}`, '_blank', 'noopener');
  };
  const trial = (place: string) => trackEvent('cta_trial', { landing: 'why', place, lang });

  const chooseLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(CHOSEN_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent('why_lang_switch', { lang: next });
  };

  const chooseDay = (next: boolean) => {
    touched.current = true;
    setWithProji(next);
    trackEvent('why_day_switch', { withProji: next });
  };

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'why';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useLayoutEffect(() => {
    persistLang(lang);
    document.title = c.title;
  }, [lang, c.title]);

  useEffect(() => {
    const id = 'why-landing-fonts';
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

  /* блоки появляются при прокрутке; без JS всё видно сразу */
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
    root.querySelectorAll('.wy-in:not(.is-in)').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [lang]);

  /* день сам переключается один раз, когда посетитель до него дочитал */
  useEffect(() => {
    const el = dayRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    let timer = 0;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      timer = window.setTimeout(() => {
        if (!touched.current) setWithProji(true);
      }, 4200);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const links: [string, string][] = [
    ['#day', c.nav.day],
    ['#gains', c.nav.gains],
    ['#clients', c.nav.clients],
    ['#price', c.nav.price],
  ];
  const dayRows = withProji ? c.day.rowsWith : c.day.rowsNow;

  const actions = (place: string) => (
    <div className="wy-actions">
      <a className="bd-btn" href={START_URL} onClick={() => trial(place)} data-cta-dest={START_URL}>{c.hero.cta}</a>
      <button type="button" className="bd-btn is-glass" onClick={() => audit(place)} data-cta-dest={`https://wa.me/${WA_PHONE}`}>{c.hero.audit}</button>
    </div>
  );

  return (
    <div className="bd-root wy-root" ref={rootRef} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
      <SketchDefs />
      <header className="bd-nav glass">
        <a href="#top" className="bd-nav-home" aria-label="proji"><Logo /></a>
        <nav className="bd-nav-links" aria-label={b.nav.menu}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <LangMenu lang={lang} label={b.nav.lang} onChoose={chooseLang} />
        <a className="bd-nav-login" href={LOGIN_URL} onClick={() => trial('nav-login')}>{b.nav.login}</a>
        <a className="bd-btn is-small bd-nav-cta" href={START_URL} onClick={() => trial('nav')}>{c.hero.cta}</a>
        <button type="button" className="bd-burger" aria-label={b.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        {menuOpen && (
          <nav className="bd-sheet" aria-label={b.nav.menu}>
            {links.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="is-login" href={LOGIN_URL} onClick={() => trial('sheet-login')}>{b.nav.login}</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Обложка: шум чатов сменяется одной сводкой */}
        <section className="wy-hero" aria-labelledby="wy-title">
          <div className="wy-aurora" aria-hidden />
          <h1 id="wy-title">
            <span>{c.hero.a}</span> <span className="bd-grad">{c.hero.b}</span>
          </h1>
          <p className="wy-lead">{c.hero.sub}</p>
          {actions('hero')}
          <p className="wy-small">{c.hero.small}</p>

          <figure className="wy-stage glass">
            <ul className="wy-chaos" aria-hidden>
              {c.hero.bubbles.map((t, i) => <li key={t} style={{ ['--i' as string]: i }}>{t}</li>)}
            </ul>
            <div className="wy-calm">
              <p className="wy-calm-hi">{c.hero.hi}</p>
              <ul>{c.hero.card.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          </figure>
        </section>

        {/* Один и тот же день */}
        <section className="wy-sec wy-wrap" id="day" aria-labelledby="wy-day-h">
          <h2 id="wy-day-h" className="wy-h wy-in">{c.day.h}</h2>
          <div className={`wy-day glass wy-in${withProji ? ' is-with' : ''}`} ref={dayRef}>
            <div className="wy-switch" role="group" aria-label={c.day.h}>
              <button type="button" aria-pressed={!withProji} onClick={() => chooseDay(false)}>{c.day.now}</button>
              <button type="button" aria-pressed={withProji} onClick={() => chooseDay(true)}>{c.day.with}</button>
            </div>
            <ol key={String(withProji) + lang}>
              {dayRows.map(([time, text], i) => (
                <li key={time} style={{ ['--i' as string]: i }}>
                  <time dir="ltr">{time}</time>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Что вы получаете */}
        <section className="wy-sec wy-wrap" id="gains" aria-labelledby="wy-gains-h">
          <h2 id="wy-gains-h" className="wy-h wy-in">{c.gains.h}</h2>
          <div className="wy-gains">
            {c.gains.items.map(([title, text], i) => {
              const Pic = GAIN_PICS[i];
              return (
                <article key={title} className="wy-gain wy-in">
                  <Pic />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Команда */}
        <section className="wy-wrap wy-sec">
          <figure className="wy-team wy-in">
            <img src={phoneChat} alt={c.team.alt} loading="lazy" />
            <figcaption>
              <h2 className="wy-h">{c.team.h}</h2>
              <p>{c.team.x}</p>
            </figcaption>
          </figure>
        </section>

        {/* Клиенты */}
        <section className="wy-sec wy-wrap" id="clients" aria-labelledby="wy-clients-h">
          <h2 id="wy-clients-h" className="wy-h wy-in">{c.clients.h}</h2>
          <ul className="wy-clients wy-in">
            {b.cases.items.map((it, i) => (
              <li key={it.name}>
                <div className="wy-logo">{CASE_LOGOS[i] && <img src={CASE_LOGOS[i]!} alt="" loading="lazy" />}</div>
                <b>{it.name}</b>
              </li>
            ))}
          </ul>
          <p className="wy-by wy-in">{c.clients.by}</p>
        </section>

        {/* Цена */}
        <section className="wy-sec wy-wrap wy-center" id="price" aria-labelledby="wy-price-h">
          <h2 id="wy-price-h" className="wy-h wy-in">{c.price.h}</h2>
          <ul className="wy-plans wy-in">
            {c.price.plans.map(([sum, what], i) => (
              <li key={sum} className={`glass${i === 0 ? ' is-first' : ''}`}>
                <b dir="auto">{sum}</b>
                <span>{what}</span>
              </li>
            ))}
          </ul>
          <p className="wy-small wy-in">{c.price.note}</p>
        </section>

        {/* Финал */}
        <section className="wy-end wy-wrap wy-center" aria-labelledby="wy-end-h">
          <div className="wy-aurora is-low" aria-hidden />
          <h2 id="wy-end-h" className="wy-in">{c.end.h}</h2>
          <p className="wy-lead wy-in">{c.end.x}</p>
          {actions('final')}
        </section>
      </main>

      <footer className="wy-foot wy-wrap">
        <Logo />
        <span>{b.foot.address}</span>
        <a href="tel:+77766006636" dir="ltr">+7 776 600 66 36</a>
        <a href="mailto:sund.serik@gmail.com">sund.serik@gmail.com</a>
        <a href={LOGIN_URL}>{b.foot.login}</a>
        <small>{b.foot.credits} Pexels. {b.foot.logos}</small>
      </footer>
    </div>
  );
}

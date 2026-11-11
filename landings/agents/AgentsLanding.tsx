import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import { setLang as persistLang } from '../../lib/projiPrefs';
import astanaDusk from '../../assets/pexels-31608923.jpg';
import managerDesk from '../../assets/pexels-3760781.jpg';
import { CHOSEN_KEY, LangMenu, Logo, initialLang } from '../board/BoardLanding';
import { COPY as BOARD, type Lang } from '../board/copy';
import { SketchChat, SketchDefs, SketchRead, SketchSun, SketchTask } from '../board/Sketches';
import { AGENTS, type AgentsCopy } from './copy';
import { SketchNote, SketchTeam } from './Sketches';
import './agents.css';

/**
 * Лендинг про AI-агентов. Содержание и порядок блоков — по примеру multica.ai, оформление — наше (BRANDBOOK.md, основа /board).
 * Навыки и открытый код заменены тем, что есть в Proji: инструкциями агента и контролем.
 * Фрагменты интерфейса — ИЛЛЮСТРАЦИЯ на примерных данных, не скриншоты живого Proji.
 */

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap';
const START_URL = 'https://proji.org/register';
const LOGIN_URL = 'https://proji.org';
const WA_PHONE = '77766006636';
const STEP_MS = 1100;
const TEACH_PICS = [SketchTask, SketchSun, SketchNote];
const START_PICS = [SketchChat, SketchNote, SketchTask, SketchRead];

/* Выбор исполнителя: человек или агент */
const AssignDemo: React.FC<{ c: AgentsCopy['team'] }> = ({ c }) => {
  const [who, setWho] = useState(2);
  const person = c.people[who];
  return (
    <div className="ag-card glass bd-in" data-ui>
      <p className="ag-card-title">{c.task}</p>
      <div>
        <span className="ag-label">{c.assignee}</span>
        <div className="ag-chips">
          {c.people.map((p, i) => (
            <button key={p.name} type="button" className={`ag-chip${i === who ? ' is-on' : ''}`} aria-pressed={i === who} onClick={() => { setWho(i); trackEvent('agents_assign_demo', { kind: p.agent ? 'agent' : 'human' }); }}>
              {p.name} <small>{p.agent ? c.agentTag : c.humanTag}</small>
            </button>
          ))}
        </div>
      </div>
      <ul className="ag-feed" aria-live="polite" key={who}>
        {person.feed.map(line => <li key={line}>{line}</li>)}
      </ul>
    </div>
  );
};

/* Запуск агента: идёт по шагам и останавливается перед важным */
const RunDemo: React.FC<{ c: AgentsCopy['run'] }> = ({ c }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const total = c.lines.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      setStep(total);
      return;
    }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [total]);

  useEffect(() => {
    if (!started || step >= total) return;
    const t = window.setTimeout(() => setStep(s => s + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [started, step, total]);

  const waiting = step >= total && !confirmed;
  const now = confirmed ? 3 : waiting ? 2 : step === 0 ? 0 : 1;
  return (
    <div className="ag-run bd-in" ref={ref} data-ui>
      <div className="ag-run-head">
        <p className="ag-run-title">{c.title}</p>
        <span className={`bd-st ${confirmed ? 'is-ok' : waiting ? 'is-warn' : 'is-check'}`} aria-live="polite">{c.statuses[now]}</span>
      </div>
      <ol className="ag-track" aria-hidden>
        {c.statuses.map((s, i) => <li key={s} className={i === now ? 'is-now' : i < now ? 'is-past' : ''}>{s}</li>)}
      </ol>
      <ol className="ag-log">
        {c.lines.slice(0, step).map((line, i) => <li key={line} className={i === total - 1 && waiting ? 'is-wait' : ''}>{line}</li>)}
        {confirmed && <li className="is-done">{c.doneLine}</li>}
      </ol>
      <div className="ag-run-act">
        {waiting && <button type="button" className="bd-btn" onClick={() => { setConfirmed(true); trackEvent('agents_run_confirm'); }}>{c.confirm}</button>}
        {confirmed && <button type="button" className="bd-btn is-glass" onClick={() => { setConfirmed(false); setStep(0); setStarted(true); }}>{c.replay}</button>}
        <p className="ag-run-fail">{c.fail}</p>
      </div>
    </div>
  );
};

export default function AgentsLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = AGENTS[lang];
  const b = BOARD[lang];
  const t = c.control;

  const audit = (place: string) => {
    trackEvent('cta_ai_audit', { landing: 'agents', place, lang });
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(b.auditMessage)}`, '_blank', 'noopener');
  };
  const trial = (place: string) => trackEvent('cta_trial', { landing: 'agents', place, lang });

  const chooseLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(CHOSEN_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent('agents_lang_switch', { lang: next });
  };

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'agents';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useLayoutEffect(() => {
    persistLang(lang);
    document.title = c.title;
  }, [lang, c.title]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const id = 'board-landing-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);

  /* появление частей секций; без JS всё видно сразу */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const nodes = root.querySelectorAll<HTMLElement>('.bd-in:not(.is-in), .bd-blocks');
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach(n => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 },
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [lang]);

  const navLinks: [string, string][] = [
    ['#team', c.nav.team],
    ['#run', c.nav.run],
    ['#teach', c.nav.teach],
    ['#control', c.nav.control],
    ['#pricing', b.nav.pricing],
    ['#faq', b.nav.faq],
  ];

  return (
    <div className="bd-root ag-root" ref={rootRef} dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
      <SketchDefs />
      <header className="bd-nav glass">
        <a href="#top" className="bd-nav-home" aria-label="proji"><Logo /></a>
        <nav className="bd-nav-links" aria-label={b.nav.menu}>
          {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <LangMenu lang={lang} label={b.nav.lang} onChoose={chooseLang} />
        <a className="bd-nav-login" href={LOGIN_URL} onClick={() => trial('nav-login')}>{b.nav.login}</a>
        <button type="button" className="bd-btn is-small bd-nav-cta" onClick={() => audit('nav')}>{b.nav.cta}</button>
        <button type="button" className="bd-burger" aria-label={b.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        {menuOpen && (
          <nav className="bd-sheet" aria-label={b.nav.menu}>
            {navLinks.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="is-login" href={LOGIN_URL} onClick={() => trial('sheet-login')}>{b.nav.login}</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* 1. Обложка */}
        <section className="bd-hero ag-hero" aria-labelledby="ag-title">
          <div className="bd-glow g1" aria-hidden />
          <div className="bd-glow g2" aria-hidden />
          <div className="bd-panel">
            <SketchTeam />
            <h1 id="ag-title">
              <span>{c.hero.line1}</span> <span className="bd-grad">{c.hero.line2}</span>
            </h1>
            <p>{c.hero.sub}</p>
            <div className="bd-panel-act">
              <button type="button" className="bd-btn" onClick={() => audit('hero')} data-cta-dest={`https://wa.me/${WA_PHONE}`}>{b.hero.cta}</button>
              <a className="bd-btn is-glass" href={START_URL} onClick={() => trial('hero')} data-cta-dest={START_URL}>{b.hero.trial}</a>
            </div>
          </div>
        </section>

        {/* 2. Агент как коллега */}
        <section className="bd-sec" id="team" aria-labelledby="ag-team-h">
          <h2 id="ag-team-h" className="bd-h bd-in">{c.team.h}</h2>
          <p className="bd-lead bd-in">{c.team.lead}</p>
          <div className="ag-split">
            <ul className="ag-points">
              {c.team.points.map(([title, text], i) => (
                <li key={title} className="glass bd-in" style={{ ['--d' as string]: i }}><b>{title}</b><span>{text}</span></li>
              ))}
            </ul>
            <AssignDemo c={c.team} />
          </div>
        </section>

        {/* 3. Работает без присмотра */}
        <section className="bd-sec" id="run" aria-labelledby="ag-run-h">
          <h2 id="ag-run-h" className="bd-h bd-in">{c.run.h}</h2>
          <p className="bd-lead bd-in">{c.run.lead}</p>
          <RunDemo c={c.run} />
        </section>

        {/* 4. Инструкции */}
        <section className="bd-sec" id="teach" aria-labelledby="ag-teach-h">
          <h2 id="ag-teach-h" className="bd-h bd-in">{c.teach.h}</h2>
          <p className="bd-lead bd-in">{c.teach.lead}</p>
          <ul className="ag-teach">
            {c.teach.cards.map((card, i) => {
              const Pic = TEACH_PICS[i];
              return (
                <li key={card.name} className="glass bd-in" style={{ ['--d' as string]: i }}>
                  <Pic />
                  <h3>{card.name}</h3>
                  <p className="ag-say" dir="auto">{card.say}</p>
                  <p className="ag-get"><small>{c.teach.getLabel}</small>{card.get}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 5. Контроль */}
        <section className="bd-sec" id="control" aria-labelledby="ag-control-h">
          <div className="bd-mosaic">
            <div className="bd-tile is-head bd-in"><h2 id="ag-control-h" className="bd-h">{t.h}</h2></div>
            <div className="bd-tile glass bd-in">
              <ul className="ag-journal" data-ui>
                {t.journal.map(([time, text]) => <li key={time + text}><time dir="ltr">{time}</time><span>{text}</span></li>)}
              </ul>
              <p className="bd-cap"><b>{t.log[0]}</b> {t.log[1]}</p>
            </div>
            <div className="bd-tile is-yellow bd-in">
              <div className="bd-zoom" data-ui><span className="bd-zoom-st">{t.ask}</span></div>
              <p className="bd-cap"><b>{t.confirm[0]}</b> {t.confirm[1]}</p>
            </div>
            <div className="bd-tile glass bd-in">
              <div className="bd-zoom is-toggle" data-ui><span>{t.toggle[0]}</span><span className="is-on">{t.toggle[1]}</span></div>
              <p className="bd-cap"><b>{t.rights[0]}</b> {t.rights[1]}</p>
            </div>
            <div className="bd-tile is-blue bd-in">
              <div className="bd-zoom is-num" data-ui dir="ltr">₸</div>
              <p className="bd-cap"><b>{t.limit[0]}</b> {t.limit[1]}</p>
            </div>
            <figure className="bd-tile is-photo bd-in">
              <img src={managerDesk} alt={t.photoAlt} loading="lazy" />
              <figcaption className="bd-cap glass"><b>{t.photo[0]}</b> {t.photo[1]}</figcaption>
            </figure>
            <div className="bd-tile is-mint bd-in">
              <p className="bd-cap"><b>{t.connect[0]}</b> {t.connect[1]}</p>
            </div>
            <div className="bd-tile glass bd-in">
              <ul className="bd-safe">{t.never.map(s => <li key={s}>{s}</li>)}</ul>
              <p className="bd-cap"><b>{t.closed[0]}</b> {t.closed[1]}</p>
            </div>
          </div>
        </section>

        {/* 6. Как начать */}
        <section className="bd-sec" id="start" aria-labelledby="ag-start-h">
          <h2 id="ag-start-h" className="bd-h bd-in">{c.start.h}</h2>
          <p className="bd-lead bd-in">{c.start.lead}</p>
          <ol className="bd-flow ag-steps">
            {c.start.steps.map((st, i) => {
              const Pic = START_PICS[i];
              return (
                <li key={st.title} className="glass bd-in" style={{ ['--d' as string]: i }}>
                  <span className="bd-flow-n" aria-hidden>{i + 1}</span>
                  <Pic />
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                  <p className="bd-flow-ex" dir="auto">{st.example}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* 7. Тарифы — те же данные, что на /board */}
        <section className="bd-sec" id="pricing" aria-labelledby="ag-price-h">
          <div className="bd-table-wrap glass bd-in">
            <table className="bd-table">
              <caption className="bd-sr">{b.pricing.h}</caption>
              <thead>
                <tr>
                  <th scope="col"><h2 id="ag-price-h" className="bd-h">{b.pricing.h}</h2></th>
                  {b.pricing.plans.map((p, i) => <th scope="col" key={p} className={i === 2 ? 'is-rec' : ''}>{p}</th>)}
                </tr>
              </thead>
              <tbody>
                {b.pricing.rows.map(([label, vals]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {vals.map((v, i) => <td key={i} className={i === 2 ? 'is-rec' : ''} data-plan={b.pricing.plans[i]}>{v}</td>)}
                  </tr>
                ))}
                <tr className="bd-table-act">
                  <th scope="row" />
                  {b.pricing.plans.map((p, i) => (
                    <td key={p} className={i === 2 ? 'is-rec' : ''} data-plan={p}>
                      {i === 3
                        ? <button type="button" className="bd-btn is-glass" onClick={() => audit('pricing-enterprise')}>{b.pricing.talk}</button>
                        : <a className={`bd-btn${i === 2 ? '' : ' is-glass'}`} href={START_URL} onClick={() => trial(`pricing-${i}`)}>{b.pricing.start}</a>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Вопросы */}
        <section className="bd-sec bd-faq" id="faq" aria-labelledby="ag-faq-h">
          <h2 id="ag-faq-h" className="bd-h bd-in">{c.faq.h}</h2>
          <div className="bd-faq-list">
            {c.faq.items.map((o, i) => (
              <details key={o.q} name="ag-faq" open={i === 0} className="glass bd-in">
                <summary>{o.q}<span className="bd-plus" aria-hidden /></summary>
                <p>{o.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 9. Оффер */}
        <section className="bd-cta" aria-labelledby="ag-cta-h">
          <figure className="bd-cta-photo bd-in"><img src={astanaDusk} alt={b.cta.photoAlt} loading="lazy" /></figure>
          <div className="bd-cta-main bd-in">
            <div className="bd-glow g4" aria-hidden />
            <h2 id="ag-cta-h" className="bd-h">{b.cta.h}</h2>
            <p>{b.cta.text}</p>
            <div className="bd-cta-act">
              <button type="button" className="bd-btn" onClick={() => audit('final')} data-cta-dest={`https://wa.me/${WA_PHONE}`}>{b.hero.cta}</button>
              <a className="bd-btn is-glass" href={START_URL} onClick={() => trial('final')}>{b.hero.trial}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bd-foot">
        <div className="bd-blocks" aria-label="proji" dir="ltr">
          {['p', 'r', 'o', 'j', 'i'].map((l, i) => <span key={l} className={`b${i}`} aria-hidden><i>{l}</i></span>)}
        </div>
        <div className="bd-foot-cols">
          <nav aria-label="proji">
            <a href="#team">{c.nav.team}</a>
            <a href="#pricing">{b.nav.pricing}</a>
            <a href={LOGIN_URL}>{b.foot.login}</a>
          </nav>
          <div>
            <p>{b.foot.address}</p>
            <p><a href="tel:+77766006636" dir="ltr">+7 776 600 66 36</a></p>
            <p><a href="mailto:sund.serik@gmail.com">sund.serik@gmail.com</a></p>
          </div>
          <p className="bd-credits">{b.foot.credits} Pexels.</p>
        </div>
        <div className="bd-foot-last">
          <span><Logo /> © 2026</span>
          <button type="button" className="bd-btn is-small" onClick={() => audit('footer')}>{b.nav.cta}</button>
        </div>
      </footer>
    </div>
  );
}

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { ThemeSwitch, useSiteTheme } from './theme';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import { setLang as persistLang } from '../../lib/projiPrefs';
import aktobeSatellite from '../../assets/aktobe-kazakhstan-satellite-image-2017-09-07.jpg';
import astanaDusk from '../../assets/pexels-31608923.jpg';
import astanaNight from '../../assets/pexels-32026139.jpg';
import phoneChat from '../../assets/pexels-6415626.jpg';
import managerPhone from '../../assets/pexels-5921417.jpg';
import managerDesk from '../../assets/pexels-3760781.jpg';
import logoUnesco from '../../assets/logos/unesco-clubs.png';
import logoNarxoz from '../../assets/logos/narxoz.svg';
import logoZhubanov from '../../assets/logos/zhubanov.svg';
import typingClip from '../../assets/hunt-and-peck-typing-monkeytype-benchmark.webm';
import typingPoster from '../../assets/hunt-and-peck-typing-monkeytype-benchmark-poster.jpg';
import { COPY, LANGS, detectLang, type Copy, type Frame, type Lang } from './copy';
import { SketchDefs, SketchHero, SKETCH_STEPS } from './Sketches';
import './board.css';
import '../../components/shine.css';

/**
 * Лендинг-доска Proji: тёмно-синий, мятный, жидкое стекло, четыре языка (ru, kk, en, ar с RTL).
 * Идея: разрозненные рабочие чаты руководителя становятся одной доской — тем экраном, который он видит в Proji.
 * Текст — концепция №1 «Координация всей компании» + общие блоки документа «Лендинг Proji: 10 концепций».
 * Фрагменты интерфейса — ИЛЛЮСТРАЦИЯ на примерных данных, не скриншоты живого Proji.
 * Логотип — всегда «proji», Ubuntu жирный, строчными.
 */

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap';
const START_URL = 'https://proji.org/register';
const LOGIN_URL = 'https://proji.org/login';
const WA_PHONE = '77766006636';
export const CHOSEN_KEY = 'proji.board.lang';
const PICS = { phone: phoneChat, manager: managerPhone } as const;
const CASE_LOGOS = [logoUnesco, logoNarxoz, logoZhubanov, null];

const isLang = (v: string | null | undefined): v is Lang => v === 'ru' || v === 'kk' || v === 'en' || v === 'ar';

/* язык: ?lang= в адресе → выбор посетителя → страна по часовому поясу и браузеру */
export function initialLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  try {
    const chosen = localStorage.getItem(CHOSEN_KEY);
    if (isLang(chosen)) return chosen;
  } catch {
    /* приватный режим */
  }
  return detectLang();
}

/* ---------- живая плитка: сообщение из чата → задача ---------- */

function parseMessage(text: string, live: Copy['inside']['live']) {
  let rest = text.trim();
  let who: string | null = null;
  const m = rest.match(/^(\p{L}+)\s*[,،:—-]\s*(.+)$/su);
  if (m) {
    who = m[1];
    rest = m[2];
  }
  let due: string | null = null;
  const d = rest.match(live.deadline);
  if (d && d.index !== undefined) {
    due = d[0].trim();
    rest = (rest.slice(0, d.index) + rest.slice(d.index + d[0].length)).trim();
  }
  rest = rest.replace(/[.,،!?\s]+$/u, '');
  const task = rest ? rest[0].toUpperCase() + rest.slice(1) : '';
  const project = live.projects.find(([re]) => re.test(text))?.[1] ?? live.general;
  return { who, task, due, project };
}

const LiveTask: React.FC<{ live: Copy['inside']['live'] }> = ({ live }) => {
  const [text, setText] = useState(live.sample);
  const touched = useRef(false);
  useEffect(() => setText(live.sample), [live.sample]);
  const p = useMemo(() => parseMessage(text, live), [text, live]);
  const unsure = !p.who || !p.due || !p.task;
  return (
    <div className="bd-live">
      <label className="bd-live-label" htmlFor="bd-live-input">{live.label}</label>
      <textarea
        id="bd-live-input"
        className="bd-live-input"
        rows={2}
        value={text}
        dir="auto"
        onChange={e => {
          setText(e.target.value);
          if (!touched.current) {
            touched.current = true;
            trackEvent('board_live_task_edit');
          }
        }}
      />
      <div className={`bd-live-card${unsure ? ' is-check' : ''}`} data-ui aria-live="polite">
        <span className="bd-live-status">{unsure ? live.check : live.created}</span>
        <b className="bd-live-task" key={p.task}>{p.task || live.notFound}</b>
        <dl>
          <div><dt>{live.who}</dt><dd key={p.who}>{p.who ?? live.unset}</dd></div>
          <div><dt>{live.due}</dt><dd key={p.due}>{p.due ?? live.unset}</dd></div>
          <div><dt>{live.project}</dt><dd key={p.project}>{p.project}</dd></div>
        </dl>
      </div>
    </div>
  );
};

/* ---------- первый экран ---------- */

export const FrameView: React.FC<{ f: Frame; still?: boolean }> = ({ f, still }) => (
  <figure className={`bd-frame${f.kind === 'pic' ? ' is-photo' : ''}`}>
    {f.kind === 'pic' ? (
      f.pic === 'video' ? (
        still ? <img src={typingPoster} alt="" /> : (
          <video className="bd-video" autoPlay muted loop playsInline preload="metadata" poster={typingPoster} aria-hidden>
            <source src={typingClip} type="video/webm" />
          </video>
        )
      ) : <img src={PICS[f.pic]} alt={f.alt} />
    ) : (
      <div className={`bd-frag is-${f.kind}`} data-ui>
        {f.kind === 'chat' && (<><b>{f.who}</b><p>{f.text}</p></>)}
        {f.kind === 'task' && (<><p className="bd-frag-title">{f.title}</p><p className="bd-frag-meta">{f.meta}</p></>)}
        {f.kind === 'kpi' && (<><b className="bd-frag-num">{f.value}</b><p>{f.text}</p></>)}
        {f.kind === 'list' && (<><p className="bd-frag-title">{f.title}</p><ul>{f.items.map(i => <li key={i}>{i}</li>)}</ul></>)}
      </div>
    )}
    <figcaption className="bd-strip">{f.strip}</figcaption>
  </figure>
);

/* колонка повторена дважды, чтобы бесконечно плыть по вертикали; копия скрыта от экранного диктора */
export const DriftCol: React.FC<{ col: Frame[]; n: number }> = ({ col, n }) => (
  <div className={`bd-col c${n}`}>
    <div className="bd-drift">
      {col.map((f, j) => <FrameView key={j} f={f} />)}
      <div className="bd-drift-copy" aria-hidden>{col.map((f, j) => <FrameView key={j} f={f} still />)}</div>
    </div>
  </div>
);

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`bd-logo ${className}`} dir="ltr">proji</span>
);

/* все языки в одной кнопке */
export const LangMenu: React.FC<{ lang: Lang; label: string; onChoose: (l: Lang) => void }> = ({ lang, label, onChoose }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const current = LANGS.find(l => l.code === lang)!;
  return (
    <div className="bd-lang" ref={ref}>
      <button type="button" className="bd-lang-btn" aria-haspopup="true" aria-expanded={open} aria-label={`${label}: ${current.name}`} onClick={() => setOpen(v => !v)}>
        <Globe size={16} aria-hidden /> {current.short} <ChevronDown size={14} aria-hidden />
      </button>
      {open && (
        <ul className="bd-lang-list">
          {LANGS.map(l => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang}
                className={l.code === lang ? 'is-on' : ''}
                onClick={() => {
                  onChoose(l.code);
                  setOpen(false);
                }}
              >
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- страница ---------- */

export default function BoardLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [open, setOpen] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, chooseTheme] = useSiteTheme('board');
  const c = COPY[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const audit = (place: string) => {
    trackEvent('cta_ai_audit', { landing: 'board', place, lang });
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(c.auditMessage)}`, '_blank', 'noopener');
  };
  const trial = (place: string) => trackEvent('cta_trial', { landing: 'board', place, lang });

  const chooseLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(CHOSEN_KEY, next);
    } catch {
      /* приватный режим */
    }
    trackEvent('board_lang_switch', { lang: next });
  };

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'board';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useLayoutEffect(() => {
    persistLang(lang);
    document.title = c.title;
  }, [lang, c.title]);

  /* плавный переход к разделам из меню */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const id = 'board-landing-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);

  /* появление частей секций и шторка у главной картинки; без JS всё видно сразу */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const nodes = root.querySelectorAll<HTMLElement>('.bd-in:not(.is-in), .bd-shutter, .bd-blocks');
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

  const t = c.inside.tiles;
  const navLinks: [string, string][] = [
    ['#how', c.nav.how],
    ['#board', c.nav.board],
    ['#inside', c.nav.inside],
    ['#cases', c.nav.cases],
    ['#pricing', c.nav.pricing],
    ['#faq', c.nav.faq],
  ];

  return (
    <div className="bd-root" ref={rootRef} dir={dir} lang={lang} data-theme={theme}>
      <SketchDefs />
      <header className="bd-nav glass">
        <a href="#top" className="bd-nav-home" aria-label="proji"><Logo /></a>
        <nav className="bd-nav-links" aria-label={c.nav.menu}>
          {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <LangMenu lang={lang} label={c.nav.lang} onChoose={chooseLang} />
        <a className="bd-nav-login" href={LOGIN_URL} onClick={() => trial('nav-login')}>{c.nav.login}</a>
        <button type="button" className="bd-btn is-small bd-nav-cta" onClick={() => audit('nav')}>{c.nav.cta}</button>
        <button type="button" className="bd-burger" aria-label={c.nav.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        {menuOpen && (
          <nav className="bd-sheet" aria-label={c.nav.menu}>
            {navLinks.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="is-login" href={LOGIN_URL} onClick={() => trial('sheet-login')}>{c.nav.login}</a>
            <ThemeSwitch lang={lang} theme={theme} onChoose={chooseTheme} />
          </nav>
        )}
      </header>

      <main id="top">
        {/* 1. Обложка */}
        <section className="bd-hero" aria-labelledby="bd-title">
          <div className="bd-glow g1" aria-hidden />
          <div className="bd-glow g2" aria-hidden />
          <div className="bd-glow g3" aria-hidden />
          {c.cols.slice(0, 2).map((col, i) => <DriftCol key={i} col={col} n={i} />)}
          <div className="bd-mid">
            <figure className="bd-frame is-photo bd-mid-top">
              <img src={astanaNight} alt={c.hero.astanaAlt} />
            </figure>
            <div className="bd-panel">
              <SketchHero />
              <h1 id="bd-title">
                <span>{c.hero.line1}</span> <span className="bd-grad">{c.hero.line2}</span>
              </h1>
              <p>{c.hero.sub}</p>
              <div className="bd-panel-act">
                <button type="button" className="bd-btn" onClick={() => audit('hero')} data-cta-dest={`https://wa.me/${WA_PHONE}`}>
                  {c.hero.cta}
                </button>
                <a className="bd-btn is-glass" href={START_URL} onClick={() => trial('hero')} data-cta-dest={START_URL}>
                  {c.hero.trial}
                </a>
              </div>
            </div>
            <FrameView f={c.midKpi} />
          </div>
          {c.cols.slice(2).map((col, i) => <DriftCol key={i} col={col} n={i + 2} />)}
        </section>

        {/* 2. Вся компания на одном экране */}
        <section className="bd-sec" id="board" aria-labelledby="bd-board-h">
          <h2 id="bd-board-h" className="bd-h bd-in">{c.board.h}</h2>
          <p className="bd-lead bd-in">{c.board.lead}</p>
          <ul className="bd-rows bd-in" data-ui aria-label={c.board.label}>
            {c.board.rows.map((r, i) => (
              <li key={r.name} className={`glass${i === open ? ' is-open' : ''}`}>
                <button type="button" onClick={() => setOpen(i)} aria-expanded={i === open}>
                  <span className="bd-row-name">{r.name}</span>
                  <span className="bd-row-f">{r.dir}</span>
                  <span className="bd-row-f">{r.owner}</span>
                  <span className="bd-row-f bd-num">{r.due}</span>
                  <span className={`bd-st is-${r.tone}`}>{r.status}</span>
                </button>
                {i === open && <p className="bd-row-detail">{r.detail ?? c.board.detail(r.dir, r.owner, r.due)}</p>}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Как это работает */}
        <section className="bd-sec" id="how" aria-labelledby="bd-how-h">
          <h2 id="bd-how-h" className="bd-h bd-in">{c.how.h}</h2>
          <p className="bd-lead bd-in">{c.how.lead}</p>
          <ol className="bd-flow">
            {c.how.steps.map((st, i) => {
              const Pic = SKETCH_STEPS[i];
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
          <h3 className="bd-map-h bd-in">{c.how.mapH}</h3>
          <ul className="bd-map">
            {c.how.map.map(([from, to]) => (
              <li key={from} className="glass bd-in">
                <span className="bd-map-arrow" aria-hidden />
                <span className="bd-map-from">{from}</span>
                <span className="bd-map-to">{to}</span>
              </li>
            ))}
          </ul>
          <p className="bd-agent glass bd-in">{c.how.agent}</p>
        </section>

        {/* 4. Что внутри */}
        <section className="bd-sec" id="inside" aria-labelledby="bd-in-h">
          <div className="bd-mosaic">
            <div className="bd-tile is-head bd-in">
              <h2 id="bd-in-h" className="bd-h">{c.inside.h}</h2>
            </div>
            <div className="bd-tile is-live glass bd-in">
              <LiveTask live={c.inside.live} />
              <p className="bd-cap"><b>{t.live[0]}</b> {t.live[1]}</p>
            </div>
            <div className="bd-tile is-yellow bd-in">
              <div className="bd-zoom" data-ui><span className="bd-zoom-st">{t.risk}</span></div>
              <p className="bd-cap"><b>{t.signals[0]}</b> {t.signals[1]}</p>
            </div>
            <div className="bd-tile glass bd-in">
              <div className="bd-zoom is-toggle" data-ui><span>{t.toggle[0]}</span><span className="is-on">{t.toggle[1]}</span></div>
              <p className="bd-cap"><b>{t.people[0]}</b> {t.people[1]}</p>
            </div>
            <div className="bd-tile is-blue bd-in">
              <div className="bd-zoom is-num" data-ui dir="ltr">09<span className="bd-colon">:</span>30</div>
              <p className="bd-cap"><b>{t.meetings[0]}</b> {t.meetings[1]}</p>
            </div>
            <figure className="bd-tile is-photo bd-in">
              <img src={managerDesk} alt={t.digestAlt} loading="lazy" />
              <figcaption className="bd-cap glass"><b>{t.digest[0]}</b> {t.digest[1]}</figcaption>
            </figure>
            <div className="bd-tile is-mint bd-in">
              <div className="bd-zoom is-discs" data-ui dir="ltr"><span>АС</span><span>ОП</span><span>ДМ</span></div>
              <p className="bd-cap"><b>{t.contractors[0]}</b> {t.contractors[1]}</p>
            </div>
            <div className="bd-tile glass bd-in">
              <ul className="bd-safe">{t.safe.map(s => <li key={s}>{s}</li>)}</ul>
              <p className="bd-cap"><b>{t.control[0]}</b> {t.control[1]}</p>
            </div>
          </div>
        </section>

        {/* 5. Кейсы */}
        <section className="bd-sec" id="cases" aria-labelledby="bd-cases-h">
          <div className="bd-proof">
            <div className="bd-tile is-mint w2 bd-in"><h2 id="bd-cases-h" className="bd-h">{c.cases.h}</h2></div>
            {c.cases.items.map((it, i) => (
              <div key={it.name} className="bd-tile glass bd-in">
                {CASE_LOGOS[i] && <div className={`bd-case-logo l${i}`}><img src={CASE_LOGOS[i]!} alt="" loading="lazy" /></div>}
                <b className="bd-case">{it.name}</b>
                <p>{it.text}</p>
              </div>
            ))}
            <figure className="bd-tile w2 is-photo bd-in">
              <img src={aktobeSatellite} alt={c.cases.photoAlt} loading="lazy" />
              <figcaption className="bd-cap glass"><b>{c.cases.photo[0]}</b> {c.cases.photo[1]}</figcaption>
            </figure>
          </div>
        </section>

        {/* 6. Тарифы */}
        <section className="bd-sec" id="pricing" aria-labelledby="bd-price-h">
          <div className="bd-table-wrap glass bd-in">
            <table className="bd-table">
              <caption className="bd-sr">{c.pricing.h}</caption>
              <thead>
                <tr>
                  <th scope="col"><h2 id="bd-price-h" className="bd-h">{c.pricing.h}</h2></th>
                  {c.pricing.plans.map((p, i) => <th scope="col" key={p} className={i === 2 ? 'is-rec' : ''}>{p}</th>)}
                </tr>
              </thead>
              <tbody>
                {c.pricing.rows.map(([label, vals]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {vals.map((v, i) => <td key={i} className={i === 2 ? 'is-rec' : ''} data-plan={c.pricing.plans[i]}>{v}</td>)}
                  </tr>
                ))}
                <tr className="bd-table-act">
                  <th scope="row" />
                  {c.pricing.plans.map((p, i) => (
                    <td key={p} className={i === 2 ? 'is-rec' : ''} data-plan={p}>
                      {i === 3
                        ? <button type="button" className="bd-btn is-glass" onClick={() => audit('pricing-enterprise')}>{c.pricing.talk}</button>
                        : <a className={`bd-btn${i === 2 ? '' : ' is-glass'}`} href={START_URL} onClick={() => trial(`pricing-${i}`)}>{c.pricing.start}</a>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Сомнения */}
        <section className="bd-sec bd-faq" id="faq" aria-labelledby="bd-faq-h">
          <h2 id="bd-faq-h" className="bd-h bd-in">{c.faq.h}</h2>
          <div className="bd-faq-list">
            {c.faq.items.map((o, i) => (
              <details key={o.q} name="bd-faq" open={i === 0} className="glass bd-in">
                <summary>{o.q}<span className="bd-plus" aria-hidden /></summary>
                <p>{o.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8. Оффер */}
        <section className="bd-cta" aria-labelledby="bd-cta-h">
          <figure className="bd-cta-photo bd-in"><img src={astanaDusk} alt={c.cta.photoAlt} loading="lazy" /></figure>
          <div className="bd-cta-main bd-in">
            <div className="bd-glow g4" aria-hidden />
            <h2 id="bd-cta-h" className="bd-h">{c.cta.h}</h2>
            <p>{c.cta.text}</p>
            <div className="bd-cta-act">
              <button type="button" className="bd-btn" onClick={() => audit('final')} data-cta-dest={`https://wa.me/${WA_PHONE}`}>{c.hero.cta}</button>
              <a className="bd-btn is-glass" href={START_URL} onClick={() => trial('final')}>{c.hero.trial}</a>
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
            <a href="#board">{c.nav.board}</a>
            <a href="#pricing">{c.nav.pricing}</a>
            <a href={LOGIN_URL}>{c.foot.login}</a>
          </nav>
          <div>
            <p>{c.foot.address}</p>
            <p><a href="tel:+77766006636" dir="ltr">+7 776 600 66 36</a></p>
            <p><a href="mailto:sund.serik@gmail.com">sund.serik@gmail.com</a></p>
          </div>
          <p className="bd-credits">
            {c.foot.credits} Pexels; «Aktobe (Kazakhstan), satellite image 2017-09-07» — European Space Agency, CC BY-SA 3.0 IGO;
            «Hunt and peck typing» — C40115, CC BY 4.0 (Wikimedia Commons). {c.foot.logos}
          </p>
        </div>
        <div className="bd-foot-last">
          <span><Logo /> © 2026</span>
          <button type="button" className="bd-btn is-small" onClick={() => audit('footer')}>{c.nav.cta}</button>
        </div>
        <ThemeSwitch lang={lang} theme={theme} onChoose={chooseTheme} />
      </footer>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import type { Lang } from '../board/copy';
import { SketchClock, SketchSun } from '../board/Sketches';
import { AiShell, Cta } from './Shell';
import { SketchBars, SketchEye, SketchFile, SketchFlame, SketchLock, SketchTarget } from './Sketches';
import { BurnDown, CountUp, Ring } from './Viz';
import { MORNING } from './morning.copy';

/** /morning: утро руководителя на 10 минут, часы идут вместе с прокруткой. Данные — ИЛЛЮСТРАЦИЯ, примерные цифры. */

const SLUG = 'morning';
const SPEED = 3;
const DAYS = 5;
const OVER = 12;
const RADIUS = 46;
const CIRCLE = 2 * Math.PI * RADIUS;

const TRUST_PICS = [SketchFile, SketchEye, SketchLock];

const Minute: React.FC<{ n: number; label: string; id?: string; h: string; x: string; pic: React.FC; children: React.ReactNode }> = ({ n, label, id, h, x, pic: Pic, children }) => (
  <section className="ai-minute ai-in" id={id}>
    <div className="ai-ex-head">
      <div>
        <p className="ai-minute-n">{label} {n}</p>
        <h2>{h}</h2>
        <p className="ai-minute-x">{x}</p>
      </div>
      <Pic />
    </div>
    <div className="ai-minute-box glass">{children}</div>
  </section>
);

const Page: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = MORNING[lang];
  const [left, setLeft] = useState(18);
  const listRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const timeRef = useRef<HTMLSpanElement | null>(null);
  const need = Math.ceil(left / SPEED);
  const ok = need <= DAYS;
  const maxLoad = Math.max(...c.load.rows.map(r => r[1]));

  /* часы: от начала до конца списка минут проходят 10:00 */
  useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const box = listRef.current;
      if (!box || !ringRef.current || !timeRef.current) return;
      const r = box.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.45 - r.top) / Math.max(1, r.height - window.innerHeight * 0.4)));
      const secs = Math.round(p * 600);
      ringRef.current.style.strokeDashoffset = String(CIRCLE * (1 - p));
      timeRef.current.textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ai-col is-wide">
      <section className="ai-hero is-split" aria-labelledby="mo-h">
        <div className="ai-aurora" aria-hidden />
        <div>
          <h1 id="mo-h">{c.hero.a} <span className="bd-grad">{c.hero.b}</span></h1>
          <p className="ai-lead">{c.hero.sub}</p>
          <div className="ai-actions"><Cta slug={SLUG} place="hero" label={c.cta} lang={lang} /></div>
        </div>
        <SketchSun />
      </section>

      <div className="ai-morning" id="morning">
        <aside className="ai-clock" aria-hidden>
          <svg viewBox="0 0 110 110">
            <circle cx="55" cy="55" r={RADIUS} className="is-track" />
            <circle ref={ringRef} cx="55" cy="55" r={RADIUS} className="is-run" strokeDasharray={CIRCLE} strokeDashoffset={CIRCLE} />
          </svg>
          <span ref={timeRef} dir="ltr">0:00</span>
        </aside>

        <div ref={listRef}>
          <Minute n={1} label={c.minute} h={c.day.h} x={c.day.x} pic={SketchSun}>
            <span className="bd-btn is-small ai-fake">{c.day.btn}</span>
            <div className="ai-split" aria-hidden><i style={{ flexGrow: 12 }} /><i className="is-warn" style={{ flexGrow: 3 }} /></div>
            <ul className="ai-list">{c.day.list.map(t => <li key={t}>{t}</li>)}</ul>
          </Minute>

          <Minute n={3} label={c.minute} h={c.fire.h} x={c.fire.x} pic={SketchFlame}>
            <ul className="ai-signals">
              {c.fire.rows.map(([t, n]) => <li key={t}>
                <span>{t}</span>
                <em aria-hidden>{Array.from({ length: n }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</em>
                <b><CountUp value={n} /></b>
              </li>)}
            </ul>
          </Minute>

          <Minute n={5} label={c.minute} id="will" h={c.will.h} x={c.will.x} pic={SketchClock}>
            <p className="ai-q is-inline">{c.will.q}</p>
            <label className="ai-range">
              <span>{c.will.left}: <b>{left}</b></span>
              <input type="range" min={6} max={24} value={left} onChange={e => setLeft(Number(e.target.value))} />
            </label>
            <p className="ai-speed">{c.will.speed}</p>
            <BurnDown left={left} speed={SPEED} days={DAYS} ok={ok} deadline={c.will.have} />
            <div className={`ai-verdict ${ok ? 'is-ok' : 'is-risk'}`} aria-live="polite">
              <b>{ok ? c.will.ok : c.will.risk}</b>
              <span>{c.will.need}: {need} · {c.will.have}: {DAYS}</span>
            </div>
          </Minute>

          <Minute n={7} label={c.minute} h={c.load.h} x={c.load.x} pic={SketchBars}>
            <ul className="ai-load">
              {c.load.rows.map(([name, n]) => (
                <li key={name} className={n >= OVER ? 'is-over' : n <= 3 ? 'is-free' : ''}>
                  <span>{name}</span>
                  <i style={{ ['--w' as string]: `${(n / maxLoad) * 100}%` }} />
                  <b>{n}{n >= OVER ? ` · ${c.load.over}` : n <= 3 ? ` · ${c.load.free}` : ''}</b>
                </li>
              ))}
            </ul>
          </Minute>

          <Minute n={9} label={c.minute} h={c.goals.h} x={c.goals.x} pic={SketchTarget}>
            <div className="ai-rings">{c.goals.rows.map(([t, n]) => <Ring key={t} pct={n} label={t} />)}</div>
          </Minute>

          <section className="ai-done ai-in">
            <SketchClock />
            <h2>{c.done.h}</h2>
            <p>{c.done.x}</p>
          </section>
        </div>
      </div>

      <section className="ai-trust ai-in" id="trust" aria-labelledby="mo-trust-h">
        <h2 id="mo-trust-h">{c.trust.h}</h2>
        <ul>{c.trust.items.map(([t, x], i) => {
          const Pic = TRUST_PICS[i];
          return <li key={t} className="glass"><Pic /><h3>{t}</h3><p>{x}</p></li>;
        })}</ul>
      </section>

      <section className="ai-end is-center ai-in">
        <h2>{c.hero.b}</h2>
        <div className="ai-actions"><Cta slug={SLUG} place="final" label={c.cta} lang={lang} /></div>
      </section>
    </div>
  );
};

const title = (l: Lang) => MORNING[l].title;
const cta = (l: Lang) => MORNING[l].cta;
const links = (l: Lang): [string, string][] => [['#morning', MORNING[l].nav[0]], ['#will', MORNING[l].nav[1]], ['#trust', MORNING[l].nav[2]]];

export default function MorningLanding() {
  return <AiShell slug={SLUG} title={title} cta={cta} links={links}>{l => <Page lang={l} />}</AiShell>;
}

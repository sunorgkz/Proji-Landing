import React, { useEffect, useState } from 'react';
import { Search, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { Lang } from '../board/copy';
import { SketchRead, SketchSun } from '../board/Sketches';
import { AiShell, Cta, KB_URL } from './Shell';
import { SketchBolt, SketchEye, SketchLock, SketchNoTrash, SketchPin, SketchPress, SketchQuestion, SketchShield } from './Sketches';
import { CountUp } from './Viz';
import { ASK } from './ask.copy';

/** /ask: вся страница — разговор с Proji AI. Диалоги — ИЛЛЮСТРАЦИЯ на примерных данных, не скриншот живого Proji. */

const SLUG = 'ask';
const Q: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="ai-q">{children}</p>;
const A: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="ai-a">{children}</div>;

const SAFE_PICS = [SketchEye, SketchLock, SketchNoTrash, SketchShield];

const Ex: React.FC<{ h: string; pic: React.FC; children: React.ReactNode }> = ({ h, pic: Pic, children }) => (
  <section className="ai-ex ai-in">
    <div className="ai-ex-head"><h2>{h}</h2><Pic /></div>
    <div className="ai-thread">{children}</div>
  </section>
);

const Page: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = ASK[lang];
  const [ask, setAsk] = useState(0);
  const [saved, setSaved] = useState(false);
  const [person, setPerson] = useState<string | null>(null);
  const [dayOpen, setDayOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setAsk(i => i + 1), 2600);
    return () => window.clearInterval(t);
  }, []);
  useEffect(() => {
    setSaved(false);
    setPerson(null);
    setDayOpen(false);
  }, [lang]);

  return (
    <div className="ai-col">
      <section className="ai-hero is-center" aria-labelledby="ask-h">
        <div className="ai-aurora" aria-hidden />
        <h1 id="ask-h">{c.hero.h}</h1>
        <p className="ai-lead">{c.hero.sub}</p>
        <ul className="ai-floats" aria-hidden>
          {c.hero.asks.map((t, i) => <li key={t} style={{ ['--i' as string]: i }}>{t}</li>)}
        </ul>
        <div className="ai-compose glass" aria-hidden>
          <Search size={20} />
          <span key={ask + lang}>{c.hero.asks[ask % c.hero.asks.length]}</span>
          <i />
        </div>
        <div className="ai-actions"><Cta slug={SLUG} place="hero" label={c.cta} lang={lang} /></div>
      </section>

      <div id="talk" className="ai-talk">

        <Ex h={c.answers.h} pic={SketchRead}>
          <Q>{c.answers.q}</Q>
          <A>
            <ul className="ai-steps">{c.answers.steps.map(s => <li key={s}>{s}</li>)}</ul>
            <p>{c.answers.a}</p>
            <div className="ai-links">{c.answers.links.map(l => <span key={l}>{l}</span>)}</div>
            <div className="ai-rate" aria-hidden><ThumbsUp size={16} /><ThumbsDown size={16} /></div>
          </A>
        </Ex>

        <Ex h={c.draft.h} pic={SketchPress}>
          <Q>{c.draft.q}</Q>
          <A>
            <p>{c.draft.a}</p>
            <dl className="ai-draft">
              {c.draft.rows.map(([k, from, to]) => (
                <div key={k}><dt>{k}</dt><dd><s>{from}</s><b>{to}</b></dd></div>
              ))}
            </dl>
            {saved ? (
              <div className="ai-saved">
                <p>{c.draft.done}</p>
                <button type="button" className="ai-chip" onClick={() => setSaved(false)}>{c.draft.undo}</button>
              </div>
            ) : (
              <div className="ai-row">
                <button type="button" className="bd-btn is-small" onClick={() => setSaved(true)}>{c.draft.ok}</button>
                <span className="ai-chip is-off">{c.draft.no}</span>
              </div>
            )}
          </A>
        </Ex>

        <Ex h={c.clarify.h} pic={SketchQuestion}>
          <Q>{c.clarify.q}</Q>
          <A>
            <p>{c.clarify.a}</p>
            <div className="ai-row">
              {c.clarify.options.map(o => (
                <button key={o} type="button" className="ai-chip" aria-pressed={person === o} onClick={() => setPerson(o)}>{o}</button>
              ))}
            </div>
            {person && <p className="ai-pop">{c.clarify.picked}{person}</p>}
          </A>
        </Ex>

        <Ex h={c.instant.h} pic={SketchBolt}>
          <Q>{c.instant.q}</Q>
          <A>
            <p>{c.instant.a}</p>
            <ul className="ai-list">{c.instant.list.map(t => <li key={t}>{t}</li>)}</ul>
          </A>
          <p className="ai-side">{c.instant.x}</p>
        </Ex>

        <Ex h={c.day.h} pic={SketchSun}>
          <button type="button" className="bd-btn ai-daybtn" aria-expanded={dayOpen} onClick={() => setDayOpen(true)}>{c.day.btn}</button>
          {dayOpen && <A><ul className="ai-list ai-pop">{c.day.list.map(t => <li key={t}>{t}</li>)}</ul></A>}
        </Ex>

        <Ex h={c.page.h} pic={SketchPin}>
          <p className="ai-ctx">{c.page.ctx}</p>
          <Q>{c.page.q}</Q>
          <A><p>{c.page.a}</p></A>
        </Ex>
      </div>

      <section className="ai-safe ai-in" id="safe" aria-labelledby="ask-safe-h">
        <h2 id="ask-safe-h">{c.safe.h}</h2>
        <ul>
          {c.safe.items.map(([t, x], i) => {
            const Pic = SAFE_PICS[i];
            return <li key={t}><Pic /><div><h3>{t}</h3><p>{x}</p></div></li>;
          })}
        </ul>
      </section>

      <section className="ai-proof ai-in" id="proof">
        <b><CountUp value={Number(c.proof.n)} /></b>
        <div>
          <p>{c.proof.x}</p>
          <a href={KB_URL}>{c.proof.kb}</a>
        </div>
      </section>

      <section className="ai-end is-center ai-in">
        <h2>{c.end}</h2>
        <div className="ai-actions"><Cta slug={SLUG} place="final" label={c.cta} lang={lang} /></div>
      </section>
    </div>
  );
};

const title = (l: Lang) => ASK[l].title;
const cta = (l: Lang) => ASK[l].cta;
const links = (l: Lang): [string, string][] => [['#talk', ASK[l].nav[0]], ['#safe', ASK[l].nav[1]], ['#proof', ASK[l].nav[2]]];

export default function AskLanding() {
  return <AiShell slug={SLUG} title={title} cta={cta} links={links}>{l => <Page lang={l} />}</AiShell>;
}

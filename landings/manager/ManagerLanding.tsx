import React, { useEffect, useState } from 'react';
import { SketchChat, SketchRead, SketchTask } from '../board/Sketches';
import type { Lang } from '../board/copy';
import { AiShell, Cta } from '../ai/Shell';
import { SketchEye, SketchFile, SketchFlame, SketchPress, SketchQuestion } from '../ai/Sketches';
import { CountUp } from '../ai/Viz';
import { ROLES_AR, UI_AR } from './copy.ar';
import { ROLES_EN, UI_EN } from './copy.en';
import { ROLES_KK, UI_KK } from './copy.kk';
import { ROLES_RU, UI_RU } from './copy.ru';
import { RoleViz } from './RoleViz';
import { ROLE_IDS, type ManagerUi, type RoleCopy, type RoleId } from './roles';
import './manager.css';

/**
 * Один шаблон для 10 лендингов про цифровых менеджеров.
 * Сообщения людям и агентам показаны только с подтверждением; случаи и числа — ИЛЛЮСТРАЦИЯ на примерных данных.
 */

const UI: Record<Lang, ManagerUi> = { ru: UI_RU, kk: UI_KK, en: UI_EN, ar: UI_AR };
const ROLES: Record<Lang, Record<RoleId, RoleCopy>> = { ru: ROLES_RU, kk: ROLES_KK, en: ROLES_EN, ar: ROLES_AR };
const STEP_PICS = [SketchFlame, SketchRead, SketchChat, SketchPress, SketchFile, SketchTask];
const SAFE_PICS = [SketchPress, SketchEye, SketchFile];

const Page: React.FC<{ role: RoleId; lang: Lang }> = ({ role, lang }) => {
  const ui = UI[lang];
  const r = ROLES[lang][role];
  const slug = `manager-${role}`;
  const [signal, setSignal] = useState(0);
  const [asked, setAsked] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    setSignal(0);
    setAsked(0);
    setSent(false);
  }, [lang]);
  const s = r.story;
  const story = [s.signal, s.analysis, s.person, s.agent, s.doc, s.done];

  return (
    <div className="ai-col is-wide">
      <section className="ai-hero is-split mg-hero" aria-labelledby="mg-h">
        <div className="ai-aurora" aria-hidden />
        <div>
          <h1 id="mg-h">{r.name}</h1>
          <p className="ai-lead">{r.sub}</p>
          <div className="ai-actions"><Cta slug={slug} place="hero" label={ui.cta} lang={lang} /></div>
        </div>
        <figure className="mg-card">
          <RoleViz role={role} />
        </figure>
      </section>

      <ul className="mg-caps ai-in">{ui.caps.map((c, i) => <li key={c} style={{ ['--i' as string]: i }}>{c}</li>)}</ul>

      <section className="mg-sec ai-in" id="signals" aria-labelledby="mg-signals-h">
        <div className="ai-ex-head">
          <div>
            <h2 id="mg-signals-h">{ui.signalsH}</h2>
            <p className="ai-minute-x">{ui.signalsX}</p>
          </div>
          <SketchFlame />
        </div>
        <div className="mg-signals">
          <div className="mg-signal-list">
            {r.signals.map(([label, n], i) => (
              <button key={label} type="button" aria-pressed={i === signal} onClick={() => setSignal(i)}>
                <span>{label}</span>
                <b><CountUp value={n} /></b>
              </button>
            ))}
          </div>
          <div className="mg-signal-out glass" key={signal + lang} aria-live="polite">
            <SketchRead />
            <p>{r.signals[signal][2]}</p>
          </div>
        </div>
      </section>

      <section className="mg-sec ai-in" id="how" aria-labelledby="mg-story-h">
        <h2 id="mg-story-h">{ui.storyH}</h2>
        <p className="ai-minute-x">{ui.storyX}</p>
        <ol className="mg-story">
          {story.map((text, i) => {
            const Pic = STEP_PICS[i];
            return (
              <li key={ui.steps[i]} className="glass" style={{ ['--d' as string]: i }}>
                <span className="mg-n" aria-hidden>{i + 1}</span>
                <Pic />
                <h3>{ui.steps[i]}</h3>
                <p>{text}</p>
                {i === 3 && (sent
                  ? <p className="mg-sent">{ui.confirmed}</p>
                  : <button type="button" className="bd-btn is-small" onClick={() => setSent(true)}>{ui.confirm}</button>)}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mg-sec ai-in" id="team" aria-labelledby="mg-team-h">
        <h2 id="mg-team-h">{ui.teamH}</h2>
        <p className="ai-minute-x">{ui.teamX}</p>
        <div className="mg-tree">
          <span className="mg-node is-you">{ui.you}</span>
          <i className="mg-link" aria-hidden />
          <span className="mg-node is-boss">{r.short}</span>
          <i className="mg-link" aria-hidden />
          <div className="mg-groups">
            <div>
              <h3>{ui.people}</h3>
              {r.team.people.map(p => <span key={p} className="mg-node">{p}</span>)}
            </div>
            <div>
              <h3>{ui.agents}</h3>
              {r.team.agents.map(p => <span key={p} className="mg-node is-agent">{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mg-sec ai-in" aria-labelledby="mg-ask-h">
        <div className="ai-ex-head">
          <h2 id="mg-ask-h">{ui.askH}</h2>
          <SketchQuestion />
        </div>
        <div className="ai-row mg-chips">
          {r.qa.map(([q], i) => <button key={q} type="button" className="ai-chip" aria-pressed={i === asked} onClick={() => setAsked(i)}>{q}</button>)}
        </div>
        <div className="ai-thread" key={asked + lang} aria-live="polite">
          <p className="ai-q">{r.qa[asked][0]}</p>
          <div className="ai-a ai-pop"><p>{r.qa[asked][1]}</p></div>
        </div>
      </section>

      <section className="ai-trust ai-in" aria-labelledby="mg-safe-h">
        <h2 id="mg-safe-h">{ui.safeH}</h2>
        <ul>{ui.safe.map(([t, x], i) => {
          const Pic = SAFE_PICS[i];
          return <li key={t} className="glass"><Pic /><h3>{t}</h3><p>{x}</p></li>;
        })}</ul>
      </section>

      <section className="mg-sec ai-in" aria-labelledby="mg-others-h">
        <h2 id="mg-others-h">{ui.othersH}</h2>
        <div className="mg-others">
          {ROLE_IDS.filter(id => id !== role).map(id => (
            <a key={id} href={`/manager-${id}`} className="glass">
              <RoleViz role={id} />
              <span>{ROLES[lang][id].short}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="ai-end is-center ai-in">
        <h2>{ui.endH}</h2>
        <div className="ai-actions"><Cta slug={slug} place="final" label={ui.cta} lang={lang} /></div>
      </section>
    </div>
  );
};

const cache = new Map<RoleId, React.ComponentType>();

/** Для registry.ts: компонент лендинга конкретной роли, один на роль. */
export function roleLanding(role: RoleId): React.ComponentType {
  let C = cache.get(role);
  if (!C) {
    const title = (l: Lang) => `proji — ${ROLES[l][role].name}`;
    const cta = (l: Lang) => UI[l].cta;
    const links = (l: Lang): [string, string][] => [['#signals', UI[l].nav[0]], ['#how', UI[l].nav[1]], ['#team', UI[l].nav[2]]];
    C = () => <AiShell slug={`manager-${role}`} title={title} cta={cta} links={links}>{l => <Page role={role} lang={l} />}</AiShell>;
    cache.set(role, C);
  }
  return C;
}

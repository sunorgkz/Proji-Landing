import React from 'react';
import { COPY as BOARD, type Lang } from '../board/copy';
import { Act, Fill, Line, Sketch, SKETCH_STEPS } from '../board/Sketches';
import { AiShell, Cta } from '../ai/Shell';
import { Person, box } from '../manager/RoleViz';
import '../manager/manager.css';
import './home.css';

/**
 * Альтернативный главный экран Proji: обложка со сценкой и пять шагов «что из чего», светлая и тёмная тема в подвале.
 * Тексты — из /board (4 языка). Сценка — ИЛЛЮСТРАЦИЯ, нарисована по BRANDBOOK.md, это не снимок интерфейса.
 */

const SLUG = 'home';
const YELLOW = 'var(--yellow)';
const DEEP = 'var(--navy-700)';

/* Руководитель пишет с телефона, сообщения летят на доску, задачи отмечаются, команда получает работу, утром восходит солнце-сводка */
const HomeScene = () => {
  const FLY = 'M112 128C124 96 140 84 160 78';
  const TO_A = 'M222 154C224 170 230 180 238 186';
  const TO_B = 'M262 154C272 168 290 178 304 186';
  return (
    <Sketch w={360} h={240}>
      <Person x={58} by={232} s={1.05} o={0} tie />
      <Fill d={box(84, 124, 30, 50)} o={1.6} dx={3} dy={3} />
      <Line d={box(84, 124, 30, 50)} o={1.2} />
      <Line d="M92 140L106 140M92 150L102 150" o={1.8} />
      <circle className="mv-msg" r="6" style={{ offsetPath: `path('${FLY}')` }} />
      <circle className="mv-msg is-b" r="6" style={{ offsetPath: `path('${FLY}')` }} />
      <Fill d={box(160, 34, 120, 120)} o={2.4} color={DEEP} dx={5} dy={4} />
      <Line d={box(160, 34, 120, 120)} o={2} />
      <Line d="M174 58L188 58L188 72L174 72ZM174 90L188 90L188 104L174 104ZM174 122L188 122L188 136L174 136Z" o={2.6} />
      <Line d="M198 66L262 66M198 98L252 98" o={3} />
      <rect className="mv-grow" x="198" y="124" width="58" height="10" rx="5" fill={YELLOW} style={{ ['--i' as string]: 2 }} />
      <Act d="M172 64C175 67 178 70 180 72C185 64 190 58 196 52" o={3.6} loop />
      <Act d="M172 96C175 99 178 102 180 104C185 96 190 90 196 84" o={4} loop />
      <Line d={TO_A} o={4.4} />
      <Line d={TO_B} o={4.6} />
      <circle className="mv-msg is-c" r="5" style={{ offsetPath: `path('${TO_B}')` }} />
      <Person x={244} by={232} s={0.7} o={5} />
      <Person x={310} by={232} s={0.7} o={5.3} />
      <g className="rv-spin"><Act d="M322 14L322 22M322 66L322 74M292 44L300 44M344 44L352 44M301 23L307 29M337 59L343 65M301 65L307 59M337 29L343 23" o={6} yellow /></g>
      <Fill d="M308 44a14 14 0 1 0 28 0a14 14 0 1 0 -28 0Z" o={5.8} color={YELLOW} dx={0} dy={0} />
      <Line d="M14 232C120 229 240 235 346 231" o={0.5} />
    </Sketch>
  );
};

const Page: React.FC<{ lang: Lang }> = ({ lang }) => {
  const b = BOARD[lang];
  return (
    <div className="ai-col is-wide">
      <section className="ai-hero is-split mg-hero hm-hero" aria-labelledby="hm-h">
        <div className="ai-aurora" aria-hidden />
        <div>
          <h1 id="hm-h">{b.hero.line1} <span className="bd-grad">{b.hero.line2}</span></h1>
          <p className="ai-lead">{b.hero.sub}</p>
          <div className="ai-actions"><Cta slug={SLUG} place="hero" label={b.hero.trial} lang={lang} /></div>
        </div>
        <figure className="mg-card"><HomeScene /></figure>
      </section>

      <section className="hm-sec ai-in" id="steps" aria-labelledby="hm-steps-h">
        <h2 id="hm-steps-h">{b.how.mapH}</h2>
        <ol className="hm-steps">
          {b.how.steps.map((s, i) => {
            const Pic = SKETCH_STEPS[i];
            return (
              <li key={s.title} style={{ ['--i' as string]: i }}>
                <Pic />
                <h3>{s.title}</h3>
                <p>{s.example}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

const title = (l: Lang) => `proji — ${BOARD[l].hero.line1} ${BOARD[l].hero.line2}`;
const TRY: Record<Lang, string> = { ru: 'Попробовать', kk: 'Байқап көру', en: 'Try it', ar: 'جرّب الآن' };
const cta = (l: Lang) => TRY[l];
const links = (l: Lang): [string, string][] => [['#steps', BOARD[l].nav.how]];

export default function HomeLanding() {
  return <AiShell slug={SLUG} title={title} cta={cta} links={links} themed>{l => <Page lang={l} />}</AiShell>;
}

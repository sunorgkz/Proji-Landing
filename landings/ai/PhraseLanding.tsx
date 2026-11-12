import React, { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import type { Lang } from '../board/copy';
import { AiShell, Cta } from './Shell';
import { SketchCalendar, SketchFile, SketchPin, SketchQuestion, SketchStack } from './Sketches';
import { PHRASE, type DateCode } from './phrase.copy';

/** /phrase: задача из одной фразы, попробовать можно прямо на сайте. Карточка и доска — ИЛЛЮСТРАЦИЯ на примерных данных. */

const SLUG = 'phrase';
type Copy = (typeof PHRASE)[Lang];

function resolveDate(code: DateCode): Date {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  if (code === 'tomorrow') d.setDate(d.getDate() + 1);
  else if (code === 'after') d.setDate(d.getDate() + 2);
  else if (code === 'eom') d.setMonth(d.getMonth() + 1, 0);
  else if (code === 'eow') d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7));
  else if (code !== 'today') {
    const day = Number(code.slice(1));
    d.setDate(d.getDate() + (((day - d.getDay() + 6) % 7) + 1));
  }
  return d;
}

/* казахского календаря в браузерах часто нет, поэтому названия заданы здесь */
const KK_MONTHS = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
const KK_DAYS = ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'];

const formatDate = (c: Copy, code: DateCode) => {
  const d = resolveDate(code);
  if (c.locale === 'kk-KZ') return `${KK_DAYS[d.getDay()]}, ${d.getDate()} ${KK_MONTHS[d.getMonth()]}`;
  return new Intl.DateTimeFormat(c.locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
};

function parsePhrase(text: string, c: Copy) {
  let rest = text.trim();
  let who: string | null = null;
  const m = rest.match(/^(\p{L}+)\s*[,،:]\s*(.+)$/su);
  if (m) {
    who = m[1];
    rest = m[2];
  }
  const urgentRe = new RegExp(`(^|\\s)${c.parse.urgent}(?=\\s|$)`, 'iu');
  const high = urgentRe.test(rest);
  rest = rest.replace(urgentRe, '$1').trim();
  let due: string | null = null;
  for (const [word, code] of c.parse.rules) {
    const re = new RegExp(`${c.parse.pre}(?:${word})(?=[\\s.,!?،]|$)`, 'iu');
    if (re.test(` ${rest}`)) {
      rest = ` ${rest}`.replace(re, '').trim();
      due = formatDate(c, code);
      break;
    }
  }
  rest = rest.replace(/[.,،!?\s]+$/u, '');
  return { who, due, high, task: rest ? rest[0].toUpperCase() + rest.slice(1) : '' };
}

/* примерные задачи для четырёх видов: колонка, начало и длина в Ганте, срочно, важно */
const TASK_META: [number, number, number, boolean, boolean][] = [
  [1, 0, 3, true, true], [0, 1, 2, true, false], [1, 2, 4, false, true], [2, 0, 2, false, true], [0, 3, 3, false, false], [2, 1, 2, true, true],
];

const BoardViews: React.FC<{ c: Copy }> = ({ c }) => {
  const [view, setView] = useState(1);
  const t = c.board.tasks;
  return (
    <div className="ai-views glass">
      <div className="wy-switch" role="group" aria-label={c.board.h}>
        {c.board.tabs.map((name, i) => <button key={name} type="button" aria-pressed={i === view} onClick={() => setView(i)}>{name}</button>)}
      </div>
      <div className="ai-view" key={view}>
        {view === 0 && (
          <ul className="ai-v-list">
            {t.map((name, i) => <li key={name}><span>{name}</span><em>{c.board.cols[TASK_META[i][0]]}</em></li>)}
          </ul>
        )}
        {view === 1 && (
          <div className="ai-v-kanban">
            {c.board.cols.map((col, k) => (
              <div key={col}><h3>{col}</h3>{t.map((name, i) => TASK_META[i][0] === k && <p key={name}>{name}</p>)}</div>
            ))}
          </div>
        )}
        {view === 2 && (
          <ul className="ai-v-gantt">
            {t.map((name, i) => (
              <li key={name}>
                <span>{name}</span>
                <div><i style={{ insetInlineStart: `${TASK_META[i][1] * 14}%`, width: `${TASK_META[i][2] * 14}%` }} /></div>
              </li>
            ))}
          </ul>
        )}
        {view === 3 && (
          <div className="ai-v-matrix">
            {[[true, true], [false, true], [true, false], [false, false]].map(([u, im], q) => (
              <div key={c.board.quads[q]}>
                <h3>{c.board.quads[q]}</h3>
                {t.map((name, i) => TASK_META[i][3] === u && TASK_META[i][4] === im && <p key={name}>{name}</p>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MORE_PICS = [SketchPin, SketchStack, SketchFile, SketchQuestion];

/* настоящий текущий месяц: сегодня и дни из примеров */
const MonthMarks: React.FC<{ codes: DateCode[] }> = ({ codes }) => {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const marks = codes.map(resolveDate).filter(d => d.getMonth() === now.getMonth()).map(d => d.getDate());
  return (
    <div className="ai-month" dir="ltr" aria-hidden>
      {Array.from({ length: (first.getDay() + 6) % 7 }, (_, i) => <span key={`e${i}`} />)}
      {Array.from({ length: total }, (_, i) => i + 1).map(day => (
        <span key={day} className={`${day === now.getDate() ? 'is-today ' : ''}${marks.includes(day) ? 'is-mark' : ''}`} style={{ ['--i' as string]: day }}>{day}</span>
      ))}
    </div>
  );
};

const Page: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = PHRASE[lang];
  const [text, setText] = useState(c.hero.samples[0]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setText(c.hero.samples[0]);
    setSaved(false);
  }, [c]);
  const p = useMemo(() => parsePhrase(text, c), [text, c]);
  const missing = !p.who ? c.card.askWho : !p.task ? c.card.askTask : !p.due ? c.card.askDue : null;
  const unset = '—';

  return (
    <div className="ai-col is-wide">
      <section className="ai-hero is-center is-try" id="try" aria-labelledby="ph-h">
        <div className="ai-aurora" aria-hidden />
        <h1 id="ph-h">{c.hero.h}</h1>
        <p className="ai-lead">{c.hero.sub}</p>

        <div className="ai-try">
          <div className="ai-try-in glass">
            <label htmlFor="ph-input">{c.hero.label}</label>
            <textarea
              id="ph-input"
              rows={2}
              dir="auto"
              value={text}
              onChange={e => {
                setText(e.target.value);
                setSaved(false);
              }}
            />
            <div className="ai-row">
              {c.hero.samples.map(s => (
                <button
                  key={s}
                  type="button"
                  className="ai-chip"
                  aria-pressed={s === text}
                  onClick={() => {
                    setText(s);
                    setSaved(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <span className="ai-try-arrow" aria-hidden />
          <div className={`ai-cardout${saved ? ' is-saved' : ''}`} aria-live="polite">
            <span className="ai-tag">{saved ? c.card.done : c.card.draft}</span>
            <h2 key={p.task}>{p.task || unset}</h2>
            <dl>
              <div><dt>{c.card.who}</dt><dd key={p.who}>{p.who ?? unset}</dd></div>
              <div><dt>{c.card.due}</dt><dd key={p.due}>{p.due ?? unset}</dd></div>
              <div><dt>{c.card.prio}</dt><dd>{p.high ? c.card.high : c.card.normal}</dd></div>
              <div><dt>{c.card.col}</dt><dd>{c.card.colName}</dd></div>
            </dl>
            {missing ? (
              <p className="ai-missing">{missing}</p>
            ) : saved ? (
              <button type="button" className="bd-btn is-small is-glass" onClick={() => setSaved(false)}>{c.card.again}</button>
            ) : (
              <button type="button" className="bd-btn is-small" onClick={() => setSaved(true)}><Check size={16} aria-hidden /> {c.card.ok}</button>
            )}
          </div>
        </div>
      </section>

      <section className="ai-vs ai-in" aria-labelledby="ph-form-h">
        <h2 id="ph-form-h">{c.form.h}</h2>
        <div className="ai-vs-grid">
          <div className="ai-vs-a">
            <h3>{c.form.left}</h3>
            <ul>{c.form.fields.map((f, i) => <li key={f} style={{ ['--i' as string]: i }}>{f}</li>)}</ul>
          </div>
          <div className="ai-vs-b">
            <h3>{c.form.right}</h3>
            <p>{c.form.phrase}</p>
          </div>
        </div>
      </section>

      <section className="ai-dates ai-in" id="dates" aria-labelledby="ph-dates-h">
        <div className="ai-ex-head">
          <div>
            <h2 id="ph-dates-h">{c.dates.h}</h2>
            <p className="ai-minute-x">{c.dates.x}</p>
          </div>
          <SketchCalendar />
        </div>
        <div className="ai-dates-grid">
          <ul>
            {c.dates.rows.map(([phrase, code]) => (
              <li key={phrase}><span>{phrase}</span><b>{formatDate(c, code)}</b></li>
            ))}
          </ul>
          <MonthMarks codes={c.dates.rows.map(r => r[1])} />
        </div>
      </section>

      <section className="ai-trust ai-in" aria-labelledby="ph-more-h">
        <h2 id="ph-more-h">{c.more.h}</h2>
        <ul className="is-two">{c.more.items.map(([t, x], i) => {
          const Pic = MORE_PICS[i];
          return <li key={t} className="glass"><Pic /><h3>{t}</h3><p>{x}</p></li>;
        })}</ul>
      </section>

      <section className="ai-boardsec ai-in" id="board" aria-labelledby="ph-board-h">
        <h2 id="ph-board-h">{c.board.h}</h2>
        <p className="ai-minute-x">{c.board.x}</p>
        <BoardViews c={c} />
      </section>

      <section className="ai-end is-center ai-in">
        <h2>{c.end}</h2>
        <div className="ai-actions"><Cta slug={SLUG} place="final" label={c.cta} lang={lang} /></div>
      </section>
    </div>
  );
};

const title = (l: Lang) => PHRASE[l].title;
const cta = (l: Lang) => PHRASE[l].cta;
const links = (l: Lang): [string, string][] => [['#try', PHRASE[l].nav[0]], ['#dates', PHRASE[l].nav[1]], ['#board', PHRASE[l].nav[2]]];

export default function PhraseLanding() {
  return <AiShell slug={SLUG} title={title} cta={cta} links={links}>{l => <Page lang={l} />}</AiShell>;
}

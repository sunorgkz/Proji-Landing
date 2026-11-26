import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../analytics';
import type { Lang } from '../board/copy';
import { AiShell, Cta } from '../ai/Shell';
import { LeadForm } from '../kit/Kit';
import { MONEY, NAME } from '../tariffs/TariffsLanding';
import { QUESTIONS, featuresFor, planFor, segmentFor, summaryFor, type Answers, type Feature, type PlanId } from './questions';
import '../kit/kit.css';
import './match.css';

/**
 * /match — онбординг-квиз: 7 вопросов для квалификации клиента; по ходу показывает, какие функции Proji закрывают ответы,
 * в конце — подходящий тариф, регистрация и заявка. Ответы уходят нам только вместе с заявкой; в аналитику — шаги и тариф.
 * Вариант B теста home_cta на главной ведёт сюда. Пока только на русском: для kk, en и ar — русский текст с пометкой.
 */

const SLUG = 'match';
const ONLY_RU: Record<Lang, string> = {
  ru: '',
  kk: 'Беттің қазақ тіліндегі нұсқасы дайындалуда.',
  en: 'The English version of this page is being prepared.',
  ar: 'النسخة العربية من هذه الصفحة قيد الإعداد.',
};

const price = (id: PlanId): string => {
  if (id === 'free') return `${MONEY.kzt.free}, без срока`;
  if (id === 'enterprise') return `от ${MONEY.kzt.ent} в месяц`;
  return `${MONEY.kzt.m[['start', 'business', 'company'].indexOf(id)]} в месяц`;
};

const Needs: React.FC<{ items: Feature[] }> = ({ items }) => (
  <ul className="mq-needs">
    {items.map(f => <li key={f.t}><b>{f.t}</b><span>{f.x}</span></li>)}
  </ul>
);

const Quiz: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Answers>({});
  const from = new URLSearchParams(window.location.search).get('from') ?? 'direct';
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];
  const picked = (q && ans[q.id]) || [];
  const features = featuresFor(ans);

  const go = (next: number, a: Answers) => {
    setStep(next);
    if (next <= step) return;
    if (step === 0) trackEvent('quiz_start', { landing: SLUG, from });
    trackEvent('quiz_step', { landing: SLUG, step: next, from });
    if (next === QUESTIONS.length) trackEvent('quiz_done', { landing: SLUG, plan: planFor(a), segment: segmentFor(a), from });
  };

  const choose = (id: string) => {
    const has = picked.includes(id);
    /* «Пока ни с чем» снимает остальные отметки и наоборот */
    const list = !q.multi ? [id] : has ? picked.filter(x => x !== id) : id === 'none' ? [id] : [...picked.filter(x => x !== 'none'), id];
    const next = { ...ans, [q.id]: list };
    setAns(next);
    if (!q.multi) go(step + 1, next);
  };

  if (done) {
    const plan = planFor(ans);
    return (
      <div className="kt-box mq-result" aria-live="polite">
        <p className="mq-count">Вам подойдёт тариф</p>
        <h2>«{NAME[plan]}» <small>{price(plan)}</small></h2>
        {features.length > 0 && (
          <>
            <h3>Что Proji возьмёт на себя</h3>
            <Needs items={features} />
          </>
        )}
        <div className="ai-actions">
          <Cta slug={SLUG} place="result" label="Начать бесплатно" lang={lang} variant={from} />
          <a className="bd-btn is-glass" href="/tariffs">Сравнить тарифы</a>
        </div>
        <p className="mq-note">Если оставите контакт, вместе с ним мы получим ваши ответы из этого квиза.</p>
        <LeadForm slug={SLUG} lang="ru" detail={`квиз: ${summaryFor(ans)} | тариф «${NAME[plan]}», сегмент ${segmentFor(ans)}, пришёл: ${from}`} />
        <button type="button" className="mq-back" onClick={() => setStep(0)}><ArrowLeft size={16} aria-hidden /> Пройти заново</button>
      </div>
    );
  }

  return (
    <div className="mq-grid">
      <div className="kt-box">
        <p className="mq-count">Вопрос {step + 1} из {QUESTIONS.length}</p>
        <div className="kt-meter mq-meter" aria-hidden><i style={{ width: `${Math.max(6, (step / QUESTIONS.length) * 100)}%` }} /></div>
        <fieldset key={q.id}>
          <legend>{q.q}</legend>
          {q.hint && <p className="mq-note">{q.hint}</p>}
          <div className="mq-options">
            {q.options.map(x => (
              <button key={x.id} type="button" aria-pressed={picked.includes(x.id)} onClick={() => choose(x.id)}>
                {x.label}
                {/* на телефоне боковая панель уходит ниже вариантов, поэтому функцию называем прямо под ответом */}
                {x.feature && picked.includes(x.id) && <small>Proji: {x.feature.t}</small>}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mq-nav">
          {step > 0 && <button type="button" className="mq-back" onClick={() => setStep(step - 1)}><ArrowLeft size={16} aria-hidden /> Назад</button>}
          {(q.multi || picked.length > 0) && (
            <button type="button" className="bd-btn is-small" disabled={!picked.length} onClick={() => go(step + 1, ans)}>Дальше <ArrowRight size={16} aria-hidden /></button>
          )}
        </div>
      </div>
      <aside className="kt-box mq-side" aria-live="polite">
        <h2>Что Proji возьмёт на себя</h2>
        {features.length ? <Needs items={features} /> : <p className="mq-note">Отмечайте, что мешает, — здесь появятся функции под ваши ответы.</p>}
      </aside>
    </div>
  );
};

const Page: React.FC<{ lang: Lang }> = ({ lang }) => (
  <>
    {ONLY_RU[lang] && <p className="kt-ex sn-note" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>{ONLY_RU[lang]}</p>}
    <section className="mq" lang="ru" dir="ltr" aria-labelledby="mq-h">
      <h1 id="mq-h">Подберём <span className="bd-grad">Proji под вас</span></h1>
      <p className="ai-lead">Семь вопросов, около минуты. По ходу увидите, что Proji возьмёт на себя, а в конце — подходящий тариф.</p>
      <Quiz lang={lang} />
    </section>
  </>
);

const title = () => 'Proji — подбор тарифа за минуту';
/* описание в виде поля объекта: так vite.config.ts берёт его в meta статичной страницы */
const META = { desc: 'Семь вопросов о вашей команде: узнайте, какие функции Proji вам нужны и какой тариф подойдёт.' };
const desc = () => META.desc;
const cta = () => 'Начать бесплатно';
const links = (): [string, string][] => [];

export default function MatchLanding() {
  /* переход с главной не сбрасывает прокрутку: квиз открываем с начала */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AiShell slug={SLUG} title={title} desc={desc} cta={cta} links={links}>
      {l => <div className="ai-col is-wide"><Page lang={l} /></div>}
    </AiShell>
  );
}

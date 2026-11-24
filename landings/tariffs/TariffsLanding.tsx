import React, { useState } from 'react';
import { trackEvent } from '../../analytics';
import type { Lang } from '../board/copy';
import { AiShell, REGISTER_URL } from '../ai/Shell';
import { SketchPaid } from '../ai/Sketches';
import { Faq, LeadForm, Sec } from '../kit/Kit';
import '../manager/manager.css';
import '../kit/kit.css';
import './tariffs.css';

/**
 * /tariffs — тарифы Proji. Цены, лимиты и пояснения взяты со страницы тарифов самого сервиса (proji.org/tariffs),
 * своих цифр здесь нет. Названия тарифов — в NAME ниже: их можно менять в одном месте.
 * Кнопки: «Начать» ведёт на регистрацию, платные тарифы — на страницу тарифов сервиса (после входа там выбор и оплата),
 * Enterprise — на форму заявки внизу страницы.
 * Пока только на русском: для kk, en и ar показываем русский текст с пометкой.
 */

const ONLY_RU: Record<Lang, string> = {
  ru: '',
  kk: 'Беттің қазақ тіліндегі нұсқасы дайындалуда.',
  en: 'The English version of this page is being prepared.',
  ar: 'النسخة العربية من هذه الصفحة قيد الإعداد.',
};

/**
 * Покупка: страница оплаты самого сервиса, как после кнопки на proji.org/tariffs. Тариф и срок передаём в адресе;
 * если человек не вошёл, сервис сначала предложит войти и потом вернёт его на оплату.
 * Идентификаторы тарифов — как в сервисе (не менять при переименовании): basic — Старт, pro — Стандарт, enterprise — Премиум.
 */
const PAY_URL = 'https://proji.org/payment';
const API_PLAN: Partial<Record<PlanId, string>> = { start: 'basic', business: 'pro', company: 'enterprise' };

const NAME = { free: 'Бесплатный', start: 'Старт', business: 'Стандарт', company: 'Премиум', enterprise: 'Enterprise' };
type PlanId = keyof typeof NAME;
const IDS: PlanId[] = ['free', 'start', 'business', 'company', 'enterprise'];
const REC: PlanId = 'business';

const nb = (s: string) => s.replace(/ /g, ' ');
const MONEY = {
  kzt: { free: '0 ₸', m: ['9 900 ₸', '49 900 ₸', '99 900 ₸'], y: ['99 000 ₸', '499 000 ₸', '999 000 ₸'], save: ['19 800 ₸', '99 800 ₸', '199 800 ₸'], ent: '200 000 ₸', ai: '9 900 ₸' },
  usd: { free: '$0', m: ['$24', '$119', '$239'], y: ['$240', '$1 190', '$2 390'], save: ['$48', '$238', '$478'], ent: '$479', ai: '$24' },
};

const DESC: Record<PlanId, string> = {
  free: 'Познакомиться с Proji небольшой командой',
  start: 'Для небольшой команды и первых клиентов',
  business: 'Растущая компания, AI-агенты и API',
  company: 'Коллектив от 100 человек, персональный менеджер',
  enterprise: 'Лимиты и функции под задачи крупного бизнеса',
};
const CTA: Record<PlanId, string> = { free: 'Начать', start: 'Выбрать', business: 'Попробовать 14 дней', company: 'Подключить', enterprise: 'Связаться' };
/* кнопка покупки скрыта, пока не проверено, что на боевом сервисе тариф «Старт» списывает свою цену: чтобы вернуть, оставьте список пустым */
const HIDE_BUY: PlanId[] = ['start'];

const hrefFor = (id: PlanId, yearly: boolean): string => {
  if (id === 'free') return REGISTER_URL;
  if (id === 'enterprise') return '#enterprise';
  return `${PAY_URL}?plan=${API_PLAN[id]}&billing=${yearly ? 'yearly' : 'monthly'}`;
};

/* лимиты по тарифам: Бесплатный, Старт, Стандарт, Премиум; Enterprise — по договорённости */
const ROWS: [string, string, string, string, string, string][] = [
  ['Пользователи', 'сотрудники, подрядчики, клиенты', '5', '15', '70', '150'],
  ['Рабочие пространства', 'направления бизнеса: маркетинг, продажи, производство и другие', '3', '5', '15', '30'],
  ['Свои рабочие пространства', 'AI создаёт по описанию — например, «Логистика» или «Тендеры»', '—', '2', '5', '10'],
  ['Проекты', 'учёт клиентов, клиентский или внутренний проект — любой формат работы', '10', '20', '100', '200'],
  ['Карточки', 'задачи, лиды, заявки и другие записи', '1 000', '3 000', '15 000', '30 000'],
  ['Документы', 'регламенты, инструкции, договоры', '50', '200', '1 000', '2 000'],
  ['AI-модели', 'лёгкая отвечает быстро, тяжёлая — глубокий анализ и отчёты', 'лёгкая', 'средняя', '+ тяжёлая', '+ приоритетная очередь, свой ключ LLM'],
  ['AI-кредиты в месяц', 'AI-запросы: вопрос, сводка, разбор документа', '300', '3 000', '15 000', '30 000'],
  ['AI-агенты и сценарии', 'AI-сотрудники вроде маркетолога или контент-мейкера, доступны с тарифа «Стандарт»', '—', '—', '5', '10'],
  ['API и вебхуки', 'связь Proji с вашими программами и сайтом', '—', '—', '✓', '✓'],
  ['Личный AI', 'персональные сводки и ассистент для отдельных сотрудников', '—', 'по подписке', '3 места', '10 мест'],
  ['Поддержка', 'помощь по работе с Proji', 'база знаний', 'чат', 'ответ в приоритете', 'персональный менеджер'],
];
const BY_AGREEMENT = 'по договорённости';

const PERSONAL: [string, string][] = [
  ['Персональная сводка дня', 'Каждое утро: ваши задачи, сроки, что изменилось за вчера и что требует внимания'],
  ['Недельный отчёт', 'Итоги по вашим проектам и клиентам за неделю — готово для руководителя'],
  ['Личный ассистент', 'Отвечает с учётом вашей роли и данных: «что по клиенту Х?», «подготовь план на завтра»'],
  ['Сигналы о рисках', 'Напоминает о горящих сроках, забытых лидах и задачах без движения'],
  ['+300 AI-запросов', 'Личный запас сверх общего баланса организации'],
];

const FAQ = [
  { q: 'Что такое карточка', a: 'Любая единица работы в Proji: задача, лид, заявка клиента, договорённость из переписки, заметка по проекту. Все виды входят в один общий лимит.' },
  { q: 'Кто входит в пользователей', a: 'Все, кого вы подключили: сотрудники, подрядчики, клиенты. Права назначаете сами. С полным доступом человек создаёт проекты и документы, с базовым — видит то, куда приглашён, и выполняет свои задачи. Личный AI — отдельная подписка поверх любого уровня.' },
  { q: 'Как считаются AI-запросы', a: 'Короткий вопрос или разбор сообщения списывает 1 кредит. Анализ документов, отчёт или работа агента — несколько, в зависимости от объёма. Баланс общий на организацию, остаток переходит на следующий месяц, пополнить можно на любом платном тарифе.' },
  { q: 'Интеграции', a: 'Доступны начиная с тарифа «Старт». Стоимость подключения 1С, CRM, мессенджеров и других систем зависит от объёма работ и рассчитывается под вашу компанию.' },
];

const Toggle: React.FC<{ label: string; value: number; options: string[]; onChoose: (i: number) => void }> = ({ label, value, options, onChoose }) => (
  <div className="ai-theme" role="group" aria-label={label}>
    {options.map((o, i) => (
      <button key={o} type="button" aria-pressed={value === i} onClick={() => onChoose(i)}>{o}</button>
    ))}
  </div>
);

const Page: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [yearly, setYearly] = useState(false);
  const [usd, setUsd] = useState(false);
  const m = usd ? MONEY.usd : MONEY.kzt;
  const per = yearly ? '/ год' : '/ мес';
  const paid = (i: number) => nb(yearly ? m.y[i] : m.m[i]);

  const price = (id: PlanId): { main: string; per?: string; sub: string } => {
    if (id === 'free') return { main: nb(m.free), sub: 'без срока' };
    if (id === 'enterprise') return { main: `от ${nb(m.ent)}`, sub: yearly ? 'в месяц, годовой договор' : 'в месяц' };
    const i = IDS.indexOf(id) - 1;
    return { main: paid(i), per, sub: yearly ? `выгода ${nb(m.save[i])}` : '' };
  };

  const click = (id: PlanId) => trackEvent('tariff_cta', { landing: 'tariffs', plan: id, billing: yearly ? 'yearly' : 'monthly', currency: usd ? 'usd' : 'kzt' });
  const Act: React.FC<{ id: PlanId }> = ({ id }) => HIDE_BUY.includes(id) ? null : (
    <a className={`bd-btn${id === REC ? '' : ' is-glass'}`} href={hrefFor(id, yearly)} data-cta-dest={hrefFor(id, yearly)} onClick={() => click(id)}>{CTA[id]}</a>
  );

  return (
    <>
      {ONLY_RU[lang] && <p className="kt-ex sn-note" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>{ONLY_RU[lang]}</p>}
      <div lang="ru" dir="ltr">
        <section className="ai-hero is-split tf-hero" aria-labelledby="tf-h">
          <div className="ai-aurora" aria-hidden />
          <div>
            <h1 id="tf-h">Тарифы <span className="bd-grad">Proji</span></h1>
            <p className="ai-lead">Один тариф на всю команду. Личный AI — тем, кому он нужен. Две недели тарифа «Стандарт» — в подарок.</p>
            <div className="tf-toggles">
              <Toggle label="Оплата" value={yearly ? 1 : 0} options={['Помесячно', 'За год — 2 месяца в подарок']} onChoose={i => setYearly(i === 1)} />
              <Toggle label="Валюта" value={usd ? 1 : 0} options={['₸ KZT', '$ USD']} onChoose={i => setUsd(i === 1)} />
            </div>
            {usd && <p className="tf-note">Оплата принимается в тенге. В долларах цены показаны для сравнения.</p>}
          </div>
          <figure className="mg-card"><SketchPaid /></figure>
        </section>

        <section className="kt-sec ai-in" aria-label="Тарифы">
          <ul className="tf-cards">
            {IDS.map(id => {
              const p = price(id);
              return (
                <li key={id} className={`tf-card glass${id === REC ? ' is-rec' : ''}`}>
                  <h3>{NAME[id]}</h3>
                  <p>{DESC[id]}</p>
                  <div className="tf-price">{p.main}{p.per && <small> {p.per}</small>}</div>
                  <div className="tf-save">{p.sub}</div>
                  <Act id={id} />
                </li>
              );
            })}
          </ul>
        </section>

        {/* без .ai-in: на телефоне таблица стоит в одну колонку и выше экрана в 8 раз, блок с порогом 15% никогда бы не показался */}
        <section className="kt-sec" id="compare" aria-labelledby="compare-h">
          <h2 id="compare-h">Сравнение тарифов</h2>
          <div className="bd-table-wrap glass">
            <table className="bd-table tf-table">
              <caption className="bd-sr">Сравнение тарифов Proji</caption>
              <thead>
                <tr>
                  <th scope="col">Тариф</th>
                  {IDS.map(id => <th scope="col" key={id} className={id === REC ? 'is-rec' : ''}>{NAME[id]}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Цена</th>
                  {IDS.map(id => {
                    const p = price(id);
                    return <td key={id} className={id === REC ? 'is-rec' : ''} data-plan={NAME[id]}>{p.main}{p.per ? ` ${p.per}` : ` ${p.sub}`}</td>;
                  })}
                </tr>
                {ROWS.map(([label, hint, ...vals]) => (
                  <tr key={label}>
                    <th scope="row">{label}<small className="tf-hint">{hint}</small></th>
                    {[...vals, BY_AGREEMENT].map((v, i) => <td key={i} className={IDS[i] === REC ? 'is-rec' : ''} data-plan={NAME[IDS[i]]}>{v}</td>)}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Интеграции<small className="tf-hint">1С, CRM, мессенджеры и другие</small></th>
                  {['—', 'подключаются и оплачиваются отдельно', 'подключаются и оплачиваются отдельно', 'подключаются и оплачиваются отдельно', BY_AGREEMENT].map((v, i) => (
                    <td key={i} className={IDS[i] === REC ? 'is-rec' : ''} data-plan={NAME[IDS[i]]}>{v}</td>
                  ))}
                </tr>
                <tr className="bd-table-act">
                  <th scope="row" />
                  {IDS.map(id => <td key={id} className={id === REC ? 'is-rec' : ''} data-plan={NAME[id]}><Act id={id} /></td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Sec id="personal" h="Личный AI" lead="Подписка на человека. Кто работает только с задачами и документами, пользуется Proji в рамках тарифа организации без доплат. Руководителю, менеджеру проекта или продажнику, которому нужны персональные AI-возможности, подключаете Личный AI — оплата за каждого такого сотрудника.">
          <p className="tf-ai-price"><b>{nb(m.ai)}</b> за человека в месяц. На «Стандарте» 3 места уже включены, на «Премиуме» — 10.</p>
          <ul className="tf-ai">
            {PERSONAL.map(([t, x]) => <li key={t}><h3>{t}</h3><p>{x}</p></li>)}
          </ul>
        </Sec>

        <Sec id="faq" h="Частые вопросы">
          <Faq items={FAQ} />
        </Sec>

        <Sec id="enterprise" h="Enterprise" lead="Лимиты, функции, размещение на вашем сервере и цена — под задачи компании. Для НКО и образовательных организаций — особые условия.">
          <LeadForm slug="tariffs" lang="ru" detail="Enterprise" />
        </Sec>
      </div>
    </>
  );
};

const title = () => 'Тарифы Proji — цены и сравнение';
/* описание в виде поля объекта: так vite.config.ts берёт его в meta статичной страницы */
const META = { desc: 'Тарифы Proji: бесплатный, Старт, Стандарт, Премиум и Enterprise. Цены в тенге и долларах, сравнение лимитов, Личный AI.' };
const desc = () => META.desc;
const cta = () => 'Начать бесплатно';
const links = (): [string, string][] => [
  ['#compare', 'Сравнение'],
  ['#personal', 'Личный AI'],
  ['#faq', 'Вопросы'],
  ['#enterprise', 'Enterprise'],
];
const ld = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export default function TariffsLanding() {
  return (
    <AiShell slug="tariffs" title={title} desc={desc} cta={cta} links={links} ld={ld}>
      {l => <div className="ai-col is-wide"><Page lang={l} /></div>}
    </AiShell>
  );
}

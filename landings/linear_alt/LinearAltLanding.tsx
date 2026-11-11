import React, { useEffect, useLayoutEffect } from 'react';
import { ArrowRight, Check, TriangleAlert, MessageCircle, Bot } from 'lucide-react';
import { trackEvent } from '../../analytics';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import europeanBank from '../../assets/european_bank.png';
import freedomBroker from '../../assets/Freedom_broker.png';
import kzTemir from '../../assets/KZ_temir.png';
import googleDev from '../../assets/Google_dev.png';
import easyLogo from '../../assets/Easy.png';
import './linear-alt.css';

/**
 * Альтернативная главная Proji по дизайн-системе Mercury из VoltAgent/awesome-design-md:
 * ночной холст, фото на всю ширину, один индиговый акцент, лёгкие веса шрифта.
 * Текст — концепция №1 «Координация всей компании» + общие блоки из документа «Лендинг Proji: 10 концепций».
 * Фото — Unsplash через picsum.photos (лицензия Unsplash), авторы указаны в подвале.
 */

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300..600&display=swap';
const START_URL = 'https://proji.kz';
const AUDIT_URL = `https://wa.me/77766006636?text=${encodeURIComponent('Здравствуйте! Хочу бесплатный AI-аудит компании.')}`;
const photo = (id: number, w: number, h: number) => `https://picsum.photos/id/${id}/${w}/${h}`;

const PHOTOS = [
  { id: 868, by: 'Jeffrey Swanson' },
  { id: 378, by: 'Charles Forerunner' },
  { id: 192, by: 'Adam Przewoski' },
  { id: 692, by: 'Nicolai Berntsen' },
];

const LOGOS = [
  { name: 'EBRD', src: europeanBank },
  { name: 'Freedom Broker', src: freedomBroker },
  { name: 'Казахстан Темир Жолы', src: kzTemir },
  { name: 'Google Developer Groups', src: googleDev },
  { name: 'EASY', src: easyLogo },
];

const STEPS = [
  { n: '01', title: 'Подключите чаты и встречи', text: 'Рабочие чаты WhatsApp и Telegram, онлайн-созвоны и встречи вживую.' },
  { n: '02', title: 'Proji собирает работу сам', text: 'Из переписки и встреч появляются задачи, проекты и документы.' },
  { n: '03', title: 'Каждый получает своё', text: 'Руководитель — сводки и сигналы, команда — задачи, AI-агенты — свою часть работы.' },
];

const INSIDE = [
  ['Проекты и задачи', 'Канбан, карточки, документы и переписка по каждому проекту.'],
  ['Пространства по направлениям', 'Продажи, операции, команда, маркетинг и свои.'],
  ['Автосбор задач', 'Из WhatsApp, Telegram и встреч — без ручного ввода.'],
  ['Записи и протоколы встреч', 'Решения, ответственные и сроки сразу после встречи.'],
  ['Сводки и сигналы риска', 'Для руководителя и для каждого сотрудника.'],
  ['AI-агенты', 'Исполнители задач наравне с сотрудниками.'],
  ['AI-помощник', 'Отвечает по данным вашей компании.'],
  ['Подрядчики и клиенты', 'В системе, с доступом только к своему.'],
  ['Интеграции с CRM и 1С', 'Подключаются отдельно.'],
];

const SAFETY = [
  'Каждый видит только свои направления и проекты.',
  'AI-агент действует в рамках прав пользователя.',
  'Рискованные действия — только с подтверждением.',
  'Каждое действие людей и агентов — в журнале.',
];

const CASES = [
  { name: 'Федерация клубов ЮНЕСКО', text: 'Координация клубов, автоматические отчёты и пресс-релизы.', main: true },
  { name: 'Технопарк Нархоз', text: 'Координация работы стартапов.' },
  { name: 'Университет им. Жубанова', text: 'Допуск сотрудников к опасным работам.' },
  { name: 'Издательство «Дарын»', text: 'Координация рабочих процессов.' },
];

const PLANS = [
  { name: 'Бесплатно', price: '0 ₸', note: 'До 5 пользователей.' },
  { name: 'Команда', price: 'от 9 900 ₸', note: 'В месяц. Оплата за месяц или за год.' },
  { name: 'С AI-агентами', price: 'от 49 900 ₸', note: 'AI-агенты и сценарии.', featured: true },
  { name: 'Enterprise', price: 'По договорённости', note: 'Для крупных компаний.' },
];

const OBJECTIONS = [
  { q: '«Команда не будет пользоваться новой системой»', a: 'И не нужно: сотрудники продолжают писать в WhatsApp и Telegram, а Proji собирает из этого задачи.' },
  { q: '«У нас уже есть CRM»', a: 'Proji работает рядом и берёт на себя координацию исполнения. Интеграции с CRM и 1С подключаются отдельно.' },
  { q: '«AI наделает ошибок»', a: 'Спорные задачи помечаются «проверить», рискованные действия выполняются только с подтверждением, всё записано в журнал.' },
  { q: '«А наши данные?»', a: 'Каждый видит только своё: доступ разграничен по направлениям и проектам, а каждое действие людей и агентов записано в журнал.' },
];

const audit = (place: string) => {
  trackEvent('cta_ai_audit', { landing: 'alt', place });
  window.open(AUDIT_URL, '_blank', 'noopener');
};

const trial = (place: string) => {
  trackEvent('cta_trial', { landing: 'alt', place });
  window.location.href = START_URL;
};

const Ctas: React.FC<{ place: string }> = ({ place }) => (
  <div className="mx-ctas">
    <button type="button" className="mx-btn mx-btn-1" onClick={() => audit(place)} data-cta-dest="https://wa.me/77766006636">
      Получить бесплатный AI-аудит <ArrowRight size={16} aria-hidden />
    </button>
    <button type="button" className="mx-btn mx-btn-glass" onClick={() => trial(place)} data-cta-dest={START_URL}>
      Попробовать 14 дней бесплатно
    </button>
  </div>
);

const Tag = () => <span className="mx-tag">ИЛЛЮСТРАЦИЯ · примерные данные</span>;

export default function LinearAltLanding() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.title = 'Proji — руководитель видит всё, команда знает, что делать';
    document.documentElement.dataset.landing = 'alt';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useEffect(() => {
    const id = 'alt-landing-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="mx-root">
      <header className="mx-nav">
        <a href="#top" className="mx-brand">Proji</a>
        <nav className="mx-links" aria-label="Разделы">
          <a href="#how">Как работает</a>
          <a href="#inside">Что внутри</a>
          <a href="#pricing">Тарифы</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <button type="button" className="mx-btn mx-btn-1 mx-btn-sm" onClick={() => audit('nav')}>AI-аудит бесплатно</button>
      </header>

      <main id="top">
        {/* Первый экран */}
        <section className="mx-hero">
          <img className="mx-hero-img" src={photo(868, 2000, 1300)} alt="" aria-hidden />
          <div className="mx-hero-in">
            <p className="mx-eyebrow">Для собственников и руководителей</p>
            <h1>Руководитель видит всё. Команда знает, что делать.</h1>
            <p className="mx-lead">
              Proji координирует людей, процессы и AI-агентов. Сам. Задачи появляются из рабочих чатов и встреч,
              статусы собираются по ходу работы, а риски видны до того, как сорван срок.
            </p>
            <Ctas place="hero" />
          </div>

          <figure className="mx-panel mx-hero-panel" aria-label="Иллюстрация: утренняя сводка руководителя в Proji">
            <div className="mx-panel-bar"><span>Сводка руководителя · вторник</span><Tag /></div>
            <div className="mx-panel-grid">
              <div className="mx-kpi"><b>128</b><span>задач в работе</span></div>
              <div className="mx-kpi"><b>34</b><span>собрано из чатов за неделю</span></div>
              <div className="mx-kpi is-warn"><b>2</b><span>проекта под риском</span></div>
            </div>
            <ul className="mx-rows">
              <li><span>Продажи · Тендер на поставку</span><span className="mx-st is-ok">По плану</span></li>
              <li><span>Операции · Запуск филиала</span><span className="mx-st is-warn">Риск срыва срока</span></li>
              <li><span>Маркетинг · Весенняя кампания</span><span className="mx-st is-ok">По плану</span></li>
            </ul>
          </figure>
        </section>

        <section className="mx-logos" aria-label="Нам доверяют">
          <p className="mx-eyebrow">Нам доверяют</p>
          <ul>{LOGOS.map(l => <li key={l.name}><img src={l.src} alt={l.name} loading="lazy" /></li>)}</ul>
        </section>

        {/* Четыре блока концепции */}
        <section className="mx-wrap mx-split">
          <div className="mx-split-text">
            <p className="mx-eyebrow">Одна картина</p>
            <h2>Вся компания на одном экране</h2>
            <p>Направления, проекты и задачи — от общей картины до одной карточки. Больше не нужно собирать статус по звонкам и чатам.</p>
          </div>
          <figure className="mx-photo">
            <img src={photo(378, 1200, 800)} alt="Люди у панорамных окон над городом" loading="lazy" />
          </figure>
        </section>

        <section className="mx-wrap mx-split is-flip">
          <div className="mx-split-text">
            <p className="mx-eyebrow">Без ручного ввода</p>
            <h2>Задачи появляются из переписки</h2>
            <p>Proji собирает их из WhatsApp, Telegram и встреч: находит поручение, исполнителя и срок и кладёт в нужный проект.</p>
          </div>
          <figure className="mx-panel" aria-label="Иллюстрация: сообщение из чата превращается в задачу">
            <div className="mx-panel-bar"><span><MessageCircle size={14} aria-hidden /> WhatsApp · Отдел продаж</span><Tag /></div>
            <div className="mx-chat">
              <p className="mx-bubble"><b>Айгерим:</b> Ержан, подготовь КП для «Арман-Строй» до четверга</p>
              <p className="mx-bubble is-me"><b>Ержан:</b> Принял, сделаю</p>
            </div>
            <div className="mx-task">
              <span className="mx-task-title"><Check size={14} aria-hidden /> Подготовить КП для «Арман-Строй»</span>
              <span className="mx-task-meta">Ержан · до четверга · проект «Продажи»</span>
            </div>
          </figure>
        </section>

        <section className="mx-wrap mx-split">
          <div className="mx-split-text">
            <p className="mx-eyebrow">Раньше проблем</p>
            <h2>Сигналы до того, как сорван срок</h2>
            <p>Просрочки, перегруз и упущенные возможности — с подсказкой, что сделать.</p>
          </div>
          <figure className="mx-panel" aria-label="Иллюстрация: сигнал риска по проекту">
            <div className="mx-panel-bar"><span><TriangleAlert size={14} aria-hidden /> Сигнал · Запуск филиала</span><Tag /></div>
            <div className="mx-signal">
              <p className="mx-signal-title">Срок открытия под угрозой</p>
              <p>Согласование договора аренды ждёт 6 дней. Ответственный перегружен: 14 открытых задач.</p>
              <p className="mx-signal-next">Следующий шаг: передать согласование юристу и напомнить арендодателю.</p>
              <div className="mx-signal-act">
                <span className="mx-chip">Поручить сотруднику</span>
                <span className="mx-chip">Поручить AI-агенту</span>
              </div>
            </div>
          </figure>
        </section>

        <section className="mx-wrap mx-split is-flip">
          <div className="mx-split-text">
            <p className="mx-eyebrow">Одна команда</p>
            <h2>Люди и AI-агенты работают вместе</h2>
            <p>Задачу можно поручить сотруднику или агенту, и каждое действие видно.</p>
          </div>
          <figure className="mx-photo mx-photo-card">
            <img src={photo(192, 1200, 900)} alt="Люди за столами у больших светлых окон" loading="lazy" />
            <div className="mx-float" aria-label="Иллюстрация: карточка задачи с AI-агентом">
              <span className="mx-float-who"><Bot size={14} aria-hidden /> Агент «Протокол встречи»</span>
              <span>Протокол планёрки разослан участникам, 5 задач поставлено</span>
              <Tag />
            </div>
          </figure>
        </section>

        {/* Как это работает */}
        <section className="mx-wrap mx-sec" id="how">
          <p className="mx-eyebrow mx-center">Как это работает</p>
          <h2 className="mx-center">Три шага от хаоса к порядку</h2>
          <ol className="mx-steps">
            {STEPS.map(s => (
              <li key={s.n} className="mx-card">
                <span className="mx-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Светлая часть: что внутри, безопасность, кейсы, тарифы */}
        <div className="mx-light">
          <section className="mx-wrap mx-sec" id="inside">
            <p className="mx-eyebrow mx-center">Что внутри Proji</p>
            <h2 className="mx-center">Всё для управления исполнением</h2>
            <ul className="mx-inside">
              {INSIDE.map(([t, d]) => (
                <li key={t} className="mx-card"><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ul>
          </section>

          <section className="mx-wrap mx-sec mx-safety">
            <div>
              <p className="mx-eyebrow">Контроль и безопасность</p>
              <h2>Вы задаёте границы</h2>
            </div>
            <ul>
              {SAFETY.map(s => <li key={s}><Check size={16} aria-hidden /> {s}</li>)}
            </ul>
          </section>

          <section className="mx-wrap mx-sec">
            <p className="mx-eyebrow mx-center">Кейсы</p>
            <h2 className="mx-center">Где Proji уже работает</h2>
            <ul className="mx-cases">
              {CASES.map(c => (
                <li key={c.name} className={`mx-card${c.main ? ' is-main' : ''}`}><h3>{c.name}</h3><p>{c.text}</p></li>
              ))}
            </ul>
          </section>

          <section className="mx-wrap mx-sec" id="pricing">
            <p className="mx-eyebrow mx-center">Тарифы</p>
            <h2 className="mx-center">Начните бесплатно</h2>
            <p className="mx-sub mx-center">14 дней пробного периода на любом платном тарифе.</p>
            <ul className="mx-plans">
              {PLANS.map(p => (
                <li key={p.name} className={`mx-plan${p.featured ? ' is-featured' : ''}`}>
                  <span className="mx-plan-name">{p.name}</span>
                  <b>{p.price}</b>
                  <p>{p.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Возражения */}
        <section className="mx-wrap mx-sec mx-faq" id="faq">
          <p className="mx-eyebrow mx-center">Частые сомнения</p>
          <h2 className="mx-center">Что обычно спрашивают</h2>
          <div className="mx-faq-list">
            {OBJECTIONS.map(o => (
              <details key={o.q}><summary>{o.q}</summary><p>{o.a}</p></details>
            ))}
          </div>
        </section>

        {/* Оффер */}
        <section className="mx-offer">
          <img className="mx-offer-img" src={photo(692, 2000, 1000)} alt="" aria-hidden loading="lazy" />
          <div className="mx-offer-in">
            <p className="mx-eyebrow">Бесплатный AI-аудит</p>
            <h2>Покажем, где в вашей компании теряются задачи и время</h2>
            <p className="mx-lead">Разберём процессы и покажем, что возьмут на себя Proji и AI-агенты.</p>
            <Ctas place="final" />
          </div>
        </section>
      </main>

      <footer className="mx-foot">
        <div>
          <span className="mx-brand">Proji</span>
          <p>Sunnet BT, Актобе · +7 776 600 66 36 · sund.serik@gmail.com</p>
        </div>
        <p className="mx-credits">
          Фото: {PHOTOS.map((p, i) => (
            <React.Fragment key={p.id}>{i > 0 && ', '}{p.by}</React.Fragment>
          ))} / Unsplash
        </p>
      </footer>
    </div>
  );
}

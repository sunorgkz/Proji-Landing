import React from 'react';
import type { Lang } from '../board/copy';
import { AiShell } from '../ai/Shell';
import { SketchBars, SketchBolt, SketchFile, SketchPin, SketchStack, SketchTarget } from '../ai/Sketches';
import { SketchChat } from '../board/Sketches';
import { PicList, Sec } from '../kit/Kit';
import serikImage from '../../assets/serik.png';
import europeanBank from '../../assets/european_bank.png';
import freedomBroker from '../../assets/Freedom_broker.png';
import googleDev from '../../assets/Google_dev.png';
import '../manager/manager.css';
import '../kit/kit.css';
import './sunnet.css';

/**
 * /sunnet-business — страница о компании Sunnet Business Technologies.
 * Только проверяемые факты: открытые источники (раздел «О нас пишут», ссылки ниже) и тексты самой команды,
 * которые уже стоят на сайте (/sunnet, главная). ЕБРР, Freedom Broker и Tamos Education — со слов владельца,
 * в открытых источниках на 11.11.2026 не найдены: без цифр и подробностей.
 * Пока только на русском: для kk, en и ar показываем русский текст с пометкой.
 */

const ONLY_RU: Record<Lang, string> = {
  ru: '',
  kk: 'Беттің қазақ тіліндегі нұсқасы дайындалуда.',
  en: 'The English version of this page is being prepared.',
  ar: 'النسخة العربية من هذه الصفحة قيد الإعداد.',
};

const WORK: [string, string][] = [
  ['Proji — наш продукт', 'Платформа для задач, проектов, сотрудников и документов с ИИ-помощником Proji AI. Мы делали её как систему, в которой мечтали бы работать сами.'],
  ['Внедрение под ключ', 'Разворачиваем Proji в компании: от аудита процессов до работающей системы.'],
  ['Развитие бизнеса', 'Консультируем компании по развитию бизнеса и автоматизации процессов.'],
];

const COMMUNITY: [string, string][] = [
  ['Google Developer Group Aktobe', 'Серик Сундетов — организатор GDG Aktobe, сообщества разработчиков Актобе. Группа проводит DevFest: 21 декабря 2022 года в университете имени Жубанова и 26–27 сентября 2025 года, а 10 марта 2023 года — встречу Women Techmakers «DARE To BE».'],
  ['Aqtobe Hub', 'Серик — региональный менеджер Aqtobe Hub. Первый стартап-инкубатор хаба шёл три месяца: создано 13 стартапов, 5 из них начали продажи. Каждую неделю в хабе проходит тематический воркшоп.'],
  ['Фонд устойчивого развития «Sun»', 'Фонд под руководством Серика поддержал первый инкубатор Aqtobe Hub вместе с Западно-Казахстанским медицинским университетом имени Марата Оспанова.'],
  ['Университет имени Оспанова', 'С 2023 года университет сотрудничает с Сериком: стартап-школа стала частью студенческой жизни.'],
];

const TRUST = [
  { src: europeanBank, name: 'ЕБРР', text: 'Эксперты программы Европейского банка реконструкции и развития' },
  { src: freedomBroker, name: 'Freedom Broker', text: 'Образовательный проект для Freedom Broker' },
  { src: googleDev, name: 'Google Developer Groups', text: 'Ведём сообщество GDG Aktobe' },
  { src: '', name: 'Tamos Education', text: 'Образовательный проект для школы Tamos Education' },
];

const PRESS: { src: string; date: string; title: string; href: string }[] = [
  { src: 'OTYRAR', date: '21 августа 2026', title: 'Цифровые решения для Шымкента представили на Smart City Hackathon 2026 — о Proji и Серике Сундетове', href: 'https://otyrar.kz/2026/08/czifrovye-resheniya-dlya-shymkenta-predstavili-na-smart-city-hackathon-2026/' },
  { src: 'Bluescreen', date: '11 апреля 2025', title: 'В Aqtobe Hub завершилась первая акселерационная программа', href: 'https://bluescreen.kz/v-aqtobe-hub-zaviershilas-piervaia-aksielieratsionnaia-proghramma/' },
  { src: 'The Tech', date: '12 апреля 2025', title: 'Aqtobe Hub выпустил первую волну стартапов', href: 'https://the-tech.kz/aqtobe-hub-vypustil-pervuyu-volnu-startapov/' },
  { src: 'ЗКМУ имени Марата Оспанова', date: '', title: 'Startup School: сотрудничество с Сериком Сундетовым и Aqtobe Hub', href: 'https://ospanov.university/departs/nauka/start/start-ru.html' },
  { src: 'Google Developer Groups', date: '', title: 'GDG Aktobe: организаторы и события сообщества', href: 'https://gdg.community.dev/gdg-aktobe/' },
  { src: 'Google Developer Groups', date: '21 декабря 2022', title: 'DevFest Aktobe 2022', href: 'https://gdg.community.dev/events/details/google-gdg-aktobe-presents-devfest-aktobe-2022-1/' },
];

const Page: React.FC<{ lang: Lang }> = ({ lang }) => (
  <>
    {ONLY_RU[lang] && <p className="kt-ex sn-note" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>{ONLY_RU[lang]}</p>}
    <div lang="ru" dir="ltr">
      <section className="ai-hero sn-hero" aria-labelledby="sn-h">
        <div className="ai-aurora sn-aurora" aria-hidden />
        <p className="sn-kicker">Актобе · Казахстан</p>
        <h1 id="sn-h">Sunnet <span className="bd-grad">Business Technologies</span></h1>
        <p className="ai-lead">Команда из Актобе, которая больше 15 лет внедряет IT-решения в Казахстане, создала Proji и растит IT-сообщество региона.</p>
        <ul className="sn-stats">
          <li><b>15+</b><span>лет внедряем IT-решения</span></li>
          <li><b>300+</b><span>реализованных проектов</span></li>
          <li><b>13</b><span>стартапов в первом инкубаторе Aqtobe Hub</span></li>
        </ul>
        <div className="ai-actions">
          <a className="bd-btn" href="#contact">Связаться с нами</a>
          <a className="bd-btn is-glass" href="/">Что такое Proji</a>
        </div>
      </section>

      <Sec id="work" h="Что мы делаем">
        <PicList items={WORK} pics={[SketchBolt, SketchChat, SketchTarget]} />
      </Sec>

      <Sec id="trust" h="Нам доверяют" lead="Проекты и программы, в которых участвовала команда Sunnet.">
        <ul className="sn-trust">
          {TRUST.map(t => (
            <li key={t.name}>
              {t.src ? <img src={t.src} alt={t.name} loading="lazy" /> : <span className="sn-word">{t.name}</span>}
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </Sec>

      <Sec id="community" h="Социальные проекты" lead="Мы вкладываемся в людей: разработчиков, студентов и стартапы Актобе.">
        <PicList items={COMMUNITY} pics={[SketchStack, SketchBars, SketchPin, SketchFile]} />
      </Sec>

      <Sec id="hackathon" h="Proji на Smart City Hackathon 2026">
        <p className="sn-text">В августе 2026 года в Шымкенте Серик Сундетов представил Proji на Smart City Hackathon 2026. Система подключается к мессенджеру, сама распознаёт фото счётчиков и голосовые сообщения жильцов и собирает по каждому адресу единую базу обращений.</p>
      </Sec>

      <section className="kt-sec ai-in sn-founder" aria-labelledby="sn-founder-h">
        <img src={serikImage} alt="Серик Сундетов" loading="lazy" width={480} height={600} />
        <div>
          <h2 id="sn-founder-h">Серик Сундетов</h2>
          <p className="sn-role">CEO Sunnet Business Technologies и Proji</p>
          <blockquote>Мы делали Proji не как очередной инструмент, а как систему, в которой мечтали бы работать сами. Без хаоса, без бюрократии.</blockquote>
        </div>
      </section>

      <Sec id="press" h="О нас пишут">
        <ul className="sn-press">
          {PRESS.map(p => (
            <li key={p.href}>
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <span className="sn-src">{p.src}{p.date && ` · ${p.date}`}</span>
                <span className="sn-title">{p.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Sec>

      <section className="ai-end is-center ai-in" id="contact">
        <h2>Обсудим ваш проект</h2>
        <p className="ai-lead">Серик Сундетов, CEO Sunnet Business Technologies</p>
        <div className="ai-actions">
          <a className="bd-btn" href="mailto:serik@sunnet.kz">serik@sunnet.kz</a>
          <a className="bd-btn is-glass" href="tel:+77079635533">+7 707 963 55 33</a>
        </div>
      </section>
    </div>
  </>
);

const title = () => 'Sunnet Business Technologies — команда, которая создала Proji';
/* описание в виде поля объекта: так vite.config.ts берёт его в meta статичной страницы */
const META = { desc: 'Sunnet Business Technologies из Актобе: 15+ лет внедрения IT-решений, 300+ проектов, продукт Proji, сообщество GDG Aktobe и стартапы Aqtobe Hub.' };
const desc = () => META.desc;
/* кнопка в шапке ведёт на регистрацию в Proji */
const cta = () => 'Попробовать Proji';
const links = (): [string, string][] => [
  ['#work', 'Что делаем'],
  ['#community', 'Проекты'],
  ['#press', 'СМИ'],
];
const ld = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sunnet Business Technologies',
  email: 'serik@sunnet.kz',
  telephone: '+77079635533',
  address: { '@type': 'PostalAddress', addressLocality: 'Актобе', addressCountry: 'KZ' },
  founder: { '@type': 'Person', name: 'Серик Сундетов' },
  sameAs: PRESS.map(p => p.href),
});

export default function SunnetCompanyLanding() {
  return (
    <AiShell slug="sunnet-business" title={title} desc={desc} cta={cta} links={links} ld={ld}>
      {l => <div className="ai-col is-wide"><Page lang={l} /></div>}
    </AiShell>
  );
}

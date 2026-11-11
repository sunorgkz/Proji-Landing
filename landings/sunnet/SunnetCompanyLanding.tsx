import React from 'react';
import type { Lang } from '../board/copy';
import { AiShell } from '../ai/Shell';
import { SketchBolt, SketchStack, SketchTarget } from '../ai/Sketches';
import { SketchChat, SketchHero } from '../board/Sketches';
import { PicList, Sec } from '../kit/Kit';
import serikImage from '../../assets/serik.png';
import europeanBank from '../../assets/european_bank.png';
import freedomBroker from '../../assets/Freedom_broker.png';
import googleDev from '../../assets/Google_dev.png';
import tamosLogo from '../../assets/sunnet/tamos-logo-white.png';
import unescoLogo from '../../assets/sunnet/unesco-clubs-logo.png';
import aqtobeHubLogo from '../../assets/sunnet/aqtobe-hub-logo.png';
import pressOtyrar from '../../assets/sunnet/press-otyrar.jpg';
import pressBluescreen from '../../assets/sunnet/press-bluescreen.jpg';
import pressTheTech from '../../assets/sunnet/press-thetech.jpg';
import pressEbrdYouth from '../../assets/sunnet/press-ebrd-youth.jpg';
import pressInterview from '../../assets/sunnet/press-bluescreen-interview.jpg';
import '../manager/manager.css';
import '../kit/kit.css';
import './sunnet.css';

/**
 * /sunnet-business — страница о компании Sunnet Business Technologies.
 * Только проверяемые факты: открытые источники (раздел «О нас пишут», ссылки ниже) и тексты самой команды,
 * которые уже стоят на сайте (/sunnet, главная). ЕБРР — center-at.kz: Серик среди экспертов курса программы ЕБРР «Молодёжь в бизнесе».
 * Freedom Broker и Tamos Education — со слов владельца, в открытых источниках на 11.11.2026 не найдены: без цифр и подробностей.
 * DevFest Aktobe 2022 не упоминаем: владелец его не делал.
 * Логотипы: Tamos — с tamos-education.kz (перекрашен в белый), GDG — с gdg.community.dev, Aqtobe Hub — вырезан с официального баннера хаба
 * на astanahub.com, клубы ЮНЕСКО — с unescoclubs.kz, «Sun» — повторяет знак с sun.org.kz (шрифт Pacifico, жёлтый #ffc233).
 * Клуб ЮНЕСКО — со слов владельца, в открытых источниках связь не найдена: без подробностей.
 * Фото в «О нас пишут» — превью самих публикаций (og:image), у каждой карточки ссылка на источник.
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

/* логотип вместо рисунка: у GDG и Aqtobe Hub есть свои знаки */
const logo = (src: string, alt: string): React.FC => () => <img className="sn-logo" src={src} alt={alt} loading="lazy" />;

/* знак фонда «Sun»: жёлтое солнце и надпись Sun, как на sun.org.kz */
const SunLogo: React.FC = () => (
  <svg className="sn-logo sn-sun" viewBox="0 0 150 72" role="img" aria-label="Фонд «Sun»">
    <circle className="sn-sun-glow" cx="26" cy="36" r="25" />
    <circle cx="26" cy="36" r="14" fill="#ffc233" />
    <text x="58" y="50" fill="#ffc233">Sun</text>
  </svg>
);

const COMMUNITY: [string, string][] = [
  ['Google Developer Group', 'Серик Сундетов — организатор Google Developer Group Aktobe, сообщества разработчиков.'],
  ['Aqtobe Hub', 'Серик — региональный менеджер Aqtobe Hub. Первый стартап-инкубатор хаба шёл три месяца: создано 13 стартапов, 5 из них начали продажи. Каждую неделю в хабе проходит тематический воркшоп.'],
  ['Фонд устойчивого развития «Sun»', 'Фонд под руководством Серика поддержал первый инкубатор Aqtobe Hub вместе с медицинским университетом имени Марата Оспанова.'],
  ['Клуб ЮНЕСКО', 'Участвуем в работе клуба ЮНЕСКО.'],
];

const TRUST = [
  { src: europeanBank, name: 'ЕБРР', text: 'Эксперт программы ЕБРР «Молодёжь в бизнесе»', light: false },
  { src: freedomBroker, name: 'Freedom Broker', text: 'Образовательный проект для Freedom Broker', light: false },
  { src: googleDev, name: 'Google Developer Groups', text: 'Ведём сообщество GDG Aktobe', light: false },
  { src: tamosLogo, name: 'Tamos Education', text: 'Образовательный проект для школы Tamos Education', light: false },
];

const PRESS: { src: string; date: string; title: string; href: string; img: string }[] = [
  { src: 'Baq.kz', date: '28 марта 2026', title: 'Финал Digital Qazaqstan Battle: Proji — в числе финалистов национального стартап-батла', href: 'https://rus.baq.kz/final-digital-qazaqstan-battle-opredeleny-pobediteli-natsionalnogo-startap-batla-320020276/', img: '' },
  { src: 'OTYRAR', date: '21 августа 2026', title: 'Цифровые решения для Шымкента представили на Smart City Hackathon 2026 — о Proji и Серике Сундетове', href: 'https://otyrar.kz/2026/08/czifrovye-resheniya-dlya-shymkenta-predstavili-na-smart-city-hackathon-2026/', img: pressOtyrar },
  { src: 'The Tech', date: '12 апреля 2025', title: 'Aqtobe Hub выпустил первую волну стартапов', href: 'https://the-tech.kz/aqtobe-hub-vypustil-pervuyu-volnu-startapov/', img: pressTheTech },
  { src: 'Bluescreen', date: '11 апреля 2025', title: 'В Aqtobe Hub завершилась первая акселерационная программа', href: 'https://bluescreen.kz/v-aqtobe-hub-zaviershilas-piervaia-aksielieratsionnaia-proghramma/', img: pressBluescreen },
  { src: 'Center AT · ЕБРР и Arnur Credit', date: '', title: 'Курс программы ЕБРР «Молодёжь в бизнесе»: Серик Сундетов среди экспертов', href: 'https://center-at.kz/molodezh-v-biznese', img: pressEbrdYouth },
  { src: 'BlueScreen', date: '24 октября 2023', title: 'Стартап для экспертов: эксклюзивное интервью с Сериком Сундетовым об Experts platform', href: 'https://t.me/bluescreenkz/9807', img: pressInterview },
];

const Page: React.FC<{ lang: Lang }> = ({ lang }) => (
  <>
    {ONLY_RU[lang] && <p className="kt-ex sn-note" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>{ONLY_RU[lang]}</p>}
    <div lang="ru" dir="ltr">
      <section className="ai-hero is-split sn-hero" aria-labelledby="sn-h">
        <div className="ai-aurora sn-aurora" aria-hidden />
        <div>
          <h1 id="sn-h">Sunnet <span className="bd-grad">Business Technologies</span></h1>
          <p className="ai-lead">Команда, которая больше 15 лет внедряет IT-решения, создала Proji и растит IT-сообщество.</p>
          <div className="ai-actions">
            <a className="bd-btn" href="#contact">Связаться с нами</a>
            <a className="bd-btn is-glass" href="/">Что такое Proji</a>
          </div>
        </div>
        <figure className="mg-card sn-hero-pic"><SketchHero /></figure>
      </section>

      <Sec id="work" h="Что мы делаем">
        <PicList items={WORK} pics={[SketchBolt, SketchStack, SketchTarget]} />
      </Sec>

      <Sec id="trust" h="Нам доверяют" lead="Проекты и программы, в которых участвовала команда Sunnet.">
        <ul className="sn-trust">
          {TRUST.map(t => (
            <li key={t.name}>
              <img className={t.light ? 'is-light' : undefined} src={t.src} alt={t.name} loading="lazy" />
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </Sec>

      <Sec id="people" h="Мы вкладываемся в людей" lead="Разработчики, студенты и стартапы.">
        <PicList items={COMMUNITY} pics={[logo(googleDev, 'Google Developer Groups'), logo(aqtobeHubLogo, 'Aqtobe Hub'), SunLogo, logo(unescoLogo, 'Клубы ЮНЕСКО')]} />
      </Sec>

      <section className="kt-sec ai-in sn-split" aria-labelledby="sn-hack-h">
        <div>
          <h2 id="sn-hack-h">Proji на Smart City Hackathon 2026</h2>
          <p className="sn-text">В августе 2026 года Серик Сундетов представил Proji на Smart City Hackathon 2026. Система подключается к мессенджеру, сама распознаёт фото счётчиков и голосовые сообщения жильцов и собирает по каждому адресу единую базу обращений.</p>
        </div>
        <figure className="mg-card"><SketchChat /></figure>
      </section>

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
                {p.img ? <img src={p.img} alt="" loading="lazy" /> : <span className="sn-press-logo"><SketchTarget /></span>}
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
const META = { desc: 'Sunnet Business Technologies: больше 15 лет внедряем IT-решения, создали Proji, ведём Google Developer Group и помогаем стартапам Aqtobe Hub.' };
const desc = () => META.desc;
/* кнопка в шапке ведёт на регистрацию в Proji */
const cta = () => 'Попробовать Proji';
const links = (): [string, string][] => [
  ['#work', 'Что делаем'],
  ['#people', 'Люди'],
  ['#press', 'СМИ'],
];
const ld = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sunnet Business Technologies',
  email: 'serik@sunnet.kz',
  telephone: '+77079635533',
  founder: { '@type': 'Person', name: 'Серик Сундетов' },
  sameAs: [...PRESS.map(p => p.href), 'https://gdg.community.dev/gdg-aktobe/', 'https://ospanov.university/departs/nauka/start/start-ru.html'],
});

export default function SunnetCompanyLanding() {
  return (
    <AiShell slug="sunnet-business" title={title} desc={desc} cta={cta} links={links} ld={ld}>
      {l => <div className="ai-col is-wide"><Page lang={l} /></div>}
    </AiShell>
  );
}

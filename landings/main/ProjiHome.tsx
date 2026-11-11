import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Pause, Play, Quote } from 'lucide-react';
import { HeroPhone } from '../../components/HeroPhone';
import { catalogGroups, CORE_SLUGS } from '../catalog';
import { trackEvent } from '../../analytics';
import { submitDemoRequest } from '../../lib/submitDemoRequest';
import welcomeSerik from '../../assets/welcome-serik.m4a';
import serikImage from '../../assets/serik.png';
import europeanBank from '../../assets/european_bank.png';
import freedomBroker from '../../assets/Freedom_broker.png';
import kzTemir from '../../assets/KZ_temir.png';
import googleDev from '../../assets/Google_dev.png';
import easyLogo from '../../assets/Easy.png';
import { SketchChat, SketchDefs, SketchHero } from '../board/Sketches';
import { SketchBars, SketchBolt, SketchFile, SketchPaid, SketchPin, SketchStack, SketchTarget } from '../ai/Sketches';
import '../board/board.css';
/* движение рисунков ai/Sketches (молния, стрела, столбики) */
import '../ai/ai.css';
import './home.css';

/* рисованные иллюстрации бренда (BRANDBOOK.md, раздел 5): по одной мысли на блок */
const PRODUCT_PICS = [SketchBolt, SketchTarget, SketchStack, SketchFile, SketchPin];
/* по смыслу шага: сообщение пришло → ИИ оценил (столбики) → счёт оплачен; на странице рисунки не повторяются */
const FIELD_PICS = [SketchChat, SketchBars, SketchPaid];

/* ---------- reveal on scroll (hidden start state lives only in no-preference media) ---------- */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.ph-reveal'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/* ---------- hero: working task board ---------- */
type Status = 'queued' | 'running' | 'done';

const TASKS = [
  {
    id: 'comp',
    title: 'Анализ конкурентов',
    agent: 'Агент-аналитик',
    steps: ['Собираю сайты и цены конкурентов', 'Сравниваю тарифы и условия', 'Собираю отчёт'],
    result: 'Отчёт готов: 12 конкурентов, 3 слабых места в их предложении',
  },
  {
    id: 'lead',
    title: 'Квалификация лида',
    agent: 'Агент продаж',
    steps: ['Читаю заявку из WhatsApp', 'Сверяю клиента с базой CRM', 'Оцениваю потребность и бюджет'],
    result: 'Оценка 82 из 100. Клиент передан менеджеру',
  },
  {
    id: 'content',
    title: 'Генерация контента',
    agent: 'Агент-редактор',
    steps: ['Беру тему из плана', 'Пишу черновик поста', 'Подбираю три заголовка'],
    result: 'Черновик поста и три заголовка готовы',
  },
  {
    id: 'base',
    title: 'Обновление базы',
    agent: 'Агент данных',
    steps: ['Нахожу устаревшие карточки', 'Дополняю контакты из переписок', 'Сохраняю изменения'],
    result: 'Обновлено 214 карточек клиентов',
  },
] as const;

const STATUS_LABEL: Record<Status, string> = { queued: 'В очереди', running: 'Выполняется', done: 'Готово' };

const TaskBoard: React.FC = () => {
  const [status, setStatus] = useState<Record<string, Status>>({ comp: 'done', lead: 'queued', content: 'queued', base: 'queued' });
  const [step, setStep] = useState<Record<string, number>>({ comp: 3, lead: 0, content: 0, base: 0 });
  const [selected, setSelected] = useState<string>('lead');
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const run = (id: string) => {
    const task = TASKS.find(t => t.id === id);
    if (!task) return;
    setStatus(s => (s[id] === 'queued' ? { ...s, [id]: 'running' } : s));
    task.steps.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setStep(s => ({ ...s, [id]: i + 1 }));
        if (i === task.steps.length - 1) setStatus(s => ({ ...s, [id]: 'done' }));
      }, 900 * (i + 1));
      timers.current.push(t);
    });
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t = window.setTimeout(() => run('content'), 800);
    timers.current.push(t);
    return () => timers.current.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRun = (id: string) => {
    if (status[id] !== 'queued') return;
    trackEvent('hero_demo_task_run', { task: id });
    setSelected(id);
    run(id);
  };

  const doneCount = TASKS.filter(t => status[t.id] === 'done').length;
  const sel = TASKS.find(t => t.id === selected) ?? TASKS[0];

  return (
    <div className="ph-board" data-ui>
      <div className="ph-board-top">
        <span className="ph-board-name">Proji · Задачи</span>
        <span className="ph-board-meta">Решено: {doneCount} из {TASKS.length}</span>
      </div>
      <div className="ph-board-body">
        <ul className="ph-tasks" aria-label="Задачи агентов">
          {TASKS.map(t => {
            const st = status[t.id];
            return (
              <li key={t.id} className={`ph-task${selected === t.id ? ' is-selected' : ''}`}>
                <button type="button" className="ph-task-main" onClick={() => setSelected(t.id)} aria-pressed={selected === t.id}>
                  <span className="ph-task-title">{t.title}</span>
                  <span className="ph-task-agent">{t.agent}</span>
                </button>
                {st === 'queued' ? (
                  <button type="button" className="ph-run" onClick={() => onRun(t.id)}>
                    <Play size={14} aria-hidden /> Запустить
                  </button>
                ) : (
                  <span className={`ph-chip is-${st}`}>{STATUS_LABEL[st]}</span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="ph-log" aria-live="polite">
          <div className="ph-log-title">{sel.title}</div>
          <div className="ph-log-agent">{sel.agent}</div>
          {status[sel.id] === 'queued' ? (
            <p className="ph-log-empty">Агент ждёт запуска. Нажмите «Запустить» рядом с задачей.</p>
          ) : (
            <ol className="ph-steps">
              {sel.steps.map((s, i) => {
                const doneStep = step[sel.id] > i;
                const current = !doneStep && step[sel.id] === i;
                return (
                  <li key={s} className={doneStep ? 'is-done' : current ? 'is-current' : ''}>
                    <span className="ph-step-mark">{doneStep ? <Check size={14} aria-hidden /> : null}</span>
                    {s}
                  </li>
                );
              })}
            </ol>
          )}
          {status[sel.id] === 'done' && <p className="ph-log-result">{sel.result}</p>}
        </div>
      </div>
      <p className="ph-board-note">Демо на примерных данных</p>
    </div>
  );
};

/* ---------- hero audio greeting ---------- */
const Greeting: React.FC = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      trackEvent('audio_pause', { source: 'hero_greeting', currentTime: a.currentTime });
      return;
    }
    if (a.ended) a.currentTime = 0;
    setError(false);
    a.play().catch(err => {
      setError(true);
      setPlaying(false);
      trackEvent('audio_play_error', { source: 'hero_greeting', message: String(err) });
    });
  };

  return (
    <div className="ph-greet">
      <audio
        ref={ref}
        src={welcomeSerik}
        preload="metadata"
        onPlay={() => { setPlaying(true); trackEvent('audio_play', { source: 'hero_greeting' }); }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setError(true); setPlaying(false); }}
      />
      <button type="button" className="ph-greet-btn" onClick={toggle} aria-label={playing ? 'Пауза' : 'Послушать приветствие'}>
        {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
      </button>
      <span>{error ? 'Не удалось загрузить аудио' : 'Приветствие от Серика, основателя Proji'}</span>
    </div>
  );
};

/* ---------- content ---------- */
const COMPARE = [
  ['Цифровые сотрудники', 'Нанять человека, обучить, оплачивать больничные и отпуск', 'Агент работает 24/7 и выполняет работу целого отдела'],
  ['Автономные агенты', 'Ждут команды руководителя на каждый шаг', 'Сами решают по заданным правилам и доводят процесс до конца'],
  ['Управление задачами', 'Руководитель раскидывает подзадачи вручную, часть теряется', 'Проект сам делится на подзадачи между людьми и ИИ-агентами'],
  ['Учёт клиентов', 'Данные вносят вручную, в продажах хаос', 'Данные заполняются сами, клиент ведётся до сделки'],
  ['Ответы клиентам', 'Ответ ждут часами и только в рабочее время', 'На любом языке в WhatsApp, на сайте и в мессенджерах за секунды'],
  ['База знаний', 'Опыт живёт в головах сотрудников', 'Единое хранилище, доступное сотрудникам за секунды'],
];

const FIELDS = [
  { clause: 'Заявка приходит из мессенджера', status: 'Новая', lines: ['Клиент · WhatsApp', '«Нужна CRM для отдела продаж»'], foot: 'Ответственный не назначен' },
  { clause: 'ИИ оценивает заявку и передаёт лучшему продавцу', status: 'В работе', lines: ['Клиент · WhatsApp', '«Нужна CRM для отдела продаж»'], foot: 'Оценка 82 из 100 · менеджер назначен' },
  { clause: 'Клиент оплачивает счёт', status: 'Оплачено', lines: ['Клиент · WhatsApp', '«Счёт оплатил, жду доступы!»'], foot: 'Сделка закрыта' },
];

const LOGOS = [
  { name: 'EBRD', src: europeanBank },
  { name: 'Freedom Broker', src: freedomBroker },
  { name: 'Казахстан Темир Жолы', src: kzTemir },
  { name: 'Google Developer Groups', src: googleDev },
  { name: 'EASY', src: easyLogo },
];

const REVIEWS = [
  { initials: 'АВ', name: 'Александр В.', role: 'CEO, TechFlow', text: 'Proji автоматизировал наш отдел поддержки на 90%. Это невероятно, как быстро система обучается.' },
  { initials: 'ДС', name: 'Дмитрий С.', role: 'Head of Sales', text: 'CRM больше не требует ручного ввода. Менеджеры наконец-то продают, а не заполняют таблицы.' },
];

const TAGLINE = 'Proji берёт рутину на себя, а вы занимаетесь тем, ради чего строили бизнес.';

const FAQ = [
  { q: 'С чего начать?', a: 'Нажмите «Начать бесплатно» и выберите продукт под вашу главную задачу. Если нужна помощь с выбором, напишите нам в WhatsApp, и мы подберём решение.' },
  { q: 'Сколько стоит Proji?', a: 'Начать можно бесплатно. Условия и цены собраны на странице «Тарифы».' },
  { q: 'Что такое цифровой сотрудник?', a: 'Это ИИ-агент, который берёт на себя рутинную работу: отвечает клиентам, ведёт CRM, готовит отчёты. Он работает круглосуточно и заменяет работу целого отдела.' },
  { q: 'Агенты действуют без моего контроля?', a: 'Агент решает самостоятельно только в рамках правил, которые задали вы. Ход работы и результат видны в задаче, как у обычного сотрудника.' },
  { q: 'На каких языках агент общается с клиентами?', a: 'На любом языке: в WhatsApp, на сайте и в других мессенджерах.' },
  { q: 'Кто стоит за Proji?', a: 'Proji делает команда Sunnet из Актобе. Мы больше 15 лет внедряем IT-решения и реализовали более 300 проектов.' },
  { q: 'Как с вами связаться?', a: 'Напишите в WhatsApp или позвоните по номеру +7 776 600 66 36. Почта: sund.serik@gmail.com.' },
];

/* words light up one by one as the section scrolls through the viewport */
const Tagline: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const words = TAGLINE.split(' ');
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(words.length);
      return;
    }
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
      setLit(Math.round(p * words.length));
    };
    const onScroll = update;
    update();
    // the page scrolls inside .main-landing-root, so catch scroll from any element
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, [words.length]);

  return (
    <section className="ph-tagline ph-wrap" ref={ref} aria-label={TAGLINE}>
      <p aria-hidden>
        {words.map((w, i) => (
          <span key={i} className={i < lit ? 'is-lit' : ''}>{w} </span>
        ))}
      </p>
    </section>
  );
};

/* ---------- page ---------- */
export const ProjiHome: React.FC = () => {
  useReveal();
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const core = catalogGroups
    .flatMap(g => g.items)
    .filter(p => (CORE_SLUGS as readonly string[]).includes(p.slug))
    .sort((a, b) => (CORE_SLUGS as readonly string[]).indexOf(a.slug) - (CORE_SLUGS as readonly string[]).indexOf(b.slug));

  const startFree = () => {
    trackEvent('cta_start_free_click');
    window.location.href = 'https://proji.kz';
  };

  const whatsapp = () => {
    const phoneNo = '77766006636';
    const message = 'Здравствуйте, хочу получить консультацию';
    trackEvent('cta_whatsapp_consult_click', { phone: phoneNo, message });
    window.open(`https://wa.me/${phoneNo}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = phone.trim();
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(value)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSending(true);
    setFailed(false);
    try {
      await submitDemoRequest('Презентация на телефон (главная)', value);
      setSent(true);
      trackEvent('phone_presentation_request_submitted', { phone: value });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ph">
      <SketchDefs />
      {/* hero */}
      <section className="ph-hero ph-wrap" id="main-content" tabIndex={-1}>
        <div className="ph-hero-grid">
          <div className="ph-hero-text">
            <h1>
              8 из 10 задач <br />
              решаются автоматически
            </h1>
            <p className="ph-lead">Искусственный интеллект берёт на себя 80% рутины. Освободите время для стратегии и роста.</p>
            <div className="ph-actions">
              <button type="button" className="ph-btn" onClick={startFree} data-cta-dest="https://proji.kz">
                Начать бесплатно <ArrowRight size={18} aria-hidden />
              </button>
              <button type="button" className="ph-link" onClick={whatsapp} data-cta-dest="whatsapp:+77766006636">
                Получить консультацию <ArrowRight size={16} aria-hidden />
              </button>
            </div>
            <p className="ph-trust">15+ лет опыта и 300+ проектов в Sunnet BT. Начать можно бесплатно.</p>
            <Greeting />
          </div>
          <HeroPhone />
        </div>
        <TaskBoard />
      </section>

      {/* features: comparison set as text */}
      <section className="ph-section ph-wrap" id="features">
        <h2 className="ph-reveal">Что меняется, когда рутиной занимается ИИ</h2>
        <div className="ph-sketch-wide ph-reveal"><SketchHero /></div>
        <div className="ph-compare ph-reveal" role="table" aria-label="Как обычно и с Proji">
          <div className="ph-compare-head" role="row">
            <span role="columnheader">Возможность</span>
            <span role="columnheader">Как обычно</span>
            <span role="columnheader" className="is-proji">С Proji</span>
          </div>
          {COMPARE.map(([name, usual, proji]) => (
            <div className="ph-compare-row" role="row" key={name}>
              <span role="rowheader" className="ph-compare-name">{name}</span>
              <span role="cell" data-label="Как обычно">{usual}</span>
              <span role="cell" data-label="С Proji" className="is-proji">{proji}</span>
            </div>
          ))}
        </div>
      </section>

      {/* products */}
      <section className="ph-section ph-wrap" id="products">
        <h2 className="ph-reveal">Шесть продуктов. Одна система.</h2>
        <p className="ph-sub ph-reveal">Начните с того, что закрывает вашу главную боль. Остальные продукты есть в полном каталоге.</p>
        <ul className="ph-products">
          {core.map((p, i) => {
            const Pic = PRODUCT_PICS[i % PRODUCT_PICS.length];
            return (
            <li key={p.slug} className="ph-product ph-reveal">
              <div className="ph-product-left">
                <div className="ph-sketch"><Pic /></div>
                <h3>{p.name}</h3>
                <Link to={`/${p.slug}`} className="ph-link">
                  {p.cta} <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
              <div className="ph-product-right">
                <p className="ph-product-hook">{p.hook}</p>
                <p>{p.desc}</p>
              </div>
            </li>
            );
          })}
        </ul>
        <Link to="/services" className="ph-link ph-all">
          Смотреть все продукты <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <Tagline />

      {/* how it works: one card, three fields */}
      <section className="ph-strip" aria-labelledby="how-title">
        {FIELDS.map((f, i) => (
          <div className={`ph-field ph-field-${i + 1}`} key={f.clause}>
            {i === 0 && <h2 id="how-title">Как Proji превращает хаос в систему</h2>}
            <div className="ph-sketch">{React.createElement(FIELD_PICS[i])}</div>
            <p className="ph-field-clause">{f.clause}</p>
            <div className="ph-card" data-ui>
              <div className="ph-card-top">
                <span className="ph-card-id">Заявка</span>
                <span className="ph-card-status">{f.status}</span>
              </div>
              <div className="ph-card-body">
                {f.lines.map(l => <p key={l}>{l}</p>)}
              </div>
              <div className="ph-card-foot">{f.foot}</div>
            </div>
          </div>
        ))}
      </section>

      {/* founder */}
      <section className="ph-section ph-wrap" id="about">
        <div className="ph-founder">
          <img className="ph-reveal" src={serikImage} alt="Серик, основатель Proji" loading="lazy" width={480} height={600} />
          <div className="ph-reveal">
            <Quote size={28} aria-hidden />
            <blockquote>
              Мы делали Proji не как очередной инструмент, а как систему, в которой мечтали бы работать сами. Без хаоса, без бюрократии.
            </blockquote>
            <p className="ph-founder-name">Серик, CEO Sunnet и Proji</p>
          </div>
        </div>
      </section>

      {/* proof: tiles */}
      <section className="ph-section ph-wrap" id="proof">
        <div className="ph-tiles">
          <div className="ph-tile ph-tile-head ph-reveal">
            <h2>Нам доверяют лидеры рынка</h2>
          </div>
          {LOGOS.map(l => (
            <div className="ph-tile ph-tile-logo ph-reveal" key={l.name}>
              <img src={l.src} alt={l.name} loading="lazy" />
            </div>
          ))}
          <div className="ph-tile ph-tile-stat ph-reveal">
            <strong>15+</strong>
            <span>лет внедряем IT-решения в Sunnet BT</span>
          </div>
          <div className="ph-tile ph-tile-stat ph-reveal">
            <strong>300+</strong>
            <span>успешных проектов от стартапов до корпораций</span>
          </div>
        </div>
      </section>

      {/* testimonial as comment thread */}
      <section className="ph-section ph-wrap" id="reviews">
        <h2 className="ph-reveal">Реальные истории роста с Proji</h2>
        <div className="ph-thread">
          <article className="ph-comment ph-comment-main ph-reveal" data-ui>
            <header>
              <span className="ph-disc">{REVIEWS[0].initials}</span>
              <span><strong>{REVIEWS[0].name}</strong> · {REVIEWS[0].role}</span>
            </header>
            <p>{REVIEWS[0].text}</p>
          </article>
          <div className="ph-replies">
            {REVIEWS.slice(1).map(r => (
              <article className="ph-comment ph-reveal" data-ui key={r.name}>
                <header>
                  <span className="ph-disc">{r.initials}</span>
                  <span><strong>{r.name}</strong> · {r.role}</span>
                </header>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="ph-section ph-wrap" id="faq">
        <h2 className="ph-reveal">Частые вопросы</h2>
        <div className="ph-faq ph-reveal">
          {FAQ.map(f => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* cta: same primary action as the hero, then the presentation form */}
      <section className="ph-cta ph-wrap" id="cta">
        <div className="ph-cta-main">
          <h2>Попробуйте Proji бесплатно</h2>
          <p className="ph-cta-note">Начать можно без обязательств. Условия и цены собраны на странице «Тарифы».</p>
          <div className="ph-actions">
            <button type="button" className="ph-btn" onClick={startFree} data-cta-dest="https://proji.kz">
              Начать бесплатно <ArrowRight size={18} aria-hidden />
            </button>
            <Link to="/tariffs" className="ph-link">
              Смотреть тарифы <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
        <form onSubmit={submitPhone} noValidate data-cta-dest="formsubmit:sund.serik@gmail.com">
          <h3 className="ph-cta-sentence">Отправим презентацию на номер</h3>
          <div className="ph-cta-row">
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={e => { setPhone(e.target.value); setPhoneError(false); }}
              placeholder="+7 700 000 00 00"
              aria-label="Номер телефона"
              aria-invalid={phoneError}
              aria-describedby={phoneError ? 'phone-error' : undefined}
              autoComplete="tel"
              disabled={sending || sent}
            />
            <button type="submit" className="ph-btn" disabled={sending || sent}>
              {sent ? 'Отправлено' : 'Отправить'}
            </button>
          </div>
          {phoneError && (
            <p className="ph-cta-error" id="phone-error" role="alert">Введите номер полностью, например +7 700 000 00 00</p>
          )}
          <p className="ph-cta-note" role="status">
            {sent
              ? 'Презентация отправлена. Мы свяжемся с вами.'
              : failed
                ? 'Не удалось отправить. Напишите в WhatsApp или на sund.serik@gmail.com'
                : 'Или найдём точки роста вместе: напишите в WhatsApp, и мы подберём продукт под вашу задачу.'}
          </p>
          <button type="button" className="ph-link" onClick={whatsapp}>
            Написать в WhatsApp <ArrowRight size={16} aria-hidden />
          </button>
        </form>
      </section>
    </div>
  );
};

import { ThemeIconButton } from "../../components/ThemeIconButton";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BatteryLow,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  Gauge,
  Hourglass,
  Lightbulb,
  Mic,
  Scale,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import { applyLandingPageBg } from "../../lib/landingPageBg";
import "./styles.css";

const LANDING_ID = "ai-agents";
const TITLE = "PROJI — AI-агенты для бизнеса";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&family=Inter:wght@400;500;600;700&display=swap";

const WHATSAPP_PHONE = "77766006636";
const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_AGENTS = [
  { icon: Users, title: "AI HR-менеджер", body: "Обрабатывает заявления на отпуск", status: "В работе", meta: "342 задачи" },
  { icon: TrendingUp, title: "AI Продавец", body: "Отвечает лидам за 5 минут", status: "В работе", meta: "96% успеха" },
  { icon: Wallet, title: "AI Бухгалтер", body: "Разносит счета в 1С", status: "В работе", meta: "24/7" },
];

const PROBLEMS = [
  { icon: Hourglass, kpi: "40%", title: "рабочего дня — рутина", body: "Однотипные ответы, перенос данных из окна в окно, отчёты руками." },
  { icon: Clock, kpi: "2–3 мес", title: "найм долго и дорого", body: "Поиск, зарплата, налоги, обучение — и не факт, что человек останется." },
  { icon: BatteryLow, kpi: "−25%", title: "люди устают и ошибаются", body: "К вечеру точность падает, в отпуске задачи просто стоят." },
  { icon: Gauge, kpi: "Стоп", title: "быстро масштабироваться нельзя", body: "Рост заявок = срочный найм или потерянные клиенты." },
];

const CONCEPTS = [
  { icon: Workflow, title: "Процесс", body: "Цепочка из агентов и навыков, которая запускается сама — по событию или расписанию — и ведёт задачу от начала до конца." },
  { icon: Bot, title: "AI-агент", body: "Владеет набором навыков и сам решает, что и когда сделать, чтобы закрыть задачу." },
  { icon: Zap, title: "Навык", body: "Одно конкретное действие: ответить клиенту, свести отчёт, проверить документ." },
];

const SKILL_EXAMPLES = ["Ответить в WhatsApp", "Занести счёт в 1С", "Суммировать встречу"];

const SKILL_SOURCES = [
  { icon: Lightbulb, title: "Создайте сами", body: "Опишите действие простым языком — и агент начнёт его выполнять. Полный контроль и точная настройка под ваш бизнес." },
  { icon: Sparkles, title: "Возьмите у экспертов", body: "Готовые навыки от международных экспертов — проверены, протестированы, устанавливаются в один клик, как приложение из магазина." },
];

const SKILL_STORE = [
  { icon: CreditCard, title: "Проверить платёж Kaspi", author: "Suncloud Experts", rating: "4.8" },
  { icon: Mic, title: "Расшифровка звонков", author: "Voice Lab Intl", rating: "4.9" },
  { icon: FileSpreadsheet, title: "Работа с 1С", author: "FinOps Pro", rating: "4.7" },
  { icon: FileCheck2, title: "Проверка договоров", author: "LegalTech EU", rating: "4.8" },
];

const ROLES = [
  {
    icon: Users,
    title: "AI HR-менеджер",
    replaces: "заменяет HR-координатора",
    before: "Заявления на отпуск обрабатывались вручную по 2 дня, графики путались.",
    after: "Агент проверяет остатки, сверяет график отдела и сам отвечает сотруднику.",
    result: "15 минут вместо 2 дней",
  },
  {
    icon: TrendingUp,
    title: "AI Продавец",
    replaces: "заменяет junior-менеджера по лидам",
    before: "Первый ответ клиенту через 3–4 часа, часть лидов остывала.",
    after: "Каждый лид получает ответ мгновенно, горячие уходят менеджеру.",
    result: "Ответ за 5 минут, +30% к звонкам",
  },
  {
    icon: Wallet,
    title: "AI Бухгалтер",
    replaces: "заменяет оператора первички",
    before: "Счета копились до конца недели, оплаты просрочивались.",
    after: "Агент разносит счета в день поступления и шлёт отчёт по пятницам.",
    result: "100% счетов за 24 часа",
  },
  {
    icon: Scale,
    title: "AI Юрист",
    replaces: "заменяет первичную проверку договоров",
    before: "Проверка одного договора занимала до недели.",
    after: "Агент сверяет условия с шаблоном и готовит список замечаний.",
    result: "4 часа вместо недели",
  },
];

const MODEL_TIERS = [
  { icon: Zap, title: "Лёгкие", body: "Для рутины, от $0.05" },
  { icon: Brain, title: "Мощные", body: "Для сложных решений" },
  { icon: Sparkles, title: "Свои", body: "Обученные на данных компании" },
];

const METRICS = [
  { kpi: "24/7", label: "работает без выходных" },
  { kpi: "×5", label: "дешевле штатной единицы" },
  { kpi: "10 мин", label: "до запуска первого агента" },
  { kpi: "0", label: "отпусков и больничных" },
];

const BUILDER_CARDS = [
  { title: "Квалификатор лидов", kind: "Агент", value: "96%" },
  { title: "Отправить сообщение", kind: "Навык", value: "98%" },
  { title: "Обработка заявки", kind: "Процесс", value: "95%" },
];

const BUILDER_SECTIONS = ["AI Фабрика", "Проекты", "Отчёты"];

const QUOTES = [
  {
    quote: "Агент забрал на себя ответы лидам — менеджеры наконец продают, а не печатают.",
    name: "Айгерим",
    role: "Руководитель отдела продаж",
  },
  {
    quote: "Счета перестали копиться. Пятничный отчёт смотрю за 10 минут.",
    name: "Марат",
    role: "Финансовый директор",
  },
  {
    quote: "Собрали первого агента за один вечер — без единого программиста.",
    name: "Дмитрий",
    role: "Основатель",
  },
];

function useFonts() {
  useEffect(() => {
    const id = "ai-agents-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="aa-kicker">
      <Sparkles size={12} />
      <span>{children}</span>
    </p>
  );
}

export default function AiAgentsLanding() {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    resetDocumentShell();
    applyLandingPageBg(LANDING_ID);
    document.title = TITLE;
    document.documentElement.lang = "ru";
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useFonts();

  const heroItem = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 26 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
        },
      };

  return (
    <div className="ai-agents-root">
      <header className="aa-header">
        <div className="aa-container aa-header-inner">
          <a href="#top" className="aa-brand">
            proji
          </a>
          <nav className="aa-nav">
            <a href="#roles">Роли</a>
            <a href="#skills">Навыки</a>
            <a href="#builder">Конструктор</a>
            <a href="#final">Отзывы</a>
          </nav>
          <a
            href={waLink("Здравствуйте, хочу создать AI-агента для бизнеса.")}
            target="_blank"
            rel="noreferrer"
            className="aa-btn aa-btn--brand aa-btn--sm"
          >
            Создать агента
          </a>
          <ThemeIconButton landing="ai-agents" />
        </div>
      </header>

      <section className="aa-hero" id="top">
        <div className="aa-hero-glow" aria-hidden />
        <motion.div
          className="aa-container aa-hero-inner"
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "show"}
          variants={
            reduced
              ? undefined
              : {
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                }
          }
        >
          <motion.div {...heroItem} className="aa-hero-badge">
            <span className="aa-hero-badge-dot" />
            AI-агенты для бизнеса
          </motion.div>
          <motion.h1 {...heroItem}>
            Наймите AI-агента, который работает 24/7
            <br />
            <span className="aa-brand-text">и не просит отпуск.</span>
          </motion.h1>
          <motion.p {...heroItem} className="aa-hero-sub">
            AI-агент — цифровой сотрудник на базе искусственного интеллекта.
            Он сам решает задачи и ведёт целые процессы: отвечает клиентам,
            готовит отчёты, проверяет документы — как человек в вашей
            команде, только быстрее и в разы дешевле.
          </motion.p>
          <motion.div {...heroItem} className="aa-hero-actions">
            <a
              href={waLink("Здравствуйте, хочу создать AI-агента для бизнеса.")}
              target="_blank"
              rel="noreferrer"
              className="aa-btn aa-btn--brand"
            >
              Создать AI-агента <ArrowRight size={16} />
            </a>
            <a
              href={waLink("Здравствуйте, хочу посмотреть живое демо AI-агентов.")}
              target="_blank"
              rel="noreferrer"
              className="aa-btn aa-btn--ghost"
            >
              Показать живое демо
            </a>
          </motion.div>

          <motion.div {...heroItem} className="aa-hero-agents">
            {HERO_AGENTS.map((a) => (
              <div key={a.title} className="aa-hero-agent-card">
                <div className="aa-card-icon">
                  <a.icon size={20} />
                </div>
                <div className="aa-hero-agent-body">
                  <p className="aa-hero-agent-title">{a.title}</p>
                  <p className="aa-hero-agent-desc">{a.body}</p>
                </div>
                <div className="aa-hero-agent-status">
                  <span className="aa-status-dot" />
                  <span>{a.status}</span>
                  <span className="aa-hero-agent-meta">{a.meta}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="problem" className="aa-section">
        <div className="aa-container">
          <Reveal>
            <Kicker>Знакомая ситуация?</Kicker>
            <h2 className="aa-section-title">
              Команда тонет в рутине,
              <br />
              <span className="aa-dim">а рост требует новых людей.</span>
            </h2>
          </Reveal>
          <div className="aa-grid aa-grid--2">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1}>
                <div className="aa-card">
                  <div className="aa-card-icon">
                    <p.icon size={20} />
                  </div>
                  <p className="aa-card-kpi aa-brand-text">{p.kpi}</p>
                  <p className="aa-card-lead">{p.title}</p>
                  <p className="aa-card-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="concept" className="aa-section aa-section--tinted">
        <div className="aa-container">
          <Reveal>
            <Kicker>Простыми словами</Kicker>
            <h2 className="aa-section-title">Что такое AI-агент.</h2>
            <p className="aa-section-sub">
              У него есть навыки, и он сам решает, какой навык применить,
              чтобы довести задачу до результата. Как в обычной компании:
              сотрудник владеет навыками, а команда работает по регламенту.
              Только здесь всё это — цифровое.
            </p>
          </Reveal>
          <div className="aa-grid aa-grid--3">
            {CONCEPTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.1}>
                <div className="aa-card">
                  <div className="aa-card-icon aa-card-icon--lg">
                    <c.icon size={24} />
                  </div>
                  <h3 className="aa-card-title">{c.title}</h3>
                  <p className="aa-card-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="aa-section">
        <div className="aa-container">
          <Reveal>
            <Kicker>Откуда у агента навыки</Kicker>
            <h2 className="aa-section-title">
              У AI-агента нет «врождённых суперспособностей».
              <br />
              <span className="aa-dim">Каждый навык — это написанная людьми инструкция.</span>
            </h2>
          </Reveal>
          <div className="aa-grid aa-grid--2">
            {SKILL_SOURCES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.1}>
                <div className="aa-card">
                  <div className="aa-card-icon">
                    <s.icon size={20} />
                  </div>
                  <h3 className="aa-card-title aa-card-title--sm">{s.title}</h3>
                  <p className="aa-card-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="aa-skill-examples">
              {SKILL_EXAMPLES.map((s) => (
                <span key={s} className="aa-chip">
                  <CheckCircle2 size={14} />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="aa-store-panel">
              <p className="aa-store-title">Примеры навыков в магазине</p>
              <div className="aa-store-grid">
                {SKILL_STORE.map((s) => (
                  <div key={s.title} className="aa-store-item">
                    <div className="aa-card-icon aa-card-icon--sm">
                      <s.icon size={18} />
                    </div>
                    <div className="aa-store-item-body">
                      <p className="aa-store-item-title">{s.title}</p>
                      <p className="aa-store-item-author">{s.author}</p>
                    </div>
                    <div className="aa-store-item-rating">
                      <Star size={13} fill="currentColor" />
                      <span>{s.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="roles" className="aa-section aa-section--tinted">
        <div className="aa-container">
          <Reveal>
            <Kicker>Реальная замена</Kicker>
            <h2 className="aa-section-title">
              Это реально заменяет человека.
            </h2>
            <p className="aa-section-sub">
              Четыре роли, которые уже ведут AI-агенты — с реальными «было» и
              «стало».
            </p>
          </Reveal>
          <div className="aa-grid aa-grid--2">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.1}>
                <div className="aa-card aa-role-card">
                  <div className="aa-role-head">
                    <div className="aa-card-icon">
                      <r.icon size={20} />
                    </div>
                    <div>
                      <h3 className="aa-card-title aa-card-title--sm">{r.title}</h3>
                      <p className="aa-role-replaces">{r.replaces}</p>
                    </div>
                  </div>
                  <div className="aa-role-row">
                    <span className="aa-role-label aa-role-label--before">Было</span>
                    <p>{r.before}</p>
                  </div>
                  <div className="aa-role-row">
                    <span className="aa-role-label aa-role-label--after">Стало</span>
                    <p>{r.after}</p>
                  </div>
                  <p className="aa-role-result">{r.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="aa-section">
        <div className="aa-container">
          <Reveal>
            <Kicker>Мощность под задачу</Kicker>
            <h2 className="aa-section-title">
              Платите ровно за ту мощность, которая нужна.
            </h2>
            <p className="aa-section-sub">
              Внутри агента — нейросеть. 400+ моделей на выбор, менять можно
              в один клик.
            </p>
          </Reveal>
          <div className="aa-grid aa-grid--3">
            {MODEL_TIERS.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.1}>
                <div className="aa-card">
                  <div className="aa-card-icon">
                    <t.icon size={20} />
                  </div>
                  <h3 className="aa-card-title aa-card-title--sm">{t.title}</h3>
                  <p className="aa-card-body">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="aa-metrics">
              {METRICS.map((m) => (
                <div key={m.label} className="aa-metric-cell">
                  <p className="aa-metric-kpi aa-brand-text">{m.kpi}</p>
                  <p className="aa-metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="builder" className="aa-section aa-section--tinted">
        <div className="aa-container">
          <Reveal>
            <Kicker>Не магия, а инструмент</Kicker>
            <h2 className="aa-section-title">
              Понятный конструктор внутри.
            </h2>
            <p className="aa-section-sub">
              Карточки агентов, навыков и процессов. Соберите первого агента
              так же просто, как проект в трекере: {BUILDER_SECTIONS.join(" · ")}.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aa-builder-panel">
              <div className="aa-builder-grid">
                {BUILDER_CARDS.map((c) => (
                  <div key={c.title} className="aa-builder-card">
                    <span className="aa-builder-kind">{c.kind} · активен</span>
                    <p className="aa-builder-title">{c.title}</p>
                    <div className="aa-meter">
                      <div className="aa-meter-fill" style={{ width: `${c.value}` }} />
                    </div>
                    <span className="aa-builder-value">{c.value}</span>
                  </div>
                ))}
              </div>
              <div className="aa-builder-statusbar">
                <span>
                  <span className="aa-status-dot" /> работает 24/7
                </span>
                <span>96% успешных запусков</span>
                <span>3 агента онлайн</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="quotes" className="aa-section">
        <div className="aa-container">
          <Reveal>
            <Kicker>Отзывы</Kicker>
            <h2 className="aa-section-title">
              Уже работает в реальных командах.
            </h2>
          </Reveal>
          <div className="aa-grid aa-grid--3">
            {QUOTES.map((q, i) => (
              <Reveal key={q.name} delay={(i % 3) * 0.1}>
                <figure className="aa-quote-card">
                  <div className="aa-stars">
                    {Array.from({ length: 5 }).map((_, n) => (
                      <Star key={n} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote>«{q.quote}»</blockquote>
                  <figcaption>
                    <p className="aa-quote-name">{q.name}</p>
                    <p className="aa-quote-role">{q.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="final" className="aa-section" style={{ paddingBottom: "6rem" }}>
        <div className="aa-container">
          <Reveal>
            <div className="aa-final">
              <div className="aa-final-glow" aria-hidden />
              <h2>
                Соберите своего первого
                <br />
                <span className="aa-brand-text">AI-агента прямо сейчас.</span>
              </h2>
              <p>
                Начните с одной задачи — почувствуйте разницу уже в первый
                день.
              </p>
              <div className="aa-final-actions">
                <a
                  href={waLink("Здравствуйте, хочу создать AI-агента для бизнеса.")}
                  target="_blank"
                  rel="noreferrer"
                  className="aa-btn aa-btn--brand"
                >
                  Создать AI-агента <ArrowRight size={16} />
                </a>
                <a
                  href={waLink("Здравствуйте, хочу посмотреть живое демо AI-агентов.")}
                  target="_blank"
                  rel="noreferrer"
                  className="aa-btn aa-btn--ghost"
                >
                  Показать живое демо
                </a>
              </div>
              <p className="aa-final-note">
                Без карты · 5 минут на настройку · Отмена в любой момент
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="aa-footer">
        <div className="aa-container aa-footer-inner">
          <div className="aa-footer-brand">
            <span className="aa-brand">proji</span>
            <span>© {new Date().getFullYear()} · Все права защищены.</span>
          </div>
          <span>AI-агенты для бизнеса</span>
        </div>
      </footer>
    </div>
  );
}

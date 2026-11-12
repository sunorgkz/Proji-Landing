import { ThemeIconButton } from "../../components/ThemeIconButton";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Cog,
  Eye,
  FolderPlus,
  GitBranch,
  Megaphone,
  MessageSquare,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  UserMinus,
  Users,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import { applyLandingPageBg } from "../../lib/landingPageBg";
import "./styles.css";

const LANDING_ID = "os-engine";
const TITLE = "PROJI — Операционная система для бизнеса";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&family=Inter:wght@400;500;600;700&display=swap";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { kpi: "50%", label: "меньше планёрок со статусами" },
  { kpi: "70%", label: "быстрее отчётность" },
  { kpi: "3×", label: "быстрее планирование проектов" },
  { kpi: "90%", label: "знания остаются в компании" },
];

const PROBLEMS = [
  {
    icon: Eye,
    when: "Когда нужно понять, что происходит в компании,",
    want: "не хочется искать ответ по чатам, таблицам и документам.",
  },
  {
    icon: FolderPlus,
    when: "Когда стартует новый проект,",
    want: "хочется, чтобы всё уже было связано между собой.",
  },
  {
    icon: UserMinus,
    when: "Когда сотрудник уходит,",
    want: "не хочется, чтобы его знания уходили вместе с ним.",
  },
  {
    icon: MessageSquare,
    when: "Когда просишь ИИ о помощи,",
    want: "хочется получить ответ на основе своего бизнеса, а не общих советов из интернета.",
  },
];

const DOMAINS = [
  { icon: Briefcase, title: "Бизнес", tags: "Стратегия · OKR · Решения · Отчёты · ИИ-директор" },
  { icon: Users, title: "Команда", tags: "Найм · Онбординг · 1:1 · Рост · ИИ-эйчар" },
  { icon: Server, title: "IT", tags: "Инфраструктура · Доступы · Безопасность · Инциденты · ИИ-инженер" },
  { icon: Wallet, title: "Финансы", tags: "Бюджет · Платежи · Отчёты · Прогнозы · ИИ-аналитик" },
  { icon: Cog, title: "Операции", tags: "Процессы · Регламенты · Поставщики · Качество · ИИ-оператор" },
  { icon: Megaphone, title: "Маркетинг", tags: "Кампании · Контент · Аналитика · Бренд · ИИ-маркетолог" },
];

const SCIENTIST = [
  {
    icon: ShieldCheck,
    title: "Анализ рисков",
    body: "Когда в проекте появляются риски — хочется узнать об этом заранее, до того как сорвутся сроки.",
  },
  {
    icon: Target,
    title: "Контроль этапов",
    body: "Когда сроки сдвигаются — хочется чёткой картины, что идёт по плану, а что отстаёт.",
  },
  {
    icon: Users,
    title: "Баланс нагрузки",
    body: "Когда команда перегружена — хочется это увидеть и перераспределить работу, а не выгорать людей.",
  },
  {
    icon: Brain,
    title: "Сводки по проектам",
    body: "Когда нужен статус — хочется одну страницу с сутью, а не часы совещаний.",
  },
  {
    icon: Sparkles,
    title: "Помощь в решениях",
    body: "Когда нужно сделать выбор — хочется вариантов, плюсов-минусов и данных, а не интуиции.",
  },
  {
    icon: GitBranch,
    title: "Готовые документы",
    body: "Когда нужен бриф, отчёт или техзадание — хочется черновик за минуты, готовый к правкам.",
  },
];

const KNOWLEDGE_CHIPS = [
  "Встречи",
  "Решения",
  "Документы",
  "Переписки",
  "Проекты",
  "Процессы",
];

const WORKFORCE = [
  {
    title: "ИИ-советник директора",
    body: "Когда принимаешь стратегическое решение — хочется партнёра, который видит всю компанию целиком.",
  },
  {
    title: "ИИ продакт-менеджер",
    body: "Когда в списке задач хаос — хочется приоритетов, спецификаций и понятного плана.",
  },
  {
    title: "ИИ-аналитик маркетинга",
    body: "Когда идут кампании — хочется знать, что работает и куда вкладывать больше.",
  },
  {
    title: "ИИ-консультант по процессам",
    body: "Когда процессы ломаются — хочется быстро найти узкое место и исправить его.",
  },
  {
    title: "ИИ-ассистент по кадрам",
    body: "Когда команда растёт — хочется, чтобы найм, онбординг и регламенты шли гладко.",
  },
  {
    title: "ИИ финансовый аналитик",
    body: "Когда смотришь на цифры — хочется ясной картины по деньгам, расходам и рискам.",
  },
];

const EXECUTION_FLOW = ["Цели", "Проекты", "Этапы", "Задачи", "Результаты"];

const AUTOMATIONS = [
  { from: "Задача выполнена", to: "Этап обновлён" },
  { from: "Этап завершён", to: "Проект обновлён" },
  { from: "Проект отстаёт", to: "ИИ находит риск" },
  { from: "Риск обнаружен", to: "Руководство уведомлено" },
];

const METRICS = [
  { icon: BarChart3, label: "Нагрузка", value: 60 },
  { icon: ShieldCheck, label: "Здоровье проекта", value: 76 },
  { icon: Users, label: "Ёмкость команды", value: 73 },
  { icon: Zap, label: "Скорость", value: 86 },
  { icon: Brain, label: "Уровень риска", value: 84 },
];

function useFonts() {
  useEffect(() => {
    const id = "os-engine-fonts";
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
    <p className="oe-kicker">
      <Sparkles size={12} />
      <span>{children}</span>
    </p>
  );
}

export default function OsEngineLanding() {
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
    <div className="os-engine-root">
      <header className="oe-header">
        <div className="oe-container oe-header-inner">
          <a href="#top" className="oe-brand">
            proji
          </a>
          <nav className="oe-nav">
            <a href="#domains">Продукт</a>
            <a href="#scientist">Направления</a>
            <a href="#workforce">ИИ-команда</a>
            <a href="#final">Тарифы</a>
          </nav>
          <a href="#final" className="oe-btn oe-btn--brand oe-btn--sm">
            Получить доступ
          </a>
          <ThemeIconButton landing="os-engine" />
        </div>
      </header>

      <section className="oe-hero" id="top">
        <div className="oe-hero-glow" aria-hidden />
        <motion.div
          className="oe-container oe-hero-inner"
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
          <motion.div {...heroItem} className="oe-hero-badge">
            <span className="oe-hero-badge-dot" />
            Операционная система для бизнеса
          </motion.div>
          <motion.h1 {...heroItem}>
            Хватит управлять хаосом.
            <br />
            <span className="oe-brand-text">Начните управлять бизнесом.</span>
          </motion.h1>
          <motion.p {...heroItem} className="oe-hero-sub">
            Проекты, знания, процессы, цели, люди и ИИ — в одном едином
            рабочем пространстве.
          </motion.p>
          <motion.div {...heroItem} className="oe-hero-actions">
            <a href="#final" className="oe-btn oe-btn--brand">
              Получить доступ <ArrowRight size={16} />
            </a>
            <a href="#domains" className="oe-btn oe-btn--ghost">
              Заказать демо
            </a>
          </motion.div>
          <motion.p {...heroItem} className="oe-hero-note">
            Ваш бизнес уже принимает тысячи решений каждый день. PROJI следит,
            чтобы ни одно из них не потерялось.
          </motion.p>
        </motion.div>

        <div className="oe-stats">
          <div className="oe-container oe-stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="oe-stat-cell">
                <p className="oe-stat-kpi oe-brand-text">{s.kpi}</p>
                <p className="oe-stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="oe-section">
        <div className="oe-container">
          <Reveal>
            <Kicker>Реальная проблема</Kicker>
            <h2 className="oe-section-title">
              У большинства компаний нет системы.
              <br />
              <span className="oe-dim">Есть цифровой хаос.</span>
            </h2>
          </Reveal>
          <div className="oe-grid oe-grid--2">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.when} delay={(i % 2) * 0.1}>
                <div className="oe-card">
                  <div className="oe-card-icon">
                    <p.icon size={20} />
                  </div>
                  <p className="oe-card-lead">{p.when}</p>
                  <p className="oe-card-body">{p.want}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="domains" className="oe-section oe-section--tinted">
        <div className="oe-container">
          <Reveal>
            <Kicker>Направления бизнеса</Kicker>
            <h2 className="oe-section-title">
              Каждая часть компании заслуживает свой интеллект.
            </h2>
            <p className="oe-section-sub">
              PROJI разбивает бизнес на умные направления. У каждого — свои
              проекты, документы, цели, процессы и ИИ-советник.
            </p>
          </Reveal>
          <div className="oe-grid oe-grid--3">
            {DOMAINS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.1}>
                <div className="oe-card">
                  <div className="oe-card-icon oe-card-icon--lg">
                    <d.icon size={24} />
                  </div>
                  <h3 className="oe-card-title">{d.title}</h3>
                  <p className="oe-card-body">{d.tags}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="scientist" className="oe-section">
        <div className="oe-container">
          <Reveal>
            <Kicker>Аналитик проектов</Kicker>
            <h2 className="oe-section-title">Познакомьтесь со своим аналитиком проектов.</h2>
            <p className="oe-section-sub">
              ИИ-слой, который понимает каждый проект — предсказывает риски,
              балансирует нагрузку и пишет отчёты за секунды.
            </p>
          </Reveal>
          <div className="oe-grid oe-grid--3">
            {SCIENTIST.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.1}>
                <div className="oe-card">
                  <div className="oe-card-icon">
                    <s.icon size={20} />
                  </div>
                  <h3 className="oe-card-title oe-card-title--sm">{s.title}</h3>
                  <p className="oe-jtbd">Задача</p>
                  <p className="oe-card-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="knowledge" className="oe-section oe-section--tinted">
        <div className="oe-container">
          <Reveal>
            <Kicker>Знания</Kicker>
            <h2 className="oe-section-title">
              Превратите знания компании в стратегический актив.
            </h2>
            <p className="oe-section-sub">
              Каждый проект, встреча, документ и решение становятся частью
              единой памяти компании — с быстрым поиском.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="oe-knowledge-panel">
              <div className="oe-knowledge-grid">
                {KNOWLEDGE_CHIPS.map((c) => (
                  <div key={c} className="oe-chip">
                    <Network size={16} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="workforce" className="oe-section">
        <div className="oe-container">
          <Reveal>
            <Kicker>ИИ-команда</Kicker>
            <h2 className="oe-section-title">Соберите свою команду цифровых сотрудников.</h2>
            <p className="oe-section-sub">
              Создавайте специализированных ИИ-сотрудников, которые опираются
              на данные вашего бизнеса.
            </p>
          </Reveal>
          <div className="oe-grid oe-grid--3">
            {WORKFORCE.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.1}>
                <div className="oe-card oe-card--row">
                  <div className="oe-card-icon">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="oe-card-title oe-card-title--sm">{w.title}</h3>
                    <p className="oe-jtbd">Задача</p>
                    <p className="oe-card-body">{w.body}</p>
                    <p className="oe-card-foot">Опирается на данные вашего бизнеса.</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="execution" className="oe-section oe-section--tinted">
        <div className="oe-container">
          <Reveal>
            <Kicker>От стратегии к делу</Kicker>
            <h2 className="oe-section-title">От стратегии до результата.</h2>
            <p className="oe-section-sub">
              Цели превращаются в проекты. Проекты — в этапы. Этапы — в
              задачи. Всё остаётся связанным.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="oe-flow">
              {EXECUTION_FLOW.map((step, i) => (
                <div key={step} className="oe-flow-item">
                  <span className="oe-flow-node">{step}</span>
                  {i < EXECUTION_FLOW.length - 1 && (
                    <ArrowRight size={18} className="oe-flow-arrow" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="automation" className="oe-section">
        <div className="oe-container">
          <Reveal>
            <Kicker>Автоматизация</Kicker>
            <h2 className="oe-section-title">Компания должна работать сама.</h2>
            <p className="oe-section-sub">
              События запускают обновления. Риски запускают уведомления.
              Работа идёт без микроменеджмента.
            </p>
          </Reveal>
          <div className="oe-grid oe-grid--2">
            {AUTOMATIONS.map((a, i) => (
              <Reveal key={a.from} delay={(i % 2) * 0.1}>
                <div className="oe-card oe-card--trigger">
                  <Workflow size={20} className="oe-trigger-icon" />
                  <span className="oe-trigger-from">{a.from}</span>
                  <ArrowRight size={15} className="oe-trigger-arrow" />
                  <span className="oe-trigger-to">{a.to}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="analytics" className="oe-section oe-section--tinted">
        <div className="oe-container">
          <Reveal>
            <Kicker>Аналитика бизнеса</Kicker>
            <h2 className="oe-section-title">Смотрите на компанию как аналитик.</h2>
            <p className="oe-section-sub">
              Нагрузка, здоровье проектов, ёмкость команды, скорость и риски —
              под постоянным контролем.
            </p>
          </Reveal>
          <div className="oe-metrics">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.07}>
                <div className="oe-card oe-card--metric">
                  <m.icon size={20} className="oe-metric-icon" />
                  <p className="oe-metric-label">{m.label}</p>
                  <div className="oe-meter">
                    <motion.div
                      className="oe-meter-fill"
                      initial={reduced ? { width: `${m.value}%` } : { width: 0 }}
                      whileInView={{ width: `${m.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="final" className="oe-section" style={{ paddingBottom: "6rem" }}>
        <div className="oe-container">
          <Reveal>
            <div className="oe-final">
              <div className="oe-final-glow" aria-hidden />
              <h2>
                У вашего бизнеса уже есть данные.
                <br />
                <span className="oe-brand-text">Дайте им интеллект.</span>
              </h2>
              <p>
                Создайте цифрового двойника своего бизнеса и превратите
                разрозненную информацию в единую систему управления.
              </p>
              <div className="oe-final-actions">
                <a
                  href="https://wa.me/77064172408?text=Hi!%20I%20want%20early%20access%20to%20PROJI%20OS."
                  target="_blank"
                  rel="noreferrer"
                  className="oe-btn oe-btn--brand"
                >
                  Получить доступ <ArrowRight size={16} />
                </a>
                <a
                  href="https://wa.me/77064172408?text=Hi!%20I%20want%20a%20PROJI%20OS%20demo."
                  target="_blank"
                  rel="noreferrer"
                  className="oe-btn oe-btn--ghost"
                >
                  Заказать демо
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="oe-footer">
        <div className="oe-container oe-footer-inner">
          <div className="oe-footer-brand">
            <span className="oe-brand">proji</span>
            <span>© {new Date().getFullYear()} · Все права защищены.</span>
          </div>
          <span>Операционная система для бизнеса</span>
        </div>
      </footer>
    </div>
  );
}

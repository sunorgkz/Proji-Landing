/**
 * Каталог всех продуктовых лендингов на landing.proji.kz.
 * Каждый slug соответствует записи в landings/registry.ts.
 */

/** Имя иконки из lucide-react, подобранной под смысл продукта */
export type CatalogIconName =
  | 'Users'
  | 'Bot'
  | 'Sparkles'
  | 'Workflow'
  | 'MessagesSquare'
  | 'Brain'
  | 'Share2'
  | 'BookOpen'
  | 'Archive'
  | 'Copy'
  | 'BrainCircuit'
  | 'Building2'
  | 'Network'
  | 'Cpu'
  | 'Target'
  | 'Chrome'
  | 'UserSearch'
  | 'Rocket';

export interface CatalogItem {
  slug: string;
  name: string;
  /** Короткий интригующий заход — «начало» истории продукта */
  hook: string;
  /** Что внутри, одним предложением */
  desc: string;
  cta: string;
  icon: CatalogIconName;
}

export interface CatalogGroup {
  id: string;
  title: string;
  items: CatalogItem[];
}

const item = (
  slug: string,
  name: string,
  hook: string,
  desc: string,
  icon: CatalogIconName,
  cta = 'Смотреть лендинг',
): CatalogItem => ({ slug, name, hook, desc, cta, icon });

/**
 * Ядро — продукты на главной. Остальные живут в футере и на /services.
 */
export const CORE_SLUGS = [
  'ai-agents',
  'crm',
  'os-engine',
  'knowledge-twin',
  'pro-ai-council',
  'talent-manager',
] as const;

export const catalogGroups: CatalogGroup[] = [
  {
    id: 'sales',
    title: 'Продажи',
    items: [
      item(
        'crm',
        'Умный учёт клиентов',
        'Каждый лид. Каждое сообщение. Каждая сделка. Под контролем.',
        'Интеллектуальный слой между клиентом, продавцом и руководителем: мгновенные ответы, подбор лучшего продавца под клиента и контроль SLA в реальном времени.',
        'Users',
        'Взять продажи под контроль',
      ),
    ],
  },
  {
    id: 'employees',
    title: 'Цифровые сотрудники',
    items: [
      item(
        'digital-team',
        'Цифровые сотрудники',
        'Команда, которая не уходит в отпуск.',
        'AI-сотрудники знают ваши документы, выполняют задачи и работают 24/7.',
        'Bot',
        'Собрать AI-команду',
      ),
      item(
        'ai-agents',
        'AI-агенты для бизнеса',
        'Наймите AI-агента, который работает 24/7 и не просит отпуск.',
        'Цифровые сотрудники с навыками из магазина: HR, продажи, бухгалтерия и юротдел уже под контролем агентов.',
        'Sparkles',
        'Собрать AI-агента',
      ),
      item(
        'flow-forge',
        'Фоновый AI-продюсер',
        'Пока вы спите — он выпускает отчёты и кейсы.',
        'Автономный продюсер: еженедельные отчёты, черновики кейсов, SOP и работа с партнёрами без вашего участия.',
        'Workflow',
        'Запустить продюсера',
      ),
      item(
        'context-flow',
        'Умная память переписок',
        'Переписки перестают быть чёрной дырой.',
        'WhatsApp, Telegram и почта превращаются в действия: напоминания, черновики ответов и живую базу знаний.',
        'MessagesSquare',
        'Подключить переписки',
      ),
    ],
  },
  {
    id: 'progpt',
    title: 'proGPT — командный AI',
    items: [
      item(
        'pro-ai-council',
        'Совет из лучших AI',
        'Следующий шаг после ChatGPT.',
        'ChatGPT, Claude, Gemini, KazLLM и другие модели работают вместе — как совет экспертов по вашей задаче.',
        'Brain',
        'Собрать совет',
      ),
      item(
        'team-ai',
        'Командный ИИ',
        'AI, который помнит всю команду.',
        'Общие AI-каналы, несколько моделей и постоянная память для командной работы.',
        'Network',
      ),
      item(
        'team-ai-collab',
        'Совместное пространство с ИИ',
        'Одна AI-сессия на всю команду — в реальном времени.',
        'Совместные сессии с ChatGPT, Claude и Gemini прямо в общем рабочем пространстве.',
        'Share2',
      ),
    ],
  },
  {
    id: 'knowledge',
    title: 'Знания и память компании',
    items: [
      item(
        'knowledge',
        'AI-рекомендатель знаний',
        'Опыт компании — в один клик у каждого сотрудника.',
        'Контакты, регламенты и прошлые проекты сами находят того, кому они сейчас нужны.',
        'BookOpen',
        'Открыть знания',
      ),
      item(
        'knowledge-vault',
        'Система поддержки решений',
        'Человек физически не может помнить всё. Proji — может.',
        'Вся экспертиза компании в одном месте, доступная каждому сотруднику за секунды.',
        'Archive',
      ),
      item(
        'knowledge-twin',
        'Цифровой двойник эксперта',
        'Ваш лучший эксперт уволится. Его знания — останутся.',
        'Сохраняем, масштабируем и передаём экспертизу ключевых сотрудников.',
        'Copy',
      ),
      item(
        'secondbrain',
        'AI с абсолютной памятью',
        'Хватит объяснять заново.',
        'AI, который навсегда помнит каждую деталь ваших проектов.',
        'BrainCircuit',
      ),
    ],
  },
  {
    id: 'platform',
    title: 'Организационный интеллект',
    items: [
      item(
        'platform',
        'Мозг компании',
        'Не CRM и не чатбот. Мозг компании.',
        'Живой, умный и управляемый бизнес на общей памяти о работе.',
        'Building2',
      ),
      item(
        'sunnet',
        'Организационный Интеллект',
        'Мозг вашего бизнеса.',
        'AI-координация команд на основе общей памяти о работе компании.',
        'Network',
      ),
      item(
        'os-engine',
        'Операционная система бизнеса',
        'Операционная система для бизнеса.',
        'Единый AI-слой, на котором работают процессы всей компании.',
        'Cpu',
      ),
      item(
        'insight-hub',
        'Экосистема фокуса',
        'Тест-драйв Proji для команд от 20 человек.',
        'Chrome-расширение, база знаний и аудит рабочих мест в одном пакете.',
        'Target',
      ),
    ],
  },
  {
    id: 'tools',
    title: 'Инструменты и специальные проекты',
    items: [
      item(
        'chrome-extension',
        'Chrome-расширение',
        'Proji живёт в каждой вкладке.',
        'Любая страница превращается в задачу, проект или заметку в базе знаний.',
        'Chrome',
        'Установить расширение',
      ),
      item(
        'talent-manager',
        'Эволюция найма талантов',
        'Таланты сами описывают роль мечты.',
        'Рекрутеры ищут по намерению, а не по ключевым словам. Сеть растёт сама.',
        'UserSearch',
      ),
      item(
        'antigravity',
        'Антигравити',
        'Ваш бизнес. Только без гравитации рутины.',
        'Автономные системы забирают хаос операционки — вы управляете результатами.',
        'Rocket',
        'Сбросить балласт',
      ),
    ],
  },
];

export const catalogItems: CatalogItem[] = catalogGroups.flatMap(g => g.items);

export const coreCatalogItems: CatalogItem[] = CORE_SLUGS.map(
  slug => catalogItems.find(i => i.slug === slug)!,
).filter(Boolean);

export const moreCatalogItems: CatalogItem[] = catalogItems.filter(
  i => !(CORE_SLUGS as readonly string[]).includes(i.slug),
);

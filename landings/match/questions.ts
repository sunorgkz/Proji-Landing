/**
 * Вопросы квиза /match и то, что из них следует: функции Proji под ответы, тариф и сегмент клиента.
 * Функции — только из базы знаний Proji AI (статус «работает») и со страницы тарифов; новое сюда добавлять после проверки там же.
 */

export interface Feature {
  t: string;
  x: string;
}

export interface Option {
  id: string;
  label: string;
  /** что Proji закрывает при этом ответе: показывается сразу, пока человек отвечает */
  feature?: Feature;
}

export interface Question {
  id: 'role' | 'size' | 'field' | 'now' | 'pain' | 'link' | 'start';
  q: string;
  hint?: string;
  multi?: boolean;
  options: Option[];
}

const o = (id: string, label: string, feature?: Feature): Option => ({ id, label, feature });

export const QUESTIONS: Question[] = [
  {
    id: 'role',
    q: 'Кто вы в компании?',
    options: [o('owner', 'Собственник или директор'), o('head', 'Руководитель отдела или проекта'), o('staff', 'Сотрудник'), o('other', 'Другое')],
  },
  {
    id: 'size',
    q: 'Сколько человек будет работать в Proji?',
    hint: 'Считаются все: сотрудники, подрядчики, клиенты.',
    options: [o('s5', 'До 5'), o('s15', '6–15'), o('s70', '16–70'), o('s150', '71–150'), o('s151', 'Больше 150')],
  },
  {
    id: 'field',
    q: 'Чем занимается компания?',
    options: [o('service', 'Услуги'), o('sales', 'Продажи и торговля'), o('build', 'Стройка и производство'), o('agency', 'Маркетинг и агентства'), o('it', 'IT'), o('edu', 'Образование'), o('else', 'Другое')],
  },
  {
    id: 'now',
    q: 'Где сейчас живут задачи и договорённости?',
    options: [o('chat', 'В WhatsApp и Telegram'), o('sheet', 'В Excel и таблицах'), o('crm', 'В CRM или таск-трекере'), o('head', 'В головах и на планёрках')],
  },
  {
    id: 'pain',
    q: 'Что мешает сильнее всего?',
    hint: 'Можно выбрать несколько — сразу видно, что Proji берёт на себя.',
    multi: true,
    options: [
      o('lost', 'Договорённости теряются в переписке', { t: 'Договорённость становится задачей', x: 'Напишите Proji AI обычными словами: он подготовит карточку с исполнителем и сроком, а вы нажмёте «Подтвердить».' }),
      o('blind', 'Не видно, кто что делает и где просрочка', { t: 'Центр управления', x: 'Сам показывает просрочки, задачи без движения и перегруженных людей.' }),
      o('report', 'Статусы и отчёты собираем вручную', { t: 'Ответы по вашим данным', x: 'Спросите «Что просрочено и у кого?» — Proji AI ответит по задачам и проектам со ссылками на карточки.' }),
      o('late', 'Непонятно, успеем ли в срок', { t: 'Прогноз «Успеем ли?»', x: 'Считает по тому, сколько задач команда закрывала за последние 4 недели.' }),
      o('docs', 'Регламенты и знания разбросаны', { t: 'Документы с поиском', x: 'Регламенты и инструкции в одном месте: по ним можно искать и спрашивать Proji AI.' }),
      o('leads', 'Клиенты и заявки ждут ответа', { t: 'Лиды и заявки на доске', x: 'Каждая заявка — карточка с ответственным и сроком; видно, какие стоят без движения.' }),
      o('routine', 'Много однотипной ручной работы', { t: 'AI-агенты', x: 'AI-сотрудники вроде маркетолога или контент-мейкера. Доступны с тарифа «Стандарт».' }),
    ],
  },
  {
    id: 'link',
    q: 'С чем Proji должен быть связан?',
    hint: 'Можно выбрать несколько.',
    multi: true,
    options: [
      o('msg', 'Мессенджеры', { t: 'Связь с мессенджерами', x: 'Подключается и оплачивается отдельно, с тарифа «Старт».' }),
      o('1c', '1С', { t: 'Связь с 1С', x: 'Подключается и оплачивается отдельно, с тарифа «Старт».' }),
      o('crm', 'Наша CRM', { t: 'Связь с вашей CRM', x: 'Подключается и оплачивается отдельно, с тарифа «Старт».' }),
      o('api', 'Наши программы или сайт (API)', { t: 'API и вебхуки', x: 'Связь Proji с вашими программами и сайтом. Доступны с тарифа «Стандарт».' }),
      o('none', 'Пока ни с чем'),
    ],
  },
  {
    id: 'start',
    q: 'Когда хотите навести порядок?',
    options: [o('now', 'Прямо сейчас'), o('month', 'В этом месяце'), o('later', 'Пока присматриваюсь')],
  },
];

export type Answers = Partial<Record<Question['id'], string[]>>;
export type PlanId = 'free' | 'start' | 'business' | 'company' | 'enterprise';

const PLANS: PlanId[] = ['free', 'start', 'business', 'company', 'enterprise'];
const BY_SIZE: Record<string, PlanId> = { s5: 'free', s15: 'start', s70: 'business', s150: 'company', s151: 'enterprise' };

/** тариф по размеру команды, но не ниже того, с которого доступно выбранное */
export const planFor = (a: Answers): PlanId => {
  let i = PLANS.indexOf(BY_SIZE[a.size?.[0] ?? 's5']);
  const links = a.link ?? [];
  if (links.some(x => x !== 'none')) i = Math.max(i, PLANS.indexOf('start'));
  if (links.includes('api') || a.pain?.includes('routine')) i = Math.max(i, PLANS.indexOf('business'));
  return PLANS[i];
};

/** сегмент для отдела продаж: A — звонить первым, C — присматривается. Посетителю не показывается. */
export const segmentFor = (a: Answers): 'A' | 'B' | 'C' => {
  const one = (id: Question['id']) => a[id]?.[0] ?? '';
  const score =
    ({ s15: 1, s70: 2, s150: 3, s151: 3 }[one('size')] ?? 0) +
    ({ owner: 2, head: 1 }[one('role')] ?? 0) +
    ({ now: 2, month: 1 }[one('start')] ?? 0) +
    (a.link?.some(x => x !== 'none') ? 1 : 0);
  return score >= 5 ? 'A' : score >= 3 ? 'B' : 'C';
};

export const featuresFor = (a: Answers): Feature[] =>
  QUESTIONS.flatMap(q => q.options.filter(x => x.feature && a[q.id]?.includes(x.id)).map(x => x.feature as Feature));

/** строка для письма: вопрос — ответ */
export const summaryFor = (a: Answers): string =>
  QUESTIONS.map(q => `${q.q} ${q.options.filter(x => a[q.id]?.includes(x.id)).map(x => x.label).join(', ')}`).join(' | ');

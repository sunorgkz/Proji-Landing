/**
 * Тексты лендинга /board на четырёх языках.
 * ru — из документа «Лендинг Proji: 10 концепций» (концепция №1 + общие блоки).
 * kk, en, ar — перевод; перед публикацией kk и ar должен вычитать носитель языка.
 * Данные во фрагментах интерфейса (имена, сроки, цифры) — примерные, это ИЛЛЮСТРАЦИЯ.
 */

export type Lang = 'ru' | 'kk' | 'en' | 'ar';
export const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'kk', short: 'KZ', name: 'Қазақша' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ar', short: 'AR', name: 'العربية' },
];

export type Tone = 'ok' | 'warn' | 'check';
type Pic = 'phone' | 'manager' | 'video';
export type Frame =
  | { kind: 'chat'; who: string; text: string; strip: string }
  | { kind: 'task'; title: string; meta: string; strip: string }
  | { kind: 'kpi'; value: string; text: string; strip: string }
  | { kind: 'list'; title: string; items: string[]; strip: string }
  | { kind: 'pic'; pic: Pic; alt: string; strip: string };

export interface Copy {
  title: string;
  auditMessage: string;
  nav: { board: string; how: string; inside: string; cases: string; login: string; menu: string; pricing: string; faq: string; cta: string; lang: string };
  hero: { line1: string; line2: string; sub: string; cta: string; trial: string; note: string; astanaAlt: string };
  cols: Frame[][];
  midKpi: Frame;
  board: {
    h: string;
    lead: string;
    rows: { name: string; dir: string; owner: string; due: string; status: string; tone: Tone; detail?: string }[];
    detail: (dir: string, owner: string, due: string) => string;
    label: string;
  };
  how: { h: string; lead: string; steps: { title: string; text: string; example: string }[]; mapH: string; map: [string, string][]; agent: string };
  inside: {
    h: string;
    live: {
      label: string;
      sample: string;
      created: string;
      check: string;
      notFound: string;
      who: string;
      due: string;
      project: string;
      unset: string;
      general: string;
      projects: [RegExp, string][];
      deadline: RegExp;
    };
    tiles: {
      live: [string, string];
      signals: [string, string];
      risk: string;
      people: [string, string];
      toggle: [string, string];
      meetings: [string, string];
      digest: [string, string];
      digestAlt: string;
      contractors: [string, string];
      control: [string, string];
      safe: string[];
    };
  };
  cases: { h: string; items: { name: string; text: string }[]; photo: [string, string]; photoAlt: string };
  pricing: { h: string; plans: string[]; rows: [string, string[]][]; start: string; talk: string };
  faq: { h: string; items: { q: string; a: string }[] };
  cta: { h: string; text: string; photoAlt: string };
  foot: { address: string; login: string; credits: string; logos: string };
}

const ru: Copy = {
  title: 'proji — руководитель видит всё, команда знает, что делать',
  auditMessage: 'Здравствуйте! Хочу бесплатный AI-аудит компании.',
  nav: { board: 'Как выглядит', how: 'Как работает', inside: "Что внутри", cases: "Клиенты", login: "Войти", menu: "Меню", pricing: 'Тарифы', faq: 'Вопросы', cta: 'AI-аудит бесплатно', lang: 'Язык' },
  hero: {
    line1: 'Руководитель видит всё.',
    line2: 'Команда знает, что делать.',
    sub: "Вы и команда переписываетесь в WhatsApp и Telegram, как обычно. Proji сам превращает договорённости в задачи, следит за сроками и каждое утро показывает вам, что сделано и что горит.",
    cta: 'Получить бесплатный AI-аудит',
    trial: 'Попробовать 14 дней бесплатно',
    note: 'Иллюстрация: фрагменты интерфейса Proji на примерных данных',
    astanaAlt: "Астана ночью, набережная и мост",
  },
  cols: [
    [
      { kind: 'chat', who: 'Айгерим', text: 'Ержан, подготовь КП для «Арман-Строй» до четверга', strip: 'WhatsApp · Отдел продаж' },
      { kind: 'pic', pic: 'video', alt: '', strip: 'Пишут, как привыкли' },
      { kind: 'task', title: 'Подготовить КП для «Арман-Строй»', meta: 'Ержан · до четверга', strip: 'Задача из чата' },
    ],
    [
      { kind: 'pic', pic: 'phone', alt: "Рука с телефоном, открыт мессенджер", strip: 'Договорились в чате' },
      { kind: 'list', title: 'Планёрка 09:30', items: ['Решений: 3', 'Задач поставлено: 5', 'Протокол разослан'], strip: 'Протокол встречи' },
      { kind: 'chat', who: 'Данияр', text: 'Счёт оплатили, жду доступы', strip: 'Telegram · Клиенты' },
    ],
    [
      { kind: 'task', title: 'Согласовать договор аренды', meta: 'Ждёт 6 дней · риск срыва', strip: 'Сигнал риска' },
      { kind: 'pic', pic: 'manager', alt: "Руководитель с кофе читает сообщение в телефоне", strip: 'Руководитель видит всё' },
      { kind: 'kpi', value: '2', text: 'проекта требуют вашего решения', strip: 'Сводка на утро' },
    ],
    [
      { kind: 'list', title: 'Агент «Дайджест руководителю»', items: ['Прочитал 12 чатов', 'Нашёл 3 отклонения', 'Сводка отправлена'], strip: 'Журнал агента' },
      { kind: 'task', title: 'Пресс-релиз о форуме клубов', meta: 'Агент «Контент-мейкер» · сегодня', strip: 'Поручено агенту' },
      { kind: 'chat', who: 'Мадина', text: 'Поставка на объект сдвигается на пятницу', strip: 'WhatsApp · Операции' },
    ],
  ],
  midKpi: { kind: 'kpi', value: '34', text: 'задачи собраны из чатов за неделю', strip: 'Автосбор' },
  board: {
    h: 'Вся компания на одном экране',
    lead: 'Направления, проекты и задачи — от общей картины до одной карточки. Нажмите на строку.',
    label: 'Иллюстрация: проекты компании на примерных данных',
    rows: [
      { name: 'Тендер на поставку', dir: 'Продажи', owner: 'Ержан', due: '14 ноября', status: 'По плану', tone: 'ok' },
      { name: 'Весенняя кампания', dir: 'Маркетинг', owner: 'Агент «Контент-мейкер»', due: '20 ноября', status: 'По плану', tone: 'ok' },
      { name: 'Найм в отдел продаж', dir: 'Команда', owner: 'Сауле', due: '28 ноября', status: 'По плану', tone: 'ok' },
      { name: 'Запуск филиала', dir: 'Операции', owner: 'Мадина', due: '1 декабря', status: 'Риск', tone: 'warn', detail: 'Договор аренды на согласовании 6 дней, у ответственного 14 открытых задач. Следующий шаг: передать согласование юристу и напомнить арендодателю.' },
      { name: 'Годовой отчёт клубам', dir: 'Проекты', owner: 'Агент «Дайджест»', due: '5 декабря', status: 'Проверить', tone: 'check' },
      { name: 'Поставка на объект', dir: 'Операции', owner: 'Бауыржан', due: '8 декабря', status: 'Сдвиг', tone: 'warn' },
      { name: 'Обновление прайса', dir: 'Продажи', owner: 'Айгерим', due: '10 декабря', status: 'По плану', tone: 'ok' },
    ],
    detail: (dir, owner, due) => `${dir} · ответственный ${owner} · срок ${due}. Статус собран из переписки и задач проекта, без отчётов.`,
  },
  how: {
    h: "Как это работает на одном примере",
    lead: "Следите за одним сообщением: от чата до сводки руководителю.",
    steps: [
      { title: "Вы пишете в чат, как обычно", text: "Ничего нового осваивать не надо. Команда общается в WhatsApp и Telegram, как и раньше.", example: "Ержан, подготовь КП для «Арман-Строй» до четверга" },
      { title: "Proji читает и понимает", text: "Он находит в сообщении три вещи: кто делает, что делает и к какому дню.", example: "Кто: Ержан · Что: КП · Когда: четверг" },
      { title: "Появляется задача", text: "Карточка сама попадает в нужный проект. Никто ничего не заполнял.", example: "Задача у Ержана, срок: четверг" },
      { title: "Proji следит за сроком", text: "Сам напоминает исполнителю. Если задача зависла, заранее предупреждает вас.", example: "Среда: «Ержан, КП завтра. Успеваешь?»" },
      { title: "Утром вы видите всё", text: "Одна сводка вместо десятков чатов: что сделано, что горит, где нужно ваше решение.", example: "Сделано: 12 · Горит: 2 · Ваше решение: 1" },
    ],
    mapH: "Что из чего получается",
    map: [
      ["Сообщение в чате", "Задача с исполнителем и сроком"],
      ["Планёрка или созвон", "Протокол и задачи каждому участнику"],
      ["Просрочка или молчание исполнителя", "Предупреждение руководителю и подсказка, что делать"],
      ["Все задачи за день", "Утренняя сводка, у каждого своя"],
      ["Переписка и документы", "Ответы на вопросы о компании со ссылкой на источник"],
      ["Поручение AI-агенту", "Готовая работа и запись о каждом его шаге"],
    ],
    agent: "AI-агент — это программа-помощник. Ей можно поручить задачу, как сотруднику: например, написать протокол или собрать отчёт.",
  },
  inside: {
    h: 'Что внутри Proji',
    live: {
      label: 'Сообщение в рабочем чате',
      sample: 'Ержан, подготовь КП для «Арман-Строй» до четверга',
      created: 'Задача создана',
      check: 'Проверить',
      notFound: 'Задача не найдена',
      who: 'Исполнитель',
      due: 'Срок',
      project: 'Проект',
      unset: 'не указан',
      general: 'Общие задачи',
      projects: [
        [/кп|счёт|счет|клиент|договор|сделк|оплат/i, 'Продажи'],
        [/отч[её]т|пресс|пост|кампани|сайт/i, 'Маркетинг'],
        [/поставк|склад|достав|ремонт|объект/i, 'Операции'],
        [/собеседован|ваканси|отпуск|сотрудник/i, 'Команда'],
      ],
      deadline: /\s*(?:до|к)\s+(?:понедельника|вторника|среды|четверга|пятницы|субботы|воскресенья|завтра|вечера|обеда|конца недели|\d{1,2}[./]\d{1,2}|\d{1,2}\s+[а-яё]+)|\s*(?:завтра|сегодня)/i,
    },
    tiles: {
      live: ["Задачи сами появляются из чатов.", "Напишите сообщение выше и посмотрите, что получится. Если Proji не уверен, он пометит «проверить»."],
      signals: ["Предупреждает заранее.", "Если задача зависла или человек перегружен, вы узнаёте сразу и видите, что делать."],
      risk: 'Риск',
      people: ["Людям и AI-агентам.", "Задачу можно дать сотруднику или программе-помощнику. Виден каждый их шаг."],
      toggle: ['Сотрудник', 'Агент'],
      meetings: ["Планёрка сама становится протоколом.", "Кто что решил, кто что делает и к какому сроку."],
      digest: ['Сводка на утро.', 'Что сделано, что горит и где нужно ваше решение. Сотрудник получает свою, руководитель — по всей компании.'],
      digestAlt: "Руководитель работает за столом",
      contractors: ['Подрядчики и клиенты.', 'В системе, с доступом только к своему.'],
      control: ['Контроль.', 'Границы задаёте вы.'],
      safe: ['Каждый видит только свои направления и проекты', 'Рискованные действия — только с подтверждением', 'Каждое действие людей и агентов — в журнале'],
    },
  },
  cases: {
    h: 'Где Proji уже работает',
    items: [
      { name: 'Федерация клубов ЮНЕСКО', text: 'Координация клубов, автоматические отчёты и пресс-релизы.' },
      { name: 'Технопарк Нархоз', text: 'Координация работы стартапов.' },
      { name: 'Университет им. Жубанова', text: 'Допуск сотрудников к опасным работам.' },
      { name: 'Издательство «Дарын»', text: 'Координация рабочих процессов.' },
    ],
    photo: ['Sunnet Business Technologies.', '15 лет внедряем IT-решения.'],
    photoAlt: 'Актобе, снимок со спутника',
  },
  pricing: {
    h: 'Тарифы',
    plans: ['Бесплатно', 'Команда', 'С AI-агентами', 'Enterprise'],
    rows: [
      ['Цена', ['0 ₸', 'от 9 900 ₸ в месяц', 'от 49 900 ₸ в месяц', 'По договорённости']],
      ['Пользователи', ['До 5', 'По тарифу', 'По тарифу', 'По договорённости']],
      ['AI-агенты и сценарии', ['Не входят', 'Не входят', 'Входят', 'По договорённости']],
      ['Пробный период', ['Не нужен', '14 дней', '14 дней', 'По договорённости']],
      ['Оплата', ['—', 'За месяц или за год', 'За месяц или за год', 'По договору']],
    ],
    start: 'Начать',
    talk: 'Обсудить',
  },
  faq: {
    h: 'Частые сомнения',
    items: [
      { q: 'Команда не будет пользоваться новой системой', a: 'И не нужно: сотрудники продолжают писать в WhatsApp и Telegram, а Proji собирает из этого задачи.' },
      { q: 'У нас уже есть CRM', a: 'Proji работает рядом и берёт на себя координацию исполнения. Интеграции с CRM и 1С подключаются отдельно.' },
      { q: 'AI наделает ошибок', a: 'Спорные задачи помечаются «проверить», рискованные действия выполняются только с подтверждением, всё записано в журнал.' },
      { q: 'А наши данные?', a: 'Каждый видит только свои направления и проекты. AI-агент действует в рамках прав пользователя, каждое действие людей и агентов — в журнале.' },
      { q: 'Агенты действуют без нашего контроля?', a: 'Границы задаёте вы: агент работает в рамках прав пользователя и лимита расходов и спрашивает подтверждения перед рискованными шагами.' },
      { q: 'Можно подключить подрядчиков и клиентов?', a: 'Да. Они работают в той же системе и видят только свою часть работы.' },
    ],
  },
  cta: {
    h: 'Бесплатный AI-аудит',
    text: 'Разберём, где в вашей компании теряются задачи и время, и покажем, что возьмут на себя Proji и AI-агенты.',
    photoAlt: "Астана вечером, вид на центр города",
  },
  foot: { address: 'Sunnet Business Technologies', login: 'Войти', credits: "Фото и видео:", logos: "Логотипы принадлежат их владельцам." },
};

const kk: Copy = {
  title: 'proji — басшы бәрін көреді, команда не істеу керегін біледі',
  auditMessage: 'Сәлеметсіз бе! Компанияға тегін AI-аудит алғым келеді.',
  nav: { board: 'Көрінісі', how: 'Қалай жұмыс істейді', inside: "Ішінде не бар", cases: "Клиенттер", login: "Кіру", menu: "Мәзір", pricing: 'Тарифтер', faq: 'Сұрақтар', cta: 'Тегін AI-аудит', lang: 'Тіл' },
  hero: {
    line1: 'Басшы бәрін көреді.',
    line2: 'Команда не істеу керегін біледі.',
    sub: "Сіз және команда WhatsApp пен Telegram-да әдеттегідей жазысасыздар. Proji келісімдерді өзі тапсырмаға айналдырады, мерзімдерді қадағалайды және әр таң сайын не істелгенін, не шұғыл екенін көрсетеді.",
    cta: 'Тегін AI-аудит алу',
    trial: '14 күн тегін қолданып көру',
    note: 'Иллюстрация: Proji интерфейсінің үзінділері, мысал деректермен',
    astanaAlt: "Түнгі Астана, жағалау мен көпір",
  },
  cols: [
    [
      { kind: 'chat', who: 'Айгерім', text: 'Ержан, «Арман-Строй» үшін КҰ-ны бейсенбіге дейін дайында', strip: 'WhatsApp · Сату бөлімі' },
      { kind: 'pic', pic: 'video', alt: '', strip: 'Әдеттегідей жазады' },
      { kind: 'task', title: '«Арман-Строй» үшін КҰ дайындау', meta: 'Ержан · бейсенбіге дейін', strip: 'Чаттан тапсырма' },
    ],
    [
      { kind: 'pic', pic: 'phone', alt: "Телефон ұстаған қол, мессенджер ашық", strip: 'Чатта келісті' },
      { kind: 'list', title: 'Жиналыс 09:30', items: ['Шешімдер: 3', 'Қойылған тапсырмалар: 5', 'Хаттама жіберілді'], strip: 'Кездесу хаттамасы' },
      { kind: 'chat', who: 'Данияр', text: 'Шот төленді, қолжетімділікті күтемін', strip: 'Telegram · Клиенттер' },
    ],
    [
      { kind: 'task', title: 'Жалға алу шартын келісу', meta: '6 күн күтуде · мерзім бұзылу қаупі', strip: 'Тәуекел сигналы' },
      { kind: 'pic', pic: 'manager', alt: "Басшы кофе ішіп, телефоннан хабарлама оқып тұр", strip: 'Басшы бәрін көреді' },
      { kind: 'kpi', value: '2', text: 'жоба сіздің шешіміңізді күтуде', strip: 'Таңғы шолу' },
    ],
    [
      { kind: 'list', title: '«Басшыға дайджест» агенті', items: ['12 чат оқылды', '3 ауытқу табылды', 'Шолу жіберілді'], strip: 'Агент журналы' },
      { kind: 'task', title: 'Клубтар форумы туралы пресс-релиз', meta: '«Контент-мейкер» агенті · бүгін', strip: 'Агентке тапсырылды' },
      { kind: 'chat', who: 'Мадина', text: 'Нысанға жеткізу жұмаға ауысады', strip: 'WhatsApp · Операциялар' },
    ],
  ],
  midKpi: { kind: 'kpi', value: '34', text: 'тапсырма аптасына чаттардан жиналды', strip: 'Автожинақ' },
  board: {
    h: 'Бүкіл компания бір экранда',
    lead: 'Бағыттар, жобалар мен тапсырмалар — жалпы көріністен бір карточкаға дейін. Жолды басыңыз.',
    label: 'Иллюстрация: компания жобалары, мысал деректермен',
    rows: [
      { name: 'Жеткізу тендері', dir: 'Сату', owner: 'Ержан', due: '14 қараша', status: 'Жоспар бойынша', tone: 'ok' },
      { name: 'Көктемгі науқан', dir: 'Маркетинг', owner: '«Контент-мейкер» агенті', due: '20 қараша', status: 'Жоспар бойынша', tone: 'ok' },
      { name: 'Сату бөліміне жалдау', dir: 'Команда', owner: 'Сәуле', due: '28 қараша', status: 'Жоспар бойынша', tone: 'ok' },
      { name: 'Филиалды ашу', dir: 'Операциялар', owner: 'Мадина', due: '1 желтоқсан', status: 'Тәуекел', tone: 'warn', detail: 'Жалға алу шарты 6 күн бойы келісуде, жауаптыда 14 ашық тапсырма бар. Келесі қадам: келісуді заңгерге беру және жалға берушіге еске салу.' },
      { name: 'Клубтарға жылдық есеп', dir: 'Жобалар', owner: '«Дайджест» агенті', due: '5 желтоқсан', status: 'Тексеру', tone: 'check' },
      { name: 'Нысанға жеткізу', dir: 'Операциялар', owner: 'Бауыржан', due: '8 желтоқсан', status: 'Кешігу', tone: 'warn' },
      { name: 'Прайсты жаңарту', dir: 'Сату', owner: 'Айгерім', due: '10 желтоқсан', status: 'Жоспар бойынша', tone: 'ok' },
    ],
    detail: (dir, owner, due) => `${dir} · жауапты ${owner} · мерзімі ${due}. Мәртебе есептерсіз, хат алмасу мен жоба тапсырмаларынан жиналған.`,
  },
  how: {
    h: "Бір мысалмен қалай жұмыс істейді",
    lead: "Бір хабарламаны чаттан басшының шолуына дейін бақылаңыз.",
    steps: [
      { title: "Чатқа әдеттегідей жазасыз", text: "Жаңа ештеңе үйренудің қажеті жоқ. Команда WhatsApp пен Telegram-да бұрынғыдай сөйлеседі.", example: "Ержан, «Арман-Строй» үшін КҰ-ны бейсенбіге дейін дайында" },
      { title: "Proji оқып, түсінеді", text: "Хабарламадан үш нәрсені табады: кім істейді, не істейді және қай күнге дейін.", example: "Кім: Ержан · Не: КҰ · Қашан: бейсенбі" },
      { title: "Тапсырма пайда болады", text: "Карточка керекті жобаға өзі түседі. Ешкім ештеңе толтырған жоқ.", example: "Тапсырма Ержанда, мерзімі: бейсенбі" },
      { title: "Proji мерзімді қадағалайды", text: "Орындаушыға өзі еске салады. Тапсырма тоқтап қалса, сізге алдын ала ескертеді.", example: "Сәрсенбі: «Ержан, КҰ ертең. Үлгересің бе?»" },
      { title: "Таңертең бәрін көресіз", text: "Ондаған чаттың орнына бір шолу: не істелді, не шұғыл, қай жерде сіздің шешіміңіз керек.", example: "Істелді: 12 · Шұғыл: 2 · Шешіміңіз: 1" },
    ],
    mapH: "Неден не шығады",
    map: [
      ["Чаттағы хабарлама", "Орындаушысы мен мерзімі бар тапсырма"],
      ["Жиналыс немесе қоңырау", "Хаттама және әр қатысушыға тапсырма"],
      ["Кешігу немесе орындаушының үнсіздігі", "Басшыға ескерту және не істеу керегі туралы кеңес"],
      ["Күндегі барлық тапсырмалар", "Таңғы шолу, әркімге өзінікі"],
      ["Хат алмасу мен құжаттар", "Компания туралы сұрақтарға дереккөзі көрсетілген жауаптар"],
      ["AI-агентке тапсырма", "Дайын жұмыс және оның әр қадамының жазбасы"],
    ],
    agent: "AI-агент — бұл бағдарлама-көмекші. Оған қызметкерге сияқты тапсырма беруге болады: мысалы, хаттама жазу немесе есеп жинау.",
  },
  inside: {
    h: 'Proji ішінде не бар',
    live: {
      label: 'Жұмыс чатындағы хабарлама',
      sample: 'Ержан, «Арман-Строй» үшін КҰ-ны бейсенбіге дейін дайында',
      created: 'Тапсырма құрылды',
      check: 'Тексеру',
      notFound: 'Тапсырма табылмады',
      who: 'Орындаушы',
      due: 'Мерзімі',
      project: 'Жоба',
      unset: 'көрсетілмеген',
      general: 'Жалпы тапсырмалар',
      projects: [
        [/кұ|шот|клиент|келісімшарт|мәміле|төлем/i, 'Сату'],
        [/есеп|пресс|пост|науқан|сайт/i, 'Маркетинг'],
        [/жеткіз|қойма|нысан|жөндеу/i, 'Операциялар'],
        [/сұхбат|вакансия|демалыс|қызметкер/i, 'Команда'],
      ],
      deadline: /\s*(?:дүйсенбіге|сейсенбіге|сәрсенбіге|бейсенбіге|жұмаға|сенбіге|жексенбіге|ертеңге|кешке|\d{1,2}[./]\d{1,2})(?:\s+дейін)?|\s*(?:бүгін|ертең)/i,
    },
    tiles: {
      live: ["Тапсырмалар чаттан өзі пайда болады.", "Жоғарыға хабарлама жазып, не шығатынын көріңіз. Proji сенімді болмаса, «тексеру» деп белгілейді."],
      signals: ["Алдын ала ескертеді.", "Тапсырма тоқтап қалса немесе адам шамадан тыс жүктелсе, сіз бірден білесіз және не істеу керегін көресіз."],
      risk: 'Тәуекел',
      people: ["Адамдарға да, AI-агенттерге де.", "Тапсырманы қызметкерге немесе бағдарлама-көмекшіге беруге болады. Олардың әр қадамы көрінеді."],
      toggle: ['Қызметкер', 'Агент'],
      meetings: ["Жиналыс өзі хаттамаға айналады.", "Кім не шешті, кім не істейді және қай мерзімге дейін."],
      digest: ['Таңғы шолу.', 'Не істелді, не шұғыл және қай жерде сіздің шешіміңіз керек. Қызметкер өзінікін, басшы бүкіл компания бойынша алады.'],
      digestAlt: "Басшы үстел басында жұмыс істеп отыр",
      contractors: ['Мердігерлер мен клиенттер.', 'Жүйеде, тек өз бөлігіне қолжетімділікпен.'],
      control: ['Бақылау.', 'Шекараны сіз белгілейсіз.'],
      safe: ['Әркім тек өз бағыттары мен жобаларын көреді', 'Тәуекелді әрекеттер — тек растаумен', 'Адамдар мен агенттердің әр әрекеті — журналда'],
    },
  },
  cases: {
    h: 'Proji қай жерде жұмыс істеп жатыр',
    items: [
      { name: 'ЮНЕСКО клубтарының федерациясы', text: 'Клубтарды үйлестіру, автоматты есептер мен пресс-релиздер.' },
      { name: 'Нархоз технопаркі', text: 'Стартаптар жұмысын үйлестіру.' },
      { name: 'Жұбанов атындағы университет', text: 'Қызметкерлерді қауіпті жұмыстарға жіберу.' },
      { name: '«Дарын» баспасы', text: 'Жұмыс процестерін үйлестіру.' },
    ],
    photo: ['Sunnet Business Technologies.', '15 жыл бойы IT-шешімдер енгіземіз.'],
    photoAlt: 'Ақтөбе, спутниктен түсірілген сурет',
  },
  pricing: {
    h: 'Тарифтер',
    plans: ['Тегін', 'Команда', 'AI-агенттермен', 'Enterprise'],
    rows: [
      ['Бағасы', ['0 ₸', 'айына 9 900 ₸-ден', 'айына 49 900 ₸-ден', 'Келісім бойынша']],
      ['Пайдаланушылар', ['5-ке дейін', 'Тариф бойынша', 'Тариф бойынша', 'Келісім бойынша']],
      ['AI-агенттер мен сценарийлер', ['Кірмейді', 'Кірмейді', 'Кіреді', 'Келісім бойынша']],
      ['Сынақ мерзімі', ['Қажет емес', '14 күн', '14 күн', 'Келісім бойынша']],
      ['Төлем', ['—', 'Айлық немесе жылдық', 'Айлық немесе жылдық', 'Шарт бойынша']],
    ],
    start: 'Бастау',
    talk: 'Талқылау',
  },
  faq: {
    h: 'Жиі туатын күмәндар',
    items: [
      { q: 'Команда жаңа жүйені қолданбайды', a: 'Қажеті де жоқ: қызметкерлер WhatsApp пен Telegram-да жазуды жалғастырады, ал Proji олардан тапсырмалар жинайды.' },
      { q: 'Бізде CRM бар ғой', a: 'Proji қатар жұмыс істеп, орындауды үйлестіруді өзіне алады. CRM және 1С интеграциялары бөлек қосылады.' },
      { q: 'AI қателеседі', a: 'Күмәнді тапсырмалар «тексеру» деп белгіленеді, тәуекелді әрекеттер тек растаумен орындалады, бәрі журналға жазылады.' },
      { q: 'Ал біздің деректер ше?', a: 'Әркім тек өз бағыттары мен жобаларын көреді. AI-агент пайдаланушы құқықтары шегінде әрекет етеді, адамдар мен агенттердің әр әрекеті журналда.' },
      { q: 'Агенттер біздің бақылаусыз әрекет ете ме?', a: 'Шекараны сіз белгілейсіз: агент пайдаланушы құқықтары мен шығын лимиті шегінде жұмыс істейді және тәуекелді қадамдар алдында растау сұрайды.' },
      { q: 'Мердігерлер мен клиенттерді қосуға бола ма?', a: 'Иә. Олар сол жүйеде жұмыс істейді және жұмыстың тек өз бөлігін көреді.' },
    ],
  },
  cta: {
    h: 'Тегін AI-аудит',
    text: 'Компанияңызда тапсырмалар мен уақыт қай жерде жоғалатынын талдап, Proji мен AI-агенттер нені өзіне алатынын көрсетеміз.',
    photoAlt: "Кешкі Астана, қала орталығы",
  },
  foot: { address: 'Sunnet Business Technologies', login: 'Кіру', credits: "Фото мен бейне:", logos: "Логотиптер олардың иелеріне тиесілі." },
};

const en: Copy = {
  title: 'proji — leaders see everything, the team knows what to do',
  auditMessage: 'Hello! I would like a free AI audit for my company.',
  nav: { board: 'Overview', how: 'How it works', inside: "Inside", cases: "Clients", login: "Log in", menu: "Menu", pricing: 'Pricing', faq: 'FAQ', cta: 'Free AI audit', lang: 'Language' },
  hero: {
    line1: 'Leaders see everything.',
    line2: 'The team knows what to do.',
    sub: "You and your team keep chatting in WhatsApp and Telegram as usual. Proji turns what you agree on into tasks, watches the deadlines, and every morning shows you what’s done and what’s urgent.",
    cta: 'Get a free AI audit',
    trial: 'Try free for 14 days',
    note: 'Illustration: Proji interface fragments with sample data',
    astanaAlt: "Astana at night, the embankment and a bridge",
  },
  cols: [
    [
      { kind: 'chat', who: 'Aigerim', text: 'Yerzhan, prepare the quote for Arman-Stroy by Thursday', strip: 'WhatsApp · Sales team' },
      { kind: 'pic', pic: 'video', alt: '', strip: 'They write as they always do' },
      { kind: 'task', title: 'Prepare the quote for Arman-Stroy', meta: 'Yerzhan · by Thursday', strip: 'Task from chat' },
    ],
    [
      { kind: 'pic', pic: 'phone', alt: "A hand holding a phone with a messenger open", strip: 'Agreed in chat' },
      { kind: 'list', title: 'Stand-up 09:30', items: ['Decisions: 3', 'Tasks assigned: 5', 'Minutes sent'], strip: 'Meeting minutes' },
      { kind: 'chat', who: 'Daniyar', text: 'Invoice paid, waiting for access', strip: 'Telegram · Clients' },
    ],
    [
      { kind: 'task', title: 'Approve the lease agreement', meta: 'Waiting 6 days · deadline at risk', strip: 'Risk alert' },
      { kind: 'pic', pic: 'manager', alt: "A manager with coffee reading a message on his phone", strip: 'Leaders see everything' },
      { kind: 'kpi', value: '2', text: 'projects need your decision', strip: 'Morning digest' },
    ],
    [
      { kind: 'list', title: '“Leader digest” agent', items: ['Read 12 chats', 'Found 3 deviations', 'Digest sent'], strip: 'Agent log' },
      { kind: 'task', title: 'Press release on the clubs forum', meta: '“Content maker” agent · today', strip: 'Assigned to an agent' },
      { kind: 'chat', who: 'Madina', text: 'Site delivery moves to Friday', strip: 'WhatsApp · Operations' },
    ],
  ],
  midKpi: { kind: 'kpi', value: '34', text: 'tasks collected from chats this week', strip: 'Auto-capture' },
  board: {
    h: 'Your whole company on one screen',
    lead: 'Departments, projects and tasks, from the big picture down to a single card. Tap a row.',
    label: 'Illustration: company projects with sample data',
    rows: [
      { name: 'Supply tender', dir: 'Sales', owner: 'Yerzhan', due: 'Nov 14', status: 'On track', tone: 'ok' },
      { name: 'Spring campaign', dir: 'Marketing', owner: '“Content maker” agent', due: 'Nov 20', status: 'On track', tone: 'ok' },
      { name: 'Hiring for sales', dir: 'Team', owner: 'Saule', due: 'Nov 28', status: 'On track', tone: 'ok' },
      { name: 'Branch launch', dir: 'Operations', owner: 'Madina', due: 'Dec 1', status: 'At risk', tone: 'warn', detail: 'The lease has been awaiting approval for 6 days, and the owner has 14 open tasks. Next step: hand the approval to the lawyer and remind the landlord.' },
      { name: 'Annual report to clubs', dir: 'Projects', owner: '“Digest” agent', due: 'Dec 5', status: 'Review', tone: 'check' },
      { name: 'Site delivery', dir: 'Operations', owner: 'Bauyrzhan', due: 'Dec 8', status: 'Delayed', tone: 'warn' },
      { name: 'Price list update', dir: 'Sales', owner: 'Aigerim', due: 'Dec 10', status: 'On track', tone: 'ok' },
    ],
    detail: (dir, owner, due) => `${dir} · owner ${owner} · due ${due}. Status is collected from chats and project tasks, no reports needed.`,
  },
  how: {
    h: "How it works, on one example",
    lead: "Follow a single message from the chat to the leader’s digest.",
    steps: [
      { title: "You write in the chat as usual", text: "There is nothing new to learn. Your team keeps talking in WhatsApp and Telegram.", example: "Yerzhan, prepare the quote for Arman-Stroy by Thursday" },
      { title: "Proji reads and understands", text: "It finds three things in the message: who does it, what to do, and by which day.", example: "Who: Yerzhan · What: quote · When: Thursday" },
      { title: "A task appears", text: "The card lands in the right project by itself. Nobody filled anything in.", example: "Task with Yerzhan, due Thursday" },
      { title: "Proji watches the deadline", text: "It reminds the assignee by itself. If a task gets stuck, it warns you in advance.", example: "Wednesday: “Yerzhan, the quote is due tomorrow. On track?”" },
      { title: "In the morning you see everything", text: "One digest instead of dozens of chats: what’s done, what’s urgent, where your decision is needed.", example: "Done: 12 · Urgent: 2 · Your decision: 1" },
    ],
    mapH: "What turns into what",
    map: [
      ["A message in a chat", "A task with an assignee and a deadline"],
      ["A stand-up or a call", "Minutes, and tasks for each participant"],
      ["Overdue work or a silent assignee", "A warning to the leader, with a hint on what to do"],
      ["All the day’s tasks", "A morning digest, personal for everyone"],
      ["Chats and documents", "Answers about your company, with a link to the source"],
      ["A task given to an AI agent", "Finished work, and a record of every step"],
    ],
    agent: "An AI agent is a software helper. You can give it a task just as you would an employee: for example, writing minutes or putting together a report.",
  },
  inside: {
    h: 'What’s inside Proji',
    live: {
      label: 'A message in a work chat',
      sample: 'Yerzhan, prepare the quote for Arman-Stroy by Thursday',
      created: 'Task created',
      check: 'Review',
      notFound: 'No task found',
      who: 'Assignee',
      due: 'Due',
      project: 'Project',
      unset: 'not set',
      general: 'General',
      projects: [
        [/quote|invoice|client|contract|deal|payment/i, 'Sales'],
        [/report|press|post|campaign|website/i, 'Marketing'],
        [/deliver|warehouse|site|repair|supply/i, 'Operations'],
        [/interview|vacanc|hiring|leave|employee/i, 'Team'],
      ],
      deadline: /\s*(?:by|until|before)\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|tonight|noon|end of (?:day|week)|\d{1,2}[./]\d{1,2})|\s*(?:today|tomorrow)/i,
    },
    tiles: {
      live: ["Tasks appear from chats by themselves.", "Type a message above and see what happens. If Proji isn’t sure, it marks it “review”."],
      signals: ["It warns you in advance.", "If a task gets stuck or someone is overloaded, you know right away and see what to do."],
      risk: 'Risk',
      people: ["For people and AI agents.", "Give a task to an employee or a software helper. Every step they take is visible."],
      toggle: ['Employee', 'Agent'],
      meetings: ["A meeting becomes minutes by itself.", "Who decided what, who does what, and by when."],
      digest: ['Morning digest.', 'What’s done, what’s urgent and where your decision is needed. Each employee gets their own; leaders get the whole company.'],
      digestAlt: "A manager working at a desk",
      contractors: ['Contractors and clients.', 'Inside the system, seeing only their part.'],
      control: ['Control.', 'You set the limits.'],
      safe: ['Everyone sees only their own departments and projects', 'Risky actions only with confirmation', 'Every action by people and agents is logged'],
    },
  },
  cases: {
    h: 'Where Proji already works',
    items: [
      { name: 'Federation of UNESCO Clubs', text: 'Club coordination, automatic reports and press releases.' },
      { name: 'Narxoz Technopark', text: 'Coordinating startup work.' },
      { name: 'Zhubanov University', text: 'Clearing staff for hazardous work.' },
      { name: 'Daryn Publishing', text: 'Coordinating workflows.' },
    ],
    photo: ['Sunnet Business Technologies.', '15 years delivering IT solutions.'],
    photoAlt: 'Aktobe, satellite image',
  },
  pricing: {
    h: 'Pricing',
    plans: ['Free', 'Team', 'With AI agents', 'Enterprise'],
    rows: [
      ['Price', ['₸0', 'from ₸9,900/month', 'from ₸49,900/month', 'Custom']],
      ['Users', ['Up to 5', 'Per plan', 'Per plan', 'Custom']],
      ['AI agents and scenarios', ['Not included', 'Not included', 'Included', 'Custom']],
      ['Free trial', ['Not needed', '14 days', '14 days', 'Custom']],
      ['Billing', ['—', 'Monthly or yearly', 'Monthly or yearly', 'By contract']],
    ],
    start: 'Start',
    talk: 'Talk to us',
  },
  faq: {
    h: 'Common doubts',
    items: [
      { q: 'The team won’t use a new system', a: 'They don’t have to: people keep writing in WhatsApp and Telegram, and Proji turns that into tasks.' },
      { q: 'We already have a CRM', a: 'Proji works alongside it and takes over coordinating execution. CRM and 1C integrations connect separately.' },
      { q: 'AI will make mistakes', a: 'Doubtful tasks are flagged “review”, risky actions run only with confirmation, and everything is logged.' },
      { q: 'What about our data?', a: 'Everyone sees only their own departments and projects. AI agents act within the user’s permissions, and every action by people and agents is logged.' },
      { q: 'Do agents act without our control?', a: 'You set the limits: an agent works within the user’s permissions and spending limit, and asks for confirmation before risky steps.' },
      { q: 'Can we bring in contractors and clients?', a: 'Yes. They work in the same system and see only their part of the work.' },
    ],
  },
  cta: {
    h: 'Free AI audit',
    text: 'We’ll find where tasks and time get lost in your company and show what Proji and AI agents can take over.',
    photoAlt: "Astana in the evening, a view of the city center",
  },
  foot: { address: 'Sunnet Business Technologies', login: 'Log in', credits: "Photos and video:", logos: "Logos belong to their owners." },
};

const ar: Copy = {
  title: 'proji — المدير يرى كل شيء، والفريق يعرف ما عليه فعله',
  auditMessage: 'مرحبًا! أرغب في تدقيق مجاني بالذكاء الاصطناعي لشركتي.',
  nav: { board: 'نظرة عامة', how: 'كيف يعمل', inside: "ماذا بالداخل", cases: "العملاء", login: "تسجيل الدخول", menu: "القائمة", pricing: 'الأسعار', faq: 'الأسئلة', cta: 'تدقيق مجاني', lang: 'اللغة' },
  hero: {
    line1: 'المدير يرى كل شيء.',
    line2: 'والفريق يعرف ما عليه فعله.',
    sub: "تواصل أنت وفريقك المراسلة في WhatsApp وTelegram كالمعتاد. يحوّل Proji ما تتفقون عليه إلى مهام، ويتابع المواعيد، ويعرض لك كل صباح ما أُنجز وما هو عاجل.",
    cta: 'احصل على تدقيق مجاني بالذكاء الاصطناعي',
    trial: 'جرّب مجانًا لمدة 14 يومًا',
    note: 'رسم توضيحي: أجزاء من واجهة Proji ببيانات تجريبية',
    astanaAlt: "أستانا ليلًا، الكورنيش والجسر",
  },
  cols: [
    [
      { kind: 'chat', who: 'أيغريم', text: 'إرجان، جهّز عرض السعر لشركة «آرمان-ستروي» قبل الخميس', strip: 'WhatsApp · قسم المبيعات' },
      { kind: 'pic', pic: 'video', alt: '', strip: 'يكتبون كما اعتادوا' },
      { kind: 'task', title: 'تجهيز عرض السعر لشركة «آرمان-ستروي»', meta: 'إرجان · قبل الخميس', strip: 'مهمة من المحادثة' },
    ],
    [
      { kind: 'pic', pic: 'phone', alt: "يد تحمل هاتفًا وتطبيق المراسلة مفتوح", strip: 'اتفقنا في المحادثة' },
      { kind: 'list', title: 'اجتماع 09:30', items: ['القرارات: 3', 'المهام المسندة: 5', 'أُرسل المحضر'], strip: 'محضر الاجتماع' },
      { kind: 'chat', who: 'دانيار', text: 'تم دفع الفاتورة، بانتظار الوصول', strip: 'Telegram · العملاء' },
    ],
    [
      { kind: 'task', title: 'الموافقة على عقد الإيجار', meta: 'بانتظار منذ 6 أيام · خطر تأخير', strip: 'تنبيه خطر' },
      { kind: 'pic', pic: 'manager', alt: "مدير يحمل قهوة ويقرأ رسالة على هاتفه", strip: 'المدير يرى كل شيء' },
      { kind: 'kpi', value: '2', text: 'مشروعان بانتظار قرارك', strip: 'ملخص الصباح' },
    ],
    [
      { kind: 'list', title: 'وكيل «ملخص المدير»', items: ['قرأ 12 محادثة', 'وجد 3 انحرافات', 'أُرسل الملخص'], strip: 'سجل الوكيل' },
      { kind: 'task', title: 'بيان صحفي عن منتدى الأندية', meta: 'وكيل «صانع المحتوى» · اليوم', strip: 'مُسندة إلى وكيل' },
      { kind: 'chat', who: 'مادينا', text: 'تأجيل التوريد إلى الموقع حتى الجمعة', strip: 'WhatsApp · العمليات' },
    ],
  ],
  midKpi: { kind: 'kpi', value: '34', text: 'مهمة جُمعت من المحادثات هذا الأسبوع', strip: 'الجمع التلقائي' },
  board: {
    h: 'شركتك كلها على شاشة واحدة',
    lead: 'الأقسام والمشاريع والمهام، من الصورة الكاملة حتى بطاقة واحدة. اضغط على أي صف.',
    label: 'رسم توضيحي: مشاريع الشركة ببيانات تجريبية',
    rows: [
      { name: 'مناقصة توريد', dir: 'المبيعات', owner: 'إرجان', due: '14 نوفمبر', status: 'وفق الخطة', tone: 'ok' },
      { name: 'حملة الربيع', dir: 'التسويق', owner: 'وكيل «صانع المحتوى»', due: '20 نوفمبر', status: 'وفق الخطة', tone: 'ok' },
      { name: 'توظيف لقسم المبيعات', dir: 'الفريق', owner: 'ساولي', due: '28 نوفمبر', status: 'وفق الخطة', tone: 'ok' },
      { name: 'افتتاح فرع', dir: 'العمليات', owner: 'مادينا', due: '1 ديسمبر', status: 'خطر', tone: 'warn', detail: 'عقد الإيجار بانتظار الموافقة منذ 6 أيام، ولدى المسؤول 14 مهمة مفتوحة. الخطوة التالية: تحويل الموافقة إلى المحامي وتذكير المؤجر.' },
      { name: 'التقرير السنوي للأندية', dir: 'المشاريع', owner: 'وكيل «الملخص»', due: '5 ديسمبر', status: 'للمراجعة', tone: 'check' },
      { name: 'توريد إلى الموقع', dir: 'العمليات', owner: 'باورجان', due: '8 ديسمبر', status: 'متأخر', tone: 'warn' },
      { name: 'تحديث قائمة الأسعار', dir: 'المبيعات', owner: 'أيغريم', due: '10 ديسمبر', status: 'وفق الخطة', tone: 'ok' },
    ],
    detail: (dir, owner, due) => `${dir} · المسؤول ${owner} · الموعد ${due}. تُجمع الحالة من المحادثات ومهام المشروع، دون تقارير.`,
  },
  how: {
    h: "كيف يعمل، من خلال مثال واحد",
    lead: "تابع رسالة واحدة من المحادثة حتى ملخص المدير.",
    steps: [
      { title: "تكتب في المحادثة كالمعتاد", text: "لا حاجة لتعلّم شيء جديد. يواصل فريقك الحديث في WhatsApp وTelegram.", example: "إرجان، جهّز عرض السعر لشركة «آرمان-ستروي» قبل الخميس" },
      { title: "يقرأ Proji ويفهم", text: "يجد في الرسالة ثلاثة أشياء: من ينفّذ، وماذا ينفّذ، وحتى أي يوم.", example: "من: إرجان · ماذا: عرض السعر · متى: الخميس" },
      { title: "تظهر مهمة", text: "تصل البطاقة إلى المشروع الصحيح تلقائيًا. لم يملأ أحد شيئًا.", example: "المهمة لدى إرجان، الموعد: الخميس" },
      { title: "يتابع Proji الموعد", text: "يذكّر المنفّذ بنفسه. وإذا تعثرت المهمة، ينبهك مسبقًا.", example: "الأربعاء: «إرجان، عرض السعر غدًا. هل ستنجزه؟»" },
      { title: "في الصباح ترى كل شيء", text: "ملخص واحد بدل عشرات المحادثات: ما أُنجز، وما العاجل، وأين يلزم قرارك.", example: "أُنجز: 12 · عاجل: 2 · قرارك: 1" },
    ],
    mapH: "ما الذي يتحول إلى ماذا",
    map: [
      ["رسالة في المحادثة", "مهمة لها منفّذ وموعد"],
      ["اجتماع أو مكالمة", "محضر ومهام لكل مشارك"],
      ["تأخير أو صمت المنفّذ", "تنبيه للمدير مع اقتراح بما يجب فعله"],
      ["كل مهام اليوم", "ملخص صباحي خاص بكل شخص"],
      ["المحادثات والمستندات", "إجابات عن شركتك مع رابط للمصدر"],
      ["مهمة مسندة إلى وكيل ذكاء اصطناعي", "عمل منجز وسجل لكل خطوة"],
    ],
    agent: "وكيل الذكاء الاصطناعي هو برنامج مساعد. يمكنك إسناد مهمة إليه كما تسندها إلى موظف: مثل كتابة محضر أو إعداد تقرير.",
  },
  inside: {
    h: 'ماذا يوجد داخل Proji',
    live: {
      label: 'رسالة في محادثة العمل',
      sample: 'إرجان، جهّز عرض السعر لشركة «آرمان-ستروي» قبل الخميس',
      created: 'تم إنشاء المهمة',
      check: 'للمراجعة',
      notFound: 'لم يُعثر على مهمة',
      who: 'المنفّذ',
      due: 'الموعد',
      project: 'المشروع',
      unset: 'غير محدد',
      general: 'مهام عامة',
      projects: [
        [/عرض السعر|فاتورة|عميل|عقد|صفقة|دفع/, 'المبيعات'],
        [/تقرير|بيان|منشور|حملة|موقع إلكتروني/, 'التسويق'],
        [/توريد|مستودع|توصيل|صيانة|الموقع/, 'العمليات'],
        [/مقابلة|وظيفة|إجازة|موظف/, 'الفريق'],
      ],
      deadline: /\s*(?:قبل|حتى|بحلول)\s+(?:يوم\s+)?(?:الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت|الأحد|الغد|المساء|نهاية الأسبوع|\d{1,2}[./]\d{1,2})|\s*(?:اليوم|غدًا|غدا)/,
    },
    tiles: {
      live: ["تظهر المهام من المحادثات تلقائيًا.", "اكتب رسالة في الأعلى وشاهد النتيجة. وإذا لم يكن Proji متأكدًا، يضع علامة «للمراجعة»."],
      signals: ["ينبهك مسبقًا.", "إذا تعثرت مهمة أو كان أحدهم مثقلًا بالعمل، تعرف فورًا وترى ما يجب فعله."],
      risk: 'خطر',
      people: ["للأشخاص ووكلاء الذكاء الاصطناعي.", "أسند المهمة إلى موظف أو برنامج مساعد. كل خطوة مرئية."],
      toggle: ['موظف', 'وكيل'],
      meetings: ["يتحول الاجتماع إلى محضر تلقائيًا.", "من قرر ماذا، ومن ينفّذ ماذا، وحتى متى."],
      digest: ['ملخص الصباح.', 'ما الذي أُنجز، وما العاجل، وأين يلزم قرارك. يتلقى كل موظف ملخصه، والمدير ملخص الشركة كلها.'],
      digestAlt: "مدير يعمل على مكتبه",
      contractors: ['المقاولون والعملاء.', 'داخل النظام، ويرون جزءهم فقط.'],
      control: ['التحكم.', 'أنت من يضع الحدود.'],
      safe: ['يرى كلٌّ أقسامه ومشاريعه فقط', 'الإجراءات الحساسة بتأكيد فقط', 'كل إجراء للأشخاص والوكلاء مسجّل'],
    },
  },
  cases: {
    h: 'أين يعمل Proji بالفعل',
    items: [
      { name: 'اتحاد أندية اليونسكو', text: 'تنسيق الأندية، وتقارير وبيانات صحفية تلقائية.' },
      { name: 'حديقة نارخوز التكنولوجية', text: 'تنسيق عمل الشركات الناشئة.' },
      { name: 'جامعة جوبانوف', text: 'تصاريح الموظفين للأعمال الخطرة.' },
      { name: 'دار نشر «دارين»', text: 'تنسيق سير العمل.' },
    ],
    photo: ['Sunnet Business Technologies.', '15 عامًا في تنفيذ الحلول التقنية.'],
    photoAlt: 'أكتوبي، صورة بالقمر الصناعي',
  },
  pricing: {
    h: 'الأسعار',
    plans: ['مجاني', 'الفريق', 'مع وكلاء الذكاء الاصطناعي', 'المؤسسات'],
    rows: [
      ['السعر', ['0 ₸', 'من 9,900 ₸ شهريًا', 'من 49,900 ₸ شهريًا', 'حسب الاتفاق']],
      ['المستخدمون', ['حتى 5', 'حسب الخطة', 'حسب الخطة', 'حسب الاتفاق']],
      ['وكلاء الذكاء الاصطناعي والسيناريوهات', ['غير مشمولة', 'غير مشمولة', 'مشمولة', 'حسب الاتفاق']],
      ['الفترة التجريبية', ['غير مطلوبة', '14 يومًا', '14 يومًا', 'حسب الاتفاق']],
      ['الدفع', ['—', 'شهريًا أو سنويًا', 'شهريًا أو سنويًا', 'بموجب عقد']],
    ],
    start: 'ابدأ',
    talk: 'تواصل معنا',
  },
  faq: {
    h: 'مخاوف شائعة',
    items: [
      { q: 'الفريق لن يستخدم نظامًا جديدًا', a: 'ولا داعي لذلك: يواصل الموظفون الكتابة في WhatsApp وTelegram، ويحوّل Proji ذلك إلى مهام.' },
      { q: 'لدينا نظام CRM بالفعل', a: 'يعمل Proji إلى جانبه ويتولى تنسيق التنفيذ. تُربط تكاملات CRM و1C بشكل منفصل.' },
      { q: 'الذكاء الاصطناعي سيرتكب أخطاء', a: 'تُوسم المهام المشكوك فيها «للمراجعة»، ولا تُنفّذ الإجراءات الحساسة إلا بتأكيد، وكل شيء مسجّل.' },
      { q: 'وماذا عن بياناتنا؟', a: 'يرى كلٌّ أقسامه ومشاريعه فقط. يعمل الوكيل ضمن صلاحيات المستخدم، وكل إجراء للأشخاص والوكلاء مسجّل.' },
      { q: 'هل يعمل الوكلاء دون رقابتنا؟', a: 'أنت من يضع الحدود: يعمل الوكيل ضمن صلاحيات المستخدم وحد الإنفاق، ويطلب التأكيد قبل الخطوات الحساسة.' },
      { q: 'هل يمكن إضافة المقاولين والعملاء؟', a: 'نعم. يعملون في النظام نفسه ويرون جزءهم من العمل فقط.' },
    ],
  },
  cta: {
    h: 'تدقيق مجاني بالذكاء الاصطناعي',
    text: 'سنحدد أين تضيع المهام والوقت في شركتك، ونوضح ما يمكن أن يتولاه Proji ووكلاء الذكاء الاصطناعي.',
    photoAlt: "أستانا مساءً، منظر لوسط المدينة",
  },
  foot: { address: 'Sunnet Business Technologies', login: 'تسجيل الدخول', credits: "الصور والفيديو:", logos: "الشعارات مملوكة لأصحابها." },
};

export const COPY: Record<Lang, Copy> = { ru, kk, en, ar };

/* Страна по часовому поясу: Казахстан → kk/ru, арабские страны → ar, СНГ → ru. */
const KZ_TZ = ['Asia/Almaty', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Oral', 'Asia/Qostanay', 'Asia/Qyzylorda'];
const ARAB_TZ = [
  'Asia/Riyadh', 'Asia/Dubai', 'Asia/Qatar', 'Asia/Kuwait', 'Asia/Bahrain', 'Asia/Muscat', 'Asia/Aden', 'Asia/Baghdad',
  'Asia/Amman', 'Asia/Beirut', 'Asia/Damascus', 'Asia/Gaza', 'Asia/Hebron', 'Africa/Cairo', 'Africa/Khartoum',
  'Africa/Tripoli', 'Africa/Tunis', 'Africa/Algiers', 'Africa/Casablanca', 'Africa/Nouakchott',
];
const CIS_TZ = /^(Europe\/(Moscow|Minsk|Kaliningrad|Samara|Volgograd|Kirov|Astrakhan|Saratov|Ulyanovsk)|Asia\/(Bishkek|Tashkent|Samarkand|Dushanbe|Ashgabat|Yekaterinburg|Omsk|Novosibirsk|Krasnoyarsk|Irkutsk|Yakutsk|Vladivostok|Baku|Yerevan|Tbilisi))$/;

export function detectLang(): Lang {
  const browser = (typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : [])
    .map(l => l.slice(0, 2).toLowerCase());
  let tz = '';
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  } catch {
    /* старый браузер */
  }
  if (KZ_TZ.includes(tz)) return browser.includes('kk') ? 'kk' : browser[0] === 'en' ? 'en' : 'ru';
  if (ARAB_TZ.includes(tz)) return 'ar';
  if (CIS_TZ.test(tz)) return 'ru';
  const first = browser.find((l): l is Lang => l === 'ru' || l === 'kk' || l === 'en' || l === 'ar');
  return first ?? 'en';
}

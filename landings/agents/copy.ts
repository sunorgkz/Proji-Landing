import type { Lang } from '../board/copy';

/**
 * Тексты /agents на четырёх языках. Порядок мыслей — по примеру multica.ai, факты — из справки Proji и кода бэкенда.
 * kk и ar перед публикацией должен вычитать носитель языка.
 * Имена, время и цифры в примерах — примерные, это ИЛЛЮСТРАЦИЯ.
 */

type Pair = [string, string];

export interface AgentsCopy {
  title: string;
  nav: { team: string; run: string; teach: string; control: string };
  hero: { line1: string; line2: string; sub: string };
  team: {
    h: string;
    lead: string;
    label: string;
    task: string;
    assignee: string;
    humanTag: string;
    agentTag: string;
    points: Pair[];
    people: { name: string; agent: boolean; feed: string[] }[];
  };
  run: { h: string; lead: string; label: string; title: string; statuses: string[]; lines: string[]; confirm: string; doneLine: string; replay: string; fail: string };
  teach: { h: string; lead: string; getLabel: string; cards: { name: string; say: string; get: string }[] };
  control: {
    h: string;
    journal: Pair[];
    log: Pair;
    note: string;
    ask: string;
    confirm: Pair;
    toggle: Pair;
    rights: Pair;
    limit: Pair;
    photo: Pair;
    photoAlt: string;
    connect: Pair;
    never: string[];
    closed: Pair;
  };
  start: { h: string; lead: string; steps: { title: string; text: string; example: string }[] };
  faq: { h: string; items: { q: string; a: string }[] };
}

const ru: AgentsCopy = {
  title: 'proji — AI-агенты в одной команде с людьми',
  nav: { team: 'Агент в команде', run: 'Как работает', teach: 'Инструкции', control: 'Контроль' },
  hero: {
    line1: 'Следующие десять сотрудников',
    line2: 'могут быть не людьми.',
    sub: 'AI-агент — это программа-помощник. В Proji вы даёте ей задачу, как сотруднику, и видите каждый её шаг. Люди и агенты работают на одной доске.',
  },
  team: {
    h: 'Агенту можно дать задачу, как коллеге',
    lead: 'Выберите исполнителя и посмотрите, что будет с задачей.',
    label: 'Иллюстрация: задача на примерных данных',
    task: 'Протокол планёрки 09:30',
    assignee: 'Исполнитель',
    humanTag: 'сотрудник',
    agentTag: 'агент',
    points: [
      ['В одном списке с людьми.', 'Когда вы выбираете исполнителя, агент стоит рядом с сотрудниками.'],
      ['Сам рассказывает, как дела.', 'Агент пишет в задаче, что делает и что получилось. Спрашивать не нужно.'],
      ['Одна лента на всех.', 'Действия людей и агентов идут вместе. Сразу видно, кто что сделал.'],
    ],
    people: [
      { name: 'Ержан', agent: false, feed: ['Вы назначили Ержана', 'Ержан: «Сделаю после обеда»', 'Напоминание Ержану: срок сегодня'] },
      { name: 'Мадина', agent: false, feed: ['Вы назначили Мадину', 'Мадина: «Уже начала»', 'Мадина приложила файл'] },
      { name: 'Агент «Протокол»', agent: true, feed: ['Вы поручили задачу агенту', 'Агент читает запись планёрки', 'Агент: «Нашёл 3 решения и 5 задач. Посмотрите?»'] },
      { name: 'Агент «Дайджест»', agent: true, feed: ['Вы поручили задачу агенту', 'Агент собирает, что сделано', 'Агент: «Черновик готов. Посмотрите?»'] },
    ],
  },
  run: {
    h: 'Работает, пока вы заняты другим',
    lead: 'Вы дали задачу и ушли. Агент идёт шаг за шагом и пишет, что делает. Перед важным шагом он останавливается и спрашивает вас.',
    label: 'Иллюстрация: запуск агента на примерных данных',
    title: 'Агент «Протокол» · планёрка 09:30',
    statuses: ['В очереди', 'Работает', 'Ждёт вас', 'Готово'],
    lines: ['Взял задачу из очереди', 'Читаю запись планёрки', 'Нашёл 3 решения', 'Подготовил 5 задач для участников', 'Черновик готов. Нужно ваше подтверждение'],
    confirm: 'Подтвердить',
    doneLine: 'Задачи созданы, протокол разослан',
    replay: 'Показать ещё раз',
    fail: 'Если не получилось, агент так и напишет и покажет, на каком шаге остановился.',
  },
  teach: {
    h: 'Объясните один раз',
    lead: 'У каждого агента своя инструкция. Вы пишете её обычными словами, как новому сотруднику. Потом этим агентом пользуется вся команда.',
    getLabel: 'Что получаете',
    cards: [
      { name: 'Агент «Протокол»', say: 'Прочитай запись планёрки. Напиши, кто что решил и кто что делает к какому сроку.', get: 'Протокол и задачи каждому участнику' },
      { name: 'Агент «Дайджест»', say: 'Собери, что сделано, что горит и где нужно решение руководителя.', get: 'Одна короткая сводка вместо десятков чатов' },
      { name: 'Агент «Контент-мейкер»', say: 'Пиши пресс-релизы простым языком. Показывай черновик перед отправкой.', get: 'Готовый черновик на проверку' },
    ],
  },
  control: {
    h: 'Границы задаёте вы',
    journal: [
      ['09:32', 'Агент «Протокол» взял задачу'],
      ['09:34', 'Агент подготовил 5 задач'],
      ['09:35', 'Айгерим подтвердила черновик'],
      ['09:35', 'Задачи созданы'],
    ],
    log: ['Каждый шаг записан.', 'Кто что сделал и когда: человек или агент.'],
    note: 'Иллюстрация: журнал на примерных данных',
    ask: 'Да?',
    confirm: ['Важное — только с вашего согласия.', 'Рискованные шаги агент сам не делает.'],
    toggle: ['Чужое', 'Своё'],
    rights: ['Видит только то, что можно.', 'Чужие пространства для агента закрыты.'],
    limit: ['Лимит расходов.', 'Вы решаете, сколько агент может потратить.'],
    photo: ['Вся команда на виду.', 'Люди и агенты на одной доске, у каждого свои задачи.'],
    photoAlt: 'Руководитель работает за столом',
    connect: ['Подключается к другим сервисам.', 'Календарь, база знаний или другой агент. Подключает ваш администратор.'],
    never: ['Медицинские данные', 'Оценки сотрудников', 'Пароли и ключи'],
    closed: ['Этого агент не получает.', 'Такие данные для него закрыты.'],
  },
  start: {
    h: 'Как начать',
    lead: 'Четыре шага, и первая задача уже у агента.',
    steps: [
      { title: 'Зайдите в Proji', text: 'Создайте рабочее пространство и пригласите команду.', example: 'Пространство «Наша компания»' },
      { title: 'Создайте агента', text: 'Дайте ему имя и напишите инструкцию обычными словами.', example: 'Агент «Протокол»' },
      { title: 'Поставьте задачу', text: 'Выберите агента исполнителем, как обычного сотрудника.', example: 'Протокол планёрки 09:30' },
      { title: 'Проверьте результат', text: 'Смотрите шаги агента и подтверждайте важное.', example: 'Готово: 5 задач' },
    ],
  },
  faq: {
    h: 'Частые вопросы',
    items: [
      { q: 'Чем агент отличается от чат-бота?', a: 'Чат-бот отвечает текстом. Агент ещё и действует: смотрит в ваши данные, делает работу по шагам и показывает результат.' },
      { q: 'Чем это лучше обычного ChatGPT?', a: 'Здесь у агента есть задача, срок и исполнитель, как у сотрудника. Он видит ваши данные в рамках прав, а каждый шаг записан в журнал.' },
      { q: 'Агент заменит сотрудников?', a: 'Нет. Агент готовит, человек решает. Он снимает рутину, но не отвечает за решения и не знает того, чего нет в данных.' },
      { q: 'А если агент ошибётся?', a: 'Важные изменения проходят через ваше «Подтвердить». В ответах есть ссылки на карточки и документы, чтобы всё можно было проверить.' },
      { q: 'Что будет, если агент не справился?', a: 'Он напишет, что не получилось. В журнале видно, на каком шаге он остановился.' },
      { q: 'Агент увидит все наши данные?', a: 'Нет, только то, что разрешено правами. Медицинские данные, оценки сотрудников, пароли и ключи он не получает.' },
      { q: 'Можно подключить своего агента?', a: 'Да. Внешних агентов и сервисы подключает администратор. Напишите нам, и мы поможем.' },
    ],
  },
};

const en: AgentsCopy = {
  title: 'proji — AI agents on the same team as your people',
  nav: { team: 'Agents on the team', run: 'How it works', teach: 'Instructions', control: 'Control' },
  hero: {
    line1: 'Your next ten employees',
    line2: 'may not be people.',
    sub: 'An AI agent is a helper program. In Proji you give it a task, just like an employee, and see every step it takes. People and agents work on one board.',
  },
  team: {
    h: 'Give an agent a task, like a colleague',
    lead: 'Pick an assignee and see what happens to the task.',
    label: 'Illustration: a task with sample data',
    task: 'Stand-up notes, 09:30',
    assignee: 'Assignee',
    humanTag: 'employee',
    agentTag: 'agent',
    points: [
      ['In the same list as people.', 'When you pick an assignee, agents sit right next to your employees.'],
      ['Reports back by itself.', 'The agent writes in the task what it is doing and what came out. No need to ask.'],
      ['One feed for everyone.', 'People and agents appear together. You see at once who did what.'],
    ],
    people: [
      { name: 'Yerzhan', agent: false, feed: ['You assigned Yerzhan', 'Yerzhan: "I will do it after lunch"', 'Reminder to Yerzhan: due today'] },
      { name: 'Madina', agent: false, feed: ['You assigned Madina', 'Madina: "Already on it"', 'Madina attached a file'] },
      { name: 'Agent "Minutes"', agent: true, feed: ['You gave the task to an agent', 'The agent is reading the stand-up recording', 'Agent: "I found 3 decisions and 5 tasks. Take a look?"'] },
      { name: 'Agent "Digest"', agent: true, feed: ['You gave the task to an agent', 'The agent is collecting what got done', 'Agent: "The draft is ready. Take a look?"'] },
    ],
  },
  run: {
    h: 'It works while you do something else',
    lead: 'You give the task and walk away. The agent goes step by step and writes what it is doing. Before an important step it stops and asks you.',
    label: 'Illustration: an agent run with sample data',
    title: 'Agent "Minutes" · stand-up 09:30',
    statuses: ['Queued', 'Working', 'Waiting for you', 'Done'],
    lines: ['Took the task from the queue', 'Reading the stand-up recording', 'Found 3 decisions', 'Prepared 5 tasks for the team', 'Draft ready. Your confirmation is needed'],
    confirm: 'Confirm',
    doneLine: 'Tasks created, notes sent out',
    replay: 'Show it again',
    fail: 'If something goes wrong, the agent says so and shows the step where it stopped.',
  },
  teach: {
    h: 'Explain it once',
    lead: 'Every agent has its own instructions. You write them in plain words, as you would for a new hire. After that the whole team can use the agent.',
    getLabel: 'What you get',
    cards: [
      { name: 'Agent "Minutes"', say: 'Read the stand-up recording. Write who decided what and who does what by when.', get: 'Notes and tasks for each participant' },
      { name: 'Agent "Digest"', say: 'Collect what got done, what is on fire and where a manager needs to decide.', get: 'One short summary instead of dozens of chats' },
      { name: 'Agent "Content maker"', say: 'Write press releases in plain language. Show the draft before sending.', get: 'A finished draft to review' },
    ],
  },
  control: {
    h: 'You set the limits',
    journal: [
      ['09:32', 'Agent "Minutes" took the task'],
      ['09:34', 'The agent prepared 5 tasks'],
      ['09:35', 'Aigerim confirmed the draft'],
      ['09:35', 'Tasks created'],
    ],
    log: ['Every step is recorded.', 'Who did what and when: a person or an agent.'],
    note: 'Illustration: a log with sample data',
    ask: 'OK?',
    confirm: ['Important things need your OK.', 'An agent does not take risky steps on its own.'],
    toggle: ['Others\'', 'Yours'],
    rights: ['It sees only what it may.', 'Other workspaces are closed to the agent.'],
    limit: ['Spending limit.', 'You decide how much an agent can spend.'],
    photo: ['The whole team in view.', 'People and agents on one board, each with their own tasks.'],
    photoAlt: 'A manager working at a desk',
    connect: ['Connects to other services.', 'A calendar, a knowledge base or another agent. Your administrator connects them.'],
    never: ['Medical data', 'Employee reviews', 'Passwords and keys'],
    closed: ['The agent never gets this.', 'Such data is closed to it.'],
  },
  start: {
    h: 'How to start',
    lead: 'Four steps, and your first task is with an agent.',
    steps: [
      { title: 'Open Proji', text: 'Create a workspace and invite your team.', example: 'Workspace "Our company"' },
      { title: 'Create an agent', text: 'Give it a name and write its instructions in plain words.', example: 'Agent "Minutes"' },
      { title: 'Assign a task', text: 'Pick the agent as the assignee, like any employee.', example: 'Stand-up notes, 09:30' },
      { title: 'Check the result', text: 'Watch the agent\'s steps and confirm what matters.', example: 'Done: 5 tasks' },
    ],
  },
  faq: {
    h: 'Common questions',
    items: [
      { q: 'How is an agent different from a chatbot?', a: 'A chatbot answers with text. An agent also acts: it looks into your data, works step by step and shows the result.' },
      { q: 'Why not just use ChatGPT?', a: 'Here an agent has a task, a due date and an owner, like an employee. It sees your data within its rights, and every step goes into the log.' },
      { q: 'Will agents replace employees?', a: 'No. The agent prepares, a person decides. It takes away routine, but it is not accountable for decisions and does not know what is not in the data.' },
      { q: 'What if an agent makes a mistake?', a: 'Important changes go through your "Confirm". Answers link to cards and documents so everything can be checked.' },
      { q: 'What if an agent cannot finish?', a: 'It says what went wrong. The log shows the step where it stopped.' },
      { q: 'Will an agent see all our data?', a: 'No, only what its rights allow. It never gets medical data, employee reviews, passwords or keys.' },
      { q: 'Can we connect our own agent?', a: 'Yes. Your administrator connects external agents and services. Write to us and we will help.' },
    ],
  },
};

const kk: AgentsCopy = {
  title: 'proji — AI-агенттер адамдармен бір командада',
  nav: { team: 'Командадағы агент', run: 'Қалай жұмыс істейді', teach: 'Нұсқаулық', control: 'Бақылау' },
  hero: {
    line1: 'Келесі он қызметкеріңіз',
    line2: 'адам болмауы мүмкін.',
    sub: 'AI-агент — бұл көмекші бағдарлама. Proji-де оған қызметкерге бергендей тапсырма бересіз және оның әр қадамын көресіз. Адамдар мен агенттер бір тақтада жұмыс істейді.',
  },
  team: {
    h: 'Агентке әріптеске бергендей тапсырма беруге болады',
    lead: 'Орындаушыны таңдап, тапсырмаға не болатынын қараңыз.',
    label: 'Иллюстрация: мысал деректердегі тапсырма',
    task: 'Жиналыс хаттамасы 09:30',
    assignee: 'Орындаушы',
    humanTag: 'қызметкер',
    agentTag: 'агент',
    points: [
      ['Адамдармен бір тізімде.', 'Орындаушыны таңдағанда агент қызметкерлердің қасында тұрады.'],
      ['Жағдайын өзі айтады.', 'Агент тапсырмада не істеп жатқанын және не шыққанын жазады. Сұраудың қажеті жоқ.'],
      ['Бәріне бір лента.', 'Адамдар мен агенттердің әрекеттері бірге көрінеді. Кім не істегені бірден анық.'],
    ],
    people: [
      { name: 'Ержан', agent: false, feed: ['Сіз Ержанды тағайындадыңыз', 'Ержан: «Түстен кейін істеймін»', 'Ержанға еске салу: мерзімі бүгін'] },
      { name: 'Мадина', agent: false, feed: ['Сіз Мадинаны тағайындадыңыз', 'Мадина: «Бастап кеттім»', 'Мадина файл тіркеді'] },
      { name: '«Хаттама» агенті', agent: true, feed: ['Сіз тапсырманы агентке бердіңіз', 'Агент жиналыс жазбасын оқып жатыр', 'Агент: «3 шешім мен 5 тапсырма таптым. Қарайсыз ба?»'] },
      { name: '«Дайджест» агенті', agent: true, feed: ['Сіз тапсырманы агентке бердіңіз', 'Агент не істелгенін жинап жатыр', 'Агент: «Жоба дайын. Қарайсыз ба?»'] },
    ],
  },
  run: {
    h: 'Сіз басқа іспен айналысқанда жұмыс істейді',
    lead: 'Тапсырма бердіңіз де, кеттіңіз. Агент қадам-қадаммен жүріп, не істеп жатқанын жазады. Маңызды қадам алдында тоқтап, сізден сұрайды.',
    label: 'Иллюстрация: мысал деректердегі агент жұмысы',
    title: '«Хаттама» агенті · жиналыс 09:30',
    statuses: ['Кезекте', 'Жұмыс істеп жатыр', 'Сізді күтуде', 'Дайын'],
    lines: ['Тапсырманы кезектен алдым', 'Жиналыс жазбасын оқып жатырмын', '3 шешім таптым', 'Қатысушыларға 5 тапсырма дайындадым', 'Жоба дайын. Сіздің растауыңыз керек'],
    confirm: 'Растау',
    doneLine: 'Тапсырмалар жасалды, хаттама таратылды',
    replay: 'Тағы көрсету',
    fail: 'Егер шықпаса, агент соны жазып, қай қадамда тоқтағанын көрсетеді.',
  },
  teach: {
    h: 'Бір рет түсіндіріңіз',
    lead: 'Әр агенттің өз нұсқаулығы бар. Оны жаңа қызметкерге айтқандай, қарапайым сөзбен жазасыз. Содан кейін бұл агентті бүкіл команда пайдаланады.',
    getLabel: 'Не аласыз',
    cards: [
      { name: '«Хаттама» агенті', say: 'Жиналыс жазбасын оқы. Кім не шешкенін және кім не істейтінін, қай мерзімге екенін жаз.', get: 'Хаттама және әр қатысушыға тапсырма' },
      { name: '«Дайджест» агенті', say: 'Не істелгенін, не шұғыл екенін және қай жерде басшының шешімі керегін жина.', get: 'Ондаған чаттың орнына бір қысқа шолу' },
      { name: '«Контент-мейкер» агенті', say: 'Пресс-релиздерді қарапайым тілмен жаз. Жібермес бұрын жобаны көрсет.', get: 'Тексеруге дайын жоба' },
    ],
  },
  control: {
    h: 'Шекараны сіз белгілейсіз',
    journal: [
      ['09:32', '«Хаттама» агенті тапсырманы алды'],
      ['09:34', 'Агент 5 тапсырма дайындады'],
      ['09:35', 'Айгерім жобаны растады'],
      ['09:35', 'Тапсырмалар жасалды'],
    ],
    log: ['Әр қадам жазылады.', 'Кім не істеді және қашан: адам ба, агент пе.'],
    note: 'Иллюстрация: мысал деректердегі журнал',
    ask: 'Иә?',
    confirm: ['Маңыздысы тек сіздің келісіміңізбен.', 'Агент тәуекелді қадамдарды өзі жасамайды.'],
    toggle: ['Бөтен', 'Өзінікі'],
    rights: ['Рұқсат етілгенін ғана көреді.', 'Бөтен кеңістіктер агентке жабық.'],
    limit: ['Шығын лимиті.', 'Агент қанша жұмсай алатынын сіз шешесіз.'],
    photo: ['Бүкіл команда көз алдыңызда.', 'Адамдар мен агенттер бір тақтада, әрқайсысының өз тапсырмасы бар.'],
    photoAlt: 'Басшы үстел басында жұмыс істеп отыр',
    connect: ['Басқа сервистерге қосылады.', 'Күнтізбе, білім базасы немесе басқа агент. Оларды әкімшіңіз қосады.'],
    never: ['Медициналық деректер', 'Қызметкерлердің бағалары', 'Құпия сөздер мен кілттер'],
    closed: ['Мұны агент алмайды.', 'Мұндай деректер оған жабық.'],
  },
  start: {
    h: 'Қалай бастау керек',
    lead: 'Төрт қадам, және алғашқы тапсырма агентте.',
    steps: [
      { title: 'Proji-ге кіріңіз', text: 'Жұмыс кеңістігін ашып, команданы шақырыңыз.', example: '«Біздің компания» кеңістігі' },
      { title: 'Агент жасаңыз', text: 'Оған ат қойып, нұсқаулықты қарапайым сөзбен жазыңыз.', example: '«Хаттама» агенті' },
      { title: 'Тапсырма қойыңыз', text: 'Агентті кәдімгі қызметкер сияқты орындаушы етіп таңдаңыз.', example: 'Жиналыс хаттамасы 09:30' },
      { title: 'Нәтижені тексеріңіз', text: 'Агенттің қадамдарын қарап, маңыздысын растаңыз.', example: 'Дайын: 5 тапсырма' },
    ],
  },
  faq: {
    h: 'Жиі қойылатын сұрақтар',
    items: [
      { q: 'Агенттің чат-боттан айырмашылығы неде?', a: 'Чат-бот мәтінмен жауап береді. Агент әрекет те жасайды: деректеріңізді қарайды, жұмысты қадам-қадаммен орындайды және нәтижесін көрсетеді.' },
      { q: 'Бұл кәдімгі ChatGPT-тен несімен жақсы?', a: 'Мұнда агенттің қызметкер сияқты тапсырмасы, мерзімі және жауаптысы бар. Ол деректеріңізді рұқсат шегінде көреді, әр қадамы журналға жазылады.' },
      { q: 'Агент қызметкерлерді алмастыра ма?', a: 'Жоқ. Агент дайындайды, адам шешеді. Ол күнделікті жұмысты азайтады, бірақ шешімге жауап бермейді және деректе жоқ нәрсені білмейді.' },
      { q: 'Агент қателессе ше?', a: 'Маңызды өзгерістер сіздің «Растау» батырмаңыз арқылы өтеді. Жауаптарда тексеру үшін карточкалар мен құжаттарға сілтемелер бар.' },
      { q: 'Агент орындай алмаса не болады?', a: 'Ол не шықпағанын жазады. Қай қадамда тоқтағаны журналда көрінеді.' },
      { q: 'Агент барлық деректерімізді көре ме?', a: 'Жоқ, тек рұқсат етілгенін ғана. Медициналық деректерді, қызметкерлердің бағаларын, құпия сөздер мен кілттерді алмайды.' },
      { q: 'Өз агентімізді қосуға бола ма?', a: 'Иә. Сыртқы агенттер мен сервистерді әкімші қосады. Бізге жазыңыз, көмектесеміз.' },
    ],
  },
};

const ar: AgentsCopy = {
  title: 'proji — وكلاء الذكاء الاصطناعي في فريق واحد مع الموظفين',
  nav: { team: 'الوكيل في الفريق', run: 'كيف يعمل', teach: 'التعليمات', control: 'التحكم' },
  hero: {
    line1: 'موظفوك العشرة القادمون',
    line2: 'قد لا يكونون بشرًا.',
    sub: 'وكيل الذكاء الاصطناعي برنامج مساعد. في Proji تعطيه مهمة كما تعطيها لموظف، وترى كل خطوة يقوم بها. يعمل الموظفون والوكلاء على لوحة واحدة.',
  },
  team: {
    h: 'أعطِ الوكيل مهمة كما تعطيها لزميل',
    lead: 'اختر المنفّذ وشاهد ما يحدث للمهمة.',
    label: 'رسم توضيحي: مهمة ببيانات افتراضية',
    task: 'محضر اجتماع 09:30',
    assignee: 'المنفّذ',
    humanTag: 'موظف',
    agentTag: 'وكيل',
    points: [
      ['في قائمة واحدة مع الموظفين.', 'عند اختيار المنفّذ، يظهر الوكيل بجانب الموظفين.'],
      ['يبلغك بنفسه.', 'يكتب الوكيل في المهمة ما يفعله وما توصل إليه. لا حاجة للسؤال.'],
      ['سجل واحد للجميع.', 'تظهر أعمال الموظفين والوكلاء معًا. ترى فورًا من فعل ماذا.'],
    ],
    people: [
      { name: 'يرجان', agent: false, feed: ['عيّنت يرجان', 'يرجان: «سأنجزها بعد الغداء»', 'تذكير ليرجان: الموعد اليوم'] },
      { name: 'مدينة', agent: false, feed: ['عيّنت مدينة', 'مدينة: «بدأت بالفعل»', 'أرفقت مدينة ملفًا'] },
      { name: 'وكيل «المحضر»', agent: true, feed: ['أسندت المهمة إلى وكيل', 'يقرأ الوكيل تسجيل الاجتماع', 'الوكيل: «وجدت 3 قرارات و5 مهام. هل تلقي نظرة؟»'] },
      { name: 'وكيل «الملخص»', agent: true, feed: ['أسندت المهمة إلى وكيل', 'يجمع الوكيل ما تم إنجازه', 'الوكيل: «المسودة جاهزة. هل تلقي نظرة؟»'] },
    ],
  },
  run: {
    h: 'يعمل بينما أنت مشغول بأمر آخر',
    lead: 'تعطي المهمة وتنصرف. يتقدم الوكيل خطوة بخطوة ويكتب ما يفعله. وقبل أي خطوة مهمة يتوقف ويسألك.',
    label: 'رسم توضيحي: تشغيل وكيل ببيانات افتراضية',
    title: 'وكيل «المحضر» · اجتماع 09:30',
    statuses: ['في الانتظار', 'يعمل', 'ينتظرك', 'تم'],
    lines: ['أخذت المهمة من قائمة الانتظار', 'أقرأ تسجيل الاجتماع', 'وجدت 3 قرارات', 'أعددت 5 مهام للمشاركين', 'المسودة جاهزة. نحتاج إلى تأكيدك'],
    confirm: 'تأكيد',
    doneLine: 'أُنشئت المهام وأُرسل المحضر',
    replay: 'عرض مرة أخرى',
    fail: 'إذا لم ينجح الأمر، سيكتب الوكيل ذلك ويوضح الخطوة التي توقف عندها.',
  },
  teach: {
    h: 'اشرح مرة واحدة',
    lead: 'لكل وكيل تعليماته الخاصة. تكتبها بكلمات بسيطة كما لو كانت لموظف جديد. بعد ذلك يستخدم الفريق كله هذا الوكيل.',
    getLabel: 'ما تحصل عليه',
    cards: [
      { name: 'وكيل «المحضر»', say: 'اقرأ تسجيل الاجتماع. اكتب من قرر ماذا ومن يفعل ماذا وبأي موعد.', get: 'محضر ومهام لكل مشارك' },
      { name: 'وكيل «الملخص»', say: 'اجمع ما تم إنجازه وما هو عاجل وأين يلزم قرار المدير.', get: 'ملخص قصير واحد بدلًا من عشرات المحادثات' },
      { name: 'وكيل «صانع المحتوى»', say: 'اكتب البيانات الصحفية بلغة بسيطة. أظهر المسودة قبل الإرسال.', get: 'مسودة جاهزة للمراجعة' },
    ],
  },
  control: {
    h: 'أنت من يضع الحدود',
    journal: [
      ['09:32', 'أخذ وكيل «المحضر» المهمة'],
      ['09:34', 'أعد الوكيل 5 مهام'],
      ['09:35', 'أكدت أيغريم المسودة'],
      ['09:35', 'أُنشئت المهام'],
    ],
    log: ['كل خطوة مسجلة.', 'من فعل ماذا ومتى: شخص أم وكيل.'],
    note: 'رسم توضيحي: سجل ببيانات افتراضية',
    ask: 'نعم؟',
    confirm: ['الأمور المهمة بموافقتك فقط.', 'لا يقوم الوكيل بالخطوات الخطرة من تلقاء نفسه.'],
    toggle: ['لغيره', 'له'],
    rights: ['يرى المسموح به فقط.', 'مساحات العمل الأخرى مغلقة أمام الوكيل.'],
    limit: ['حد الإنفاق.', 'أنت تقرر كم يمكن للوكيل أن ينفق.'],
    photo: ['الفريق كله أمامك.', 'الموظفون والوكلاء على لوحة واحدة، ولكل منهم مهامه.'],
    photoAlt: 'مدير يعمل على مكتبه',
    connect: ['يتصل بخدمات أخرى.', 'تقويم أو قاعدة معرفة أو وكيل آخر. يربطها مسؤول النظام لديك.'],
    never: ['البيانات الطبية', 'تقييمات الموظفين', 'كلمات المرور والمفاتيح'],
    closed: ['هذا لا يصل إلى الوكيل.', 'هذه البيانات مغلقة أمامه.'],
  },
  start: {
    h: 'كيف تبدأ',
    lead: 'أربع خطوات، وتصبح أول مهمة لدى الوكيل.',
    steps: [
      { title: 'ادخل إلى Proji', text: 'أنشئ مساحة عمل وادعُ فريقك.', example: 'مساحة «شركتنا»' },
      { title: 'أنشئ وكيلًا', text: 'أعطه اسمًا واكتب تعليماته بكلمات بسيطة.', example: 'وكيل «المحضر»' },
      { title: 'كلّفه بمهمة', text: 'اختر الوكيل منفذًا كأي موظف.', example: 'محضر اجتماع 09:30' },
      { title: 'راجع النتيجة', text: 'تابع خطوات الوكيل وأكّد ما هو مهم.', example: 'تم: 5 مهام' },
    ],
  },
  faq: {
    h: 'أسئلة شائعة',
    items: [
      { q: 'ما الفرق بين الوكيل وروبوت الدردشة؟', a: 'يجيب روبوت الدردشة بنص. أما الوكيل فيعمل أيضًا: يطلع على بياناتك وينجز العمل خطوة بخطوة ويعرض النتيجة.' },
      { q: 'لماذا لا نكتفي بـ ChatGPT؟', a: 'هنا للوكيل مهمة وموعد ومسؤول مثل الموظف. يرى بياناتك في حدود الصلاحيات، وتُسجل كل خطوة في السجل.' },
      { q: 'هل سيحل الوكلاء محل الموظفين؟', a: 'لا. الوكيل يُعدّ والإنسان يقرر. يخفف العمل الروتيني، لكنه لا يتحمل مسؤولية القرارات ولا يعرف ما ليس في البيانات.' },
      { q: 'ماذا لو أخطأ الوكيل؟', a: 'تمر التغييرات المهمة عبر زر «تأكيد» لديك. وتتضمن الإجابات روابط إلى البطاقات والمستندات للتحقق منها.' },
      { q: 'ماذا لو لم يتمكن الوكيل من الإنجاز؟', a: 'سيكتب ما الذي لم ينجح. ويظهر في السجل الخطوة التي توقف عندها.' },
      { q: 'هل سيرى الوكيل كل بياناتنا؟', a: 'لا، فقط ما تسمح به الصلاحيات. لا يحصل على البيانات الطبية أو تقييمات الموظفين أو كلمات المرور والمفاتيح.' },
      { q: 'هل يمكن ربط وكيلنا الخاص؟', a: 'نعم. يربط مسؤول النظام الوكلاء والخدمات الخارجية. راسلنا وسنساعدك.' },
    ],
  },
};

export const AGENTS: Record<Lang, AgentsCopy> = { ru, kk, en, ar };

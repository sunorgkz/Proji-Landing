import type { Lang } from '../board/copy';

/**
 * Тексты лендинга /why. Основа — документ «Лендинг Proji: 10 концепций», подача своя: вокруг фразы «ну что там?».
 * kk, en, ar — перевод; перед публикацией kk и ar должен вычитать носитель языка.
 * Время и цифры в «одном дне» и в сводке — примерный сценарий, это ИЛЛЮСТРАЦИЯ.
 */

type Row = [string, string];

export interface WhyCopy {
  title: string;
  auditMessage: string;
  nav: { day: string; gains: string; clients: string; price: string };
  hero: { a: string; b: string; sub: string; cta: string; audit: string; small: string; note: string; bubbles: string[]; hi: string; card: string[] };
  day: { h: string; now: string; with: string; rowsNow: Row[]; rowsWith: Row[] };
  gains: { h: string; items: Row[] };
  team: { h: string; x: string; alt: string };
  clients: { h: string; by: string };
  price: { h: string; plans: Row[]; note: string };
  end: { h: string; x: string };
}

const TIMES = ['08:40', '11:00', '15:20', '19:30', '23:10'];
const rows = (texts: string[]): Row[] => texts.map((t, i) => [TIMES[i], t]);

export const WHY: Record<Lang, WhyCopy> = {
  ru: {
    title: 'proji — хватит спрашивать «ну что там?»',
    auditMessage: 'Здравствуйте! Хочу бесплатный AI-аудит компании.',
    nav: { day: 'Ваш день', gains: 'Что вы получаете', clients: 'Клиенты', price: 'Цена' },
    hero: {
      a: 'Хватит спрашивать',
      b: '«ну что там?»',
      sub: 'Proji сам узнаёт, что происходит в компании: из чатов, встреч и задач. А каждое утро рассказывает вам только главное.',
      cta: 'Попробовать 14 дней бесплатно',
      audit: 'Получить бесплатный AI-аудит',
      small: 'До 5 человек бесплатно. Команде ничего осваивать не нужно.',
      note: 'Иллюстрация, примерные данные',
      bubbles: ['Ну что там?', 'Кто взял КП?', 'Это когда будет?', 'Напомни ему ещё раз', 'Договор подписали?'],
      hi: 'Доброе утро. Вот главное:',
      card: ['Вчера сделано 12 задач', 'Горит: договор аренды', 'Нужно ваше решение: 1'],
    },
    day: {
      h: 'Один и тот же день',
      now: 'Сейчас',
      with: 'С Proji',
      rowsNow: rows([
        'Открываете WhatsApp. Десятки чатов, и в каждом что-то горит.',
        'Планёрка. Все кивают. Через неделю никто не помнит, кто что обещал.',
        'Клиент спрашивает, где его заказ. О проблеме вы узнаёте от него.',
        'Вы дома. Пишете: «Ну что там?»',
        'Лежите и думаете, ничего ли не забыли.',
      ]),
      rowsWith: rows([
        'Одна сводка: что сделано, что горит, где нужно ваше решение.',
        'Планёрка закончилась. Задачи уже розданы, протокол у всех.',
        'Proji предупредил о задержке ещё вчера. Клиенту вы позвонили первым.',
        'Вы дома. Телефон лежит.',
        'Вы спите.',
      ]),
    },
    gains: {
      h: 'Что вы получаете',
      items: [
        ['Ничего не теряется.', 'Договорились в чате или на планёрке, и задача уже есть: с исполнителем и сроком. Никто ничего не заполняет.'],
        ['Вы узнаёте первым.', 'Задача зависла, сотрудник перегружен, клиент молчит. Proji скажет об этом раньше, чем заметит клиент.'],
        ['Вас зовут только по делу.', 'Решения и риски идут к вам. Напоминать, уточнять и собирать статусы теперь не ваша работа.'],
        ['Рук больше, людей столько же.', 'Часть работы делают AI-агенты, программы-помощники: протокол, отчёт, сводка. Каждый их шаг виден.'],
      ],
    },
    team: {
      h: 'Команде ничего не надо менять.',
      x: 'Они пишут в WhatsApp и Telegram, как писали. Никаких новых программ и полей. Всю работу с задачами Proji делает сам.',
      alt: 'Рука с телефоном, открыт мессенджер',
    },
    clients: { h: 'Уже так работают', by: 'Proji делает Sunnet Business Technologies. 15 лет в IT.' },
    price: {
      h: 'Начать можно бесплатно.',
      plans: [['0 ₸', 'до 5 человек'], ['от 9 900 ₸', 'в месяц, для команды'], ['от 49 900 ₸', 'в месяц, с AI-агентами']],
      note: 'На платных тарифах 14 дней пробного периода.',
    },
    end: { h: 'Через месяц останется один вопрос: почему я не сделал этого раньше?', x: 'Начните сегодня. Первые 14 дней бесплатно.' },
  },
  kk: {
    title: 'proji — «ал, не болды?» деп сұрауды тоқтатыңыз',
    auditMessage: 'Сәлеметсіз бе! Компанияға тегін AI-аудит алғым келеді.',
    nav: { day: 'Сіздің күніңіз', gains: 'Не аласыз', clients: 'Клиенттер', price: 'Бағасы' },
    hero: {
      a: 'Сұрауды тоқтатыңыз:',
      b: '«ал, не болды?»',
      sub: 'Proji компанияда не болып жатқанын чаттардан, кездесулерден және тапсырмалардан өзі біледі. Ал әр таң сайын сізге тек ең бастысын айтады.',
      cta: '14 күн тегін қолданып көру',
      audit: 'Тегін AI-аудит алу',
      small: '5 адамға дейін тегін. Командаға ештеңе үйренудің қажеті жоқ.',
      note: 'Иллюстрация, мысал деректер',
      bubbles: ['Ал, не болды?', 'КҰ-ны кім алды?', 'Бұл қашан дайын болады?', 'Оған тағы еске сал', 'Шартқа қол қойылды ма?'],
      hi: 'Қайырлы таң. Міне, ең бастысы:',
      card: ['Кеше 12 тапсырма орындалды', 'Шұғыл: жалға алу шарты', 'Сіздің шешіміңіз керек: 1'],
    },
    day: {
      h: 'Дәл сол бір күн',
      now: 'Қазір',
      with: 'Proji-мен',
      rowsNow: rows([
        'WhatsApp-ты ашасыз. Ондаған чат, әрқайсысында бірдеңе шұғыл.',
        'Жиналыс. Бәрі бас изейді. Бір аптадан кейін кім не уәде бергенін ешкім есіне алмайды.',
        'Клиент тапсырысы қайда екенін сұрайды. Мәселені сіз одан білесіз.',
        'Үйдесіз. «Ал, не болды?» деп жазасыз.',
        'Жатып, ештеңе ұмытылмады ма деп ойлайсыз.',
      ]),
      rowsWith: rows([
        'Бір шолу: не істелді, не шұғыл, қай жерде сіздің шешіміңіз керек.',
        'Жиналыс аяқталды. Тапсырмалар бөлінді, хаттама бәрінде бар.',
        'Proji кешігу туралы кеше ескертті. Клиентке бірінші болып сіз қоңырау шалдыңыз.',
        'Үйдесіз. Телефон тыныш жатыр.',
        'Сіз ұйықтап жатырсыз.',
      ]),
    },
    gains: {
      h: 'Сіз не аласыз',
      items: [
        ['Ештеңе жоғалмайды.', 'Чатта немесе жиналыста келістіңіз, тапсырма дайын: орындаушысы да, мерзімі де бар. Ешкім ештеңе толтырмайды.'],
        ['Сіз бірінші білесіз.', 'Тапсырма тоқтап қалды, қызметкер шамадан тыс жүктелді, клиент үнсіз. Proji бұны клиент байқағанға дейін айтады.'],
        ['Сізді тек іс бойынша шақырады.', 'Шешімдер мен тәуекелдер сізге келеді. Еске салу, нақтылау және мәртебе жинау енді сіздің жұмысыңыз емес.'],
        ['Қол көбейді, адам саны сол күйі.', 'Жұмыстың бір бөлігін AI-агенттер, яғни бағдарлама-көмекшілер істейді: хаттама, есеп, шолу. Олардың әр қадамы көрінеді.'],
      ],
    },
    team: {
      h: 'Команда ештеңені өзгертпейді.',
      x: 'Олар WhatsApp пен Telegram-да бұрынғыдай жазады. Жаңа бағдарлама да, толтыратын өріс те жоқ. Тапсырмалармен бүкіл жұмысты Proji өзі істейді.',
      alt: 'Телефон ұстаған қол, мессенджер ашық',
    },
    clients: { h: 'Осылай жұмыс істейтіндер', by: 'Proji-ді Sunnet Business Technologies жасайды. IT саласында 15 жыл.' },
    price: {
      h: 'Бастау тегін.',
      plans: [['0 ₸', '5 адамға дейін'], ['9 900 ₸-ден', 'айына, команда үшін'], ['49 900 ₸-ден', 'айына, AI-агенттермен']],
      note: 'Ақылы тарифтерде 14 күн сынақ мерзімі бар.',
    },
    end: { h: 'Бір айдан кейін бір ғана сұрақ қалады: неге мұны бұрын жасамадым?', x: 'Бүгін бастаңыз. Алғашқы 14 күн тегін.' },
  },
  en: {
    title: 'proji — stop asking “so, what’s happening?”',
    auditMessage: 'Hello! I would like a free AI audit for my company.',
    nav: { day: 'Your day', gains: 'What you get', clients: 'Clients', price: 'Pricing' },
    hero: {
      a: 'Stop asking',
      b: '“so, what’s happening?”',
      sub: 'Proji finds out what’s going on in your company by itself: from chats, meetings and tasks. And every morning it tells you only what matters.',
      cta: 'Try free for 14 days',
      audit: 'Get a free AI audit',
      small: 'Free for up to 5 people. Your team has nothing new to learn.',
      note: 'Illustration, sample data',
      bubbles: ['So, what’s happening?', 'Who took the quote?', 'When will it be ready?', 'Remind him again', 'Did they sign the contract?'],
      hi: 'Good morning. Here’s what matters:',
      card: ['12 tasks done yesterday', 'Urgent: the lease agreement', 'Your decision needed: 1'],
    },
    day: {
      h: 'The same day, twice',
      now: 'Today',
      with: 'With Proji',
      rowsNow: rows([
        'You open WhatsApp. Dozens of chats, and something urgent in each.',
        'A meeting. Everyone nods. A week later nobody remembers who promised what.',
        'A client asks where their order is. That’s how you learn about the problem.',
        'You’re home. You type: “So, what’s happening?”',
        'You lie awake wondering what you forgot.',
      ]),
      rowsWith: rows([
        'One digest: what’s done, what’s urgent, where your decision is needed.',
        'The meeting is over. Tasks are assigned, everyone has the minutes.',
        'Proji warned you about the delay yesterday. You called the client first.',
        'You’re home. The phone stays on the table.',
        'You’re asleep.',
      ]),
    },
    gains: {
      h: 'What you get',
      items: [
        ['Nothing gets lost.', 'Agree on something in a chat or a meeting, and the task already exists, with an assignee and a deadline. Nobody fills anything in.'],
        ['You find out first.', 'A task is stuck, someone is overloaded, a client has gone quiet. Proji tells you before the client notices.'],
        ['You’re called only when it matters.', 'Decisions and risks come to you. Reminding, checking and collecting statuses are no longer your job.'],
        ['More hands, same headcount.', 'AI agents, software helpers, do part of the work: minutes, reports, digests. Every step they take is visible.'],
      ],
    },
    team: {
      h: 'Your team changes nothing.',
      x: 'They keep writing in WhatsApp and Telegram as before. No new apps, no fields to fill in. Proji does all the task work itself.',
      alt: 'A hand holding a phone with a messenger open',
    },
    clients: { h: 'Already working this way', by: 'Proji is made by Sunnet Business Technologies. 15 years in IT.' },
    price: {
      h: 'Start for free.',
      plans: [['₸0', 'up to 5 people'], ['from ₸9,900', 'a month, for a team'], ['from ₸49,900', 'a month, with AI agents']],
      note: 'Paid plans include a 14-day trial.',
    },
    end: { h: 'A month from now, one question will remain: why didn’t I do this sooner?', x: 'Start today. The first 14 days are free.' },
  },
  ar: {
    title: 'proji — كفى سؤالًا: «ما الأخبار؟»',
    auditMessage: 'مرحبًا! أرغب في تدقيق مجاني بالذكاء الاصطناعي لشركتي.',
    nav: { day: 'يومك', gains: 'ماذا ستحصل عليه', clients: 'العملاء', price: 'الأسعار' },
    hero: {
      a: 'كفى سؤالًا:',
      b: '«ما الأخبار؟»',
      sub: 'يعرف Proji بنفسه ما يجري في شركتك: من المحادثات والاجتماعات والمهام. وكل صباح يخبرك بالأهم فقط.',
      cta: 'جرّب مجانًا لمدة 14 يومًا',
      audit: 'احصل على تدقيق مجاني',
      small: 'مجاني حتى 5 أشخاص. لا يحتاج فريقك إلى تعلّم أي شيء جديد.',
      note: 'رسم توضيحي، بيانات تجريبية',
      bubbles: ['ما الأخبار؟', 'من أخذ عرض السعر؟', 'متى سيكون جاهزًا؟', 'ذكّره مرة أخرى', 'هل وقّعوا العقد؟'],
      hi: 'صباح الخير. إليك الأهم:',
      card: ['أُنجزت 12 مهمة أمس', 'عاجل: عقد الإيجار', 'يلزم قرارك: 1'],
    },
    day: {
      h: 'اليوم نفسه، مرتين',
      now: 'الآن',
      with: 'مع Proji',
      rowsNow: rows([
        'تفتح WhatsApp. عشرات المحادثات، وفي كل منها أمر عاجل.',
        'اجتماع. الجميع يومئون. بعد أسبوع لا أحد يتذكر من وعد بماذا.',
        'يسألك عميل أين طلبه. ومنه تعرف بالمشكلة.',
        'أنت في البيت. تكتب: «ما الأخبار؟»',
        'تستلقي وتفكر: هل نسيت شيئًا؟',
      ]),
      rowsWith: rows([
        'ملخص واحد: ما أُنجز، وما العاجل، وأين يلزم قرارك.',
        'انتهى الاجتماع. المهام موزعة، والمحضر لدى الجميع.',
        'نبهك Proji بالتأخير أمس. وكنت أول من اتصل بالعميل.',
        'أنت في البيت. الهاتف جانبًا.',
        'أنت نائم.',
      ]),
    },
    gains: {
      h: 'ماذا ستحصل عليه',
      items: [
        ['لا يضيع شيء.', 'اتفقتم في محادثة أو اجتماع، فالمهمة موجودة بمنفّذها وموعدها. لا أحد يملأ شيئًا.'],
        ['أنت أول من يعرف.', 'مهمة متعثرة، موظف مثقل بالعمل، عميل صامت. يخبرك Proji قبل أن يلاحظ العميل.'],
        ['لا يدعونك إلا للضرورة.', 'القرارات والمخاطر تصل إليك. أما التذكير والمتابعة وجمع الحالات فلم تعد عملك.'],
        ['أيدٍ أكثر، والعدد نفسه.', 'وكلاء الذكاء الاصطناعي، وهم برامج مساعدة، ينجزون جزءًا من العمل: محاضر وتقارير وملخصات. وكل خطوة مرئية.'],
      ],
    },
    team: {
      h: 'لا يغيّر فريقك شيئًا.',
      x: 'يواصلون الكتابة في WhatsApp وTelegram كما كانوا. لا برامج جديدة ولا حقول تُملأ. يتولى Proji كل العمل على المهام بنفسه.',
      alt: 'يد تحمل هاتفًا وتطبيق المراسلة مفتوح',
    },
    clients: { h: 'يعملون بهذه الطريقة بالفعل', by: 'يطوّر Proji شركة Sunnet Business Technologies. 15 عامًا في تقنية المعلومات.' },
    price: {
      h: 'ابدأ مجانًا.',
      plans: [['0 ₸', 'حتى 5 أشخاص'], ['من 9,900 ₸', 'شهريًا، للفريق'], ['من 49,900 ₸', 'شهريًا، مع وكلاء الذكاء الاصطناعي']],
      note: 'تشمل الخطط المدفوعة فترة تجريبية لمدة 14 يومًا.',
    },
    end: { h: 'بعد شهر سيبقى سؤال واحد: لماذا لم أفعل هذا من قبل؟', x: 'ابدأ اليوم. أول 14 يومًا مجانية.' },
  },
};

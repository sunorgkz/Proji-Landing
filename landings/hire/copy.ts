import type { Lang } from '../board/copy';

/**
 * Лендинг /hire: Proji устраивается к вам на работу, страница — его резюме.
 * Возможности взяты из документа «Лендинг Proji: 10 концепций», подача своя.
 * kk, en, ar — перевод; перед публикацией kk и ar должен вычитать носитель языка.
 * «Мой день» — примерный сценарий, это ИЛЛЮСТРАЦИЯ.
 */

type Pair = [string, string];

export interface HireCopy {
  title: string;
  talkMessage: string;
  cta: string;
  talk: string;
  nav: { skills: string; exp: string; interview: string; salary: string };
  hero: { h: string; sub: string; status: string; role: string; rows: Pair[] };
  about: { label: string; x: string };
  day: { label: string; note: string; rows: Pair[] };
  skills: { label: string; items: Pair[] };
  exp: { label: string };
  weak: { label: string; items: string[] };
  interview: { label: string; hint: string; qa: Pair[] };
  salary: { label: string; plans: Pair[]; note: string };
  end: { stamp: string; h: string; x: string };
}

export const HIRE: Record<Lang, HireCopy> = {
  ru: {
    title: 'proji — возьмите меня на работу',
    talkMessage: 'Здравствуйте! Хочу узнать про Proji.',
    cta: 'Нанять Proji',
    talk: 'Сначала поговорить',
    nav: { skills: 'Навыки', exp: 'Опыт', interview: 'Собеседование', salary: 'Зарплата' },
    hero: {
      h: 'Возьмите меня на работу.',
      sub: 'Вашей компании нужен тот, кто всё помнит, всем напоминает и ничего не теряет. Это я.',
      status: 'Ищу работу',
      role: 'Координатор всей компании',
      rows: [['График', 'Круглосуточно, без выходных'], ['Рабочее место', 'Ваши чаты и встречи'], ['Зарплата', 'от 9 900 ₸ в месяц'], ['Испытательный срок', '14 дней']],
    },
    about: { label: 'О себе', x: 'Я читаю ваши рабочие чаты и слушаю встречи. Из договорённостей делаю задачи с исполнителем и сроком, сам напоминаю, а каждое утро рассказываю вам главное. Людям не приходится ничего заполнять.' },
    day: {
      label: 'Мой день',
      note: 'Примерный день',
      rows: [
        ['07:30', 'Прочитал всё, что было за ночь, и собрал вам сводку.'],
        ['09:30', 'Записал планёрку. Протокол и задачи уже у всех.'],
        ['12:00', 'Напомнил Ержану про КП. Вам напоминать не пришлось.'],
        ['16:10', 'Заметил, что договор завис. Предупредил вас и подсказал, что делать.'],
        ['23:00', 'Всё записано. Можете спать.'],
      ],
    },
    skills: {
      label: 'Навыки',
      items: [
        ['Читаю чаты', 'WhatsApp и Telegram. Нахожу, кто, что и к какому сроку.'],
        ['Записываю встречи', 'Онлайн и вживую. Протокол приходит всем сам.'],
        ['Напоминаю', 'Сам уточняю сроки и собираю статусы.'],
        ['Замечаю риски', 'Просрочки, перегруз и молчание, с подсказкой, что делать.'],
        ['Помню всё', 'Решения и документы. Отвечаю со ссылкой на источник.'],
        ['Работаю в команде', 'С людьми и AI-агентами, программами-помощниками. Каждый шаг в журнале.'],
      ],
    },
    exp: { label: 'Опыт работы' },
    weak: { label: 'Слабые стороны', items: ['Не умею забывать.', 'Не беру отпуск и больничный.', 'Вам придётся найти, чем заняться вечером.'] },
    interview: {
      label: 'Собеседование',
      hint: 'Задайте мне вопрос:',
      qa: [
        ['Почему вы?', 'Потому что мне не нужно напоминать.'],
        ['Наша команда станет вами пользоваться?', 'Им и не нужно. Они пишут в WhatsApp и Telegram, как раньше, а остальное делаю я.'],
        ['У нас уже есть CRM. Зачем вы?', 'CRM помнит клиентов, а я слежу, чтобы работа была сделана. Работаю рядом, интеграции с CRM и 1С подключаются отдельно.'],
        ['А если вы ошибётесь?', 'Если не уверен, помечаю «проверить». Рискованные шаги только с подтверждением. Всё записано в журнал.'],
        ['Кто увидит наши данные?', 'Каждый видит только свои направления и проекты. Подрядчики и клиенты видят только свою часть.'],
      ],
    },
    salary: {
      label: 'Зарплата',
      plans: [['0 ₸', 'Стажировка: до 5 человек'], ['от 9 900 ₸', 'в месяц, для команды'], ['от 49 900 ₸', 'в месяц, с AI-агентами']],
      note: 'На платных тарифах испытательный срок 14 дней.',
    },
    end: { stamp: 'ПРИНЯТ', h: 'Ну что, берёте?', x: 'Первым делом прочитаю ваши чаты.' },
  },
  kk: {
    title: 'proji — мені жұмысқа алыңыз',
    talkMessage: 'Сәлеметсіз бе! Proji туралы білгім келеді.',
    cta: 'Proji-ді жұмысқа алу',
    talk: 'Алдымен сөйлесу',
    nav: { skills: 'Дағдылар', exp: 'Тәжірибе', interview: 'Сұхбат', salary: 'Жалақы' },
    hero: {
      h: 'Мені жұмысқа алыңыз.',
      sub: 'Компанияңызға бәрін есінде сақтайтын, бәріне еске салатын және ештеңені жоғалтпайтын адам керек. Ол мен.',
      status: 'Жұмыс іздеп жүрмін',
      role: 'Бүкіл компанияның үйлестірушісі',
      rows: [['Кесте', 'Тәулік бойы, демалыссыз'], ['Жұмыс орны', 'Сіздің чаттарыңыз бен кездесулеріңіз'], ['Жалақы', 'айына 9 900 ₸-ден'], ['Сынақ мерзімі', '14 күн']],
    },
    about: { label: 'Өзім туралы', x: 'Мен жұмыс чаттарыңызды оқимын және кездесулеріңізді тыңдаймын. Келісімдерден орындаушысы мен мерзімі бар тапсырмалар жасаймын, өзім еске саламын, ал әр таң сайын сізге ең бастысын айтамын. Адамдарға ештеңе толтырудың қажеті жоқ.' },
    day: {
      label: 'Менің күнім',
      note: 'Мысал күн',
      rows: [
        ['07:30', 'Түнде болғанның бәрін оқып, сізге шолу жинадым.'],
        ['09:30', 'Жиналысты жазып алдым. Хаттама мен тапсырмалар бәрінде бар.'],
        ['12:00', 'Ержанға КҰ туралы еске салдым. Сізге еске салудың қажеті болмады.'],
        ['16:10', 'Шарттың тоқтап қалғанын байқадым. Сізге ескертіп, не істеу керегін айттым.'],
        ['23:00', 'Бәрі жазылды. Ұйықтай беріңіз.'],
      ],
    },
    skills: {
      label: 'Дағдылар',
      items: [
        ['Чаттарды оқимын', 'WhatsApp және Telegram. Кім, не және қай мерзімге дейін екенін табамын.'],
        ['Кездесулерді жазамын', 'Онлайн да, бетпе-бет те. Хаттама бәріне өзі келеді.'],
        ['Еске саламын', 'Мерзімдерді өзім нақтылап, мәртебелерді жинаймын.'],
        ['Тәуекелдерді байқаймын', 'Кешігу, шамадан тыс жүктеме және үнсіздік, не істеу керегі туралы кеңеспен.'],
        ['Бәрін есте сақтаймын', 'Шешімдер мен құжаттар. Дереккөзін көрсетіп жауап беремін.'],
        ['Командада жұмыс істеймін', 'Адамдармен және AI-агенттермен, яғни бағдарлама-көмекшілермен. Әр қадам журналда.'],
      ],
    },
    exp: { label: 'Жұмыс тәжірибесі' },
    weak: { label: 'Әлсіз жақтарым', items: ['Ұмытуды білмеймін.', 'Демалыс пен ауру парағын алмаймын.', 'Кешке не істейтініңізді табуыңызға тура келеді.'] },
    interview: {
      label: 'Сұхбат',
      hint: 'Маған сұрақ қойыңыз:',
      qa: [
        ['Неге сіз?', 'Өйткені маған еске салудың қажеті жоқ.'],
        ['Команда сізді қолдана ма?', 'Қажеті де жоқ. Олар WhatsApp пен Telegram-да бұрынғыдай жазады, қалғанын мен істеймін.'],
        ['Бізде CRM бар. Сіз не үшін керексіз?', 'CRM клиенттерді есінде сақтайды, ал мен жұмыстың орындалуын қадағалаймын. Қатар жұмыс істеймін, CRM және 1С интеграциялары бөлек қосылады.'],
        ['Қателессеңіз ше?', 'Сенімді болмасам, «тексеру» деп белгілеймін. Тәуекелді қадамдар тек растаумен. Бәрі журналға жазылады.'],
        ['Деректерімізді кім көреді?', 'Әркім тек өз бағыттары мен жобаларын көреді. Мердігерлер мен клиенттер тек өз бөлігін көреді.'],
      ],
    },
    salary: {
      label: 'Жалақы',
      plans: [['0 ₸', 'Тағылымдама: 5 адамға дейін'], ['9 900 ₸-ден', 'айына, команда үшін'], ['49 900 ₸-ден', 'айына, AI-агенттермен']],
      note: 'Ақылы тарифтерде сынақ мерзімі 14 күн.',
    },
    end: { stamp: 'ҚАБЫЛДАНДЫ', h: 'Ал, аласыз ба?', x: 'Алдымен чаттарыңызды оқимын.' },
  },
  en: {
    title: 'proji — hire me',
    talkMessage: 'Hello! I would like to learn more about Proji.',
    cta: 'Hire Proji',
    talk: 'Talk first',
    nav: { skills: 'Skills', exp: 'Experience', interview: 'Interview', salary: 'Salary' },
    hero: {
      h: 'Hire me.',
      sub: 'Your company needs someone who remembers everything, reminds everyone and loses nothing. That’s me.',
      status: 'Open to work',
      role: 'Company-wide coordinator',
      rows: [['Schedule', 'Around the clock, no days off'], ['Workplace', 'Your chats and meetings'], ['Salary', 'from ₸9,900 a month'], ['Probation', '14 days']],
    },
    about: { label: 'About me', x: 'I read your work chats and listen to your meetings. I turn what you agree on into tasks with an assignee and a deadline, send the reminders myself, and every morning tell you what matters. Nobody has to fill anything in.' },
    day: {
      label: 'My day',
      note: 'A sample day',
      rows: [
        ['07:30', 'Read everything from overnight and put together your digest.'],
        ['09:30', 'Recorded the stand-up. Minutes and tasks are with everyone.'],
        ['12:00', 'Reminded Yerzhan about the quote. You didn’t have to.'],
        ['16:10', 'Noticed the contract was stuck. Warned you and suggested what to do.'],
        ['23:00', 'Everything is written down. You can sleep.'],
      ],
    },
    skills: {
      label: 'Skills',
      items: [
        ['Reading chats', 'WhatsApp and Telegram. I find who, what and by when.'],
        ['Recording meetings', 'Online and in person. Minutes reach everyone by themselves.'],
        ['Reminding', 'I check deadlines and collect statuses myself.'],
        ['Spotting risks', 'Overdue work, overload and silence, with a hint on what to do.'],
        ['Remembering everything', 'Decisions and documents. I answer with a link to the source.'],
        ['Teamwork', 'With people and AI agents, software helpers. Every step is logged.'],
      ],
    },
    exp: { label: 'Work experience' },
    weak: { label: 'Weaknesses', items: ['I can’t forget.', 'I never take vacation or sick leave.', 'You’ll have to find something to do in the evenings.'] },
    interview: {
      label: 'Interview',
      hint: 'Ask me a question:',
      qa: [
        ['Why you?', 'Because nobody has to remind me.'],
        ['Will our team actually use you?', 'They don’t have to. They keep writing in WhatsApp and Telegram, and I do the rest.'],
        ['We already have a CRM. Why you?', 'A CRM remembers clients; I make sure the work gets done. I work alongside it, and CRM and 1C integrations connect separately.'],
        ['What if you make a mistake?', 'If I’m not sure, I mark it “review”. Risky steps only with confirmation. Everything is logged.'],
        ['Who will see our data?', 'Everyone sees only their own departments and projects. Contractors and clients see only their part.'],
      ],
    },
    salary: {
      label: 'Salary',
      plans: [['₸0', 'Internship: up to 5 people'], ['from ₸9,900', 'a month, for a team'], ['from ₸49,900', 'a month, with AI agents']],
      note: 'Paid plans include a 14-day probation.',
    },
    end: { stamp: 'HIRED', h: 'So, are you hiring?', x: 'First thing I’ll do is read your chats.' },
  },
  ar: {
    title: 'proji — وظّفني',
    talkMessage: 'مرحبًا! أرغب في معرفة المزيد عن Proji.',
    cta: 'وظّف Proji',
    talk: 'لنتحدث أولًا',
    nav: { skills: 'المهارات', exp: 'الخبرة', interview: 'المقابلة', salary: 'الراتب' },
    hero: {
      h: 'وظّفني.',
      sub: 'تحتاج شركتك إلى من يتذكر كل شيء، ويذكّر الجميع، ولا يضيّع شيئًا. هذا أنا.',
      status: 'أبحث عن عمل',
      role: 'منسّق الشركة كلها',
      rows: [['الدوام', 'على مدار الساعة، بلا إجازات'], ['مكان العمل', 'محادثاتك واجتماعاتك'], ['الراتب', 'من 9,900 ₸ شهريًا'], ['فترة التجربة', '14 يومًا']],
    },
    about: { label: 'نبذة عني', x: 'أقرأ محادثات العمل وأستمع إلى الاجتماعات. أحوّل ما تتفقون عليه إلى مهام بمنفّذ وموعد، وأذكّر بنفسي، وكل صباح أخبرك بالأهم. لا يحتاج أحد إلى ملء أي شيء.' },
    day: {
      label: 'يومي',
      note: 'يوم تجريبي',
      rows: [
        ['07:30', 'قرأت كل ما جرى ليلًا وأعددت لك الملخص.'],
        ['09:30', 'سجّلت الاجتماع. المحضر والمهام لدى الجميع.'],
        ['12:00', 'ذكّرت إرجان بعرض السعر. لم تحتج إلى تذكيره.'],
        ['16:10', 'لاحظت تعثر العقد. نبهتك واقترحت ما يجب فعله.'],
        ['23:00', 'كل شيء مكتوب. يمكنك أن تنام.'],
      ],
    },
    skills: {
      label: 'المهارات',
      items: [
        ['قراءة المحادثات', 'WhatsApp وTelegram. أجد من وماذا ومتى.'],
        ['تسجيل الاجتماعات', 'عن بُعد وحضوريًا. يصل المحضر إلى الجميع تلقائيًا.'],
        ['التذكير', 'أتحقق من المواعيد وأجمع الحالات بنفسي.'],
        ['رصد المخاطر', 'التأخير وضغط العمل والصمت، مع اقتراح بما يجب فعله.'],
        ['تذكّر كل شيء', 'القرارات والمستندات. أجيب مع رابط للمصدر.'],
        ['العمل ضمن فريق', 'مع الأشخاص ووكلاء الذكاء الاصطناعي، وهم برامج مساعدة. كل خطوة مسجّلة.'],
      ],
    },
    exp: { label: 'الخبرة العملية' },
    weak: { label: 'نقاط الضعف', items: ['لا أستطيع النسيان.', 'لا آخذ إجازة ولا إجازة مرضية.', 'عليك أن تجد ما تفعله في المساء.'] },
    interview: {
      label: 'المقابلة',
      hint: 'اطرح عليّ سؤالًا:',
      qa: [
        ['لماذا أنت؟', 'لأن لا أحد يحتاج إلى تذكيري.'],
        ['هل سيستخدمك فريقنا فعلًا؟', 'لا حاجة لذلك. يواصلون الكتابة في WhatsApp وTelegram، وأنا أتولى الباقي.'],
        ['لدينا نظام CRM. فلماذا أنت؟', 'يتذكر CRM العملاء، وأنا أتأكد من إنجاز العمل. أعمل إلى جانبه، وتُربط تكاملات CRM و1C بشكل منفصل.'],
        ['وماذا لو أخطأت؟', 'إذا لم أكن متأكدًا، أضع علامة «للمراجعة». الخطوات الحساسة بتأكيد فقط. وكل شيء مسجّل.'],
        ['من سيرى بياناتنا؟', 'يرى كلٌّ أقسامه ومشاريعه فقط. ويرى المقاولون والعملاء جزءهم فقط.'],
      ],
    },
    salary: {
      label: 'الراتب',
      plans: [['0 ₸', 'تدريب: حتى 5 أشخاص'], ['من 9,900 ₸', 'شهريًا، للفريق'], ['من 49,900 ₸', 'شهريًا، مع وكلاء الذكاء الاصطناعي']],
      note: 'فترة التجربة في الخطط المدفوعة 14 يومًا.',
    },
    end: { stamp: 'مقبول', h: 'إذن، هل ستوظفني؟', x: 'أول ما سأفعله هو قراءة محادثاتك.' },
  },
};

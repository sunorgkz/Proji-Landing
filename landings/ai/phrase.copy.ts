import type { Lang } from '../board/copy';

/**
 * /phrase — Proji AI для проектных менеджеров и команд. Только функции со статусом «работает по справке».
 * Имена и задачи — примерные, это ИЛЛЮСТРАЦИЯ. Разбор фразы на странице упрощён, настоящий делает Proji AI.
 * kk и ar должен вычитать носитель языка.
 */

export type DateCode = 'today' | 'tomorrow' | 'after' | 'eow' | 'eom' | 'd0' | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6';

export const PHRASE: Record<Lang, {
  title: string; cta: string; nav: [string, string, string]; note: string; locale: string;
  hero: { h: string; sub: string; label: string; samples: string[] };
  parse: { pre: string; urgent: string; rules: [string, DateCode][] };
  card: { task: string; who: string; due: string; prio: string; col: string; high: string; normal: string; colName: string; askWho: string; askDue: string; askTask: string; ok: string; done: string; again: string; draft: string };
  form: { h: string; fields: string[]; left: string; right: string; phrase: string };
  dates: { h: string; x: string; rows: [string, DateCode][] };
  more: { h: string; items: [string, string][] };
  board: { h: string; x: string; tabs: string[]; cols: string[]; quads: string[]; tasks: string[] };
  end: string;
}> = {
  ru: {
    title: 'proji ai — поставьте задачу фразой',
    cta: 'Поставить первую задачу',
    nav: ['Попробовать', 'Сроки', 'Доска'],
    note: 'Пример работает прямо здесь, данные примерные',
    locale: 'ru-RU',
    hero: { h: 'Поставьте задачу фразой.', sub: 'А не заполнением формы. Напишите, как написали бы коллеге: Proji AI соберёт карточку, посчитает срок и покажет черновик.', label: 'Напишите задачу', samples: ['Ержан, подготовь КП до пятницы', 'Сауле, срочно обнови прайс завтра', 'Мадина, согласуй договор до конца месяца'] },
    parse: { pre: '(?:\\s+(?:до|к|на|в|во|следующ\\S+|следующ\\S+))*\\s+', urgent: 'срочно', rules: [['послезавтра', 'after'], ['завтра', 'tomorrow'], ['сегодня', 'today'], ['конца недели', 'eow'], ['конца месяца', 'eom'], ['понедельник\\S*', 'd1'], ['вторник\\S*', 'd2'], ['сред\\S+', 'd3'], ['четверг\\S*', 'd4'], ['пятниц\\S+', 'd5'], ['суббот\\S+', 'd6'], ['воскресень\\S+', 'd0']] },
    card: { task: 'Задача', who: 'Исполнитель', due: 'Срок', prio: 'Приоритет', col: 'Колонка', high: 'Высокий', normal: 'Обычный', colName: 'Нужно сделать', askWho: 'Кому поручить?', askDue: 'К какому сроку?', askTask: 'Что нужно сделать?', ok: 'Подтвердить', done: 'Карточка создана', again: 'Ещё одну', draft: 'Черновик' },
    form: { h: 'Семь полей или одна фраза', fields: ['Название', 'Исполнитель', 'Срок', 'Приоритет', 'Проект', 'Колонка', 'Описание'], left: 'Как обычно', right: 'С Proji AI', phrase: 'Ержан, подготовь КП до пятницы' },
    dates: { h: 'Сроки считает календарь', x: 'Не угадывает. Вот что значат эти слова именно сегодня:', rows: [['послезавтра', 'after'], ['до конца месяца', 'eom'], ['следующий понедельник', 'd1']] },
    more: { h: 'Что ещё понимает', items: [['«Эта задача»', 'Понимает страницу, на которой вы находитесь. Спросите: «Когда срок у этой задачи?»'], ['Много карточек сразу', 'Массовые правки тоже идут через черновик. Посмотрели, подтвердили.'], ['Фото и файлы', 'Картинки, txt, md, csv, json, docx прямо в запросе. PDF загружается в «Документы».'], ['Уточняет, а не гадает', 'Нет такого исполнителя или колонки? Спросит, а не выдумает.']] },
    board: { h: 'Одна работа, четыре вида', x: 'Переключайте, как удобно сейчас.', tabs: ['Список', 'Канбан', 'Гант', 'Матрица'], cols: ['Нужно сделать', 'В работе', 'Готово'], quads: ['Срочно и важно', 'Важно', 'Срочно', 'Потом'], tasks: ['Подготовить КП', 'Обновить прайс', 'Согласовать договор', 'Собрать отчёт', 'Запустить кампанию', 'Найти подрядчика'] },
    end: 'Напишите первую задачу.',
  },
  kk: {
    title: 'proji ai — тапсырманы бір сөйлеммен қойыңыз',
    cta: 'Алғашқы тапсырманы қою',
    nav: ['Байқап көру', 'Мерзімдер', 'Тақта'],
    note: 'Мысал дәл осы жерде жұмыс істейді, деректер мысал үшін',
    locale: 'kk-KZ',
    hero: { h: 'Тапсырманы бір сөйлеммен қойыңыз.', sub: 'Форма толтырмай-ақ. Әріптесіңізге жазғандай жазыңыз: Proji AI карточка жинап, мерзімді есептеп, жобасын көрсетеді.', label: 'Тапсырманы жазыңыз', samples: ['Ержан, жұмаға дейін КҰ дайында', 'Сәуле, шұғыл прайсты ертең жаңарт', 'Мадина, ай соңына дейін шартты келіс'] },
    parse: { pre: '(?:\\s+келесі)?\\s+', urgent: 'шұғыл', rules: [['бүрсігүні', 'after'], ['ертең\\S*(?:\\s+дейін)?', 'tomorrow'], ['бүгін\\S*', 'today'], ['апта соңына(?:\\s+дейін)?', 'eow'], ['ай соңына(?:\\s+дейін)?', 'eom'], ['дүйсенбі\\S*(?:\\s+дейін)?', 'd1'], ['сейсенбі\\S*(?:\\s+дейін)?', 'd2'], ['сәрсенбі\\S*(?:\\s+дейін)?', 'd3'], ['бейсенбі\\S*(?:\\s+дейін)?', 'd4'], ['жұма\\S*(?:\\s+дейін)?', 'd5'], ['сенбі\\S*(?:\\s+дейін)?', 'd6'], ['жексенбі\\S*(?:\\s+дейін)?', 'd0']] },
    card: { task: 'Тапсырма', who: 'Орындаушы', due: 'Мерзімі', prio: 'Басымдық', col: 'Баған', high: 'Жоғары', normal: 'Қалыпты', colName: 'Істеу керек', askWho: 'Кімге тапсырамыз?', askDue: 'Қай мерзімге дейін?', askTask: 'Не істеу керек?', ok: 'Растау', done: 'Карточка құрылды', again: 'Тағы біреу', draft: 'Жоба' },
    form: { h: 'Жеті өріс немесе бір сөйлем', fields: ['Атауы', 'Орындаушы', 'Мерзімі', 'Басымдық', 'Жоба', 'Баған', 'Сипаттама'], left: 'Әдеттегідей', right: 'Proji AI-мен', phrase: 'Ержан, жұмаға дейін КҰ дайында' },
    dates: { h: 'Мерзімді күнтізбе есептейді', x: 'Болжамайды. Бұл сөздер дәл бүгін нені білдіреді:', rows: [['бүрсігүні', 'after'], ['ай соңына дейін', 'eom'], ['келесі дүйсенбі', 'd1']] },
    more: { h: 'Тағы не түсінеді', items: [['«Осы тапсырма»', 'Қай бетте екеніңізді түсінеді. Сұраңыз: «Бұл тапсырманың мерзімі қашан?»'], ['Бірден көп карточка', 'Жаппай түзетулер де жоба арқылы өтеді. Қарадыңыз, растадыңыз.'], ['Фото мен файлдар', 'Суреттер, txt, md, csv, json, docx сұраныста. PDF «Құжаттарға» жүктеледі.'], ['Болжамайды, нақтылайды', 'Ондай орындаушы немесе баған жоқ па? Ойдан шығармай, сұрайды.']] },
    board: { h: 'Бір жұмыс, төрт көрініс', x: 'Қазір ыңғайлысына ауысыңыз.', tabs: ['Тізім', 'Канбан', 'Гант', 'Матрица'], cols: ['Істеу керек', 'Жұмыста', 'Дайын'], quads: ['Шұғыл әрі маңызды', 'Маңызды', 'Шұғыл', 'Кейін'], tasks: ['КҰ дайындау', 'Прайсты жаңарту', 'Шартты келісу', 'Есеп жинау', 'Науқанды бастау', 'Мердігер табу'] },
    end: 'Алғашқы тапсырмаңызды жазыңыз.',
  },
  en: {
    title: 'proji ai — set a task in one phrase',
    cta: 'Set your first task',
    nav: ['Try it', 'Deadlines', 'Board'],
    note: 'The example works right here, the data is sample data',
    locale: 'en-GB',
    hero: { h: 'Set a task in one phrase.', sub: 'Not by filling in a form. Write it as you would to a colleague: Proji AI builds the card, works out the deadline and shows a draft.', label: 'Write a task', samples: ['Yerzhan, prepare the quote by Friday', 'Saule, urgent update the price list tomorrow', 'Madina, approve the contract by the end of the month'] },
    parse: { pre: '(?:\\s+(?:by|until|before|on|next|the))*\\s+', urgent: 'urgent(?:ly)?', rules: [['day after tomorrow', 'after'], ['tomorrow', 'tomorrow'], ['today', 'today'], ['end of (?:the )?week', 'eow'], ['end of (?:the )?month', 'eom'], ['monday', 'd1'], ['tuesday', 'd2'], ['wednesday', 'd3'], ['thursday', 'd4'], ['friday', 'd5'], ['saturday', 'd6'], ['sunday', 'd0']] },
    card: { task: 'Task', who: 'Assignee', due: 'Due', prio: 'Priority', col: 'Column', high: 'High', normal: 'Normal', colName: 'To do', askWho: 'Who should do it?', askDue: 'By when?', askTask: 'What needs doing?', ok: 'Confirm', done: 'Card created', again: 'One more', draft: 'Draft' },
    form: { h: 'Seven fields or one phrase', fields: ['Title', 'Assignee', 'Due date', 'Priority', 'Project', 'Column', 'Description'], left: 'The usual way', right: 'With Proji AI', phrase: 'Yerzhan, prepare the quote by Friday' },
    dates: { h: 'The calendar counts the deadlines', x: 'No guessing. Here’s what these words mean today:', rows: [['the day after tomorrow', 'after'], ['by the end of the month', 'eom'], ['next Monday', 'd1']] },
    more: { h: 'What else it understands', items: [['“This task”', 'It knows which page you’re on. Ask: “When is this task due?”'], ['Many cards at once', 'Bulk edits go through a draft too. Look, then confirm.'], ['Photos and files', 'Images, txt, md, csv, json, docx right in your request. PDFs go into “Documents”.'], ['Asks instead of guessing', 'No such assignee or column? It asks rather than makes one up.']] },
    board: { h: 'One job, four views', x: 'Switch to whatever suits you now.', tabs: ['List', 'Kanban', 'Gantt', 'Matrix'], cols: ['To do', 'In progress', 'Done'], quads: ['Urgent and important', 'Important', 'Urgent', 'Later'], tasks: ['Prepare the quote', 'Update the price list', 'Approve the contract', 'Build the report', 'Launch the campaign', 'Find a contractor'] },
    end: 'Write your first task.',
  },
  ar: {
    title: 'proji ai — حدّد المهمة بجملة واحدة',
    cta: 'أنشئ أول مهمة',
    nav: ['جرّب', 'المواعيد', 'اللوحة'],
    note: 'المثال يعمل هنا مباشرة، والبيانات تجريبية',
    locale: 'ar-u-ca-gregory-nu-latn',
    hero: { h: 'حدّد المهمة بجملة واحدة.', sub: 'دون ملء نموذج. اكتب كما تكتب لزميلك: ينشئ Proji AI البطاقة، ويحسب الموعد، ويعرض مسودة.', label: 'اكتب مهمة', samples: ['إرجان، جهّز عرض السعر قبل الجمعة', 'ساولي، عاجل حدّث قائمة الأسعار غدًا', 'مادينا، اعتمدي العقد قبل نهاية الشهر'] },
    parse: { pre: '(?:\\s+(?:قبل|حتى|بحلول|يوم))*\\s+', urgent: 'عاجل', rules: [['بعد غد', 'after'], ['غدًا|غدا', 'tomorrow'], ['اليوم', 'today'], ['نهاية الأسبوع', 'eow'], ['نهاية الشهر', 'eom'], ['الاثنين', 'd1'], ['الثلاثاء', 'd2'], ['الأربعاء', 'd3'], ['الخميس', 'd4'], ['الجمعة', 'd5'], ['السبت', 'd6'], ['الأحد', 'd0']] },
    card: { task: 'المهمة', who: 'المنفّذ', due: 'الموعد', prio: 'الأولوية', col: 'العمود', high: 'عالية', normal: 'عادية', colName: 'للتنفيذ', askWho: 'لمن نسندها؟', askDue: 'إلى أي موعد؟', askTask: 'ما المطلوب؟', ok: 'تأكيد', done: 'تم إنشاء البطاقة', again: 'واحدة أخرى', draft: 'مسودة' },
    form: { h: 'سبعة حقول أم جملة واحدة', fields: ['العنوان', 'المنفّذ', 'الموعد', 'الأولوية', 'المشروع', 'العمود', 'الوصف'], left: 'كالمعتاد', right: 'مع Proji AI', phrase: 'إرجان، جهّز عرض السعر قبل الجمعة' },
    dates: { h: 'التقويم يحسب المواعيد', x: 'دون تخمين. هذا ما تعنيه هذه الكلمات اليوم:', rows: [['بعد غد', 'after'], ['قبل نهاية الشهر', 'eom'], ['الاثنين القادم', 'd1']] },
    more: { h: 'ماذا يفهم أيضًا', items: [['«هذه المهمة»', 'يعرف في أي صفحة أنت. اسأل: «متى موعد هذه المهمة؟»'], ['بطاقات كثيرة دفعة واحدة', 'التعديلات الجماعية تمر عبر مسودة أيضًا. راجع ثم أكّد.'], ['الصور والملفات', 'الصور وtxt وmd وcsv وjson وdocx مباشرة في طلبك. أما PDF فيُرفع إلى «المستندات».'], ['يسأل بدل أن يخمّن', 'لا يوجد منفّذ أو عمود بهذا الاسم؟ يسأل ولا يختلق.']] },
    board: { h: 'عمل واحد، أربعة عروض', x: 'بدّل إلى ما يناسبك الآن.', tabs: ['قائمة', 'كانبان', 'غانت', 'مصفوفة'], cols: ['للتنفيذ', 'قيد العمل', 'تم'], quads: ['عاجل ومهم', 'مهم', 'عاجل', 'لاحقًا'], tasks: ['تجهيز عرض السعر', 'تحديث قائمة الأسعار', 'اعتماد العقد', 'إعداد التقرير', 'إطلاق الحملة', 'إيجاد مقاول'] },
    end: 'اكتب أول مهمة.',
  },
};

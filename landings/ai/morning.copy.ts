import type { Lang } from '../board/copy';

/**
 * /morning — Proji AI для руководителей: десять минут утра. Только функции со статусом «работает по справке»;
 * сводка запускается кнопкой, расписание не обещаем. Цифры и имена — примерные, это ИЛЛЮСТРАЦИЯ.
 * kk и ar должен вычитать носитель языка.
 */
export const MORNING: Record<Lang, {
  title: string; cta: string; nav: [string, string, string]; note: string; minute: string;
  hero: { a: string; b: string; sub: string };
  day: { h: string; x: string; btn: string; list: string[] };
  fire: { h: string; x: string; rows: [string, number][] };
  will: { h: string; x: string; q: string; left: string; speed: string; need: string; have: string; ok: string; risk: string };
  load: { h: string; x: string; over: string; free: string; rows: [string, number][] };
  goals: { h: string; x: string; rows: [string, number][] };
  done: { h: string; x: string };
  trust: { h: string; items: [string, string][] };
}> = {
  ru: {
    title: 'proji ai — что горит и успеем ли',
    cta: 'Начать утро с Proji',
    nav: ['Утро', 'Успеем ли', 'Доверие'],
    note: 'Примерные цифры',
    minute: 'Минута',
    hero: { a: 'Что горит и успеем ли.', b: 'За 10 минут утром.', sub: 'Откройте Proji, нажмите «Сводка дня» и спросите, что волнует. Цифры берутся из реальной работы команды, а не из отчётов.' },
    day: { h: 'Сводка дня', x: 'Одна кнопка. Сразу видно, что сделано, что просрочено и на что посмотреть первым.', btn: 'Сводка дня', list: ['Сделано вчера: 12 задач', 'Просрочено: 3', 'Посмотреть первым: договор аренды'] },
    fire: { h: 'Что горит', x: 'Центр управления сам считает сигналы по направлениям. Из журнала работы, без догадок ИИ.', rows: [['Забытые задачи', 4], ['Переносы сроков', 7], ['Зависшие согласования', 2]] },
    will: { h: 'Успеем ли?', x: 'Спросите как есть. Proji AI посчитает по реальной скорости команды и назовёт риск. Подвигайте ползунок.', q: 'Успеем ли до конца недели?', left: 'Осталось задач', speed: 'Скорость команды: 3 задачи в день', need: 'Нужно дней', have: 'Осталось дней', ok: 'Успеваете', risk: 'Есть риск' },
    load: { h: 'Кто перегружен', x: 'Видно, кто завален, а кто свободен. Proji AI не оценивает людей, он показывает числа.', over: 'перегружен', free: 'свободен', rows: [['Мадина', 14], ['Ержан', 9], ['Сауле', 6], ['Айбек', 2]] },
    goals: { h: 'Куда идём', x: 'OKR, дерево целей и дорожная карта. Видно, двигает ли сегодняшняя работа компанию к цели.', rows: [['Открыть филиал', 70], ['Вырастить продажи', 45], ['Навести порядок в процессах', 30]] },
    done: { h: 'Всё. Можно работать.', x: 'Десять минут, и вы знаете, куда идти.' },
    trust: { h: 'Почему этому можно верить', items: [['Журнал', 'Кто и что менял, записано.'], ['Только ваше', 'Proji AI видит то, что видите вы.'], ['Никаких оценок', 'Здоровье, оценки, навыки и личное он не получает никогда.']] },
  },
  kk: {
    title: 'proji ai — не шұғыл және үлгереміз бе',
    cta: 'Таңды Proji-мен бастау',
    nav: ['Таң', 'Үлгереміз бе', 'Сенім'],
    note: 'Мысал сандар',
    minute: 'Минут',
    hero: { a: 'Не шұғыл және үлгереміз бе.', b: 'Таңертең 10 минутта.', sub: 'Proji-ді ашып, «Күн шолуы» батырмасын басыңыз да, мазалағанды сұраңыз. Сандар есептерден емес, команданың нақты жұмысынан алынады.' },
    day: { h: 'Күн шолуы', x: 'Бір батырма. Не істелгені, не кешіктірілгені және алдымен неге қарау керегі бірден көрінеді.', btn: 'Күн шолуы', list: ['Кеше орындалды: 12 тапсырма', 'Кешіктірілді: 3', 'Алдымен қарау керек: жалға алу шарты'] },
    fire: { h: 'Не шұғыл', x: 'Басқару орталығы бағыттар бойынша сигналдарды өзі есептейді. Жұмыс журналынан, ИИ-дың болжамынсыз.', rows: [['Ұмытылған тапсырмалар', 4], ['Мерзім ауыстырулар', 7], ['Тоқтап қалған келісулер', 2]] },
    will: { h: 'Үлгереміз бе?', x: 'Сол күйінде сұраңыз. Proji AI команданың нақты жылдамдығымен есептеп, тәуекелді айтады. Жүгірткіні жылжытыңыз.', q: 'Апта соңына дейін үлгереміз бе?', left: 'Қалған тапсырмалар', speed: 'Команда жылдамдығы: күніне 3 тапсырма', need: 'Қажет күн', have: 'Қалған күн', ok: 'Үлгересіз', risk: 'Тәуекел бар' },
    load: { h: 'Кім шамадан тыс жүктелген', x: 'Кім жүктелгені, кім бос екені көрінеді. Proji AI адамдарды бағаламайды, сандарды көрсетеді.', over: 'жүктелген', free: 'бос', rows: [['Мадина', 14], ['Ержан', 9], ['Сәуле', 6], ['Айбек', 2]] },
    goals: { h: 'Қайда бара жатырмыз', x: 'OKR, мақсаттар ағашы және жол картасы. Бүгінгі жұмыс компанияны мақсатқа жақындатып жатыр ма, көрінеді.', rows: [['Филиал ашу', 70], ['Сатуды өсіру', 45], ['Процестерді ретке келтіру', 30]] },
    done: { h: 'Болды. Жұмыс істей беріңіз.', x: 'Он минут, және қайда бару керегін білесіз.' },
    trust: { h: 'Неге сенуге болады', items: [['Журнал', 'Кім не өзгерткені жазылған.'], ['Тек сіздікі', 'Proji AI сіз көретінді ғана көреді.'], ['Бағасыз', 'Денсаулық, бағалар, дағдылар мен жеке деректерді ешқашан алмайды.']] },
  },
  en: {
    title: 'proji ai — what’s on fire and will we make it',
    cta: 'Start your morning with Proji',
    nav: ['Morning', 'Will we make it', 'Trust'],
    note: 'Sample numbers',
    minute: 'Minute',
    hero: { a: 'What’s on fire, and will we make it.', b: 'In 10 minutes each morning.', sub: 'Open Proji, press “Day summary” and ask what’s on your mind. The numbers come from your team’s real work, not from reports.' },
    day: { h: 'Day summary', x: 'One button. You see right away what’s done, what’s overdue and what to look at first.', btn: 'Day summary', list: ['Done yesterday: 12 tasks', 'Overdue: 3', 'Look at first: lease agreement'] },
    fire: { h: 'What’s on fire', x: 'The control center counts signals by department by itself. From the work log, with no AI guessing.', rows: [['Forgotten tasks', 4], ['Moved deadlines', 7], ['Stuck approvals', 2]] },
    will: { h: 'Will we make it?', x: 'Just ask. Proji AI works it out from your team’s real speed and names the risk. Move the slider.', q: 'Will we make it by the end of the week?', left: 'Tasks left', speed: 'Team speed: 3 tasks a day', need: 'Days needed', have: 'Days left', ok: 'You’ll make it', risk: 'At risk' },
    load: { h: 'Who’s overloaded', x: 'See who’s swamped and who’s free. Proji AI doesn’t rate people, it shows numbers.', over: 'overloaded', free: 'free', rows: [['Madina', 14], ['Yerzhan', 9], ['Saule', 6], ['Aibek', 2]] },
    goals: { h: 'Where we’re going', x: 'OKRs, a goal tree and a roadmap. See whether today’s work moves the company toward the goal.', rows: [['Open a branch', 70], ['Grow sales', 45], ['Put processes in order', 30]] },
    done: { h: 'Done. Time to work.', x: 'Ten minutes, and you know where to go.' },
    trust: { h: 'Why you can trust it', items: [['Log', 'Who changed what is on record.'], ['Only yours', 'Proji AI sees only what you see.'], ['No ratings', 'Health, ratings, skills and personal data never reach it.']] },
  },
  ar: {
    title: 'proji ai — ما العاجل وهل سننجز',
    cta: 'ابدأ صباحك مع Proji',
    nav: ['الصباح', 'هل سننجز', 'الثقة'],
    note: 'أرقام تجريبية',
    minute: 'الدقيقة',
    hero: { a: 'ما العاجل، وهل سننجز.', b: 'في 10 دقائق كل صباح.', sub: 'افتح Proji، واضغط «ملخص اليوم»، واسأل عما يشغلك. الأرقام تأتي من عمل فريقك الفعلي، لا من التقارير.' },
    day: { h: 'ملخص اليوم', x: 'زر واحد. ترى فورًا ما أُنجز، وما تأخر، وما يجب النظر إليه أولًا.', btn: 'ملخص اليوم', list: ['أُنجز أمس: 12 مهمة', 'متأخر: 3', 'انظر أولًا: عقد الإيجار'] },
    fire: { h: 'ما العاجل', x: 'يحسب مركز التحكم الإشارات حسب الأقسام بنفسه. من سجل العمل، دون تخمين من الذكاء الاصطناعي.', rows: [['مهام منسية', 4], ['مواعيد مؤجلة', 7], ['موافقات عالقة', 2]] },
    will: { h: 'هل سننجز؟', x: 'اسأل كما هو. يحسب Proji AI بسرعة فريقك الفعلية ويحدد الخطر. حرّك المؤشر.', q: 'هل سننجز قبل نهاية الأسبوع؟', left: 'المهام المتبقية', speed: 'سرعة الفريق: 3 مهام في اليوم', need: 'الأيام اللازمة', have: 'الأيام المتبقية', ok: 'ستنجز', risk: 'يوجد خطر' },
    load: { h: 'من المثقل بالعمل', x: 'ترى من المثقل ومن المتفرغ. لا يقيّم Proji AI الأشخاص، بل يعرض الأرقام.', over: 'مثقل', free: 'متفرغ', rows: [['مادينا', 14], ['إرجان', 9], ['ساولي', 6], ['أيبيك', 2]] },
    goals: { h: 'إلى أين نتجه', x: 'الأهداف والنتائج الرئيسية، وشجرة الأهداف، وخارطة الطريق. ترى هل يقرّب عمل اليوم الشركة من هدفها.', rows: [['افتتاح فرع', 70], ['زيادة المبيعات', 45], ['تنظيم العمليات', 30]] },
    done: { h: 'انتهينا. وقت العمل.', x: 'عشر دقائق، وتعرف إلى أين تتجه.' },
    trust: { h: 'لماذا يمكنك الوثوق به', items: [['السجل', 'من غيّر ماذا، مسجّل.'], ['ما يخصك فقط', 'يرى Proji AI ما تراه أنت فقط.'], ['بلا تقييمات', 'الصحة والتقييمات والمهارات والبيانات الشخصية لا تصله أبدًا.']] },
  },
};

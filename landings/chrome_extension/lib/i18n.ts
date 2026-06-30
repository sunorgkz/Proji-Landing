export type Lang = "ru" | "en" | "ar" | "kk";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "kk", label: "Қазақша" },
];

export const isRTL = (l: Lang) => l === "ar";

export const brandWord = (l: Lang) => (l === "ar" ? "بروجي" : "proji");

type Dict = {
  install: string;
  installFree: string;
  freeNote: string;
  heroTitle: string;
  heroSub: string;
  featuresTitle: string;
  features: { title: string; desc: string }[];
  howTitle: string;
  steps: string[];
  whyTitle: string;
  why: { title: string; desc: string }[];
  midCtaTitle: string;
  midCtaBtn: string;
  worksTitle: string;
  finalTitle: string;
  finalNote: string;
  footerLinks: string[];
  copyright: string;
  language: string;
  theme: string;
};

export const dict: Record<Lang, Dict> = {
  ru: {
    install: "Установить расширение",
    installFree: "Скачать расширение (.zip)",
    freeNote: "Бесплатно · 1 клик · Работает везде",
    heroTitle: "собирай задачи прямо из браузера",
    heroSub: "Любая страница, AI-чат, поиск или статья — мгновенно превращается в задачу, проект или запись в твоей базе знаний Proji. Без переключения вкладок и копипасты.",
    featuresTitle: "Что ты получаешь",
    features: [
      { title: "Работай без помех", desc: "Виджет не закрывает контент, его можно перетащить куда удобно и свернуть в капсулу — ты сохраняешь фокус, а не тратишь его на интерфейс." },
      { title: "Сразу понимай, что делать", desc: "AI анализирует страницу и предлагает конкретное действие в Proji: задачу, заметку или проект — не общую пустышку, а рабочий результат." },
      { title: "Превращай диалоги с AI в план", desc: "ChatGPT, Gemini, Claude, DeepSeek, Grok, Copilot: ловит суть переписки и предлагает зафиксировать план, идеи и следующие шаги." },
      { title: "Не теряй полезные находки", desc: "Google, Яндекс, Bing, DuckDuckGo: прямо в результатах поиска создаёшь задачу с ссылкой и контекстом, чтобы вернуться к ней позже." },
      { title: "Сохраняй важное из статей", desc: "Органично встраивается в верстку статьи и переносит ключевую информацию в базу знаний — никакой баннерности, только польза." },
      { title: "Разбирай сложное на месте", desc: "Мини-чат «Обсудить» прямо в виджете помогает разложить задачу на шаги и уточнить детали, не перескакивая между вкладками." },
      { title: "Экономь время на переносе", desc: "Один клик — и заголовок, описание, ссылка и переписка с ассистентом уже в Proji. Не нужно копировать и вставлять вручную." },
      { title: "Получай дела, а не воду", desc: "Proji предлагает только то, что реально можно сделать самому или с командой — без лишнего пафоса и невыполнимых задач." },
      { title: "Делай подсказки точнее под себя", desc: "Лайк/дизлайк в каждой карточке учит Proji твоим приоритетам: с каждым отзывом рекомендации становятся релевантнее." },
      { title: "Сохраняй любой текст мгновенно", desc: "Выделил текст на странице → правый клик → он уже в задаче или базе знаний Proji. Быстрее, чем открыть заметки." },
      { title: "Выглядит естественно на любом сайте", desc: "Адаптивный стиль подстраивает цвет и форму виджета под оформление сайта — он не выбивается из привычного интерфейса." },
      { title: "Контролируй свои данные", desc: "Анализ работает только для подсказки. Ничего не уходит в Proji и не публикуется без твоего явного клика." },
    ],
    howTitle: "Как начать получать результат",
    steps: [
      "Установи расширение",
      "Открой любую страницу, чат с AI или поиск",
      "proji сам предложит, что с этим сделать",
      "Один клик — и идея уже в твоём проекте",
    ],
    whyTitle: "Почему это ускорит тебя",
    why: [
      { title: "Меньше переключений между вкладками", desc: "Не нужно держать 50 открытых страниц в голове — всё, что важно, сразу оформляется в задачи." },
      { title: "Любая мысль не пропадает", desc: "Статья, идея из чата или поисковая находка мгновенно становятся задачей с контекстом и ссылкой." },
      { title: "Команда находит нужное быстрее", desc: "Полезные статьи и переписки сохраняются в общую базу знаний, а не теряются в личных закладках." },
      { title: "Меньше рутины, больше главного", desc: "proji забирает на себя копипасту и формулировки — у тебя остаётся время на реальную работу." },
    ],
    midCtaTitle: "Перестань терять идеи в бесконечных вкладках",
    midCtaBtn: "Установить proji",
    worksTitle: "Где работает",
    finalTitle: "Начни собирать задачи из браузера прямо сейчас",
    finalNote: "Бесплатно. Скачайте архив и установите вручную в Chrome.",
    footerLinks: ["О Proji", "Конфиденциальность", "Поддержка"],
    copyright: "© 2026 proji. Все права защищены.",
    language: "Язык",
    theme: "Тема",
  },
  en: {
    install: "Install extension",
    installFree: "Download extension (.zip)",
    freeNote: "Free · 1 click · Works everywhere",
    heroTitle: "turn any browser tab into action",
    heroSub: "Any page, AI chat, search result, or article becomes a task, project, or knowledge note in Proji — without switching tabs or copy-pasting.",
    featuresTitle: "What you get",
    features: [
      { title: "Stay focused while you work", desc: "The widget never covers content, can be dragged wherever you want, and collapses into a capsule — so your attention stays on the page, not the UI." },
      { title: "Know the next step instantly", desc: "AI reads the page and suggests a concrete action in Proji: a task, note, or project — not a vague prompt, but a real outcome." },
      { title: "Turn AI chats into plans", desc: "ChatGPT, Gemini, Claude, DeepSeek, Grok, Copilot: it captures the gist and offers to save the plan, ideas, and next steps." },
      { title: "Never lose a useful find", desc: "Google, Yandex, Bing, DuckDuckGo: create a task with context and link directly inside the search results, so you can come back later." },
      { title: "Save what matters from articles", desc: "It embeds naturally into the article layout and moves key information into your knowledge base — no banner feel, just value." },
      { title: "Break down complexity on the spot", desc: "The built-in \"Discuss\" mini-chat helps you split a task into steps and clarify details without jumping between tabs." },
      { title: "Save time on handoffs", desc: "One click moves the title, description, link, and assistant conversation into Proji — no manual copy-paste needed." },
      { title: "Get actions, not fluff", desc: "Proji suggests only things you can actually do alone or with your team — no inflated, impossible tasks." },
      { title: "Make suggestions match you", desc: "Like or dislike each card to teach Proji your priorities; recommendations get more relevant with every feedback." },
      { title: "Save any text in seconds", desc: "Select text on the page → right click → it's already a task or knowledge note in Proji, faster than opening your notes app." },
      { title: "Looks natural on any site", desc: "Adaptive styling matches the widget's color and shape to the site you're on, so it never feels out of place." },
      { title: "Stay in control of your data", desc: "Analysis is only used to suggest actions. Nothing is sent to Proji or published without your explicit click." },
    ],
    howTitle: "How to start getting results",
    steps: [
      "Install the extension",
      "Open any page, AI chat, or search",
      "proji will suggest what to do with it",
      "One click — and the idea is in your project",
    ],
    whyTitle: "Why it speeds you up",
    why: [
      { title: "Fewer tab switches", desc: "No need to keep 50 tabs in your head — anything important becomes a task right away." },
      { title: "No idea gets lost", desc: "An article, chat insight, or search find instantly becomes a task with full context and a link." },
      { title: "Your team finds things faster", desc: "Useful articles and chats land in a shared knowledge base instead of disappearing in personal bookmarks." },
      { title: "Less routine, more work that matters", desc: "Proji handles copy-paste and wording for you, leaving more time for real work." },
    ],
    midCtaTitle: "Stop losing ideas across endless tabs",
    midCtaBtn: "Install proji",
    worksTitle: "Where it works",
    finalTitle: "Start collecting tasks from your browser now",
    finalNote: "Free. Download the archive and install manually in Chrome.",
    footerLinks: ["About Proji", "Privacy", "Support"],
    copyright: "© 2026 proji. All rights reserved.",
    language: "Language",
    theme: "Theme",
  },
  ar: {
    install: "تثبيت الإضافة",
    installFree: "تثبيت مجاني — تحميل ZIP",
    freeNote: "مجاناً · بنقرة واحدة · يعمل في كل مكان",
    heroTitle: "حوّل أي علامة تبويب إلى نتيجة",
    heroSub: "أي صفحة أو محادثة ذكاء اصطناعي أو نتيجة بحث أو مقال تصبح مهمة أو مشروعاً أو ملاحظة معرفة في Proji — دون تبديل علامات التبويب أو النسخ واللصق.",
    featuresTitle: "ما الذي ستستفيده",
    features: [
      { title: "ركّز في عملك", desc: "الأداة لا تغطي المحتوى، يمكن سحبها إلى أي مكان وطيها إلى كبسولة صغيرة — ليبقى تركيزك على الصفحة وليس على الواجهة." },
      { title: "اعرف الخطوة التالية فوراً", desc: "الذكاء الاصطناعي يقرأ الصفحة ويقترح إجراءً محدداً في Proji: مهمة أو ملاحظة أو مشروع — ليس توجيهاً عاماً، بل نتيجة حقيقية." },
      { title: "حوّل محادثات الذكاء الاصطناعي إلى خطط", desc: "ChatGPT وGemini وClaude وDeepSeek وGrok وCopilot: يلتقط جوهر الحوار ويقترح حفظ الخطة والأفكار والخطوات التالية." },
      { title: "لا تفقد الاكتشافات المفيدة", desc: "Google وYandex وBing: أنشئ مهمة مع السياق والرابط مباشرة داخل نتائج البحث للعودة إليها لاحقاً." },
      { title: "احفظ المهم من المقالات", desc: "يندمج بشكل طبيعي في تخطيط المقالة وينقل المعلومات الأساسية إلى قاعدة المعرفة — بدون إعلانية، فقط قيمة." },
      { title: "حلّل المعقد في مكانه", desc: "محادثة \"ناقش\" المصغرة تساعدك على تقسيم المهمة إلى خطوات وتوضيح التفاصيل داخل الأداة دون تبديل علامات التبويب." },
      { title: "وفر وقت التنقل بين التطبيقات", desc: "نقرة واحدة تنقل العنوان والوصف والرابط والمحادثة إلى Proji — دون حاجة للنسخ واللصق يدوياً." },
      { title: "احصل على أعمال لا كلاماً فارغاً", desc: "يقترح Proji فقط ما يمكنك فعله فعلاً بمفردك أو مع فريقك — بدون مهام مبالغ فيها أو مستحيلة." },
      { title: "اجعل الاقتراحات تناسبك", desc: "أعجبك/لم يعجبك داخل كل بطاقة يعلّم Proji أولوياتك؛ تصبح التوصيات أكثر دقة مع كل تعليق." },
      { title: "احفظ أي نص في ثوانٍ", desc: "حدد النص على الصفحة → نقرة يمين → تصبح مهمة أو ملاحظة في Proji، أسرع من فتح تطبيق الملاحظات." },
      { title: "مظهر طبيعي على أي موقع", desc: "التنسيق المتكيف يضبط لون الأداة وشكلها على الموقع الذي تتصفحه، فلا تبدو غريبة." },
      { title: "تحكم في بياناتك", desc: "التحليل يستخدم فقط للاقتراحات. لا شيء يُرسل إلى Proji أو يُنشر دون نقرة صريحة منك." },
    ],
    howTitle: "كيف تبدأ بالحصول على نتائج",
    steps: [
      "ثبّت الإضافة",
      "افتح أي صفحة أو محادثة ذكاء اصطناعي أو بحث",
      "سيقترح proji ما يمكن فعله",
      "نقرة واحدة — والفكرة في مشروعك",
    ],
    whyTitle: "لماذا يُسرّع هذا عملك",
    why: [
      { title: "تبديل أقل بين علامات التبويب", desc: "لا داعي للاحتفاظ بـ50 علامة تبويب في ذهنك — أي شيء مهم يصبح مهمة فوراً." },
      { title: "لا فكرة تضيع", desc: "المقالة أو الرؤية من المحادثة أو نتيجة البحث تصبح مهمة فوراً مع سياقها ورابطها." },
      { title: "فريقك يجد المعلومات بسرعة", desc: "المقالات والمحادثات المفيدة تنتقل إلى قاعدة معرفة مشتركة بدلاً من الاختفاء في الإشارات المرجعية الشخصية." },
      { title: "روتين أقل، عمل أهم", desc: "يتولى Proji النسخ والصق وصياغة النصوص، فيتبقى لك وقت أكثر للعمل الحقيقي." },
    ],
    midCtaTitle: "كفى عن ضياع الأفكار بين علامات التبويب",
    midCtaBtn: "ثبّت proji",
    worksTitle: "أين يعمل",
    finalTitle: "ابدأ بجمع المهام من متصفحك الآن",
    finalNote: "مجاناً. حمّل الأرشيف وثبّت يدوياً في Chrome.",
    footerLinks: ["عن Proji", "الخصوصية", "الدعم"],
    copyright: "© 2026 proji. جميع الحقوق محفوظة.",
    language: "اللغة",
    theme: "السمة",
  },
  kk: {
    install: "Кеңейтуді орнату",
    installFree: "Кеңейтуді жүктеу (.zip)",
    freeNote: "Тегін · 1 шерту · Барлық жерде жұмыс істейді",
    heroTitle: "кез келген қойындыдан тапсырма жаса",
    heroSub: "Кез келген бет, AI чаты, іздеу нәтижесі немесе мақала Proji-дегі тапсырмаға, жобаға немесе білім базасындағы жазбаға айналады — қойындыларды ауыстырмай және көшіруге уақыт жұмсамай.",
    featuresTitle: "Не пайда аласың",
    features: [
      { title: "Кедергісіз жұмыс істе", desc: "Виджет контентті жауып тастамайды, қалаған жерге сүйреп қоюға болады және капсулаға бүктеледі — назар бетте болады, интерфейсте емес." },
      { title: "Келесі қадамды бірден біл", desc: "AI бетті оқып, Proji-де нақты әрекет ұсынады: тапсырма, жазба немесе жоба — жалпы ұсыныс емес, нақты нәтиже." },
      { title: "AI чаттарын жоспарға айналдыр", desc: "ChatGPT, Gemini, Claude, DeepSeek, Grok, Copilot: әңгіменің мәнін ұстап, жоспарды, идеяларды және келесі қадамдарды сақтауды ұсынады." },
      { title: "Пайдалы табылғанды жоғалтпа", desc: "Google, Яндекс, Bing: іздеу нәтижелерінің ішінде контексті және сілтемесі бар тапсырма жасайсың, кейін қайта оралу үшін." },
      { title: "Мақаладан маңыздыны сақта", desc: "Мақала версткасына табиғи түрде кірігеді және маңызды ақпаратты білім базасына көшіреді — жарнамалық емес, пайдалы." },
      { title: "Күрделіні орнында бөлшікте", desc: "Виджеттегі «Талқылау» шағын чаты тапсырманы қадамдарға бөлуге және мәселелерді нақтылауға көмектеседі, қойындыларды ауыстырмай." },
      { title: "Көшіруге уақыт жұмсама", desc: "Бір шертумен тақырып, сипаттама, сілтеме және ассистентпен сөйлесу Proji-ге көшіріледі — қолмен көшірудің қажеті жоқ." },
      { title: "Шынайы істер ал, су сөз алма", desc: "Proji тек өзің немесе команда істей алатын нәрсені ұсынады — асыра сілтеулі немесе мүмкін емес тапсырмаларсыз." },
      { title: "Ұсыныстарды өзіңе сәйкестендір", desc: "Әр картадағы лайк/дизлайк Proji-ге сенің басымдықтарыңды үйретеді; әр кері байланыспен ұсыныстар дәлірек болады." },
      { title: "Кез келген мәтінді сақта", desc: "Беттегі мәтінді белгіле → оң шерту → ол Proji-де тапсырма не білім базасы жазбасына айналады, жазбалар қолданбасын ашудан жылдам." },
      { title: "Кез келген сайтта табиғи көрініс", desc: "Бейімделгіш стиль виджеттің түсін және пішінін сен тұрған сайтқа баптайды, сондықтан ол орынсыз көрінбейді." },
      { title: "Мәліметтеріңді бақыла", desc: "Талдау тек ұсыныстар үшін қолданылады. Сенің нақты шертуіңсіз ештеңе Proji-ге жіберілмейді немесе жарияланбайды." },
    ],
    howTitle: "Нәтиже алуды қалай бастаған",
    steps: [
      "Кеңейтуді орнат",
      "Кез келген бетті, AI чатын немесе іздеуді аш",
      "proji не істеу керегін ұсынады",
      "Бір шерту — ол идея сенің жобаңда",
    ],
    whyTitle: "Бұл жұмысыңды неге тездетеді",
    why: [
      { title: "Қойындыларды ауыстыру азаяды", desc: "50 қойындыны есте сақтаудың қажеті жоқ — маңызды нәрсенің бәрі дереу тапсырмаға айналады." },
      { title: "Ешбір ой жоғалмайды", desc: "Мақала, чаттан түсінік немесе іздеу нәтижесі контексті және сілтемесімен бірден тапсырмаға айналады." },
      { title: "Команда дереу табады", desc: "Пайдалы мақалалар мен чаттар ортақ білім базасына сақталады, жеке бетбелгілерде жоғалмайды." },
      { title: "Рутина аз, маңызды іс көп", desc: "Proji көшіру және мәтін құрастыруды өз мойнына алады, сонда шынайы жұмысқа уақыт көбірек қалады." },
    ],
    midCtaTitle: "Идеяларды шексіз қойындылар арасында жоғалтуды доғар",
    midCtaBtn: "proji орнату",
    worksTitle: "Қайда жұмыс істейді",
    finalTitle: "Браузерден тапсырма жинауды қазір баста",
    finalNote: "Тегін. Архивті жүктеп, Chrome-ға қолмен орнатыңыз.",
    footerLinks: ["Proji туралы", "Құпиялық", "Қолдау"],
    copyright: "© 2026 proji. Барлық құқықтар қорғалған.",
    language: "Тіл",
    theme: "Тақырып",
  },
};

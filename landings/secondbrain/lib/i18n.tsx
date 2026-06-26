import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en" | "ar" | "kk";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "kk", label: "Kazakh", native: "Қазақша" },
];

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

export const translations: Translations = {
  ru: {
    "nav.try": "Попробовать бесплатно",
    "hero.title": "Забудьте о повторных объяснениях.",
    "hero.sub": "Искусственный интеллект, который помнит каждую деталь, каждое решение, каждую связь в ваших проектах. Навсегда.",
    "hero.cta": "Попробовать proji бесплатно",
    "hero.note": "Без карты · 14 дней Pro",
    "problem.title": "ИИ забывает. Каждый день.",
    "problem.left.title": "Бесконечные повторы",
    "problem.left.text": "«Клод, напомни, о чём мы договорились с клиентом…» — каждое утро одно и то же.",
    "problem.right.title": "Потеря контекста",
    "problem.right.text": "Данные растворяются в чатах. Решения теряются. История проекта — испаряется.",
    "solution.title": "Архитектура «Второго мозга» от Андрея Карпатого",
    "solution.sub": "Четыре механики, которые превращают хаос файлов в живую базу знаний.",
    "card1.title": "Входной лоток",
    "card1.text": "Кидайте сюда всё: ТЗ, созвоны, ссылки. Просто файлы. ИИ разберёт хаос.",
    "card2.title": "Авто-Вики",
    "card2.text": "ИИ считывает смыслы, создаёт связанные страницы и находит скрытые зависимости. Знания растут сами.",
    "card3.title": "Живое оглавление",
    "card3.text": "Мгновенный поиск контекста. Снижает затраты на ИИ до 95%, работая только с нужными данными.",
    "card4.title": "Проактивное здоровье проекта",
    "card4.text": "Больше никаких провалов. ИИ сам найдёт забытые обещания, незакрытые задачи и остывших клиентов.",
    "use.title": "Крутейшие смыслы в действии",
    "use.client.title": "Управление клиентами",
    "use.client.text": "Полный контекст перед каждым созвоном.",
    "use.client.prompt": "«Проджи, напомни историю отношений и текущие задачи по Иванову за последние 3 месяца».",
    "use.content.title": "Контент-конвейер",
    "use.content.text": "Создавайте на основе опыта.",
    "use.content.prompt": "«Основываясь на прошлых успешных сценариях, предложи 3 новых угла темы».",
    "final.title": "Начните управлять проектами с абсолютной памятью",
    "final.cta": "Присоединиться к Proji",
    "final.note": "Простота папок на компьютере, мощь передового ИИ.",
    "theme.label": "Тема",
    "theme.light": "Светлая",
    "theme.dark": "Тёмная",
    "theme.system": "Системная",
    "lang.label": "Язык",
  },
  en: {
    "nav.try": "Try for free",
    "hero.title": "Stop re-explaining yourself.",
    "hero.sub": "An AI that remembers every detail, every decision, every connection in your projects. Forever.",
    "hero.cta": "Try proji free",
    "hero.note": "No card · 14 days Pro",
    "problem.title": "AI forgets. Every single day.",
    "problem.left.title": "Endless repeats",
    "problem.left.text": "“Claude, remind me what we agreed with the client…” — every single morning.",
    "problem.right.title": "Lost context",
    "problem.right.text": "Data dissolves in chats. Decisions vanish. Project history evaporates.",
    "solution.title": "A “Second Brain” architecture inspired by Andrej Karpathy",
    "solution.sub": "Four mechanics that turn file chaos into a living knowledge base.",
    "card1.title": "Inbox tray",
    "card1.text": "Drop everything in: briefs, call notes, links. Just files. The AI sorts the chaos.",
    "card2.title": "Auto-Wiki",
    "card2.text": "AI reads meaning, creates linked pages and surfaces hidden dependencies. Knowledge grows on its own.",
    "card3.title": "Living index",
    "card3.text": "Instant context lookup. Cuts AI costs up to 95% by working only with relevant data.",
    "card4.title": "Proactive project health",
    "card4.text": "No more dropped balls. AI surfaces forgotten promises, open loops, and cold clients.",
    "use.title": "Real workflows, real leverage",
    "use.client.title": "Client management",
    "use.client.text": "Full context before every call.",
    "use.client.prompt": "“proji, recap the relationship history and current tasks for Ivanov over the last 3 months.”",
    "use.content.title": "Content pipeline",
    "use.content.text": "Create from lived experience.",
    "use.content.prompt": "“Based on past winners, propose 3 new angles for this topic.”",
    "final.title": "Run projects with absolute memory",
    "final.cta": "Join Proji",
    "final.note": "The simplicity of folders, the power of frontier AI.",
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "lang.label": "Language",
  },
  ar: {
    "nav.try": "جرّب مجاناً",
    "hero.title": "توقّف عن إعادة الشرح.",
    "hero.sub": "ذكاء اصطناعي يتذكّر كل تفصيل، وكل قرار، وكل علاقة في مشاريعك. إلى الأبد.",
    "hero.cta": "جرّب proji مجاناً",
    "hero.note": "بدون بطاقة · 14 يوماً Pro",
    "problem.title": "الذكاء الاصطناعي ينسى. كل يوم.",
    "problem.left.title": "تكرار لا ينتهي",
    "problem.left.text": "«ذكّرني بما اتفقنا عليه مع العميل…» — كل صباح نفس الشيء.",
    "problem.right.title": "فقدان السياق",
    "problem.right.text": "البيانات تذوب في المحادثات. القرارات تضيع. وتاريخ المشروع يتبخّر.",
    "solution.title": "بنية «الدماغ الثاني» مستوحاة من أندريه كارباثي",
    "solution.sub": "أربع آليات تحوّل فوضى الملفات إلى قاعدة معرفة حيّة.",
    "card1.title": "صندوق الوارد",
    "card1.text": "أسقط كل شيء هنا: المتطلبات، تسجيلات الاجتماعات، الروابط. الذكاء الاصطناعي يرتّب الفوضى.",
    "card2.title": "ويكي تلقائي",
    "card2.text": "يقرأ المعاني، ينشئ صفحات مرتبطة ويكشف التبعيات الخفية. المعرفة تنمو وحدها.",
    "card3.title": "فهرس حيّ",
    "card3.text": "بحث فوري في السياق. يقلّل تكلفة الذكاء الاصطناعي حتى 95% بالعمل على البيانات الضرورية فقط.",
    "card4.title": "صحة المشروع الاستباقية",
    "card4.text": "لا مزيد من الإخفاقات. الذكاء الاصطناعي يكشف الوعود المنسية والمهام المفتوحة والعملاء المُهملين.",
    "use.title": "حالات استخدام قوية",
    "use.client.title": "إدارة العملاء",
    "use.client.text": "سياق كامل قبل كل مكالمة.",
    "use.client.prompt": "«يا بروجي، لخّص تاريخ العلاقة والمهام الحالية مع إيفانوف خلال آخر 3 أشهر».",
    "use.content.title": "خط إنتاج المحتوى",
    "use.content.text": "أنشئ انطلاقاً من تجربتك.",
    "use.content.prompt": "«اعتماداً على النجاحات السابقة، اقترح 3 زوايا جديدة لهذا الموضوع».",
    "final.title": "أدر مشاريعك بذاكرة مطلقة",
    "final.cta": "انضم إلى Proji",
    "final.note": "بساطة المجلدات، وقوة الذكاء الاصطناعي المتقدّم.",
    "theme.label": "السمة",
    "theme.light": "فاتح",
    "theme.dark": "داكن",
    "theme.system": "النظام",
    "lang.label": "اللغة",
  },
  kk: {
    "nav.try": "Тегін көру",
    "hero.title": "Қайталап түсіндіруді ұмытыңыз.",
    "hero.sub": "Жобаларыңыздағы әр детальді, әр шешімді, әр байланысты есте сақтайтын жасанды интеллект. Мәңгілікке.",
    "hero.cta": "proji-ді тегін көру",
    "hero.note": "Картасыз · 14 күн Pro",
    "problem.title": "ЖИ ұмытады. Әр күні.",
    "problem.left.title": "Шексіз қайталау",
    "problem.left.text": "«Клиентпен не келістік едік…» — әр таң сайын сол сұрақ.",
    "problem.right.title": "Контекстің жоғалуы",
    "problem.right.text": "Деректер чаттарда жоғалады. Шешімдер ұмытылады. Жоба тарихы буланып кетеді.",
    "solution.title": "Андрей Карпатидің «Екінші ми» архитектурасы",
    "solution.sub": "Файл хаосын тірі білім қорына айналдыратын төрт механика.",
    "card1.title": "Кіріс науа",
    "card1.text": "Бәрін осында тастаңыз: ТЗ, қоңыраулар, сілтемелер. ЖИ хаосты ретке келтіреді.",
    "card2.title": "Авто-Вики",
    "card2.text": "ЖИ мағынаны оқиды, байланысқан беттер жасайды және жасырын тәуелділіктерді табады.",
    "card3.title": "Тірі мазмұн",
    "card3.text": "Контекстті лезде табу. Тек қажетті деректермен жұмыс істеп, ЖИ шығынын 95%-ға дейін азайтады.",
    "card4.title": "Жобаның белсенді денсаулығы",
    "card4.text": "Енді ештеңе ұмытылмайды. ЖИ ұмыт қалған уәделерді, ашық тапсырмаларды және салқындаған клиенттерді өзі табады.",
    "use.title": "Іс жүзіндегі қолданыс",
    "use.client.title": "Клиенттерді басқару",
    "use.client.text": "Әр қоңырау алдында толық контекст.",
    "use.client.prompt": "«proji, соңғы 3 айдағы Ивановпен қарым-қатынас тарихы мен ағымдағы тапсырмаларды еске сал».",
    "use.content.title": "Контент конвейері",
    "use.content.text": "Тәжірибеңіз негізінде жасаңыз.",
    "use.content.prompt": "«Бұрынғы сәтті сценарийлер негізінде 3 жаңа бұрыш ұсын».",
    "final.title": "Жобаларды абсолютті жадпен басқарыңыз",
    "final.cta": "Proji-ге қосылу",
    "final.note": "Қалталардың қарапайымдылығы, озық ЖИ қуаты.",
    "theme.label": "Тақырып",
    "theme.light": "Ашық",
    "theme.dark": "Қараңғы",
    "theme.system": "Жүйелік",
    "lang.label": "Тіл",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nContext = createContext<Ctx | null>(null);

const LANG_KEY = "secondbrain-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = (localStorage.getItem(LANG_KEY) as Lang | null) ?? null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.landing !== "secondbrain") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = (k: string) => translations[lang][k] ?? translations.en[k] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

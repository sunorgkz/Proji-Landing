import React from 'react';
import type { Lang } from '../board/copy';
import { SketchClock, SketchSun } from '../board/Sketches';
import { SketchBars } from '../ai/Sketches';
import { CoverStart } from './Covers';
import { Faq, End, Hero, PicList, Sec, landing, type Base, type L4 } from './Kit';

/** /start — быстрый старт: первые 5 минут с Proji AI по справке quick-start.md. Разметка HowTo для поиска. */

interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  steps: { h: string; items: [string, string][] };
  quick: { h: string; lead: string; items: [string, string][] };
  trouble: { h: string; items: { q: string; a: string }[] };
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — первые 5 минут с Proji AI',
    desc: 'Как начать работать с Proji AI за 5 минут: открыть панель, задать первый вопрос, нажать быструю кнопку и понять, что он делает.',
    hero: { h: 'Первые 5 минут', grad: 'с Proji AI', sub: 'Четыре шага, три быстрые кнопки и что делать, если что-то пошло не так. Больше ничего знать не нужно.' },
    steps: {
      h: 'Четыре шага',
      items: [
        ['Нажмите «Спросить PROJI AI»', 'Кнопка есть на большинстве страниц. Справа откроется панель.'],
        ['Напишите вопрос', 'Своими словами, как коллеге.'],
        ['Отправьте', 'Стрелкой внутри поля или клавишей Enter.'],
        ['Посмотрите, что он делает', 'Пока ответ готовится, видны подписи: «Смотрю задачи…», «Формулирую ответ…».'],
      ],
    },
    quick: {
      h: 'Три кнопки для первого раза',
      lead: 'Когда панель пуста, под полем ввода есть готовые вопросы. Нажмите, и вопрос уйдёт сразу.',
      items: [
        ['Сводка дня', 'Что просрочено, что горит на неделе и с чего начать.'],
        ['Что просрочено?', 'Список просроченных карточек и у кого они.'],
        ['Успеем ли до конца недели?', 'Прогноз по всем карточкам со сроком до конца недели.'],
      ],
    },
    trouble: {
      h: 'Если что-то пошло не так',
      items: [
        { q: 'Ответ не тот', a: 'Просто уточните: «Только по проекту “Запуск рекламы”» или «Покажи за прошлую неделю». Он помнит разговор.' },
        { q: '«Ошибка соединения»', a: 'Панель сама повторяет запрос один раз. Если не получилось, попробуйте ещё раз через минуту.' },
        { q: '«Эта модель не видит картинки»', a: 'Выберите другую модель: значок слева внизу в поле ввода.' },
        { q: 'Ответ неточный', a: 'Поставьте 👎 под ответом: так команда Proji узнаёт, где он ошибается.' },
      ],
    },
    end: 'Пять минут начинаются с регистрации',
  },
  kk: {
    title: 'proji — Proji AI-мен алғашқы 5 минут',
    desc: 'Proji AI-мен 5 минутта жұмысты қалай бастауға болады: панельді ашу, алғашқы сұрақты қою, жылдам батырманы басу және оның не істеп жатқанын түсіну.',
    hero: { h: 'Proji AI-мен', grad: 'алғашқы 5 минут', sub: 'Төрт қадам, үш жылдам батырма және бірдеңе дұрыс болмаса не істеу керек. Басқа ештеңе білудің қажеті жоқ.' },
    steps: {
      h: 'Төрт қадам',
      items: [
        ['«PROJI AI-дан сұрау» басыңыз', 'Батырма көп беттерде бар. Оң жақта панель ашылады.'],
        ['Сұрақ жазыңыз', 'Өз сөзіңізбен, әріптеске жазғандай.'],
        ['Жіберіңіз', 'Өріс ішіндегі көрсеткімен немесе Enter пернесімен.'],
        ['Не істеп жатқанын қараңыз', 'Жауап дайындалып жатқанда жазулар көрінеді: «Тапсырмаларды қарап жатырмын…», «Жауапты тұжырымдап жатырмын…».'],
      ],
    },
    quick: {
      h: 'Бірінші ретке үш батырма',
      lead: 'Панель бос кезде енгізу өрісінің астында дайын сұрақтар тұрады. Басыңыз, сұрақ бірден кетеді.',
      items: [
        ['Күн шолуы', 'Не мерзімі өтті, аптада не жанып тұр және неден бастау керек.'],
        ['Не мерзімі өтті?', 'Мерзімі өткен карточкалар тізімі және олар кімде.'],
        ['Апта соңына үлгереміз бе?', 'Мерзімі апта соңына дейінгі барлық карточкалар бойынша болжам.'],
      ],
    },
    trouble: {
      h: 'Бірдеңе дұрыс болмаса',
      items: [
        { q: 'Жауап басқа', a: 'Жай нақтылаңыз: «Тек “Жарнама іске қосу” жобасы бойынша» немесе «Өткен аптаны көрсет». Ол әңгімені есте сақтайды.' },
        { q: '«Байланыс қатесі»', a: 'Панель сұранысты өзі бір рет қайталайды. Болмаса, бір минуттан кейін қайта көріңіз.' },
        { q: '«Бұл модель суреттерді көрмейді»', a: 'Басқа модельді таңдаңыз: енгізу өрісінің төменгі сол жағындағы белгіше.' },
        { q: 'Жауап дәл емес', a: 'Жауаптың астына 👎 қойыңыз: осылай Proji командасы оның қай жерде қателесетінін біледі.' },
      ],
    },
    end: 'Бес минут тіркелуден басталады',
  },
  en: {
    title: 'proji — your first 5 minutes with Proji AI',
    desc: 'How to start with Proji AI in 5 minutes: open the panel, ask your first question, press a quick button and understand what it is doing.',
    hero: { h: 'Your first 5 minutes', grad: 'with Proji AI', sub: 'Four steps, three quick buttons and what to do if something goes wrong. That is all you need to know.' },
    steps: {
      h: 'Four steps',
      items: [
        ['Press “Ask PROJI AI”', 'The button is on most pages. A panel opens on the right.'],
        ['Write a question', 'In your own words, as to a colleague.'],
        ['Send it', 'With the arrow inside the field or the Enter key.'],
        ['Watch what it does', 'While the answer is being prepared you see captions: “Looking at tasks…”, “Writing the answer…”.'],
      ],
    },
    quick: {
      h: 'Three buttons for the first time',
      lead: 'When the panel is empty, ready-made questions sit under the input. Press one and it is sent right away.',
      items: [
        ['Daily summary', 'What is overdue, what is on fire this week and where to start.'],
        ['What is overdue?', 'A list of overdue cards and whose they are.'],
        ['Will we make it by the end of the week?', 'A forecast for every card due by the end of the week.'],
      ],
    },
    trouble: {
      h: 'If something goes wrong',
      items: [
        { q: 'The answer is off', a: 'Just clarify: “Only for the Ad launch project” or “Show last week”. It remembers the conversation.' },
        { q: '“Connection error”', a: 'The panel retries once by itself. If that fails, try again in a minute.' },
        { q: '“This model can’t see images”', a: 'Pick another model: the icon at the bottom left of the input.' },
        { q: 'The answer is inaccurate', a: 'Press 👎 under the answer: this is how the Proji team learns where it makes mistakes.' },
      ],
    },
    end: 'The five minutes start with signing up',
  },
  ar: {
    title: 'proji — أول 5 دقائق مع Proji AI',
    desc: 'كيف تبدأ مع Proji AI في 5 دقائق: افتح اللوحة، واطرح سؤالك الأول، واضغط زرًا سريعًا، وافهم ما الذي يفعله.',
    hero: { h: 'أول 5 دقائق', grad: 'مع Proji AI', sub: 'أربع خطوات وثلاثة أزرار سريعة وماذا تفعل إن حدث خطأ. لا تحتاج إلى معرفة أكثر من ذلك.' },
    steps: {
      h: 'أربع خطوات',
      items: [
        ['اضغط «اسأل PROJI AI»', 'الزر موجود في معظم الصفحات، وتُفتح لوحة على اليمين.'],
        ['اكتب سؤالك', 'بكلماتك، كما تكتب لزميل.'],
        ['أرسله', 'بالسهم داخل الحقل أو بمفتاح Enter.'],
        ['شاهد ما يفعله', 'أثناء تحضير الإجابة تظهر عبارات: «أنظر في المهام…»، «أصوغ الإجابة…».'],
      ],
    },
    quick: {
      h: 'ثلاثة أزرار للمرة الأولى',
      lead: 'عندما تكون اللوحة فارغة توجد أسئلة جاهزة تحت حقل الإدخال. اضغط ويُرسل السؤال فورًا.',
      items: [
        ['ملخص اليوم', 'ما المتأخر، وما يحترق هذا الأسبوع، ومن أين تبدأ.'],
        ['ما المتأخر؟', 'قائمة البطاقات المتأخرة ولدى من هي.'],
        ['هل سننجز قبل نهاية الأسبوع؟', 'توقّع لكل البطاقات التي موعدها نهاية الأسبوع.'],
      ],
    },
    trouble: {
      h: 'إن حدث خطأ',
      items: [
        { q: 'الإجابة ليست ما أردت', a: 'وضّح فقط: «لمشروع إطلاق الإعلان فقط» أو «اعرض الأسبوع الماضي». إنه يتذكر المحادثة.' },
        { q: '«خطأ في الاتصال»', a: 'تعيد اللوحة الطلب مرة واحدة تلقائيًا. إن لم ينجح، حاول بعد دقيقة.' },
        { q: '«هذا النموذج لا يرى الصور»', a: 'اختر نموذجًا آخر: الأيقونة أسفل يسار حقل الإدخال.' },
        { q: 'الإجابة غير دقيقة', a: 'ضع 👎 تحت الإجابة: هكذا يعرف فريق Proji أين يخطئ.' },
      ],
    },
    end: 'الدقائق الخمس تبدأ بالتسجيل',
  },
};

const SLUG = 'start';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => (
  <>
    <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverStart} />
    <Sec id="steps" h={c.steps.h}>
      <ol className="kt-steps">{c.steps.items.map(([t, x]) => <li key={t}><h3>{t}</h3><p>{x}</p></li>)}</ol>
    </Sec>
    <Sec id="quick" h={c.quick.h} lead={c.quick.lead}>
      <PicList items={c.quick.items} pics={[SketchSun, SketchClock, SketchBars]} />
    </Sec>
    <Sec id="help" h={c.trouble.h}>
      <Faq items={c.trouble.items} />
    </Sec>
    <End slug={SLUG} lang={lang} h={c.end} />
  </>
);

const ld = (c: C) => ({
  '@type': 'HowTo',
  name: c.title,
  description: c.desc,
  totalTime: 'PT5M',
  step: c.steps.items.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
});

export default landing({ slug: SLUG, copy, Page, ld, links: c => [['#steps', c.steps.h], ['#quick', c.quick.h]] });

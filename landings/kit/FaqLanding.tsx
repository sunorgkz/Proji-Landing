import React from 'react';
import type { Lang } from '../board/copy';
import { CoverFaq } from './Covers';
import { End, Faq, Hero, Sec, landing, type Base, type L4 } from './Kit';

/**
 * /faq — вопросы и ответы: главный источник для ИИ-поисковиков (GEO). Каждый ответ начинается с сути.
 * Ответы — из справки Proji (faq.md, privacy-and-safety.md, what-is-proji-ai.md, quick-start.md) и текстов /board.
 * Разметка FAQPage (JSON-LD) собирается из тех же текстов.
 */

type QA = { q: string; a: string };
interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  groups: { h: string; items: QA[] }[];
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — вопросы и ответы о Proji и Proji AI',
    desc: 'Что такое Proji, нужно ли команде осваивать новую программу, может ли Proji AI что-то изменить сам, что он видит и чего не видит, сколько стоит попробовать.',
    hero: { h: 'Вопросы', grad: 'и прямые ответы', sub: 'Всё, что обычно спрашивают о Proji и его помощнике Proji AI. Коротко и без лишних слов.' },
    groups: [
      {
        h: 'О Proji',
        items: [
          { q: 'Что такое Proji?', a: 'Proji — платформа для задач, проектов, сотрудников и документов с ИИ-помощником Proji AI. Он превращает договорённости из чатов в задачи, следит за сроками и каждое утро показывает руководителю, что сделано и что горит.' },
          { q: 'Нужно ли команде осваивать новую программу?', a: 'Нет. Сотрудники продолжают писать в WhatsApp и Telegram, как привыкли, а Proji собирает из переписки задачи.' },
          { q: 'Сколько стоит попробовать?', a: 'Первые 14 дней бесплатно. Регистрация: proji.org/register.' },
        ],
      },
      {
        h: 'О Proji AI',
        items: [
          { q: 'Что такое Proji AI?', a: 'Это помощник в правой панели Proji. Вы пишете ему как коллеге, а он смотрит в ваши задачи, проекты и документы и отвечает со ссылками на карточки.' },
          { q: 'Что умеет Proji AI?', a: 'Отвечает по вашим данным, создаёт и меняет карточки после вашего подтверждения, ищет в интернете, точно считает даты, делает прогноз «успеем ли» по реальной скорости команды и читает приложенные фото и файлы.' },
          { q: 'Может ли Proji AI что-то удалить или изменить сам?', a: 'Нет. Он готовит черновик, и ничего не происходит, пока вы не нажмёте «Подтвердить».' },
          { q: 'Можно ли прикрепить PDF?', a: 'Пока нет. Загрузите PDF в раздел «Документы»: по нему можно искать и задавать вопросы. Word, текст и картинки можно прикреплять сразу.' },
          { q: 'С чего начать?', a: 'Нажмите «Спросить PROJI AI» и выберите «Сводка дня»: это самый быстрый способ увидеть, что он умеет.' },
        ],
      },
      {
        h: 'О безопасности',
        items: [
          { q: 'Видит ли Proji AI личные данные и переписки?', a: 'Нет. Здоровье, допуски, оценки сотрудников, навыки, личные папки, дату рождения, пароли и сообщения внутреннего чата он не получает.' },
          { q: 'Что Proji AI видит?', a: 'Только то, что можете видеть вы: задачи, проекты, документы и журнал действий пространства, к которому у вас есть доступ.' },
          { q: 'Это безопасно для рабочих данных?', a: 'Proji AI работает только с вашими правами и защищён от подсказок-ловушек. У провайдеров моделей свои условия обработки данных, поэтому для рабочих данных проверьте условия выбранного провайдера и тарифа.' },
          { q: 'Можно ли использовать Proji AI для кадровых решений?', a: 'Нет. Он не оценивает сотрудников и не принимает решений о людях.' },
        ],
      },
    ],
    end: 'Остальное проще увидеть самому',
  },
  kk: {
    title: 'proji — Proji және Proji AI туралы сұрақтар мен жауаптар',
    desc: 'Proji деген не, командаға жаңа бағдарлама үйрену керек пе, Proji AI өзі бірдеңе өзгерте ала ма, нені көреді және нені көрмейді, байқап көру қанша тұрады.',
    hero: { h: 'Сұрақтар', grad: 'және тура жауаптар', sub: 'Proji және оның көмекшісі Proji AI туралы әдетте не сұрайды, соның бәрі. Қысқа әрі нақты.' },
    groups: [
      {
        h: 'Proji туралы',
        items: [
          { q: 'Proji деген не?', a: 'Proji — тапсырмалар, жобалар, қызметкерлер мен құжаттарға арналған, Proji AI көмекшісі бар платформа. Ол чаттағы келісімдерді тапсырмаға айналдырады, мерзімдерді қадағалайды және басшыға таң сайын не істелгенін, не жанып тұрғанын көрсетеді.' },
          { q: 'Командаға жаңа бағдарлама үйрену керек пе?', a: 'Жоқ. Қызметкерлер WhatsApp пен Telegram-да әдеттегідей жаза береді, ал Proji хат алмасудан тапсырмалар жинайды.' },
          { q: 'Байқап көру қанша тұрады?', a: 'Алғашқы 14 күн тегін. Тіркелу: proji.org/register.' },
        ],
      },
      {
        h: 'Proji AI туралы',
        items: [
          { q: 'Proji AI деген не?', a: 'Бұл Proji-дің оң жақ панеліндегі көмекші. Сіз оған әріптеске жазғандай жазасыз, ал ол тапсырмаларыңызға, жобаларыңызға және құжаттарыңызға қарап, карточкаларға сілтемемен жауап береді.' },
          { q: 'Proji AI не істей алады?', a: 'Деректеріңіз бойынша жауап береді, растауыңыздан кейін карточкаларды жасайды және өзгертеді, интернеттен іздейді, күндерді дәл санайды, команданың нақты жылдамдығы бойынша «үлгереміз бе» болжамын жасайды және тіркелген фото мен файлдарды оқиды.' },
          { q: 'Proji AI өзі бірдеңені өшіре не өзгерте ала ма?', a: 'Жоқ. Ол жоба дайындайды, ал сіз «Растау» баспайынша ештеңе болмайды.' },
          { q: 'PDF тіркеуге бола ма?', a: 'Әзірге жоқ. PDF-ті «Құжаттар» бөліміне жүктеңіз: ол бойынша іздеуге және сұрақ қоюға болады. Word, мәтін және суреттерді бірден тіркеуге болады.' },
          { q: 'Неден бастау керек?', a: '«PROJI AI-дан сұрау» батырмасын басып, «Күн шолуы» таңдаңыз: оның не істей алатынын көрудің ең жылдам жолы.' },
        ],
      },
      {
        h: 'Қауіпсіздік туралы',
        items: [
          { q: 'Proji AI жеке деректер мен хат алмасуды көре ме?', a: 'Жоқ. Денсаулық, рұқсаттар, қызметкерлердің бағалары, дағдылар, жеке папкалар, туған күн, құпиясөздер және ішкі чат хабарламаларын ол алмайды.' },
          { q: 'Proji AI нені көреді?', a: 'Тек сіз көре алатынды ғана: қолжетімділігіңіз бар кеңістіктің тапсырмаларын, жобаларын, құжаттарын және әрекеттер журналын.' },
          { q: 'Жұмыс деректері үшін бұл қауіпсіз бе?', a: 'Proji AI тек сіздің құқықтарыңызбен жұмыс істейді және тұзақ-нұсқаулардан қорғалған. Модель провайдерлерінің деректерді өңдеу шарттары өзгеше, сондықтан жұмыс деректері үшін таңдалған провайдер мен тарифтің шарттарын тексеріңіз.' },
          { q: 'Proji AI-ды кадрлық шешімдерге қолдануға бола ма?', a: 'Жоқ. Ол қызметкерлерді бағаламайды және адамдар туралы шешім қабылдамайды.' },
        ],
      },
    ],
    end: 'Қалғанын өзіңіз көрген оңай',
  },
  en: {
    title: 'proji — questions and answers about Proji and Proji AI',
    desc: 'What Proji is, whether the team has to learn a new app, whether Proji AI can change anything on its own, what it sees and does not see, and what a trial costs.',
    hero: { h: 'Questions', grad: 'and straight answers', sub: 'Everything people usually ask about Proji and its assistant Proji AI. Short and to the point.' },
    groups: [
      {
        h: 'About Proji',
        items: [
          { q: 'What is Proji?', a: 'Proji is a platform for tasks, projects, people and documents with the Proji AI assistant. It turns agreements from chats into tasks, watches deadlines and every morning shows the manager what is done and what is on fire.' },
          { q: 'Does the team have to learn a new app?', a: 'No. People keep writing in WhatsApp and Telegram as usual, and Proji collects tasks from the conversations.' },
          { q: 'How much does a trial cost?', a: 'The first 14 days are free. Sign up at proji.org/register.' },
        ],
      },
      {
        h: 'About Proji AI',
        items: [
          { q: 'What is Proji AI?', a: 'It is the assistant in the right-hand panel of Proji. You write to it as you would to a colleague, and it looks through your tasks, projects and documents and answers with links to the cards.' },
          { q: 'What can Proji AI do?', a: 'It answers about your data, creates and changes cards after you confirm, searches the web, counts dates precisely, forecasts “will we make it” from your team’s real pace and reads attached photos and files.' },
          { q: 'Can Proji AI delete or change something on its own?', a: 'No. It prepares a draft, and nothing happens until you press “Confirm”.' },
          { q: 'Can I attach a PDF?', a: 'Not yet. Upload the PDF to “Documents”: you can search it and ask questions about it. Word files, text and images can be attached right away.' },
          { q: 'Where do I start?', a: 'Press “Ask PROJI AI” and choose “Daily summary”: it is the fastest way to see what it can do.' },
        ],
      },
      {
        h: 'About safety',
        items: [
          { q: 'Does Proji AI see personal data and chats?', a: 'No. It never receives health data, clearances, employee ratings, skills, personal folders, birth dates, passwords or internal chat messages.' },
          { q: 'What does Proji AI see?', a: 'Only what you can see: tasks, projects, documents and the activity log of the workspace you have access to.' },
          { q: 'Is it safe for work data?', a: 'Proji AI works only with your permissions and is protected against trap prompts. Model providers have their own data terms, so for work data check the terms of the chosen provider and plan.' },
          { q: 'Can Proji AI be used for HR decisions?', a: 'No. It does not rate employees and does not make decisions about people.' },
        ],
      },
    ],
    end: 'The rest is easier to see for yourself',
  },
  ar: {
    title: 'proji — أسئلة وأجوبة عن Proji و Proji AI',
    desc: 'ما هو Proji، وهل يحتاج الفريق إلى تعلّم برنامج جديد، وهل يستطيع Proji AI تغيير شيء بنفسه، وماذا يرى وما لا يرى، وكم تكلّف التجربة.',
    hero: { h: 'أسئلة', grad: 'وأجوبة مباشرة', sub: 'كل ما يُسأل عادةً عن Proji ومساعده Proji AI. باختصار ومن دون حشو.' },
    groups: [
      {
        h: 'عن Proji',
        items: [
          { q: 'ما هو Proji؟', a: 'Proji منصة للمهام والمشاريع والموظفين والمستندات مع المساعد Proji AI. يحوّل الاتفاقات في المحادثات إلى مهام، ويتابع المواعيد، ويعرض على المدير كل صباح ما أُنجز وما يحترق.' },
          { q: 'هل يحتاج الفريق إلى تعلّم برنامج جديد؟', a: 'لا. يواصل الموظفون الكتابة في واتساب وتيليغرام كالمعتاد، ويجمع Proji المهام من المراسلات.' },
          { q: 'كم تكلّف التجربة؟', a: 'أول 14 يومًا مجانًا. التسجيل: proji.org/register.' },
        ],
      },
      {
        h: 'عن Proji AI',
        items: [
          { q: 'ما هو Proji AI؟', a: 'هو المساعد في اللوحة اليمنى من Proji. تكتب له كما تكتب لزميل، فينظر في مهامك ومشاريعك ومستنداتك ويجيب مع روابط إلى البطاقات.' },
          { q: 'ماذا يستطيع Proji AI؟', a: 'يجيب عن بياناتك، وينشئ البطاقات ويعدّلها بعد تأكيدك، ويبحث في الإنترنت، ويحسب التواريخ بدقة، ويتوقع «هل سننجز» بحسب السرعة الفعلية للفريق، ويقرأ الصور والملفات المرفقة.' },
          { q: 'هل يستطيع Proji AI حذف شيء أو تغييره بنفسه؟', a: 'لا. يُعدّ مسودة، ولا يحدث شيء حتى تضغط «تأكيد».' },
          { q: 'هل يمكن إرفاق ملف PDF؟', a: 'ليس بعد. ارفع ملف PDF إلى قسم «المستندات»: يمكن البحث فيه وطرح الأسئلة عنه. ملفات Word والنصوص والصور تُرفق مباشرة.' },
          { q: 'من أين أبدأ؟', a: 'اضغط «اسأل PROJI AI» واختر «ملخص اليوم»: أسرع طريقة لترى ما يستطيعه.' },
        ],
      },
      {
        h: 'عن الأمان',
        items: [
          { q: 'هل يرى Proji AI البيانات الشخصية والمراسلات؟', a: 'لا. لا يتلقى بيانات الصحة والتصاريح وتقييمات الموظفين والمهارات والمجلدات الشخصية وتاريخ الميلاد وكلمات المرور ورسائل المحادثة الداخلية.' },
          { q: 'ماذا يرى Proji AI؟', a: 'فقط ما تستطيع أنت رؤيته: مهام ومشاريع ومستندات وسجل نشاط المساحة التي لديك صلاحية الوصول إليها.' },
          { q: 'هل هو آمن لبيانات العمل؟', a: 'يعمل Proji AI بصلاحياتك فقط ومحمي من التعليمات المخادعة. لمزوّدي النماذج شروطهم الخاصة لمعالجة البيانات، لذا تحقّق من شروط المزوّد والباقة المختارة.' },
          { q: 'هل يمكن استخدام Proji AI لقرارات التوظيف؟', a: 'لا. لا يقيّم الموظفين ولا يتخذ قرارات بشأن الأشخاص.' },
        ],
      },
    ],
    end: 'الباقي أسهل أن تراه بنفسك',
  },
};

const SLUG = 'faq';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => (
  <>
    <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverFaq} />
    {c.groups.map((g, i) => (
      <Sec key={g.h} id={`g${i + 1}`} h={g.h}>
        <Faq items={g.items} />
      </Sec>
    ))}
    <End slug={SLUG} lang={lang} h={c.end} />
  </>
);

const ld = (c: C) => ({
  '@type': 'FAQPage',
  mainEntity: c.groups.flatMap(g => g.items).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export default landing({ slug: SLUG, copy, Page, ld, links: c => c.groups.map((g, i): [string, string] => [`#g${i + 1}`, g.h]) });

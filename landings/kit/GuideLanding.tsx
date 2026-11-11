import React from 'react';
import type { Lang } from '../board/copy';
import { CoverGuide } from './Covers';
import { End, Hero, landing, type Base, type L4 } from './Kit';

/**
 * /guide — статья-гайд под поисковый запрос «как не терять задачи в рабочих чатах» (SEO и GEO).
 * Советы общие и работают без Proji; в последнем разделе — как то же делает Proji (по текстам /board и справке).
 * Пример в рамке — придуманный, это ИЛЛЮСТРАЦИЯ.
 */

interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  toc: string;
  parts: { h: string; p: string[]; ex?: string }[];
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'Как перестать терять задачи в рабочих чатах: гайд для руководителя',
    desc: 'Почему задачи теряются в WhatsApp и Telegram и пять простых правил, которые это исправляют: кто, что, к какому дню; одно место для задач; напоминание до срока; утренняя сводка.',
    hero: { h: 'Как перестать терять задачи', grad: 'в рабочих чатах', sub: 'Пять простых правил для руководителя. Работают и без программ, а с Proji выполняются сами.' },
    toc: 'В этой статье',
    parts: [
      { h: 'Почему задачи теряются в чатах', p: ['Чат хорош, чтобы быстро договориться, но плох, чтобы помнить. Новое сообщение выталкивает старое, и через день договорённость уже не найти.', 'Вторая причина: в сообщении редко есть всё сразу. Понятно, что сделать, но непонятно, кто и к какому дню.'] },
      { h: 'Правило 1. Кто, что, к какому дню', p: ['У каждой задачи должны быть три вещи: исполнитель, действие и срок. Если чего-то нет, это ещё не задача, а пожелание.'], ex: '«Ержан, подготовь КП для “Арман-Строй” до четверга»: кто — Ержан, что — КП, когда — четверг.' },
      { h: 'Правило 2. Одно место для задач', p: ['Договариваться можно где угодно, но жить задача должна в одном месте. Иначе статус придётся собирать по пяти чатам и двум таблицам.'] },
      { h: 'Правило 3. Напоминание до срока, а не после', p: ['О риске полезно узнать за день до срока, а не на следующий день после. Договоритесь, что за день до срока исполнитель получает напоминание, а вы видите, если задача зависла.'] },
      { h: 'Правило 4. Сводка вместо «ну что там?»', p: ['Вместо того чтобы спрашивать каждого, получайте одну сводку утром: что сделано, что горит, где нужно ваше решение. Так вопросы задаются только там, где они нужны.'] },
      { h: 'Правило 5. Решения планёрки — сразу в задачи', p: ['Планёрка без записанных решений через неделю забывается. Каждое решение превращайте в задачу по правилу 1, пока все ещё в комнате.'] },
      { h: 'Как это делает Proji', p: ['Proji выполняет эти правила сам. Команда пишет в WhatsApp и Telegram, как привыкла. Proji находит в сообщении, кто, что и к какому дню, и создаёт задачу в нужном проекте.', 'Дальше он сам напоминает исполнителю, заранее предупреждает вас о риске и каждое утро присылает сводку. А помощник Proji AI отвечает на вопросы вроде «Что просрочено и у кого?» обычными словами.'] },
    ],
    end: 'Пусть правила выполняются сами',
  },
  kk: {
    title: 'Жұмыс чаттарында тапсырмаларды жоғалтуды қалай тоқтатуға болады: басшыға нұсқаулық',
    desc: 'Неліктен тапсырмалар WhatsApp пен Telegram-да жоғалады және оны түзететін бес қарапайым ереже: кім, не, қай күнге; тапсырмаларға бір орын; мерзімге дейін еске салу; таңғы шолу.',
    hero: { h: 'Тапсырмаларды жоғалтуды', grad: 'қалай тоқтатуға болады', sub: 'Басшыға арналған бес қарапайым ереже. Бағдарламасыз да жұмыс істейді, ал Proji-мен өздігінен орындалады.' },
    toc: 'Бұл мақалада',
    parts: [
      { h: 'Неліктен тапсырмалар чаттарда жоғалады', p: ['Чат тез келісуге жақсы, бірақ есте сақтауға нашар. Жаңа хабарлама ескісін ығыстырады, бір күннен кейін келісімді табу қиын.', 'Екінші себеп: хабарламада бәрі бірден сирек болады. Не істеу керегі түсінікті, бірақ кім және қай күнге екені белгісіз.'] },
      { h: '1-ереже. Кім, не, қай күнге', p: ['Әр тапсырмада үш нәрсе болуы керек: орындаушы, әрекет және мерзім. Біреуі жоқ болса, бұл әлі тапсырма емес, тілек.'], ex: '«Ержан, “Арман-Строй” үшін КҰ-ны бейсенбіге дейін дайында»: кім — Ержан, не — КҰ, қашан — бейсенбі.' },
      { h: '2-ереже. Тапсырмаларға бір орын', p: ['Кез келген жерде келісуге болады, бірақ тапсырма бір жерде тұруы керек. Әйтпесе мәртебені бес чат пен екі кестеден жинауға тура келеді.'] },
      { h: '3-ереже. Мерзімнен кейін емес, бұрын еске салу', p: ['Тәуекел туралы мерзімнен бір күн бұрын білген пайдалы. Мерзімнен бір күн бұрын орындаушы еске салу алатынын, ал сіз тапсырма тоқтап қалса көретініңізді келісіңіз.'] },
      { h: '4-ереже. «Қалай, не болды?» орнына шолу', p: ['Әрқайсысынан сұраудың орнына таңертең бір шолу алыңыз: не істелді, не жанып тұр, қайда сіздің шешіміңіз керек.'] },
      { h: '5-ереже. Жиналыс шешімдері — бірден тапсырмаға', p: ['Шешімдері жазылмаған жиналыс бір аптадан кейін ұмытылады. Әр шешімді бәрі бөлмеде отырғанда 1-ереже бойынша тапсырмаға айналдырыңыз.'] },
      { h: 'Proji мұны қалай істейді', p: ['Proji бұл ережелерді өзі орындайды. Команда WhatsApp пен Telegram-да әдеттегідей жазады. Proji хабарламадан кім, не және қай күнге екенін тауып, керекті жобада тапсырма жасайды.', 'Әрі қарай орындаушыға өзі еске салады, сізді тәуекел туралы алдын ала ескертеді және таң сайын шолу жібереді. Ал Proji AI көмекшісі «Не мерзімі өтті және кімде?» сияқты сұрақтарға қарапайым сөзбен жауап береді.'] },
    ],
    end: 'Ережелер өзі орындалсын',
  },
  en: {
    title: 'How to stop losing tasks in work chats: a guide for managers',
    desc: 'Why tasks get lost in WhatsApp and Telegram, and five simple rules that fix it: who, what and by when; one place for tasks; reminders before deadlines; a morning summary.',
    hero: { h: 'How to stop losing tasks', grad: 'in work chats', sub: 'Five simple rules for managers. They work without any software, and with Proji they run by themselves.' },
    toc: 'In this article',
    parts: [
      { h: 'Why tasks get lost in chats', p: ['A chat is great for agreeing quickly and bad for remembering. New messages push old ones away, and a day later the agreement is hard to find.', 'The second reason: a message rarely has everything. It is clear what to do, but not who does it or by when.'] },
      { h: 'Rule 1. Who, what and by when', p: ['Every task needs three things: an owner, an action and a deadline. If one is missing, it is a wish, not a task.'], ex: '“Yerzhan, prepare the proposal for Arman-Stroy by Thursday”: who is Yerzhan, what is the proposal, when is Thursday.' },
      { h: 'Rule 2. One place for tasks', p: ['You can agree anywhere, but a task should live in one place. Otherwise you collect statuses from five chats and two spreadsheets.'] },
      { h: 'Rule 3. Remind before the deadline, not after', p: ['It helps to hear about a risk a day before the deadline, not a day after. Agree that the owner gets a reminder a day early, and you see when a task is stuck.'] },
      { h: 'Rule 4. A summary instead of “how is it going?”', p: ['Instead of asking everyone, get one summary in the morning: what is done, what is on fire, where you need to decide.'] },
      { h: 'Rule 5. Meeting decisions go straight into tasks', p: ['A meeting without written decisions is forgotten within a week. Turn each decision into a task by rule 1 while everyone is still in the room.'] },
      { h: 'How Proji does it', p: ['Proji follows these rules by itself. The team writes in WhatsApp and Telegram as usual. Proji finds who, what and by when in a message and creates a task in the right project.', 'Then it reminds the owner, warns you about risks in advance and sends a summary every morning. The Proji AI assistant answers questions like “What is overdue and whose is it?” in plain words.'] },
    ],
    end: 'Let the rules run by themselves',
  },
  ar: {
    title: 'كيف تتوقف عن فقدان المهام في محادثات العمل: دليل للمدير',
    desc: 'لماذا تضيع المهام في واتساب وتيليغرام وخمس قواعد بسيطة تعالج ذلك: من وماذا ومتى؛ مكان واحد للمهام؛ تذكير قبل الموعد؛ ملخص صباحي.',
    hero: { h: 'كيف تتوقف عن فقدان المهام', grad: 'في محادثات العمل', sub: 'خمس قواعد بسيطة للمدير. تعمل من دون برامج، ومع Proji تُنفَّذ وحدها.' },
    toc: 'في هذا المقال',
    parts: [
      { h: 'لماذا تضيع المهام في المحادثات', p: ['المحادثة ممتازة للاتفاق السريع وسيئة للتذكّر. الرسائل الجديدة تدفع القديمة بعيدًا، وبعد يوم يصعب العثور على الاتفاق.', 'السبب الثاني: نادرًا ما تحتوي الرسالة على كل شيء. ما المطلوب واضح، لكن من سينفّذ ومتى غير واضح.'] },
      { h: 'القاعدة 1. من وماذا ومتى', p: ['لكل مهمة ثلاثة أشياء: منفّذ وعمل وموعد. إن غاب أحدها فهي أمنية لا مهمة.'], ex: '«يرجان، جهّز العرض لشركة أرمان-ستروي قبل الخميس»: من هو يرجان، وماذا هو العرض، ومتى هو الخميس.' },
      { h: 'القاعدة 2. مكان واحد للمهام', p: ['يمكن الاتفاق في أي مكان، لكن يجب أن تعيش المهمة في مكان واحد، وإلا ستجمع الحالة من خمس محادثات وجدولين.'] },
      { h: 'القاعدة 3. التذكير قبل الموعد لا بعده', p: ['من المفيد أن تعرف بالخطر قبل الموعد بيوم لا بعده. اتفقوا على أن يتلقى المنفّذ تذكيرًا قبل يوم، وأن ترى أنت المهمة المتعثرة.'] },
      { h: 'القاعدة 4. ملخص بدل «ما الأخبار؟»', p: ['بدل سؤال كل شخص، احصل صباحًا على ملخص واحد: ما أُنجز، وما يحترق، وأين يلزم قرارك.'] },
      { h: 'القاعدة 5. قرارات الاجتماع تصبح مهام فورًا', p: ['الاجتماع بلا قرارات مكتوبة يُنسى خلال أسبوع. حوّل كل قرار إلى مهمة وفق القاعدة 1 والجميع ما زالوا في الغرفة.'] },
      { h: 'كيف يفعل Proji ذلك', p: ['ينفّذ Proji هذه القواعد بنفسه. يكتب الفريق في واتساب وتيليغرام كالمعتاد، ويجد Proji في الرسالة من وماذا ومتى، وينشئ مهمة في المشروع المناسب.', 'ثم يذكّر المنفّذ، وينبّهك مسبقًا إلى الخطر، ويرسل ملخصًا كل صباح. ويجيب المساعد Proji AI عن أسئلة مثل «ما المتأخر ولدى من؟» بكلمات بسيطة.'] },
    ],
    end: 'دع القواعد تُنفَّذ وحدها',
  },
};

const SLUG = 'guide';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => (
  <>
    <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverGuide} />
    <article className="kt-article kt-sec ai-in" aria-labelledby={`${SLUG}-h`}>
      <nav aria-label={c.toc}>
        <h2 className="kt-muted">{c.toc}</h2>
        <ol className="kt-toc">{c.parts.map((p, i) => <li key={p.h}><a href={`#p${i + 1}`}>{p.h}</a></li>)}</ol>
      </nav>
      {c.parts.map((part, i) => (
        <section key={part.h} id={`p${i + 1}`}>
          <h2>{part.h}</h2>
          {part.p.map(t => <p key={t}>{t}</p>)}
          {part.ex && <p className="kt-ex">{part.ex}</p>}
        </section>
      ))}
    </article>
    <End slug={SLUG} lang={lang} h={c.end} />
  </>
);

const ld = (c: C) => ({ '@type': 'Article', headline: c.title, description: c.desc, author: { '@type': 'Organization', name: 'Proji' } });

export default landing({ slug: SLUG, copy, Page, ld, links: c => [['#p1', c.toc]] });

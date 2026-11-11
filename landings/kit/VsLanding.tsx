import React from 'react';
import type { Lang } from '../board/copy';
import { SketchChat, SketchClock, SketchSun } from '../board/Sketches';
import { CoverVs } from './Covers';
import { End, Hero, PicList, Sec, landing, type Base, type L4 } from './Kit';

/** /vs — лендинг-сравнение: таблица и чаты против Proji, по-честному, с блоком «когда таблицы хватает». */

interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  table: { h: string; cols: [string, string, string]; rows: [string, string, string][] };
  enough: { h: string; items: [string, string][] };
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — таблица и чаты или Proji: честное сравнение',
    desc: 'Чем Proji отличается от таблицы и рабочих чатов: задачи из переписки, напоминания до срока, утренняя сводка и ответы ИИ по вашим данным.',
    hero: { h: 'Таблица и чаты', grad: 'или Proji?', sub: 'Многие ведут задачи в таблице, а договариваются в WhatsApp. Вот чем это отличается от Proji, по шагам обычного рабочего дня.' },
    table: {
      h: 'Один и тот же день, два способа',
      cols: ['Что происходит', 'Таблица и чаты', 'Proji'],
      rows: [
        ['Договорились в чате', 'Кто-то должен вручную перенести задачу в таблицу. Часто забывают.', 'Proji сам превращает договорённость в задачу с исполнителем и сроком.'],
        ['Подходит срок', 'Таблица молчит. О срыве узнают, когда уже поздно.', 'Proji напоминает исполнителю и заранее предупреждает вас.'],
        ['Нужно узнать статус', 'Пишете каждому: «ну что там?»', 'Утром приходит сводка: что сделано, что горит, где нужно ваше решение.'],
        ['Вопрос «что просрочено и у кого?»', 'Фильтры и подсчёт вручную.', 'Proji AI отвечает обычными словами со ссылками на карточки.'],
        ['«Успеем до конца недели?»', 'Оценка на глаз.', 'Прогноз по реальной скорости вашей команды.'],
        ['Кто-то меняет данные', 'Любой может случайно стереть строку.', 'Proji AI меняет что-то только после вашего «Подтвердить».'],
      ],
    },
    enough: {
      h: 'Когда таблицы хватает, а когда нет',
      items: [
        ['Таблицы хватает', 'Если вас двое-трое, задач немного и все сидят в одной комнате.'],
        ['Пора в Proji', 'Если задачи живут в нескольких чатах и вы узнаёте о проблемах последним.'],
        ['Переход без боли', 'Команда продолжает писать в WhatsApp и Telegram, как привыкла. Осваивать новое не нужно.'],
      ],
    },
    end: 'Проверьте на своей команде',
  },
  kk: {
    title: 'proji — кесте мен чаттар ма, әлде Proji ме: адал салыстыру',
    desc: 'Proji кесте мен жұмыс чаттарынан немен ерекшеленеді: хат алмасудан тапсырмалар, мерзімге дейін еске салу, таңғы шолу және деректеріңіз бойынша ЖИ жауаптары.',
    hero: { h: 'Кесте мен чаттар', grad: 'әлде Proji ме?', sub: 'Көбі тапсырмаларды кестеде жүргізеді, ал WhatsApp-та келіседі. Кәдімгі жұмыс күнінің қадамдары бойынша Proji-ден айырмашылығы осы.' },
    table: {
      h: 'Бір күн, екі тәсіл',
      cols: ['Не болып жатыр', 'Кесте мен чаттар', 'Proji'],
      rows: [
        ['Чатта келісті', 'Біреу тапсырманы кестеге қолмен көшіруі керек. Жиі ұмытады.', 'Proji келісімді орындаушысы мен мерзімі бар тапсырмаға өзі айналдырады.'],
        ['Мерзім жақындады', 'Кесте үндемейді. Іркіліс туралы кеш біледі.', 'Proji орындаушыға еске салады және сізді алдын ала ескертеді.'],
        ['Мәртебені білу керек', 'Әрқайсысына жазасыз: «қалай, не болды?»', 'Таңертең шолу келеді: не істелді, не жанып тұр, қайда сіздің шешіміңіз керек.'],
        ['«Не мерзімі өтті және кімде?»', 'Сүзгілер мен қолмен санау.', 'Proji AI карточкаларға сілтемемен қарапайым сөзбен жауап береді.'],
        ['«Апта соңына үлгереміз бе?»', 'Көзбен шамалау.', 'Командаңыздың нақты жылдамдығы бойынша болжам.'],
        ['Біреу деректерді өзгертеді', 'Кез келген адам жолды байқамай өшіріп тастай алады.', 'Proji AI тек сіз «Растау» басқаннан кейін өзгертеді.'],
      ],
    },
    enough: {
      h: 'Кесте қашан жетеді, қашан жетпейді',
      items: [
        ['Кесте жетеді', 'Егер сіз екі-үш адам болсаңыз, тапсырма аз болса және бәрі бір бөлмеде отырса.'],
        ['Proji-ге уақыт келді', 'Егер тапсырмалар бірнеше чатта жүрсе және мәселе туралы соңғы болып білсеңіз.'],
        ['Ауырсынусыз көшу', 'Команда WhatsApp пен Telegram-да әдеттегідей жаза береді. Жаңа нәрсе үйренудің қажеті жоқ.'],
      ],
    },
    end: 'Өз командаңызда тексеріңіз',
  },
  en: {
    title: 'proji — spreadsheets and chats or Proji: an honest comparison',
    desc: 'How Proji differs from a spreadsheet and work chats: tasks from conversations, reminders before deadlines, a morning summary and AI answers about your data.',
    hero: { h: 'Spreadsheet and chats', grad: 'or Proji?', sub: 'Many teams track tasks in a spreadsheet and agree on them in WhatsApp. Here is how that differs from Proji, step by step through a normal workday.' },
    table: {
      h: 'Same day, two ways',
      cols: ['What happens', 'Spreadsheet and chats', 'Proji'],
      rows: [
        ['You agree on something in chat', 'Someone has to copy the task into the sheet by hand. Often nobody does.', 'Proji turns the agreement into a task with an owner and a deadline.'],
        ['A deadline is near', 'The sheet stays silent. You learn about the miss too late.', 'Proji reminds the owner and warns you in advance.'],
        ['You need a status', 'You message everyone: “so, how is it going?”', 'A morning summary arrives: what is done, what is on fire, where your decision is needed.'],
        ['“What is overdue and whose is it?”', 'Filters and counting by hand.', 'Proji AI answers in plain words with links to the cards.'],
        ['“Will we make it by Friday?”', 'A guess.', 'A forecast based on your team’s real pace.'],
        ['Someone changes data', 'Anyone can delete a row by accident.', 'Proji AI changes things only after you press “Confirm”.'],
      ],
    },
    enough: {
      h: 'When a spreadsheet is enough, and when it is not',
      items: [
        ['A spreadsheet is enough', 'If there are two or three of you, few tasks and everyone sits in one room.'],
        ['Time for Proji', 'If tasks live in several chats and you are the last to hear about problems.'],
        ['A painless switch', 'The team keeps writing in WhatsApp and Telegram as usual. Nothing new to learn.'],
      ],
    },
    end: 'Try it with your own team',
  },
  ar: {
    title: 'proji — الجداول والمحادثات أم Proji: مقارنة صادقة',
    desc: 'كيف يختلف Proji عن الجداول ومحادثات العمل: مهام من المراسلات، وتذكير قبل الموعد، وملخص صباحي، وإجابات الذكاء الاصطناعي عن بياناتك.',
    hero: { h: 'الجداول والمحادثات', grad: 'أم Proji؟', sub: 'كثيرون يتابعون المهام في جدول ويتفقون عليها في واتساب. إليك الفرق عن Proji خطوة بخطوة خلال يوم عمل عادي.' },
    table: {
      h: 'اليوم نفسه بطريقتين',
      cols: ['ماذا يحدث', 'الجداول والمحادثات', 'Proji'],
      rows: [
        ['اتفقتم في المحادثة', 'على أحدهم نقل المهمة إلى الجدول يدويًا، وغالبًا يُنسى ذلك.', 'يحوّل Proji الاتفاق إلى مهمة لها منفّذ وموعد.'],
        ['اقترب الموعد', 'الجدول صامت، وتعرف بالتأخير بعد فوات الأوان.', 'يذكّر Proji المنفّذ وينبّهك مسبقًا.'],
        ['تحتاج معرفة الحالة', 'تكتب لكل شخص: «ما الأخبار؟»', 'يصلك صباحًا ملخص: ما أُنجز، وما يحترق، وأين يلزم قرارك.'],
        ['«ما المتأخر ولدى من؟»', 'فلاتر وعدّ يدوي.', 'يجيب Proji AI بكلمات بسيطة مع روابط إلى البطاقات.'],
        ['«هل سننجز قبل نهاية الأسبوع؟»', 'تقدير بالعين.', 'توقّع مبني على السرعة الفعلية لفريقك.'],
        ['أحدهم يغيّر البيانات', 'يمكن لأي شخص حذف سطر بالخطأ.', 'لا يغيّر Proji AI شيئًا إلا بعد ضغطك «تأكيد».'],
      ],
    },
    enough: {
      h: 'متى يكفي الجدول ومتى لا يكفي',
      items: [
        ['الجدول يكفي', 'إذا كنتم شخصين أو ثلاثة، والمهام قليلة، والجميع في غرفة واحدة.'],
        ['حان وقت Proji', 'إذا كانت المهام موزعة على عدة محادثات وتعرف بالمشكلات آخر الناس.'],
        ['انتقال بلا عناء', 'يواصل الفريق الكتابة في واتساب وتيليغرام كالمعتاد، ولا حاجة لتعلّم شيء جديد.'],
      ],
    },
    end: 'جرّبه مع فريقك',
  },
};

const SLUG = 'vs';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => (
  <>
    <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverVs} />
    <Sec id="compare" h={c.table.h}>
      <div className="kt-vs" role="table">
        <div className="kt-vs-row kt-vs-head" role="row">
          {c.table.cols.map((t, i) => (i === 0 ? <h3 key={t} role="columnheader">{t}</h3> : <p key={t} role="columnheader">{t}</p>))}
        </div>
        {c.table.rows.map(([what, old, now]) => (
          <div className="kt-vs-row" role="row" key={what}>
            <h3 role="rowheader">{what}</h3>
            <p className="kt-vs-old" role="cell">{old}</p>
            <p className="kt-vs-new" role="cell">{now}</p>
          </div>
        ))}
      </div>
    </Sec>
    <Sec id="enough" h={c.enough.h}>
      <PicList items={c.enough.items} pics={[SketchClock, SketchChat, SketchSun]} />
    </Sec>
    <End slug={SLUG} lang={lang} h={c.end} />
  </>
);

export default landing({ slug: SLUG, copy, Page, links: c => [['#compare', c.table.h]] });

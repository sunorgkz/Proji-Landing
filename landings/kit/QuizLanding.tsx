import React, { useEffect, useState } from 'react';
import { trackEvent } from '../../analytics';
import type { Lang } from '../board/copy';
import { CoverQuiz } from './Covers';
import { End, Hero, LeadForm, Sec, Try, landing, type Base, type L4 } from './Kit';

/** /quiz — лендинг-диагностика: 7 вопросов «да/нет», результат и что с ним делать. Ничего не отправляется, кроме события quiz_done. */

interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  quiz: { h: string; lead: string; yes: string; no: string; qs: string[]; left: (n: number) => string };
  results: [string, string][];
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — тест: теряются ли задачи в вашей команде',
    desc: 'Семь вопросов «да или нет» за минуту: узнайте, теряются ли договорённости и сроки в вашей команде и что с этим делать.',
    hero: { h: 'Теряются ли задачи', grad: 'в вашей команде?', sub: 'Семь вопросов «да или нет». Минута времени, и вы увидите, где у команды утекают договорённости.' },
    quiz: {
      h: 'Ответьте честно',
      lead: 'Ответы остаются у вас в браузере.',
      yes: 'Да',
      no: 'Нет',
      qs: [
        'Договорённости из чата иногда никто не записывает.',
        'О сорванном сроке вы узнаёте, когда уже поздно.',
        'Чтобы понять статус, вы пишете «ну что там?».',
        'Сотрудники пишут отчёты вручную.',
        'Задачи живут в нескольких местах: чаты, таблицы, блокнот.',
        'Непонятно, кто перегружен, а кто свободен.',
        'Планёрка заканчивается без записанных решений.',
      ],
      left: n => `Осталось ответить: ${n}`,
    },
    results: [
      ['Порядок есть', 'Задачи у вас почти не теряются. Proji пригодится, когда команда вырастет: он сохранит этот порядок без лишних отчётов.'],
      ['Задачи начинают теряться', 'Часть договорённостей уже уходит в чаты и не возвращается. Proji сам превращает сообщения в задачи и напоминает о сроках.'],
      ['Задачи теряются каждый день', 'Вы тратите время на поиски и уточнения. Proji соберёт задачи из чатов, проследит за сроками и каждое утро покажет, что горит.'],
    ],
    end: 'Наведите порядок за 14 дней бесплатно',
  },
  kk: {
    title: 'proji — тест: командаңызда тапсырмалар жоғала ма',
    desc: 'Бір минуттағы жеті «иә немесе жоқ» сұрағы: командаңызда келісімдер мен мерзімдер жоғала ма және не істеу керек.',
    hero: { h: 'Командаңызда', grad: 'тапсырмалар жоғала ма?', sub: 'Жеті «иә немесе жоқ» сұрағы. Бір минут, және командада келісімдер қайда ағып кететінін көресіз.' },
    quiz: {
      h: 'Шынын айтыңыз',
      lead: 'Жауаптар браузеріңізде қалады.',
      yes: 'Иә',
      no: 'Жоқ',
      qs: [
        'Чаттағы келісімдерді кейде ешкім жазып алмайды.',
        'Мерзімнің бұзылғанын кеш білесіз.',
        'Мәртебені білу үшін «қалай, не болды?» деп жазасыз.',
        'Қызметкерлер есептерді қолмен жазады.',
        'Тапсырмалар бірнеше жерде: чаттар, кестелер, дәптер.',
        'Кім шамадан тыс жүктелген, кім бос екені түсініксіз.',
        'Жоспарлау жиналысы жазылған шешімдерсіз аяқталады.',
      ],
      left: n => `Жауап беру қалды: ${n}`,
    },
    results: [
      ['Тәртіп бар', 'Тапсырмалар іс жүзінде жоғалмайды. Команда өскенде Proji бұл тәртіпті артық есептерсіз сақтайды.'],
      ['Тапсырмалар жоғала бастады', 'Келісімдердің бір бөлігі чаттарда қалып жатыр. Proji хабарламаларды тапсырмаға өзі айналдырып, мерзімдерді еске салады.'],
      ['Тапсырмалар күн сайын жоғалады', 'Іздеу мен нақтылауға уақыт кетеді. Proji чаттардан тапсырмаларды жинап, мерзімдерді қадағалайды және таңертең не жанып тұрғанын көрсетеді.'],
    ],
    end: '14 күн тегін тәртіп орнатыңыз',
  },
  en: {
    title: 'proji — quiz: are tasks getting lost in your team?',
    desc: 'Seven yes-or-no questions in one minute: find out whether agreements and deadlines get lost in your team and what to do about it.',
    hero: { h: 'Are tasks getting lost', grad: 'in your team?', sub: 'Seven yes-or-no questions. One minute, and you will see where your team leaks agreements.' },
    quiz: {
      h: 'Answer honestly',
      lead: 'Your answers stay in your browser.',
      yes: 'Yes',
      no: 'No',
      qs: [
        'Agreements made in chat sometimes never get written down.',
        'You learn about a missed deadline when it is too late.',
        'To get a status, you write “so, how is it going?”.',
        'People write reports by hand.',
        'Tasks live in several places: chats, spreadsheets, a notebook.',
        'It is unclear who is overloaded and who is free.',
        'The planning meeting ends without written decisions.',
      ],
      left: n => `Questions left: ${n}`,
    },
    results: [
      ['You have order', 'Tasks barely get lost. Proji helps when the team grows: it keeps this order without extra reports.'],
      ['Tasks are starting to slip', 'Some agreements already disappear into chats. Proji turns messages into tasks and reminds people about deadlines.'],
      ['Tasks get lost every day', 'You spend time searching and asking. Proji collects tasks from chats, watches deadlines and shows what is on fire every morning.'],
    ],
    end: 'Get things in order, 14 days free',
  },
  ar: {
    title: 'proji — اختبار: هل تضيع المهام في فريقك؟',
    desc: 'سبعة أسئلة بنعم أو لا في دقيقة: اعرف هل تضيع الاتفاقات والمواعيد في فريقك وماذا تفعل حيال ذلك.',
    hero: { h: 'هل تضيع المهام', grad: 'في فريقك؟', sub: 'سبعة أسئلة بنعم أو لا. دقيقة واحدة وسترى أين تتسرب الاتفاقات في فريقك.' },
    quiz: {
      h: 'أجب بصدق',
      lead: 'تبقى إجاباتك في متصفحك.',
      yes: 'نعم',
      no: 'لا',
      qs: [
        'أحيانًا لا يدوّن أحد الاتفاقات من المحادثة.',
        'تعرف بتجاوز الموعد بعد فوات الأوان.',
        'لمعرفة الحالة تكتب «ما الأخبار؟».',
        'يكتب الموظفون التقارير يدويًا.',
        'المهام موزعة في أماكن عدة: محادثات وجداول ودفتر.',
        'لا يتضح من المثقل بالعمل ومن المتفرغ.',
        'ينتهي اجتماع التخطيط بلا قرارات مكتوبة.',
      ],
      left: n => `أسئلة متبقية: ${n}`,
    },
    results: [
      ['لديك نظام', 'المهام لا تضيع تقريبًا. سيفيدك Proji عندما يكبر الفريق: يحافظ على هذا النظام بلا تقارير إضافية.'],
      ['بدأت المهام تضيع', 'بعض الاتفاقات تذهب في المحادثات ولا تعود. يحوّل Proji الرسائل إلى مهام ويذكّر بالمواعيد.'],
      ['المهام تضيع كل يوم', 'تهدر وقتًا في البحث والاستفسار. يجمع Proji المهام من المحادثات ويتابع المواعيد ويعرض كل صباح ما يحترق.'],
    ],
    end: 'رتّب العمل مجانًا لمدة 14 يومًا',
  },
};

const SLUG = 'quiz';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => {
  const [ans, setAns] = useState<(boolean | null)[]>(() => c.quiz.qs.map(() => null));
  const left = ans.filter(a => a === null).length;
  const yes = ans.filter(Boolean).length;
  const level = yes <= 2 ? 0 : yes <= 4 ? 1 : 2;
  useEffect(() => {
    if (left === 0) trackEvent('quiz_done', { landing: SLUG, yes, level });
  }, [left, yes, level]);
  const set = (i: number, v: boolean) => setAns(a => a.map((x, j) => (j === i ? v : x)));
  return (
    <>
      <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverQuiz} />
      <Sec id="test" h={c.quiz.h} lead={c.quiz.lead}>
        <div className="kt-box">
          <ol className="kt-quiz">
            {c.quiz.qs.map((q, i) => (
              <li key={q}>
                <span>{q}</span>
                <span className="kt-yn" role="group" aria-label={q}>
                  <button type="button" aria-pressed={ans[i] === true} onClick={() => set(i, true)}>{c.quiz.yes}</button>
                  <button type="button" aria-pressed={ans[i] === false} onClick={() => set(i, false)}>{c.quiz.no}</button>
                </span>
              </li>
            ))}
          </ol>
          <div className="kt-result" aria-live="polite">
            {left > 0 ? (
              <p>{c.quiz.left(left)}</p>
            ) : (
              <>
                <b>{c.results[level][0]}</b>
                <div className="kt-meter" aria-hidden><i style={{ width: `${Math.max(8, (yes / c.quiz.qs.length) * 100)}%` }} /></div>
                <p>{c.results[level][1]}</p>
                <div className="ai-actions"><Try slug={SLUG} place="result" lang={lang} /></div>
                <LeadForm slug={SLUG} lang={lang} detail={`тест: ${yes} из ${c.quiz.qs.length} «да»`} />
              </>
            )}
          </div>
        </div>
      </Sec>
      <End slug={SLUG} lang={lang} h={c.end} />
    </>
  );
};

export default landing({ slug: SLUG, copy, Page, links: c => [['#test', c.quiz.h]] });

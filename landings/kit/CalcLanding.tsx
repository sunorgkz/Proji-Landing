import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../../analytics';
import type { Lang } from '../board/copy';
import { SketchClock, SketchSun, SketchTask } from '../board/Sketches';
import { CoverCalc } from './Covers';
import { End, Hero, LeadForm, PicList, Sec, landing, type Base, type L4 } from './Kit';

/**
 * /calc — лендинг-калькулятор: посетитель сам считает, сколько часов в месяц уходит на сбор статусов.
 * Считаем только из его чисел; обещаний «сэкономите N%» нет: таких подтверждённых цифр у нас нет.
 */

interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  calc: { h: string; lead: string; people: string; each: string; mine: string; min: string; result: string; days: (d: string) => string; note: string };
  how: { h: string; items: [string, string][] };
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — калькулятор: сколько часов уходит на «ну что там?»',
    desc: 'Посчитайте, сколько рабочих часов в месяц ваша команда тратит на сбор статусов и уточнения в чатах.',
    hero: { h: 'Сколько стоит', grad: '«ну что там?»', sub: 'Каждый день кто-то спрашивает про статус, а кто-то отвечает. Посчитайте, сколько часов в месяц на это уходит у вашей команды.' },
    calc: {
      h: 'Посчитайте на своих числах',
      lead: 'Двигайте ползунки. Считаем 21 рабочий день в месяце.',
      people: 'Сколько человек в команде',
      each: 'Сколько минут в день каждый тратит на ответы о статусе',
      mine: 'Сколько минут в день вы собираете статусы',
      min: 'мин',
      result: 'часов в месяц уходит на сбор статусов',
      days: d => `Это примерно ${d} полных рабочих дней.`,
      note: 'Расчёт по вашим числам. Сколько из этого вернёт Proji, зависит от команды: проверьте за 14 бесплатных дней.',
    },
    how: {
      h: 'Как Proji забирает эту работу',
      items: [
        ['Статус собирается сам', 'Proji видит задачи и сроки, поэтому отчёты писать не нужно.'],
        ['Напоминания до срока', 'Исполнитель получает напоминание, а вы узнаёте о риске заранее.'],
        ['Сводка утром', 'Одно сообщение вместо десятков вопросов: что сделано, что горит, где ваше решение.'],
      ],
    },
    end: 'Верните эти часы команде',
  },
  kk: {
    title: 'proji — калькулятор: «қалай, не болды?» қанша сағат алады',
    desc: 'Командаңыз мәртебе жинауға және чаттағы нақтылауларға айына қанша жұмыс сағатын жұмсайтынын есептеңіз.',
    hero: { h: '«Қалай, не болды?»', grad: 'қанша тұрады?', sub: 'Күн сайын біреу мәртебені сұрайды, біреу жауап береді. Командаңызда бұған айына қанша сағат кететінін есептеңіз.' },
    calc: {
      h: 'Өз сандарыңызбен есептеңіз',
      lead: 'Жүгірткілерді жылжытыңыз. Айына 21 жұмыс күні деп есептейміз.',
      people: 'Командада неше адам',
      each: 'Әркім күніне мәртебе туралы жауапқа неше минут жұмсайды',
      mine: 'Сіз күніне мәртебе жинауға неше минут жұмсайсыз',
      min: 'мин',
      result: 'сағат айына мәртебе жинауға кетеді',
      days: d => `Бұл шамамен ${d} толық жұмыс күні.`,
      note: 'Есеп сіздің сандарыңыз бойынша. Proji оның қаншасын қайтаратыны командаға байланысты: 14 тегін күнде тексеріңіз.',
    },
    how: {
      h: 'Proji бұл жұмысты қалай алады',
      items: [
        ['Мәртебе өзі жиналады', 'Proji тапсырмалар мен мерзімдерді көреді, сондықтан есеп жазудың қажеті жоқ.'],
        ['Мерзімге дейін еске салу', 'Орындаушы еске салу алады, ал сіз тәуекел туралы алдын ала білесіз.'],
        ['Таңғы шолу', 'Ондаған сұрақтың орнына бір хабарлама: не істелді, не жанып тұр, қайда сіздің шешіміңіз керек.'],
      ],
    },
    end: 'Бұл сағаттарды командаға қайтарыңыз',
  },
  en: {
    title: 'proji — calculator: how many hours go into “so, how is it going?”',
    desc: 'Calculate how many working hours a month your team spends on collecting statuses and clarifying things in chats.',
    hero: { h: 'What does', grad: '“how is it going?” cost', sub: 'Every day someone asks for a status and someone answers. Calculate how many hours a month this takes in your team.' },
    calc: {
      h: 'Use your own numbers',
      lead: 'Move the sliders. We count 21 working days a month.',
      people: 'People in the team',
      each: 'Minutes a day each person spends answering status questions',
      mine: 'Minutes a day you spend collecting statuses',
      min: 'min',
      result: 'hours a month go into collecting statuses',
      days: d => `That is about ${d} full working days.`,
      note: 'Calculated from your numbers. How much of it Proji gives back depends on the team: check during the 14 free days.',
    },
    how: {
      h: 'How Proji takes over this work',
      items: [
        ['Status builds itself', 'Proji sees tasks and deadlines, so nobody writes reports.'],
        ['Reminders before deadlines', 'The owner gets a reminder, and you hear about the risk in advance.'],
        ['A morning summary', 'One message instead of dozens of questions: what is done, what is on fire, where you need to decide.'],
      ],
    },
    end: 'Give these hours back to your team',
  },
  ar: {
    title: 'proji — حاسبة: كم ساعة تذهب في «ما الأخبار؟»',
    desc: 'احسب كم ساعة عمل شهريًا يقضيها فريقك في جمع الحالات والاستفسارات في المحادثات.',
    hero: { h: 'كم يكلّف سؤال', grad: '«ما الأخبار؟»', sub: 'كل يوم يسأل أحدهم عن الحالة ويجيب آخر. احسب كم ساعة شهريًا يأخذ ذلك من فريقك.' },
    calc: {
      h: 'احسب بأرقامك',
      lead: 'حرّك المؤشرات. نحسب 21 يوم عمل في الشهر.',
      people: 'عدد أعضاء الفريق',
      each: 'دقائق يوميًا يقضيها كل شخص في الرد على أسئلة الحالة',
      mine: 'دقائق يوميًا تقضيها في جمع الحالات',
      min: 'دقيقة',
      result: 'ساعة شهريًا تذهب في جمع الحالات',
      days: d => `هذا قرابة ${d} أيام عمل كاملة.`,
      note: 'الحساب بأرقامك. كم سيعيد Proji منها يعتمد على الفريق: جرّب خلال 14 يومًا مجانًا.',
    },
    how: {
      h: 'كيف يتولى Proji هذا العمل',
      items: [
        ['الحالة تتجمع وحدها', 'يرى Proji المهام والمواعيد، فلا حاجة لكتابة التقارير.'],
        ['تذكير قبل الموعد', 'يتلقى المنفّذ تذكيرًا، وتعرف أنت بالخطر مسبقًا.'],
        ['ملخص صباحي', 'رسالة واحدة بدل عشرات الأسئلة: ما أُنجز، وما يحترق، وأين يلزم قرارك.'],
      ],
    },
    end: 'أعد هذه الساعات إلى فريقك',
  },
};

const SLUG = 'calc';

const Range: React.FC<{ label: string; unit?: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }> = ({ label, unit, value, min, max, step = 1, onChange }) => (
  <label>
    <span>{label}</span>
    <output>{value}{unit && ` ${unit}`}</output>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
  </label>
);

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => {
  const [people, setPeople] = useState(10);
  const [each, setEach] = useState(15);
  const [mine, setMine] = useState(40);
  const hours = Math.round(((people * each + mine) * 21) / 60);
  const fmt = new Intl.NumberFormat(lang === 'ar' ? 'ar' : lang, { maximumFractionDigits: 1 });
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || (people === 10 && each === 15 && mine === 40)) return;
    const t = window.setTimeout(() => {
      sent.current = true;
      trackEvent('calc_done', { landing: SLUG, people, each, mine, hours });
    }, 1500);
    return () => window.clearTimeout(t);
  }, [people, each, mine, hours]);
  return (
    <>
      <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverCalc} />
      <Sec id="count" h={c.calc.h} lead={c.calc.lead}>
        <div className="kt-box kt-calc">
          <Range label={c.calc.people} value={people} min={2} max={200} onChange={setPeople} />
          <Range label={c.calc.each} unit={c.calc.min} value={each} min={0} max={90} step={5} onChange={setEach} />
          <Range label={c.calc.mine} unit={c.calc.min} value={mine} min={0} max={180} step={5} onChange={setMine} />
          <div className="kt-result" aria-live="polite">
            <span className="kt-big">{fmt.format(hours)}</span>
            <b>{c.calc.result}</b>
            <p>{c.calc.days(fmt.format(Math.round((hours / 8) * 10) / 10))}</p>
            <p>{c.calc.note}</p>
            <LeadForm slug={SLUG} lang={lang} detail={`калькулятор: ${people} чел., ${hours} ч/мес`} />
          </div>
        </div>
      </Sec>
      <Sec id="how" h={c.how.h}>
        <PicList items={c.how.items} pics={[SketchTask, SketchClock, SketchSun]} />
      </Sec>
      <End slug={SLUG} lang={lang} h={c.end} />
    </>
  );
};

export default landing({ slug: SLUG, copy, Page, links: c => [['#count', c.calc.h], ['#how', c.how.h]] });

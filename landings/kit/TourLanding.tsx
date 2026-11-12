import React, { useEffect, useState } from 'react';
import { trackEvent } from '../../analytics';
import type { Lang } from '../board/copy';
import { CoverTour } from './Covers';
import { End, Hero, Sec, landing, type Base, type L4 } from './Kit';

/**
 * /tour — интерактивный тур: четыре вопроса к Proji AI по вкладкам. Диалоги — из примеров справки
 * (quick-start.md, what-is-proji-ai.md); имена и цифры придуманы. Это ИЛЛЮСТРАЦИЯ, а не снимок живого Proji.
 */

interface Scene { tab: string; q: string; a: string; draft?: { confirm: string; done: string } }
interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  tour: { h: string; lead: string; scenes: Scene[] };
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — тур: спросите Proji AI о своей команде',
    desc: 'Посмотрите, как Proji AI отвечает на рабочие вопросы: сводка дня, что просрочено, создать карточку, кто переносит сроки.',
    hero: { h: 'Покликайте', grad: 'до регистрации', sub: 'Четыре вопроса, которые руководитель задаёт Proji AI чаще всего. Выберите вопрос и посмотрите ответ.' },
    tour: {
      h: 'Выберите вопрос',
      lead: 'Имена и цифры в примерах придуманы.',
      scenes: [
        { tab: 'Сводка дня', q: 'Сводка на сегодня', a: 'Просрочено 2 карточки, на этой неделе горят 5. Начните с «Договор аренды»: срок был вчера.' },
        { tab: 'Что просрочено', q: 'Что просрочено и у кого?', a: 'Просрочено 3 карточки. У Айдоса — «Подготовить договор» (на 2 дня), у Марии — две карточки по рекламе.' },
        { tab: 'Создать карточку', q: 'Создай карточку «Заказать визитки» на пятницу', a: 'Подготовил черновик: «Заказать визитки», срок — пятница.', draft: { confirm: 'Подтвердить', done: 'Карточка появилась на доске' } },
        { tab: 'Кто переносит сроки', q: 'Кто чаще всех переносил сроки за две недели?', a: 'Чаще всех — Мария (4 переноса). Все они в проекте «Запуск рекламы».' },
      ],
    },
    end: 'Задайте эти вопросы о своей команде',
  },
  kk: {
    title: 'proji — тур: Proji AI-дан командаңыз туралы сұраңыз',
    desc: 'Proji AI жұмыс сұрақтарына қалай жауап беретінін көріңіз: күн шолуы, не мерзімі өтті, карточка жасау, кім мерзімді ауыстырады.',
    hero: { h: 'Тіркелмей-ақ', grad: 'басып көріңіз', sub: 'Басшы Proji AI-ға жиі қоятын төрт сұрақ. Сұрақты таңдап, жауабын қараңыз.' },
    tour: {
      h: 'Сұрақты таңдаңыз',
      lead: 'Мысалдардағы есімдер мен сандар ойдан алынған.',
      scenes: [
        { tab: 'Күн шолуы', q: 'Бүгінгі шолу', a: '2 карточканың мерзімі өтті, осы аптада 5-еуі жанып тұр. «Жалдау шартынан» бастаңыз: мерзімі кеше болған.' },
        { tab: 'Не мерзімі өтті', q: 'Не мерзімі өтті және кімде?', a: '3 карточканың мерзімі өтті. Айдоста — «Шарт дайындау» (2 күнге), Марияда — жарнама бойынша екі карточка.' },
        { tab: 'Карточка жасау', q: 'Жұмаға «Визиткалар тапсыру» карточкасын жаса', a: 'Жоба дайындадым: «Визиткалар тапсыру», мерзімі — жұма.', draft: { confirm: 'Растау', done: 'Карточка тақтада пайда болды' } },
        { tab: 'Кім мерзім ауыстырады', q: 'Екі аптада кім мерзімді жиі ауыстырды?', a: 'Ең жиі — Мария (4 рет ауыстыру). Барлығы «Жарнама іске қосу» жобасында.' },
      ],
    },
    end: 'Бұл сұрақтарды өз командаңыз туралы қойыңыз',
  },
  en: {
    title: 'proji — tour: ask Proji AI about your team',
    desc: 'See how Proji AI answers work questions: daily summary, what is overdue, create a card, who moves deadlines.',
    hero: { h: 'Click around', grad: 'before you sign up', sub: 'Four questions managers ask Proji AI most often. Pick one and see the answer.' },
    tour: {
      h: 'Pick a question',
      lead: 'Names and numbers in the examples are made up.',
      scenes: [
        { tab: 'Daily summary', q: 'Summary for today', a: '2 cards are overdue and 5 are on fire this week. Start with “Lease agreement”: it was due yesterday.' },
        { tab: 'What is overdue', q: 'What is overdue and whose is it?', a: '3 cards are overdue. Aidos has “Prepare the contract” (2 days late), Maria has two ad cards.' },
        { tab: 'Create a card', q: 'Create a card “Order business cards” for Friday', a: 'Draft ready: “Order business cards”, due Friday.', draft: { confirm: 'Confirm', done: 'The card is on the board' } },
        { tab: 'Who slips', q: 'Who moved deadlines most often in the last two weeks?', a: 'Maria did (4 times). All of them in the “Ad launch” project.' },
      ],
    },
    end: 'Ask these questions about your own team',
  },
  ar: {
    title: 'proji — جولة: اسأل Proji AI عن فريقك',
    desc: 'شاهد كيف يجيب Proji AI عن أسئلة العمل: ملخص اليوم، وما المتأخر، وإنشاء بطاقة، ومن يؤجل المواعيد.',
    hero: { h: 'جرّب بالنقر', grad: 'قبل التسجيل', sub: 'أربعة أسئلة يطرحها المديرون على Proji AI كثيرًا. اختر سؤالًا وشاهد الإجابة.' },
    tour: {
      h: 'اختر سؤالًا',
      lead: 'الأسماء والأرقام في الأمثلة مختلقة.',
      scenes: [
        { tab: 'ملخص اليوم', q: 'ملخص اليوم', a: 'بطاقتان متأخرتان، و5 تحترق هذا الأسبوع. ابدأ بـ«عقد الإيجار»: كان موعده أمس.' },
        { tab: 'ما المتأخر', q: 'ما المتأخر ولدى من؟', a: '3 بطاقات متأخرة. لدى أيدوس «تجهيز العقد» (متأخرة يومين)، ولدى ماريا بطاقتان عن الإعلان.' },
        { tab: 'إنشاء بطاقة', q: 'أنشئ بطاقة «طلب بطاقات العمل» ليوم الجمعة', a: 'جهّزت مسودة: «طلب بطاقات العمل»، الموعد الجمعة.', draft: { confirm: 'تأكيد', done: 'ظهرت البطاقة على اللوحة' } },
        { tab: 'من يؤجل', q: 'من أجّل المواعيد أكثر خلال أسبوعين؟', a: 'ماريا (4 مرات)، وكلها في مشروع «إطلاق الإعلان».' },
      ],
    },
    end: 'اطرح هذه الأسئلة عن فريقك',
  },
};

const SLUG = 'tour';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => {
  const [on, setOn] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => setDone(false), [on, lang]);
  const s = c.tour.scenes[on];
  const pick = (i: number) => {
    setOn(i);
    trackEvent('tour_step', { landing: SLUG, step: i + 1 });
  };
  return (
    <>
      <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverTour} />
      <Sec id="try" h={c.tour.h} lead={c.tour.lead}>
        <div className="kt-tabs" role="tablist" aria-label={c.tour.h}>
          {c.tour.scenes.map((x, i) => (
            <button key={x.tab} type="button" role="tab" id={`tour-tab-${i}`} aria-selected={on === i} aria-controls="tour-panel" onClick={() => pick(i)}>{x.tab}</button>
          ))}
        </div>
        <div className="kt-chat" role="tabpanel" id="tour-panel" aria-labelledby={`tour-tab-${on}`} key={on + lang}>
          <p className="ai-q">{s.q}</p>
          <div className="ai-a">
            <span>{s.a}</span>
            {s.draft && (done
              ? <span className="kt-ok" aria-live="polite">✓ {s.draft.done}</span>
              : <span><button type="button" className="bd-btn is-small" onClick={() => setDone(true)}>{s.draft.confirm}</button></span>)}
          </div>
        </div>
      </Sec>
      <End slug={SLUG} lang={lang} h={c.end} />
    </>
  );
};

export default landing({ slug: SLUG, copy, Page, links: c => [['#try', c.tour.h]] });

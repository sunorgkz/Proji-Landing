import React from 'react';
import { useVariant } from '../../lib/ab';
import type { Lang } from '../board/copy';
import { CoverGo } from './Covers';
import { Try, landing, type Base, type L4 } from './Kit';

/**
 * /go — страница для рекламы: один экран, одна кнопка, A/B-тест заголовка (STRATEGY.md, раздел 5).
 * Вариант можно включить ссылкой ?ab=0|1|2. В событии cta_trial уходит variant: A, B или C.
 */

interface C extends Base {
  heads: [string, string][];
  sub: string;
  bullets: string[];
}

const copy: L4<C> = {
  ru: {
    title: 'proji — задачи из чатов больше не теряются',
    desc: 'Proji сам превращает договорённости из WhatsApp и Telegram в задачи, следит за сроками и каждое утро показывает, что горит. 14 дней бесплатно.',
    heads: [
      ['Задачи из чатов', 'больше не теряются'],
      ['Руководитель видит всё.', 'Команда знает, что делать.'],
      ['Каждое утро вы знаете,', 'что горит'],
    ],
    sub: 'Команда пишет в WhatsApp и Telegram, как обычно. Proji сам превращает договорённости в задачи и следит за сроками.',
    bullets: ['Ничего нового осваивать не надо', 'Напоминает до срока, а не после', 'Утром одна сводка вместо десятков чатов'],
  },
  kk: {
    title: 'proji — чаттағы тапсырмалар енді жоғалмайды',
    desc: 'Proji WhatsApp пен Telegram-дағы келісімдерді өзі тапсырмаға айналдырады, мерзімдерді қадағалайды және таң сайын не жанып тұрғанын көрсетеді. 14 күн тегін.',
    heads: [
      ['Чаттағы тапсырмалар', 'енді жоғалмайды'],
      ['Басшы бәрін көреді.', 'Команда не істеу керегін біледі.'],
      ['Таң сайын', 'не жанып тұрғанын білесіз'],
    ],
    sub: 'Команда WhatsApp пен Telegram-да әдеттегідей жазады. Proji келісімдерді өзі тапсырмаға айналдырып, мерзімдерді қадағалайды.',
    bullets: ['Жаңа нәрсе үйренудің қажеті жоқ', 'Мерзімнен кейін емес, бұрын еске салады', 'Таңертең ондаған чаттың орнына бір шолу'],
  },
  en: {
    title: 'proji — tasks from chats no longer get lost',
    desc: 'Proji turns agreements from WhatsApp and Telegram into tasks, watches deadlines and shows what is on fire every morning. 14 days free.',
    heads: [
      ['Tasks from chats', 'no longer get lost'],
      ['Leaders see everything.', 'The team knows what to do.'],
      ['Every morning you know', 'what is on fire'],
    ],
    sub: 'The team writes in WhatsApp and Telegram as usual. Proji turns agreements into tasks and watches the deadlines.',
    bullets: ['Nothing new to learn', 'Reminds before the deadline, not after', 'One morning summary instead of dozens of chats'],
  },
  ar: {
    title: 'proji — المهام في المحادثات لم تعد تضيع',
    desc: 'يحوّل Proji الاتفاقات في واتساب وتيليغرام إلى مهام، ويتابع المواعيد، ويعرض كل صباح ما يحترق. 14 يومًا مجانًا.',
    heads: [
      ['المهام في المحادثات', 'لم تعد تضيع'],
      ['المدير يرى كل شيء.', 'والفريق يعرف ما عليه فعله.'],
      ['كل صباح تعرف', 'ما الذي يحترق'],
    ],
    sub: 'يكتب الفريق في واتساب وتيليغرام كالمعتاد، ويحوّل Proji الاتفاقات إلى مهام ويتابع المواعيد.',
    bullets: ['لا حاجة لتعلّم شيء جديد', 'يذكّر قبل الموعد لا بعده', 'ملخص صباحي واحد بدل عشرات المحادثات'],
  },
};

const SLUG = 'go';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => {
  const { index, id } = useVariant('go_headline', [0, 1, 2]);
  const [h, grad] = c.heads[index];
  return (
    <div className="kt-go">
      <section className="ai-hero is-split mg-hero" aria-labelledby="go-h">
        <div className="ai-aurora" aria-hidden />
        <div>
          <h1 id="go-h">{h} <span className="bd-grad">{grad}</span></h1>
          <p className="ai-lead">{c.sub}</p>
          <ul className="kt-bullets">{c.bullets.map(b => <li key={b}>{b}</li>)}</ul>
          <div className="ai-actions"><Try slug={SLUG} place="hero" lang={lang} variant={id} /></div>
        </div>
        <figure className="mg-card"><CoverGo /></figure>
      </section>
    </div>
  );
};

export default landing({ slug: SLUG, copy, Page });

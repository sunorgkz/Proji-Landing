import React from 'react';
import type { Lang } from '../board/copy';
import { CoverGlossary } from './Covers';
import { End, Hero, Sec, landing, type Base, type L4 } from './Kit';

/** /glossary — словарь простыми словами (GEO): определение начинается с сути. Источник — glossary.md справки Proji. Разметка DefinedTermSet. */

type T = [string, string];
interface C extends Base {
  hero: { h: string; grad: string; sub: string };
  groups: { h: string; terms: T[] }[];
  end: string;
}

const copy: L4<C> = {
  ru: {
    title: 'proji — словарь: ИИ и управление задачами простыми словами',
    desc: 'Что такое ИИ-агент, черновик, пространство, сигнал, модель, провайдер, инъекция подсказки, канбан, бэклог, веха, KPI, OKR и WIP: короткие определения простыми словами.',
    hero: { h: 'Сложные слова', grad: 'простыми словами', sub: 'Короткий словарь понятий, которые встречаются в Proji и вокруг ИИ. Одно слово — одно объяснение.' },
    groups: [
      {
        h: 'Proji и ИИ',
        terms: [
          ['Proji AI', 'Помощник в правой панели Proji: отвечает по вашим задачам, проектам и документам обычными словами.'],
          ['ИИ-агент', 'Программа-помощник, которая не только отвечает, но и действует: ищет задачи, читает документы, считает дни.'],
          ['Черновик', 'Заготовка изменения, например новая карточка или новый срок, которую вы проверяете перед подтверждением.'],
          ['Подтвердить', 'Кнопка под черновиком. Пока вы её не нажали, ничего не меняется.'],
          ['Пространство', 'Рабочее пространство организации в Proji: границы, внутри которых ИИ видит данные.'],
          ['Сигнал', 'Готовый показатель того, что требует внимания: забытые задачи, зависшие согласования.'],
          ['Модель', 'Нейросеть, которая пишет ответ.'],
          ['Провайдер', 'Компания или сервис, который даёт доступ к моделям.'],
          ['Инъекция подсказки', 'Попытка спрятать команду для ИИ в тексте, который он будет читать. Proji AI считает такие тексты данными, а не командами.'],
        ],
      },
      {
        h: 'Управление задачами',
        terms: [
          ['Канбан', 'Доска с колонками и карточками, где задачи движутся слева направо: от «надо сделать» к «готово».'],
          ['Бэклог', 'Список задач и идей, которые ещё не взяли в работу.'],
          ['Веха', 'Контрольная точка проекта. Это не работа, а событие, например «договор подписан».'],
          ['KPI', 'Ключевой показатель: стабильное число, по которому следят за здоровьем направления.'],
          ['OKR', 'Цели и ключевые результаты на квартал.'],
          ['WIP', 'Сколько задач «в работе» одновременно. Чем меньше, тем быстрее идёт работа.'],
        ],
      },
    ],
    end: 'Понятные слова, понятная работа',
  },
  kk: {
    title: 'proji — сөздік: ЖИ және тапсырмаларды басқару қарапайым тілмен',
    desc: 'ЖИ-агент, жоба, кеңістік, сигнал, модель, провайдер, нұсқау инъекциясы, канбан, бэклог, кезең, KPI, OKR және WIP деген не: қарапайым тілмен қысқа анықтамалар.',
    hero: { h: 'Күрделі сөздер', grad: 'қарапайым тілмен', sub: 'Proji-де және ЖИ төңірегінде кездесетін ұғымдардың қысқа сөздігі. Бір сөз — бір түсіндірме.' },
    groups: [
      {
        h: 'Proji және ЖИ',
        terms: [
          ['Proji AI', 'Proji-дің оң жақ панеліндегі көмекші: тапсырмаларыңыз, жобаларыңыз бен құжаттарыңыз бойынша қарапайым сөзбен жауап береді.'],
          ['ЖИ-агент', 'Жауап беріп қана қоймай, әрекет те ететін көмекші-бағдарлама: тапсырмаларды іздейді, құжаттарды оқиды, күндерді санайды.'],
          ['Жоба (черновик)', 'Өзгерістің дайындамасы, мысалы жаңа карточка немесе жаңа мерзім, оны растаудан бұрын тексересіз.'],
          ['Растау', 'Жобаның астындағы батырма. Оны баспайынша ештеңе өзгермейді.'],
          ['Кеңістік', 'Proji-дегі ұйымның жұмыс кеңістігі: ЖИ деректерді көретін шекаралар.'],
          ['Сигнал', 'Назар аударуды қажет ететін дайын көрсеткіш: ұмытылған тапсырмалар, тоқтап қалған келісулер.'],
          ['Модель', 'Жауап жазатын нейрожелі.'],
          ['Провайдер', 'Модельдерге қол жеткізуді беретін компания немесе сервис.'],
          ['Нұсқау инъекциясы', 'ЖИ оқитын мәтінге оған арналған бұйрықты жасыру әрекеті. Proji AI мұндай мәтіндерді бұйрық емес, дерек деп санайды.'],
        ],
      },
      {
        h: 'Тапсырмаларды басқару',
        terms: [
          ['Канбан', 'Бағандар мен карточкалары бар тақта, тапсырмалар солдан оңға қарай жылжиды: «істеу керек»-тен «дайын»-ға дейін.'],
          ['Бэклог', 'Әлі жұмысқа алынбаған тапсырмалар мен идеялар тізімі.'],
          ['Кезең (веха)', 'Жобаның бақылау нүктесі. Бұл жұмыс емес, оқиға, мысалы «шарт қол қойылды».'],
          ['KPI', 'Негізгі көрсеткіш: бағыттың жағдайын бақылайтын тұрақты сан.'],
          ['OKR', 'Тоқсанға арналған мақсаттар мен негізгі нәтижелер.'],
          ['WIP', 'Бір мезгілде «жұмыста» тұрған тапсырмалар саны. Неғұрлым аз болса, жұмыс соғұрлым жылдам.'],
        ],
      },
    ],
    end: 'Түсінікті сөз — түсінікті жұмыс',
  },
  en: {
    title: 'proji — glossary: AI and task management in plain words',
    desc: 'What an AI agent, draft, workspace, signal, model, provider, prompt injection, kanban, backlog, milestone, KPI, OKR and WIP are: short definitions in plain words.',
    hero: { h: 'Hard words', grad: 'in plain language', sub: 'A short glossary of terms you meet in Proji and around AI. One word, one explanation.' },
    groups: [
      {
        h: 'Proji and AI',
        terms: [
          ['Proji AI', 'The assistant in the right-hand panel of Proji: it answers about your tasks, projects and documents in plain words.'],
          ['AI agent', 'A helper program that does not only answer but also acts: finds tasks, reads documents, counts days.'],
          ['Draft', 'A prepared change, such as a new card or a new deadline, that you review before confirming.'],
          ['Confirm', 'The button under a draft. Nothing changes until you press it.'],
          ['Workspace', 'An organization’s space in Proji: the boundaries within which the AI sees data.'],
          ['Signal', 'A ready-made indicator of what needs attention: forgotten tasks, stuck approvals.'],
          ['Model', 'The neural network that writes the answer.'],
          ['Provider', 'A company or service that gives access to models.'],
          ['Prompt injection', 'An attempt to hide a command for the AI in text it will read. Proji AI treats such text as data, not commands.'],
        ],
      },
      {
        h: 'Task management',
        terms: [
          ['Kanban', 'A board with columns and cards where tasks move left to right, from “to do” to “done”.'],
          ['Backlog', 'A list of tasks and ideas that nobody has started yet.'],
          ['Milestone', 'A checkpoint in a project. It is an event, not work, for example “contract signed”.'],
          ['KPI', 'A key indicator: a steady number used to watch the health of an area.'],
          ['OKR', 'Objectives and key results for a quarter.'],
          ['WIP', 'How many tasks are “in progress” at once. The fewer, the faster work flows.'],
        ],
      },
    ],
    end: 'Clear words, clear work',
  },
  ar: {
    title: 'proji — قاموس: الذكاء الاصطناعي وإدارة المهام بكلمات بسيطة',
    desc: 'ما هو وكيل الذكاء الاصطناعي والمسودة والمساحة والإشارة والنموذج والمزوّد وحقن التعليمات وكانبان والمتراكم والمعلم وKPI وOKR وWIP: تعريفات قصيرة بكلمات بسيطة.',
    hero: { h: 'كلمات صعبة', grad: 'بلغة بسيطة', sub: 'قاموس قصير للمفاهيم التي تصادفها في Proji وحول الذكاء الاصطناعي. كلمة واحدة وشرح واحد.' },
    groups: [
      {
        h: 'Proji والذكاء الاصطناعي',
        terms: [
          ['Proji AI', 'المساعد في اللوحة اليمنى من Proji: يجيب عن مهامك ومشاريعك ومستنداتك بكلمات بسيطة.'],
          ['وكيل ذكاء اصطناعي', 'برنامج مساعد لا يجيب فقط بل يتصرف: يبحث عن المهام ويقرأ المستندات ويحسب الأيام.'],
          ['المسودة', 'تغيير مُعدّ مسبقًا، مثل بطاقة جديدة أو موعد جديد، تراجعه قبل التأكيد.'],
          ['تأكيد', 'الزر تحت المسودة. لا يتغير شيء حتى تضغطه.'],
          ['المساحة', 'مساحة عمل المؤسسة في Proji: الحدود التي يرى الذكاء الاصطناعي البيانات داخلها.'],
          ['الإشارة', 'مؤشر جاهز لما يحتاج انتباهًا: مهام منسية وموافقات متعثرة.'],
          ['النموذج', 'الشبكة العصبية التي تكتب الإجابة.'],
          ['المزوّد', 'شركة أو خدمة تتيح الوصول إلى النماذج.'],
          ['حقن التعليمات', 'محاولة إخفاء أمر للذكاء الاصطناعي في نص سيقرؤه. يعامل Proji AI هذه النصوص كبيانات لا كأوامر.'],
        ],
      },
      {
        h: 'إدارة المهام',
        terms: [
          ['كانبان', 'لوحة بأعمدة وبطاقات تتحرك فيها المهام من «للتنفيذ» إلى «منجز».'],
          ['المتراكم (Backlog)', 'قائمة بالمهام والأفكار التي لم يبدأ العمل عليها بعد.'],
          ['المَعلم', 'نقطة تحقق في المشروع. حدث وليس عملًا، مثل «تم توقيع العقد».'],
          ['KPI', 'مؤشر أداء رئيسي: رقم ثابت تُتابع به صحة اتجاه العمل.'],
          ['OKR', 'أهداف ونتائج رئيسية لربع سنة.'],
          ['WIP', 'عدد المهام «قيد التنفيذ» في الوقت نفسه. كلما قلّ، أسرع سير العمل.'],
        ],
      },
    ],
    end: 'كلمات واضحة وعمل واضح',
  },
};

const SLUG = 'glossary';

const Page: React.FC<{ c: C; lang: Lang }> = ({ c, lang }) => (
  <>
    <Hero slug={SLUG} lang={lang} h={c.hero.h} grad={c.hero.grad} sub={c.hero.sub} pic={CoverGlossary} />
    {c.groups.map((g, i) => (
      <Sec key={g.h} id={`g${i + 1}`} h={g.h}>
        <dl className="kt-terms">{g.terms.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
      </Sec>
    ))}
    <End slug={SLUG} lang={lang} h={c.end} />
  </>
);

const ld = (c: C) => ({
  '@type': 'DefinedTermSet',
  name: c.title,
  hasDefinedTerm: c.groups.flatMap(g => g.terms).map(([name, description]) => ({ '@type': 'DefinedTerm', name, description })),
});

export default landing({ slug: SLUG, copy, Page, ld, links: c => c.groups.map((g, i): [string, string] => [`#g${i + 1}`, g.h]) });

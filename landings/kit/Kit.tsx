import React, { useState } from 'react';
import { trackEvent } from '../../analytics';
import { submitDemoRequest } from '../../lib/submitDemoRequest';
import { COPY as BOARD, type Lang } from '../board/copy';
import { AiShell, Cta } from '../ai/Shell';
import '../manager/manager.css';
import './kit.css';

/**
 * Общие детали десяти лендингов разных видов (/vs, /quiz, /calc, /faq, /guide, /start, /safe, /go, /glossary, /tour).
 * Шапка, языки и подвал — AiShell; вид — BRANDBOOK.md; зачем каждая страница — STRATEGY.md.
 * Факты — только из справки Proji (content/help) и согласованных текстов /board.
 */

export type L4<T> = Record<Lang, T>;
export interface Base {
  title: string;
  desc: string;
}

/** кнопка «Попробовать 14 дней бесплатно» — текст из /board, чтобы обещание везде было одно */
export const Try: React.FC<{ slug: string; place: string; lang: Lang; variant?: string }> = ({ slug, place, lang, variant }) => (
  <Cta slug={slug} place={place} label={BOARD[lang].hero.trial} lang={lang} variant={variant} />
);

export const Hero: React.FC<{ slug: string; lang: Lang; h: string; grad?: string; sub: string; pic: React.FC; variant?: string }> = ({ slug, lang, h, grad, sub, pic: Pic, variant }) => (
  <section className="ai-hero is-split mg-hero" aria-labelledby={`${slug}-h`}>
    <div className="ai-aurora" aria-hidden />
    <div>
      <h1 id={`${slug}-h`}>{h}{grad && <> <span className="bd-grad">{grad}</span></>}</h1>
      <p className="ai-lead">{sub}</p>
      <div className="ai-actions"><Try slug={slug} place="hero" lang={lang} variant={variant} /></div>
    </div>
    <figure className="mg-card"><Pic /></figure>
  </section>
);

export const Sec: React.FC<{ id?: string; h: string; lead?: string; children: React.ReactNode }> = ({ id, h, lead, children }) => (
  <section className="kt-sec ai-in" id={id} aria-labelledby={id && `${id}-h`}>
    <h2 id={id && `${id}-h`}>{h}</h2>
    {lead && <p className="ai-lead">{lead}</p>}
    {children}
  </section>
);

/** список «рисунок + заголовок + пояснение» */
export const PicList: React.FC<{ items: [string, string][]; pics: React.FC[] }> = ({ items, pics }) => (
  <ul className="kt-list">
    {items.map(([t, x], i) => {
      const Pic = pics[i % pics.length];
      return <li key={t}><Pic /><div><h3>{t}</h3><p>{x}</p></div></li>;
    })}
  </ul>
);

export const Faq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="kt-faq">
    {items.map(({ q, a }, i) => (
      <details key={q} open={i === 0}>
        <summary>{q}</summary>
        <p>{a}</p>
      </details>
    ))}
  </div>
);

export const End: React.FC<{ slug: string; lang: Lang; h: string; variant?: string }> = ({ slug, lang, h, variant }) => (
  <section className="ai-end is-center ai-in">
    <h2>{h}</h2>
    <div className="ai-actions"><Try slug={slug} place="final" lang={lang} variant={variant} /></div>
  </section>
);

/* мягкая конверсия: кто не готов регистрироваться, оставляет контакт; заявка уходит туда же, куда заявки с главной */
const LEAD: L4<{ h: string; p: string; name: string; contact: string; send: string; ok: string; err: string; note: string }> = {
  ru: { h: 'Хотите разбор для вашей команды?', p: 'Оставьте контакт, и команда Proji напишет вам и покажет, как это будет работать у вас.', name: 'Имя', contact: 'Почта, телефон или Telegram', send: 'Отправить', ok: 'Спасибо! Мы скоро напишем.', err: 'Не получилось отправить. Попробуйте ещё раз.', note: 'Контакт нужен только для ответа на эту заявку.' },
  kk: { h: 'Командаңызға талдау керек пе?', p: 'Байланысыңызды қалдырыңыз, Proji командасы сізге жазып, бұл сізде қалай жұмыс істейтінін көрсетеді.', name: 'Аты', contact: 'Пошта, телефон немесе Telegram', send: 'Жіберу', ok: 'Рақмет! Жақында жазамыз.', err: 'Жіберу мүмкін болмады. Қайталап көріңіз.', note: 'Байланыс тек осы өтінімге жауап беру үшін керек.' },
  en: { h: 'Want a walkthrough for your team?', p: 'Leave a contact and the Proji team will write to you and show how it would work for you.', name: 'Name', contact: 'Email, phone or Telegram', send: 'Send', ok: 'Thank you! We will be in touch soon.', err: 'Could not send. Please try again.', note: 'We use the contact only to reply to this request.' },
  ar: { h: 'هل تريد شرحًا لفريقك؟', p: 'اترك وسيلة تواصل وسيكتب لك فريق Proji ويعرض كيف سيعمل لديك.', name: 'الاسم', contact: 'البريد أو الهاتف أو تيليغرام', send: 'إرسال', ok: 'شكرًا! سنتواصل معك قريبًا.', err: 'تعذّر الإرسال. حاول مرة أخرى.', note: 'نستخدم وسيلة التواصل للرد على هذا الطلب فقط.' },
};

export const LeadForm: React.FC<{ slug: string; lang: Lang; detail: string }> = ({ slug, lang, detail }) => {
  const t = LEAD[lang];
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState('busy');
    try {
      await submitDemoRequest(String(f.get('name') ?? ''), `${f.get('contact') ?? ''} (${detail}, ${lang})`, `Заявка с лендинга /${slug}`);
      setState('ok');
      trackEvent('lead_submit', { landing: slug, lang });
    } catch {
      setState('err');
    }
  };
  return (
    <div className="kt-lead">
      <h3>{t.h}</h3>
      <p className="kt-muted">{t.p}</p>
      {state === 'ok' ? (
        <p className="kt-ok" role="status">✓ {t.ok}</p>
      ) : (
        <form onSubmit={submit}>
          <input name="name" required autoComplete="name" placeholder={t.name} aria-label={t.name} />
          <input name="contact" required autoComplete="email" placeholder={t.contact} aria-label={t.contact} />
          <button type="submit" className="bd-btn is-small" disabled={state === 'busy'}>{t.send}</button>
        </form>
      )}
      {state === 'err' && <p role="alert">{t.err}</p>}
      <small className="kt-muted">{t.note}</small>
    </div>
  );
};

const TRY: L4<string> = { ru: 'Попробовать', kk: 'Байқап көру', en: 'Try it', ar: 'جرّب الآن' };

/** собирает лендинг: заголовок, описание и разметка для поиска на 4 языках */
export function landing<C extends Base>(o: {
  slug: string;
  copy: L4<C>;
  links?: (c: C) => [string, string][];
  ld?: (c: C) => object;
  Page: React.FC<{ c: C; lang: Lang }>;
}) {
  const title = (l: Lang) => o.copy[l].title;
  const desc = (l: Lang) => o.copy[l].desc;
  const cta = (l: Lang) => TRY[l];
  const links = (l: Lang) => (o.links ? o.links(o.copy[l]) : []);
  const ld = o.ld && ((l: Lang) => o.ld!(o.copy[l]));
  const { Page } = o;
  return function Landing() {
    return (
      <AiShell slug={o.slug} title={title} desc={desc} cta={cta} links={links} ld={ld}>
        {l => <div className="ai-col is-wide"><Page c={o.copy[l]} lang={l} /></div>}
      </AiShell>
    );
  };
}

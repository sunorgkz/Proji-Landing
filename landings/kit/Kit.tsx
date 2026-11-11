import React from 'react';
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

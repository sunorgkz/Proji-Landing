import React, { useEffect, useRef } from 'react';

/** Простые визуализации Proji AI (BRANDBOOK.md, раздел 6): одна мысль на график, рост при появлении, данные примерные. */

/* число набирается от нуля, когда стало видно; без JS и при «меньше движения» показано готовым */
export const CountUp: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1000);
        el.textContent = `${Math.round(value * (1 - (1 - p) ** 3))}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);
  return <span ref={ref}>{value}{suffix}</span>;
};

export const Ring: React.FC<{ pct: number; label: string }> = ({ pct, label }) => {
  const r = 40;
  const full = 2 * Math.PI * r;
  return (
    <figure className="ai-ring">
      <div>
        <svg viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={r} className="is-track" />
          <circle cx="50" cy="50" r={r} className="is-run" strokeDasharray={full} style={{ ['--full' as string]: full, strokeDashoffset: full * (1 - pct / 100) }} />
        </svg>
        <b><CountUp value={pct} suffix="%" /></b>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
};

/* сколько задач остаётся по дням при текущей скорости; вертикальная линия — конец срока */
export const BurnDown: React.FC<{ left: number; speed: number; days: number; ok: boolean; deadline: string }> = ({ left, speed, days, ok, deadline }) => {
  const W = 320;
  const H = 130;
  const MAX_DAYS = 8;
  const MAX_LEFT = 24;
  const x = (d: number) => 12 + (d * (W - 24)) / MAX_DAYS;
  const y = (n: number) => H - 14 - (n * (H - 40)) / MAX_LEFT;
  const end = left / speed;
  return (
    <svg className={`ai-burn ${ok ? 'is-ok' : 'is-risk'}`} viewBox={`0 0 ${W} ${H}`} dir="ltr" aria-hidden>
      <path className="is-area" d={`M${x(0)} ${y(left)}L${x(end)} ${y(0)}L${x(0)} ${y(0)}Z`} />
      <line className="is-base" x1={x(0)} x2={x(MAX_DAYS)} y1={y(0)} y2={y(0)} />
      <line className="is-limit" x1={x(days)} x2={x(days)} y1="20" y2={y(0)} />
      <text x={x(days)} y="13" textAnchor="middle">{deadline}</text>
      <path key={left} className="is-line" pathLength={1} d={`M${x(0)} ${y(left)}L${x(end)} ${y(0)}`} />
      <circle className="is-dot" cx={x(end)} cy={y(0)} r="6" />
    </svg>
  );
};

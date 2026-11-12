import React, { useLayoutEffect, useRef } from 'react';

/**
 * ИЛЛЮСТРАЦИИ Proji в рисованном стиле (BRANDBOOK.md, раздел 5): прозрачный фон, спокойная почти ровная линия,
 * синяя заливка чуть мимо контура, 1–3 предмета, без текста. Сначала рисуется линия, потом цвет, потом одно действие,
 * а дальше рисунок тихо живёт, пока виден на экране.
 * Это рисунки, а не снимки настоящего интерфейса.
 */

const BLUE = 'var(--blue)';
const YELLOW = 'var(--yellow)';
const MINT = 'var(--mint)';
const PANEL = 'var(--navy-800)';

/* --o — порядок появления */
export const Line: React.FC<{ d: string; o: number; thick?: boolean }> = ({ d, o, thick }) => (
  <path className={`sk-line${thick ? ' is-thick' : ''}`} d={d} pathLength={1} style={{ ['--o' as string]: o }} />
);
export const Act: React.FC<{ d: string; o: number; yellow?: boolean; loop?: boolean }> = ({ d, o, yellow, loop }) => (
  <path className={`sk-act${yellow ? ' is-yellow' : ''}${loop ? ' sk-tick' : ''}`} d={d} pathLength={1} style={{ ['--o' as string]: o }} />
);
export const Fill: React.FC<{ d: string; o: number; color?: string; dx?: number; dy?: number }> = ({ d, o, color = BLUE, dx = 6, dy = 5 }) => (
  <path className="sk-fill" d={d} fill={color} transform={`translate(${dx} ${dy})`} style={{ ['--o' as string]: o }} />
);

export const Sketch: React.FC<{ w?: number; h?: number; hero?: boolean; children: React.ReactNode }> = ({ w = 200, h = 140, hero, children }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  /* без скрипта и в режиме «меньше движения» рисунок виден сразу готовым */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('is-ready');
    const io = new IntersectionObserver(entries => {
      const visible = entries.some(e => e.isIntersecting);
      if (visible) el.classList.add('is-on');
      /* постоянное движение идёт только у видимых рисунков */
      el.classList.toggle('is-live', visible);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} className={`bd-sk${hero ? ' is-hero' : ''}`} viewBox={`0 0 ${w} ${h}`} aria-hidden focusable="false">
      <g className="sk-art">{children}</g>
    </svg>
  );
};

/* Лёгкая неровность линии: заметна едва-едва, без карандашной шероховатости */
export const SketchDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
    <filter id="sk-hand" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={1} seed={4} result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.4} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

const BUBBLE = 'M30 24C52 20 104 20 122 25C134 30 134 64 122 72C110 77 84 77 66 75C58 83 48 91 40 94C44 86 45 80 44 74C24 70 18 32 30 24Z';
const SHEET = 'M56 14C84 13 122 13 146 15C148 46 148 92 147 126C118 128 84 128 54 126C52 92 53 46 56 14Z';

/* Главная мысль: сообщение превратилось в сделанную задачу */
export const SketchHero: React.FC = () => {
  const bubble = 'M52 18C76 14 128 14 146 19C158 25 158 60 146 68C132 73 108 73 90 71C82 81 70 91 60 96C64 86 66 78 64 70C44 64 40 26 52 18Z';
  const sheet = 'M296 10C318 9 356 9 380 11C382 40 382 82 380 110C356 112 318 112 294 110C293 82 293 40 296 10Z';
  return (
    <Sketch w={420} h={120} hero>
      <g className="sk-bob">
        <Fill d={bubble} o={3} />
        <Line d={bubble} o={0} />
        <Line d="M68 36C84 35 114 35 132 36" o={1} />
        <Line d="M68 50C80 49 98 49 110 50" o={1.5} />
      </g>
      <g className="sk-nudge">
        <Line d="M176 62C200 36 236 36 262 58" o={3} />
        <Line d="M246 58C252 60 258 60 264 60C263 54 262 48 260 42" o={4} />
      </g>
      <g className="sk-bob is-late">
        <Fill d={sheet} o={6} />
        <Line d={sheet} o={4.5} />
        <Line d="M312 30C330 29 350 29 364 30" o={6} />
        <Act d="M312 62C318 68 324 74 330 80C342 64 354 50 366 40" o={7.5} loop />
      </g>
    </Sketch>
  );
};

/* 1. Пишете в телефоне */
export const SketchChat: React.FC = () => {
  const phone = 'M58 24C72 22 96 22 108 25C113 26 115 30 115 36C116 62 116 94 114 116C113 123 109 126 103 126C88 127 72 127 60 125C54 124 51 120 51 114C50 90 50 58 52 34C52 28 54 25 58 24Z';
  const bubble = 'M124 20C140 16 170 16 182 21C192 27 192 52 184 58C176 63 158 64 146 62C140 68 134 74 128 76C130 70 131 65 130 60C118 54 116 27 124 20Z';
  return (
    <Sketch>
      <Fill d={phone} o={3} />
      <Line d={phone} o={0} />
      <Line d="M74 116C80 117 88 117 93 116" o={2.5} />
      <g className="sk-pop">
        <Fill d={bubble} o={5.5} dx={4} dy={4} />
        <Line d={bubble} o={3.5} />
        <Act d="M138 34C148 33 162 33 172 34" o={6} loop />
        <Act d="M138 46C146 45 154 45 160 46" o={7} loop />
      </g>
    </Sketch>
  );
};

/* 2. Читает и понимает: лупа ходит по сообщению */
export const SketchRead: React.FC = () => {
  const lens = 'M124 56C140 55 153 68 152 85C151 101 138 112 122 111C107 110 96 98 97 83C98 68 109 57 124 56Z';
  return (
    <Sketch>
      <Fill d={BUBBLE} o={2.5} />
      <Line d={BUBBLE} o={0} />
      <Line d="M44 42C60 41 88 41 106 42" o={2} />
      <Line d="M44 56C56 55 72 55 84 56" o={2.5} />
      <g className="sk-scan">
        <Fill d={lens} o={3.5} color={PANEL} dx={0} dy={0} />
        <Line d={lens} o={3.5} />
        <Line d="M146 106C154 114 164 122 174 130" o={5} thick />
        <Act d="M112 84C116 88 119 92 122 95C127 86 133 78 139 72" o={6.5} loop />
      </g>
    </Sketch>
  );
};

/* 3. Появилась задача: галочка ставится снова и снова */
export const SketchTask: React.FC = () => (
  <Sketch>
    <g className="sk-bob">
      <Fill d={SHEET} o={2.5} dx={8} dy={6} />
      <Line d={SHEET} o={0} />
      <Line d="M74 40C90 39 112 39 128 40" o={2.5} />
      <Line d="M74 58C90 57 106 57 118 58" o={3} />
      <Act d="M76 92C82 98 88 104 94 110C106 94 118 82 132 72" o={4.5} loop />
    </g>
  </Sketch>
);

/* 4. Следит за сроком: стрелка идёт, будильник иногда звенит */
export const SketchClock: React.FC = () => {
  const face = 'M100 34C128 33 148 54 147 80C146 107 124 126 99 125C73 124 54 104 54 79C55 54 74 35 100 34Z';
  return (
    <Sketch>
      <g className="sk-ring">
        <Fill d={face} o={3} />
        <Line d={face} o={0} />
        <Line d="M58 44C52 30 64 18 78 22C70 28 64 36 58 44Z" o={2.5} />
        <Line d="M142 44C148 30 136 18 122 22C130 28 136 36 142 44Z" o={3} />
        <Line d="M70 118C66 124 62 129 58 134" o={3.5} />
        <Line d="M130 118C134 124 138 129 142 134" o={3.5} />
        <Act d="M100 80C108 84 116 88 124 92" o={5.5} yellow />
        <g className="sk-hand"><Act d="M100 56C100 64 100 72 100 80" o={5} yellow /></g>
      </g>
    </Sketch>
  );
};

/* 5. Утро: солнце дышит, лучи расходятся */
export const SketchSun: React.FC = () => (
  <Sketch>
    <g className="sk-rise">
      <Fill d="M58 102C58 74 78 56 100 56C124 56 143 76 142 102Z" o={1.5} color={YELLOW} dx={0} dy={0} />
    </g>
    <Fill d="M22 112C60 107 140 108 178 112C172 127 34 129 22 112Z" o={2.5} color={MINT} dx={0} dy={3} />
    <Line d="M14 104C46 101 72 106 100 103C128 100 158 106 186 102" o={0} />
    <g className="sk-rays">
      <Act d="M100 44C100 36 100 28 100 20" o={4.5} yellow />
      <Act d="M60 58C54 52 48 46 42 40" o={5} yellow />
      <Act d="M140 58C146 52 152 46 158 40" o={5.5} yellow />
      <Act d="M40 90C34 88 26 87 18 86" o={6} yellow />
      <Act d="M160 90C166 88 174 87 182 86" o={6.5} yellow />
    </g>
  </Sketch>
);

export const SKETCH_STEPS = [SketchChat, SketchRead, SketchTask, SketchClock, SketchSun];

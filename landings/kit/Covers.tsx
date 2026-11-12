import React from 'react';
import { Act, Fill, Line, Sketch } from '../board/Sketches';
import { Person, box, circ } from '../manager/RoleViz';

/**
 * ИЛЛЮСТРАЦИИ для обложек десяти лендингов: человек и 2–4 предмета, одно главное действие, без текста.
 * Правила — BRANDBOOK.md, раздел 5. Это рисунки, а не снимки интерфейса.
 */

const YELLOW = 'var(--yellow)';
const DEEP = 'var(--navy-700)';
const GROUND = 'M14 232C120 229 240 235 346 231';
const BUBBLE = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y + 4}C${x + w * 0.4} ${y} ${x + w * 0.8} ${y} ${x + w} ${y + 4}C${x + w + 4} ${y + h * 0.4} ${x + w + 4} ${y + h * 0.8} ${x + w} ${y + h}C${x + w * 0.6} ${y + h + 3} ${x + w * 0.4} ${y + h + 3} ${x + w * 0.3} ${y + h}C${x + w * 0.22} ${y + h + 10} ${x + w * 0.14} ${y + h + 16} ${x + w * 0.06} ${y + h + 18}C${x + w * 0.1} ${y + h + 10} ${x + w * 0.12} ${y + h + 6} ${x + w * 0.1} ${y + h}C${x - 4} ${y + h * 0.8} ${x - 4} ${y + h * 0.4} ${x} ${y + 4}Z`;
const TICK = (x: number, y: number) => `M${x} ${y}C${x + 3} ${y + 3} ${x + 6} ${y + 6} ${x + 8} ${y + 8}C${x + 13} ${y} ${x + 18} ${y - 6} ${x + 24} ${y - 12}`;

/* /vs: из таблицы с путаницей — к листку, где всё отмечено */
export const CoverVs = () => (
  <Sketch w={360} h={240}>
    <Fill d={box(24, 50, 120, 110)} o={1.4} color={DEEP} dx={4} dy={4} />
    <Line d={box(24, 50, 120, 110)} o={0} />
    <Line d="M24 86L144 86M24 122L144 122M64 50L64 160M104 50L104 160" o={0.8} />
    <Line d="M74 98C80 92 90 92 92 100C93 106 84 108 84 114" o={2} />
    <g className="sk-nudge"><Line d="M160 104C180 92 196 92 210 104M198 96C204 100 208 102 212 104C208 108 204 112 200 116" o={3} /></g>
    <g className="sk-bob">
      <Fill d={box(226, 40, 112, 130)} o={4.4} dx={5} dy={4} />
      <Line d={box(226, 40, 112, 130)} o={3.6} />
      <Line d="M270 72L320 72M270 106L314 106M270 140L318 140" o={4.6} />
      <Act d={TICK(240, 72)} o={5.2} loop />
      <Act d={TICK(240, 106)} o={5.6} loop />
      <Act d={TICK(240, 140)} o={6} loop />
    </g>
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /quiz: человек отвечает на вопросы, галочки ставятся по очереди */
export const CoverQuiz = () => (
  <Sketch w={360} h={240}>
    <Person x={78} by={232} s={1.05} o={0} />
    <Fill d={box(150, 30, 186, 170)} o={1.8} color={DEEP} dx={5} dy={4} />
    <Line d={box(150, 30, 186, 170)} o={1.2} />
    {[62, 104, 146].map((y, i) => (
      <g key={y}>
        <Line d={box(170, y - 12, 24, 24)} o={2 + i * 0.3} />
        <Line d={`M210 ${y}L${310 - i * 18} ${y}`} o={2.4 + i * 0.3} />
        <Act d={TICK(172, y)} o={3.4 + i * 0.6} loop />
      </g>
    ))}
    <Line d="M200 184C230 180 280 180 312 184" o={3} />
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /calc: часы и стопка монет — время, которое уходит на статусы */
export const CoverCalc = () => (
  <Sketch w={360} h={240}>
    <Person x={70} by={232} s={0.95} o={0} tie />
    <Fill d={circ(210, 110, 70)} o={1.6} color={DEEP} dx={5} dy={4} />
    <Line d={circ(210, 110, 70)} o={1} />
    <Line d="M210 48L210 56M210 164L210 172M148 110L156 110M264 110L272 110" o={1.8} />
    <Line d="M210 110L210 76" o={2.2} />
    <g className="rv-gear" style={{ transformBox: 'view-box', transformOrigin: '210px 110px' }}><Act d="M210 110L250 110" o={3} /></g>
    {[0, 1, 2].map(i => (
      <g key={i} className="sk-bob" style={{ animationDelay: `${-i * 0.6}s` }}>
        <Fill d={`M${296} ${214 - i * 14}a22 7 0 1 0 44 0a22 7 0 1 0 -44 0Z`} o={4 + i * 0.3} color={YELLOW} dx={0} dy={0} />
      </g>
    ))}
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /faq: вопрос и ответ с галочкой */
export const CoverFaq = () => (
  <Sketch w={360} h={240}>
    <Person x={300} by={232} s={1} o={0} />
    <g className="sk-bob">
      <Fill d={BUBBLE(30, 24, 140, 70)} o={1.6} dx={4} dy={4} />
      <Line d={BUBBLE(30, 24, 140, 70)} o={1} />
      <Act d="M86 46C88 36 108 36 108 48C108 58 96 58 96 68M96 80L96 82" o={2.4} yellow />
    </g>
    <g className="sk-bob is-late">
      <Fill d={BUBBLE(110, 118, 140, 62)} o={3.6} color={DEEP} dx={4} dy={4} />
      <Line d={BUBBLE(110, 118, 140, 62)} o={3} />
      <Line d="M160 140L230 140M160 158L214 158" o={3.8} />
      <Act d={TICK(126, 150)} o={4.6} loop />
    </g>
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /guide: открытая книга и закладка; из книги выходит порядок */
export const CoverGuide = () => (
  <Sketch w={360} h={240}>
    <Person x={66} by={232} s={0.95} o={0} />
    <Fill d="M126 70C160 58 190 62 222 78C254 62 286 58 322 70L322 196C286 184 254 188 222 204C190 188 160 184 126 196Z" o={1.8} color={DEEP} dx={5} dy={4} />
    <Line d="M126 70C160 58 190 62 222 78C254 62 286 58 322 70L322 196C286 184 254 188 222 204C190 188 160 184 126 196Z" o={1} />
    <Line d="M222 78L222 204" o={1.6} />
    <Line d="M144 96C164 90 186 92 206 100M144 122C164 116 186 118 206 126M144 148C164 142 180 144 196 150" o={2.2} />
    <Line d="M240 100C258 92 280 90 302 96M240 126C258 118 280 116 302 122" o={2.6} />
    <Act d={TICK(250, 158)} o={3.6} loop />
    <Fill d="M286 56L300 56L300 90L293 82L286 90Z" o={3} color={YELLOW} dx={0} dy={0} />
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /start: человек нажимает кнопку, справа открывается панель, рядом секундомер */
export const CoverStart = () => (
  <Sketch w={360} h={240}>
    <Person x={62} by={232} s={0.95} o={0} />
    <Fill d={box(118, 36, 200, 140)} o={1.6} color={DEEP} dx={5} dy={4} />
    <Line d={box(118, 36, 200, 140)} o={1} />
    <Line d="M240 38L240 176" o={1.6} />
    <g className="sk-bob">
      <Line d={box(252, 54, 54, 22)} o={2.4} />
      <Fill d={box(252, 90, 54, 30)} o={3} dx={2} dy={2} />
      <Line d={box(252, 90, 54, 30)} o={2.8} />
    </g>
    <Line d="M136 70L220 70M136 98L206 98M136 126L214 126" o={2} />
    <g className="sk-nudge"><Act d="M190 196C200 186 214 180 230 178M222 172L232 178L224 186" o={3.6} yellow /></g>
    <Line d={circ(300, 206, 16)} o={4} />
    <Act d="M300 206L300 196M296 186L304 186" o={4.4} />
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /safe: щит с замком закрывает папки; глаз видит только своё */
export const CoverSafe = () => {
  const shield = 'M200 26C224 40 250 44 278 44C280 104 266 158 200 200C134 158 120 104 122 44C150 44 176 40 200 26Z';
  return (
    <Sketch w={360} h={240}>
      <Person x={60} by={232} s={0.95} o={0} />
      <Fill d={shield} o={1.6} dx={5} dy={4} />
      <Line d={shield} o={1} />
      <Line d={box(178, 100, 44, 36)} o={2.2} />
      <Line d="M186 100C186 80 214 80 214 100" o={2.6} />
      <Act d="M200 112L200 124" o={3.2} yellow />
      <g className="sk-bob is-late">
        <Fill d={box(290, 150, 50, 40)} o={3.6} color={DEEP} dx={3} dy={3} />
        <Line d={box(290, 150, 50, 40)} o={3.4} />
        <Line d="M290 160L340 160" o={3.8} />
      </g>
      <Line d={GROUND} o={0.5} />
    </Sketch>
  );
};

/* /go: сообщение в телефоне превращается в задачу с галочкой */
export const CoverGo = () => (
  <Sketch w={360} h={240}>
    <Person x={60} by={232} s={1} o={0} tie />
    <Fill d={box(98, 110, 34, 56)} o={1.6} dx={3} dy={3} />
    <Line d={box(98, 110, 34, 56)} o={1.2} />
    <g className="sk-bob">
      <Fill d={BUBBLE(150, 30, 90, 44)} o={2.4} dx={3} dy={3} />
      <Line d={BUBBLE(150, 30, 90, 44)} o={2} />
      <Line d="M168 48L222 48" o={2.6} />
    </g>
    <g className="sk-nudge"><Line d="M206 100C220 112 234 120 250 124M240 116L252 124L242 132" o={3.2} /></g>
    <g className="sk-bob is-late">
      <Fill d={box(262, 100, 80, 96)} o={4.2} color={DEEP} dx={4} dy={4} />
      <Line d={box(262, 100, 80, 96)} o={3.8} />
      <Line d="M276 124L328 124" o={4.4} />
      <Act d={TICK(284, 160)} o={5} loop />
    </g>
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /glossary: стопка книг и лампочка — сложное слово стало понятным */
export const CoverGlossary = () => (
  <Sketch w={360} h={240}>
    <Person x={300} by={232} s={0.95} o={0} />
    {[0, 1, 2].map(i => (
      <g key={i}>
        <Fill d={box(60 + i * 6, 196 - i * 34, 150 - i * 12, 30)} o={1 + i * 0.4} color={i === 1 ? DEEP : undefined} dx={3} dy={3} />
        <Line d={box(60 + i * 6, 196 - i * 34, 150 - i * 12, 30)} o={0.8 + i * 0.4} />
      </g>
    ))}
    <g className="sk-bob">
      <Fill d={circ(150, 62, 30)} o={3} color={YELLOW} dx={0} dy={0} />
      <Line d="M138 92L162 92M142 102L158 102" o={2.8} />
      <Act d="M150 14L150 22M106 62L114 62M186 62L194 62M118 30L124 36M182 30L176 36" o={3.6} yellow />
    </g>
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

/* /tour: экран, рука нажимает, в ответ появляется сообщение */
export const CoverTour = () => (
  <Sketch w={360} h={240}>
    <Fill d={box(40, 26, 280, 160)} o={1.2} color={DEEP} dx={5} dy={4} />
    <Line d={box(40, 26, 280, 160)} o={0.6} />
    <Line d="M150 186L150 206M210 186L210 206M120 208C160 206 200 206 240 208" o={1.6} />
    <g className="sk-bob">
      <Fill d={BUBBLE(64, 46, 120, 40)} o={2.4} dx={3} dy={3} />
      <Line d={BUBBLE(64, 46, 120, 40)} o={2} />
    </g>
    <g className="sk-bob is-late">
      <Line d={BUBBLE(170, 104, 124, 46)} o={3} />
      <Line d="M190 122L270 122M190 136L246 136" o={3.4} />
    </g>
    <g className="sk-nudge"><Act d="M96 150C100 136 110 130 118 134C120 124 132 122 136 132C140 126 150 128 150 138L150 166C140 176 112 176 104 166Z" o={4} yellow /></g>
    <Line d={GROUND} o={0.5} />
  </Sketch>
);

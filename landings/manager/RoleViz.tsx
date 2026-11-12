import React from 'react';
import { Act, Fill, Line, Sketch } from '../board/Sketches';
import type { RoleId } from './roles';

/**
 * ИЛЛЮСТРАЦИИ для обложек цифровых менеджеров: детальная рисованная сценка на каждое направление,
 * человек и предметы его работы, без текста. Правила — BRANDBOOK.md, раздел 5. Это рисунки, а не снимки интерфейса.
 */

const YELLOW = 'var(--yellow)';
const MINT = 'var(--mint)';
const DEEP = 'var(--navy-700)';
export const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 2} 0Z`;
export const box = (x: number, y: number, w: number, h: number) => `M${x} ${y + 2}C${x + w * 0.3} ${y} ${x + w * 0.7} ${y} ${x + w} ${y + 2}C${x + w + 2} ${y + h * 0.4} ${x + w + 2} ${y + h * 0.7} ${x + w} ${y + h}C${x + w * 0.7} ${y + h + 2} ${x + w * 0.3} ${y + h + 2} ${x} ${y + h}C${x - 2} ${y + h * 0.7} ${x - 2} ${y + h * 0.4} ${x} ${y + 2}Z`;

/* человечек: голова, плечи, глаза, улыбка; по желанию галстук или каска */
export const Person: React.FC<{ x: number; by: number; s?: number; o: number; tie?: boolean; helmet?: boolean }> = ({ x, by, s = 1, o, tie, helmet }) => {
  const top = by - 36 * s;
  const hy = top - 18 * s;
  const body = `M${x - 30 * s} ${by}C${x - 29 * s} ${by - 24 * s} ${x - 16 * s} ${top} ${x} ${top}C${x + 16 * s} ${top} ${x + 29 * s} ${by - 24 * s} ${x + 30 * s} ${by}Z`;
  return (
    <g>
      <Fill d={body} o={o + 1.5} dx={3} dy={2} />
      <Line d={circ(x, hy, 16 * s)} o={o} />
      <Line d={body} o={o + 0.6} />
      <Line d={`M${x - 6 * s} ${hy - 2}L${x - 6 * s} ${hy + 1}M${x + 6 * s} ${hy - 2}L${x + 6 * s} ${hy + 1}`} o={o + 1} />
      <Line d={`M${x - 6 * s} ${hy + 7 * s}C${x - 2 * s} ${hy + 11 * s} ${x + 2 * s} ${hy + 11 * s} ${x + 6 * s} ${hy + 7 * s}`} o={o + 1.2} />
      {tie && <Act d={`M${x} ${top + 2}C${x - 4 * s} ${top + 10 * s} ${x - 4 * s} ${top + 18 * s} ${x} ${top + 30 * s}C${x + 4 * s} ${top + 18 * s} ${x + 4 * s} ${top + 10 * s} ${x} ${top + 2}Z`} o={o + 2} yellow />}
      {helmet && <Fill d={`M${x - 19 * s} ${hy - 3}C${x - 19 * s} ${hy - 24 * s} ${x + 19 * s} ${hy - 24 * s} ${x + 19 * s} ${hy - 3}Z`} o={o + 1.8} color={YELLOW} dx={0} dy={0} />}
    </g>
  );
};

const GROUND = 'M14 228C120 225 240 231 346 227';

/* Операционный директор раздаёт работу людям и цифровому сотруднику; сверху звенит сигнал */
const Coo = () => {
  const LEFT = 'M150 122C124 134 96 138 74 148';
  const MID = 'M180 130C180 138 180 144 180 150';
  const RIGHT = 'M210 122C236 134 264 138 286 148';
  const robot = 'M154 168C170 166 190 166 206 168C208 182 208 198 206 208C190 210 170 210 154 208C152 198 152 182 154 168Z';
  return (
    <>
      <g className="sk-bob"><Person x={180} by={130} o={0} tie /></g>
      <Line d={LEFT} o={4} />
      <Line d={MID} o={4.2} />
      <Line d={RIGHT} o={4.4} />
      <Person x={70} by={232} s={0.85} o={4.8} />
      <Fill d={robot} o={6.2} dx={3} dy={3} />
      <Line d={robot} o={5} />
      <Line d="M170 186L170 192M190 186L190 192" o={6} />
      <Line d="M180 166C180 160 180 156 180 152" o={5.6} />
      <Person x={290} by={232} s={0.85} o={5.4} />
      <circle className="mv-msg" r="6" style={{ offsetPath: `path('${LEFT}')` }} />
      <circle className="mv-msg is-b" r="6" style={{ offsetPath: `path('${MID}')` }} />
      <circle className="mv-msg is-c" r="6" style={{ offsetPath: `path('${RIGHT}')` }} />
      <Act d="M98 170C102 174 106 178 108 180C114 172 120 166 126 160" o={7} loop />
      <Act d="M222 180C226 184 230 188 232 190C238 182 244 176 250 170" o={7.4} loop />
      <g className="sk-jolt">
        <Fill d="M298 22C314 22 322 36 322 50L326 64L270 64L274 50C274 36 282 22 298 22Z" o={3} color={YELLOW} dx={0} dy={0} />
        <Line d="M290 70C292 76 304 76 306 70" o={3.4} />
      </g>
      <Act d="M334 30C340 38 340 50 334 58" o={4} yellow loop />
      <Fill d={box(30, 30, 46, 58)} o={3} dx={4} dy={4} />
      <Line d={box(30, 30, 46, 58)} o={2.6} />
      <Line d="M40 48L66 48M40 60L62 60M40 72L58 72" o={3.2} />
    </>
  );
};

/* Проектный менеджер показывает план на доске, линия «сегодня» идёт по плану */
const Pm = () => (
  <>
    <Fill d={box(146, 24, 196, 150)} o={1.5} color={DEEP} dx={5} dy={4} />
    <Line d={box(146, 24, 196, 150)} o={0} />
    <Line d="M188 176L174 228M300 176L314 228" o={1} />
    {[[166, 44, 72, MINT], [196, 70, 94, 'var(--blue)'], [232, 96, 62, YELLOW], [206, 122, 104, MINT], [250, 148, 70, 'var(--blue)']].map(([x, y, w, c], i) => (
      <rect key={i} className="mv-grow" x={x as number} y={y as number} width={w as number} height={14} rx={7} fill={c as string} style={{ ['--i' as string]: i }} />
    ))}
    <rect className="mv-today" x="262" y="34" width="3" height="134" rx="1.5" fill="var(--ink)" />
    <Act d="M246 50C249 53 251 56 253 58C257 52 261 48 265 44" o={5} loop />
    <Act d="M300 128C303 131 305 134 307 136C311 130 315 126 319 122" o={5.6} loop />
    <Person x={78} by={228} s={1.15} o={2} tie />
    <Line d="M104 152C120 140 134 128 150 116" o={4} />
    <Line d={GROUND} o={0.5} />
  </>
);

/* Маркетолог говорит в мегафон, в телефоне выходит публикация и сердечко */
const Marketing = () => (
  <>
    <Person x={62} by={228} s={1.05} o={0} />
    <Fill d="M96 134L146 106L148 168Z" o={2} color={YELLOW} dx={0} dy={0} />
    <Line d="M96 134L146 106L148 168Z" o={1.6} />
    <Line d="M88 150C92 144 96 140 100 138" o={2.2} />
    {['M162 118C172 128 172 146 162 156', 'M178 104C194 122 194 152 178 170', 'M194 90C218 116 218 158 194 184'].map((d, i) => (
      <g key={i} className="rv-wave" style={{ ['--i' as string]: i }}><Act d={d} o={3 + i * 0.4} /></g>
    ))}
    <Fill d={box(240, 46, 76, 160)} o={4.5} dx={4} dy={4} />
    <Line d={box(240, 46, 76, 160)} o={4} />
    <Fill d={box(252, 64, 52, 42)} o={5} color={MINT} dx={0} dy={0} />
    <Line d="M254 122L298 122M254 136L288 136" o={5.2} />
    <g className="sk-pop"><Fill d="M266 164c0-9 11-11 12-2c1-9 12-7 12 2c0 9-12 15-12 15s-12-6-12-15Z" o={6} color={YELLOW} dx={0} dy={0} /></g>
    <Line d="M268 196L288 196" o={5.4} />
    <Line d={GROUND} o={0.5} />
  </>
);

/* Финансист со счётом: монеты складываются в стопку, линия денег растёт */
const Finance = () => (
  <>
    <Person x={62} by={228} s={1.05} o={0} tie />
    <Fill d={box(92, 112, 46, 60)} o={2} dx={3} dy={3} />
    <Line d={box(92, 112, 46, 60)} o={1.6} />
    <Line d="M100 128L128 128M100 140L124 140M100 152L120 152" o={2.4} />
    <Act d={circ(124, 160, 9)} o={3} yellow loop />
    {[214, 200, 186, 172].map((y, i) => (
      <g key={y} className={i === 3 ? 'rv-coin' : ''}>
        <Fill d={`M150 ${y}a32 10 0 1 0 64 0a32 10 0 1 0 -64 0Z`} o={2.5 + i * 0.3} color={YELLOW} dx={0} dy={0} />
        <Line d={`M150 ${y}a32 10 0 1 0 64 0a32 10 0 1 0 -64 0Z`} o={2.4 + i * 0.3} />
      </g>
    ))}
    <Line d="M236 40L236 200L344 200" o={3} />
    <Act d="M244 186C262 168 274 176 290 150C304 128 318 118 336 84" o={4} loop />
    <Line d="M326 84L338 82L338 96" o={4.6} />
    <Line d={GROUND} o={0.5} />
  </>
);

/* Грузовик едет к метке, колёса крутятся, дорога бежит */
const Logistics = () => (
  <>
    <path d="M14 214C120 210 240 218 346 212" className="mv-route" />
    <g className="rv-drive">
      <Fill d={box(70, 118, 120, 70)} o={1.5} dx={4} dy={3} />
      <Line d={box(70, 118, 120, 70)} o={0} />
      <Line d="M92 140L110 140L110 158L92 158ZM122 140L140 140L140 158L122 158Z" o={1.4} />
      <Fill d="M190 140L226 140L244 164L244 188L190 188Z" o={2} color={MINT} dx={0} dy={0} />
      <Line d="M190 140L226 140L244 164L244 188L190 188Z" o={1} />
      <Line d="M204 148L222 148L234 164L204 164Z" o={1.8} />
      <g className="rv-spin"><Line d={`${circ(104, 194, 15)}M104 182L104 206`} o={2.2} /></g>
      <g className="rv-spin"><Line d={`${circ(216, 194, 15)}M216 182L216 206`} o={2.4} /></g>
    </g>
    <Act d="M30 140L56 140M20 160L52 160M34 180L58 180" o={3} loop />
    <g className="sk-bob">
      <Fill d="M314 70C330 70 340 82 340 96C340 114 324 126 314 140C304 126 288 114 288 96C288 82 298 70 314 70Z" o={3.4} color={YELLOW} dx={0} dy={0} />
      <Line d="M314 70C330 70 340 82 340 96C340 114 324 126 314 140C304 126 288 114 288 96C288 82 298 70 314 70Z" o={3} />
      <Line d={circ(314, 96, 8)} o={3.6} />
    </g>
  </>
);

/* Строитель в каске, дом растёт по этажам, кран несёт балку */
const Construction = () => (
  <>
    <Line d="M170 228L170 92L292 92L292 228M170 136L292 136M170 182L292 182" o={0} />
    {[[184, 104], [234, 104], [184, 148], [234, 148], [184, 194], [234, 194]].map(([x, y], i) => (
      <rect key={i} className="mv-pop" x={x} y={y} width={36} height={22} rx={6} fill={i % 3 === 1 ? YELLOW : MINT} style={{ ['--i' as string]: i * 0.4 }} />
    ))}
    <Line d="M326 228L326 22M180 28L346 28M326 22L300 28" o={1.5} />
    <g className="rv-swing">
      <Line d="M226 28L226 62" o={2.5} />
      <Fill d="M196 62L256 62L256 74L196 74Z" o={3} color={YELLOW} dx={0} dy={0} />
    </g>
    <Person x={84} by={228} s={1.1} o={2} helmet />
    <Fill d={box(106, 150, 40, 30)} o={4.5} dx={2} dy={2} />
    <Line d={box(106, 150, 40, 30)} o={4} />
    <Act d="M114 164C117 167 120 170 122 172C127 166 132 160 138 156" o={5} loop />
    <Line d={GROUND} o={0.5} />
  </>
);

/* Продавец и клиент жмут руки, над ними договор с галочкой */
const Sales = () => (
  <>
    <Person x={84} by={228} s={1.1} o={0} tie />
    <Person x={276} by={228} s={1.1} o={0.6} />
    <Line d="M114 164C136 154 154 152 172 154M246 164C224 154 206 152 188 154" o={2.4} />
    <g className="sk-pop"><Fill d={circ(180, 154, 13)} o={3} color={MINT} dx={0} dy={0} /></g>
    <g className="sk-bob">
      <Fill d={box(146, 20, 68, 76)} o={3.4} dx={4} dy={4} />
      <Line d={box(146, 20, 68, 76)} o={3} />
      <Line d="M156 38L204 38M156 52L196 52" o={3.6} />
      <Act d="M160 72C164 76 168 80 170 82C178 72 186 64 196 56" o={4.4} loop />
    </g>
    {[[118, 64], [244, 54], [232, 108]].map(([x, y], i) => (
      <g key={i} className="rv-twinkle" style={{ ['--i' as string]: i }}><Act d={`M${x - 8} ${y}L${x + 8} ${y}M${x} ${y - 8}L${x} ${y + 8}`} o={5 + i * 0.3} yellow /></g>
    ))}
    <Line d={GROUND} o={0.5} />
  </>
);

/* Собеседование: за столом руководитель и кандидат, на столе резюме с галочкой */
const Hr = () => (
  <>
    <Person x={84} by={176} s={1} o={0} tie />
    <Person x={276} by={176} s={1} o={0.6} />
    <Line d="M40 178C140 175 220 181 320 177M70 178L64 228M290 178L296 228" o={1.5} />
    <Fill d={box(150, 118, 60, 56)} o={2.6} dx={3} dy={3} />
    <Line d={box(150, 118, 60, 56)} o={2.2} />
    <Line d={circ(166, 134, 7)} o={2.8} />
    <Line d="M180 130L202 130M180 142L198 142M158 156L202 156" o={3} />
    <Act d="M188 160C191 163 194 166 196 168C201 162 206 156 212 150" o={4} loop />
    <g className="sk-pop">
      <Fill d="M292 40C312 36 338 38 342 46C346 60 340 74 330 76C322 78 312 78 304 76L294 86L296 74C286 70 282 48 292 40Z" o={4.4} color={MINT} dx={0} dy={0} />
      <Line d="M302 54L326 54M302 64L318 64" o={4.8} />
    </g>
    <Line d={GROUND} o={0.5} />
  </>
);

/* Договор: подпись выводится, печать опускается и оставляет оттиск */
const Legal = () => (
  <>
    <Fill d={box(96, 18, 168, 204)} o={1.5} color={DEEP} dx={5} dy={4} />
    <Line d={box(96, 18, 168, 204)} o={0} />
    <Line d="M116 44L236 44M116 66L244 66M116 88L226 88M116 110L238 110M116 132L208 132" o={1} />
    <Act d="M120 186C130 168 138 196 148 178C156 164 162 196 174 180C182 170 190 186 200 178" o={3} loop />
    <Line d="M116 200L210 200" o={2.6} />
    <Act d={circ(232, 168, 20)} o={4.6} yellow loop />
    <g className="rv-stamp">
      <Fill d="M282 116L336 116L336 132L282 132Z" o={3.4} color={YELLOW} dx={0} dy={0} />
      <Line d="M309 116L309 82M309 82m-12 0a12 10 0 1 0 24 0a12 10 0 1 0 -24 0" o={3} />
    </g>
    <Line d="M40 196L84 156L88 160L44 200Z" o={4} />
  </>
);

/* Завод: дым поднимается, конвейер везёт коробки, шестерня крутится */
const Production = () => (
  <>
    <Fill d="M24 228L24 124L72 100L72 124L120 100L120 124L168 100L168 228Z" o={1.5} dx={4} dy={3} />
    <Line d="M24 228L24 124L72 100L72 124L120 100L120 124L168 100L168 228Z" o={0} />
    <Line d="M138 104L138 44L158 44L158 104" o={1} />
    {[0, 1, 2].map(i => <circle key={i} className="rv-smoke" cx={148} cy={36} r={10} fill="var(--ink)" style={{ ['--i' as string]: i }} />)}
    <Line d="M48 160L72 160L72 184L48 184ZM96 160L120 160L120 184L96 184Z" o={2} />
    <Line d="M184 192L344 192M184 214L344 214" o={2.4} />
    {[200, 236, 272, 308, 340].map(x => <g key={x} className="rv-spin"><Line d={`${circ(x, 203, 8)}M${x - 6} 203L${x + 6} 203`} o={2.8} /></g>)}
    <g className="rv-belt">
      <rect x="200" y="160" width="30" height="30" rx="6" fill={YELLOW} />
      <rect x="262" y="164" width="26" height="26" rx="6" fill={MINT} />
    </g>
    <circle className="rv-gear" cx="282" cy="84" r="34" />
    <Line d={circ(282, 84, 14)} o={3} />
  </>
);

const SCENES: Record<RoleId, React.FC> = {
  coo: Coo, pm: Pm, marketing: Marketing, finance: Finance, logistics: Logistics,
  construction: Construction, sales: Sales, hr: Hr, legal: Legal, production: Production,
};

export const RoleViz: React.FC<{ role: RoleId }> = ({ role }) => {
  const Scene = SCENES[role];
  return <Sketch w={360} h={240}><Scene /></Sketch>;
};

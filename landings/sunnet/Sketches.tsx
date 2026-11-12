import React from 'react';
import { Act, Fill, Line, Sketch } from '../board/Sketches';

/**
 * ИЛЛЮСТРАЦИЯ для /sunnet-business в стиле BRANDBOOK.md, раздел 5. Рисунок, а не снимок.
 * Мысль: компания годами поднимается по ступеням, наверху человек ставит флажок, за спиной встаёт солнце «Sun».
 */
const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 2} 0Z`;

export const SketchGrowth: React.FC = () => {
  const steps = 'M112 158C112 146 112 134 112 122C132 120 152 120 172 122C172 112 172 100 172 90C192 88 212 88 232 90C232 80 232 68 232 58C254 56 276 56 296 58C297 92 297 126 296 158Z';
  return (
    <Sketch w={420} h={180} hero>
      <g className="sk-rise">
        <Fill d={circ(92, 70, 30)} o={0.5} color="var(--yellow)" dx={0} dy={0} />
      </g>
      <Act d="M92 26C92 22 92 18 92 14" o={5} yellow />
      <Act d="M52 40C49 37 46 34 43 31" o={5.3} yellow />
      <Act d="M132 40C135 37 138 34 141 31" o={5.6} yellow />
      <Line d="M18 160C140 156 280 163 402 158" o={0} />
      <Fill d={steps} o={2} />
      <Line d={steps} o={1} />
      <g className="sk-bob">
        <Line d={circ(256, 30, 8)} o={3} />
        <Line d="M256 38C256 44 256 50 256 56M246 46C250 46 262 46 268 44" o={3.4} />
        <Line d="M280 56C280 44 280 30 280 16" o={3.8} />
        <Act d="M280 17C290 20 298 24 304 28C296 31 288 33 280 35" o={4.4} />
      </g>
      <Act d="M330 120C344 104 358 88 372 72M356 72C362 72 368 72 373 72C373 78 373 84 372 89" o={6} loop />
    </Sketch>
  );
};

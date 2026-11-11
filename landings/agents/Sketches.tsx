import React from 'react';
import { Act, Fill, Line, Sketch } from '../board/Sketches';

/** ИЛЛЮСТРАЦИИ для /agents в рисованном стиле (BRANDBOOK.md, раздел 5). Рисунки, а не снимки интерфейса. */

/* Человек и агент сделали одну задачу */
export const SketchTeam: React.FC = () => {
  const head = 'M70 18C84 16 94 26 93 38C92 50 82 58 70 57C58 56 49 46 50 36C51 26 58 19 70 18Z';
  const body = 'M40 112C42 86 54 68 71 67C88 67 101 86 103 112Z';
  const sheet = 'M180 22C200 20 232 20 248 22C251 48 251 84 248 106C228 109 200 109 178 106C176 84 176 48 180 22Z';
  const robot = 'M318 44C338 41 372 41 390 44C394 60 394 84 391 100C372 104 338 104 318 100C314 84 314 60 318 44Z';
  return (
    <Sketch w={420} h={120} hero>
      <Fill d={body} o={2} />
      <Fill d={sheet} o={4.5} />
      <Fill d={robot} o={6.5} />
      <Line d={head} o={0} />
      <Line d={body} o={1} />
      <Line d={sheet} o={3} />
      <Line d="M194 38C208 37 224 37 236 38" o={4.5} />
      <Line d={robot} o={5} />
      <Line d="M354 42C354 34 354 26 355 18" o={6} />
      <Line d="M355 8C360 8 364 12 363 17C362 22 358 24 354 23C350 22 347 18 348 14C349 10 352 8 355 8Z" o={6.3} />
      <Line d="M338 66C338 68 338 72 338 74" o={6.6} />
      <Line d="M370 66C370 68 370 72 370 74" o={6.8} />
      <Line d="M342 86C350 90 360 90 368 86" o={7} />
      <Act d="M192 66C198 72 204 78 208 84C218 70 228 58 238 48" o={8} />
    </Sketch>
  );
};

/* Инструкция: лист и ручка */
export const SketchNote: React.FC = () => {
  const sheet = 'M40 18C68 15 104 16 126 19C130 50 130 94 127 124C100 127 66 127 38 124C35 94 36 50 40 18Z';
  const pen = 'M170 34C176 38 182 44 186 50C168 72 146 94 124 112C116 114 110 116 104 118C106 112 108 106 110 98C130 78 150 56 170 34Z';
  return (
    <Sketch>
      <Fill d={sheet} o={2} />
      <Fill d={pen} o={4} dx={3} dy={3} />
      <Line d={sheet} o={0} />
      <Line d="M56 42C74 41 96 41 112 42" o={1.5} />
      <Line d="M56 60C70 59 86 59 98 60" o={2} />
      <Line d={pen} o={3} />
      <Act d="M56 92C62 84 68 98 74 90C80 84 86 96 92 90" o={5} />
    </Sketch>
  );
};

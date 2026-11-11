import React from 'react';
import { Act, Fill, Line, Sketch } from '../board/Sketches';

/**
 * ИЛЛЮСТРАЦИИ Proji AI в стиле BRANDBOOK.md, раздел 5: один предмет, одна мысль, у каждого своё тихое действие.
 * Подходят и для других лендингов. Это рисунки, а не снимки интерфейса.
 */

const YELLOW = 'var(--yellow)';
const MINT = 'var(--mint)';
const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 2} 0Z`;

/* Видит только своё: зрачок оглядывается */
export const SketchEye: React.FC = () => {
  const eye = 'M26 70C58 26 142 26 174 70C142 114 58 114 26 70Z';
  return (
    <Sketch>
      <Fill d={eye} o={2} />
      <Line d={eye} o={0} />
      <g className="sk-look">
        <Line d={circ(100, 70, 24)} o={2.5} />
        <Act d={circ(100, 70, 7)} o={4} />
      </g>
    </Sketch>
  );
};

/* Закрытое: замок иногда вздрагивает */
export const SketchLock: React.FC = () => {
  const body = 'M58 62C84 60 116 60 142 62C144 82 144 108 142 126C116 128 84 128 58 126C56 108 56 82 58 62Z';
  return (
    <Sketch>
      <g className="sk-jolt">
        <Fill d={body} o={2} />
        <Line d={body} o={0} />
        <Line d="M76 60C74 16 126 16 124 60" o={1.5} />
        <Act d="M100 84C100 90 100 98 100 106" o={3.5} yellow />
      </g>
    </Sketch>
  );
};

/* Не удаляет: корзина перечёркнута заново и заново */
export const SketchNoTrash: React.FC = () => {
  const can = 'M66 50C88 48 112 48 134 50L128 128C110 130 90 130 72 128Z';
  return (
    <Sketch>
      <Fill d={can} o={2} />
      <Line d={can} o={0} />
      <Line d="M54 46C84 42 116 42 146 46" o={1.5} />
      <Line d="M86 44C88 32 112 32 114 44" o={2} />
      <Act d="M42 20C80 56 120 94 158 130" o={3.5} yellow loop />
    </Sketch>
  );
};

/* Защита: галочка на щите */
export const SketchShield: React.FC = () => {
  const shield = 'M100 12C120 24 140 28 160 28C162 76 144 112 100 132C56 112 38 76 40 28C60 28 80 24 100 12Z';
  return (
    <Sketch>
      <g className="sk-bob">
        <Fill d={shield} o={2} />
        <Line d={shield} o={0} />
        <Act d="M74 72C82 80 90 88 96 94C108 78 120 62 132 50" o={3.5} loop />
      </g>
    </Sketch>
  );
};

/* Уточняет: вопрос в сообщении */
export const SketchQuestion: React.FC = () => {
  const bubble = 'M30 18C60 12 140 12 168 20C182 28 182 84 168 92C146 98 112 98 88 96C78 106 66 118 54 122C58 112 60 104 58 96C26 92 18 28 30 18Z';
  return (
    <Sketch>
      <g className="sk-pop">
        <Fill d={bubble} o={2} />
        <Line d={bubble} o={0} />
        <Act d="M84 44C88 28 118 28 118 48C118 60 100 60 100 74" o={3.5} yellow loop />
        <Act d="M100 84C100 85 100 86 100 87" o={5} yellow />
      </g>
    </Sketch>
  );
};

/* Мгновенно: молния вспыхивает */
export const SketchBolt: React.FC = () => (
  <Sketch>
    <g className="sk-flash">
      <Fill d="M114 10L60 78L96 78L82 130L142 56L106 56Z" o={0} color={YELLOW} dx={0} dy={0} />
    </g>
    <Act d="M46 34C40 30 34 26 28 22" o={2} />
    <Act d="M158 96C164 100 170 104 176 108" o={2.5} />
    <Act d="M38 104C32 106 26 108 20 110" o={3} />
  </Sketch>
);

/* Понимает страницу: метка на месте */
export const SketchPin: React.FC = () => {
  const pin = 'M100 12C128 12 146 32 146 56C146 84 118 106 100 126C82 106 54 84 54 56C54 32 72 12 100 12Z';
  return (
    <Sketch>
      <g className="sk-bob">
        <Fill d={pin} o={2} />
        <Line d={pin} o={0} />
        <Act d={circ(100, 56, 13)} o={3.5} />
      </g>
      <Line d="M64 132C86 136 114 136 136 132" o={3} />
    </Sketch>
  );
};

/* Подтвердить: курсор нажимает кнопку */
export const SketchPress: React.FC = () => {
  const btn = 'M42 72C80 68 120 68 158 72C162 86 162 108 158 120C120 124 80 124 42 120C38 108 38 86 42 72Z';
  return (
    <Sketch>
      <Fill d={btn} o={2} />
      <Line d={btn} o={0} />
      <Act d="M72 96C78 102 84 106 88 110C100 98 112 88 126 82" o={3.5} loop />
      <g className="sk-press"><Line d="M138 18L138 62L148 52L156 70L164 66L156 48L170 48Z" o={2.5} /></g>
    </Sketch>
  );
};

/* Что горит: пламя колышется */
export const SketchFlame: React.FC = () => (
  <Sketch>
    <g className="sk-flick">
      <Fill d="M100 8C112 40 148 56 148 94C148 120 126 136 100 136C74 136 52 120 52 94C52 72 68 60 78 44C82 64 92 68 96 60C102 46 96 28 100 8Z" o={0} color={YELLOW} dx={0} dy={0} />
      <Fill d="M100 66C106 84 124 90 124 110C124 126 112 134 100 134C88 134 76 126 76 110C76 92 94 86 100 66Z" o={2} color={MINT} dx={0} dy={0} />
    </g>
  </Sketch>
);

/* Нагрузка: столбики дышат */
export const SketchBars: React.FC = () => (
  <Sketch>
    <g className="sk-bar"><Fill d="M34 62C42 60 58 60 66 62L66 122L34 122Z" o={1} dx={0} dy={0} /></g>
    <g className="sk-bar is-b"><Fill d="M84 30C92 28 108 28 116 30L116 122L84 122Z" o={1.5} color={YELLOW} dx={0} dy={0} /></g>
    <g className="sk-bar is-c"><Fill d="M134 88C142 86 158 86 166 88L166 122L134 122Z" o={2} color={MINT} dx={0} dy={0} /></g>
    <Line d="M16 124C70 121 130 127 184 123" o={0} />
  </Sketch>
);

/* Цели: стрела летит в центр */
export const SketchTarget: React.FC = () => (
  <Sketch>
    <Fill d={circ(92, 76, 54)} o={2} dx={4} dy={3} />
    <Line d={circ(92, 76, 54)} o={0} />
    <Line d={circ(92, 76, 32)} o={1.5} />
    <Act d={circ(92, 76, 11)} o={3} yellow />
    <g className="sk-dart"><Act d="M178 14C150 34 122 54 96 72" o={4} /></g>
  </Sketch>
);

/* Календарь: нужный день обводится */
export const SketchCalendar: React.FC = () => {
  const page = 'M42 28C80 26 120 26 158 28C160 60 160 100 158 128C120 130 80 130 42 128C40 100 40 60 42 28Z';
  return (
    <Sketch>
      <Fill d={page} o={2} />
      <Line d={page} o={0} />
      <Line d="M42 54C80 52 120 52 158 54" o={1.5} />
      <Line d="M72 16C72 22 72 30 72 36" o={2} />
      <Line d="M128 16C128 22 128 30 128 36" o={2.2} />
      <Line d="M64 78C65 78 66 78 67 78M100 78C101 78 102 78 103 78M64 106C65 106 66 106 67 106M100 106C101 106 102 106 103 106" o={2.8} />
      <Act d={circ(136, 92, 16)} o={4} yellow loop />
    </Sketch>
  );
};

/* Файлы: лист со скрепкой */
export const SketchFile: React.FC = () => {
  const doc = 'M60 12L120 12L148 42L148 128C118 130 88 130 60 128Z';
  return (
    <Sketch>
      <g className="sk-bob">
        <Fill d={doc} o={2} />
        <Line d={doc} o={0} />
        <Line d="M120 12C120 22 120 32 120 42C130 42 140 42 148 42" o={1.5} />
        <Act d="M78 66C94 65 116 65 130 66" o={3} loop />
        <Act d="M78 86C94 85 116 85 130 86" o={3.6} loop />
        <Act d="M78 106C88 105 98 105 108 106" o={4.2} loop />
      </g>
    </Sketch>
  );
};

/* Много карточек сразу: стопка расходится */
export const SketchStack: React.FC = () => {
  const card = 'M52 46C84 44 116 44 148 46C150 66 150 94 148 112C116 114 84 114 52 112C50 94 50 66 52 46Z';
  return (
    <Sketch>
      <g className="sk-fan is-a"><Line d={card} o={1} /></g>
      <g className="sk-fan is-b"><Line d={card} o={0.5} /></g>
      <Fill d={card} o={2} dx={0} dy={0} />
      <Line d={card} o={0} />
      <Act d="M78 78C84 84 90 90 94 94C106 82 116 72 128 64" o={3} loop />
    </Sketch>
  );
};

/* Оплачено: чек с галочкой, рядом покачивается монета */
export const SketchPaid: React.FC = () => {
  const bill = 'M46 16C76 14 106 14 132 16L132 120L122 112L112 120L102 112L92 120L82 112L72 120L62 112L52 120L46 116Z';
  return (
    <Sketch>
      <g className="sk-bob">
        <Fill d={bill} o={2} />
        <Line d={bill} o={0} />
        <Line d="M62 38C78 37 98 37 114 38" o={1.5} />
        <Line d="M62 56C74 55 88 55 100 56" o={2} />
        <Act d="M66 84C72 90 78 95 84 100C94 88 104 78 116 70" o={3.5} loop />
      </g>
      <g className="sk-bob is-late">
        <Fill d={circ(158, 92, 22)} o={2.5} color={YELLOW} dx={0} dy={0} />
        <Line d={circ(158, 92, 22)} o={3} />
        <Line d="M158 80C158 88 158 96 158 104" o={3.4} />
      </g>
    </Sketch>
  );
};

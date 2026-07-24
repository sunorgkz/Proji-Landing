import { FileText, MessageSquare, Settings } from "lucide-react";

const ICONS = [FileText, Settings, MessageSquare, FileText, Settings, MessageSquare, FileText];

const CHAOS_OFFSETS = [
  { r: -12, x: -8, y: 4 },
  { r: 8, x: 12, y: -6 },
  { r: -6, x: -4, y: 14 },
  { r: 14, x: 18, y: 2 },
  { r: -18, x: 6, y: -10 },
  { r: 5, x: -14, y: 8 },
  { r: -9, x: 10, y: 16 },
];

export function ContrastSplit() {
  return (
    <div className="ag-contrast">
      <div className="ag-contrast__half ag-contrast__half--gravity">
        <div className="ag-contrast__grain" aria-hidden />
        <div className="ag-contrast__pile" aria-hidden>
          {ICONS.map((Icon, i) => {
            const o = CHAOS_OFFSETS[i];
            return (
              <span
                key={i}
                className="ag-contrast__chip"
                style={{
                  transform: `rotate(${o.r}deg) translate(${o.x}px, ${o.y}px)`,
                }}
              >
                <Icon size={16} strokeWidth={1.25} />
              </span>
            );
          })}
        </div>
        <h2 className="ag-contrast__title">Гравитация бизнеса</h2>
        <p className="ag-contrast__copy">
          Сотрудники тонут в ручных задачах. Данные теряются в чатах. На контроль
          уходит больше времени, чем на созидание. Рост бизнеса означает рост хаоса.
        </p>
      </div>

      <div className="ag-contrast__divider" aria-hidden>
        <span className="ag-contrast__beam" />
      </div>

      <div className="ag-contrast__half ag-contrast__half--lift">
        <div className="ag-contrast__track" aria-hidden>
          {ICONS.slice(0, 5).map((Icon, i) => (
            <span key={i} className="ag-contrast__node">
              <Icon size={16} strokeWidth={1.25} />
            </span>
          ))}
          <span className="ag-contrast__pulse" />
        </div>
        <h2 className="ag-contrast__title ag-contrast__title--bright">
          Состояние «Антигравити»
        </h2>
        <p className="ag-contrast__copy ag-contrast__copy--bright">
          Рутина делегирована автономным алгоритмам. Лиды обрабатываются мгновенно,
          отчёты собираются сами. Ваш фокус — только на стратегии и масштабировании.
        </p>
      </div>
    </div>
  );
}

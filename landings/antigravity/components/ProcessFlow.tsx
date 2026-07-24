const STEPS = [
  {
    title: "Аудит потоков",
    desc: "Находим узкие места, где теряется время. Оцифровываем вашу бизнес-логику.",
  },
  {
    title: "Архитектура контура",
    desc: "Невидимый конвейер: задачи маршрутизируются и передаются нужным инструментам без участия человека.",
  },
  {
    title: "Автономный результат",
    desc: "Система работает 24/7. Готовые сделки, отформатированные данные, закрытые задачи.",
  },
] as const;

export function ProcessFlow() {
  return (
    <div className="ag-process">
      {STEPS.map((step, i) => (
        <article key={step.title} className="ag-process__row">
          <div className="ag-process__rail" aria-hidden>
            <span className="ag-process__dot" />
            {i < STEPS.length - 1 && <span className="ag-process__line" />}
          </div>
          <div className="ag-process__body">
            <h3 className="ag-process__title">{step.title}</h3>
            <p className="ag-process__desc">{step.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

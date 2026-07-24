import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TASKS = [
  { label: "Лид: обработка заявки", status: "Готово" },
  { label: "Отчёт за неделю", status: "В работе", active: true },
  { label: "Синхронизация CRM", status: "Ожидает апрува" },
];

export function DashboardFocus() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={ref} className="ag-control">
      <motion.div className="ag-control__device" style={{ scale, y }}>
        <div className="ag-control__screen">
          <div className="ag-control__chrome" aria-hidden>
            <span /><span /><span />
          </div>
          <ul className="ag-control__tasks">
            {TASKS.map((task) => (
              <li
                key={task.label}
                className={`ag-control__task${task.active ? " is-active" : ""}`}
              >
                <span>{task.label}</span>
                <span className="ag-control__status">{task.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="ag-control__copy">
        <h2 className="ag-heading-lg">Прозрачность на уровне атомов.</h2>
        <p>
          Никаких «чёрных ящиков». Каждый шаг системы оставляет след. Вы в любую
          секунду видите, что выполнено, что требует вашего апрува, а что находится
          в работе. Это ваша интеллектуальная собственность, которая работает по
          вашим правилам.
        </p>
      </div>
    </section>
  );
}

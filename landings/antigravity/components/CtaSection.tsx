import { useState, type FormEvent } from "react";
import { submitDemoRequest } from "../../../lib/submitDemoRequest";

export function CtaSection() {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus("loading");
    try {
      await submitDemoRequest("Антигравити — проектирование", contact);
      setStatus("success");
      setContact("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="ag-cta">
      <div className="ag-cta__halo" aria-hidden />
      <div className="ag-cta__inner">
        <h2 className="ag-heading-lg">Ваша компания готова к запуску.</h2>
        <p className="ag-cta__lead">
          Оставьте заявку на проектирование. Мы разберём ваш текущий процесс и
          покажем, какую часть операционной нагрузки можно отключить уже завтра.
        </p>

        {status === "success" ? (
          <p className="ag-cta__success">Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
        ) : (
          <form className="ag-cta__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="contact"
              placeholder="Ваш Telegram или Телефон"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              autoComplete="tel"
            />
            <button type="submit" className="ag-btn ag-btn--primary" disabled={status === "loading"}>
              {status === "loading" ? "Отправка…" : "Спроектировать систему"}
            </button>
            {status === "error" && (
              <p className="ag-cta__error">Не удалось отправить. Попробуйте ещё раз.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

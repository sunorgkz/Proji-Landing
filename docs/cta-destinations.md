# Куда уходят CTA и формы

Все кнопки помечены атрибутом `data-cta-dest` в разметке (где применимо).

| Место | Кнопка / форма | Куда уходят данные |
|-------|----------------|-------------------|
| Главная Hero | «Начать бесплатно» | Редирект на `https://proji.org/login` |
| Главная Hero | «Получить консультацию» | WhatsApp `https://wa.me/77766006636` |
| Главная Hero | Форма «Презентация на телефон» | `POST /api/demo-request` → FormSubmit → **sund.serik@gmail.com** (fallback: FormSubmit напрямую) |
| Главная CTA | «Найдём точки роста» / «Смотреть демо» | WhatsApp `https://wa.me/77766006636` |
| Knowledge | Форма демо | `submitDemoRequest` → `/api/demo-request` → FormSubmit → **sund.serik@gmail.com** |
| Антигравити | CTA-форма | То же: `submitDemoRequest` → FormSubmit → **sund.serik@gmail.com** |
| AI-агенты для бизнеса (`/ai-agents`) | «Создать AI-агента» / «Показать живое демо» (хедер, hero, финал) | WhatsApp `https://wa.me/77766006636` |
| Static Lovable (CRM и др.) | «Запросить демо» и аналоги | Зависит от лендинга (часто `#` / локальный UI); не через наш API |

Реализация: [`lib/submitDemoRequest.ts`](../lib/submitDemoRequest.ts), [`api/demo-request.ts`](../api/demo-request.ts).

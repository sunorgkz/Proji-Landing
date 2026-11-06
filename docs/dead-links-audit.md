# Аудит мёртвых ссылок и кнопок без действия

**Сайт:** [landing.proji.kz](https://landing.proji.kz)  
**Дата проверки:** 26 июня 2026  
**Метод:** статический анализ исходников (`components/`, `landings/`, `public/`) + поиск `href="#"`, кнопок без обработчиков, форм без отправки.

---

## Краткая сводка

| Статус | Маршрутов | Комментарий |
|--------|-----------|-------------|
| ✅ Без критичных проблем | 4 | `/`, `/knowledge`, `/sunnet`, `404` |
| ⚠️ Есть проблемы (исходники в репо) | 3 | `/secondbrain`, `/chrome-extension`, `/platform` |
| ⚠️ Проблемы в Lovable-бандлах | 11 | Статические лендинги в `public/<slug>/` |
| ℹ️ Замечания UX | 2 | Некликабельные карточки, логотипы без ссылки |

**Всего найдено:** 20+ элементов с `href="#"` или без реального действия.

> Якорные ссылки (`#features`, `#contact`, `#cta` и т.п.) **не считаются** мёртвыми — они скроллят внутри страницы.

---

## `/` — Главный лендинг

**Файлы:** `components/Footer.tsx`, `components/Hero.tsx`, `components/Features.tsx`

| Элемент | Текст / описание | Текущее поведение | Проблема | Файл |
|---------|------------------|-------------------|----------|------|
| Соцсети (×3) | Иконки Twitter, LinkedIn, GitHub | `href="#"` | Ссылка никуда не ведёт | `Footer.tsx:18` |
| Политика конфиденциальности | Текстовая ссылка | `href="#"` | Нет URL документа | `Footer.tsx:60` |
| Условия использования | Текстовая ссылка | `href="#"` | Нет URL документа | `Footer.tsx:61` |
| Форма «Презентация на телефон» | Поле телефона + кнопка Send | `onSubmit` → только аналитика + «успех» на экране | **Данные никуда не отправляются** | `Hero.tsx:186–191` |
| Карточки экосистемы | Цифровые сотрудники, ИИ CRM и др. | Только текст, без `href` | Карточки не кликабельны (в футере ссылки уже есть) | `Features.tsx` |

**Работает корректно:**
- «Начать бесплатно» → `https://proji.org/login`
- «Получить консультацию» → WhatsApp `wa.me/77766006636`
- CTA-блок → WhatsApp
- Футер «Продукт»: proji.kz, progpt.kz, `/crm`
- Навигация шапки (Возможности / О нас) — скролл внутри SPA

---

## `/knowledge` — Proji Knowledge

**Файл:** `landings/proji_knowledge/ProjiKnowledgeLanding.tsx`

✅ **Проблем не найдено.**

- Навигация: якоря `#problem`, `#solution`, `#results`, `#cta`
- Форма демо: `submitDemoRequest()` → `/api/demo-request`
- Контакты: `mailto:sund.serik@gmail.com`, `https://proji.kz`

---

## `/secondbrain` — Second Brain

**Файлы:** `landings/secondbrain/SecondBrainLanding.tsx`, `SiteHeader.tsx`, `lib/i18n.tsx`

| Элемент | Текст (RU) | Текущее поведение | Проблема | Файл |
|---------|------------|-------------------|----------|------|
| Логотип | proji | `href="#"` | Никуда не ведёт | `SiteHeader.tsx:28` |
| Кнопка в шапке | «Попробовать бесплатно» | `<Button>` без `onClick` / `href` | **Кнопка без действия** | `SiteHeader.tsx:72–74` |
| Hero CTA | «Попробовать proji бесплатно» | `<Button>` без обработчика | **Кнопка без действия** | `SecondBrainLanding.tsx:82–84` |
| Финальный CTA | «Присоединиться к Proji» | `<Button>` без обработчика | **Кнопка без действия** | `SecondBrainLanding.tsx:168–170` |

Те же строки дублируются на EN / AR / KK (`nav.try`, `hero.cta`, `final.cta`).

**Рекомендация:** привязать к `https://proji.kz`, WhatsApp или форме демо.

---

## `/chrome-extension` — Chrome Extension

**Файлы:** `landings/chrome_extension/components/landing.tsx`, `lib/i18n.ts`

| Элемент | Текст (RU) | Текущее поведение | Проблема | Файл |
|---------|------------|-------------------|----------|------|
| Футер | «О Proji» | `href="#"` | Мёртвая ссылка | `landing.tsx:257` |
| Футер | «Конфиденциальность» | `href="#"` | Мёртвая ссылка | `landing.tsx:257` |
| Футер | «Поддержка» | `href="#"` | Мёртвая ссылка | `landing.tsx:257` |
| Mock UI | «+ Proji» | `<button>` без `onClick` | Декоративная кнопка в макете | `landing.tsx:107–109` |

**Работает:** «Установить» → скачивание ZIP (`EXTENSION_ZIP_PATH`), логотип → `#top`.

---

## `/sunnet` — Sunnet (статика)

**Файл:** `public/sunnet/index.html`

✅ **Мёртвых ссылок не найдено.**

- Навигация: `#problem`, `#solution`, `#architecture`, `#cases`, `#contact`
- Контакты: `mailto:serik@sunnet.kz`, `tel:+77079635533`
- Логотип в шапке — `<div>`, не ссылка (некликабелен, но не `href="#"`)

---

## `/platform` — Platform (статика)

**Файл:** `public/platform/index.html`

| Элемент | Текст | Текущее поведение | Проблема | Строка |
|---------|-------|-------------------|----------|--------|
| Логотип (шапка) | proji.kz | `href="#"` | Мёртвая ссылка | 21 |
| Логотип (футер) | proji.kz | `href="#"` | Мёртвая ссылка | 357 |

**Работает:** навигация `#why`, `#how`, `#results`, `#contact`; контакты `mailto:serik@sunnet.kz`, `tel:+77079635533`.

---

## Lovable-лендинги (iframe → `public/<slug>/`)

Исходный TSX в репозитории — только обёртка-iframe. Проблемы в собранных бандлах.

### Сводка по бандлам

| Маршрут | `href="#"` в JS | mailto | wa.me | Форма демо |
|---------|-----------------|--------|-------|------------|
| `/crm` | 4 | 1 | 0 | нет |
| `/digital-team` | 1 | 2 | 0 | нет |
| `/knowledge-twin` | 2 | 1 | 0 | нет |
| `/knowledge-vault` | 2 | 1 | 0 | нет |
| `/os-engine` | 1 | 1 | 0 | нет |
| `/team-ai` | 0 | 1 | 0 | нет |
| `/team-ai-collab` | 0 | 1 | 0 | нет |
| `/insight-hub` | 0 | 1 | 0 | нет |
| `/context-flow` | 0 | 3 | 0 | нет |
| `/flow-forge` | 0 | 1 | 0 | нет |
| `/pro-ai-council` | 0 | 1 | 0 | нет |

### Детали по страницам

#### `/crm`
- **4× `href="#"`** в бандле — типично футер / legal / соцсети (Lovable-заглушки)
- Логотип `href="/"` — в iframe уводит на корень iframe, не на главную SPA
- Навигация `#how`, `#product`, `#solutions`, `#demo` — работает
- `mailto:` есть (1), WhatsApp нет

#### `/digital-team`
- **1× `href="#"`** в футере
- Логотип: React Router `Link to="/"` — в iframe ведёт не на `landing.proji.kz`
- Навигация `#about`, `#capabilities`, `#how`, `#cases`, `#pricing` — работает
- `mailto:` (2)

#### `/knowledge-twin`, `/knowledge-vault`
- **2× `href="#"`** каждый — футерные ссылки
- Есть секция footer в i18n (`footer_*` ключи)
- `mailto:` (1)

#### `/os-engine`
- **1× `href="#"`** в футере
- `mailto:` (1)

#### `/team-ai`, `/team-ai-collab`, `/pro-ai-council`
- `href="#"` в бандле **не найдено**
- `mailto:` (1) — вероятно контактные CTA
- Требует ручной проверки кликов по «Записаться» / «Демо» в браузере

#### `/insight-hub`
- `href="#"` нет
- Кнопка **«Сохранить в базу знаний Proji»** (`demoBtn`) — элемент mock UI в hero-визуале, не реальный CTA
- Основной CTA: «Пройти тест и забронировать аудит» — проверить вручную (квиз / форма)

#### `/context-flow`
- `href="#"` нет
- CTA «Запросить демо», «Связаться с нами» — в бандле **3× mailto**, вероятно работают
- Рекомендуется проверить в браузере

#### `/flow-forge`
- `href="#"` нет
- `mailto:` (1)
- Логотип — `<span>`, не ссылка

---

## `404` — Страница не найдена

**Файл:** `components/NotFound.tsx`

✅ Все элементы работают: `Link to="/"`, авто-редирект через 5 сек.

---

## Сквозные паттерны

1. **Футерные заглушки Lovable** — `href="#"` на Privacy, Terms, Support, соцсети (повторяется на главной, chrome-extension, CRM и др.).
2. **Логотипы `href="#"`** — platform (×2), secondbrain (шапка).
3. **CTA-кнопки без handler** — secondbrain (3 кнопки).
4. **Форма-заглушка** — главный Hero (телефон без отправки).
5. **Iframe-навигация** — логотипы с `href="/"` или `Link to="/"` на Lovable-лендингах ведут внутри iframe, а не на `landing.proji.kz/`.

---

## Приоритет исправлений

| Приоритет | Что исправить | Где |
|-----------|---------------|-----|
| 🔴 Высокий | CTA «Попробовать» / «Присоединиться» без действия | `/secondbrain` |
| 🔴 Высокий | Форма телефона с ложным «успехом» | `/` Hero |
| 🟠 Средний | Legal + соцсети `href="#"` | `Footer.tsx`, chrome-extension |
| 🟠 Средний | Логотипы `href="#"` | `/platform`, `/secondbrain` |
| 🟡 Низкий | `href="#"` в Lovable-бандлах | Пересобрать через `setup-lovable-landing.mjs` или правка в Lovable |
| 🟡 Низкий | Mock-кнопки в демо-UI | chrome-extension, insight-hub hero |
| ℹ️ UX | Сделать карточки Features кликабельными | `/` Features |

---

## Полный список `href="#"` в исходниках (автоскан)

| Файл | Строка |
|------|--------|
| `components/Footer.tsx` | 18, 60, 61 |
| `landings/chrome_extension/components/landing.tsx` | 257 |
| `landings/secondbrain/components/SiteHeader.tsx` | 28 |
| `public/platform/index.html` | 21, 357 |
| `public/crm/index.html` | 186 (в составе SSR-разметки) |
| `public/digital-team/index.html` | 170 |
| `public/knowledge-twin/index.html` | 170 |
| `public/knowledge-vault/index.html` | 170 |
| `public/os-engine/index.html` | 170 |
| `public/team-ai/index.html` | 170 |
| `public/team-ai-collab/index.html` | 170 |

Бандлы с `href:"#"`: `crm` (4), `knowledge-twin` (2), `knowledge-vault` (2), `digital-team` (1), `os-engine` (1).

---

## Как перепроверить

```bash
node scripts/audit-dead-links.mjs
node scripts/audit-bundles.mjs
```

Ручная проверка в браузере рекомендуется для Lovable-лендингов с формами и квизами (`/insight-hub`, `/context-flow`, `/crm`).

---

*Отчёт сгенерирован по состоянию репозитория на 26.06.2026 (коммит `beab8b4`).*

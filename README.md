# Proji Landing — landing.proji.kz

Мульти-лендинг платформа: главная страница Proji на `/`, дополнительные лендинги из Lovable — по пути `/slug`.

**Продакшен:** [https://landing.proji.kz/](https://landing.proji.kz/)

## Локальный запуск

**Требования:** Node.js 18+

```bash
npm install
cp .env.example .env.local   # опционально: ключ Amplitude
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с hot reload (порт 3000) |
| `npm run build` | Сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки локально |

## Структура лендингов

```
landings/
  registry.ts          # реестр всех лендингов и их URL
  main/
    MainLanding.tsx    # главный лендинг → /
  <slug>/              # будущие лендинги → /<slug>
    <Component>.tsx
```

### Добавление нового лендинга из Lovable

1. Скопируйте файлы лендинга в `landings/<slug>/`
2. **Изолируйте дизайн**: все стили внутри корневого класса (`.my-landing-root`), не трогайте `body`/`html`
3. Импортируйте CSS только внутри компонента лендинга (lazy chunk)
4. Добавьте запись в `landings/registry.ts`:

```ts
{
  slug: 'primer',
  title: 'Название | Proji',
  component: lazy(() => import('./primer/PrimerLanding')),
},
```

5. Лендинг будет доступен на `https://landing.proji.kz/primer` и локально на `http://localhost:3000/primer`

## Деплой

```bash
npm run build
```

Содержимое папки `dist/` загрузите на сервер. Пример конфигурации nginx: `deploy/nginx.conf.example`.

## Переменные окружения

| Переменная | Обязательна | Описание |
|------------|-------------|----------|
| `VITE_AMPLITUDE_API_KEY` | Нет | Ключ Amplitude для аналитики |

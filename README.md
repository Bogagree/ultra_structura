# Ultra Structura

Лендинг студии **AI Video Production** — [Ultra Structura](https://www.instagram.com/ultra_structura/).

Статический сайт на Next.js 14, TypeScript и Tailwind CSS.

## Стек

- [Next.js](https://nextjs.org) 14 (Pages Router)
- React 18 + TypeScript
- Tailwind CSS 3 + PostCSS
- next-seo
- ESLint, Prettier, Husky, lint-staged

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Разработка |
| `npm run build` | Production-сборка |
| `npm run build-prod` | Очистка + сборка |
| `npm run start` | Запуск production-сборки |
| `npm run lint` | ESLint |
| `npm run format` | Форматирование |
| `npm run check-types` | Проверка TypeScript |

## Структура

```
src/
  pages/        # страницы Next.js
  templates/    # секции лендинга (Hero, Features, Banner, Footer…)
  */            # атомарные UI-компоненты
  styles/       # global.css (Tailwind)
  utils/        # AppConfig и утилиты
public/         # статика и изображения
```

Сборка страницы: `pages/index.tsx` → `templates/Base.tsx` → секции из `templates/` → атомарные компоненты.

## Кастомизация

| Что менять | Где |
|------------|-----|
| Название, title, description | `src/utils/AppConfig.ts` |
| Порядок секций | `src/templates/Base.tsx` |
| Тексты Hero / CTA / Features | `src/templates/*` |
| Цвета темы | `tailwind.config.js` |
| Глобальные стили | `src/styles/global.css` |
| Favicon | `public/favicon*.png`, `public/apple-touch-icon.png` |

## Деплой

```bash
npm run build-prod
```

Готовые файлы — в папке `out`. Их можно выложить на любой статический хостинг (Vercel, Cloudflare Pages, nginx и т.д.).

## Ссылки

- Instagram: [instagram.com/ultra_structura](https://www.instagram.com/ultra_structura/)

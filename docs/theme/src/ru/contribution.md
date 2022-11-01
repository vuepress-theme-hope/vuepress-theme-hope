---
title: Руководство по вкладу
icon: creative
category:
  - FAQ
---

Мы всегда рады каждому внести свой вклад! Вот руководство для вас.

<!-- more -->

## Клонировать и установить проект

Используйте Git для клонирования проекта на локальный сервер и используйте pnpm для установки зависимостей.

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git

pnpm i
```

::: tip

Если вы не установили pnpm, установите его с помощью следующей команды.

```sh
corepack enable
corepack prepare pnpm@7.14.0 --activate
```

:::

## Структура файлов проекта

Проект представляет собой монорепозиторий, управляемый pnpm.

- `docs`: размещение документации каждого плагина и темы, каждый подкаталог является проектом
- `demo`: демонстрационный проект темы
- `packages`: размещение кода каждого плагина и темы, каждый подкаталог является проектом

```
.
├── .github → GitHub config
├── .husky → husky config
│
├── demo → Theme demo project
│
├── docs → document directory
│ ├── blog → blog2 plugin document
│ ├── comment → comment2 plugin document
│ ├── components → components plugin document
│ ├── copy-code → copy-code2 plugin document
│ ├── feed → feed2 plugin document
│ ├── lightgallery → lightgallery plugin document
│ ├── md-enhance → md-enhance plugin document
│ ├── photo-swipe → photo-swipe document
│ ├── pwa → pwa2 plugin document
│ ├── reading-time → reading-time2 plugin document
│ ├── sass-palette → sass-palette plugin document
│ ├── seo → seo2 plugin document
│ └── theme → theme document
│
├── packages → project source code
│ ├── blog2 → blog2 plugin
│ ├── comment2 → comment2 plugin
│ ├── components → components plugin
│ ├── copy-code2 → copy-code2 plugin
│ ├── create → create-vuepress-theme-hope helper
│ ├── feed2 → feed2 plugin
│ ├── lightgallery → lightgallery plugin
│ ├── md-enhance → md-enhance plugin
│ ├── photo-swipe → photo-swipe plugin
│ ├── pwa2 → pwa2 plugin
│ ├── reading-time2 → reading-time2 plugin
│ ├── sass-palette → sass-palette plugin
│ ├── seo2 → seo2 plugin
│ ├── shared → shared file
│ ├── sitemap2 → sitemap2 plugin
│ └── theme → vuepress-theme-hope theme
│
├── scripts → command scripts
│
├── ... → some config files
│
├── LICENSE → License
├── package.json → root package.json
├── README.md → project intro
├── SECURITY.md → Security Policy
│
└── tsconfig.* → TypeScript config file
```

## Модификация документации

Вы можете найти соответствующий проект в каталоге документации, чтобы вы могли напрямую изменить соответствующий Markdown.

Убедившись, что команды `pnpm lint` и `pnpm lint:md` не выдают ошибок, вы можете зафиксировать на GitHub открытие PR.

::: tip Предпросмотр документации

Поскольку в документации используются локальные темы и плагины, вам необходимо сначала собрать локальный проект с помощью `pnpm build`.

Чтобы начать предварительный просмотр, перейдите к нужному проекту в каталоге `docs`, затем запустите `pnpm docs:vite-dev` (используя vite) или `pnpm docs:webpack-dev` (используя webpack).

:::

## Модификация проекта

Структура каждого проекта следующая:

```
.
├── lib → compiled output file
│ │
│ ├── client → client-side compiled code
│ │
│ └── node → Node.js side compiled code
│
└── src → source file
  │
  ├── client → client-side source code
  │
  ├── node → Node.js side source code
  │
  └── shared → Shared files between node and client
```

Поскольку на стороне клиента используется модуль ES (import/export), а на стороне Node.js используются commonjs (require/exports), код в каталогах node и client не может иметь перекрестных ссылок.

- каталог `client` хранит клиентский код, скомпилированный в формате esm
- каталог `node` хранит код Node.js, скомпилированный в формате cjs
- каталог `shared` в основном хранит типы TypeScript и скомпилирован в формате cjs. На него могут ссылаться каталоги client и node.

Для повышения производительности все плагины упаковываются и минимизируются с помощью накопительного пакета при их публикации.

## Разработка проекта

### Как собрать

- Для лучшей производительности все плагины упаковываются и минимизируются с помощью `rollup` при их публикации.
- Используйте пакет `cpx` для копирования и просмотра файлов других форматов из исходного файла в каталог вывода.

### Команда

1. Сборка проекта: `pnpm build`

   - Используйте rollup пакет для объединения исходных файлов и их минимизации, а также вывод результатов в папку `lib`
   - Используйте `rollup-plugin-copy`, чтобы скопировать другие файлы в папку `lib`

1. Разработка проекта: `pnpm dev`

   - Используйте `tsc` для компиляции файла ts в папку `lib`
   - Используйте `cpx`, чтобы скопировать другие файлы в папку `lib`

1. Форматирование проекта: `pnpm lint`

   Он отформатирует проект, используя prettier, eslint и stylelint.

   Если вы изменяете Markdown, вам также необходимо запустить команду `pnpm lint:md`.

::: warning

Пожалуйста, не смешивайте команды `build` и `dev`, так как они компилируются совершенно по-разному.

Возможно, вам потребуется выполнить команду `pnpm clean`, чтобы очистить предыдущие результаты сборки.

:::

## Фиксация

Проект использует `husky` для добавления Git Hooks для проверки:

- На этапе `precommit`: мы используем `lint-staged` для проверки измененного кода с помощью соответствующего линтера

  Это означает, что вам нужно убедиться, что ваш код отформатирован в соответствии с требованиями проекта и может пройти ЛИНТЕР-тесты.

- На этапе `commit-msg`: мы используем `commitlint` для проверки комментария фиксации.

  Это означает, что вам необходимо убедиться, что ваши комментарии к фиксации соответствуют семантическим

::: tip

Если вы не можете пройти указанные выше Git Hooks, вы не сможете выполнить `git commit`.

Если вы уже что-то внесли, но не можете сделать коммит и не знаете, как это исправить, вы можете добавить флаг `--no-verify` при коммите, чтобы обойти Git Hooks.

:::

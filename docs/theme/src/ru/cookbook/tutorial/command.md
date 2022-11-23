---
title: Команды проекта
icon: command
category:
  - Учебник с примерами
  - Руководство
  - Начало работы
tag:
  - Команды проекта
---

В этом руководстве представлены команды проекта VuePress.

<!-- more -->

## Общие команды

- `vuepress dev [dir]` запустит сервер разработки, чтобы вы могли локально разрабатывать свой сайт VuePress.
- `vuepress build [dir]` соберет ваш сайт VuePress в статические файлы для последующего развертывания.

::: info Использование шаблона

Если вы используете шаблон VuePress Theme Hope, вы можете найти следующие три команды в `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build docs",
    "docs:clean-dev": "vuepress dev docs --clean-cache",
    "docs:dev": "vuepress dev docs"
  }
}
```

Это означает, что вы можете использовать:

- `pnpm docs:dev` запускает сервер разработки
- `pnpm docs:build` собирает проект и выводит
- `pnpm docs:clean-dev` для очистки кеша и запуска сервера разработки

:::

::: info Завершить DevServer

Чтобы завершить работу сервера разработки, нажмите в терминале дважды `Ctrl + C`.

:::

## Обновить версию

Если вам нужно обновить тему и версию VuePress, выполните следующую команду:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add @vuepress/client@next vuepress@next vuepress-theme-hope@next && pnpm i && pnpm up
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next && yarn install && yarn upgrade
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next && npm install && npm update
```

:::

::: warning

Any official plugins starting with `@vuepress/plugin-` should be the same version as VuePress.

If you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

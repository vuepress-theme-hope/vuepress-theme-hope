---
title: Установка / Использование
icon: download
order: 2
category:
  - Начало работы
tag:
  - Начало работы
  - Установка
  - Использование
---

## Установка

Создайте новый проект vuepress-theme-hope в папке `[dir]`

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

To add vuepress-theme-hope as docs builder to an existing project, run the following command in the project root directory:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope add [dir]
```

:::

::: note

`[dir]` здесь является параметром, замените его реальными именами папок, такими как `docs`, `blog` или другим именем, которое вам нравится.

:::

## Использование

Пожалуйста, импортируйте и используйте `hopeTheme`, чтобы использовать `vuepress-theme-hope`.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // your theme config here
  }),
};
```

:::

Вы можете просмотреть [Конфигурацию этого сайта][docs-config] в качестве примера.

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts

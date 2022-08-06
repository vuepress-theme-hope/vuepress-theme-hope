---
title: Установка / Использование
icon: install
order: 2
category:
  - Начало работы
tag:
  - Начало работы
  - Установка
  - Использование
---

## Установка

Создайте проект vuepress-theme-hope в папке `[dir]` внутри текущего проекта:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope@next [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@next [dir]
```

:::

::: note

`[dir]` здесь является параметром, замените его реальными именами папок, такими как `docs`, `src` или другим именем, которое вам нравится.

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
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    // your theme config here
  }),
};
```

:::

Вы можете просмотреть [Конфигурацию этого сайта][docs-config] в качестве примера.

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts

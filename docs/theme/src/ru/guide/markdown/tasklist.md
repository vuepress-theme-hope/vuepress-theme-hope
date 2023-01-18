---
title: Список заданий
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - Список заданий
---

Включите файл Markdown в список задач поддержки вашего сайта VuePress.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
};
```

:::

## Синтаксис

- Используйте `- [ ] некоторый текст` для отображения неотмеченного элемента задачи.
- Используйте `- [x] некоторый текст` для отображения отмеченного элемента задачи. (Заглавная `X` также поддерживается)

## Демо

- [ ] План А
- [x] План Б

```md
- [ ] План А
- [x] План Б
```

---
title: Верхний и нижний индексы
icon: superscript
category:
  - Markdown
tag:
  - Markdown
  - Верхний индекс
  - Нижний индекс
---

Пусть файл Markdown на вашем сайте VuePress поддерживает нижний и верхний индексы.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-13}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    },
  }),
});
```

@tab JS

```js {7-12}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    },
  }),
};
```

:::

## Синтаксис

- Используйте `^ ^`, чтобы отметить верхний индекс.
- Используйте `~ ~`, чтобы отметить нижний индекс.

## Демо

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

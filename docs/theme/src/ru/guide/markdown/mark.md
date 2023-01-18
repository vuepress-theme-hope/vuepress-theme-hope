---
title: Выделение
icon: highlighter
category:
  - Markdown
tag:
  - Выделение
  - Markdown
---

Сделайте файлы Markdown на вашем сайте VuePress поддержкой разметки.

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
        mark: true,
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
        mark: true,
      },
    },
  }),
};
```

:::

## Синтаксис

Используйте `== ==` для выделения.

## Демо

VuePress Theme Hope is ==powerful==.

```md
VuePress Theme Hope is ==powerful==.
```

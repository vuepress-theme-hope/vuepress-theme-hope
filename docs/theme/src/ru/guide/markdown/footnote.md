---
title: Сноска
icon: quote-left
category:
  - Markdown
tag:
  - Сноска
  - Markdown
---

Пусть файл Markdown на вашем сайте VuePress поддерживает сноски.

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
        footnote: true,
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
        footnote: true,
      },
    },
  }),
};
```

:::

## Синтаксис

- Используйте `[^Anchor text]` в Markdown, чтобы определить сноску

- Используйте `[^Anchor text]: ...` для описания содержимого сноски

- Если в сноске есть несколько абзацев, абзац должен быть с двойным отступом

## Демо

Сноска 1 ссылка[^first].

Сноска 2 ссылка[^second].

Встроенная сноска^[Текст встроенной сноски] определение.

Дублированная ссылка на сноску[^second].

[^first]: Сноска **может иметь разметку**

    и несколько абзацев.

[^second]: Текст сноски.

```md
Сноска 1 ссылка[^first].

Сноска 2 ссылка[^second].

Встроенная сноска^[Текст встроенной сноски] определение.

Дублированная ссылка на сноску[^second].

[^first]: Сноска **может иметь разметку**

    и несколько абзацев.

[^second]: Текст сноски.
```

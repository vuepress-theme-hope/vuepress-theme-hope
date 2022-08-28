---
title: Включить улучшение
icon: enable
order: 1
category:
  - Markdown
tag:
  - Вступление
  - Markdown
---

Помимо синтаксисов Markdown, добавленных самим VuePress, `vuepress-theme-hope` включает дополнительный синтаксис в Markdown с помощью плагина [vuepress-plugin-md-enhance][md-enhance].

<!-- more -->

## Встроенные улучшения

VuePress поставляется с таблицами в стиле GitHub, Emoji, TOC, номерами строк кода, выделением конкретных строк и т. д., которые доступны из коробки.

Подробный синтаксис смотрите во [Встроенное улучшение Markdown](../../cookbook/vuepress/markdown.md).

## Включить улучшение разметки

`plugin.mdEnhance` в параметрах темы будет передан плагину как опция плагина. Посетите [документацию плагина][md-enhance], чтобы узнать об использовании.

::: tip

Не беспокойтесь о размере вашего сайта. Если вы не включите связанные функции, окончательный код не будет включать код для этих функций.

:::

## Включить все

Вы можете установить `plugins.mdEnhance.enableAll`, чтобы включить все функции плагина [md-enhance][md-enhance].

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
        enableAll: true,
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
        enableAll: true,
      },
    },
  }),
};
```

:::

::: danger

Пожалуйста, используйте эту опцию ТОЛЬКО для игры или тестирования.

Со временем `vuepress-plugin-md-enhance` становится все более мощным. Он добавляет много синтаксиса в парсер Markdown и больше кода для вывода.

Включение функций, которые вам не нужны, увеличит время разработки и сборки. (`markdown-it` должен проверять дополнительный синтаксис)

Кроме того, функция презентации добавит к вашему выводу фрагмент размером 700 КБ (в основном это `reveal.js`).

Включите ТОЛЬКО ту функцию, которую хотите использовать.

:::

### Включить определенный синтаксис

Конкретные элементы конфигурации синтаксиса можно найти на соответствующей странице инструкций или [Конфигурация плагина темы](../../config/plugins/md-enhance.md).

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/

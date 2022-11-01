---
title: Стилизация
icon: style
category:
  - Markdown
tag:
  - Стилизация
  - Markdown
---

Создавайте встроенный фрагмент, стилизуя встроенные токены, включая изменение тегов, добавление атрибутов и изменение содержимого.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {9-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // options
        ],
      },
    },
  }),
});
```

@tab JS

```js {9-11}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // options
        ],
      },
    },
  }),
};
```

:::

## Использование

`stylize` получает массив, где каждый элемент принимает 2 варианта:

- `matcher`: должно быть `string` или `RegExp`.

- `replacer`: функция, обрезающая совпадающий токен

Например, вы можете использовать следующую конфигурацию для преобразования `*Recommended*` в значок `<Badge type="tip">Recommended</Badge>`:

::: code-tabs#language

@tab TS

```ts {9-21}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({ tag }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
      },
    },
  }),
});
```

@tab JS

```js {9-21}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({ tag }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
      },
    },
  }),
};
```

:::

<!-- markdownlint-disable MD033 -->

Другой пример: вы хотите, чтобы все слова с эмфисом `n’t` были окрашены в красный цвет, так что `Setting this to a invalid syntax *doesn’t* have any effect.` становится: "Установка недопустимого ститакса <span style="color:red">не имеет</span> никакого эффекта."

<!-- markdownlint-enable MD033 -->

::: code-tabs#language

@tab TS

```ts {9-21}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            matcher: /n’t$/,
            replacer: ({ tag, attrs, content }) => {
              if (tag === "em")
                return {
                  tag: "span",
                  attrs: { ...attrs, style: "color: red" },
                  content,
                };
            },
          },
        ],
      },
    },
  }),
});
```

@tab JS

```js {9-21}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      stylize: [
        {
          matcher: /n’t$/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === "em")
              return {
                tag: "span",
                attrs: { ...attrs, style: "color: red" },
                content,
              };
          },
        },
      ],
    }),
  ],
};
```

:::

Если вы хотите пропустить некоторые слова на некоторых страницах, вы можете установить `noStylize` во вступительной части страницы с массивом содержимого, которое вы не хотите стилизовать.

::: info Производительность

Чтобы избежать влияния на производительность, вы должны стараться избегать использования RegExp для повышения производительности, если вам это не нужно.

Также попробуйте создать фрагменты с RegExp с меньшими затратами, например: RegExp начинается с `^` и заканчивается на `$`.

Например, если вы хотите сопоставить только "SHOULD", "MUST" и "MAY", вы должны написать `/^(?:SHOULD|M(?:UST|AY))$/u` вместо `/SHOULD|MUST|MAY/u`. Первый совпадет только 2 раза с "A loo...oong content" с 1000 символов, но со вторым RegExp будет совпадать почти 3000 раз.

:::

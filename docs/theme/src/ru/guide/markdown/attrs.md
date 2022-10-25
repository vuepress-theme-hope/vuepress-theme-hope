---
title: Поддержка атрибутов
icon: code
category:
  - Markdown
tag:
  - Атрибуты
  - Markdown
---

Вы можете использовать собственный синтаксис, чтобы добавить атрибуты для разметки контента.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
});
```

@tab JS

```js {8}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};
```

:::

## Использование

Вы можете использовать `{attrs}`, чтобы добавить атрибуты к содержимому markdown.

Например, если вам нужен heading2 "Привет Мир" с идентификатором "say-hello-world", вы можете написать:

```md
## Привет Мир {#say-hello-world}
```

Если вы хотите изображение с классом "full-width", вы можете написать:

```md
![img](link/to/image.png) {.full-width}
```

Также поддерживаются другие атрибуты, поэтому:

```md
A paragraph with some text. {#p .a .b align=center customize-attr="content with spaces"}
```

будет преобразовано в:

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  A paragraph with some text.
</p>
```

## Продвинутый

Вы можете передать параметры в `plugins.mdEnhance.attrs`, чтобы настроить поведение плагина.

```ts
interface AttrsOptions {
  /**
   * left delimiter
   *
   * @default '{'
   */
  left?: string;

  /**
   * right delimiter
   *
   * @default '}'
   */
  right?: string;

  /**
   * allowed attributes
   *
   * @description An empty list means allowing all attribute
   *
   * @default []
   */
  allowed?: (string | RegExp)[];
}
```

## Демо

Текст с `inline code`{.inline-code} и ![favicon](/favicon.ico){.image}, а также с поддержкой _emphasis_{.emphasis} и **bold**{.bold}.

| Таблица |
| ------- |
| контент |

{.table}

- пункт списка{.list-item}

  - элемент вложенного списка
    {.nested}

{.list}

Строка с разрывом  
{.break}

--- {.horizontal}

block content {.block}

```md
Текст с `inline code`{.inline-code} и ![favicon](/favicon.ico){.image}, а также с поддержкой _emphasis_{.emphasis} и **bold**{.bold}.

| Таблица |
| ------- |
| контент |

{.table}

- пункт списка{.list-item}

  - элемент вложенного списка
    {.nested}

{.list}

Строка с разрывом  
{.break}

--- {.horizontal}

block content {.block}
```

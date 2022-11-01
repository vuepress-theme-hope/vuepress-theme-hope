---
title: Attrs support
icon: code
category:
  - Markdown
tag:
  - Attributes
  - Markdown
---

You can use custom syntax to add attrs for Markdown content.

<!-- more -->

## Config

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

## Usage

You can use `{attrs}` to add attrs to Markdown content.

For example, if you want a heading2 "Hello World" with a id "say-hello-world", you can write:

```md
## Hello World {#say-hello-world}
```

If you want a image with class "full-width", you can write:

```md
![img](link/to/image.png) {.full-width}
```

Also, other attrs are supported, so:

```md
A paragraph with some text. {#p .a .b align=center customize-attr="content with spaces"}
```

will be rendered into:

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  A paragraph with some text.
</p>
```

## Advanced

You can pass options to `plugins.mdEnhance.attrs` to customize plugin behavior.

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

## Demo

Text with `inline code`{.inline-code} and ![favicon](/favicon.ico){.image}, also supporting _emphasis_{.emphasis} and **bold**{.bold}.

| Table   |
| ------- |
| content |

{.table}

- list item{.list-item}

  - nested list item
    {.nested}

{.list}

A line with break  
{.break}

--- {.horizontal}

block content {.block}

```md
Text with `inline code`{.inline-code} and ![favicon](/favicon.ico){.image}, also supporting _emphasis_{.emphasis} and **bold**{.bold}.

| Table   |
| ------- |
| content |

{.table}

- list item{.list-item}

  - nested list item
    {.nested}

{.list}

A line with break  
{.break}

--- {.horizontal}

block content {.block}
```

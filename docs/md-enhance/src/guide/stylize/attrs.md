---
title: Attrs support
icon: code
---

You can use custom syntax to add attrs for Markdown content.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable attrs support
      attrs: true,
    }),
  ],
};
```

<!-- #region after -->

## Usage

You can use `{attrs}` to add attrs to Markdown content.

For example, if you want a heading2 "Hello World" with an id "say-hello-world", you can write:

```md
## Hello World {#say-hello-world}
```

If you want an image with class "full-width", you can write:

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

::: tip Escaping

Escaping can be done by adding `\` to escape the delimiter:

```md
### Heading \{#heading}
```

will be

### Heading \{#heading}

:::

## Advanced

You can pass options to `attrs` to customize plugin behavior.

```ts
type MarkdownItAttrRuleName =
  | "fence"
  | "inline"
  | "table"
  | "list"
  | "hr"
  | "softbreak"
  | "block";

interface MarkdownItAttrsOptions {
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

  /**
   * Rules to enable
   *
   * @default "all"
   */
  rule?: "all" | boolean | MarkdownItAttrRuleName[];
}
```

## Demo

> All class are styled with `margin: 4px;padding: 4px;border: 1px solid red;` to show the effect.

::: md-demo Inline

Text with `inline code`{.inline-code} and ![favicon](/favicon.ico){.image}, also supporting _emphasis_{.inline-emphasis} and **bold**{.inline-bold}.

:::

::: md-demo Block

block content {.block}

:::

::: md-demo Fence

```js {.fence}
const a = 1;
```

:::

::: md-demo Table

| Table   |
| ------- |
| content |

{.md-table}

:::

::: md-demo List

- list item{.list-item}

  - nested list item
    {.nested}

{.list-wrapper}

:::

::: md-demo Horizontal

--- {.horizontal}

:::

::: md-demo Softbreak

A line with break
{.break}

:::

<style scope>
.block,
.break,
.horizontal,
.image,
.inline-code,
.list-wrapper,
.list-item,
.nested,
.inline-emphasis,
.inline-bold,
.md-table,
.fence {
  margin: 4px;
  padding: 4px;
  border: 1px solid red;
}
</style>

<!-- #endregion after -->

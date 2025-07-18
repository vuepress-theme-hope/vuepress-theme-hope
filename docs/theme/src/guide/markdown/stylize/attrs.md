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

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    attrs: true,
  },
});
```

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

> All class are styled with `margin:4px;padding:4px;border: 1px solid red;` to show the effect.

::: preview Inline

Text with `inline code`{.inline-code} and ![favicon](/favicon.ico){.image}, also supporting _emphasis_{.inline-emphasis} and **bold**{.inline-bold}.

:::

::: preview Block

block content {.block}

:::

::: preview Fence

```js {.fence}
const a = 1;
```

:::

::: preview Table

| Table   |
| ------- |
| content |

{.md-table}

:::

::: preview List

- list item{.list-item}
  - nested list item
    {.nested}

{.list-wrapper}

:::

::: preview Horizontal

--- {.horizontal}

:::

::: preview Softbreak

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

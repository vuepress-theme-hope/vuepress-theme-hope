---
title: Superscript and Subscript
icon: superscript
category:
  - Markdown
tag:
  - Markdown
  - Superscript
  - Subscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-13} title=".vuepress/config.ts"
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

```js {7-12} title=".vuepress/config.js"
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

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

::: md-demo Demo

- 19^th^
- H~2~O

:::

::: md-demo Escaping

You can use `\` to escape `^` and `~`:

H\~2~O 19\^th^

:::

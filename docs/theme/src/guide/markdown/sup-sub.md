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

## Config

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

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

::: tip Escaping

- You can use `\` to escape `^` and `~`:

  ```md
  H\~2~O 19\^th^
  ```

  will be

  H\~2~O 19\^th^

:::

## Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

---
title: Superscript and Subscript
icon: superscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Settings

```js {7,9} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    }),
  ],
};
```

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

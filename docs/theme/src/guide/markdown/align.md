---
title: Custom alignment
icon: align-center
category:
  - Markdown
tag:
  - Align
  - Markdown
---

Customize content alignment.

<!-- more -->

## Config

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
        align: true,
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
        align: true,
      },
    },
  }),
};
```

:::

## Syntax

```md
::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::

::: justify
Contents to align justify
:::
```

::::: details Nesting and escaping

- Nesting can be done by increasing marker number of outer container:

  ```md
  :::: center
  Center contents...
  ::: left
  Left contents..
  :::
  Center contents...
  ::::
  ```

  will be

  :::: center
  Center contents...
  ::: left
  Left contents...
  :::
  Center contents...
  ::::

- Escaping can be done by adding `\` to escape the marker:

  ```md
  \::: left

  :::
  ```

  will be

  \::: left

  :::

:::::

## Demo

:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::

```md
:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::
```

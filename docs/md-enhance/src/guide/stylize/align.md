---
title: Alignment
icon: align-center
---

Customize content alignment.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Align
      align: true,
    }),
  ],
};
```

@tab JS

```js {8} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Align
      align: true,
    }),
  ],
};
```

:::

<!-- #region after -->

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

::::: md-demo Nesting

Nesting can be done by increasing marker number of outer container:

:::: center
Center contents...
::: left
Left contents...
:::
Center contents...
::::

:::::

:::: md-demo Escaping

\::: left

Escaping can be done by adding `\` to escape the marker

:::

::::

## Demo

::::: md-demo Real life example

:::: caution
VuePress Theme Hope V2 version is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::

:::::

<!-- #endregion after -->

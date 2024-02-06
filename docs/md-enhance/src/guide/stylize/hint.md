---
title: Hint box
icon: box-archive
---

The plugin adds tip, warning, danger, important, note, info and detail hint box.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable hint box
      hint: true,
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
      // Enable hint box
      hint: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## Demo

:::: md-demo Container with default title

::: important
Important container
:::

::: info
Information container
:::

::: note
Note container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: caution
Caution container
:::

::: details
Details container
:::

::::

:::: md-demo Customize container title

::: important Custom Title

A custom important container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: info Custom Title

A custom information container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: note Custom Title

A custom note container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: caution Custom Title

A custom caution container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#demo).

```js
const a = 1;
```

:::

::::

:::: md-demo Container without body

::: important Custom important
:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: caution Custom caution
:::

::::

<!-- #endregion after -->

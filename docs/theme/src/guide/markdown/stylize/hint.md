---
title: Hint box
icon: box-open
category:
  - Markdown
tag:
  - hintbox
  - Markdown
---

The theme adds tip, note, info, warning, danger and detail hint box.

<!-- more -->

## Settings

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      markdownHint: {
        // this is the default option, so you can use this feature directly
        hint: true,
      },
    },
  }),
};
```

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

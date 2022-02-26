---
title: Custom container
icon: customize
category:
  - Markdown
tag:
  - Container
  - Markdown
---

The theme adds tip, note, info, warning, danger and detail container.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {7-10}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-10}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  },
});
```

:::

::::

## Demo

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

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title

A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::

````md
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

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title
A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::
````

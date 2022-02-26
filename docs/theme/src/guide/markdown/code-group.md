---
title: CodeGroup
icon: code
category:
  - Markdown
tag:
  - CodeGroup
  - Markdown
---

The theme provides you you code group support.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        codegroup: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        codegroup: true,
      },
    },
  },
});
```

:::

::::

## Usage

You need to use `code-group` container outside, and place only `code-group-item` container inside it.

You need to set title for each `code-group-item` container, and place one code block in each `code-group-item` container.

If you want some item be actived by default, you can append a `:active` suffix at the end of title.

## Demo

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::

````md
:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::
````

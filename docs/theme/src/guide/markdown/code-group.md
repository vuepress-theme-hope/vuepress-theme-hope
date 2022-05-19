---
title: CodeGroup
icon: code
index: 3
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

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codegroup: true,
      },
    },
  }),
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codegroup: true,
      },
    },
  }),
};
```

:::

::::

## Usage

You need to use `code-group` container outside, and place only `code-group-item` container inside it.

You need to set title for each `code-group-item` container, and place one code block in each `code-group-item` container.

If you want some item be activated by default, you can append a `:active` suffix at the end of title.

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

---
title: CodeGroup
icon: code
---

The plugin provides you code group support.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // adds code group support
      codegroup: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // adds code group support
      codegroup: true,
    }),
  ],
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

---
title: Alignment
icon: align
---

By injecting configuration into vuepress-plugin-container, you can use

```md
::: center
Paragraph to center
:::

::: right
Right paragraph
:::
```

To customize your paragraph alignment.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
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

```js {8}
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // Enable Align
      align: true,
    }),
  ],
};
```

:::

## Demo

:::: danger
VuePress Theme Hope V2 version is still in W.I.P, the API may have

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
VuePress Theme Hope V2 version is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::
```

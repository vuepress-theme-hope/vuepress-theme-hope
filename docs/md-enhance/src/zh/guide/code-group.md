---
title: 代码块分组
icon: code
---

插件为你带来了代码块分组支持。

<!-- more -->

## 配置

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用代码块分组
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
      // 启用代码块分组
      codegroup: true,
    }),
  ],
};
```

:::

::::

## 使用

你需要在外围使用 `code-group` 容器，并仅在内部放置 `code-group-item` 容器。

你需要给 `code-group-item` 容器设置标题，并将待展示的单个代码块放入 `code-group-item` 容器中。

如果你需要令某个选项卡被默认激活，你可以在标题后补充 `:active` 后缀。

## 演示

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

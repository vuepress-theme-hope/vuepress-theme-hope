---
title: 代码块分组
icon: code
---

插件为你带来了代码块分组支持。

<!-- more -->

## 配置

::: code-tabs

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用代码块分组
      codetabs: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // 启用代码块分组
      codetabs: true,
    }),
  ],
};
```

:::

## 使用

你需要使用 `code-tabs` 容器，并在内部放置 `@tab` 标识和代码块。

你需要在 `@tab` 后设置标题。如果你需要令某个选项卡被默认激活，你可以在标识后补充 `:active` 后缀。

::: note

`code-tabs` 容器只允许在 `@tab` 标识之后的代码块，其他 Makrdown 内容均会被忽略。

:::

## 演示

::: code-tabs

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::

````md
::: code-tabs

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::
````

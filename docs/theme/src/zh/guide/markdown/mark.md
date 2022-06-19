---
title: 标记
icon: write
category:
  - Markdown
tag:
  - Markdown
  - 标记
---

让你的 VuePress 站点中的 Markdown 文件支持标记。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  }),
};
```

:::

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

## 例子

VuePress Theme Hope ==非常== 强大!

```md
VuePress Theme Hope ==非常== 强大!
```

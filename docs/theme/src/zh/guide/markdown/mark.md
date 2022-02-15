---
title: 标记
icon: write
category:
  - markdown
tag:
  - mark
  - markdown
---

让你的 VuePress 站点中的 Markdown 文件支持标记。

<!-- more -->

## 配置

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        mark: true,
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
        mark: true,
      },
    },
  },
});
```

:::

::::

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

## 例子

Mr.Hope ==十分== 帅

```md
Mr.Hope ==十分== 帅
```

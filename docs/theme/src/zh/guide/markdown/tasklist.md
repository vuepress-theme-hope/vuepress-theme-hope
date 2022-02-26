---
title: 任务列表
icon: check
category:
  - Markdown
tag:
  - Markdown
  - 任务列表
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

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
        tasklist: true,
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
        tasklist: true,
      },
    },
  },
});
```

:::

::::

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

## 例子

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```

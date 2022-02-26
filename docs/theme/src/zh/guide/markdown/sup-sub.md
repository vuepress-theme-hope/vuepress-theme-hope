---
title: 上下角标
icon: superscript
category:
  - Markdown
tag:
  - Markdown
  - 上下角标
---

让你的 VuePress 站点中的 Markdown 文件支持上下角标。

<!-- more -->

## 配置

:::: code-group

::: code-group-item TS

```ts {7-12}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // 启用下角标功能
        sub: true,
        // 启用上角标
        sup: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-12}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // 启用下角标功能
        sub: true,
        // 启用上角标
        sup: true,
      },
    },
  },
});
```

:::

::::

## 语法

- 使用`^ ^`进行上角标标注。
- 使用`~ ~`进行下角标标注。

## 例子

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

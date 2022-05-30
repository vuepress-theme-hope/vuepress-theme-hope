---
title: 上下角标
icon: superscript
---

让你的 VuePress 站点中的 Markdown 文件支持上下角标。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8,10}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用下角标功能
      sub: true,
      // 启用上角标
      sup: true,
    }),
  ],
};
```

@tab JS

```js {8,10}
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // 启用下角标功能
      sub: true,
      // 启用上角标
      sup: true,
    }),
  ],
};
```

:::

## 语法

- 使用 `^ ^` 进行上角标标注。
- 使用 `~ ~` 进行下角标标注。

## 例子

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

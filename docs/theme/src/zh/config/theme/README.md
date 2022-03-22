---
title: 主题配置
icon: config
category:
  - 配置
tag:
  - 主题配置
---

## 目录

- [主题基本配置](basic.md)

- [主题功能配置](feature.md)

- [主题布局配置](layout.md)

- [主题外观配置](apperance.md)

## 案例

你可以查看 [本文档的配置][docs-config] 作为案例。

## Helper 函数

我们提供了 `themeConfig` Helper 函数，你可以引入它来提供自动补全和校验:

:::: code-group

::: code-group-item TS

```ts {2,4,6}
// .vuepress/config.ts
import { themeConfig } from "vuepress-theme-hope";

export default themeConfig({
  // 此处放置主题配置
});
```

:::

::: code-group-item JS

```js {2,4,6}
// .vuepress/config.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  // 此处放置主题配置
});
```

:::

::::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/themeConfig.ts

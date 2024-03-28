---
title: 属性支持
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 属性
---

你可以使用特殊标记为 Markdown 元素添加属性。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/stylize/attrs.md#after -->

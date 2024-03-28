---
title: 自定义对齐
icon: align-center
category:
  - Markdown
tag:
  - Markdown
  - 对齐
---

自定义内容对齐方式。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        align: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/stylize/align.md#after -->

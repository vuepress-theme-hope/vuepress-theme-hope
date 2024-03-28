---
title: 提示容器
icon: box-open
category:
  - Markdown
tag:
  - Markdown
  - 提示容器
---

主题可以为你添加提示、注释、信息、注意、警告和详情提示容器的支持。

<!-- more -->

## 配置

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 这就是默认选项，所以你可以直接使用此功能
        hint: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/stylize/hint.md#after -->

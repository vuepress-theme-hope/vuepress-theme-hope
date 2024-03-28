---
title: 选项卡
icon: table-columns
category:
  - Markdown
tag:
  - Markdown
  - 选项卡
---

让你的 Markdown 文件支持供选项卡。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/content/tabs.md#after -->

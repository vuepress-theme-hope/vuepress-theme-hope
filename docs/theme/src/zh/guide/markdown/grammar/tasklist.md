---
title: 任务列表
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - 任务列表
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/grammar/tasklist.md#after -->

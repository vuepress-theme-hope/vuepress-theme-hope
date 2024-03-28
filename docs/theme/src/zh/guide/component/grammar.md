---
title: Component
icon: puzzle-piece
order: 3
category:
  - 组件
tag:
  - 组件
  - Markdown
---

你可以在 Markdown 中通过 component 代码块快速添加组件。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        components: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/content/component.md#after -->

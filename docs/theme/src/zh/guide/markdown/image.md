---
title: 图片
icon: image
category:
  - Markdown
tag:
  - Markdown
  - 图片
---

改进 Markdown 中的图像语法以支持颜色方案和大小。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {9-16} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 figure
        figure: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
      },
    },
  }),
});
```

@tab JS

```js {9-16}
/// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 figure
        figure: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/grammar/image.md#after -->

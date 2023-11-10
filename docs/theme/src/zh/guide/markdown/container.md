---
title: 自定义容器
icon: box-open
category:
  - Markdown
tag:
  - Markdown
  - 容器
---

主题可以为你添加提示、注释、信息、注意、警告和详情自定义容器的支持。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 这就是默认选项，所以你可以直接使用它
        container: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 这就是默认选项，所以你可以直接使用它
        container: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/stylize/container.md#after -->

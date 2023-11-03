---
title: 上下角标
icon: superscript
category:
  - Markdown
tag:
  - Markdown
  - 上下角标
---

让你的 VuePress 站点中的 Markdown 文件支持上下角标。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-13}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用下角标功能
        sub: true,
        // 启用上角标
        sup: true,
      },
    },
  }),
});
```

@tab JS

```js {7-12}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用下角标功能
        sub: true,
        // 启用上角标
        sup: true,
      },
    },
  }),
};
```

:::

## 语法

- 使用`^ ^`进行上角标标注。
- 使用`~ ~`进行下角标标注。

::: md-demo 案例

- 19^th^
- H~2~O

:::

::: md-demo 转义

你可以使用 `\` 来转义 `^` 和 `~`:

H\~2~O 19\^th^

:::

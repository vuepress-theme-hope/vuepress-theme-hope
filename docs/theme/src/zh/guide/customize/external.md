---
title: 外部脚本与样式
icon: wand-magic-sparkles
order: 7
category:
  - 教程
  - 自定义
tag:
  - 自定义
---

本教程将指导您如何将外部脚本和样式添加到您的站点。

<!-- more -->

## 全局

如果你需要添加全局的 CSS 与 JS，请在 VuePress [配置文件](../../cookbook/vuepress/config.md) 中配置 `head` 选项。

::: tip 例子

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  // ...

  head: [
    // ...

    // 导入一个外部脚本
    ["script", { src: "YOUR_SCRIPT_LINK" }],
    // 添加一段脚本
    [
      "script",
      {},
      `\
        // your script here
      `,
    ],
    // 添加一个外部 CSS
    ["link", { rel: "stylesheet", href: "YOUR_STYLE_LINK" }],
    // 添加一段样式
    // 我们不建议这么做，你应该首选使用 .vuepress/style/index.scss
    [
      "style",
      {},
      `\
        /* your style here */
      `,
    ],
  ],

  // ...
});
```

:::

## 每页

如果你需要添加页面级别的 CSS 与 JS，请在 [Front Matter](../../cookbook/vuepress/page.md#frontmatter) 中配置 `head` 选项。

```md
---
head:
  - script: YOUR_SCRIPT_LINK
  - script:
      type: module
      src: YOUR_SCRIPT_LINK
  - style: YOUR_STYLE_LINK
  - style:
      type: text/css
      content: |
        /* your style here */
---

页面内容

...
```

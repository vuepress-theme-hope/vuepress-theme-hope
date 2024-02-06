---
title: 内置组件
icon: puzzle-piece
order: 4
category:
  - 组件
tag:
  - 组件
  - Markdown
---

通过 `vuepress-plugin-components`，你可以在 Markdown 文件中导入并使用一些组件。

可用组件:

- ArtPlayer
- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
- Replit
- Share
- StackBlitz
- SiteInfo
- VPBanner
- VPCard
- VidStack
- XiGua

为了启用组件，你需要将 `plugins.components.components` 设置为一个组件名的数组。

<!-- more -->

::: note

`<Badge />` 默认可用的，以便与 `@vuepress/theme-default` 行为一直。

`<FontIcon />` 总会被启用，因为它被主题内部用于提供 [图标功能](../interface/icon.md)。

:::

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      components: {
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VPBanner",
          "VPCard",
          "VidStack",
          "XiGua",
        ],
      },
    },
  }),
});
```

@tab JS

```js {7-9} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      components: {
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VPBanner",
          "VPCard",
          "VidStack",
          "XiGua",
        ],
      },
    },
  }),
};
```

:::

## 杂项

### Badge

支持自定义颜色的徽章。

::: md-demo 徽章类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/utilities/badge.html">Badge</ProjectLink> 页面。

### SiteInfo

<!-- @include: @components/zh/guide/content/site-info.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/content/site-info.html">SiteInfo</ProjectLink> 页面。

### FontIcon

允许你显示字体图标的组件。

<!-- @include: @components/zh/guide/utilities/font-icon.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/utilities/font-icon.html">FontIcon</ProjectLink> 页面。

### Share

<!-- @include: @components/zh/guide/utilities/share.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/utilities/share.html">Share</ProjectLink> 页面。

## 媒体

## VidStack

> 先安装 `vidstack@1` 。

<!-- @include: @components/zh/guide/media/vid-stack.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/media/vid-stack.html">VidStack</ProjectLink> 页面。

### PDF

PDF 浏览器组件。

<!-- @include: @components/zh/guide/media/p-d-f.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/media/p-d-f.html">PDF</ProjectLink> 页面。

### BiliBili

在 Markdown 文件中嵌入 B 站视频。

<!-- @include: @components/zh/guide/media/bili-bili.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/media/bili-bili.html">BiliBili</ProjectLink> 页面。

### ArtPlayer

> 先安装 `artplayer` 。

<!-- @include: @components/zh/guide/media/art-player.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/media/art-player.html">ArtPlayer</ProjectLink> 页面。

## 代码相关

### CodePen

一个允许你嵌入 CodePen 演示的组件。

<!-- @include: @components/zh/guide/code/code-pen.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/code/code-pen.html">CodePen</ProjectLink> 页面。

### Replit

<!-- @include: @components/zh/guide/code/repl-it.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/code/repl-it.html">Replit</ProjectLink> 页面。

### StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- @include: @components/zh/guide/code/stack-blitz.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/code/stack-blitz.html">StackBlitz</ProjectLink> 页面。

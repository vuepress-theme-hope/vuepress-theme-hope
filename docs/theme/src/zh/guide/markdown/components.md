---
title: 组件
icon: puzzle-piece
category:
  - Markdown
tag:
  - Markdown
  - 组件
---

通过使用`vuepress-plugin-components`，你可以在你的 Markdown 文件中导入和使用一些组件。

可用组件:

- ArtPlayer
- AudioPlayer
- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
- Replit
- Share
- StackBlitz
- SiteInfo
- VidStack
- VideoPlayer
- XiGua
- YouTube

默认情况下，`<Badge />` 和 `<FontIcon />` 是启用的。

要启用组件，你应该使用组件名称数组设置 `plugin.components.components`。

<!-- more -->

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      components: {
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VidStack",
          "VideoPlayer",
          "XiGua",
          "YouTube",
        ],
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      components: {
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VidStack",
          "VideoPlayer",
          "XiGua",
          "YouTube",
        ],
      },
    },
  }),
};
```

:::

## Badge

支持自定义颜色的徽章。

::: md-demo 徽章类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/badge.html">Badge</ProjectLink> 页面。

## BiliBili

在 Markdown 文件中嵌入 B 站视频。

<!-- @include: @components/zh/guide/bilibili.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/bilibili.html">BiliBili</ProjectLink> 页面。

## CodePen

一个允许你嵌入 CodePen 演示的组件。

<!-- @include: @components/zh/guide/codepen.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/codepen.html">CodePen</ProjectLink> 页面。

## FontIcon

允许你显示字体图标的组件。

<!-- @include: @components/zh/guide/fonticon.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/fonticon.html">FontIcon</ProjectLink> 页面。

## PDF

PDF 浏览器组件。

<!-- @include: @components/zh/guide/pdf.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/pdf.html">PDF</ProjectLink> 页面。

## Replit

<!-- @include: @components/zh/guide/replit.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/replit.html">Replit</ProjectLink> 页面。

## Share

<!-- @include: @components/zh/guide/share.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/share.html">Share</ProjectLink> 页面。

## SiteInfo

<!-- @include: @components/zh/guide/siteinfo.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/siteinfo.html">SiteInfo</ProjectLink> 页面。

## StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- @include: @components/zh/guide/stackblitz.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/stackblitz.html">StackBlitz</ProjectLink> 页面。

## VidStack

> 先安装 `vidstack@1` 。

<!-- @include: @components/zh/guide/vidstack.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/vidstack.html">VidStack</ProjectLink> 页面。

## VideoPlayer

> 先安装 `plyr` 。

<!-- @include: @components/zh/guide/videoplayer.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/videoplayer.html">VideoPlayer</ProjectLink> 页面。

## YouTube

在 Markdown 文件中嵌入 YouTube 视频。

<!-- @include: @components/zh/guide/youtube.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/youtube.html">YouTube</ProjectLink> 页面。

## ArtPlayer

> 先安装 `artplayer` 。

<!-- @include: @components/zh/guide/artplayer.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/artplayer.html">ArtPlayer</ProjectLink> 页面。

## AudioPlayer

> 先安装 `plyr` 。

<!-- @include: @components/zh/guide/audioplayer.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/audioplayer.html">AudioPlayer</ProjectLink> 页面。

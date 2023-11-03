---
title: Components
icon: puzzle-piece
category:
  - Markdown
tag:
  - Components
  - Markdown
---

By using `vuepress-plugin-components`, you can import and use some components in your Markdown files.

Available components:

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

By default, `<Badge />` and `<FontIcon />` is enabled.

To enable components, you should set `plugin.components.components` with an array of components names.

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
        // components you want
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
        // components you want
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

::: md-demo Badge types

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

See <ProjectLink name="components" path="/guide/badge.html">Badge</ProjectLink> page for available props.

## BiliBili

Embed BiliBili videos in Markdown files.

<!-- @include: @components/guide/bilibili.md#demo -->

See <ProjectLink name="components" path="/guide/bilibili.html">BiliBili</ProjectLink> page for available props.

## CodePen

A component which allows you to embed CodePen demo.

<!-- @include: @components/guide/codepen.md#demo -->

See <ProjectLink name="components" path="/guide/codepen.html">CodePen</ProjectLink> page for available props.

## FontIcon

Component which allows you to display font icons.

<!-- @include: @components/guide/fonticon.md#demo -->

See <ProjectLink name="components" path="/guide/fonticon.html">FontIcon</ProjectLink> page for available props.

## PDF

PDF viewer component.

<!-- @include: @components/guide/pdf.md#demo -->

See <ProjectLink name="components" path="/guide/pdf.html">PDF</ProjectLink> page for available props.

## Replit

<!-- @include: @components/guide/replit.md#demo -->

See <ProjectLink name="components" path="/guide/replit.html">Replit</ProjectLink> page for available props.

## Share

<!-- @include: @components/guide/share.md#demo -->

See <ProjectLink name="components" path="/guide/share.html">Share</ProjectLink> page for available props.

## SiteInfo

<!-- @include: @components/guide/siteinfo.md#demo -->

See <ProjectLink name="components" path="/guide/siteinfo.html">SiteInfo</ProjectLink> page for available props.

## StackBlitz

Embed StackBlitz demo in Markdown files.

<!-- @include: @components/guide/stackblitz.md#demo -->

See <ProjectLink name="components" path="/guide/stackblitz.html">StackBlitz</ProjectLink> page for available props.

## VidStack

> Install `vidstack@1` first.

<!-- @include: @components/guide/vidstack.md#demo -->

See <ProjectLink name="components" path="/guide/vidstack.html">VidStack</ProjectLink> page for available props.

## VideoPlayer

> Install `plyr` first.

Embed videos in Markdown files.

<!-- @include: @components/guide/videoplayer.md#demo -->

See <ProjectLink name="components" path="/guide/videoplayer.html">VideoPlayer</ProjectLink> page for available props.

## YouTube

Embed YouTube video in Markdown files.

<!-- @include: @components/guide/youtube.md#demo -->

See <ProjectLink name="components" path="/guide/youtube.html">YouTube</ProjectLink> page for available props.

## ArtPlayer

> Install `artplayer` first.

<!-- @include: @components/guide/artplayer.md#demo -->

See <ProjectLink name="components" path="/guide/artplayer.html">ArtPlayer</ProjectLink> page for available props.

## AudioPlayer

> Install `plyr` first.

<!-- @include: @components/guide/audioplayer.md#demo -->

See <ProjectLink name="components" path="/guide/audioplayer.html">AudioPlayer</ProjectLink> page for available props.

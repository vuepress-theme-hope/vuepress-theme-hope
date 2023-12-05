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

## Badge

::: md-demo Badge types

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

See <ProjectLink name="components" path="/guide/utilities/badge.html">Badge</ProjectLink> page for available props.

## BiliBili

Embed BiliBili videos in Markdown files.

<!-- @include: @components/guide/media/bili-bili.md#demo -->

See <ProjectLink name="components" path="/guide/media/bili-bili.html">BiliBili</ProjectLink> page for available props.

## CodePen

A component which allows you to embed CodePen demo.

<!-- @include: @components/guide/code/code-pen.md#demo -->

See <ProjectLink name="components" path="/guide/code/code-pen.html">CodePen</ProjectLink> page for available props.

## FontIcon

Component which allows you to display font icons.

<!-- @include: @components/guide/utilities/font-icon.md#demo -->

See <ProjectLink name="components" path="/guide/utilities/font-icon.html">FontIcon</ProjectLink> page for available props.

## PDF

PDF viewer component.

<!-- @include: @components/guide/media/p-d-f.md#demo -->

See <ProjectLink name="components" path="/guide/media/p-d-f.html">PDF</ProjectLink> page for available props.

## Replit

<!-- @include: @components/guide/code/repl-it.md#demo -->

See <ProjectLink name="components" path="/guide/code/repl-it.html">Replit</ProjectLink> page for available props.

## Share

<!-- @include: @components/guide/utilities/share.md#demo -->

See <ProjectLink name="components" path="/guide/utilities/share.html">Share</ProjectLink> page for available props.

## SiteInfo

<!-- @include: @components/guide/content/site-info.md#demo -->

See <ProjectLink name="components" path="/guide/content/site-info.html">SiteInfo</ProjectLink> page for available props.

## StackBlitz

Embed StackBlitz demo in Markdown files.

<!-- @include: @components/guide/code/stack-blitz.md#demo -->

See <ProjectLink name="components" path="/guide/code/stack-blitz.html">StackBlitz</ProjectLink> page for available props.

## VidStack

> Install `vidstack@1` first.

<!-- @include: @components/guide/media/vid-stack.md#demo -->

See <ProjectLink name="components" path="/guide/media/vid-stack.html">VidStack</ProjectLink> page for available props.

## ArtPlayer

> Install `artplayer` first.

<!-- @include: @components/guide/media/art-player.md#demo -->

See <ProjectLink name="components" path="/guide/media/art-player.html">ArtPlayer</ProjectLink> page for available props.

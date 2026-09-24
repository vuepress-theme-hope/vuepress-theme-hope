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

- Badge: 多彩的徽章组件
- CodePen: 嵌入 CodePen 演示
- Share: 通过社交媒体分享当前页面
- StackBlitz: 嵌入 StackBlitz 演示
- SiteInfo: 显示站点
- VPBanner: 一个横幅组件
- VPCard: 一个卡片组件

为了启用组件，你需要将 `plugins.components.components` 设置为一个组件名的数组。

::: tip

媒体组件由 [`@vuepress/plugin-media`](../feature/media.md) 提供，它们通过 `plugins.media` 启用。

:::

<!-- more -->

::: note

`<Badge />` 是默认可用的，以便与 `@vuepress/theme-default` 行为一致。

:::

```ts twoslash {7-15} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    components: {
      // 你想使用的组件
      components: ["Badge", "CodePen", "Share", "SiteInfo", "StackBlitz", "VPBanner", "VPCard"],
    },
  },
});
```

## 杂项

### Badge

支持自定义颜色的徽章。

::: preview 徽章类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="important" type="important" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/utilities/badge.html">Badge</ProjectLink> 页面。

### SiteInfo

<!-- @include: @components/zh/guide/content/site-info.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/content/site-info.html">SiteInfo</ProjectLink> 页面。

### Share

<!-- @include: @components/zh/guide/utilities/share.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/utilities/share.html">Share</ProjectLink> 页面。

## 代码相关

### CodePen

一个允许你嵌入 CodePen 演示的组件。

<!-- @include: @components/zh/guide/code/code-pen.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/code/code-pen.html">CodePen</ProjectLink> 页面。

### StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- @include: @components/zh/guide/code/stack-blitz.md#demo -->

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/code/stack-blitz.html">StackBlitz</ProjectLink> 页面。

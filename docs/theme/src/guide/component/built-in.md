---
title: Built-in Components
icon: puzzle-piece
order: 4
category:
  - Component
tag:
  - Component
  - Markdown
---

By using `vuepress-plugin-components`, you can import and use some components in your Markdown files.

Available components:

- Badge: Colorful badge component
- CodePen: Embedded CodePen demo
- Share: Sharing current page with social medias
- StackBlitz: Embedded StackBlitz demo
- SiteInfo: Display sites
- VPBanner: A banner component
- VPCard: A card component

To enable components, you should set `plugins.components.components` with an array of components names.

::: tip

Media components are provided by [`@vuepress/plugin-media`](../feature/media.md), which are enabled via `plugins.media`.

:::

<!-- more -->

::: note

By default, `<Badge />` is available to align with `@vuepress/theme-default`.

:::

```ts twoslash {7-15} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    components: {
      // components you want
      components: ["Badge", "CodePen", "Share", "SiteInfo", "StackBlitz", "VPBanner", "VPCard"],
    },
  },
});
```

## Utilities

### Badge

::: preview Badge types

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="important" type="important" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

:::

See <ProjectLink name="components" path="/guide/utilities/badge.html">Badge</ProjectLink> page for available props.

### SiteInfo

<!-- @include: @components/guide/content/site-info.md#demo -->

See <ProjectLink name="components" path="/guide/content/site-info.html">SiteInfo</ProjectLink> page for available props.

### Share

<!-- @include: @components/guide/utilities/share.md#demo -->

See <ProjectLink name="components" path="/guide/utilities/share.html">Share</ProjectLink> page for available props.

## Code

### CodePen

A component which allows you to embed CodePen demo.

<!-- @include: @components/guide/code/code-pen.md#demo -->

See <ProjectLink name="components" path="/guide/code/code-pen.html">CodePen</ProjectLink> page for available props.

### StackBlitz

Embed StackBlitz demo in Markdown files.

<!-- @include: @components/guide/code/stack-blitz.md#demo -->

See <ProjectLink name="components" path="/guide/code/stack-blitz.html">StackBlitz</ProjectLink> page for available props.

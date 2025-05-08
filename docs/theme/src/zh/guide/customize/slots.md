---
title: 通过插槽自定义布局
icon: boxes-packing
order: 6
category:
  - 自定义
tag:
  - 自定义
  - 布局
  - 插槽
---

## 主题布局

主题提供了以下布局：

- Layout: 基础布局
- NotFound: 404 页面布局
- Slides（仅在启用 [reveal.js](../../guide/markdown/content/revealjs.md) 时可用）
- Blog（仅在启用 [blog](../../guide/blog/intro.md) 时可用）

## 通过插槽自定义布局

你可以通过 [客户端配置文件](../../cookbook/vuepress/config.md#客户端配置文件) 中的 `layouts` 选项添加新布局或覆盖现有布局。

<!-- #region layout -->

```vue title=".vuepress/layout/Home.vue"
<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- 覆盖默认 Hero 标志为更高级的，像主题主页一样 -->
    <template #heroLogo>
      <div>一个 3D 标志</div>
    </template>
  </Layout>
</template>
```

```vue title=".vuepress/layout/Layout.vue"
<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <!-- 通过 contentBefore 插槽在 Markdown 内容前添加广告 -->
    <template #contentBefore>
      <div>广告内容</div>
    </template>
    <!-- 使用 pageBottom 插槽引入评论组件 -->
    <template #pageBottom>
      <CommentService />
    </template>
  </Layout>
</template>
```

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Home from "./layouts/Home.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // 你可以在这里添加或覆盖布局
  layouts: {
    // 一个主页布局，带有自定义的 Hero 标志
    Home,
    // 例如，在这里我们将 vuepress-theme-hope 的默认布局更改为 layouts/Layout.vue
    Layout,
    // 我们还添加了一个 Changelog 布局
    Changelog,
  },
});
```

<!-- #endregion layout -->

基础布局可以从 `vuepress-theme-hope/client` 导入：

```ts
import { Layout, NotFound } from "vuepress-theme-hope/client";
```

博客布局可以从 `vuepress-theme-hope/blog` 导入：

```ts
import { Blog } from "vuepress-theme-hope/blog";
```

幻灯片布局可以从 `@vuepress/plugin-revealjs/layouts` 导入：

```ts
import { SlidePage } from "@vuepress/plugin-revealjs/layouts";
```

::: tip

常用插槽位置示例，详见:

- [页面插槽演示](../../demo/page-slot.md)
- [主页插槽演示](../../demo/home-slot.md)
- [博客插槽演示](../../demo/blog-slot.md)

:::

## `<Layout>` 的插槽

### 在所有布局中可用的插槽

- `default`

  页面内容插槽，是布局的主要插槽。

  覆盖插槽将覆盖整个页面内容（仅保留导航栏和侧边栏）。

  如果你有一些页面完全由 Vue 组件而不是 Markdown 构建，你可以覆盖这个插槽来构建自己的页面。

- `content`

  页面内容插槽，这将替换所有由 Markdown 生成的内容，包括来自 `contentBefore` 和 `contentAfter` 的内容。

- `contentBefore`

  在由 Markdown 生成的内容之前的插槽，在页面标题和目录之后。

  注意：当设置了 `content` 插槽时，此插槽将不起作用。

- `contentAfter`

  在由 Markdown 生成的内容之后的插槽，在页面元数据和页面导航之前。

  注意：当设置了 `content` 插槽时，此插槽将不起作用。

- `navScreenTop`

  导航屏幕顶部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

- `navScreenBottom`

  导航屏幕底部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

- `sidebarItems`: 侧边栏项目的插槽。

- `sidebarTop`: 侧边栏顶部的插槽。

- `sidebarBottom`: 侧边栏底部的插槽。

### 在内容页面中可用的插槽

- `pageTop`: 页面顶部的插槽。

- `pageBottom`: 页面底部的插槽。

- `toc`

  页面目录的插槽，接收一个标题数组。

  这将覆盖默认的目录元素。你可以使用这个插槽来构建自己的目录。

- `tocBefore`

  页面目录的插槽，在实际的目录之前。用于添加赞助商链接或广告。

- `tocAfter`

  页面目录的插槽，在实际的目录之后。可添加赞助商链接或广告。

### 主页中可用的插槽

- `heroInfo`: 主页英雄信息的插槽。

- `heroLogo`: 主页英雄标志的插槽。

- `heroBg`: 主页英雄背景的插槽。

- `heroBefore`: 主页英雄之前的插槽。

- `heroAfter`: 主页英雄之后的插槽。

### 在作品集页面中可用的插槽

- `portfolioInfo`: 作品集信息的插槽。

- `portfolioAvatar`: 作品集头像的插槽。

- `portfolioBg`: 作品集背景的插槽。

## `<NotFound>` 的插槽

- `default`: 404 页面内容插槽

- `navScreenTop`

  导航屏幕顶部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

- `navScreenBottom`

  导航屏幕底部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

## `<Blog>` 的插槽

### 在所有博客页面中可用的插槽

- `default`

  页面内容插槽，是布局的主要插槽。

  覆盖插槽将覆盖整个页面内容（仅保留导航栏和侧边栏）。

  如果你有一些页面完全由 Vue 组件而不是 Markdown 构建，你可以覆盖这个插槽来构建自己的页面。

- `navScreenTop`

  导航屏幕顶部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

- `navScreenBottom`

  导航屏幕底部的插槽。

  导航屏幕是当你在移动视图中点击右上角菜单按钮时弹出的屏幕。

- `articlesBefore`: 文章列表之前的插槽。

- `articlesAfter`: 文章列表之后的插槽。

- `bloggerInfo`: 博主信息的插槽。

- `infoBefore`: 博客信息面板之前的插槽。

- `infoAfter`: 博客信息面板之后的插槽。

### 在主页、分类、标签页面中可用的插槽

- `articleCover`: 文章封面的插槽。
- `articleTitle`: 文章标题的插槽。
- `articleInfo`: 文章信息的插槽。
- `articleExcerpt`: 文章摘要的插槽。

### 在博客主页中可用的插槽

- `content`

  页面内容插槽，这将替换所有由 Markdown 生成的内容，包括来自 `contentBefore` 和 `contentAfter` 的内容。

- `contentBefore`

  在由 Markdown 生成的内容之前的插槽，在页面标题和目录之后。

  注意：当设置了 `content` 插槽时，此插槽将不起作用。

- `contentAfter`

  在由 Markdown 生成的内容之后的插槽，在页面元数据和页面导航之前。

  注意：当设置了 `content` 插槽时，此插槽将不起作用。

- `heroInfo`: 主页英雄信息的插槽。

- `heroLogo`: 主页英雄标志的插槽。

- `heroBg`: 主页英雄背景的插槽。

- `heroBefore`: 主页英雄之前的插槽。

- `heroAfter`: 主页英雄之后的插槽。

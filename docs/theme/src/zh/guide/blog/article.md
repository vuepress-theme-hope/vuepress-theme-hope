---
title: 文章列表
icon: clipboard-list
order: 3
category:
  - 博客
tag:
  - 博客
  - 文章
  - 加密
  - 幻灯片
  - 星标
---

主题会自动汇总所有文章，并在 `/article/` 路由下渲染文章列表。

![Article list](./assets/article-list-light.png#light)
![Article list](./assets/article-list-dark.png#dark)

## 文章配置

默认情况下，所有 Markdown 文件都会被添加至文章列表。

- **排除文章：** 在页面的 Frontmatter 中设置 `article: false`，或通过主题选项中的 `plugins.blog.filter` 配置自定义过滤逻辑。
- **置顶文章：** 在 Frontmatter 中设置 `sticky: true` 可将文章固定在列表顶部。

::: tip
若需精确控制置顶文章的排序权重，可为 `sticky` 赋予数字（例如 `sticky: 2`）。数值越大的文章越靠前。
:::

## 摘要 (Excerpt)

### 添加摘要

在 Markdown 文件中使用 `<!-- more -->` 注释可以标记摘要。该标记前的所有内容会被提取为文章摘要。

如果需要覆盖默认提取的内容，可以通过 Frontmatter 中的 `excerpt` 选项直接传入一段 HTML 字符串作为摘要。

### 摘要提取

主题默认会自动提取文章摘要。

如需禁用自动生成并仅展示手动标记的摘要或 Frontmatter 中的描述，请在主题选项中设置 `plugins.blog.excerptLength: 0`。

::: warning 摘要限制

- 开发环境：出于性能考量，开发服务器默认禁用自动摘要生成功能。如需启用，请配置 [`hotReload`](../../config/theme/basic.md#hotreload) 选项。
- 上下文隔离：使用 `<!-- more -->` 标记的摘要会被独立提取并渲染为 HTML 字符串。摘要外部的内容不会参与渲染上下文。因此：
  - `[[toc]]` 目录标记无法获取摘要外部的标题结构。
  - 定义在摘要外部的引用链接与脚注无法被正确渲染。
- DOM 注入限制：摘要会利用 `innerHTML` 直接注入 DOM。Vue 组件及特定语法将被解析为原生 HTML 标签，无法正常渲染。

:::

## 星标文章 (Star)

在 Frontmatter 中设置 `star: true` 可将文章标记为星标（精选文章）。星标文章将被汇总在 `/star/` 路由下，并会在博客主页侧边栏中高亮展示。

::: tip
为 `star` 赋予数字（例如 `star: 5`）可控制星标文章的展示顺序。数值越大的文章越靠前。
:::

## 自定义文章类型 <Badge text="Advanced" type="info" />

通过主题选项中的 `plugins.blog.type` 数组，你可以定义额外的文章分类列表。

每个类型对象支持以下配置：

- `key`：唯一字符串标识（不可包含特殊字符）。默认生成 `/<key>/` 路由路径。
- `filter`：函数 `(page) => boolean`，用于判断页面是否属于该类型。
- `sorter`：函数 `(pageA, pageB) => number`，用于控制列表内文章的排序规则。
- `path`：自定义路由路径（覆盖默认的 `/<key>/` 路径）。
- `frontmatter`：函数 `(localePath) => object`，用于定义生成的布局页面的 Frontmatter（通常用于配置 `title`）。

::: note
`layout` 属性默认为主题内置的 `Blog` 布局。**仅当**你为该文章类型专门开发了自定义布局组件时，才需要修改此值。
:::

为确保自定义类型在 UI 中正确显示名称，请应用以下任一方法：

- 在主题选项的 `blogLocales` 中将 `key` 映射为本地化字符串。
- 在 `frontmatter` 配置函数中显式返回 `title` 属性。

::: details 示例配置

创建针对 `slide`（幻灯片）和 `original`（原创）类型的自定义列表：

```ts twoslash title=".vuepress/theme.ts"
import { dateSorter } from "@vuepress/helper";
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  blogLocales: {
    slide: "幻灯片",
    original: "原创",
  },

  plugins: {
    blog: {
      type: [
        {
          key: "slide",
          filter: (page) => page.frontmatter.layout === "Slide",
        },
        {
          key: "original",
          filter: (page) => !!page.frontmatter.original,
          sorter: (pageA, pageB) => dateSorter(pageA.frontmatter.date, pageB.frontmatter.date),
        },
      ],
    },
  },
});
```

:::

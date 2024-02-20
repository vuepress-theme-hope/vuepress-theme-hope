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

主题默认在 `/article/` 路径下为你提供了全部的文章列表。

<!-- more -->

## 文章

所有文章都会默认被添加到文章列表中渲染在 `/article/` 路径下。

![文章列表](./assets/article-list-light.png#light)
![文章列表](./assets/article-list-dark.png#dark)

如果你不希望该列表包含一些特定的文章，只需在文章的 frontmatter 中将 `article` 设置为 `false`，或者你也可以通过主题选项中的 `plugins.blog.filter` 自定义哪些页面是文章。

如果你希望在文章列表中置顶特定文章，只需在文章的 frontmatter 中将 `sticky` 设置为 `true`。

::: tip 置顶顺序

对于置顶文章，你可以将 `sticky` 设置为 `number` 来设置它们的顺序。数值大的文章会排列在前面。

:::

## 文章摘要

### 添加摘要

如果你想要为文章添加摘要，你可以使用 `<!-- more -->` 注释来标记它。任何在此注释之前的内容会被视为摘要。

同时，如果你想设置的摘要并不是你要在文章开头展示的内容，你也可以在 Frontmatter 中通过 `excerpt` 选项来设置 HTML 字符串。

### 自动生成摘要

主题默认情况下会自动生成摘要。

如果你只想让主题展示你指定的摘要或在 Frontmatter 中设置的描述，请在主题选项中设置 `plugins.blog.excerptLength: 0`。

::: warning 摘要限制

出于性能考虑，默认情况下开发服务器中不提供自动摘录生成功能，请使用 [hotReload](../../config/theme/basic.md#hotreload) 启用它。

我们推荐你优先使用 `<!-- more -->` 来标记摘要。如果你的确需要一个特别的摘要的话，请自己设置在 Front Matter。

对于使用注释标记的摘要，我们会从原始文件分离出的摘要内容并将它们渲染成 HTMLString，所以在摘要外的内容**不会参与摘要渲染**，相关限制如:

- `[[toc]]` 标记无法获得文章其他部分的标题
- 如果链接和脚注的引用内容在摘要外，它们无法正确渲染

另外由于两种情况都是通过 `innerHTML` 直接插入到 DOM，这意味着任何组件都会解析为原生标签，不会正常渲染成 Vue 组件。

:::

## 星标文章

你可以通过在 frontmatter 中设置 `star` 为 `true` 星标一个文章。星标后，用户就可以在 `/star/` 页面中查看这些文章。

同时任何任何星标的文章都会显示在博客主页侧边栏的文章栏目中。

::: info

我们提供星标选项的考虑是: 主题使用者可能希望向访客展示一定数量的精品文章，而又不希望置顶文章充斥主页，导致用户不能看到最近更新的文章。

:::

::: tip 星标顺序

类似置顶文章，你同样可以将 `star` 设置为 `number` 来设置它们的顺序。数值大的文章会排列在前面。

:::

## 其他类型的文章 <Badge text="高级" type="info" />

该主题为其他文章类型提供了单独的列表。

要添加其他文章类型，你应该在主题选项中设置 `plugins.blog.type`。它应该是一个一数组包含描述你想要的类型的配置对象。

每个类型都应该有一个唯一的键 (不含特殊字符)，以及一个 `filter` 函数来确定页面是否应该是该类型。 `filter` 函数应该接受页面对象并返回一个布尔值。

要对类型列表中的页面进行排序，你还可以设置 `sorter` 选项。 `sorter` 函数应该接受两个页面对象并返回一个数字。

默认情况下，类型列表路径为 `/key/` (`key` 被替换为实际键)。 你还可以通过在选项中设置 `path` 来设置自定义路径。

`frontmatter` 选项控制布局页面的 frontmatter，它是一个接受 `localePath` 并返回 frontmatter 对象的函数。该选项在设置布局页面的标题时很有用。

::: note

`layout` 是布局名称，默认为 `BlogType`，是一个 `vuepress-theme-hope` 注册的布局。 仅当你为类型列表构建自定义布局时，才应将此选项设置为你的布局值。

:::

你还需要在主题语言环境中使用实际类型名称设置 `blogLocales[key]`，以便主题可以正确显示类型名称。

为了方便上手，我们在这里展示一些示例。

::: details 示例

1. 增加了一种幻灯片页面。

   所有幻灯片页面都应在 frontmatter 中包含 `layout: Slide`。 并且顺序无关紧要。

1. 添加原创类型。

你应设置以下选项：

```ts
import { compareDate } from "@vuepress/helper";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // other config
  // ...

  theme: hopeTheme({
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
            filter: (page) => page.frontmatter.original,
            sorter: (pageA, pageB) =>
              compareDate(pageA.frontmatter.date - pageB.frontmatter.date),
          },
        ],
      },
    },
  }),
});
```

:::

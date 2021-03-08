---
title: 博客功能介绍
icon: blog
category: blog
tags:
  - blog
  - intro
---

主题通过引入 `@vuepress/plugin-blog` **默认**启用了一些博客功能。

如果你不需要任何的博客功能 (比如一个纯文档站点)，你可以配置 `themeConfig.blog` 为 `false` 来禁用全部的博客功能。

<!-- more -->

## 综述

总体上，通过启用博客功能，主题允许你通过页面的 frontmatter，为页面配置分类、标签、是否是文章、是否出现在时间线中、收藏、置顶等功能。

- [文章列表](article.md)

- [分类与标签](category-and-tags.md)

- [时间线](timeline.md)

同时主题还为你提供了 [博客风格的主页](home.md)。

## 侧边栏

主题提供了一个博客相关的侧边栏。该侧边栏会在博客相关的页面显示 (在桌面会显示在右侧，在移动视图下收起到侧边栏中)

你可以通过 `themeConfig.blog.sidebarDisplay` 控制该侧边栏在非博客相关的页面的显示行为。可选的值有 `'mobile' | 'none' | 'always'`。默认为 `mobile`，即当你在移动视图下访问非博客相关的页面时，你也可以在侧边栏看到它。

## 分页配置

对于所有页面的文章列表，我们都会在底部显示一个分页组件。你可以通过这个组件快捷的在首页、尾页、前后两页进行跳转。你也可以输入数字跳转到指定页面。

默认每个分页的文章数为 `10`，你可以设置 `themeConfig.blog.perPage` 来覆盖它。

## 注意事项

::: warning

请勿在根目录中添加并放置对应的文件夹("article", "slide", "star", "encrypt", "category", "tag", "timeline")，否则可能造成编译时文件被覆盖而造成错误。

比如你的确需要一个“文章”文件夹的话，请考虑使用 "articles"。

:::

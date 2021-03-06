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

总体上，通过启用主题功能，主题允许你通过页面的 frontmatter，为页面配置分类、标签、是否是文章、是否出现在时间线中、收藏、置顶等功能。

## 文章

所有文章都会默认被添加到文章列表中渲染在 `/article/` 路径下。

如果你不希望该列表包含一些特定的文章，只需在文章的 frontmatter 中将 `article` 设置为 `false`。

如果你希望置顶特定文章，只需在文章的 frontmatter 中将 `sticky` 设置为 `true`。

## 时间线

所有注明了写作日期的文章都会被按照时间排序在 `/timeline/` 时间线中。

如果你不希望某篇文章被包含，只需在文章的 frontmatter 中将 `timeline` 设置为 `false`。

::: warning

请勿在根目录中添加并放置对应的文件夹("tag", "article", "timeline")，否则可能造成编译时文件被覆盖而造成错误。

如果你的确需要一个“文章”文件夹的话，请考虑使用 "articles"。

:::

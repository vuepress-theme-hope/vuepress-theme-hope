---
icon: blog
category: function
tags:
  - blog
  - function
---

# 博客相关

主题通过配置 `@vuepress/plugin-blog` 启用了一些博客功能。

## 分类

只需要在页面的 frontmatter 中添加 `category: <分类名>` ，该文章会自动渲染在 `/category/` 分类页面的列表中。

![category](./assets/category.png)

请注意，一篇文章只能设置一个分类。

## 标签

只需要在页面的 frontmatter 中添加 `tags: <分类名>` 即可，该文章就会自动列出在 `/tag/` 标签页面的列表中。

`tags` 接受 `string | string[]`，也就是说一个文章可以包含多个标签。

::: warning
请勿在根目录中添加并放置对应的文件夹，否则可能造成渲染错误。
:::

## 文章

所有文章都会默认被添加到文章列表中渲染在 `/article/` 路径下。

如果你不希望该列表包含一些特定的文章，只需在对应文章的 Frontmatter 中将 `article` 设置为 `false`。

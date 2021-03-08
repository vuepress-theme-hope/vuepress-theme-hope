---
title: Blog Intro
icon: blog
category: blog
tags:
  - blog
  - feature
---

The theme enables some blogging features using `@vuepress/plugin-blog` by default.

If you don’t need any blog features (such as a pure documentation site), you can set `themeConfig.blog` to `false` to disable all blog features.

<!-- more -->

## General

In general, by enabling blog feature, the theme allows you to configure the category, tag, whether it is an article, whether it appears in the timeline, stars, and sticky features for the page through the frontmatter of the page.

- [Article List](article.md)

- [Category and Tags](category-and-tags.md)

- [Timeline](timeline.md)

At the same time, the theme also provides you with a [blog-style homepage](home.md).

## Sidebar

The theme provides a blog info sidebar. The sidebar will be displayed on the blog-related page (it will be displayed on the right side on the desktop, and retracted into the sidebar in mobile view)

You can control the display behavior of the sidebar on non-blog related pages through `themeConfig.blog.sidebarDisplay`. Optional values ​​are `'mobile' |'none' |'always'`. The default is `mobile`, that is, when you visit non-blog related pages in mobile view, you can also see it in the sidebar.

## Pagination

For the list of articles on all pages, we will display a pagination component at the bottom. You can use this component to quickly jump to the first page, the last page, and the two pages before and after. You can also enter a number to jump to the specified page.

The default number of articles per page is `10`, you can set `themeConfig.blog.perPage` to override it.

## Note

::: warning

Do not add and place the corresponding folders ("article", "slide", "star", "encrypt", "category", "tag", "timeline") in the root directory, otherwise the files may be overwritten during compilation and cause errors.

For example if you do need an "articles" folder, consider using "articles".

:::

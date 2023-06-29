---
title: Blog Intro
icon: blog
order: 1
category:
  - Blog
tag:
  - Blog
  - Intro
---

The theme supports blog feature with`vuepress-plugin-blog2` by default, and it's **disabled by default**.

If you need blog functionality, you can set `plugins.blog: true` in theme options to enable blog functionality.

<!-- more -->

## Intro

After enabling the blog function, the theme allows you to configure categories, tags, whether it is an article, whether it appears in the timeline, stars, sticky and other functions through the frontmatter of the page.

::: tip Demo

[Here is a demo](https://mister-hope.com/en/) for you to preview blog sites built with `vuepress-theme-hope`.

:::

## I18n Support

The theme adds support for i18n in blog system. You can set different blog config for each language using `locales` in theme options.

When you have multiple languages, the article list, timeline, etc. under each language will remain independent.

## Sidebar

The theme provides a blog info sidebar. The sidebar will be displayed on the blog-related page (it will be displayed on the right side on the desktop, and retracted into the sidebar in mobile view)

You can control the display behavior of the sidebar on non-blog related pages through `blog.sidebarDisplay` in theme options. Optional values are `"mobile" | "none" | "always"`. The default is `"mobile"`, that is, when you visit non-blog related pages in mobile view, you can also see it in the sidebar.

## Pagination

For the list of articles on all pages, we will display a pagination component at the bottom. You can use this component to quickly jump to the first page, the last page, and the two pages before and after. You can also enter a number to jump to the specified page.

The default number of articles per page is `10`, you can set `blog.articlePerPage` in theme options to override it.

## Limitation

::: warning Hot update disabled by default

For performance reasons, hot updates are not enabled for blog-related data by default in devServer, i.e. if you add new articles or modify the categories, time, tags, sticky, star, etc. of existing articles, the related data of the entire site will not update until you restart devServer.

In addition, since the blog information will be written to the underlying data of VuePress, modifying this file will cause application restart, so reading time (including word count information) which are sensitive to Markdown content will not take effect in devServer.

If you want these to take effect or be updated in real time, you need to set `hotReload: true` and accept the fact that each modification will trigger a page refresh and some time having white screen due to heavy recomputing work.

:::

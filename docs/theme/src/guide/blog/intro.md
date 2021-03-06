---
title: Blog support Intro
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

## Article

All articles will be added to the article list by default and rendered under path `/article/` .

If you don’t want specific articles to be included, set `article` to `false` in the article’s frontmatter.

To stick a specific article, set `sticky` to `true` in the article’s frontmatter.

## Timeline

All articles with a writing date will be sorted by time in the timeline page `/timeline/`.

If you don’t want an article to be included, set `timeline` to `false` in the article’s Frontmatter.

::: warning

Do not add and place the corresponding folders ("tag", "article", "timeline") in the root directory, otherwise the files may be overwritten during compilation and cause errors.

If you do need an "articles" folder, consider using "articles".

:::

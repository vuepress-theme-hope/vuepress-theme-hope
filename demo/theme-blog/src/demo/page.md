---
# This is the title of the article
title: Page Config
# This is the icon of the page
icon: page
# This control sidebar order
order: 1
# Set author
author: Ms.Hope
# Set writing time
date: 2020-01-01
# A page can have multiple categories
category:
  - Guide
# A page can have multiple tags
tag:
  - Page config
  - Guide
# this page is sticky in article list
sticky: true
# this page will appear in starred articles
star: true
# You can customize footer content
footer: Footer content for test
# You can customize copyright content
copyright: No Copyright
---

Content before `more` comment is regarded as page excerpt.

<!-- more -->

## Page Information

You can set page information in Markdown’s Frontmatter.

- The author is Ms.Hope.
- The writing date is January 1, 2020
- Category is "Guide"
- Tags are "Page Config" and "Guide"

## Page Content

You are free to write your Markdown here.

::: tip Assets

- You can place images besides your Markdown files, but you should use **relative links** (i.e.: starting with `./`) for them.

- For images in `.vuepress/public` directory, please use absolute links (i.e.: startingwith `/`) for them.

:::

The theme contains a custom badge:

> A dark blue badge text badge at the end of line. <Badge text="Badge text" color="#242378" />

## Page Structure

This page should contain:

- [BreadCrumb](https://vuepress-theme-hope.github.io/v2/guide/layout/breadcrumb.html)
- [Title and infomation](https://vuepress-theme-hope.github.io/v2/guide/feature/page-info.html)
- [TOC (Table of Contents)](https://vuepress-theme-hope.github.io/v2/guide/layout/page.html#header-list)
- [Meta infomation including update time and contributors](https://vuepress-theme-hope.github.io/v2/guide/feature/meta.html)
- [Comments](https://vuepress-theme-hope.github.io/v2/guide/feature/comment.html)
- [Navbar](https://vuepress-theme-hope.github.io/v2/guide/layout/navbar.html)
- [Sidebar](https://vuepress-theme-hope.github.io/v2/guide/layout/sidebar.html)
- [Footer](https://vuepress-theme-hope.github.io/v2/guide/layout/footer.html)
- Back to top button

You can customize them in theme options and page frontmatter.

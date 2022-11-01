---
title: Theme intro
icon: info
order: 1
category:
  - Get Started
tag:
  - Get Started
  - Intro
---

## Original intention

The original intention of building this theme was to find that VuePress is just a pure static document generator. For example, it will not inject meta tags for SEO optimization, nor will it generate a Sitemap to help search engines index the content of the document.

Though VuePress has extended Markdown syntax to a certain extent, it still lacks some commonly used functions, such as text alignment, mark, flowchart, formula, presentation, etc. At the same time, some features provided by the default theme are weak or missing, such as picture preview, dark mode, etc.

In this case, the design of `vuepress-theme-hope` was born.

This theme not only **greatly improve outlook** comparing to `@vuepress/theme-default`, but also **dedicates to provide a full range of enhancements for VuePress** with its plugins.

::: warning This project is not only a theme

Although [vuepress-theme-hope/vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope) itself marked as a theme repository, it also contains more than a dozen equally complete and powerful plugin. Each plugin is also powerful, can be used with the default theme or third-party themes.

Based on such a dozen plugins, Mr.Hope can confidently say that `vuepress-theme-hope` is "**A powerful theme with tons of features**". It can also be seen as the most versatile and comprehensive theme among all VuePress themes.

:::

## Design Goals

::: info V1 Goal

- Direction: All the functions are to enhance the document **content richness** and **shareable**.

- Powerful and independent functions: The theme provides comprehensive details on functions and decompose them into independent plugins so users can use them in other themes.

- Zero or simple configuration: All functions of this theme are designed to work under zero or simple configuration to reduce your migration or learning costs while directly enjoy their convenience.

:::

Based on the goal V1 achieved, v2 is further carried out:

- Improved outlook: The theme interface is not based on the layout and style of the default theme, but has been completely refactored.

- Decoupling Features: With the help of Vue3’s composition API, the theme fully achieve "Tree-shaking" while remaining powerful.

  The theme will only run which features you need, without being slowed down by other features or affecting the build size.

## Why Powerful

### Content Richness

The theme provides a lot of extended syntax support for Markdown, allowing you to insert more content in the body.

- If you are a literature lover and want to place some essays, the theme provides [Custom Alignment](../markdown/align.md) and [footnote](../markdown/footnote.md).

- To store some knowledge notes, the theme provides [Custom container](../markdown/container.md), [Mark](../markdown/mark.md), [Badge](../markdown/components.md)、Task list](../markdown/tasklist.md) and [Tex](../markdown/tex.md) support.

- If you are a programmer and need to show a lot of codes and demos, this theme provides light and dark themes for code blocks, [code tabs](../markdown/code-tabs.md) and the ["one-click copy" button](../feature/copy-code.md). At the same time, we also provide the [Code Demo](../markdown/demo.md) function, which is convenient for you to show your own Vue, React components or other demos.

- If you are providing product documentation and presentation, the theme provides [tabs](../markdown/tabs.md), [slide](../markdown/presentation.md), [chart](../markdown/chart.md), [flowchart](../markdown/flowchart.md), [mermaid diagram](../markdown/mermaid.md) functions.

In short, anyone can enjoy the convenience of Markdown’s enhanced syntax.

### Page UI

- [Icon Support](../interface/icon.md)

- Page: [Page information](../feature/page-info.md), TOC and [picture preview function](../feature/photo-swipe.md).

- Site structure:

  Rebuild mobile navbar

  simplified [Navbar](../layout/navbar.md) and [Sidebar](../layout/sidebar.md) config, add support for icons and path prefixes.

- Layout: adds [breadcrumb](../layout/breadcrumb.md) and [footer](../layout/footer.md) support.

- [Homepage](../layout/home.md): New outlook, features support icons and links.

- [Code Block Theme Customize](../interface/code-theme.md): Allows you to freely customize the code block style

### Search Function

The theme adds [built-in support for the official VuePress search plugin](../feature/search.md).

### Full Blog Support

The theme is containing full blog support, you can use the brand new [blog homepage](../blog/home.md).

- provides [categories, tags](../blog/category-and-tags.md), [timeline](../blog/timeline.md), [star articles](../blog/article.md) and other functions.

- Provides [Comment and PageViews](../feature/comment.md) feature to let you communicate with your visitors

- Provides [Feed](../advanced/feed.md) generation, so that others can subscribe your site.

### Search Engine Optimization

- Provides [SEO Enhance](../advanced/seo.md), will automatically inject information to fully support OGP and JSON-LD protocols, and enhance search engine indexing.

- Provides [Sitemap Generation](../advanced/sitemap.md)

- Provides [PWA](../advanced/pwa.md)

### Others

- Provide [Copyright Information Append](../feature/copyright.md) function, which can append copyright information when users copy content, or disable page copy and selection
- Provide [article encryption](../feature/encrypt.md) function to protect private information

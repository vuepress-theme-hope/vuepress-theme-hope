---
title: Theme intro
icon: circle-info
star: true
order: 1
category:
  - Get Started
tag:
  - Get Started
  - Intro
---

## Original Intention

The original intention of building this theme was to find that VuePress default theme is just a theme to provide basic documentation layout.

For example, it will not inject meta tags for SEO optimization, nor will it generate a Sitemap to help search engines index the content of the document.

Though VuePress has extended Markdown syntax to a certain extent, it still lacks some commonly used functions, such as text alignment, mark, flowchart, formula, presentation, etc. At the same time, some features provided by the default theme are weak or missing, such as picture preview, dark mode, etc.

In this case, the design of `vuepress-theme-hope` was born.

This theme not only **greatly improve outlook** comparing to `@vuepress/theme-default`, but also **dedicates to provide a full range of enhancements for VuePress** with its plugins.

::: warning A project with plugins and powerful theme

Although [vuepress-theme-hope/vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope) itself marked as a theme repository, it also contains more than a dozen equally complete and powerful plugin. Each plugin is also powerful, can be used with the default theme or third-party themes.

Based on such a dozen plugins, Mr.Hope can confidently say that `vuepress-theme-hope` is "**A powerful theme with tons of features**". It can also be seen as the most versatile and comprehensive theme among all VuePress themes.

:::

## Design Goals

- ### Powerful and independent features

  We extract each feature into a plugin, so that users can use them in other themes or customize their behavior standalone.

- ### Minimum Configuration

  All features will try to generate a default value if possible, so you can use them under zero or minimum configuration.

  This helps a lot to reduce your migration or learning costs while directly enjoy their convenience.

- ### Improved Layout

  The theme interface has been completely refactored to provide customizable and beautiful layouts.

- ### Tree-shaking

  With the help of Vue3's composition API, the theme fully achieve "Tree-shaking" while remaining powerful.

  The theme will only run with features you want, without being slowed down by other features or affecting the bundle size.

## Why Powerful

### Content Richness

The theme provides a lot of extended syntax support for Markdown, allowing you to insert more content in the body.

- If you are a literature lover and want to place some essays, the theme provides [Custom Alignment](../markdown/align.md) and [footnote](../markdown/footnote.md).

- To store some knowledge notes, the theme provides [Custom container](../markdown/container.md), [Mark](../markdown/mark.md), [Badge](../markdown/components.md), [Task list](../markdown/tasklist.md) and [Tex](../markdown/tex.md) support.

- If you are a programmer and need to show a lot of codes and demos, this theme provides light and dark themes for code blocks, [code tabs](../markdown/code-tabs.md) and the ["one-click copy" button](../feature/copy-code.md). At the same time, we also provide the [Code Demo](../markdown/demo.md), [Playground](../markdown/playground.md) and [Vue Playground](../markdown/vue-playground.md) functions, which is convenient for you to show your own Vue, React components or other demos and provide playground for visitors.

- If you are providing product documentation and presentation, the theme provides [tabs](../markdown/tabs.md), [slide](../markdown/presentation.md), [chart](../markdown/chart.md), [flowchart](../markdown/flowchart.md), [mermaid diagram](../markdown/mermaid.md) functions.

In short, anyone can enjoy the convenience of Markdown's enhanced syntax.

### UI Improvements

- [Darkmode Support](../interface/darkmode.md)

- [Icon Support](../interface/icon.md)

- [Customizing Code Block Theme](../interface/code-theme.md)

- [Full A11y support](../interface/accessibility.md)

- [Page information](../feature/page-info.md)

- [Picture Preview function](../feature/photo-swipe.md).

### Layouts Improvement

- [Navbar](../layout/navbar.md):

  Icons and path prefixes are supported.

  Navbar on mobile layout has been fully rebuilt.

- [Sidebar](../layout/sidebar.md):

  Icons and path prefixes are supported.

  Sidebar can be generated from [page headings](../layout/sidebar.md#generate-from-headers) and [file structure](../layout/sidebar.md#generate-from-file-structure) automatically.

- [Homepage](../layout/home.md)

  Brand-new outlook, supports icons and links in features.

- [Catalog](../layout/catalog.md)

  Automatically catalog page generation.

- More:

  Adds [breadcrumb](../layout/breadcrumb.md), [toc](../layout/page.md#header-list) and [footer](../layout/footer.md) support.

### Search

- built-in support for [official VuePress search plugins](../feature/search.md).

- search-pro plugin to [provide powerful client search](../feature/search.md#use-vuepress-plugin-search-pro).

### Blog Support

The theme supports blogging layout, you can use the brand-new [blog homepage](../blog/home.md).

- Provides [categories, tags](../blog/category-and-tags.md), [timeline](../blog/timeline.md), [star articles](../blog/article.md) and other functions.

- Provides [Comment and PageViews](../feature/comment.md) feature to let you communicate with your visitors

- Provides [Feed](../advanced/feed.md) generation, so that others can subscribe your site.

### Search Engine Optimization

- Provides [SEO Enhance](../advanced/seo.md), will automatically inject information to fully support OGP and JSON-LD protocols, and enhance search engine indexing.

- Provides [Sitemap Generation](../advanced/sitemap.md)

- Provides [PWA](../advanced/pwa.md)

### Others

- [Appending copyright information](../feature/copyright.md) while copying, or disable page copy and selection

- Provide [Page Encryption](../feature/encrypt.md) function to protect private information

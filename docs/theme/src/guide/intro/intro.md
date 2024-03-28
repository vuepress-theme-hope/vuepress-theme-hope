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

VuePress extends Markdown syntax to a certain extent, but it still lacks some commonly used functions, such as text alignment, mark, flowchart, formula, presentation, etc. At the same time, some features provided by the default theme are weak or missing, such as picture preview, code block copy, toc, etc. Meanwhile, VuePress default theme is too simple and not powerful enough. `vuepress-theme-hope` and related plugins were born under this situation.

We not only **greatly improve outlook** comparing to default theme, but also **provide a full range of enhancements for VuePress** with theme plugins.

## Design Goals

::: info Powerful and independent features

We extract each feature into a plugin, so that users can use them in other themes or customize their behavior standalone.

:::

::: info Minimum Configuration

All features will try to use a default value if possible, so you can use them under zero or minimum configuration.

This helps a lot to reduce your migration or learning costs while directly enjoy their convenience.

:::

::: info Improved Layout

The theme interface has been completely refactored to provide customizable and beautiful layouts.

:::

::: info Tree-shaking

With the help of Vue3's composition API, the theme fully achieve "Tree-shaking" while remaining powerful.

The theme will only run with features you want, without being slowed down by other features or affecting the bundle size.

:::

## Why Powerful

### Content Richness

The theme provides a lot of extended syntax support for Markdown, allowing you to insert more content in the body.

- We have some built-in enhancement with [images](../markdown/grammar/image.md).

- If you are a literature lover and want to place some essays, the theme provides [Custom Alignment](../markdown/stylize/align.md) and [footnote](../markdown/content/footnote.md).

- To store some knowledge notes, the theme provides [Custom container](../markdown/stylize/hint.md), [Mark](../markdown/stylize/mark.md), [Task list](../markdown/grammar/tasklist.md) [mindmap](../markdown/chart/markmap.md) and [Tex](../markdown/grammar/tex.md) support.

- If you are a programmer and need to show a lot of codes and demos, this theme provides light and dark themes for code blocks, [code tabs](../markdown/code/code-tabs.md) and the ["one-click copy" button](../feature/copy-code.md). At the same time, we also provide the [Code Demo](../markdown/code/demo.md), [Playground](../markdown/code/playground.md), [Kotlin Playground](../markdown/code/kotlin-playground.md) and [Vue Playground](../markdown/code/vue-playground.md) functions, which is convenient for you to show your own Vue, React components or other demos and provide playground for visitors.

- If you are providing product documentation and presentation, the theme provides [tabs](../markdown/content/tabs.md), [slide](../markdown/content/revealjs.md), [chart](../markdown/chart/chartjs.md), [echarts](../markdown/chart/echarts.md), [flowchart](../markdown/chart/flowchart.md), [mermaid diagram](../markdown/chart/mermaid.md) functions.

- To reorganize your content, the theme provides [File Include](../markdown/content/include.md) function.

- To style your content, the theme provides [Subscript and Superscript](../markdown/grammar/sup-sub.md), [Attrs setting](../markdown/stylize/attrs.md) and [Stylize](../markdown/stylize/stylize.md) function.

- The theme also provides you a lot of [useful components](../component/built-in.md).

In short, anyone can enjoy the convenience of Markdown's enhanced syntax.

### UI Improvements

- [Darkmode Support](../interface/darkmode.md)

- [Icon Support](../interface/icon.md)

- [Customizing Code Block Theme](../interface/code-theme.md)

- [Theme colors](../interface/theme-color.md): allowing you to switch dynamically during browsing

- More:

  [Full Screen Button](../interface/others.md#fullscreen-button), [Back to top button](../interface/others.md#back-to-top-button), [Print button](../interface/others.md#print-button), [Full A11y support](../interface/accessibility.md) and [RTL layout](../interface/others.md#rtl-layout).

### Layouts Improvement

- [Navbar](../layout/navbar.md):

  - Support for icons and path prefix.
  - Improved layout on mobile.

- [Sidebar](../layout/sidebar.md):

  - Support for icons and path prefix.
  - Auto generating sidebars from [file structure](../layout/sidebar.md#generate-from-file-structure).

- [Brand-new Homepage with features and highlights](../layout/home.md)

- More:

  Adds [breadcrumb](../layout/breadcrumb.md), [toc](../layout/page.md#header-list) and [footer](../layout/footer.md) support.

### Page Meta

- [Page info](../feature/page-info.md) including:

  - Author
  - Writing date
  - Word count and estimated reading time
  - Tags and Categories
  - Pageviews

- [Contributors and Last update time](../feature/meta.md#git-based-information)

- [Edit link](../feature/meta.md#edit-link)

### New Features

- [Picture Preview](../feature/photo-swipe.md) which supports zooming, dragging, slides browsing, sharing and downloading

- [Catalog Page auto-generation](../feature/catalog.md)

- Search feature

  - [Crawler search support with docsearch](../feature/search.md#use-vuepressplugin-docsearch)
  - [Powerful client search support with slimsearch](../feature/search.md#use-vuepress-plugin-search-pro).

- [Page Encryption](../feature/encrypt.md) feature to limit access.

- [Copyright appending](../feature/copyright.md) while copying, or directly disable page copy and selection

- Search Engine Optimization

  - [SEO Enhancement](../advanced/seo.md) with full support of OGP and JSON-LD protocols

  - [Sitemap Generation](../advanced/sitemap.md)

  - [PWA feature](../advanced/pwa.md)

### Blog Support

The theme supports [blogging](../blog/intro.md), [with article list with sticky support, starred articles, auto excerpt generation, auto summary](../blog/article.md).

- Support [categories and tags](../blog/category-and-tags.md), [timeline](../blog/timeline.md).

- A brand-new [blog homepage](../blog/home.md).

- Provides [Comment and PageViews](../feature/comment.md) feature to let you communicate with your visitors

- Provides [Feed](../advanced/feed.md) generation, so that others can subscribe your site.

## Build-in Plugins🧩

The theme includes the following plugins, you can use them in other themes or directly.

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provide some out of box plugins

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provide more Markdown syntax

- <ProjectLink name="sass-palette">vuepress-plugin-sass-palette</ProjectLink>: Sass style plugin for all plugins and themes

::: tip

Here are some other plugins that are not bundled by the theme, you can enable them according to your own needs.

- <ProjectLink name="lightgallery">vuepress-plugin-lightgallery</ProjectLink>: Image preview plugin based on lightgallery

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Client search plugin

:::

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

VuePress default theme is just a theme to provide basic documentation layout. E.g.: it doesn't inject meta tags and generate Sitemap for SEO optimization. Besides, though VuePress has extended Markdown syntax to a certain extent, it still lacks some commonly used functions, such as text alignment, mark, flowchart, formula, presentation, etc. At the same time, some features provided by the default theme are weak or missing, such as picture preview, code block copy, toc, etc.

`vuepress-theme-hope` and related plugins were born under this situation.

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

- We have some built-in enhancement with [images](../markdown/image.md).

- If you are a literature lover and want to place some essays, the theme provides [Custom Alignment](../markdown/align.md) and [footnote](../markdown/footnote.md).

- To store some knowledge notes, the theme provides [Custom container](../markdown/hint.md), [Mark](../markdown/mark.md), [Badge](../markdown/components.md), [Task list](../markdown/tasklist.md) and [Tex](../markdown/tex.md) support.

- If you are a programmer and need to show a lot of codes and demos, this theme provides light and dark themes for code blocks, [code tabs](../markdown/code-tabs.md) and the ["one-click copy" button](../feature/copy-code.md). At the same time, we also provide the [Code Demo](../markdown/demo.md), [Playground](../markdown/playground.md), [Kotlin Playground](../markdown/kotlin-playground.md) and [Vue Playground](../markdown/vue-playground.md) functions, which is convenient for you to show your own Vue, React components or other demos and provide playground for visitors.

- If you are providing product documentation and presentation, the theme provides [tabs](../markdown/tabs.md), [slide](../markdown/revealjs.md), [chart](../markdown/chartjs.md), [echarts](../markdown/echarts.md), [flowchart](../markdown/flowchart.md), [mermaid diagram](../markdown/mermaid.md) functions.

- To reorganize your content, the theme provides [File Include](../markdown/include.md) function.

- To style your content, the theme provides [Subscript and Superscript](../markdown/sup-sub.md), [Attrs setting](../markdown/attrs.md) and [Stylize](../markdown/stylize.md) function, and provides you a lot of [useful components](../markdown/components.md).

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
  - Auto generating sidebars from [page headings](../layout/sidebar.md#generate-from-headers) and [file structure](../layout/sidebar.md#generate-from-file-structure).

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

- <ProjectLink name="auto-catalog">vuepress-plugin-auto-catalog</ProjectLink>: Catalog automatically generation for VuePress2

- <ProjectLink name="blog2">vuepress-plugin-blog2</ProjectLink>: Blog plugin for VuePress2

- <ProjectLink name="comment2">vuepress-plugin-comment2</ProjectLink>: Comment and pageviews

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provide some out of box plugins

- <ProjectLink name="copy-code2">vuepress-plugin-copy-code2</ProjectLink>: Provide copy button for code blocks

- <ProjectLink name="copyright2">vuepress-plugin-copyright2</ProjectLink>: Append copyright information when copying or disable copy and selection.

- <ProjectLink name="feed2">vuepress-plugin-feed2</ProjectLink>: Feed support

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provide more Markdown syntax

- <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink>: Make the site's picture support click zoom

- <ProjectLink name="pwa2">vuepress-plugin-pwa2</ProjectLink>: Enhanced PWA support

- <ProjectLink name="reading-time2">vuepress-plugin-reading-time2</ProjectLink>: Expect reading time and words count

- <ProjectLink name="sass-palette">vuepress-plugin-sass-palette</ProjectLink>: Sass style plugin for all plugins and themes

- <ProjectLink name="seo2">vuepress-plugin-seo2</ProjectLink>: SEO Enhancement Plugin

- <ProjectLink name="sitemap2">vuepress-plugin-sitemap2</ProjectLink>: Sitemap plugin

::: tip

Here are some other plugins that are not bundled by the theme, you can enable them according to your own needs.

- <ProjectLink name="lightgallery">vuepress-plugin-lightgallery</ProjectLink>: Image preview plugin based on lightgallery

- <ProjectLink name="redirect">vuepress-plugin-redirect</ProjectLink>: Redirect pages

- <ProjectLink name="remove-pwa">vuepress-plugin-remove-pwa</ProjectLink>: Plugins to remove pwa

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Client search plugin

:::

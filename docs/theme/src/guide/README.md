---
title: Guide
icon: lightbulb
index: false
category:
  - Intro
tag:
  - Intro
---

::: tip

If you met a bug while using, you can open an issue [here](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)

:::

## Theme Features✨

The theme largely inherits the config of `@vuepress/theme-default`, while adds a lot of functions and layout optimization on it.

<!-- more -->

### Markdown Enhance

Added more syntax to Markdown, enriching documentation and blog writing:

- [Custom Container](markdown/container.md)
- [Tabs](markdown/tabs.md)
- [Code Tabs](markdown/code-tabs.md)
- [Footnote](markdown/footnote.md)
- [Task list](markdown/tasklist.md)
- [Image Enhancement](markdown/image.md)
- [Custom alignment](markdown/align.md)
- [Custom Attributes](markdown/attrs.md)
- [Subscript and Superscript](markdown/sup-sub.md)
- [Mark](markdown/mark.md)
- [Chart](markdown/chart.md)
- [ECharts](markdown/echarts.md)
- [FlowChart](markdown/flowchart.md)
- [Tex Support](markdown/tex.md)
- [Mermaid Diagram](markdown/mermaid.md)
- [File include](markdown/include.md)
- [Code demo](markdown/demo.md)
- [Presentation](markdown/presentation.md)
- [Stylize](markdown/stylize.md)
- [Playground](markdown/playground.md)
- [Vue Playground](markdown/vue-playground.md)
- [Components out of box](markdown/components.md)
- [Customized Themes](interface/code-theme.md)

### Layout

New in Page:

- [Path navigation](layout/breadcrumb.md)

- Add [TOC anchor](layout/page.md#header-list) on the right side under the desktop width

- [Custom footer](layout/footer.md)

Layout Optimization:

- Completely refactored mobile layout
- Page navigation and page meta style improvements
- [Default homepage optimization](layout/home.md):

  - Features can have icons, links, and have a new outlook
  - Widescreen layout optimization

### Interface

- [Icon support](interface/icon.md)

- [Navbar](layout/navbar.md)

- [Sidebar](layout/sidebar.md)

- [Theme colors](interface/theme-color.md): allowing you to switch dynamically during browsing

- [Dark mode](interface/darkmode.md): allowing you to switch manually or apply automatically according to device settings

- [Full Screen Button](interface/others.md#fullscreen-button)

- [Back to top button](interface/others.md#back-to-top-button)

### Page Enhance

- [One-click copy code](feature/copy-code.md)

- [Picture preview feature](feature/photo-swipe.md): supports zooming, dragging, sliding browsing, sharing and downloading

- [Comment Service](feature/comment.md)

- [Page info](feature/page-info.md)

  - Reading Counts
  - Author and writing date
  - Automatically generated word count and estimated reading time
  - Tags and Categories

- [Copyright](feature/copyright.md)

- [Encryption](feature/encrypt.md)

- [Search Support](feature/search.md)

### Blog

- [Article list with sticky support, and summary auto generation](blog/intro.md)

- [Category and tag list](blog/category-and-tags.md)

- [Timeline](blog/timeline.md)

- [Star article](blog/article.md)

- [New blog homepage layout](blog/home.md)

### Advanced Features

- [PWA support](advanced/pwa.md)

- [Feed generation](advanced/feed.md)

- [SEO enhancement](advanced/seo.md)

- [Sitemap generation](advanced/sitemap.md)

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

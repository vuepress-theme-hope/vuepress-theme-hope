---
title: Guide
icon: creative
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

Added more syntax to Markdown, enriching documentation and blog writing

- [Custom Container](markdown/container.md)
- [CodeGroup](markdown/code-group.md)
- [Tex Support](markdown/tex.md)
- [Custom alignment](markdown/align.md)
- [Chart](markdown/chart.md)
- [FlowChart](markdown/flowchart.md)
- [Mermaid Diagram](markdown/mermaid.md)
- [Mark](markdown/mark.md)
- [Task list](markdown/tasklist.md)
- [Subscript and Supercript](markdown/sup-sub.md)
- [Code demo](markdown/demo.md)
- [Presentation](markdown/presentation.md)
- [Badge `<Badge />`](markdown/components.md#badge): Add color support
- [Customize Themes](interface/code-theme.md)

### Layout

New in Page:

- [Path navigation](layout/breadcrumb.md)

- Add [TOC anchor](layout/page.md#heading-list) on the right side under the desktop width

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
  - Tags and Categorys

- [Encryption](feature/encrypt.md)

- [Search Support](feature/search.md)

### Blog

- [Social follow button and page social sharing][add-this]

- [Article list with sticky support, and summary autogeneration](blog/intro.md)

- [Cateory and tag list](blog/category-and-tags.md)

- [Timeline](blog/timeline.md)

- [Star article](blog/article.md)

- [New blog homepage layout](blog/home.md)

### Advanced Features

- [PWA support](advanced/pwa.md)

- [Feed generation](advanced/feed.md)

- [SEO enhancement](advanced/seo.md)

- [Sitemap generation](advanced/sitemap.md)

- [Component customize](advanced/customize.md)

- [Theme extending](advanced/extend.md)

## Build-in Plugins🧩

The theme includes the following plugins, you can use them in other themes or directly.

- [vuepress-plugin-blog2][blog2]: Blog plugin for VuePress2

- [vuepress-plugin-comment2][comment2]: Comment and pageviews

- [@mr-hope/vuepress-plugin-components][components]: Provide some out of box plugins

- [vuepress-plugin-copy-code2][copy-code2]: Provide copy button for code blocks

- [vuepress-plugin-feed2][feed2]: Feed support

- [vuepress-plugin-md-enhance][md-enhance]: Provide more Markdown syntax

- [vuepress-plugin-photo-swipe][photo-swipe]: Make the site’s picture support click zoom

- [vuepress-plugin-pwa2][pwa2]: Enhanced PWA support

- [vuepress-plugin-reading-time2][reading-time2]: Expect reading time and words count

- [vuepress-plugin-sass-palette][sass-palette]: Sass style plugin for all plugins and themes

- [vuepress-plugin-seo2][seo2]: SEO Enhancement Plugin

::: tip

Here are some other plugins that are not enabled by default by the theme, you can enable them according to your own needs.

- [vuepress-plugin-add-this][add-this]: Provide sociel share and follow function using AddThis

- [vuepress-plugin-lightgallery][lightgallery]: Photo preview plugin based on lightgallery

:::

[add-this]: https://vuepress-theme-hope.github.io/v2/add-this/
[blog2]: https://vuepress-theme-hope.github.io/v2/blog/
[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[components]: https://vuepress-theme-hope.github.io/v2/components/
[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/
[feed2]: https://vuepress-theme-hope.github.io/v2/feed/
[lightgallery]: https://vuepress-theme-hope.github.io/v2/lightgallery/
[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/
[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/
[pwa2]: https://vuepress-theme-hope.github.io/v2/pwa/
[reading-time2]: https://vuepress-theme-hope.github.io/v2/reading-time/
[sass-palette]: https://vuepress-theme-hope.github.io/v2/sass-palette/
[seo2]: https://vuepress-theme-hope.github.io/v2/seo/

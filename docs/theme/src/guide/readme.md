---
icon: info
---

# Introduction

::: tip
If you met a bug while using, you can open an issue [here](https://github.com/Mister-Hope/vuepress-theme-hope/issues)
:::

## Theme Features

The theme maintains the style of the `@vuepress/theme-default`, and adds a lot of features and optimizations:

### Page enhancement

- Added more syntax to Markdown, enriching documentation and blog writing

  - [Tex Support](feature/markdown/tex.md)
  - [Custom alignment](feature/markdown/align.md)
  - [Flow chart](feature/markdown/flowchart.md)
  - [Mark](feature/markdown/mark.md)
  - [Subsript and Supercript](feature/markdown/sup-sub.md)
  - [Code demo](feature/markdown/demo.md)
  - [Presentation](feature/markdown/presentation.md)

- [Picture preview feature](feature/page.md#picture-preview), supports zooming, dragging, sliding browsing, sharing and downloading

- [Article info](feature/page-info.md)

  - Reading Counts
  - Author and writing date
  - Automatically generated word count and estimated reading time
  - Tags and Categorys

- [Comment System](feature/comment.md)

- [Path navigation](layout/page.md#breadcrumb)

- [Page Icon](layout/page.md#icon-support)

- [Custom footer](layout/page.md#footer-support)

### Features

#### Out of box

- [Brand new theme colors, allowing you to switch dynamically during browsing](feature/theme.md#theme-color)

- [Dark mode, allowing you to switch manually or apply automatically according to device settings](feature/theme.md#darkmode)

- [Full Screen Button](feature/theme.md#fullscreen-button)

- [PWA support](feature/pwa.md)

- [Back to top button](feature/component.md#back-to-top-button-backtotop)

- [One-click copy code](feature/page.md#code-copy)

- Add copyright information when copying

#### More powerful functions

- [SEO enhancement](feature/seo-sitemap.md#SEO)

- [Sitemap generation](feature/seo-sitemap.md#Sitemap)

- [Encryption of specific articles and paths](feature/encrypt.md)

- [TypeScript support](feature/typescript.md)

### Style optimization

- [Icon support](feature/readme.md)

- [Default homepage optimization](layout/home.md)

  - Features have new animations and support jump
  - Multiple action buttons
  - Widescreen layout optimization

- Optimization of other built-in components

  - [**navbar**](layout/navbar.md)
  - [**Sidebar**](layout/sidebar.md)
  - [Badge `<MyBadge />`](feature/component.md#badge-mybadge): Added color support on the official basis

### Blog section

- [New blog homepage layout](layout/blog.md)

- [Social follow button and page social sharing][add-this]

- [Article display](feature/blog.md)

  - [Articles list swith sticky support](feature/blog.md#article)
  - [Cateory lists](feature/blog.md#category)
  - [Tag lists](feature/blog.md#tags)
  - [Timeline](feature/blog.md#timeline)

## Plugins build-in

The theme also includes the following plugins, you can use them in other themes or directly.

- [@mr-hope/vuepress-plugin-comment][comment]: Comment and page info feature

- [@mr-hope/vuepress-plugin-component](feature/component.md): Provide some out of box plugins

- [@mr-hope/vuepress-plugin-copy-code][copy-code]: Provide copy button for code blocks

- [@mr-hope/vuepress-plugin-last-update][last-update]: Last update time

- [@mr-hope/vuepress-plugin-pwa][pwa]: PWA support

- [@mr-hope/vuepress-plugin-reading-time][reading-time]: Expect reading time and words count

- [@mr-hope/vuepress-plugin-seo][seo]: SEO Enhancement Plugin

- [@mr-hope/vuepress-plugin-sitemap][sitemap]: Sitemap Generator for your site

- [vuepress-plugin-add-this][add-this]: Provide sociel share and follow function

- [vuepress-plugin-md-enhance][md-enhance]): Provide more Markdown syntax

- [vuepress-plugin-photo-swipe][photo-swipe]: Make the site’s picture support click zoom

[add-this]: https://vuepress-add-this.mrhope.site
[comment]: https://vuepress-comment.mrhope.site
[copy-code]: https://vuepress-copy-code.mrhope.site
[last-update]: https://vuepress-last-update.mrhope.site
[md-enhance]: https://vuepress-md-enhance.mrhope.site
[photo-swipe]: https://vuepress-photo-swipe.mrhope.site
[pwa]: https://vuepress-pwa.mrhope.site
[reading-time]: https://vuepress-reading-time.mrhope.site
[seo]: https://vuepress-seo.mrhope.site
[sitemap]: https://vuepress-sitemap.mrhope.site

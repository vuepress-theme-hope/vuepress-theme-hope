---
icon: discoverfill
category: feature
tags:
  - intro
  - function
---

# New feature

- [**Dark Mode**](theme.md#dark-mode)

- [**Theme Color**](theme.md#theme-color)

- [**Page Information**](page-info.md)

- [**Comment function**](comment.md)

- [**Encryption function**](encrypt.md)

- [**Markdown enhancement**](markdown/readme.md)

- [**New component**](component.md)

- [**Seo and Sitemap**](seoAndSitemap.md)

- **Image preview support**

  All pictures on the page support click preview, and support zoom, download or share in the preview interface. You can set `themeConfig.photoSwipe` to `false` to disable it.

- **Icon support**

  FontClass format icon support has been added in multiple places throughout the theme.

  Please import the corresponding icon css file in `index.styl` under `.vuepress/styles`. E.g:

  ```css
  @import "//at.alicdn.com/t/font_1446717_giwlq66d28j.css";
  ```

  The class added to the icon is `iconfont`, and the prefix of the icon is `icon-` by default, which can be changed in the `iconPrefix` field in the theme configuration.

- [**Typescript support**](typescript.md)

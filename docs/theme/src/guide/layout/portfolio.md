---
title: Portfolio Page
icon: user-tag
order: 8
category:
  - Layout
tag:
  - Home
  - Layout
---

VuePress Theme Hope provides a portfolio homepage for personal introduction.

To use this layout, you should set `home: true` and `portfolio: true` in the page front matter.

## Personal Information

The name is default to `author` option in theme options, while you can set `name` in frontmatter to customize it. The welcome message can also be customized through `welcome` option in frontmatter.

To describe yourself, set `titles` in frontmatter with titles that fits you. You are also expected to set a image of yours with `avatar` (and `avatarDark` for dark mode if needed). You can also set `bgImage` (and `bgImageDark` for dark mode if needed) to customize background image. Advanced style adjusting can be done with `avatarStyle` and `bgImageStyle` option.

You can set social medias using `medias` in frontmatter with `name` `icon` and `url` for each media. When blog feature is enabled, media links set in `blog.medias` are displayed by default.

By default, we will apply special styles to contents in portfolio page, you may set `content: doc` in frontmatter to revert to original style, or set `content: none` to hide Markdown contents.

::: info Living Demo

- [A portfolio demo](../../demo/portfolio-home.md)

:::

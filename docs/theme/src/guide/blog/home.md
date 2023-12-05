---
title: Blog homepage
icon: home
order: 6
category:
  - Blog
tag:
  - Blog
  - Home
  - Layout
---

`vuepress-theme-hope` allows you to enable a blog-style homepage.

You need to set `layout: BlogHome` and `home: true` in the frontmatter of homepage.

<!-- more -->

![Homepage screenshot](./assets/blog-light.jpg#light)
![Homepage screenshot](./assets/blog-dark.jpg#dark)

## Homepage information

You can use `heroText` to set the main title and `tagline` to set the subtitle.

If you have a logo, you can place it in the `public` folder and set it via `heroImage`, if you want to display another logo in night mode, you can use `heroImageDark`. For better A11y, we recommend that you set the description of Logo to `heroAlt`.

You can set the background image through `bgImage` and `bgImageDark`, but you need to pay attention that you must fill in the full URL or absolute path. If you want the information to be displayed in full screen, you can set `heroFullScreen: true`.

If you need to customize some styles, you can set the style of the logo and background image through `heroImageStyle` and `bgImageStyle`.

## Project Display

Typically, you might want to display some projects, books, articles, links, friend links, etc. on your homepage.

You can set them via `projects`, which is an array where each element is an object with the following keys:

- `name`: required, project name
- `link`: required, project link, fill in an external path or absolute path
- `desc`: project description
- `icon`: Icon, you can fill in full path or absolute path image link, also icon FontClass is supported

  We provide these icons as built-in support either: `"link"`, `"project"`, `"book"`, `"article"`, `"friend"`。

::: info

For complete configuration items, see [Blog Home Frontmatter Configuration](../../config/frontmatter/blog-home.md).

:::

## Living Demo

- [A blog homepage for current docs](../../demo/blog-home.md)
- [A customized blog homepage for current docs](../../demo/custom-blog-home.md)

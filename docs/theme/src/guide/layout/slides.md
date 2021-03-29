---
title: Slide
icon: slides
category: layout
tags:
  - slides
  - layout
---

`vuepress-theme-hope` allows you to add slides pages.

You need to set `layout: Slide` in the frontmatter of the corresponding page to enable the slides page.

<!-- more -->

Also, you should enable presentation feature in `vuepress-plugin-md-enhance` by setting `themeConfig.mdEnhance.enableAll` or `themeConfig.mdEnhance.presentation`.

![Slide page screenshot](./assets/slides.png)

[Here is a demo](https://vuepress-theme-hope-demo.mrhope.site/slides/) for your to preview all the slide features.

You should only include a single slide syntax on this page to avoid other problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

---
title: Slide
icon: slides
category:
  - Layout
tag:
  - Layout
  - Slides
---

`vuepress-theme-hope` allows you to add slides pages.

You need to set `layout: Slide` in the frontmatter of the corresponding page to enable the slides page.

<!-- more -->

## Demo

[Here is a demo containing all the slide features](https://vuepress-theme-hope.github.io/v2/md-enhance/guide/presentation/demo.html).

![Slide page screenshot](./assets/slides.png)

## Attention

::: warning Enable presentation

You should enable presentation feature in `vuepress-plugin-md-enhance` by setting `themeConfig.plugins.mdEnhance.enableAll` or `themeConfig.plugins.mdEnhance.presentation`, or the layout won't render correctly.

:::

::: warning No mutiple slides

You should only include a single slide syntax on this page to avoid rendering problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

:::

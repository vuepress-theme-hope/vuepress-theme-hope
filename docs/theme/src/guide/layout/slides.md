---
title: Slide
icon: person-chalkboard
order: 8
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

<ProjectLink name="md-enhance" path="/guide/presentation/demo.html">Here is a demo containing all the slide features</ProjectLink>.

![Slide page screenshot](./assets/slides-light.png#light)
![Slide page screenshot](./assets/slides-dark.png#dark)

## Attention

::: warning Enable presentation

You should enable presentation feature in `vuepress-plugin-md-enhance` by setting `plugins.mdEnhance.presentation` in theme options, otherwise the layout won't be rendered correctly.

:::

::: warning No multiple slides

You should only include a single slide syntax on this page to avoid rendering problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

:::

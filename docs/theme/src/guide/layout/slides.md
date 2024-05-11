---
title: Slide
icon: person-chalkboard
order: 9
category:
  - Layout
tag:
  - Layout
  - Slides
---

`vuepress-theme-hope` allows you to add slides pages.

You need to set `layout: Slide` in the frontmatter of the corresponding page to enable the slides page.

- <ProjectLink name="md-enhance" path="/guide/content/revealjs/demo.html">A demo containing all slide features</ProjectLink>.

<!-- more -->

## Attention

::: warning Enable presentation

You should enable presentation feature in `vuepress-plugin-md-enhance` by setting `plugins.mdEnhance.revealjs` in theme options, otherwise the layout won't be rendered correctly.

:::

::: warning No multiple slides

You should only include a single slide syntax on this page to avoid rendering problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

:::

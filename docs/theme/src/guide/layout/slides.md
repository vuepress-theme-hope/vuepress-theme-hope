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

<!-- more -->

::: tip

To use this feature, you should enable [presentation feature](../markdown/content/revealjs.md) first.

:::

To render a slide page, set `layout: Slides` in the frontmatter of the corresponding page.

In these pages, you should only include a single slide syntax and no other contents to avoid rendering problems.

```md
---
layout: Slides
---

@slidestart

<!-- slide content here -->

@slideend
```

- [A demo containing all slide features][revealjs-demo].

[revealjs-demo]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html

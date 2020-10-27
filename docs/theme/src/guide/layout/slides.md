---
icon: blog
category: layout
tags: -slides
  -layout
---

# Blog Home

`vuepress-theme-hope` allows you to add slides pages.

You need to set `layout: Slides` in the frontmatter of the corresponding page to enable the slides page.

![Slide page screenshot](./assets/slides.png)

You should only include a single slide syntax on this page to avoid other problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

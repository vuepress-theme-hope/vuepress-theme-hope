---
icon: presentation
category: layout
tags:
  - slides
  - layout
---

# Slide

`vuepress-theme-hope` allows you to add slides pages.

You need to set `layout: Slide` in the frontmatter of the corresponding page to enable the slides page.

Also, you should enable presentation feature in `vuepress-plugin-md-enhance` by setting `themeConfig.mdEnhance.enableAll` or `themeConfig.mdEnhance.presentation`.

![Slide page screenshot](./assets/slides.png)

You should only include a single slide syntax on this page to avoid other problems.

```md
@slidestart [your theme]

// your slides

@slideend
```

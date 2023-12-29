---
title: Customize Effects
icon: wand-magic-sparkles
order: 3
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This tutorial guides you how to customize theme effects.

<!-- more -->

## Clear Effects

By default, the theme will:

- Use color list to decorate categories and tags
- Add animation when switching pages and elements
- Add ease-in animations to homepage elements, and add hovering effects to features.
- Use a more fancy code copy button
- Use fancy tooltips.
- Added fade-in when switching between day mode and night mode

If you need to remove these fancy styles, please set `pure: true` in the theme options to enable pure mode.

Meanwhile, you can control the duration of the animation by controlling `$color-transition` and `transform-transition` in the palette file:

```scss
// .vuepress/styles/palette.scss

$color-transition: 0s;
$transform-transition: 0s;
```

---
title: Migration to Latest
icon: code-compare
---

## Legacy Mode

You can pass the second argument `true` to enable legacy mode when calling `mdEnhancePlugin`, and the plugin will try to run with V1 behavior.

## New Features

- `v-pre` support

  The following container support is removed, so `vPre` option is added

  ```md
  ::: v-pre

  Some {{vue syntax}}.

  :::
  ```

- Playground

  Embed interactive demo with official presets and custom options

- Kotlin Playground

  Provide Kotlin playground via `kotlin-playground`

- Vue Playground

  Provide Vue playground via `@vue/repl`

## Changed

- Now all options are disabled by default

- Code demo syntax changed

  Before:

  ```md
  ::: demo Title

  <!-- demo content -->

  :::

  ::: demo [vue] Title

  <!-- demo content -->

  :::

  ::: demo [react] Title

  <!-- demo content -->

  :::
  ```

  After:

  ```md
  ::: normal-demo Title

  <!-- demo content -->

  :::

  ::: vue-demo Title

  <!-- demo content -->

  :::

  ::: react-demo Title

  <!-- demo content -->

  :::
  ```

## Removed Options

- `enableAll` removed

  There are too many noob users who don't know what they are doing, and they just enable this option without using all the feature provided, yet they complain about load speed.

- `lineNumbers` removed

  VuePress 2 supports line number config per code block now.

- `imageFix` removed

  Mr.Hope already made a PR to fix broken image links in Markdown, so it's no longer needed

- `alert` removed

  Please use `@vuepress/plugin-markdown-hint` instead

- `container`, `hint` removed

  Please use `@vuepress/plugin-markdown-hint` instead

- `imageLazyload`, `lazyload` `imgLazyload` removed

  Please use `@vuepress/plugin-markdown-image` instead

- `imageTitle`, `figure` removed

  Please use `@vuepress/plugin-markdown-image` instead

- `imageMark`, `imgMark` removed

  Please use `@vuepress/plugin-markdown-image` instead

- `imgSize`, `imageSize` removed

  Please use `@vuepress/plugin-markdown-image` instead

- `tex`, `katex`, `mathjax` removed

  Please use `@vuepress/plugin-markdown-math` instead

- `codegroup`, `codetabs` removed

  Please use `@vuepress/plugin-markdown-tab` instead

- `tabs` removed

  Please use `@vuepress/plugin-markdown-tab` instead

- `presentation` `revealJs` `revealjs` removed

  Please use `@vuepress/plugin-revealjs` instead

- `chartjs` `echarts` `flowchart` `markmap` `mermaid` `plantuml` removed

  Please use `@vuepress/plugin-markdown-chart` instead

## Options Adjustments in Pre-release Version

- `vpre` is renamed to `vPre`

- `card` is replaced by `components`

- `vuePlayground` no longer accept lib options

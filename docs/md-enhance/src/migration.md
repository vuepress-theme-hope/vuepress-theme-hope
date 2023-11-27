---
title: Migration to Latest
icon: code-compare
---

## Legacy Mode

You can pass the second argument `true` to enable legacy mode when calling `mdEnhancePlugin`, and the plugin will try to run with V1 behavior.

## New Features

- Markdown link check

  The plugin now check your Markdown links and warn you when broken links are detected.

  You can control this behavior with `checkLinks` option

- image mark support

  Use `#light` and `#dark` suffix to mark images to display them in light mode or dark mode via `imgMark` option.

- `v-pre` support

  The following container support is removed from `@vuepress/core`, so `vPre` option is added

  ```md
  ::: v-pre

  Some {{vue syntax}}.

  :::
  ```

- Use `component` code block to add components easily

- Chart.js support

  Adds [chart.js](https://www.chartjs.org/docs/latest/) support via `chart` option

  ````md
  ::: chart Title

  ```json
  {
    // chart.js config
  }
  ```

  :::

  ::: chart Title

  ```js
  const config = {
    // chart.js config
  };
  ```

  :::
  ````

- ECharts support

  Adds [ECharts](https://echarts.apache.org/en/index.html) support via `echarts` option

  ````md
  ::: echarts Title

  ```json
  {
    // chart.js config
  }
  ```

  :::

  ::: echarts Title

  ```js
  const option = {
    // chart.js config
  };
  ```

  :::
  ````

- content include support

  Use `<!-- @include: -->` to include other file content in Markdown via `include` options.

  Use `<!-- @include: filename -->` to include a file.

  To partially import the file, you can specify the range of lines to be included:

  - `<!-- @include: filename{start-end} -->`
  - `<!-- @include: filename{start-} -->`
  - `<!-- @include: filename{-end} -->`

  Also, you can include file region:

  - `<!-- @include: filename#region -->`

- tabs support

  Use `tabs` container to create tabs via `tabs` option.

- markmap support

  Add `markmap` container to create [Markmap](https://markmap.js.org/) via `markmap` option.

- Playground

  Embed interactive demo with official presets and custom options

- Kotlin Playground

  Provide Kotlin playground via `kotlin-playground`

- Vue Playground

  Provide Vue playground via `@vue/repl`

- Mathjax Support

  Add `mathjax` option to enable Mathjax support

- GFM Alerts

  Support GFM alerts via `alert` option

## Changed

- Now all options are disabled by default

- renamed `container` to `hint`

  To align with GFM, `danger` container is renamed to `caution`, also important and note containers are added

- renamed `codegroup` to `codetabs`

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

- Code Group changed to code tab

  Before:

  ````md
  :::: code-group

  ::: code-group-item pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope [dir]
  ```

  :::

  ::::
  ````

  After:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope [dir]
  ```

  :::
  ````

- `presentation` is rebuilt to `reveal.js`

  Support theme tree-shaking, and you can customize Reveal.js via client config file

## Removed Options

- `enableAll` removed

  There are too many noob users who don't know what they are doing, and they just enable this option without using all the feature provided, yet they complain about load speed.

- `lineNumbers` removed

  VuePress 2 supports line number config per code block now.

- `imageFix` removed

  Mr.Hope already made a PR to fix broken image links in Markdown, so it's no longer needed

## Options Adjustments in Pre-release Version

- `container` is renamed to `hint`

- `lazyload` and `imageLazyload` are renamed to `imgLazyload`

- `imageMark` is renamed to `imgMark`

- `mdImport` is renamed to `include`

- `tex` (Using katex) is renamed to `katex`

- `vpre` is renamed to `vPre`

- `imageTitle` is renamed to `figure`

- `revealjs` is renamed to `revealJS`

- `linkCheck` is replaced by `checkLinks`

- `card` is replaced by `components`

- `mermaid` `revealJs` `vuePlayground` no longer accept lib options
-

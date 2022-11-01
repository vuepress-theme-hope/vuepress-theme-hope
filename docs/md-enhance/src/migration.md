---
title: V2 Migration
icon: change
---

## Legacy Mode

You can pass the second argument `true` to enable legacy mode when calling `mdEnhancePlugin`, and the plugin will try to run with V1 behavior.

## New Features

- Markdown link check

  The plugin now check your Markdown links and warn you when broken links are detected.

  You can control this behavior with `linkCheck` option

- image mark support

  Use `#light` and `#dark` suffix to mark images to display them in light mode or dark mode via `imageMark` option.

- `v-pre` support

  The following container support is removed from `@vuepress/core`, so `vPre` option is added

  ```md
  ::: v-pre

  Some {{vue syntax}}.

  :::
  ```

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
  module.exports = {
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
  module.exports = {
    // chart.js config
  };
  ```

  :::
  ````

- content include support

  use `@include()` to include other file content in Markdown via `include` options.

  Use `@include(filename)` to include a file.

  To partially import the file, you can specify the range of lines to be included:

  - `@include(filename{start-end})`
  - `@include(filename{start-})`
  - `@include(filename{-end})`

- tabs support

  Use `tabs` container to create tabs via `tabs` option.

## Changed

- renamed `codegroup` to `codetabs`

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

- Code Group changed to code tab

  Before:

  ````md
  :::: code-group

  ::: code-group-item pnpm

  ```bash
  pnpm create vuepress-theme-hope@next [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope@next [dir]
  ```

  :::

  ::::
  ````

  After:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope@next [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope@next [dir]
  ```

  :::
  ````

## Removed Options

- `enableAll` removed

  There are too many noob users who don’t know what they are doing, and they just enable this option without using all the feature provided, yet they complain about load speed.

- `lineNumbers` removed

  VuePress 2 supports line number config per code block now.

- `imageFix` removed

  Mr.Hope already made a PR to fix broken image links in Markdown, so it’s no longer needed

---
title: Migration Guide
icon: change
---

## Option removed

- `lineNumbers` removed

  VuePress 2 supports linenumber config per code block now.

- `imageFix` removed

  Mr.Hope already made a PR to fix broken image links in Markdown, so it’s no longer needed

## New features

- `v-pre` support

  The following container support is removed from `@vuepress/core`, so this option is added

  ```md
  ::: v-pre

  Some {{vue syntax}}.

  :::
  ```

- `chart` support

  V2 adds [chart.js](https://www.chartjs.org/docs/latest/) support via `chart` option

  ````md
  ::: chart Title

  ```json
  {
    // chart.js config
  }
  ```

  :::
  ````

---
title: Migration Guide
icon: change
---

## Option removed

- `lineNumbers` removed

  VuePress 2 supports linenumber config per code block now.

- `imageFix` removed

  Mr.Hope already made a PR to fix broken image links in markdown, so it’s no longer needed

## New features

- `v-pre` support

  The following container support is removed from `@vuepress/core`, so this option is added

  ```md
  ::: v-pre

  Some {{vue syntax}}.

  :::
  ```

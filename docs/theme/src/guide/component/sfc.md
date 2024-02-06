---
title: Markdown to Vue SFC
icon: fab fa-vuejs
order: 1
category:
  - Component
tag:
  - Component
  - SFC
---

This tutorial will explain how to every Markdown files are converted to a Vue-powered page.

<!-- more -->

## Markdown to Vue SFC

Every Markdown file is first compiled to HTML and then converted to a Vue Single File Component (SFC). In other words, you can write Markdown files like Vue SFC.

- `<script>` and `<style>` tags are directly treated as tags in Vue SFC. In other words, they are promoted from the `<template>` tag to the top level of the SFC.
- All content other than `<script>` and `<style>` tags will be compiled to HTML and then treated as `<template>` tags in Vue SFC.

The converted Vue SFC will be cached in the `.vuepress/.temp/pages` directory, and will be rendered as `<Content />` component in layouts.

## Using Vue syntax in Markdown

You can use Vue syntax directly in Markdown, for details see [VuePress → Markdown](../../cookbook/vuepress/markdown.md#using-vue-in-markdown).

::: important

Since Vue single-file components can only contain one `<script>` tag, you should avoid using more than one `<script>` tag in VuePress Markdown.

:::

## Importing files

::: important Import with alias

Since Markdown will be converted to Vue single-file components in the cache directory, relative imports will not work in markdown files since they are invalid in Vue SFC. You should use alias.

:::

- You can use `@source` alias to reference the source directory of the current project

  ```structure:no-line-numbers
  .
  ├── src → project folder
  │    ├── example
  │    │    ├── ...
  │    │    └── MyComponent.vue
  │    ├── ...
  │    └── README.md
  └── ...
  ```

  ```md
  <MyComponent />

  <script setup lang="ts">
  import MyComponent from "@source/example/MyComponent.vue";
  </script>
  ```

- You can also use `alias` option:

  ```structure:no-line-numbers
  .
  ├── src → project folder
  │    ├── .vuepress
  │    │    ├── components
  │    │    │    └── MyComponent.vue
  │    │    ├── ...
  │    │    └── config.ts
  │    ├── ...
  │    └── README.md
  └── ...
  ```

  ```ts title=".vuepress/config.ts"
  import { getDirname, path } from "vuepress/utils";

  const __dirname = getDirname(import.meta.url);

  export default {
    alias: {
      "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
    },
  };
  ```

  ```md
  <MyComponent />

  <script setup lang="ts">
  import MyComponent from "@MyComponent";
  </script>
  ```

::: important Use local registration if possible

Global component needs to be loaded when VuePress is initialized (i.e., when visiting the first page). So if a global component is heavy, it will affect the initial loading time of the site.

Importing in Markdown locally means components will only be loaded when visiting the page that uses it.

:::

---
title: Markdown 到 Vue SFC
icon: fab fa-vuejs
order: 1
category:
  - 组件
tag:
  - 组件
  - SFC
---

此教程将解释 Markdown 文件是如何转换为 Vue 驱动的页面。

<!-- more -->

## Markdown 到 Vue SFC

每个 Markdown 文件首先会被编译为 HTML，然后转换为 Vue 单文件组件（SFC）。换句话说，你可以像编写 Vue SFC 一样编写 Markdown 文件。

- `<script>` 和 `<style>` 标签会直接被视为 Vue SFC 中的标签。换句话说，它们会从 `<template>` 标签提升到 SFC 的顶层。

- 除了 `<script>` 和 `<style>` 标签之外的所有内容都会被编译为 HTML，然后被视为 Vue SFC 中的 `<template>` 标签。

转换后的 Vue SFC 会被缓存到 `.vuepress/.temp/pages` 目录中，并会在布局中以 `<Content />` 组件的形式渲染。

## 在 Markdown 中使用 Vue 语法

你可以在 Markdown 中直接使用 Vue 语法，详情请见 [VuePress → Markdown](../../cookbook/vuepress/markdown.md#在-markdown-中使用-vue)。

::: important

由于 Vue 单文件组件只能包含一个 `<script>` 标签，所以你应该避免在 VuePress Markdown 中使用多个 `<script>` 标签。

:::

## 导入文件

::: important 通过别名导入

由于 Markdown 文件会被转换为 Vue 单文件组件并缓存到 `.vuepress/.temp/pages` 目录中，所以相对导入在 Markdown 文件中是无效的。你应该使用别名。

:::

- 你可以使用 `@source` 别名来引用当前项目的源目录

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

- 你也可以使用 `alias` 选项来创建别名:

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

  ```ts
  // .vuepress/config.ts
  import { getDirname, path } from "@vuepress/utils";

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

::: important 尽可能使用局部注册

全局组件需要在 VuePress 初始化时加载（即访问第一个页面时）。因此，如果一个全局组件很大，它会影响站点的初始加载时间。

在 Markdown 中局部导入组件意味着组件只会在访问使用它的页面时加载。

:::

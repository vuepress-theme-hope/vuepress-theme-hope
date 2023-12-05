---
title: 使用组件
icon: puzzle-piece
order: 4
category:
  - 教程知识
  - 自定义
tag:
  - 自定义
  - 组件
---

本教程将指引你如何在 VuePress 项目中使用 Vue 组件与 Vue 语法。

<!-- more -->

## 全局导入 Vue 组件

### 通过 `@vuepress/plugin-register-components` 注册组件

你可以通过 `@vuepress/plugin-register-components` 插件来自动注册组件。

插件的使用方法详见 [官方文档](https://vuejs.press/zh/reference/plugin/register-components.html)。

### 通过 ClientConfigFile 注册

你可以通过创建 `.vuepress/client.ts` 手动注册组件。

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import MyComponent from "./MyComponent.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("MyComponent", MyComponent);
  },
});
```

## 在 Markdown 中使用 Vue 语法与组件

你可以直接在 Markdown 中使用 Vue 语法。关于具体的使用方式，详见 [VuePress → Markdown](../../cookbook/vuepress/markdown.md#在-markdown-中使用-vue)

如果你需要在 Markdown 中导入 Vue 组件，请注意你不能使用相对路径进行导入，也不能书写多个 `<script>` 块。

::: info Markdown 与 Vue SFC

每一个 Markdown 文件，首先都会编译为 HTML ，然后转换为一个 Vue 单文件组件 (SFC) 。换句话说，你可以像写 Vue SFC 一样来写 Markdown 文件:

`<script>` 和 `<style>` 标签会直接被当作 Vue SFC 中的标签。换句话说，它们是从 `<template>` 标签中提升到了 SFC 的顶层。
所有 `<script>` 和 `<style>` 标签的以外的内容，会先被编译为 HTML ，然后被当作 Vue SFC 的 `<template>` 标签。

由于 Vue 单文件组件只能包含一个 `<script>` 标签，你应该避免在 VuePress Markdown 中使用多于一个 `<script>` 标签。

另外由于 Markdown 会被转换为缓存目录下的 Vue 单文件组件，任何相对路径的导入会在 Vue SFC 中失效。

:::

为了正确导入自己的组件，你需要为它们创建别名，你可以通过 `alias` 选项实现这一点:

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

这固然复杂一些，但是如果你所使用的组件仅在这个页面使用，这样导入更具有优势:

- 全局导入意味着组件代码需要在 VuePress 初始化，也就是访问首个页面时载入
- 在 Markdown 中导入会使得组件代码包含在页面代码中，这样它仅会在访问这个页面时被导入

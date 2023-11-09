---
title: Using Components
icon: puzzle-piece
order: 4
category:
  - Cookbook
  - Customize
tag:
  - Components
  - Customize
---

This tutorial will guide you on how to use Vue components and Vue syntax in your VuePress project.

<!-- more -->

## Import Vue Components Globally

### Register via `@vuepress/plugin-register-components`

You can automatically register components via the `@vuepress/plugin-register-components` plugin.

For details about how to use the plugin, see [Official Documentation](https://vuejs.press/reference/plugin/register-components.html).

### Register via ClientConfigFile

You can create `.vuepress/client.ts` and register components manually.

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

## Using Vue syntax and components in Markdown

You can use Vue syntax directly in Markdown, for details see [VuePress → Markdown](../../cookbook/vuepress/markdown.md#using-vue-in-markdown).

If you need to import Vue components in Markdown, please note that you cannot use relative paths to import, nor write multiple `<script>` blocks.

::: info Markdown with Vue SFC

Every Markdown file is first compiled to HTML and then converted to a Vue Single File Component (SFC). In other words, you can write Markdown files like Vue SFC:

`<script>` and `<style>` tags are directly treated as tags in Vue SFC. In other words, they are promoted from the `<template>` tag to the top level of the SFC.
All content other than `<script>` and `<style>` tags will be compiled to HTML and then treated as `<template>` tags in Vue SFC.

Since Vue single-file components can only contain one `<script>` tag, you should avoid using more than one `<script>` tag in VuePress Markdown.

In addition, since Markdown will be converted to Vue single-file components in the cache directory, any relative path import will be invalid in Vue SFC.

:::

In order to import your own components correctly, you need to create aliases for them, you can do this with the `alias` option:

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

It's a bit more complicated, but if the component is only used in one page, importing like this has advantages:

- Global import means that the component code needs to be loaded when VuePress is initialized, that is, when visiting the first page
- Importing in Markdown causes the component code to be included in the page code so that it will only be loaded when visiting the page

---
title: 全局组件
icon: puzzle-piece
order: 2
category:
  - 组件
tag:
  - 组件
---

本教程将指引你如何在 VuePress 项目中注册全局组件。

<!-- more -->

## 全局注册 Vue 组件

你可以全局注册组件，这样你就可以在 Markdown 文件和布局中直接使用它们。

::: important

全局注册组件可以让组件变得“开箱即用”，所以如果一个组件在你的项目中经常使用，建议你全局注册它。

但是如果一个组件很大，只在某些页面或布局中使用，建议你[局部注册组件](./sfc.md#导入文件)。

:::

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

## 使用

全局组件可以直接在任何组件、布局或页面中使用。

假设你已经全局注册了 `MyComponent`，那么你可以这样使用它:

- Markdown:

  ```md
  <MyComponent />
  ```

- 组件:

  ```vue
  <!-- .vuepress/components/Example.vue -->
  <template>
    <p>组件案例</p>
    <MyComponent />
  </template>
  ```

- 布局:

  ```vue
  <!-- .vuepress/layouts/Custom.vue -->
  <template>
    <p>布局案例</p>
    <MyComponent />
  </template>
  ```

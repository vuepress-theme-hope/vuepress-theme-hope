---
title: Global Components
icon: puzzle-piece
order: 2
category:
  - Component
tag:
  - Component
---

This tutorial will guide you on how to register components globally in your VuePress project.

<!-- more -->

## Register Components Globally

You can register components globally, so that you can use theme directly in Markdown files and Layouts.

::: important

Registering components globally can make the component "out of box", so if a component is commonly used in your project, it is recommended to register it globally.

But if a component is large and only used in certain pages or layouts, it is recommended to [register the component locally](./sfc.md#importing-files).

:::

## Register via `@vuepress/plugin-register-components`

You can automatically register components via the `@vuepress/plugin-register-components` plugin.

For details about how to use the plugin, see [Official Documentation](https://ecosystem.vuejs.press/plugins/register-components.html).

## Register via Client Config File

You can create `.vuepress/client.js` or `.vuepress/client.ts` and register components manually.

```js title=".vuepress/config.js"
import { defineClientConfig } from "vuepress/client";
import MyComponent from "./MyComponent.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("MyComponent", MyComponent);
  },
});
```

## Usage

Global component can be directly used in any component, layouts or pages.

Assume that you have registered `MyComponent` globally, then you can use it like:

- Markdown:

  ```md
  <MyComponent />
  ```

- Component:

  ```vue
  <!-- .vuepress/components/Example.vue -->
  <template>
    <p>Example Component</p>
    <MyComponent />
  </template>
  ```

- Layout:

  ```vue
  <!-- .vuepress/layouts/Custom.vue -->
  <template>
    <p>Example Layout</p>
    <MyComponent />
  </template>
  ```

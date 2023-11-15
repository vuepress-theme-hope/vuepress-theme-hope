---
title: Guide
icon: lightbulb
---

With `vuepress-plugin-auto-catalog`, you can easily get automatically generated catalog pages for your theme.

<!-- more -->

## Controlling Catalog

You can set `shouldIndex`, `titleGetter` and `orderGetter` in plugin options to control catalog generation. They all accept functions which receives `Page` object as first argument.

- `shouldIndex` returns a boolean value, if the function returns `false`, the page will be ignored, otherwise, the page will be indexed.
- `titleGetter` returns a string value, the string value will be used as the page title, by default the plugin will use `page.title`.
- `orderGetter` returns a number value if possible, order sequence is as follows:

  ```:no-line-numbers
  // order positive numbers from small to large
  Project with order 1
  Project with order 2
  ...
  Project with order 10
  ...
  // Project without order
  Project without order
  Project without order
  ...
  // order negative numbers from small to large
  Project with order -10
  // ...
  Project with order -2
  Project with order -1
  ```

## Excluding pages

There may be some cases you have a `/foo/bar.md`, but do not want to generate a catalog page at `/foo/`, in this case, you can use `exclude` option to exclude the page.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  plugins: [
    autoCatalogPlugin({
      // do not generate catalog page at /foo/
      exclude: ["/foo/"],
    }),
  ],
});
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      // do not generate catalog page at /foo/
      exclude: ["/foo/"],
    }),
  ],
};
```

:::

The `exclude` option accepts an array of string or RegExp.

## Controlling Page Frontmatter

By default, the plugin will generate catalog page title from folder name. However, sometimes you may want to make some customize, so you can set `frontmatter` option as a function which receives catalog page path as argument and you shall return an object containing the frontmatter you want.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => ({
        // frontmatter you want
        // you may customize title, author. time, etc.
      }),
    }),
  ],
});
```

@tab JS

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => ({
        // frontmatter you want
        // you may customize title, author. time, etc.
      }),
    }),
  ],
};
```

:::

## Using AutoCatalog Component

The plugin globally register and use `<AutoCatalog />` component by default.

The default `<AutoCatalog />` will render 3 levels of pages as catalog items, and you can change the level depth by setting `level` option (max 3 levels).

If you want to add index number to catalog item, you should add `index` props to `<AutoCatalog />` component.

By default, `<AutoCatalog />` generates catalog for current folder. If you want to generate catalog for other folder, you can set `base` props to `<AutoCatalog />` component.

You can use `<AutoCatalog />` in your theme layout, or in your markdown files directly.

If you do not like the built-in component and want to use your own, you can register your component globally and set `component` option with your component name. Auto catalog page will use your component.

## Displaying Icons for Catalog

You can import `defineAutoCatalogIconComponent` from `vuepress-plugin-auto-catalog/client` and use it in client config file to define a component for catalog icon.

The component should accept a `icon` prop which is the icon value.

::: code-tabs#language

@tab TS

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineAutoCatalogIconComponent } from "vuepress-plugin-auto-catalog/client";
import MyIconComponent from "./components/MyIconComponent.vue";

export default defineClientConfig({
  setup: () => {
    defineAutoCatalogIconComponent(MyIconComponent);
  },
});
```

@tab JS

```js
// .vuepress/client.js
import { defineAutoCatalogIconComponent } from "vuepress-plugin-auto-catalog/client";
import MyIconComponent from "./components/MyIconComponent.vue";

export default {
  setup: () => {
    defineAutoCatalogIconComponent(MyIconComponent);
  },
};
```

:::

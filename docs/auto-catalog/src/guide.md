---
title: Guide
icon: lightbulb
---

With `vuepress-plugin-auto-catalog`, you can easily get automatically generated catalog pages for your theme.

<!-- more -->

## Extracting Info

First, you should set catalog info in routeMeta:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsPage: (page) => {
    // set catalog info in routeMeta
    page.routeMeta = {
      // catalog title
      title: page.title,
      // ... other information
    };
  },
});
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  extendsPage: (page) => {
    // set catalog info in routeMeta
    page.routeMeta = {
      // catalog title
      title: page.title,
      // ... other information
    };
  },
};
```

:::

You can then import `defineAutoCatalogGetter` from `vuepress-plugin-auto-catalog/client` and use it in client config file to extract catalog info from meta.

::: code-tabs#language

@tab TS

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineAutoCatalogGetter } from "vuepress-plugin-auto-catalog/client";

export default defineClientConfig({
  setup: () => {
    defineAutoCatalogGetter((meta) =>
      meta.title ? { title: meta.title } : null,
    );
  },
});
```

@tab JS

```js
// .vuepress/client.js
import { defineAutoCatalogGetter } from "vuepress-plugin-auto-catalog/client";

export default {
  setup: () => {
    defineAutoCatalogGetter((meta) =>
      meta.title ? { title: meta.title } : null,
    );
  },
};
```

:::

Catalog info should contains:

- `title`: catalog title
- `order`: catalog order (optional)
- `content`: catalog content component (optional)

::: info Sorting with order

The plugin will sort pages by `order` in the following way:

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

:::

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

The `exclude` option accepts an array of string or RegExp:

- `"/foo/"` means only exclude catalog page generation at `/foo/` folder.
- `/^\/foo\//` means exclude catalog page generation at `/foo/` folder and its subfolders.

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

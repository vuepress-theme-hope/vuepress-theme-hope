---
title: Guide
icon: lightbulb
---

With `vuepress-plugin-auto-catalog`, you can easily gets automatically generated catalog pages for your theme.

## Excluding pages

There may be some cases you have a `/foo/bar.md`, but do not want to generate a catalog page at `/foo/`, in this case, you can use `exclude` option to exclude the page.

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      exclude: ["/foo/"],
    }),
  ],
};
```

The `exclude` option accepts an array of string or RegExp.

## Controlling Page Frontmatter

By default, the plugin will generate catalog page title from folder name. However, sometimes you may want to make some customize, so you can set `frontmatter` option as a function which receives catalog page path as argument and you shall return a object containing the frontmatter you want.

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => {
        return {
          // frontmatter you want
          // you may customize title, author. time, etc.
        };
      },
    }),
  ],
};
```

## Customizing Component

The plugin register and use `<AutoCatalog />` component by default, if you do not like the built-in component and want to use your own, you can register your component globally and set `component` option with your component name.

## Using AutoCatalog Component

The default `<AutoCatalog />` will render 3 levels of pages as catalog items, and you can change the level depth by setting `level` option (Only `1` `2` and `3` are supported).

You can use `<AutoCatalog />` in your theme layout, or in your markdown files directly.

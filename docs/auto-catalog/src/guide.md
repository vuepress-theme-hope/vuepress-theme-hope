---
title: Guide
icon: lightbulb
---

With `vuepress-plugin-auto-catalog`, you can easily get automatically generated catalog pages for your theme.

## Controlling Catalog

You can set `shouldIndex`, `titleGetter` and `orderGetter` in plugin options to control catalog.

- `shouldIndex` option is a function which receives `Page` object as argument and returns a boolean value, if the function returns `false`, the page will be ignored, otherwise, the page will be indexed.
- `titleGetter` option is a function which receives a `Page` object as argument and returns a string value, the string value will be used as the page title, by default the plugin will use `page.title`.
- `orderGetter` option is a function which receives `Page` object as argument and returns a number value if possible, the larger the number is, the former the page will be in the catalog.

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

By default, the plugin will generate catalog page title from folder name. However, sometimes you may want to make some customize, so you can set `frontmatter` option as a function which receives catalog page path as argument and you shall return an object containing the frontmatter you want.

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

If you want to add index number to catalog item, you should add `index` props to `<AutoCatalog />` component.

By default, `<AutoCatalog />` generates catalog for current folder. If you want to generate catalog for other folder, you can set `base` props to `<AutoCatalog />` component.

You can use `<AutoCatalog />` in your theme layout, or in your markdown files directly.

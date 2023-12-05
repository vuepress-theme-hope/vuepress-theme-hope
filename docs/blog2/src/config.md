---
title: Config
icon: gears
---

## Plugin Options

### getInfo

- Type: `(page: Page) => Record<string, unknown>`
- Required: No
- Details:
  - [Guide → Gathering Info](./guide.md#gathering-info)

Function getting article info.

Article info will be injected in route meta so that they will be available later in client composables.

### filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`
- Details:
  - [Guide → Collecting Articles](./guide.md#collecting-articles)

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

### category

- Type: `BlogCategoryOptions[]`
- Required: No
- Details:
  - [Guide → Customizing Categories and Types](./guide.md#customizing-categories-and-types)

Blog category config, see [Blog Category Config](#blog-category-config)

### type

- Type: `BlogTypeOptions[]`
- Required: No
- Details:
  - [Guide → Customizing Categories and Types](./guide.md#customizing-categories-and-types)

Blog type config, see [Blog Type Config](#blog-type-config)

### slugify

- Type: `(name: string) => string`
- Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify function, used to convert key name which they are register in routes.

### excerpt

- Type: `boolean`
- Default: `true`
- Details:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)

Whether generate excerpt for page.

### excerptSeparator

- Type: `string`
- Default: `<!-- more -->`
- Details:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)

Separator used to split excerpt from page content.

### excerptLength

- Type: `number`
- Default: `300`
- Details:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)

Length of excerpt when auto generating.

::: note

Excerpt length will be the minimal possible length reaching this value.

You can set it to `0` to disable auto excerpt generation.

:::

### excerptFilter

- Type: `(page: Page) => boolean`
- Default: `filter` option
- Details:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)

Page filter, determine whether the plugin should generate excerpt for it.

::: tip

You should use this to skip pages that you don't need to generate excerpt for. E.g.: If users set `excerpt` or `description` in frontmatter, you may want to use them directly.

:::

### isCustomElement

- Type: `(tagName: string) => boolean`
- Default: `() => false`
- Details:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)

Tags which is considered as custom elements.

This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt.

### metaScope

- Type: `string`
- Default: `"_blog"`

Key used when injecting info to route meta.

::: note

Setting to an empty key will inject to route meta directly instead of a field.

:::

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether enable hotReload in devServer.

::: note To theme developers

It's disabled by default because it does have performance impact in sites with a lot of categories and types. And it can slow down hotReload speed when editing Markdown.

If users are adding or organizing your categories or tags, you may tell them to enable this, for the rest it's better to keep it disabled.

Also, you can try to detect number of pages in users project and decide whether to enable it.

:::

## Blog Category Config

Blog category config should be an array, while each item is controlling a "category" rule.

```ts
interface BlogCategoryOptions {
  /**
   * Unique category name
   */
  key: string;

  /**
   * Function getting category from page
   */
  getter: (page: Page) => string[];

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path pattern of page to be registered
   *
   * @description `:key` will be replaced by the "slugify" result of the original key
   *
   * @default `/:key/`
   */
  path?: string;

  /**
   * Page layout name
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Frontmatter
   */
  frontmatter?: (localePath: string) => Record<string, string>;

  /**
   * Item page path pattern or custom function to be registered
   *
   * @description When filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the original key and name
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string);

  /**
   * Item page layout name
   *
   * @default 'Layout'
   */
  itemLayout?: string;

  /**
   * Items Frontmatter
   */
  itemFrontmatter?: (
    name: string,
    localePath: string,
  ) => Record<string, string>;
}
```

## Blog Type Config

Blog type config should be an array, while each item is controlling a "type" rule.

```ts
interface BlogTypeOptions {
  /**
   * Unique type name
   */
  key: string;

  /**
   * A filter function to determine whether a page should be the type
   */
  filter: (page: Page) => boolean;

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Page path to be registered
   *
   * @default '/:key/'
   */
  path?: string;

  /**
   * Layout name
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Frontmatter
   */
  frontmatter?: (localePath: string) => Record<string, string>;
}
```

## Composition API

You can import the following API from `vuepress-plugin-blog2/client`.

- Blog category

  ```ts
  declare const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<T>>;
  ```

  Argument `key` should be the category unique key.

  If no key is passed, the plugin will try to use the key in current path.

- Blog category

  ```ts
  declare const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogTypeData<T>>;
  ```

  Argument `key` should be the type unique key.

  If no key is passed, the plugin will try to use the key in current path.

Returning values are:

```ts
interface Article<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Article path */
  path: string;
  /** Article info */
  info: T;
}

interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Category path */
  path: string;

  /**
   * Only available when current route matches an item path
   */
  currentItems?: Article<T>[];

  /** Category map */
  map: {
    /** Unique key under current category */
    [key: string]: {
      /** Category path of the key */
      path: string;
      /** Category items of the key */
      items: Article<T>[];
    };
  };
}

interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Type path */
  path: string;

  /** Items under current type */
  items: Article<T>[];
}
```

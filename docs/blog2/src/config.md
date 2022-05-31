---
title: Options
icon: config
---

## Plugin Options

### getInfo

- Type: `(page: Page) => Record<string, unknown>`
- Required: No

Function getting article info.

Article info will injected in route meta so that they will be available later in client composables.

### filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

### category

- Type: `BlogCategoryOptions[]`

Blog category config, see [Blog Category Config](#blog-category-config)

### type

- Type: `BlogTypeOptions[]`

Blog type config, see [Blog Type Config](#blog-type-config)

### slugify

- Type: `(name: string) => string`
- Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify function, used to convert key name which they are register in routes.

### metaScope

- Type: `string`
- Default: `"_blog"`

Key used when injecting info to route meta.

::: note

Setting to an empty key will inject to route meta directly instead of a field.

:::

### hotReload

- Type: `boolean`
- Default: `false`

Whether enable hotReload in devServer.

::: note To theme developers

It’s disabled by default because it does have performance impact in sites with a lot of categories and types. And it can slow down hotReload speed when editing Markdown.

If users are adding or organizing your categories or tags, you may tell them to enable this, for the rest it’s better to keep it disabled.

Also, you can try to detect number of pages in users project and decide whether to enable it.

:::

## Blog Category Config

Blog category config should be an array, while each item is controlling a "category" rule.

```ts
export interface BlogCategoryOptions {
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
    localePath: string
  ) => Record<string, string>;
}
```

## Blog Type Config

Blog type config should be an array, while each item is controlling a "type" rule.

```ts
export interface BlogTypeOptions {
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

- Blog category

  ```ts
  export declare const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>
  >(
    key?: string
  ) => ComputedRef<BlogCategoryData<T>>;
  ```

  Argument `key` should be the category unique key.

  If no key is passed, the plugin will try to use the key in current path.

- Blog category

  ```ts
  export declare const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>
  >(
    key?: string
  ) => ComputedRef<BlogTypeData<T>>;
  ```

  Argument `key` should be the type unique key.

  If no key is passed, the plugin will try to use the key in current path.

Returning values are:

```ts
export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /** Article path */
  path: string;
  /** Article info */
  info: T;
}

export interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>
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

export interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /** Type path */
  path: string;

  /** Items under current type */
  items: Article<T>[];
}
```

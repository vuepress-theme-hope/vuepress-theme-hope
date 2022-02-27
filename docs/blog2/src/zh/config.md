---
title: 选项
icon: config
---

## 插件选项

### getInfo

- 类型: `(page: Page) => Record<string, unknown>`
- 必填: 否

获取文章信息的函数。

获取到的信息会被稍后注入至路由元数据，以便你可以在客户端中通过组合式 API 获取。

### filter

- 类型: `(page: Page) => boolean`
- 默认: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

页面过滤器，此函数用于鉴别页面是否作为文章。

默认情况下，所有从 Markdown 源文件中生成的非主页页面，会被作为文章。

### category

- 类型: `BlogCategoryOptions[]`

博客分类配置，详见 [博客分类配置](#博客分类配置)。

### type

- 类型: `BlogTypeOptions[]`

博客分类配置，详见 [博客类型配置](#博客类型配置)。

### slugify

- 类型: `(name: string) => string`
- 默认: `(name) => name.replace(/ _/g, '-').toLowerCase()`

Slugify 函数，用于转换 key 在路由中注册的形式。

### metaScope

- 类型: `string`
- 默认: `'_blog'`

注入文章信息至路由元数据时使用的键名。

::: note

设置为空字符串会直接注入路由元数据 (而不是一个键下)。

:::

### hotReload

- 类型: `boolean`
- 默认值: `false`

是否在开发服务器中中启用实时热重载。

::: note 致主题开发者

默认情况下它是禁用的，因为它确实会对具有很多分类和类别的站点产生性能影响，并且在编辑 markdown 时会减慢热重载的速度。

如果用户正在添加或组织类别或标签，您可以告诉他们启用此功能，其余的时间最好禁用它。

此外，您可以尝试检测用户项目中的页面数并决定是否启用它。

:::

## 博客分类配置

博客分类配置应为一个数组，每一项控制一个分类规则。

```ts
export interface BlogCategoryOptions {
  /**
   * 唯一的分类名称
   */
  key: string;

  /**
   * 从页面中获取分类的函数
   */
  getter: (page: Page) => string[];

  /**
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * 路径图案
   *
   * @description `:key` 将会被替换为原 key 的 slugify 结果
   *
   * @default `/:key/`
   */
  path?: string;

  /**
   * 布局组件名称
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * 路径图案或自定义函数
   *
   * @description 当填入字符串的时候, `:key` 和 `:name` 会被自动替换为原始的 key、name 的 slugify 结果。
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string);

  /**
   * 项目布局组件名称
   *
   * @default 'Layout'
   */
  itemLayout?: string;
}
```

## 博客类型配置

博客类型配置应为一个数组，每一项控制一个类型规则。

```ts
export interface BlogTypeOptions {
  /**
   * 唯一的类型名称
   */
  key: string;

  /**
   * 一个过滤函数来决定页面是否满足此类型
   */
  filter: (page: Page) => boolean;

  /**
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * 需要注册的页面路径
   *
   * @default '/:key/'
   */
  path?: string;

  /**
   * 布局组件名称
   *
   * @default 'Layout'
   */
  layout?: string;
}
```

## 可组合式 API

- 博客分类

  ```ts
  export declare const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>
  >(
    key?: string
  ) => ComputedRef<BlogCategoryData<T>>;
  ```

  参数 `key` 为需要获取的键名。如果未传入 key，会尝试使用与当前路径匹配的 key。

- 博客类型

  ```ts
  export declare const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>
  >(
    key?: string
  ) => ComputedRef<BlogTypeData<T>>;
  ```

  参数 `key` 为需要获取的键名。如果未传入 key，会尝试使用与当前路径匹配的 key。

详细的返回值如下:

```ts
export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  info: T;
}

export type Articles<
  T extends Record<string, unknown> = Record<string, unknown>
> = Article<T>[];

export interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  /**
   * 仅当当前路径与当前分类的某个项目路径一致时可用
   */
  currentItems?: Articles<T>;
  map: Record<string, { path: string; items: Articles<T> }>;
}

export interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  items: Articles<T>;
}
```

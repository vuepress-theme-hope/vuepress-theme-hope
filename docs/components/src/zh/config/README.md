---
title: 插件选项
icon: config
---

## backToTop

- 类型: `boolean`
- 默认: `false`

是否启用返回顶部按钮

## backToTopThreshold

- 类型: `number`
- 默认: `300`

返回顶部按钮触发距离 (单位：像素)

## breadcrumb

- 类型: `boolean`
- 默认: `false`

是否注册路径导航

## badge

- 类型: `boolean`
- 默认: `false`

是否注册徽章

## pageinfo

- 类型: `boolean`
- 默认: `false`

是否注册页面信息组件

## pagination

- 类型: `boolean`
- 默认: `false`

是否注册分页组件

## screenFull

- 类型: `boolean`
- 默认: `false`

是否注册全屏按钮

## wordPerminute

- 类型: `number`
- 默认: `300`

每分钟阅读的字数。

## locales

```ts
interface ComponentLocaleData {
  /**
   * 返回顶部文字
   */
  backToTop: string;

  /**
   * 在新窗口中打开
   */
  openInNewWindow: string;
}
```

组件国际化配置

## pageInfoLocales

```ts
interface PageInfoLocaleData {
  /**
   * 作者文字
   */
  author: string;

  /**
   * 写作日期文字
   */
  date: string;

  /**
   * 标记原创的文字
   */
  origin: string;

  /**
   * 访问量文字
   */
  views: string;

  /**
   * 标签文字
   */
  tag: string;

  /**
   * 分类文字
   */
  category: string;

  /**
   * 期望阅读时间文字
   */
  readingTime: string;

  /**
   * 文章字数
   */
  words: string;
}
```

页面信息的国际化配置。

## paginationLocales

```ts
interface PaginationLocaleData {
  /**
   * 上一页文字
   */
  prev: string;

  /**
   * 下一页文字
   */
  next: string;

  /**
   * 跳转提示文字
   */
  navigate: string;

  /**
   * 跳转按钮文字
   */
  button: string;

  /**
   * 页码错误文字，其中 `$page` 会自动替换为当前的总页数
   */
  errorText: string;
}
```

分页的国际化配置

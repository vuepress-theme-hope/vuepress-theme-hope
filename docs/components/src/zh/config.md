---
title: 插件选项
icon: config
---

## components

- 类型: `AvailableComponent[]`
- 默认: `[]`

需要被注册的组件

```ts
type AvailableComponent = "ArticleInfo" | "Badge";
```

## backToTop

- 类型: `boolean`
- 默认: `false`

是否启用返回顶部按钮

## backToTopThreshold

- 类型: `number`
- 默认: `300`

返回顶部按钮触发距离 (单位：像素)

## articleInfoLocales

- 类型: `ArticleInfoLocaleConfig`

  ```ts
  interface ArticleInfoLocaleData {
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

  interface ArticleInfoLocaleConfig {
    [localePath: string]: ArticleInfoLocaleData;
  }
  ```

- 必填: 否

文章信息的国际化配置。

## backToTopLocales

- 类型: `BackToTopLocaleConfig`

  ```ts
  interface BackToTopLocaleData {
    /**
     * 返回顶部文字
     */
    backToTop: string;
  }

  interface BackToTopLocaleConfig {
    [localePath: string]: BackToTopLocaleData;
  }
  ```

- 必填: 否

返回顶部按钮国际化配置。

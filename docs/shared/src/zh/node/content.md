---
title: 内容相关
---

与内容相关的函数应该在 Node 侧被调用，你应该仅在 Node 端代码中从 `vuepress-shared/node` 导入它们。

## getPageExcerpt

获取页面摘要

```ts
export interface PageExcerptOptions {
  /**
   * 摘要分隔符
   *
   * @default '<!-- more -->'
   */
  excerptSeparator?: string;

  /**
   * 摘要的长度
   *
   * @description 摘要的长度会尽可能的接近这个值
   *
   * @default 300
   */
  excerptLength?: number;

  /**
   * 被认为是自定义元素的标签
   *
   * @description 用于判断一个标签是否是自定义元素，因为在摘要中，所有的未知标签都会被移除
   */
  isCustomElement?: (tagName: string) => boolean;
}

export const getPageExcerpt: (
  app: App,
  page: Page,
  options: PageExcerptOptions = {},
) => string;
```

## getPageText

获取页面纯文本。

::: note

此函数基于简易的 md2text，有诸多限制，不保证转换结果的准确性。

:::

```ts
export const getPageText: (page: Page) => string;
```

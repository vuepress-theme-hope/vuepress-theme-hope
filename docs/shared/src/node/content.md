---
title: Content Related
---

Content related function be called at node side, you shall import them from `vuepress-shared/node` in node side code only.

## getPageExcerpt

Get page excerpt.

```ts
export interface PageExcerptOptions {
  /**
   * Excerpt separator
   *
   * @default '<!-- more -->'
   */
  excerptSeparator?: string;

  /**
   * Length of excerpt
   *
   * @description Excerpt length will be the minimal possible length reaching this value
   *
   * @default 300
   */
  excerptLength?: number;

  /**
   * Tags which is considered as custom elements
   *
   * @description This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt
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

Get page plain text.

::: note

This function is based on a simple md2text, which has many limitations and does not guarantee the accuracy of the conversion results.

:::

```ts
export const getPageText: (page: Page) => string;
```

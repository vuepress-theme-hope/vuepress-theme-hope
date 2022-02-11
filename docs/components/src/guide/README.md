---
title: Guide
icon: creative
---

This plugin register 8 components and 1 global component:

- `<ArticleInfo />`
- `<BackToTop />` (Global Components)
- `<Badge />`
- `<BreadCrumb />`
- `<CodeGroup />`
- `<CodeGroupItem />`
- `<FullScreen />`
- `<PageAnchor />`
- `<Pagination />`

## `<ArticleInfo />`

Article information components, see [ArticleInfo](./article-info.md) for details.

## `<BackToTop />`

Back-to-top Button

## `<BreadCrumb />`

### Props

- `show`: Whether display globally
- `icon`: Whether display icon
- `iconPrefix`: icon class prefix

## Badge

A badge which allows you to diy it’s color.

## `<CodeGroup />`, `<CodeGroupItem />`

Code Group

Demo:

````md
:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-theme-hope
```

:::

::::
````

## `<FullScreen />`

A full-screen button

### Props

- enable: Whether enable this component

## `<PageAnchor />`

TOC list

### 属性

- `items`: page headers

## `<Pagination />`

Paging component.

### Props

- `currentPage`: v-model variable, current page.
- `total`: total number of items
- `perPage`: number of items per page, default is 10

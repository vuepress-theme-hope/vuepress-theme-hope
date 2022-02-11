---
title: 指南
icon: creative
---

此插件注册 8 个组件和一个全局组件:

- `<ArticleInfo />`
- `<BackToTop />` (全局组件)
- `<Badge />`
- `<BreadCrumb />`
- `<CodeGroup />`
- `<CodeGroupItem />`
- `<Pagination />`
- `<PageAnchor />`
- `<FullScreen />`

## `<Article />`

文章信息组件，详见 [文章信息](./article-info.md)。

## `<BackToTop />`

返回顶部按钮

## `<BreadCrumb />`

### 属性

- `show`: 是否全局显示
- `icon`: 是否显示图标
- `iconPrefix`: 图标前缀

## `<Badge />`

支持自定义颜色的徽章

## `<CodeGroup />`, `<CodeGroupItem />`

代码块分组。

案例:

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

全屏按钮组件

### 属性

- `enable`: 是否启用此组件

## `<PageAnchor />`

标题列表

### 属性

- `items`: 页面的标题。

## `<Pagination />`

分页组件。

### 属性

- `currentPage`: V-model 双向绑定，当前为第几个页面。
- `total`: 总项数
- `perPage`: 每页包含的项目数，默认为 10

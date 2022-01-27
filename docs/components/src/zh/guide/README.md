---
title: 指南
icon: creative
---

此插件注册 7 个组件和一个全局组件:

- `<BackToTop />` (全局组件)
- `<Badge />`
- `<BreadCrumb />`
- `<CodeGroup />`
- `<CodeGroupItem />`
- `<Pagination />`
- `<PageInfo />`
- `<ScreenFull />`

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

## `<PageInfo />`

页面信息组件，详见 [页面信息](./page-info.md)。

## `<Pagination />`

分页组件。

### 属性

- `currentPage`: V-model 双向绑定，当前为第几个页面。
- `total`: 总项数
- `perPage`: 每页包含的项目数，默认为 10

## `<ScreenFull />`

全屏按钮组件

### 属性

- `enable`: 是否启用此组件

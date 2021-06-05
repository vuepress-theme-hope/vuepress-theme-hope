# @mr-hope/vuepress-plugin-components

[![Version](https://img.shields.io/npm/v/@mr-hope/vuepress-plugin-components.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@mr-hope/vuepress-plugin-components.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/@mr-hope/vuepress-plugin-components?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mr-hope/vuepress-plugin-components)

Components for vuepress-theme-hope.

## Usage

```bash
npm i @mr-hope/vuepress-plugin-components
```

or

```bash
yarn add @mr-hope/vuepress-plugin-components
```

This plugin register 6 components and 1 global component:

- BackToTop (Global Components)
- BreadCrumb
- CodeGroup and CodeGroupItem
- MyBadge
- Pagination
- ScreenFull

## BackToTop

Back-to-top Button

## BreadCrumb

Will read these options from `themeConfig`:

- `breadcrumbIcon`: Wether to display icon (default is `true`)
- `breacurmb`: Wether to use path navigator
- `iconPrefix`: Icon-font prefix, default is `icon-`. Set `false` or `''` to cancel auto-prefix。

## CodeGroup and CodeGroupItem

Generate a CodeGroup

## MyBadge

A badge which allows you to diy it’s color.

## Pagination

Paging component.

### Props

- currentPage: v-model variable, current page.
- total: total number of items
- perPage: number of items per page, default is 10

## ScreenFull

A full-screen button

---

vuepress-theme-hope 的组件。

## 使用

```bash
npm i @mr-hope/vuepress-plugin-components
```

或

```bash
yarn add @mr-hope/vuepress-plugin-components
```

此插件注册 6 个组件和一个全局组件:

- BackToTop (全局组件)
- BreadCrumb
- CodeGroup and CodeGroupItem
- MyBadge
- Pagination
- ScreenFull

## `<BackToTop />`

返回顶部按钮

## `<CodeGroup />` and `<CodeGroupItem />`

生成代码块组

## `<BreadCrumb />`

会读取主题配置中的以下字段

- `breadcrumbIcon`: 是否显示图标(默认显示)
- `breacurmb`: 是否启用路径导航
- `iconPrefix`: 图标前缀，默认为 `icon-`，设置 `false` 或 `''` 取消前缀，也可设置其他值。

## `<MyBadge />`

支持自定义颜色的徽章

## `<Pagination />`

分页组件。

### 属性

- currentPage: V-model 双向绑定，当前为第几个页面。
- total: 总项数
- perPage: 每页包含的项目数，默认为 10

## `<ScreenFull />`

全屏按钮组件

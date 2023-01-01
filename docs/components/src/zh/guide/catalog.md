---
title: Catalog
---

该组件用于显示目录。

你可以在 Markdown 中使用它来添加图标。

<!-- more -->

## 示例

指南目录:

<Catalog />

主页目录:

<Catalog base="/zh/" />

## 属性

### base

- 类型: `string`
- 必填: `当前路由的基础路径`

目录基础路径

### level

- 类型: `1 | 2 | 3`
- 默认值: `3`

Catalog 的最大层级

### titleGetter

- 类型: `(meta: RouteMeta) => string`
- 默认值: `(meta: RouteMeta) => meta["title"]`

页面标题获取器

### iconGetter

- 类型: `(meta: RouteMeta) => string`
- 默认值: `(meta: RouteMeta) => meta["icon"]`

页面图标获取器

### orderGetter

- 类型: `(meta: RouteMeta) => string`
- 默认值: `(meta: RouteMeta) => meta["order"]`

页面顺序获取器

### shouldIndex

- 类型: `(meta: RouteMeta) => boolean`
- 默认值: `(meta: RouteMeta) => meta["index"] !== false`

页面是否应该被索引

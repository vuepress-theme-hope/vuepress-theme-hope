---
title: 主题布局配置
icon: config
category: config
tags:
  - themeConfig
  - config
---

以下是主题提供的外观配置选项，一般情况下你无需关注他们，它们仅为有相关配置需求的少数用户提供。

## algoliaType

- 类型: `"dropdown" | "full"`
- 默认值: `"dropdown"`

Algolia 搜索框类型

## iconPrefix

- 类型: `string`
- 默认值: `'icon-'`

设置 iconfont 的图标前缀

## anchorDisplay

- 类型: `boolean`
- 默认值: `true`

是否在桌面模式显示锚点标题

## wordPerminute

- 类型: `number`
- 默认值: `300`

每分钟的阅读字数

## navAutoHide

- 类型: `"always" | "mobile" | "none"`
- 默认值: `"mobile"`

是否在向下滚动时自动隐藏导航栏

## sidebarIcon

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏显示图标

## breadcrumb

- 类型: `boolean`
- 默认值: `true`

是否全局启用路径导航

## breadcrumbIcon

- 类型: `boolean`
- 默认值: `true`

是否在路径导航显示图标

## smoothScroll <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否启用平滑滚动功能

## backToTop

- 类型: `boolean | number`
- 默认值: `true`

返回顶部按钮的配置。默认的触发距离为 300px，填入数字时可改变这一触发距离。填入 `false` 会禁用返回顶部按钮。

## repoDisplay

- 类型: `boolean`
- 默认值: `true`

是否在导航栏显示仓库链接

## fullscreen

- 类型: `boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮

---
title: 主题外观配置
icon: config
category: config
tags:
  - themeConfig
  - config
---

以下配置项控制主题的外观。

一般情况下你无需关注他们，它们仅为有相关配置需求的少数用户提供。

## iconPrefix

- 类型: `string`
- 默认值: `'icon-'`

设置 iconfont 的图标前缀

## algoliaType

- 类型: `"dropdown" | "full"`
- 默认值: `"dropdown"`

Algolia 搜索框类型

## hideSiteTitleonMobile

- 类型: `boolean`
- 默认值: `true`

是否在移动视图下隐藏站点名称

## repoDisplay

- 类型: `boolean`
- 默认值: `true`

是否在导航栏显示仓库链接

## fullscreen

- 类型: `boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮

## sidebarIcon

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏显示图标

## sidebarDepth

- 类型: `number`
- 默认值: `2`

侧边栏嵌套的标题深度

## breadcrumbIcon

- 类型: `boolean`
- 默认值: `true`

是否在路径导航显示图标

## contributor

- 类型: `boolean`
- 默认值: `true`

是否显示当前页面贡献者

## editLinks

- 类型: `boolean`
- 默认值: `true`

显示编辑本页链接

## updateTime

- 类型: `boolean`
- 默认值: `true`

显示更新时间

## backToTop

- 类型: `boolean | number`
- 默认值: `true`

返回顶部按钮的配置。默认的触发距离为 300px，填入数字时可改变这一触发距离。填入 `false` 会禁用返回顶部按钮。

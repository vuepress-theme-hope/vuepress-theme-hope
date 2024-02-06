---
title: SiteInfo
---

站点信息组件，可用于友情链接或项目展示。

<!-- more -->

## 示例

<!-- #region demo -->

::: md-demo 基础站点信息

<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

:::

::: md-demo 有更多属性的站点信息

<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mister-hope.com"
  logo="https://mister-hope.com/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

:::

<!-- #endregion demo -->

## 属性

### name

- 类型: `string`
- 必填: 是

站点名称

### preview

- 类型: `string`
- 必填: 是

站点预览图，必须为绝对路径或完整 URL。

### desc

- 类型: `string`
- 必填: 否

站点描述

### logo

- 类型: `string`
- 必填: 否

站点图标

### repo

- 类型: `string`
- 必填: 否

站点源代码仓库。

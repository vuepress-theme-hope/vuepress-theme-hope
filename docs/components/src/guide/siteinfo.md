---
title: SiteInfo
---

SiteInfo component, can be used as friend link or project display.

<!-- more -->

## Demo

Basic site info:

<SiteInfo name="Mr.Hope's Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope's Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

Site info with more properties:

<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

## Props

### name

- 类型: `string`
- 必填: 是

站点名称

### preview

- 类型: `string`
- 必填: 是

站点预览图片，必须为绝对路径或完整路径

### desc

- 类型: `string`
- 默认值: `''`

站点详情

### logo

- 类型: `string`
- 默认值: `''`

站点图标

### repo

- 类型: `string`
- 默认值: `''`

站点原仓库。

---
title: SiteInfo
---

站点信息组件，可用于友情链接或项目展示。

<!-- more -->

## 示例

基础站点信息:

<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

有更多属性的站点信息:

<SiteInfo
  name="Mr.Hope’s Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="Mr.Hope’s Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

## 属性

### name

- Type: `string`
- Required: Yes

Name of the site.

### preview

- Type: `string`
- Required: Yes

Pewview image of the site. Must be absolute path or full URL.

### desc

- Type: `string`
- Default: `''`

Description of the site.

### logo

- Type: `string`
- Default: `''`

Logo of the site.

### repo

- Type: `string`
- Default: `''`

Source repo of the site.

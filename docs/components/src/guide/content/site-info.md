---
title: SiteInfo
---

SiteInfo component, can be used as friend link or project display.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo Basic site info

<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

:::

::: md-demo Site info with more properties

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

## Props

### name

- Type: `string`
- Required: Yes

Site name

### preview

- Type: `string`
- Required: Yes

Site preview image, must be absolute path or complete URL.

### desc

- Type: `string`
- Required: No

Site description

### logo

- Type: `string`
- Required: No

Site logo

### repo

- Type: `string`
- Required: No

Site repository

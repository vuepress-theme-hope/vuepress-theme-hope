---
title: SiteInfo
---

SiteInfo component, can be used as friend link or project display.

<!-- more -->

## Demo

<!-- #region demo -->

::: preview Basic site info

<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

:::

::: preview Site info with more properties

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

## Options

::: fields
@`name` type=string required

Site name.

@`preview` type=string required

Site preview image, must be an absolute path or a complete URL.

@`desc` type=string

Site description.

@`logo` type=string

Site logo.

@`repo` type=`string | string[]`

Site repository.

:::

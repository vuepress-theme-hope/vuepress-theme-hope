---
title: stylus configuration
icon: skinfill
category: config
tags:
  - config
  - style
---

You can use palette.styl in `.vuepress/styles` folder to change the style of this theme。

<!-- more -->

## Responsive breakpoints

```stylus
/* responsive breakpoints */
$MQWide ?= 1440px // wide screen
$MQNormal ?= 1280px // desktop
$MQNarrow ?= 959px // narrow desktop / iPad
$MQMobile ?= 719px // wide mobile
$MQMobileNarrow ?= 419px // narrow mobile
```

## Layout

```stylus
// layout
$navbarHeight ?= 3.6rem
$sidebarWidth ?= 18rem
$mobileSidebarWidth ?= $sidebarWidth
$contentWidth ?= 740px
$homePageWidth ?= 960px
$navbar-vertical-padding ?= 0.7rem
$navbar-horizontal-padding ?= 1.5rem
```

## Color

```stylus
/* basic color */
$accentColor ?= #3eaf7c
$textColor ?= #2c3e50
$nightTextColor ?= #9e9e9e
$bgColor ?= #fff
$nightBgColor ?= #1e1e1e
$borderColor ?= #eaecef
$nightBorderColor ?= #302d28
$codeBgColor ?= #ecf4fa
$nightCodeBgColor ?= #282c34
$arrowBgColor ?= #ccc
$nightArrowBgColor ?= #333

/* additional color provided by theme */
$boxShadowColor ?= #f0f1f2
$nightBoxShadowColor ?= #0f0e0d
$cardShadowColor ?= rgba(0, 0, 0, 0.15)
$nightCardShadowColor ?= rgba(0, 0, 0, 0.3)

/* badge color */
$badgeTipColor ?= #42b983
$badgeWarningColor ?= darken(#ffe564, 35%)
$badgeErrorColor ?= #DA5961
```

## Markdown

```stylus
/* content class */
$contentClass ?= '.theme-default-content'

/* code block */
$lineNumbersWrapperWidth ?= 2.5rem
$codeLang ?= js ts html md vue css sass scss less stylus go java c sh yaml py docker dockerfile makefile
```

## ThemeColor

Use `$colorPicker` to config theme color, should be the same as themeConfig.

Case:

```stylus
$colorPicker = {
  red: #f26d6d,
  blue: #2196f3,
  green: #3eaf7c,
  orange: #fb9b5f
}
```

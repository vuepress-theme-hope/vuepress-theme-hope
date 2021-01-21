---
title: Stylus 配置
icon: config
category: config
tags:
  - config
  - style
---

你可以通过在 `.vuepress/styles` 中的 palette.styl 写入变量值来更改主题的样式。

<!-- more -->

## 响应式布局断点

```stylus
/* responsive breakpoints */
$MQWide ?= 1440px // wide screen
$MQNormal ?= 1280px // desktop
$MQNarrow ?= 959px // narrow desktop / iPad
$MQMobile ?= 719px // wide mobile
$MQMobileNarrow ?= 419px // narrow mobile
```

## 布局

```stylus
// layout
$navbarHeight ?= 3.6rem
$navbarMobileHeight ?= 3.2rem
$navbarHorizontalPadding ?= 1.5rem
$navbarMobileHorizontalPadding ?= 1rem
$navbarVerticalPadding ?= 0.7rem
$navbarMobileVerticalPadding ?= 0.4rem
$sidebarWidth ?= 18rem
$mobileSidebarWidth ?= $sidebarWidth
$contentWidth ?= 740px
$homePageWidth ?= 960px
```

## 颜色

```stylus
/* basic color */
$accentColor ?= #3eaf7c
$textColor ?= #2c3e50
$darkTextColor ?= #9e9e9e
$bgColor ?= #fff
$darkBgColor ?= #1e1e1e
$bgColorLight ?= #f8f8f8
$darkBgColorLight ?= #272727
$bgColorBlur ?= rgba(255, 255, 255, 0.9)
$darkBgColorBlur ?= rgba(30, 30, 30, 0.9)
$borderColor ?= #eaecef
$darkBorderColor ?= #302d28
$codeBgColor ?= #ecf4fa
$darkCodeBgColor ?= #282c34
$arrowBgColor ?= #ccc
$darkArrowBgColor ?= #333

/* additional color provided by theme */
$boxShadowColor ?= #f0f1f2
$darkBoxShadowColor ?= #0f0e0d
$cardShadowColor ?= rgba(0, 0, 0, 0.15)
$darkCardShadowColor ?= rgba(0, 0, 0, 0.3)

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

## 主题色

使用 `$colorPicker` 进行主题选择器配置，需要与主题配置中的选择器配置相同。

案例:

```stylus
$colorPicker = {
  red: #f26d6d,
  blue: #2196f3,
  green: #3eaf7c,
  orange: #fb9b5f
}
```

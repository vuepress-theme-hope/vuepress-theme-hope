---
title: 样式迁移指南
icon: style
category:
  - 迁移
tag:
  - 迁移
  - 样式
---

## 预处理器变更

整个样式系统从 Stylus 迁移到 Scss，这带来了以下更改:

- `palette.styl` 拆分为 `config.scss` 和 `palette.scss`
- `index.styl` 改为 `index.scss`

## 样式变更

### 响应式布局断点

移动至 `config.scss`。

- `$MQWide` 重命名为 `$wide`
- `$MQNormal` 重命名为 `$desktop`
- `$MQNarrow` 重命名为 `$pad`
- `$MQMobile` 重命名为 `$mobile`
- `$MQMobileNarrow` 重命名为 `$mobileS`

### 布局

移动至 `palette.scss`。

- `$mobileSidebarWidth` 重命名为 `$sidebarMobileWidth`
- `$lineNumbersWrapperWidth` 重命名为 `$lineNumbersWidth`

### 颜色

移动至 `palette.scss`。

- `$accentColor` 重命名为 `$themeColor`
- `$textColor`, `$darkTextColor` 合并为 `$textColor`
- `$bgColor`, `$darkBgColor` 合并为 `$bgColor`
- `$bgColorLight`, `$darkBgColorLight` 合并为 `$bgColorLight`
- `$bgColorBlur`, `$darkBgColorBlur` 合并为 `$bgColorBlur`
- `$cardShadowColor`, `$darkCardShadowColor` 合并为 `$cardShadow`
- `$boxShadowColor`, `$darkBoxShadowColor` 合并为 `$boxShadow`

- `$arrowBgColor` 移除

- `$colorPicker` 移除

  现在你只需要在 `themeConfig` 中设置主题色

- `$codeBgColor`, `$darkCodeBgColor` 移除，请在 `config.scss` 中配置 `$codeLightTheme` 和 `$codeDarkTheme`。

### 字体

- 新增 `$fontFamily`, `$fontFamilyFancy` 和 `$fontFamilyCode`

### 动画

- 新增 `$colorTransition` 和 `$transformTransition`

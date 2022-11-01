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

- `$MQWide` 重命名为 `$pc`
- `$MQNormal` 重命名为 `$laptop`
- `$MQNarrow` 重命名为 `$pad`
- `$MQMobile` 重命名为 `$tablet`
- `$MQMobileNarrow` 重命名为 `$mobile`

### 布局

移动至 `palette.scss`。

- `$mobileSidebarWidth` 重命名为 `$sidebar-mobile-width`
- `$lineNumbersWrapperWidth` 重命名为 `$line-numbers-width`

### 颜色

移动至 `palette.scss`。

- 新增 `$bg-color-secondary`

- `$accentColor` 重命名为 `$theme-color`

- `$textColor`, `$darkTextColor` 合并为 `$text-color`

- `$bgColor`, `$darkBgColor` 合并为 `$bg-color`

- `$cardShadowColor`, `$darkCardShadowColor` 合并为 `$card-shadow`

- `$boxShadowColor`, `$darkBoxShadowColor` 合并为 `$box-shadow`

- `$bgColorLight`, `$darkBgColorLight` 移除

- `$bg-color-blur`, `$darkBgColorBlur` 移除

- `$arrowBgColor` 移除

- `$colorPicker` 移除

  现在你只需要在主题选项中设置主题色

- `$codeBgColor`, `$darkCodeBgColor` 移除，请在 `config.scss` 中配置 `$code-light-theme` 和 `$code-dark-theme`。

### 字体

- 新增 `$font-family`, `$font-family-fancy` 和 `$font-family-code`

### 动画

- 新增 `$color-transition` 和 `$transform-transition`

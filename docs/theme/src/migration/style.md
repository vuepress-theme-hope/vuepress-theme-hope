---
title: Style Migration Guide
icon: style
category:
  - Migration
tag:
  - Migration
  - Style
---

## Preprocessor Changes

The entire style system was migrated from Stylus to Scss, which brought the following changes:

- `palette.styl` split into `config.scss` and `palette.scss`
- `index.styl` changed to `index.scss`

## Style Changes

### Responsive Layout Breakpoints

Move to `config.scss`.

- `$MQWide` renamed to `$wide`
- `$MQNormal` renamed to `$desktop`
- `$MQNarrow` renamed to `$pad`
- `$MQMobile` renamed to `$mobile`
- `$MQMobileNarrow` renamed to `$mobileS`

### Layout

Move to `palette.scss`.

- `$mobileSidebarWidth` renamed to `$sidebar-mobile-width`
- `$lineNumbersWrapperWidth` renamed to `$line-numbers-width`

### Colors

Move to `palette.scss`.

- `$accentColor` renamed to `$theme-color`
- `$textColor`, `$darkTextColor` merged into `$text-color`
- `$bgColor`, `$darkBgColor` merged into `$bg-color`
- `$bgColorLight`, `$darkBgColorLight` merged into `$bg-color-light`
- `$bgColorBlur`, `darkBgColorBlur` merged into `$bg-color-blur`
- `$cardShadowColor`, `$darkCardShadowColor` merged into `$card-shadow`
- `$boxShadowColor`, `$darkBoxShadowColor` merged into `$box-shadow`

- `$arrowBgColor` removed

- `$colorPicker` removed

  Now you just need to set the theme color in `themeConfig`

- `$codeBgColor`, `$darkCodeBgColor` removed, set `$code-light-theme` and `$code-dark-theme` in `config.scss` instead.

### Font

- Added `$font-family`, `$font-family-fancy` and `$font-family-code`

### Transition

- Added `$color-transition` and `$transform-transition`

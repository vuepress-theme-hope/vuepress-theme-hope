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

- `$mobileSidebarWidth` renamed to `$sidebarMobileWidth`
- `$lineNumbersWrapperWidth` renamed to `$lineNumbersWidth`

### Colors

Move to `palette.scss`.

- `$accentColor` renamed to `$themeColor`
- `$textColor`, `$darkTextColor` merged into `$textColor`
- `$bgColor`, `$darkBgColor` merged into `$bgColor`
- `$bgColorLight`, `$darkBgColorLight` merged into `$bgColorLight`
- `$bgColorBlur`, `$darkBgColorBlur` merged into `$bgColorBlur`
- `$cardShadowColor`, `$darkCardShadowColor` merged into `$cardShadow`
- `$boxShadowColor`, `$darkBoxShadowColor` merged into `$boxShadow`

- `$arrowBgColor` removed

- `$colorPicker` removed

  Now you just need to set the theme color in `themeConfig`

- `$codeBgColor`, `$darkCodeBgColor` removed, set `$codeLightTheme` and `$codeDarkTheme` in `config.scss` instead.

### Font

- Added `$fontFamily`, `$fontFamilyFancy` and `$fontFamilyCode`

### Transition

- Added `$colorTransition` and `$transformTransition`

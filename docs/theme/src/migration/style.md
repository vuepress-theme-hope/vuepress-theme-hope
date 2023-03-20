---
title: Style Migration Guide
icon: wand-magic-sparkles
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

- `$MQWide` renamed to `$pc`
- `$MQNormal` renamed to `$laptop`
- `$MQNarrow` renamed to `$pad`
- `$MQMobile` renamed to `$tablet`
- `$MQMobileNarrow` renamed to `$mobile`

### Layout

Move to `palette.scss`.

- `$mobileSidebarWidth` renamed to `$sidebar-mobile-width`
- `$lineNumbersWrapperWidth` renamed to `$line-numbers-width`

### Colors

Move to `palette.scss`.

- Add `$bg-color-secondary`,`$bg-color-tertiary`

- `$accentColor` renamed to `$theme-color`

- `$textColor`, `$darkTextColor` merged into `$text-color`

- `$bgColor`, `$darkBgColor` merged into `$bg-color`

- `$bgColorLight`, `$darkBgColorLight` removed

- `$bgColorBlur`, `darkBgColorBlur` removed

- `$cardShadowColor`, `$darkCardShadowColor` merged into `$card-shadow`

- `$boxShadowColor`, `$darkBoxShadowColor` merged into `$box-shadow`

- `$arrowBgColor` removed

- `$colorPicker` removed

  Now you just need to set the theme color in theme options

- `$codeBgColor`, `$darkCodeBgColor` removed, please set `plugins.prismjs` (prismjs) in theme options, or configure `$code-bg-color` (shiki) in `config.scss`.

### Font

- Add `$font-family`, `$font-family-heading` and `$font-family-mono`

### Transition

- Added `$color-transition` and `$transform-transition`

---
title: Руководство по миграции стилей
icon: wand-magic-sparkles
category:
  - Миграция
tag:
  - Миграция
  - Стиль
---

## Изменения препроцессора

Вся система стилей была перенесена из Stylus в Scss, что принесло следующие изменения:

- `palette.styl` разделен на `config.scss` и `palette.scss`
- `index.styl` изменен на `index.scss`

## Изменения стиля

### Контрольные точки адаптивного макета

Перемещено в `config.scss`.

- `$MQWide` переименован в `$pc`
- `$MQNormal` переименован в `$laptop`
- `$MQNarrow` переименован в `$pad`
- `$MQMobile` переименован в `$tablet`
- `$MQMobileNarrow` переименован в `$mobile`

### Макет

Перемещено в `palette.scss`.

- `$mobileSidebarWidth` переименован в `$sidebar-mobile-width`
- `$lineNumbersWrapperWidth` переименован в `$line-numbers-width`

### Цвета

Перемещено в `palette.scss`.

- Добавлено `$bg-color-secondary`, `$bg-color-tertiary`

- `$accentColor` переименован в `$theme-color`

- `$textColor`, `$darkTextColor` объединены в `$text-color`

- `$bgColor`, `$darkBgColor` объединены в `$bg-color`

- `$bgColorLight`, `$darkBgColorLight` удалено

- `$bgColorBlur`, `darkBgColorBlur` удалено

- `$cardShadowColor`, `$darkCardShadowColor` объединены в `$card-shadow`

- `$boxShadowColor`, `$darkBoxShadowColor` объединены в `$box-shadow`

- `$arrowBgColor` удалено

- `$colorPicker` удалено

  Теперь вам просто нужно установить цвет темы в настройках темы

- `$codeBgColor`, `$darkCodeBgColor` removed, please set `plugins.prismjs` (prismjs) in theme options, or configure `$code-bg-color` (shiki) in `config.scss`.

### Шрифт

- Добавлено `$font-family`, `$font-family-heading` и `$font-family-mono`

### Переход

- Добавлено `$color-transition` и `$transform-transition`

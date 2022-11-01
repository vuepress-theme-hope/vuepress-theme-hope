---
title: Конфиг стиля
icon: style
order: 6
category:
  - Конфиг
tag:
  - Конфиг темы
  - Стиль
---

Вы можете изменить стили темы в `.vuepress/styles`, установив значения переменных в файлах `config.scss` и `palette.scss`.

Также вы можете добавить свои собственные стили в `.vuepress/styles/index.scss`.

<!-- more -->

## config.scss

`config.scss` используется для чистой конфигурации переменных, ниже перечислены поддерживаемые переменные и значения по умолчанию.

Отзывчивые контрольные точки:

- `$pc`
- `$laptop`
- `$pad`
- `$tablet`
- `$mobile`

Блок кода:

- `$code-light-theme`: тема блока кода в светлом режиме
- `$code-dark-theme`: тема блока кода в темном режиме

Класс контента: `$content-class`

Список цветов: `$colors`

::: details Демо

```scss
// modify code theme in lightmode
$code-light-theme: "coy";

// update pc breakpoint
$pc: 1920px;
```

:::

::: details Значение по умолчанию

@[code{7-}](../../../../packages/theme/templates/config.scss)

:::

## palette.scss

`palette.scss` используется для вставки переменных CSS, ниже приведены поддерживаемые конфигурации и значения по умолчанию.

::: info

Все переменные здесь (включая недавно добавленные переменные) будут преобразованы в формат kebab-case и введены как переменные CSS.

Например, `$theme-color` будет введено как `--theme-color`, а `$backgroundColor` будет введено как `--$background-color`.

:::

### Конфигурация цвета

Для всех цветов, если они одинаковы в светлом и темном режимах, вы можете установить их напрямую; в противном случае установите переменную Sass типа Map, чтобы задать значения цвета в светлом и темном режимах соответственно.

Доступные цветовые переменные:

- `$theme-color`: цвет темы
- `$text-color`: цвет текста
- `$bg-color`: цвет фона
- `$bg-color-secondary`: более светлый цвет фона
- `$border-color`: цвет границы
- `$box-shadow`: использование цвета тени для элементов
- `$card-shadow`: использование цвета тени на картах

::: details Демо

```scss
// set theme color to red
$theme-color: red;

// setting border color with a darker value
$border-color: (
  light: #ddd,
  dark: #444,
);
```

:::

::: details Значение по умолчанию

@[code{4-60}](../../../../packages/theme/templates/color.scss)

:::

### Конфигурация макета

Доступные переменные макета:

Панель навигации:

- `$navbar-height`: высота панели навигации
- `$navbar-horizontal-padding`: горизонтальное заполнение навигационной панели
- `$navbar-vertical-padding`: вертикальное заполнение навигационной панели
- `$navbar-mobile-height`: высота панели навигации на мобильных устройствах
- `$navbar-mobile-horizontal-padding`: горизонтальное заполнение панели навигации на мобильных устройствах
- `$navbar-mobile-vertical-padding`: вертикальное заполнение панели навигации на мобильных устройствах

Боковая панель:

- `$sidebar-width`: ширина боковой панели
- `$sidebar-mobile-width`: ширина боковой панели на мобильных устройствах

Содержание:

- `$content-width`: ширина основного содержимого
- `$home-page-width`: ширина содержимого главной страницы

Шрифты:

- `$font-family`: семейство шрифтов, используемое для обычного текста
- `$font-family-fancy:` семейство шрифтов, используемое в причудливых элементах

Код:

- `$font-family-code`: семейство шрифтов, используемое в коде
- `$line-numbers-width`: ширина номера строки в кодовых блоках

Переход:

- `$color-transition`: переход, используемый для цветов
- `$transform-transition`: переход, используемый при анимации преобразования

::: details Демо

```scss
// update navbar height on mobile
$navbar-mobile-height: 3.5rem;

// Override default font
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", sans-serif';
```

:::

::: details Значение по умолчанию

@[code](../../../../packages/theme/templates/layout.scss)

:::

## index.scss

Все, что заполняет это, будет проанализировано до стандартного CSS, а затем вставлено после стилей темы и плагинов.

Таким образом, вы можете добавить новые стили или переопределить стили здесь:

::: details Демо

```scss
// make site name in navbar italic
.site-name {
  font-style: italic;
}
```

:::

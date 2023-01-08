---
title: Другие функции
icon: others
order: 5
category:
  - Интерфейс
tag:
  - Интерфейс
---

## Настройка стиля

Тема позволяет вам устанавливать переменные в `.vuepress/styles/config.scss` и `.vuepress/styles/palette.scss`, чтобы настроить большинство цветов, точки останова, размер макета страницы и другие параметры.

Для получения подробной информации смотрите [Конфиг → Настройка стиля](../../config/style.md)

## Print Button

The theme fully optimize style for print, and there will be a print button at toc in desktop mode by default.

To hide print button, you should set `print: false` in theme options.

## Полноэкранная кнопка

<ToggleFullScreenButton />

Если вам это нужно, вы можете включить его, установив `fullscreen: true` в настройках темы.

::: tip

Если текущий браузер не поддерживает полноэкранный режим, кнопка полноэкранного режима автоматически скрывается.

:::

::: code-tabs#language

@tab TS

```ts {7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

@tab JS

```js {7}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

:::

## Кнопка «Вернуться к началу»

`vuepress-theme-hope` добавляет элемент управления back-to-top, который по умолчанию будет отображаться после прокрутки вниз на 300 пикселей.

Вы можете установить `backToTop: false` в параметрах темы, чтобы отключить его, или установить его на число, чтобы изменить расстояние срабатывания по умолчанию.

## RTL Layout

`vuepress-theme-hope` basically supports RTL layout. Just add the following style to `.vuepress/style/index.scss`

```scss
html {
  direction: rtl;
}
```

You will see that almost everything works fine.

::: note

As we mention above, the theme **basically** supports RTL layout, because not every css property has a "direction adaptive" value, e.g.: `float: left|right`, so you may still need to handle some layouts yourself.

:::

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
</script>

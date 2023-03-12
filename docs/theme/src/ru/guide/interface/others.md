---
title: Другие функции
icon: ellipsis
order: 6
category:
  - Интерфейс
tag:
  - Интерфейс
---

## Настройка стиля

Тема позволяет вам устанавливать переменные в `.vuepress/styles/config.scss` и `.vuepress/styles/palette.scss`, чтобы настроить большинство цветов, точки останова, размер макета страницы и другие параметры.

Для получения подробной информации смотрите [Конфиг → Настройка стиля](../../config/style.md)

## Print Button

Try it: <PrintButton />

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

`vuepress-theme-hope` fully supports RTL layout. Just set `rtl: true` in rtl locales.

Try it: <ToggleRTLButton />

<script setup lang="ts">
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
</script>

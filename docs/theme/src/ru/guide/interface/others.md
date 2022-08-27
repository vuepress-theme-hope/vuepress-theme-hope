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

## Полноэкранная кнопка

Если вам это нужно, вы можете включить его, установив `fullscreen: true` в настройках темы.

::: tip

Если текущий браузер не поддерживает полноэкранный режим, кнопка полноэкранного режима автоматически скрывается.

:::

::: code-tabs#language

@tab TS

```ts
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

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    fullscreen: true,
  }),
};
```

:::

## Кнопка «Вернуться к началу»

`vuepress-theme-hope` добавляет элемент управления back-to-top, который по умолчанию будет отображаться после прокрутки вниз на 300 пикселей.

Вы можете установить `backToTop: false` в параметрах темы, чтобы отключить его, или установить его на число, чтобы изменить расстояние срабатывания по умолчанию.

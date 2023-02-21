---
title: Изображение
icon: image
category:
  - Markdown
tag:
  - Markdown
  - Изображение
---

Улучшите синтаксис изображения в Markdown для поддержки цветовой схемы и размера.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {9-16}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable figure
        figure: true,
        // Enable image lazyload
        imgLazyload: true,
        // Enable image mark
        imgMark: true,
        // Enable image size
        imgSize: true,
      },
    },
  }),
});
```

@tab JS

```js {9-16}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable figure
        figure: true,
        // Enable image lazyload
        imgLazyload: true,
        // Enable image mark
        imgMark: true,
        // Enable image size
        imgSize: true,
      },
    },
  }),
};
```

:::

## Отложенная загрузка изображений

Если вы хотите отложено загружать изображения на своих страницах, вы можете установить `imgLazyload: true` в настройках плагина.

::: note

Мы включаем отложенную загрузку с использованием встроенных функций HTML5, поэтому ваш браузер должен поддерживать атрибут [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

:::

## Маркировка изображения

GFM поддерживает маркировку изображений суффиксом идентификатора, чтобы изображения отображались только в определенном режиме. Мы поддерживаем как разметку GitHub, так и простую разметку `#light` и `#dark`.

Вы можете включить его, установив `plugins.mdEnhance.imgMark: true` в опциях темы.

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details Кейс

Приведенная выше демонстрация отобразит следующий результат

<AppearanceSwitch /> (Попробуйте переключить режим темы)

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

### Расширенный

Вы можете передать объект в `imgMark` для настройки идентификационных меток. Доступны следующие варианты:

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

## Размер изображения

Вы можете использовать `=widthxheight`, чтобы указать размер изображения при установке `plugins.mdEnhance.imgSize: true` в параметрах темы.

```md
![Alt](/example.png =200x300)

![Alt](/example.jpg "Image title" =200x)
![Alt](/example.bmp =x300)
```

Приведенная выше разметка будет проанализирована как:

```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="Image title" width="200" />
<img src="/example.bmp" height="300" />
```

## Figure

Sometimes, you may want to add a description with image and place it between contents, in this case you should set `figure: true` in plugin options.

If the image is standalone in a line, wrapped or not wrapped by link, it will be displayed as `<figure>` and title (or alt) will be displayed as `<figcaption>`.

```md
![VuePress Hope Logo](/favicon.ico)

[![VuePress Hope Logo](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")

[![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/logo.svg "VuePress Hope Logo" =300x300)
```

Will be rendered as:

![VuePress Hope Logo](/favicon.ico)

[![VuePress Hope Logo](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")

[![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/logo.svg "VuePress Hope Logo" =300x300)

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch"
</script>

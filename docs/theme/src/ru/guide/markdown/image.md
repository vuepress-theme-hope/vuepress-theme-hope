---
title: Изображение
icon: pic
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
        // Enable image lazyload
        imageLazyload: true,
        // Enable image mark
        imageMark: true,
        // Enable image size
        imageSize: true,
        // Enable image title
        imageTitle: true,
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
        // Enable image lazyload
        imageLazyload: true,
        // Enable image mark
        imageMark: true,
        // Enable image size
        imageSize: true,
        // Enable image title
        imageTitle: true,
      },
    },
  }),
};
```

:::

## Отложенная загрузка изображений

Если вы хотите отложено загружать изображения на своих страницах, вы можете установить `imageLazyload: true` в настройках плагина.

::: note

Мы включаем отложенную загрузку с использованием встроенных функций HTML5, поэтому ваш браузер должен поддерживать атрибут [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

:::

## Маркировка изображения

GFM поддерживает маркировку изображений суффиксом идентификатора, чтобы изображения отображались только в определенном режиме. Мы поддерживаем как разметку GitHub, так и простую разметку `#light` и `#dark`.

Вы можете включить его, установив `plugins.mdEnhance.imageMark: true` в опциях темы.

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

Вы можете передать объект в `imageMark` для настройки идентификационных меток. Доступны следующие варианты:

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

## Размер изображения

Вы можете использовать `=widthxheight`, чтобы указать размер изображения при установке `plugins.mdEnhance.imageSize: true` в параметрах темы.

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

## Заголовок изображения

Иногда вам может понадобиться добавить описание с изображением, в этом случае вы должны установить `plugins.mdEnhance.imageTitle: true`.

Затем, когда вы добавите заголовок к изображению, изображение будет отображаться как `<figure>`, а заголовок будет отображаться как `<figcaption>`.

```md
![GitHub Logo](/assets/icon/github-light.png "Github Logo")
```

Будет отображаться как:

![GitHub Logo](/assets/icon/github-light.png "Github Logo")

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch.js"
</script>

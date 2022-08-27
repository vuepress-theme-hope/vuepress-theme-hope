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

```ts {9-12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable image mark
        imageMark: true,
        // Enable image size
        imageSize: true,
      },
    },
  }),
});
```

@tab JS

```js {9-12}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable image mark
        imageMark: true,
        // Enable image size
        imageSize: true,
      },
    },
  }),
};
```

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

Вы можете использовать `=widthxheight`, чтобы указать размер изображения при установке `plugins.mdEnhanceimageSize: true` в параметрах темы.

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

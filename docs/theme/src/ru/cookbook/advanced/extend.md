---
title: Расширение темы
icon: extend
category:
  - Продвинутый
tag:
  - Продвинутый
  - Кастомизация
---

`vuepress-theme-hope` поддерживает расширение так же, как `@vuepress/theme-default`.

Вы можете создать свою собственную тему на основе `vuepress-theme-hope` и использовать ее локально или опубликовать в соответствии с вашими потребностями.

## Расширение темы

Вам нужно создать входной файл для вашей темы и импортировать `hopeTheme` из `vuepress-theme-hope`.

В файле ввода установите `extends: hopeTheme(options)`, чтобы расширить тему `vuepress-theme-hope`.

Одноименные псевдонимы (`alias`) и макеты (`layouts`) вашей собственной только что созданной темы имеют более высокий приоритет по сравнению с расширенной темой `vuepress-theme-hope`, что означает, что вы можете переопределить `vuepress-theme-hope` компоненты через `alias` и добавить или переопределить макет, предоставленный `vuepress-theme-hope` через `layouts`.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export const localTheme = (options: HopeThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // Вы можете переопределить или добавить псевдонимы здесь
    // Например, здесь мы меняем компонент HomePage vuepress-theme-hope на component/HomePage.vue под нашей собственной темой
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // Вы можете переопределить или добавить макеты здесь
    // Например, здесь мы меняем макет по умолчанию vuepress-theme-hope на layouts/Layout.vue под нашу собственную тему
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // Также мы добавили макет списка изменений
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
});
```

@tab JS

```js
// .vuepress/them/index.js
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // Вы можете переопределить или добавить псевдонимы здесь
    // Например, здесь мы меняем компонент HomePage vuepress-theme-hope на component/HomePage.vue под нашей собственной темой
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // Вы можете переопределить или добавить макеты здесь
    // Например, здесь мы меняем макет по умолчанию vuepress-theme-hope на layouts/Layout.vue под нашу собственную тему
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // Также мы добавили макет списка изменений
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
});
```

:::

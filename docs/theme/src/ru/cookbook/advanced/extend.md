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

Одноименные алиасы (`alias`) и макеты (`layouts`) вашей собственной только что созданной темы имеют более высокий приоритет по сравнению с расширенной темой `vuepress-theme-hope`, что означает, что вы можете переопределить `vuepress-theme-hope` компоненты через `alias`.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export const localTheme = (options: ThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // Вы можете переопределить или добавить псевдонимы здесь
    // Например, здесь мы меняем компонент HomePage vuepress-theme-hope на component/HomePage.js под нашей собственной темой
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

@tab JS

```js
// .vuepress/theme/index.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // Вы можете переопределить или добавить псевдонимы здесь
    // Например, здесь мы меняем компонент HomePage vuepress-theme-hope на component/HomePage.js под нашей собственной темой
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

:::

::: tip

Если вы хотите использовать файлы `vue`, вы можете создать простую оболочку js, написав:

```js
// wrapper.js
import YouComponent from "./YouComponent.vue";
export default YouComponent;
```

:::

Кроме того, вы можете добавить или переопределить макет, предоставленный `vuepress-theme-hope`, через `layouts` в клиентском файле конфигурации вашей темы.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/config.ts
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // Вы можете переопределить или добавить макеты здесь
  layouts: {
    // Например, здесь мы меняем макет по умолчанию vuepress-theme-hope на layouts/Layout.vue под нашу собственную тему
    Layout,
    // Также мы добавили макет списка изменений
    Changelog,
  },
});
```

@tab JS

```js
// .vuepress/theme/config.js
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // Вы можете переопределить или добавить макеты здесь
  layouts: {
    // Например, здесь мы меняем макет по умолчанию vuepress-theme-hope на layouts/Layout.vue под нашу собственную тему
    Layout,
    // Также мы добавили макет списка изменений
    Changelog,
  },
});
```

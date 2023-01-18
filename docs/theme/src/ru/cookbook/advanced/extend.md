---
title: Расширение темы
icon: clone
order: 4
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

The aliases of the same name (`alias`) and layouts (`layouts`) of your own newly created theme has higher priority over the extended theme `vuepress-theme-hope`, which means that you can override `vuepress-theme-hope` components via `alias` option in theme api, and you can add or override layouts via `layouts` in client config file.

The theme provide the following layouts:

- Layout
- NotFound
- Slide (Only available when presentation is enabled)
- BlogCategory (Only available when blog is enabled)
- BlogHome (Only available when blog is enabled)
- BlogType (Only available when blog is enabled)
- Timeline (Only available when blog is enabled)

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options: ThemeOptions) => ({
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
    // Например, здесь мы меняем компонент HomePage vuepress-theme-hope на component/HomePage.vue под нашей собственной темой
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
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

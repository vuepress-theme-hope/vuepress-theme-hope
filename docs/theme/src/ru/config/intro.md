---
title: Введение в конфиг
icon: gears
order: 1
category:
  - Конфиг
tag:
  - Введение
---

## Концепции конфигурации

VuePress в основном хранит конфигурацию и необходимые файлы в папке `.vuepress/` в каталоге.

::: info

Файловую структуру VuePress см. в разделе [Основы VuePress → Структура файла](../cookbook/vuepress/file.md).

:::

В VuePress есть три концепции конфигурации:

- Конфигурация сайта: это объект, который вы экспортируете непосредственно в файл конфигурации
- Конфиг темы: параметры, переданные в функцию `hopeTheme`
- Конфигурация страницы: предоставляется Frontmatter в верхней части страницы на основе синтаксиса YAML

## Использование темы

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // siteConfig here
  // ...

  theme: hopeTheme({
    // themeConfig here
    // ...
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // siteConfig here
  // ...

  theme: hopeTheme({
    // themeConfig here
    // ...
  }),
});
```

:::

---
title: Конфиг VuePress
icon: gears
category:
  - Учебник с примерами
  - VuePress
tag:
  - Конфиг
  - VuePress
---

## Файл конфигурации

Без какой-либо настройки сайт VuePress довольно минимален. Чтобы настроить ваш сайт, давайте сначала создадим каталог `.vuepress` внутри вашего каталога документов. Здесь будут размещены все файлы, относящиеся к VuePress. Структура вашего проекта, вероятно, выглядит так:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

Важным файлом для настройки сайта VuePress является `.vuepress/config.js`, также поддерживается файл конфигурации TypeScript. Вместо этого вы можете использовать `.vuepress/config.ts`, чтобы получить лучшую подсказку типов для VuePress Config.

Базовый конфигурационный файл выглядит так:

::: code-tabs#language

@tab TS

```ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // site config
  lang: "en-US",
  title: "Hello VuePress",
  description: "Just playing around",

  // theme
  theme: hopeTheme({
    // theme config
  }),
});
```

@tab JS

```js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // site config
  lang: "en-US",
  title: "Hello, VuePress!",
  description: "This is my first VuePress site",

  // theme
  theme: hopeTheme({
    // theme config
  }),
};
```

:::

::: tip

Ознакомьтесь с [Справочником по конфигурации](https://v2.vuepress.vuejs.org/reference/config.html) для получения полного списка конфигурации VuePress.

:::

## Области конфигурации

### Конфигурация сайта

Конфигурация сайта означает, что независимо от того, какую тему вы используете, эти конфигурации всегда действительны.

Как мы знаем, каждый сайт должен иметь свой собственный `lang`, `title`, `description`, и т. д. Таким образом, VuePress имеет встроенную поддержку этих параметров.

### Конфигурация темы

Конфигурация темы будет обрабатываться темой VuePress, поэтому это зависит от используемой вами темы.

Чтобы использовать `vuepress-theme-hope`, вы должны импортировать из него `hopeTheme`, передав параметры вашей темы и вызвать его, а затем назначить его параметру `theme`.

::: warning

Если вы не укажете параметр `theme` в конфигурации VuePress, будет использоваться тема по умолчанию.

:::

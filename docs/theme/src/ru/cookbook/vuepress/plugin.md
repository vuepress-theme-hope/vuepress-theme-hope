---
title: Плагины
icon: puzzle-piece
category:
  - Учебник с примерами
  - VuePress
tag:
  - Плагин
  - VuePress
---

С помощью [Plugin API](https://v2.vuepress.vuejs.org/reference/plugin-api.html), плагин VuePress может предоставить вам различные функции.

## Плагин сообщества

Пользователи сообщества создали множество плагинов и опубликовали их в [NPM](https://www.npmjs.com/search?q=keywords:vuepress-plugin). Команда VuePress также поддерживает некоторые официальные плагины в рамках [@vuepress](https://www.npmjs.com/search?q=%40vuepress%20keywords%3Aplugin). Вы должны проверить собственную документацию плагина для подробного руководства.

Как правило, вам необходимо включить плагин в параметр [плагинов](https://v2.vuepress.vuejs.org/reference/config.html#plugins), чтобы использовать его. Например, используйте [@vuepress/plugin-google-analytics](https://v2.vuepress.vuejs.org/reference/plugin/google-analytics.html) для интеграции Google Analytics:

```js
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

export default {
  plugins: [
    googleAnalyticsPlugin({
      id: "G-XXXXXXXXXX",
    }),
  ],
};
```

::: tip
Большинство плагинов можно использовать только один раз. Если один и тот же плагин используется несколько раз, вступит в силу только последний из них.

Однако некоторые подключаемые модули можно использовать несколько раз (например, [@vuepress/plugin-container](https://v2.vuepress.vuejs.org/reference/plugin/container.html)), и вам следует ознакомиться с документацией по сам плагин для подробного руководства.
:::

## Локальный плагин

Чтобы использовать свой собственный плагин, но не хотите его публиковать, вы можете создать локальный плагин.

Рекомендуется использовать [Файл конфигурации](./config.md#файл-конфигурации) непосредственно в качестве подключаемого модуля, поскольку [доступны почти все API подключаемых модулей](https://v2.vuepress.vuejs.org/reference/config.html#plugin-api), что в большинстве случаев было бы удобнее.

Но если в вашем конфигурационном файле слишком много вещей, вы можете выделить их в отдельные плагины и использовать в своем конфигурационном файле:

```js
import myPlugin from "./path/to/my-plugin.js";

export default {
  plugins: [myPlugin()],
};
```

Вы можете обратиться к [Продвинутый > Написание плагина](https://v2.vuepress.vuejs.org/advanced/plugin.html), чтобы узнать, как написать свой собственный плагин.

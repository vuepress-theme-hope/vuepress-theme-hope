---
title: Пользовательский контейнер
icon: customize
category:
  - Markdown
tag:
  - Контейнер
  - Markdown
---

Тема добавляет подсказку, примечание, информацию, предупреждение, опасность и контейнер с подробностями.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  }),
};
```

:::

## Демо

::: info
Контейнер с информацией
:::

::: note
Контейнер с примечанием
:::

::: tip
Контейнер с советом
:::

::: warning
Контейнер с предупреждением
:::

::: danger
Контейнер с опасностью
:::

::: details
Контейнер с деталями
:::

::: info Пользовательский заголовок

Пользовательский информационный контейнер с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Пользовательский заголовок

Пользовательский контейнер для заметок с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Пользовательский заголовок

Пользовательский контейнер подсказки с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Пользовательский заголовок

Пользовательский контейнер с предупреждением с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Пользовательский заголовок

Пользовательский контейнер опасности с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Пользовательский заголовок

Пользовательский контейнер с деталями с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Пользовательская информация
:::

::: note Пользовательская заметка
:::

::: tip Пользовательский совет
:::

::: warning Пользовательское предупреждение
:::

::: danger Пользовательская опасность
:::

````md
::: info
Контейнер с информацией
:::

::: note
Контейнер с примечанием
:::

::: tip
Контейнер с советом
:::

::: warning
Контейнер с предупреждением
:::

::: danger
Контейнер с опасностью
:::

::: details
Details container
:::

::: info Пользовательский заголовок

Пользовательский информационный контейнер с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Пользовательский заголовок
Пользовательский контейнер для заметок с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Пользовательский заголовок

Пользовательский контейнер подсказки с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Пользовательский заголовок

Пользовательский контейнер с предупреждением с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Пользовательский заголовок

Пользовательский контейнер опасности с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Пользовательский заголовок

Пользовательский контейнер с деталями с `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Пользовательская информация
:::

::: note Пользовательская заметка
:::

::: tip Пользовательский совет
:::

::: warning Пользовательское предупреждение
:::

::: danger Пользовательская опасность
:::
````

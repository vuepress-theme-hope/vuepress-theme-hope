---
title: Вкладки
icon: table-columns
order: 2
category:
  - Markdown
tag:
  - Markdown
  - Вкладки
---

Пусть файл Markdown на вкладках поддержки вашего сайта VuePress.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
};
```

:::

## Использование

Вам нужно обернуть вкладки в контейнер `tabs`.

Вы можете добавить суффикс идентификатора в контейнер `tabs`, который будет использоваться как ID вкладки. Все вкладки с одинаковым идентификатором будут иметь одно и то же событие переключения.

```md
::: tabs#fruit

<!-- here, fruit will be used as id, it's optional -->

<!-- tabs content -->

:::
```

Внутри этого контейнера вы должны использовать маркер `@tab`, чтобы пометить и разделить содержимое вкладки.

За маркером `@tab` вы можете добавить текст `:active`, чтобы активировать вкладку по умолчанию, и текст будет разрешен как заголовок вкладки.

```md
::: tabs

@tab title 1

<!-- tab 1 content -->

@tab title 2

<!-- tab 2 content -->

@tab:active title 3

<!-- tab 3 will be activated by default -->

<!-- tab 3 content -->

:::
```

По умолчанию заголовок будет использоваться как значение вкладки, но вы можете переопределить его, используя суффикс идентификатора.

```md
::: tabs

@tab title 1

<!-- here, tab 1's title "title 1" will be used as value. -->

<!-- tab 1 content -->

@tab title 2#value2

<!-- here, tab 2's title will be "title 2", but it will bind a value with "value2" -->

<!-- tab 2 content -->

:::
```

:::: info Переключение вместе и постоянный выбор

Если вы хотите, чтобы некоторые группы вкладок переключались вместе, вы можете использовать один и тот же идентификатор вкладки для их привязки. Вот пример:

Кроме того, ваш выбор с этим идентификатором вкладки будет сохранен и сохранен.

Выберите менеджер пакетов:

::: tabs#shell

@tab npm

npm должен быть установлен вместе с Node.js.

@tab pnpm

Если вы используете Node.js v16+, вы можете использовать corepack для включения pnpm:

```bash
corepack prepare pnpm@7.28.0 --activated
```

В противном случае вы можете установить его с помощью npm:

```bash
npm i -g pnpm
```

:::

Установка `vuepress-plugin-md-enhance`:

::: tabs#shell

@tab Использование npm#npm

```bash
npm i -D vuepress-plugin-md-enhance
```

@tab Использование pnpm#pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

:::

::::

## Демо

Вкладка фруктов:

::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::

```md
::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::
```

Еще одна вкладка фруктов:

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

```md
::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```

Вкладка фруктов без id:

::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

```md
::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```

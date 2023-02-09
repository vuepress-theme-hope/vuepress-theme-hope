---
title: Использование компонентов
icon: puzzle-piece
order: 1
category:
  - Руководство
  - Кастомизация
tag:
  - Компоненты
  - Кастомизация
---

В этом руководстве вы узнаете, как использовать компоненты Vue и синтаксис Vue в вашем проекте VuePress.

<!-- more -->

## Импорт компонентов Vue глобально

### Регистрация через `@vuepress/plugin-register-components`

Вы можете автоматически регистрировать компоненты с помощью плагина `@vuepress/plugin-register-components`.

Подробнее об использовании плагина смотрите в [Официальной документации](https://v2.vuepress.vuejs.org/reference/plugin/register-components.html).

### Регистрация через ClientConfigFile

Вы можете создать `.vuepress/client.ts` и зарегистрировать компоненты вручную.

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import MyComponent from "./MyComponent.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("MyComponent", MyComponent);
  },
});
```

## Использование синтаксиса и компонентов Vue в Markdown

Вы можете использовать синтаксис Vue непосредственно в Markdown. Для конкретного использования смотрите [VuePress → Markdown](../vuepress/markdown.md#Use -vue in -markdown-)

Если вам нужно импортировать компоненты Vue в Markdown, обратите внимание, что вы не можете использовать относительные пути для импорта или писать несколько блоков `<script>`.

::: info Markdown с Vue SFC

Каждый файл Markdown сначала компилируется в HTML, а затем преобразуется в компонент одного файла Vue (SFC). Другими словами, вы можете писать файлы Markdown, такие как Vue SFC:

Теги `<script>` и `<style>` напрямую обрабатываются как теги в Vue SFC. Другими словами, они продвигаются из тега `<template>` на верхний уровень SFC.
Весь контент, кроме тегов `<script>` и `<style>`, будет скомпилирован в HTML, а затем обработан как теги `<template>` в Vue SFC.

Поскольку однофайловые компоненты Vue могут содержать только один тег `<script>`, вам следует избегать использования более одного тега `<script>` в VuePress Markdown.

Кроме того, поскольку Markdown будет преобразован в однофайловые компоненты Vue в каталоге кеша, любой импорт относительного пути будет недопустимым в Vue SFC.

:::

Чтобы корректно импортировать собственные компоненты, вам необходимо создать для них псевдонимы, сделать это можно с помощью опции `alias`:

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default {
  alias: {
    "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
  },
};
```

```md
<MyComponent />

<script setup lang="ts">
import MyComponent from "@MyComponent";
</script>
```

Это немного сложнее, но если компонент используется только на одной странице, такой импорт имеет преимущества:

- Глобальный импорт означает, что код компонента нужно загрузить при инициализации VuePress, то есть при посещении первой страницы
- Импорт в Markdown приводит к включению кода компонента в код страницы, чтобы он загружался только при посещении страницы

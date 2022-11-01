---
title: Playground
icon: code
category:
  - Markdown
tag:
  - Выделение
  - Playground
---

Пусть файл Markdown поддерживает плейграунд на вашем сайте VuePress.

<!-- more -->

## Конфиг

::: code-tabs#config

@tab TS

```ts {8-33}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
          },
        },
      },
    },
  }),
});
```

@tab JS

```js {8-33}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
          },
        },
      },
    },
  }),
};
```

:::

## Использование

Вы должны добавить пресеты через `playground.presets` в настройках плагина.

Чтобы использовать плейграунд, вы должны использовать контейнер с именем `playground#preset`.

В нем вы можете использовать 3 директивы:

- `@file fileName`, затем блок кода для добавления файлов
- `@import importMapFileName`, затем блок json для настройки "import map"
- `@setting`, затем блок json для настройки параметров

Вы можете увидеть демо ниже, чтобы увидеть больше деталей.

## Доступные пресеты

В настоящее время мы поддерживаем пресеты `ts` и `vue`, и мы с нетерпением ждем новых пресетов от PR.

Если вы хотите добавить собственную playground, вы можете добавить свой собственный пресет в [Продвинутый раздел](#продвинутый) и добро пожаловать, чтобы открыть PR о вашем фантастическом пресете.

::: info Предустановка TS

Предустановка TS по умолчанию использует официальную playground и не поддерживает несколько файлов ts, поэтому все, что вам нужно сделать, это добавить один единственный файл ts с помощью директивы `@file xxx.ts` (имя файла не важно, но `.ts` расширение файла есть).

Чтобы использовать измененные параметры компилятора, вы можете указать их с помощью директивы `@setting`. Но внимание, официальная площадка TS не поддерживает все опции компилятора.

Между тем, вы можете настроить компилятор по умолчанию с помощью `playground.config.ts`, и вы можете использовать другой сервис, помимо официальной playground , через опцию `service`, на тот случай, если вы хотите развернуть свой собственный сайт playground .

:::

::: info Предустановка Vue

Предустановка Vue по умолчанию использует официальную playground и не поддерживает такие параметры настройки, как [Vue Playground](./vue-playground.md). Поэтому, если вы сильно полагаетесь на интерактивную playground vue, мы предлагаем вам вместо этого использовать [Vue Playground](./vue-playground.md) instead.

Но если вам нужно только несколько демонстраций вместо того, чтобы объединять целую playground vue, вы можете использовать этот пресет для создания `<iframe>`.

Только опции `service`, `dev` и `ssr` доступны в директиве `@setting`.

:::

## Демо

### TS

::: playground#ts TS demo 1

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

:::: details Code

````md
::: playground#ts TS demo 1

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::
````

::::

::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@setting

```json
{
  "target": "es5"
}
```

:::

:::: details Code

````md
::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@setting

```json
{
  "target": "es5"
}
```

:::
````

::::

### Vue

::: playground#vue Демонстрация Vue с кастомизированным импортом

@file App.vue

```vue
<script setup>
import { ref } from "vue";

import Comp from "./Comp.vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@import

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::

:::: details Code

````md
::: playground#vue Демонстрация Vue с кастомизированным импортом

@file App.vue

```vue
<script setup>
import { ref } from "vue";

import Comp from "./Comp.vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@import

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::
````

::::

::: playground#vue Демонстрация Vue с индивидуальными настройками

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

@setting

```json
{
  "dev": true,
  "ssr": true
}
```

:::

:::: details Code

````md
::: playground#vue Демонстрация Vue с индивидуальными настройками

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

@setting

```json
{
  "dev": true,
  "ssr": true
}
```

:::
````

::::

## Продвинутый

Вы можете предоставить свои собственные пресеты.

```ts
interface PlaygroundCodeConfig {
  /**
   * Code block extension
   *
   * @description It's based on filename, not code fence language
   */
  ext: string;

  /**
   * Code block content
   */
  content: string;
}

interface PlaygroundData {
  /**
   * Title of Playground
   */
  title?: string;

  /**
   * Import map file name
   *
   * @default 'import-map.json'
   */
  importMap?: string;

  /**
   * Playground files info
   */
  files: Record<
    /** File name */
    string,
    /** File detail */
    PlaygroundCodeConfig
  >;

  /**
   * Playground settings
   *
   * @description It's parsed result of json content after setting directive
   */
  settings: Record<string, unknown>;

  /**
   * hash key based on playground content
   */
  key: string;
}

interface PlaygroundOptions {
  /**
   * Playground container name
   */
  name: string;

  /**
   * Playground component name
   *
   * @default 'Playground'
   */
  component?: string;

  /**
   * Props getter
   */
  propsGetter: (data: PlaygroundData) => Record<string, string>;
}
```

По сути, мы предоставляем объект `playgroundData` функции `getter`, и вы должны предоставить:

- Имя контейнера через опцию `name`
- Имя клиентского компонента через опцию `component`
- Функция, получающая playgroundData и возвращающая карту свойства с атрибутом `attr` → `value` через `propsGetter`

---
title: Демонстрация кода
icon: discover
category:
  - Markdown
tag:
  - Демонстрация кода
  - Markdown
---

Позволяет вставлять демонстрации кода в файл Markdown.

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
        demo: true,
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
        demo: true,
      },
    },
  }),
};
```

:::

## Синтаксис

Вы должны использовать следующий синтаксис:

````md
::: [type]-demo Необязательный текст заголовка

```html
<!-- ↑ use available ones -->
<!-- your code here -->
<!-- you can have multiple code block, but each language must appear only once. -->
```

```json
// json block is for config
{
  // your config here (optional)
}
```

:::
````

::: tip

Блок json является необязательным, для конфигурации смотрите [конфиг](../../config/plugins/md-enhance.md#demo).

:::

Плагин поддерживает три типа:

- normal
- vue
- react

### Нормальный

Синтаксис:

````md
::: normal-demo Необязательный текст заголовка

```html
<!-- html code -->
```

```js
// js code
```

```css
/* css code */
```

```json
// config (optional)
{
  "jsLib": [
    ...
  ],
  "cssLib":[
    ...
  ]
}
```

::::
````

### Vue

Синтаксис:

````md
::: vue-demo Необязательный текст заголовка

```vue
<!-- ↑ you can also use html-->
<template>
  <!-- vue template -->
</template>
<script>
export default {
  // vue component
};
</script>
<style>
/* style */
</style>
```

```json
// config (optional)
```

:::
````

### React

Синтаксис:

````md
::: react-demo Необязательный текст заголовка

```js
export default class App extends React.Component {
  // your react component
}
```

```css
/* your css content */
```

```json
// config (optional)
```

:::
````

### Доступные языки

Вы можете использовать другой язык в своем демонстрационном блоке.

Когда вы устанавливаете язык, который не может работать в браузерах, так как плагин не может их разрешить, поэтому отображение демо будет отключено. Плагин покажет только код и предоставит вам кнопку, чтобы открыть его в CodePen.

Доступные языки HTML:

- `"html"` (по умолчанию)
- `"slim"`
- `"haml"`
- `"markdown"`

> Вы также можете использовать `md` в блоке кода.

Доступные языки JS:

- `"javascript"` (по умолчанию)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

> Вы также можете использовать `js`, `ts`, `coffee` и `ls` в блоке кода.

Доступные языки CSS:

- `"css"` (по умолчанию)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

> Вы также можете использовать `styl` в блоке кода.

## Демо

::: normal-demo Demo

```html
<h1>VuePress Theme Hope</h1>
<p>is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful");
});
```

```css
span {
  color: red;
}
```

:::

:::: details Код

````md
::: normal-demo Demo

```html
<h1>VuePress Theme Hope</h1>
<p>is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful");
});
```

```css
span {
  color: red;
}
```

:::
````

::: react-demo Демонстрация React на основе функций

```js
const { useState } = React;

export default () => {
  const [message, setMessage] = useState(" powerful");

  const handler = () => {
    setMessage(` very${message}`);
  };

  return (
    <div className="box">
      <code>vuepress-theme-hope</code> is
      <span id="powerful" onClick={handler}>
        {message}
      </span>!
    </div>
  );
};
```

```css
.box #powerful {
  color: blue;
}
```

:::

:::: details Код

````md
::: react-demo Демонстрация React на основе функций

```js
const { useState } = React;

export default () => {
  const [message, setMessage] = useState(" powerful");

  const handler = () => {
    setMessage(` very${message}`);
  };

  return (
    <div className="box">
      <code>vuepress-theme-hope</code> is
      <span id="powerful" onClick={handler}>
        {message}
      </span>!
    </div>
  );
};
```

```css
.box #powerful {
  color: blue;
}
```

:::
````

::::

::: react-demo Демонстрация React на основе классов

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: " powerful" };
  }
  handler() {
    this.setState((state) => ({
      message: ` very${state.message}`,
    }));
  }
  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code> is
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}!
        </span>
      </div>
    );
  }
}
```

```css
.box #powerful {
  color: blue;
}
```

:::

:::: details Код

````md
::: react-demo Демонстрация React на основе классов

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: " powerful" };
  }
  handler() {
    this.setState((state) => ({
      message: ` very${state.message}`,
    }));
  }
  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code> is
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}!
        </span>
      </div>
    );
  }
}
```

```css
.box #powerful {
  color: blue;
}
```

:::
````

::::

::: vue-demo Демонстрация композиции Vue

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

:::: details Код

````md
::: vue-demo Демонстрация композиции Vue

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

::::

::: vue-demo Демонстрация опции Vue

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
export default {
  data: () => ({ message: "powerful" }),
  methods: {
    handler() {
      this.message = "very " + this.message;
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

:::: details Код

````md
::: vue-demo Демонстрация опции Vue

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
export default {
  data: () => ({ message: "powerful" }),
  methods: {
    handler() {
      this.message = "very " + this.message;
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

::::

::: normal-demo Демонстрация с использованием языка, не поддерживаемого браузерами

```md
# Тайтл

очень мощный!
```

```ts
const message: string = "VuePress Theme Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

:::: details Код

````md
::: normal-demo Обычная демонстрация

```md
# Тайтл

очень мощный!
```

```ts
const message: string = "VuePress Theme Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::
````

::::

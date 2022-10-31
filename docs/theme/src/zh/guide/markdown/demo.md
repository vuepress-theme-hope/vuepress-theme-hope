---
title: 代码演示
icon: discover
  - Markdown
tag:
  - Markdown
  - 代码演示
---

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

<!-- more -->

## 配置

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

## 语法

请使用以下语法:

````md
::: [类型]-demo 可选的标题文字

```html
<!-- ↑ 使用可用的语言 -->
<!-- 在代码块中放置你对应语言的代码，一个语言不能出现多个块 -->
<!-- 你可以有多个代码块，并且 html, js, css 都是视情况可选的 -->
```

```json
// json block 作为插件配置存放处
{
  // 放置你的配置 (optional)
}
```

:::
````

::: tip

JSON 块是可选的，可用的配置详见 [配置](../../config/plugins/md-enhance.md#demo)。

:::

该插件支持三种类型:

- normal
- vue
- react

### Normal

写法:

````md
::: normal-demo 可选的标题文字

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
// 配置 (可选)
{
  "jsLib": [
    ...
  ],
  "cssLib":[
    ...
  ]
}
```

:::
````

### Vue

语法:

````md
::: vue-demo 可选的标题文字

```vue
<!-- ↑ 你也可以使用 html -->
<template>
  <!-- vue 模板 -->
</template>
<script>
export default {
  // vue 组件
};
</script>
<style>
/* css 代码 */
</style>
```

```json
// 配置 (可选)
```

:::
````

### React

语法:

````md
::: react-demo 可选的标题文字

```js
export default class App extends React.Component {
  // react 组件
}
```

```css
/* 你的 css 内容 */
```

```json
// 配置 (可选)
```

:::
````

### 可用的语言

你可以在演示块中使用不同语言。

当你设置一些不能在浏览器上直接运行的语言时，由于插件无法解析它们，因此网页演示将被禁用。插件只显示代码。同时提供一个 "在 CodePen 中打开" 按钮允许用户直接在 CodePen 打开并浏览代码。

可用的 HTML 语言:

- `"html"` (默认)
- `"slim"`
- `"haml"`
- `"markdown"`

> 你也可以在代码块中使用 `md`。

可用的 JS 语言:

- `"javascript"` (default)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

> 你也可以在代码块中使用 `js`, `ts`, `coffee` 和 `ls`。

可用的 CSS 语言:

- `"css"` (default)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

> 你也可以在代码块中使用 `styl`。

## 演示

::: normal-demo Demo 演示

```html
<h1>VuePress Theme Hope</h1>
<p><span id="very">非常</span>强大!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("非常强大");
});
```

```css
span {
  color: red;
}
```

:::

:::: details 代码

````md
::: normal-demo Demo 演示

```html
<h1>VuePress Theme Hope</h1>
<p><span id="very">非常</span>强大!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("非常强大");
});
```

```css
span {
  color: red;
}
```

:::
````

::::

::: react-demo 一个函数式 React Demo

```js
const { useState } = React;

export default () => {
  const [message, setMessage] = useState(" 强大");

  const handler = () => {
    setMessage(`十分${message}`);
  };

  return (
    <div className="box">
      <code>vuepress-theme-hope</code>
      <span id="powerful" onClick={handler}>
        {message}
      </span>
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

:::: details 代码

````md
::: react-demo 一个函数式 React Demo

```js
const { useState } = React;

export default () => {
  const [message, setMessage] = useState(" 强大");

  const handler = () => {
    setMessage(`十分${message}`);
  };

  return (
    <div className="box">
      <code>vuepress-theme-hope</code>
      <span id="powerful" onClick={handler}>
        {message}
      </span>
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

::: react-demo 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "强大" };
  }
  handler() {
    this.setState((state) => ({
      message: `十分${state.message}`,
    }));
  }
  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code>
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}
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

:::: details 代码

````md
::: react-demo 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "强大" };
  }
  handler() {
    this.setState((state) => ({
      message: `十分${state.message}`,
    }));
  }
  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code>
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}
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

::: vue-demo 一个 Vue Composition 演示

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

:::: details Code

````md
::: vue-demo 一个 Vue Composition 演示

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

::: vue-demo 一个 Vue Option 演示

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

:::: details Code

````md
::: vue-demo 一个 Vue Option 演示

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

::: normal-demo 一个使用浏览器不支持解析语言 Demo

```md
# 标题

十分强大
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

:::: details 代码

````md
::: normal-demo 一个使用浏览器不支持解析语言 Demo

```md
# 标题

十分强大
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

---
title: 代码演示
icon: discover
category: markdown
tags:
  - code demo
  - markdown
---

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

<!-- more -->

## 配置

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      demo: true,
    },
  },
};
```

## 语法

请使用以下语法：

````md
::: demo [类型] 可选的标题文字

```html
<!-- ↑ 使用可用的语言 -->
<!-- 在代码块中放置你对应语言的代码，一个语言不能出现多个块 -->
<!-- 你可以有多个代码块，并且 html, js, css 都是视情况可选的 -->
```
````

```json
// json block 作为插件配置存放处
{
  // 放置你的配置 (optional)
}
```

:::

`````

::: tip

JSON 块是可选的，可用的配置详见 [配置](../config.md#demo)。

:::

该插件支持三种类型：

- normal (默认)
- vue
- react

### Normal

写法:

````md
::: demo 可选的标题文字

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
`````

### Vue

语法:

````md
::: demo [vue] 可选的标题文字

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
::: demo [react] 可选的标题文字

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

::: demo Demo 演示

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
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
::: demo Demo 演示

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
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

::: demo [react] 一个函数式 React Demo

```js
export default () => {
  const message = "十分帅";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope
      <span id="very" onClick={handler}>
        {message}
      </span>
    </div>
  );
};
```

```css
.box span {
  color: blue;
}
```

:::

:::: details 代码

````md
::: demo [react] 一个函数式 React Demo

```js
export default () => {
  const message = "十分帅";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope
      <span id="very" onClick={handler}>
        {message}
      </span>
    </div>
  );
};
```

```css
.box span {
  color: blue;
}
```

:::
````

::::

::: demo [react] 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope
        <span id="very" onClick={this.handler}>
          {this.state.message}
        </span>
      </div>
    );
  }
  handler() {
    alert(this.state.message);
  }
}
```

```css
.box span {
  color: blue;
}
```

:::

:::: details 代码

````md
::: demo [react] 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope
        <span id="very" onClick={this.handler}>
          {this.state.message}
        </span>
      </div>
    );
  }
  handler() {
    alert(this.state.message);
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::
````

::::

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
  methods: {
    handler() {
      alert(this.message);
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

:::: details 代码

````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
  methods: {
    handler() {
      alert(this.message);
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

::: demo 一个使用浏览器不支持解析语言 Demo

```md
# 标题

十分帅
```

```ts
const message: string = "Mr.Hope";

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
::: demo 一个使用浏览器不支持解析语言 Demo

```md
# 标题

十分帅
```

```ts
const message: string = "Mr.Hope";

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

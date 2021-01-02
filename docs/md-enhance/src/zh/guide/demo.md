---
icon: discover
---

# 代码演示

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 启用代码演示
        demo: true,
      },
    ],
  ],
};
```

## 语法

您应该使用以下语法：

````md
::: demo [类型] 可选的标题文字

```html
<!-- ↑ 使用可用的语言 -->
<!-- 放置你的代码 -->
<!-- 你可以有多个代码块 -->
```

```json
// json block 作为插件配置
{
  // 放置你的配置 (optional)
}
```

:::
````

::: tip
JSON 块是可选的。
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
````

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

::: warning
该插件未捆绑任何库，因此您必须通过在 `.vuepress/config.js` 文件中设置 `head` 来导入它们。

```js
// .vuepress/config.js
module.exports = {
  head: [
    // react 需要 React, ReactDOM 和 Babel 库
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src:
          "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
    // vue 只需要 vue 库
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
  ],
};
```

我们还进行了增强: 如果你导入 Babel，则将使用 babel 将脚本解析为 es6，以确保能在浏览器上正常运行。
:::

### 可用的语言

您可以在演示块中使用不同语言。

当您设置其他语言时，由于插件无法解析它们，因此演示将被禁用，您只能看到代码。插件将为您提供一个 "在 CodePen 中打开" 按钮允许你直接在 CodePen 打开代码。

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

::: demo 一个普通 Demo

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

````md
::: demo 一个普通 Demo

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

::: demo [react] 一个 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::

````md
::: demo [react] 一个 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope <span>{this.state.message}</span>
      </div>
    );
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

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box-vue">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box-vue span {
  color: red;
}
</style>
```

:::

````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box-vue">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box-vue span {
  color: red;
}
</style>
```

:::
````

::: demo 一个普通 Demo

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

````md
::: demo 一个普通 Demo

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

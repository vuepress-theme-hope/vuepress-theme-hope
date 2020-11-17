---
icon: discover
---

# 代码演示

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

## 配置

```js {7}
module.exports = {
  themeConfig: {
    mdEnhance: {
      demo: true,
    },
  },
};
```

## 语法

您应该使用以下语法：

````md
::: demo [类型]

```html
<!-- ↑ React 为 js -->
<!-- 放置你的代码 -->
```

```json
{
  // 放置你的配置 (optional)
}
```

:::
````

::: tip
json 块是可选的。
:::

该插件支持三种类型：

- vanilla (默认)
- vue
- react

### Vanilla

写法:

````md
::: demo

```html
<html>
  <!-- html 代码 -->
</html>
<script>
  // js 代码
</script>
<style>
  /* css 代码 */
</style>
```

```json
// 配置 (可选)
```

::::
````

### Vue

语法:

````md
::: demo vue

```html
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
::: demo react

```js
export default class App extends React.Component {
  // react 组件
}
App.__style__ = `
  your styles
`;
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

### 预处理器

您可以在演示块中配置预处理器。但是，在运行时仅支持 JS 预处理器 `'babel'`(你还需要手动导入 babel 独立库)。

当您设置其他预处理器时，由于插件无法解析它们，因此演示将被禁用，您只能看到代码。插件将为您提供一个 "在 CodePen 中打开" 按钮。

HTML 预处理器:

- `"none"` (默认)
- `"slim"`
- `"haml"`
- `"markdown"`

JS 预处理器:

- `"none"` (默认)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

CSS 预处理器:

- `"none"` (默认)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

## 演示

::: demo

```html
<html>
  <h1>Mr.Hope</h1>
  <p>Is <span id="very">十分</span> 帅</p>
</html>
<script>
  document.querySelector("#very").addEventListener("click", () => {
    alert("十分帅！");
  });
</script>
<style>
  span {
    color: red;
  }
</style>
```

:::

````md
::: demo

```html
<html>
  <h1>Mr.Hope</h1>
  <p>Is <span id="very">十分</span> 帅</p>
</html>
<script>
  document.querySelector("#very").addEventListener("click", () => {
    alert("十分帅！");
  });
</script>
<style>
  span {
    color: red;
  }
</style>
```

:::
````

::: demo react

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
App.__style__ = `
.box-react span {
  color: red;
}
`;
```

:::

````md
::: demo react

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
App.__style__ = `
.box-react span {
  color: red;
}
`;
```

:::
````

::: demo vue

```html
<template>
  <div class="box-vue">Mr.Hope <span>{{ message }}</span></div>
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
::: demo vue

```html
<template>
  <div class="box-vue">Mr.Hope <span>{{ message }}</span></div>
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

::: demo

```html
<html>
  # 标题 十分帅！
</html>
<script>
  const message: string = "Mr.Hope";

  document.querySelector("h1").innerHTML = message;
</script>
<style>
  h1 {
    font-style: italic;

    + p {
      color: red;
    }
  }
</style>
```

```json
{
  "html": "markdown",
  "js": "typescript",
  "css": "scss"
}
```

:::

````md
::: demo

```html
<html>
  # 标题 十分帅！
</html>
<script>
  const message: string = "Mr.Hope";

  document.querySelector("h1").innerHTML = message;
</script>
<style>
  h1 {
    font-style: italic;

    + p {
      color: red;
    }
  }
</style>
```

```json
{
  "html": "markdown",
  "js": "typescript",
  "css": "scss"
}
```

:::
````

---
title: 代码演示
icon: splotch
---

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

<!-- more -->

::: info 什么是代码演示

代码演示是一项功能，可让你在 Markdown 文件中插入代码片段，插件将为你呈现源代码并在浏览器上运行代码。 如果用户喜欢尝试，可以点击 CodePen 或 JSFiddle 按钮，在 CodePen 或 JSFiddle 中打开 demo，在线编辑。

因此，这意味着你无权访问项目中的内部组件。我们既不能在用户的浏览器中读取你本地的文件系统， Codepen 和 JSFiddle 也不能访问项目中的 Vue 组件。

:::

## 配置

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用代码演示
      demo: true,
    }),
  ],
};
```

@tab JS

```js {8} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用代码演示
      demo: true,
    }),
  ],
};
```

:::

<!-- #region syntax -->

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
  // 放置你的配置 (可选的)
}
```

:::
````

<!-- #endregion syntax -->

::: tip

JSON 块是可选的，可用的配置详见 [配置](../../../config.md#demo)。

:::

该插件支持三种类型:

- normal
- vue
- react

<!-- #region language -->

## 可用的语言

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

<!-- #endregion language -->

### 不支持的语言演示

<!-- #region demo -->

:::: md-demo

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

::::

<!-- #endregion demo -->

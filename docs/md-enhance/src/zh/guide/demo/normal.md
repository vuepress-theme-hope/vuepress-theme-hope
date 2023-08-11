---
title: 普通代码演示
icon: code
---

## 格式

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

::: warning 注意事项

- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

:::: tip 引入外部样式

- 如果需要在演示中引入其他样式 (如 unocss 生成的样式)，可以通过在 html 或 js 中添加 `link` 标签的方式引入。例子：

::: code-tabs

@tab html引入

```html
<!-- 引入到演示的 html 中，修改为你的 href -->
<link rel="stylesheet" href="__uno.css" />
```

@tab js引入

```js
// 引入下面部分到演示的 js 中，修改为你的 href
const linkElem = window.document.createElement("link");
linkElem.setAttribute("rel", "stylesheet");
linkElem.setAttribute("href", "__uno.css");
document.appendChild(linkElem);
```

:::
::::

## 例子

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

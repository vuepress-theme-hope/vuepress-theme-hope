---
title: Code Demo
icon: discover
category: markdown
tags:
  - code demo
  - markdown
---

Let you insert code demos in your Markdown file.

<!-- more -->

## Configuration

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      demo: true,
    },
  },
};
```

## Syntax

You should use the following syntax:

````md
::: demo [type] Optional title text

```html
<!-- ↑ use available ones -->
<!-- your code here -->
<!-- you can have mutiple code block -->
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

The json block is optional.

:::

The plugin support three types:

- normal (default)
- vue
- react

### Normal

Syntax:

````md
::: demo Optional title text

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

Syntax:

````md
::: demo [vue] Optional title text

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

Syntax:

````md
::: demo [react] Optional title text

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

::: warning

This plugin is not bundling any librarys, so you must import them by setting `head` in your `.vuepress/config.js` files.

```js
// .vuepress/config.js
module.exports = {
  head: [
    // react needs React, ReactDOM and Babel
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
    // vue only needs vue
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
  ],
};
```

We also make an enhance: If you import Babel, then Vue and Normal script will be parsed to es6 using babel.

:::

### Available languages

You can use different language in your demo block.

When you set another language, since the plugin is not able to resolve them, demo display will be disabled. The plugin will show the code and provide you a button to open it in CodePen.

Available HTML languages:

- `"html"` (default)
- `"slim"`
- `"haml"`
- `"markdown"`

> You can also use `md` in code block.

Available JS languages:

- `"javascript"` (default)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

> You can also use `js`, `ts`, `coffee` and `ls` in code block.

Available CSS languages:

- `"css"` (default)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

> You can also use `styl` in code block.

## Demo

::: demo A normal demo

```html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
```

```css
span {
  color: red;
}
```

:::

````md
::: demo A normal demo

```html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
```

```css
span {
  color: red;
}
```

:::
````

::: demo [react] A react demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope is <span>{this.state.message}</span>
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
::: demo [react] A react demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope is <span>{this.state.message}</span>
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

::: demo [vue] A vue demo

```vue
<template>
  <div class="box-vue">
    Mr.Hope is <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
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
::: demo [vue] A vue demo

```vue
<template>
  <div class="box-vue">
    Mr.Hope is <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
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

::: demo A normal demo

```md
# Title

is very handsome.
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
::: demo A normal demo

```md
# Title

is very handsome.
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

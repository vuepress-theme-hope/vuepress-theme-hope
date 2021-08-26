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
<!-- you can have mutiple code block, but each language must appear only once. -->
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

The json block is optional, for config please see [config](../config.md#demo).

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

### Available languages

You can use different language in your demo block.

When you set language which can not run on browers, since the plugin is not able to resolve them, so demo display will be disabled. The plugin will only show the code and provide you a button to open it in CodePen.

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

::: demo Demo

```html
<h1>Mr.Hope</h1>
<p>is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome");
});
```

```css
span {
  color: red;
}
```

:::

:::: details Code

````md
::: demo Demo

```html
<h1>Mr.Hope</h1>
<p>is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome");
});
```

```css
span {
  color: red;
}
```

:::
````

::: demo [react] A function-based React Demo

```js
export default () => {
  const message = "very handsome";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope is
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

:::: details Code

````md
::: demo [react] A function-based React Demo

```js
export default () => {
  const message = "very handsome";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope is
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

::: demo [react] A class-based React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope is
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

:::: details Code

````md
::: demo [react] A class-based React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope is
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
````

::::

::: demo [vue] A Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope is <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
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

:::: details Code

````md
::: demo [vue] A Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope is <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
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

::: demo A demo using language not supoprted by browsers

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

:::: details Code

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

::::

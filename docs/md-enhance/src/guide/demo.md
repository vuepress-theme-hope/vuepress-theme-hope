---
icon: discover
---

# Code Demo

Let you insert code demos in your Markdown file.

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable Code Demo
        demo: true,
      },
    ],
  ],
};
```

## Syntax

You should use the following syntax:

````md
::: demo [type]

```html
<!-- ↑ js for react -->
<!-- your code here -->
```

```json
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

- vanilla (default)
- vue
- react

### Vanilla

Syntax:

````md
::: demo

```html
<html>
  <!-- html code -->
</html>
<script>
  // js code
</script>
<style>
  /* css code */
</style>
```

```json
// config (optional)
```

::::
````

### Vue

Syntax:

````md
::: demo vue

```html
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
::: demo react

```js
export default class App extends React.Component {
  // your react component
}
App.__style__ = `
  your styles
`;
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
        src:
          "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
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

We also make an enhance: If you import Babel, then Vue and Vanilla script will be parsed to es6 using babel.
:::

### PreProcessor

You can config preprocessor in your demo block. But only jsPreprocessor `'babel'` is supported at runtime when you import babel standalone library.

When you set other proprocessor, since the plugin is not able to resolve them, demo display will be disabled, and only codes can be seen. And the plugin will provide you a button to open it in CodePen.

HTML preprocessors:

- `"none"` (default)
- `"slim"`
- `"haml"`
- `"markdown"`

JS preprocessors:

- `"none"` (default)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

CSS preprocessors:

- `"none"` (default)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

## Demo

::: demo

```html
<html>
  <h1>Mr.Hope</h1>
  <p>Is <span id="very">very</span> handsome</p>
</html>
<script>
  document.querySelector("#very").addEventListener("click", () => {
    alert("Very handsome!");
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
  <p>Is <span id="very">very</span> handsome</p>
</html>
<script>
  document.querySelector("#very").addEventListener("click", () => {
    alert("Very handsome!");
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
  <div class="box-vue">Mr.Hope is <span>{{ message }}</span></div>
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
::: demo vue

```html
<template>
  <div class="box-vue">Mr.Hope is <span>{{ message }}</span></div>
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

::: demo

```html
<html>
# Title

is very handsome.
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
  # Title is very handsome.
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

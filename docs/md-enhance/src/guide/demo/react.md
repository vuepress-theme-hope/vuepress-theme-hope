---
title: React Code Demo
icon: react
---

## Syntax

````md
::: react-demo Optional title text

```js
// your script, exporting your react component through `export default`
```

```css
/* Your css content */
```

```json
// Config (Optional)
```

:::
````

::: warning Attention

- Babel must be loaded when using react to parse JSX, this is done by the plugin automatically
- You must export your component through `export default`
- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. To access the page document, please visit `window.document`.

:::

## Demo

::: react-demo A function-based React Demo

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

:::: details Code

````md
::: react-demo A function-based React Demo

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

::: react-demo A class-based React Demo

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

:::: details Code

````md
::: react-demo A class-based React Demo

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

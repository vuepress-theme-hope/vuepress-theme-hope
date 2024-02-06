---
title: React Code Demo
icon: fab fa-react
---

## Syntax

<!-- #region syntax -->

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

<!-- #endregion syntax -->

::: warning Attention

- Babel must be loaded when using react to parse JSX, this is done by the plugin automatically
- You must export your component through `export default`
- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. To access the page document, please visit `window.document`.

:::

## Demo

<!-- #region demo -->

:::: md-demo A function-based React Demo

::: react-demo React demo 1

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

::::

:::: md-demo A class-based React Demo

::: react-demo React demo 2

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

::::

<!-- #endregion demo -->

```

```

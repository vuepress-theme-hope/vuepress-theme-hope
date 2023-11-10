---
title: React 代码演示
icon: fab fa-react
---

## 格式

<!-- #region syntax -->

````md
::: react-demo 可选的标题文字

```js
// 放置脚本，并通过 `export default` 导出你的 react 组件
```

```css
/* 你的 css 内容 */
```

```json
// 配置 (可选)
```

:::
````

<!-- #endregion syntax -->

::: warning 注意事项

- 使用 React 的时候，为了解析 JSX 必须引入 Babel，此过程由插件自动完成。
- 必须将组件通过 `export default` 默认导出
- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

## 演示

<!-- #region demo -->

:::: md-demo 一个函数式 React Demo

::: react-demo React 演示 1

```js
const { useState } = React;

export default () => {
  const [message, setMessage] = useState(" 强大");

  const handler = () => {
    setMessage(`十分${message}`);
  };

  return (
    <div className="box">
      <code>vuepress-theme-hope</code>
      <span id="powerful" onClick={handler}>
        {message}
      </span>
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

:::: md-demo 一个类式 React Demo

::: react-demo React 演示 2

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "强大" };
  }
  handler() {
    this.setState((state) => ({
      message: `十分${state.message}`,
    }));
  }
  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code>
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}
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

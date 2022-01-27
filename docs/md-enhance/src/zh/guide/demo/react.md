---
title: React 代码演示
icon: react
---

## 格式

````md
::: demo [react] 可选的标题文字

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

::: warning 注意事项

- 使用 React 的时候，为了解析 JSX 必须引入 Babel，此过程由插件自动完成。
- 必须将组件通过 `export default` 默认导出
- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

## 演示

::: demo [react] 一个函数式 React Demo

```js
export default () => {
  const message = "十分帅";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope
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

:::: details 代码

````md
::: demo [react] 一个函数式 React Demo

```js
export default () => {
  const message = "十分帅";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope
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

::: demo [react] 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope
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

:::: details 代码

````md
::: demo [react] 一个类式 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope
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
.box-react span {
  color: red;
}
```

:::
````

::::

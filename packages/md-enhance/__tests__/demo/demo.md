---
title: 代码演示
icon: discover
---

## 演示

::: demo 一个普通 Demo

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
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
::: demo 一个普通 Demo

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
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

::: demo [react] 一个函数式 React Demo

```js
export default () => {
  const message = "十分帅";

  const handler = () => {
    document.querySelector("#very").addEventListener("click", () => {
      alert("十分帅");
    });
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
    alert("十分帅");
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
::: demo [react] 一个 React Demo

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
```

```css
.box-react span {
  color: red;
}
```

:::
````

::::

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box span {
  color: green;
}
</style>
```

```json
{
  "useBabel": true
}
```

:::

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box span {
  color: green;
}
</style>
```

:::

:::: details 代码

````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box span {
  color: green;
}
</style>
```

:::
````

::::

::: demo 一个普通 Demo

```md
# 标题

十分帅
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

:::: details 代码

````md
::: demo 一个普通 Demo

```md
# 标题

十分帅
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

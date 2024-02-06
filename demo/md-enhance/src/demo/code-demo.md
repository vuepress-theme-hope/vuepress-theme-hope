---
title: Code Demo
---

## Demo

::: md-demo Demo

## Heading 2

Text

```js
const a = 1;
```

:::

::: normal-demo Demo

```html
<h1>VuePress Theme Hope</h1>
<p>is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful");
});
```

```css
span {
  color: red;
}
```

:::

::: vue-demo A Vue Composition Demo

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
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

::: vue-demo A Vue Option Demo

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
export default {
  data: () => ({ message: "powerful" }),
  methods: {
    handler() {
      this.message = "very " + this.message;
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

::: normal-demo A demo using language not supported by browsers

```md
# Title

is very powerful!
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

:::

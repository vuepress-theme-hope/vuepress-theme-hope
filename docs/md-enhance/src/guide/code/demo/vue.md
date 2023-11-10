---
title: Vue Code Demo
icon: fab fa-vuejs
---

## Syntax

<!-- #region syntax -->

````md
::: vue-demo Optional title text

```vue
<!-- ↑ You can also use `html` -->
<template>
  <!-- vue template -->
</template>
<script>
export default {
  // vue component
};
</script>
<style>
/* css code */
</style>
```

```json
// Config (Optional)
```

:::
````

<!-- #endregion syntax -->

::: warning Attention

- We only support Vue3
- You must export your component through `export default`
- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. To access the page document, please visit `window.document`.

:::

## Demo

<!-- #region demo -->

:::: md-demo A Vue Composition Demo

::: vue-demo Vue demo 1

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

::::

:::: md-demo A Vue Option Demo

::: vue-demo Vue demo 2

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

::::

<!-- #endregion demo -->

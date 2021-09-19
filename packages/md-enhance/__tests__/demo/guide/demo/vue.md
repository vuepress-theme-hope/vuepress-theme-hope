---
title: Vue Code Demo
icon: vue
---

## Syntax

````md
::: demo [vue] Optional title text

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

::: warning Attention

- We only support Vue2
- You must export your component through `export default`
- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. If you want to access the page document, please visit `window.document`.

:::

## Demo

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

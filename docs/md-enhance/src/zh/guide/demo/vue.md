---
title: Vue 代码演示
icon: vue
---

## 格式

````md
::: demo [vue] 可选的标题文字

```vue
<!-- ↑ 你也可以使用 html -->
<template>
  <!-- vue 模板 -->
</template>
<script>
export default {
  // vue 组件
};
</script>
<style>
/* css 代码 */
</style>
```

```json
// 配置 (可选)
```

:::
````

::: warning 注意事项

- 由于 API 不同，且插件对应基于 Vue2 的 VuePress@v1，只能使用 Vue2。
- 必须将组件通过 `export default` 默认导出
- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

## 演示

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
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

:::: details 代码

````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
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

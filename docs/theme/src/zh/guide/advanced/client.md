---
title: 客户端配置文件
icon: gears
order: -3
category:
  - 高级
tag:
  - 高级
  - 客户端配置
---

你可以创建 `.vuepress/client.ts` 或 `.vuepress/client.js` 作为 [客户端配置文件][client-config] 来自定义你的站点。

<!-- more -->

::: info

了解更多客户端配置文件的信息，请参考 [高级 > 教程 > 客户端配置的使用](https://vuejs.press/zh/advanced/cookbook/usage-of-client-config.html)

:::

## 例子

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import ExampleGlobalComponent from "./components/ExampleGlobalComponent.vue";
import ExampleRootComponent from "./components/ExampleRootComponent.vue";
import { setupExampleCompositionAPI } from "./composables/exampleCompositionAPI";
import ExampleLayout from "./layouts/ExampleLayout.vue";

export default defineClientConfig({
  // 客户端增强
  enhance: ({ app, router }) => {
    // 注册全局组件
    app.component("ExampleGlobalComponent", ExampleGlobalComponent);

    // 注册路由守卫
    router.beforeEach((to) => {
      console.log("before navigation");
    });

    router.afterEach((to) => {
      console.log("after navigation");
    });
  },

  // 全局注册
  setup() {
    // 注册全局组合式 API
    setupExampleCompositionAPI();

    // 在客户端中访问 DOM
    onMounted(() => {
      // 在挂在后 使用 DOM API
      document.querySelector("#app");
    });
  },

  // 添加或覆盖组件
  layouts: {
    ExampleLayout,
  },

  // 全局组件
  rootComponents: [
    "ExampleRootComponent",
    //...
  ],
});
```

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

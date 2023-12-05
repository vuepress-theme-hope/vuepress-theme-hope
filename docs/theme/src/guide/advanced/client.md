---
title: Client Config file
icon: gears
order: -3
category:
  - Advanced
tag:
  - Advanced
  - Client Config
---

You can create `.vuepress/client.ts` as a client config file to customize your site.

<!-- more -->

::: info

To learn more about client config file, see [Advanced > Cookbook > Usage of Client Config](https://vuejs.press/advanced/cookbook/usage-of-client-config.html)

:::

## Example

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import ExampleGlobalComponent from "./components/ExampleGlobalComponent.vue";
import ExampleRootComponent from "./components/ExampleRootComponent.vue";
import { setupExampleCompositionAPI } from "./composables/exampleCompositionAPI";
import ExampleLayout from "./layouts/ExampleLayout.vue";

export default defineClientConfig({
  // Client enhancements
  enhance: ({ app, router }) => {
    // register global component
    app.component("ExampleGlobalComponent", ExampleGlobalComponent);

    // register router guard
    router.beforeEach((to) => {
      console.log("before navigation");
    });

    router.afterEach((to) => {
      console.log("after navigation");
    });
  },

  // global registration
  setup() {
    // Register the global Composition API
    setupExampleCompositionAPI();

    // access dom in client
    onMounted(() => {
      // use DOM API after mounted
      document.querySelector("#app");
    });
  },

  // adding or overriding layouts
  layouts: {
    ExampleLayout,
  },

  // global component
  rootComponents: [
    "ExampleRootComponent",
    //...
  ],
});
```

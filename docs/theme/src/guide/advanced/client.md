---
title: Client Config
icon: gears
order: -3
category:
  - Advanced
tag:
  - Advanced
  - Client Config
---

Configure site behavior using `.vuepress/client.ts` or `.vuepress/client.js` as a [client config file](../../cookbook/vuepress/config.md#client-config-file).

<!-- more -->

::: info Reference

See [VuePress Client Config Usage](https://vuejs.press/advanced/cookbook/usage-of-client-config.html) for details.

:::

## Example

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { onMounted } from "vue";
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

    // access DOM in client
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

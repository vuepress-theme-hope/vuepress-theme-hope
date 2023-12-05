---
title: Playground
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support playground in your VuePress site.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-36}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            "unocss",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData,
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
            unocss: {
              // ...
            },
          },
        },
      },
    },
  }),
});
```

@tab JS

```js {8-36}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // playground config here
        playground: {
          // add presets here
          presets: [
            "ts",
            "vue",
            "unocss",
            {
              name: "playground#language",
              component: "PlaygroundComponent",
              propsGetter: (
                playgroundData: PlaygroundData
              ): Record<string, string> => ({
                // playground props
              }),
            },
          ],
          // configure built-in presets (optional)
          config: {
            ts: {
              // ...
            },
            vue: {
              // ...
            },
            unocss: {
              // ...
            },
          },
        },
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/code/playground.md#middle -->

Vue preset is using the official playground by default, and do not support customizing options like [Vue Playground](./vue-playground.md). So if you are heavily relying on interacting vue playground, we suggest you to use [Vue Playground](./vue-playground.md) instead.

<!-- @include: @md-enhance/guide/code/playground.md#after -->

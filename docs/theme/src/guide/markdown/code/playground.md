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

```ts {8-38} title=".vuepress/config.ts"
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

```js {7-37} title=".vuepress/config.js"
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

<!-- @include: @md-enhance/guide/code/playground.md#after -->

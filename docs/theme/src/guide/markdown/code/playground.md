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
              propsGetter: (playgroundData) => ({
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

<!-- @include: @md-enhance/guide/code/playground.md#after -->

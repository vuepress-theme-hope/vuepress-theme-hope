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

```ts twoslash {6-32} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
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
});
```

<!-- @include: @md-enhance/guide/code/playground.md#after -->

---
title: Plantuml
icon: diagram-project
category:
  - Markdown
tag:
  - Diagram
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/plantuml.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        plantuml: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/chart/plantuml.md#after -->

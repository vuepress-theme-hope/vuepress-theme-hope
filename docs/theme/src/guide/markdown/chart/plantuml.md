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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    plantuml: true,
  },
});
```

<!-- @include: @md-enhance/guide/chart/plantuml.md#after -->

---
title: Task list
icon: check
---

Let the Markdown file in your VuePress site support task list.

<!-- more -->

## Configuration

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEhance({
      // Enable Task List
      tasklist: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEhance({
      // Enable Task List
      tasklist: true,
    }),
  ],
};
```

:::

::::

## Syntax

- Use `- [ ] some text` to render a unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

## Demo

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```

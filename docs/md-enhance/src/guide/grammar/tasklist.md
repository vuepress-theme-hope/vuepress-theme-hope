---
title: Task list
icon: square-check
---

Let the Markdown file in your VuePress site support task list.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Task List
      tasklist: true,
    }),
  ],
};
```

<!-- #region after -->

## Syntax

- Use `- [ ] some text` to render an unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

::: md-demo Demo

- [ ] Plan A
- [x] Plan B

:::

## Advanced

Besides setting `tasklist: true` in the plugin options, you can also pass objects to it as options. The available options are as follows:

```ts
interface TaskListOptions {
  /**
   * Whether disable checkbox
   *
   * @default true
   */
  disabled?: boolean;

  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;
}
```

<!-- #endregion after -->

---
title: Theme Config
icon: config
category:
  - Config
tag:
  - Theme Config
---

## Content

- [Theme Basic Config](basic.md)

- [Theme Feature Config](feature.md)

- [Theme Layout Config](layout.md)

- [Theme Appearance Config](apperance.md)

- [Theme I18n Config](i18n.md)

## Demo

You can check [theme docs’ config][docs-config].

## Helper Function

We provide a `themeConfig` helper function that you can import to provide autocompletion and validation:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { themeConfig } from "vuepress-theme-hope";

export default themeConfig({
  // themeConfig here
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  // themeConfig here
});
```

:::

::::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/themeConfig.ts

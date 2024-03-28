---
title: GFM Alert
icon: bell
---

The plugin can enable GFM alert support for you.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // enable GFM alerts
      alert: true,
    }),
  ],
};
```

<!-- #region after -->

## Demo

<!-- markdownlint-disable MD028 -->

> [!note]
> This is note text

> [!important]
> This is important text

> [!tip]
> This is tip text

> [!warning]
> This is warning text

> [!caution]
> This is caution text

```md
> [!note]
> This is note text

> [!important]
> This is important text

> [!tip]
> This is tip text

> [!warning]
> This is warning text

> [!caution]
> This is caution text
```

<!-- markdownlint-enable MD028 -->

<!-- #endregion after -->

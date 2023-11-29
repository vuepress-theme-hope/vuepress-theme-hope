---
title: Component
icon: puzzle-piece
---

You can add components easily in Markdown content.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable component support
      component: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable component support
      component: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## Usage

You can use component fence block to add a component into your markdown content. Both YAML and JSON format props data are supported:

````md
```component ComponentName
# component data here
```

```component ComponentName
{
  // component data here
}
```
````

## Demo

::: md-demo VPCard

`<VPCard>` here is a global component.

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
color: rgba(253, 230, 138, 0.15)
```

```component VPCard
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```

:::

<!-- #endregion after -->

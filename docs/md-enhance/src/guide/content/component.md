---
title: Component
icon: puzzle-piece
---

You can add components easily in Markdown content.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
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

```js {8} title=".vuepress/config.js"
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

- YAML <Badge text="Recommended" type="tip" />:

  ````md
  ```component ComponentName
  # component data here
  ```
  ````

- JSON:

  ````md
  ```component ComponentName
  {
    // component data here
  }
  ```
  ````

## Demo

::: md-demo VPCard

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

```component VPCard
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "background": "rgba(253, 230, 138, 0.15)"
}
```

:::

`<VPCard>` here is a global component.

The above code blocks are equivalent to:

```md
<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>
```

<!-- #endregion after -->

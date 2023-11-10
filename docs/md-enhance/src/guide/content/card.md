---
title: Card
icon: square
---

You can add cards in Markdown content.

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
      // Enable card support
      card: true,
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
      // Enable card support
      card: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## Usage

You can use card fence block to add a card into your markdown content. Both YAML and JSON format card data are supported:

````md
```card
# card data here
```

```card
{
  // card data here
}
```
````

Card data supports `title`, `desc`, `logo`, `link` and `color` properties.

If you want to place multiple cards together, you can wrap them in `card` container:

````md
::: card

```card
# card data here
```

```card
# card data here
```

...

:::
````

## Demo

:::: md-demo

::: card

```card
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
color: rgba(253, 230, 138, 0.15)
```

```card
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```

:::

::::

<!-- #endregion after -->

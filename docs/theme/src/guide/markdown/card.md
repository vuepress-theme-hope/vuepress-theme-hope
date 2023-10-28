---
title: Card
icon: square
category:
  - Markdown
tag:
  - Card
  - Markdown
---

You can add cards in Markdown content.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        card: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        card: true,
      },
    },
  }),
};
```

:::

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

````md
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
````

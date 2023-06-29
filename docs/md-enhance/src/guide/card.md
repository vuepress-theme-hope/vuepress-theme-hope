---
title: Card
icon: square
---

You can add cards in Markdown content.

<!-- more -->

## Config

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

## Usage

You can use card fence block to add a card into your markdown content.

````md
```card
# card data here
```
````

By default, you should use YAML format to write card data, but you can also use JSON format by adding `:json` suffix to fence block.

````md
```card:json
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

```card:json
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

```card:json
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```
````

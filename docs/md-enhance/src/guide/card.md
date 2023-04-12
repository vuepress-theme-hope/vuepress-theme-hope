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

## Demo

```card
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mrhope.site/logo.svg
link: https://mrhope.site
color: rgba(253, 230, 138, 0.15)
```

```card:json
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mrhope.site/logo.svg",
  "link": "https://mrhope.site",
  "color": "rgba(253, 230, 138, 0.15)"
}
```

````md
```card
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mrhope.site/logo.svg
link: https://mrhope.site
color: rgba(253, 230, 138, 0.15)
```

```card:json
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mrhope.site/logo.svg",
  "link": "https://mrhope.site",
  "color": "rgba(253, 230, 138, 0.15)"
}
```
````

---
title: Presentation
icon: person-chalkboard
---

Let the Markdown file in your VuePress site support presentation.

## Config

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable presentation
      presentation: true,
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
      // Enable presentation
      presentation: true,
    }),
  ],
};
```

:::

You can also pass an object for configuration.

`presentation.plugins` receives an array of strings, allowing you to freely config whether to enable some preset plugins.

::: tip

Acceptable plugins are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

:::

Reveal.js also provides [more plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware). If you need a specific plugin, please submit a [Feature Request](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D) on GitHub.

You can import and call `defineVuePlaygroundConfig` in client config file to customize reveal.js:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineRevealConfig } from "vuepress-plugin-md-enhance/client";

defineRevealConfig({
  // reveal.js options here
});

export default defineClientConfig({
  // ...
});
```

## Syntax

- Use `---` to split slides
- Use `--` to split the slides second time (vertical display)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

Theme available(replace `[theme]` with them):

- `auto` (Default)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

For details, see [Themes demo](themes.md).

## Demo

Please see [Presentation Demo](demo.md)

## Options

You can set `reveal` to pass options to reveal.js per page in frontmatter, you can also set `presentation` in plugin options to set reveal.js globally.

For more options, see [reveal.js config](https://revealjs.com/config/). For more usage, see [reveal.js documentation](https://revealjs.com/)

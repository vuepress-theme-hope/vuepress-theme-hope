---
title: Vite FAQ
icon: question
category:
  - FAQ
---

## Slow in a cold boot with Vite

This is the expect behavior. We are adding more features, which means we have 2× to 8× lines of code comparing with `@vuepress/theme-default` according to the functions you are using. So transpiling and sending the theme and plugins code to browser is expected to increase from `0.8s - 2s` in `@vuepress/theme-default` to `3s - 10s` (range due to machine performance).

::: info Tree-shaking burden

In order to fully support Tree-shaking in functionality and styles, themes and plugins do additional work, including modularization, partial injection, generation of temp files, etc. These extra behaviors ensure that unused feature code is removed at build stage, but it also means that more logic needs to be performed and more fragmented files need to be loaded in development mode.

Dude, you can’t expect to have the full power of tree-shaking support and still be extremely fast when the development server starts up, they are contradictory.

:::

::: info style system

In order to make component styles binding with component, we split the styles according to the component hierarchy and imported them in components, which greatly slowed down the speed.

- `@vuepress/theme-default` is placing all the styles together at `styles` folder and importing them entirely, so that `sass` will only need to compile once and vite only need to send 1 extra web request. That’s why it’s fast.

  But this will let style unbind with components, and they will be injected anyway. So that when you override a component or a layout, you have to override old styles to build styles you want.

- `vuepress-theme-hope` is binding styles with components, but that means `sass` has to compile styles for each component, and vite need to send an extra request for each components. Due to `vuepress-theme-hope` has 2× to 6× components (depending on whether you enable blog features or not) comparing with `@vuepress/theme-default`, it will take extra time of `2.4s - 4s` for that.

  But, you can easily override a component together with it’s styles in this way.

So, due to the above reasons, `vuepress-theme-hope` will have an average of 4× code and 10× requests comparing with `@vuepress/theme-default`, so the time increasing from `2s` to `10s` is reasonable and expected.

:::

::: tip No effect on HMR and online speed

Don’t worry, the above extra overhead mainly exists in code boot. Due to the large size of code in development environment, the corresponding time will also increase after refreshing.

- These extra overheads do not affect HMR, so when editing the Markdown file, the page's HMR response can still remain at the 100 ms level.

- Unused code twill be removed during the build phase with well design, so the production environment usually only adds additional 200 KB - 500 KB size in JS entry comparing the default theme and about 100 ms of extra script execution time, so the online impact is very small.

:::

## `@import()` in CSS does not work

In VuePress2, importing web CSS via `@import` in `index.scss` has no effect. You may need to manually import it in the `head` option of your VuePress configuration.

<!-- ```js 5-13}
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  head: [
    [
      "link",
      {
        rel: "preload",
        as: "style",
        onload: 'this.onload=null;this.rel="stylesheet"',
        href: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
      },
    ],
  ],

  // ...
});
``` -->

::: code-tabs#language

@tab TS

```ts {5-11}
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "YOUR_CSS_URL",
      },
    ],
  ],

  // ...
});
```

@tab JS

```js {3-9}
export default {
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "YOUR_CSS_URL",
      },
    ],
  ],

  // ...
};
```

:::

::: info Reason

1. CSS imported via `@import` in Sass will be compiled into standard CSS `@import` syntax.
1. The CSS `@import` syntax only works at the top of css file.
1. To give user styles a higher priority, we will import user styles after theme and plugin styles.
1. During vite builds VuePress2 app, all styles are compressed into a single CSS file.

The above results in the user’s CSS `@import` imports in Sass appearing in the middle of the final CSS file and thus invalid.

The default theme also has the same problem, and this cannot be fixed on the theme side.

:::

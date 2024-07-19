---
title: Code Block
icon: code
category:
  - Feature
tag:
  - Feature
  - Code Block
---

## Highlighter

### Shiki

With [`@vuepress/plugin-shiki`][shiki], you can use [shiki](https://shiki.style) to highlight your code blocks.

::: info

`vuepress-theme-hope` passes `plugins.shiki` in theme options as plugin options to `@vuepress/plugin-shiki`.

:::

#### Code Block Themes

If you want to use a single theme, you can set `plugins.shiki.theme` in theme options:

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      shiki: {
        // theme you want to use
        theme: "nord",
      },
    },
  }),
};
```

If you want to use different themes for light mode and dark mode, you can set `plugins.shiki.themes` in theme options:

```js {8-11} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      shiki: {
        // themes you want to use
        themes: {
          light: "one-light",
          dark: "one-dark-pro",
        },
      },
    },
  }),
};
```

To let the theme display shiki correctly, you should set background color and font color for code blocks according to theme you want to use by adding these variables in `.vuepress/styles/config.scss`:.

- `$code-bg-color`: background color for code blocks
- `$code-color`: font color for code blocks

### Prism.js

With [`@vuepress/plugin-prismjs`][prismjs], you can use [prism.js](https://prismjs.com) to highlight your code blocks.

::: info

`vuepress-theme-hope` passes `plugins.prismjs` in theme options as plugin options to `@vuepress/plugin-prismjs`.

:::

Since it's not the default highlighter, so you need to install the plugin first:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-prismjs@next
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-prismjs@next
```

@tab npm

```bash
npm i -D @vuepress/plugin-prismjs@next
```

:::

Then enable prismjs plugin and customize it with `plugins.prismjs` in theme options (you must not set `plugins.shiki` option):

We support all options in [`@vuepress/plugin-prismjs`][prismjs].

## Copy Button

`vuepress-theme-hope` use [`@vuepress/plugin-copy-code`][copy-code] to add copy buttons on all code blocks.

::: info

`vuepress-theme-hope` passes `plugins.copyCode` in theme options as plugin options to `@vuepress/plugin-copy-code`.

:::

By default, the copy button is only displayed on desktop mode. Set `plugins.copyCode.showInMobile` to `true` in theme options to display this button on mobile devices.

A success hint will be displayed once user press the copy button, and its default duration is `2000` ms, you can customize it with `plugins.copyCode.duration` in theme options, and you can disable the hint by setting duration to `0`.

[copy-code]: https://ecosystem.vuejs.press/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html

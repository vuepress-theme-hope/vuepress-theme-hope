---
title: Code Block
icon: code
order: 1
category:
  - Markdown
tag:
  - Markdown
  - Code Block
---

## Highlighter

You can use `markdown.highlighter` to choose the highlighter you want to use, `shiki` for shiki, `prismjs` for prism.js. You can also set `markdown.highlighter` to an object to pass options to the highlighter, while specifying the type of highlighter with the `type` field:

```ts {8} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      highlighter: "shiki",

      // or

      highlighter: "prismjs",

      // or

      highlighter: {
        type: "shiki", // or "prismjs"

        // shiki or prism options
      },
    },
  }),
});
```

The shiki plugin is built-in, so you don't need to install it. If you want to use prismjs, you need to install the plugin first:

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

### Shiki

With [`@vuepress/plugin-shiki`][shiki], you can use [shiki](https://shiki.style) to highlight your code blocks.

We support all options in [`@vuepress/plugin-shiki`][shiki].

::: important Background for code block Themes

To let the theme display fenced code blocks correctly, you should set background color and font color for code blocks according to theme you use in shiki by adding these variables in `.vuepress/styles/config.scss`:.

- `$code-bg-color`: background color for code blocks
- `$code-color`: font color for code blocks

:::

### Prism.js

With [`@vuepress/plugin-prismjs`][prismjs], you can use [prism.js](https://prismjs.com) to highlight your code blocks.

We support all options in [`@vuepress/plugin-prismjs`][prismjs].

## Copy Button

The theme uses [`@vuepress/plugin-copy-code`][copy-code] to add copy buttons on all fenced code blocks.

::: info

`vuepress-theme-hope` passes `plugins.copyCode` in theme options as plugin options to `@vuepress/plugin-copy-code`.

:::

By default, the copy button is only displayed on desktop mode. Set `plugins.copyCode.showInMobile` to `true` in theme options to display this button on mobile devices.

A success hint will be displayed once user press the copy button, and its default duration is `2000` ms, you can customize it with `plugins.copyCode.duration` in theme options, and you can disable the hint by setting duration to `0`.

[copy-code]: https://ecosystem.vuejs.press/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html

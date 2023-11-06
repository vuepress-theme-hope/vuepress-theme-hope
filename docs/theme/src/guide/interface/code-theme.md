---
title: Code Themes
icon: wand-magic-sparkles
order: 4
category:
  - Interface
tag:
  - Interface
  - Code Themes
---

## With Prism.js Highlighter

`vuepress-theme-hope` bundles `@vuepress/plugin-prismjs` to support code highlighting by default, and we allow you to set code block themes for lightmode and darkmode globally.

By default, we use `one-light` and `one-dark` for lightmode and darkmode respectively, and you can change them by setting `light` and `dark` in `plugin.prismjs`.

::: code-tabs#language

@tab TS

```ts {7-12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      prismjs: {
        light: "light theme keyword",
        dark: "dark theme keyword",
      },
    },
  }),
});
```

@tab JS

```js {7-12}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      prismjs: {
        light: "light theme keyword",
        dark: "dark theme keyword",
      },
    },
  }),
};
```

:::

::: tip

Due to output size consideration, we will not import all styles globally to support code theme config per code block.

:::

### Available Themes

::: info Light themes

- ateliersulphurpool-light
- coldark-cold
- coy
- duotone-light
- ghcolors
- gruvbox-light
- material-light
- one-light
- vs

:::

::: info Dark themes

- atom-dark
- cb
- coldark-dark
- dark
- dracula
- duotone-dark
- duotone-earth
- duotone-forest
- duotone-sea
- duotone-space
- gruvbox-dark
- holi
- hopscotch
- lucario
- material-dark
- material-oceanic
- night-owl
- nord
- one-dark
- pojoaque
- shades-of-purple
- solarized-dark-atom
- tomorrow
- vsc-dark-plus
- xonokai
- z-touch

:::

## With Shiki Highlighter

Prism.js is fast and lightweight, but it can not highlight all syntax correctly. If you want a more accurate highlight result, you can use `@vuepress/plugin-shiki`.

1. Disable `@vuepress/plugin-prismjs` plugin by setting `plugins.prismjs: false` in theme options.

1. Install the plugin:

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D @vuepress/plugin-shiki@next
   ```

   @tab yarn

   ```bash
   yarn add -D @vuepress/plugin-shiki@next
   ```

   @tab npm

   ```bash
   npm i -D @vuepress/plugin-shiki@next
   ```

   :::

1. Import shiki plugin and use it:

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { shikiPlugin } from "@vuepress/plugin-shiki";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       shikiPlugin({
         // your options
         theme: "one-dark-pro",
       }),
     ],
   });
   ```

   @tab JS

   ```js
   // .vuepress/config.js
   import { shikiPlugin } from "@vuepress/plugin-shiki";

   export default {
     plugins: [
       shikiPlugin({
         // your options
         theme: "one-dark-pro",
       }),
     ],
   };
   ```

   :::

1. Set background color and font color for code blocks according to theme you want to use by adding these variables in `.vuepress/styles/config.scss`:.

   - `$code-bg-color`: background color for code blocks
   - `$code-color`: font color for code blocks

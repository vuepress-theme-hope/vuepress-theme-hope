---
title: 代码主题
icon: wand-magic-sparkles
order: 4
category:
  - 界面
tag:
  - 界面
  - 代码主题
---

## 使用 Prism.js 高亮

`vuepress-theme-hope` 捆绑了 `@vuepress/plugin-prismjs` 以默认支持代码高亮，我们允许你全局设置日间模式和夜间模式的代码块主题。

默认情况下，我们分别为在日间模式和夜间模式使用 `one-light` 和 `one-dark` 主题，你可以通过在 `plugins.prismjs` 中设置 `light` 和 `dark` 来更改它们。

::: code-tabs#language

@tab TS

```ts {7-12} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      prismjs: {
        light: "日间主题关键词",
        dark: "夜间主题关键词",
      },
    },
  }),
});
```

@tab JS

```js {7-12} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      prismjs: {
        light: "日间主题关键词",
        dark: "夜间主题关键词",
      },
    },
  }),
};
```

:::

::: tip

处于对输出样式大小的考量，我们不会全局引入所有样式。所以我们不支持在代码块单独配置主题。

:::

### 可用的主题

::: info 浅色主题

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

::: info 深色主题

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

## 使用 Shiki 高亮器

Prism.js 快速且轻量，但它无法正确高亮所有语法。如果你想要更准确的高亮结果，可以使用 `@vuepress/plugin-shiki`。

1. 通过在主题选项中设置 `plugins.prismjs: false` 来禁用 `@vuepress/plugin-prismjs` 插件。

1. 安装插件:

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

1. 导入 shiki 插件并使用:

   ::: code-tabs#language

   @tab TS

   ```ts title=".vuepress/config.ts"
   import { shikiPlugin } from "@vuepress/plugin-shiki";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       shikiPlugin({
         // 你的选项

         // 例子
         themes: {
           light: "github-light",
           dark: "one-dark-pro",
         },
       }),
     ],
   });
   ```

   @tab JS

   ```js title=".vuepress/config.js"
   import { shikiPlugin } from "@vuepress/plugin-shiki";

   export default {
     plugins: [
       shikiPlugin({
         // 你的选项

         // 例子
         themes: {
           light: "github-light",
           dark: "one-dark-pro",
         },
       }),
     ],
   };
   ```

   :::

1. 根据你要使用的主题，通过在 `.vuepress/styles/config.scss` 中添加这些变量来设置代码块的背景颜色和字体颜色：

   - `$code-bg-color`: 代码块的背景颜色
   - `$code-color`: 代码块的字体颜色

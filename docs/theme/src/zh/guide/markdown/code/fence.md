---
title: 代码块
icon: code
order: 1
category:
  - Markdown
tag:
  - Markdown
  - 代码块
---

## 高亮器

你可以使用 `markdown.highlighter` 来选择你想要使用的高亮器，`shiki` 为 Shiki，`prismjs` 为 Prism.js。你也可以将 `markdown.highlighter` 设置为一个对象，通过 `type` 字段指定高亮器的类型，并将选项传递给高亮器：

```ts {8} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      highlighter: "shiki",

      // 或

      highlighter: "prismjs",

      // 或

      highlighter: {
        type: "shiki", // 或 "prismjs"

        // shiki 或 prism 选项
      },
    },
  }),
});
```

Shiki 插件是内置的，所以你不需要安装它。如果你想要使用 Prism.js，你需要先安装插件：

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

通过 [`@vuepress/plugin-shiki`][shiki] 插件，你可以使用 Shiki 高亮器。

我们支持 [`@vuepress/plugin-shiki`][shiki] 插件的所有选项。

::: important 代码块主题的背景

为了让主题正确显示代码块，你应该根据 Shiki 中使用的主题设置代码块的背景颜色和字体颜色，通过在 `.vuepress/styles/config.scss` 中添加这些变量来实现：

- `$code-bg-color`：代码块的背景颜色
- `$code-color`：代码块的字体颜色

:::

### Prism.js

通过 [`@vuepress/plugin-prismjs`][prismjs] 插件，你可以使用 [prism.js](https://prismjs.com) 来高亮你的代码块。

我们支持 [`@vuepress/plugin-prismjs`][prismjs] 插件的所有选项。

## 复制按钮

主题使用 [`@vuepress/plugin-copy-code`][copy-code] 在所有代码块上添加复制按钮。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.copyCode` 选项作为插件选项提供给 `@vuepress/plugin-copy-code`。

:::

默认情况下，复制按钮仅在桌面模式下显示。在主题选项中设置 `plugins.copyCode.showInMobile` 为 `true` 可以在移动设备上显示此按钮。

用户按下复制按钮后，将显示一个成功提示，默认持续时间为 `2000` 毫秒，你可以通过主题选项中的 `plugins.copyCode.duration` 自定义它，也可以通过将持续时间设置为 `0` 来禁用提示。

[copy-code]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html

---
title: 代码块
icon: code
category:
  - 功能
tag:
  - 功能
  - 代码块
---

## 高亮器

### Shiki

使用 [`@vuepress/plugin-shiki`][shiki]，你可以使用 [shiki](https://shiki.style) 来高亮你的代码块。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.shiki` 选项作为插件选项提供给 `@vuepress/plugin-shiki`。

:::

#### 代码主题

如果你想要使用单一主题，你可以在主题选项中设置 `plugins.shiki.theme`：

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      shiki: {
        // 你想要使用的主题
        theme: "nord",
      },
    },
  }),
};
```

如果你想要在日间模式和夜间模式下使用不同的主题，你可以在主题选项中设置 `plugins.shiki.themes`：

```js {8-11} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      shiki: {
        // 你想要使用的主题
        themes: {
          light: "one-light",
          dark: "one-dark-pro",
        },
      },
    },
  }),
};
```

为了让主题正确显示 shiki，你应该根据你想要使用的主题为代码块设置背景颜色和字体颜色，通过在 `.vuepress/styles/config.scss` 中添加这些变量来设置：

- `$code-bg-color`: 代码块的背景颜色
- `$code-color`: 代码块的字体颜色

### Prism.js

通过 [`@vuepress/plugin-prismjs`][prismjs]，你可以使用 [PrismJS](https://prismjs.com) 来高亮你的代码块。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.prismjs` 选项作为插件选项提供给 `@vuepress/plugin-prismjs`。

:::

由于它不是默认的高亮器，所以你需要先安装插件：

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

之后在主题选项中启用 prismjs 插件并使用 `plugins.prismjs` 进行自定义（你不能设置 `plugins.shiki` 选项）：

我们支持所有 [`@vuepress/plugin-prismjs`][prismjs] 中的选项。

## 复制按钮

`vuepress-theme-hope` 使用 [`@vuepress/plugin-copy-code`][copy-code] 在所有代码块上添加复制按钮。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.copyCode` 选项作为插件选项提供给 `@vuepress/plugin-copy-code`。

:::

默认情况下，复制按钮仅在桌面模式下显示。在主题选项中设置 `plugins.copyCode.showInMobile` 为 `true` 可以在移动设备上显示此按钮。

用户按下复制按钮后，将显示一个成功提示，默认持续时间为 `2000` 毫秒，你可以通过主题选项中的 `plugins.copyCode.duration` 自定义它，也可以通过将持续时间设置为 `0` 来禁用提示。

[copy-code]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html

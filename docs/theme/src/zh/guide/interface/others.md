---
title: 其他界面功能
icon: ellipsis
order: 7
category:
  - 界面
tag:
  - 界面
---

## 打印按钮

试一试: <PrintButton />

主题对打印样式进行了全面优化，默认在桌面模式的目录下会有一个打印按钮。

要隐藏打印按钮，你应该在主题选项中设置 `print: false`。

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    print: false,
  }),
};
```

## 全屏按钮

试一试:

<ToggleFullScreenButton />

如果你需要这个功能，你可以在主题选项中设置 `fullscreen: true`。

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    fullscreen: true,
  }),
};
```

::: tip

如果当前浏览器不支持全屏，则全屏按钮会自动隐藏。

:::

## 返回顶部按钮

`vuepress-theme-hope` 通过 [`@vuepress/plugin-back-to-top`][back-to-top] 添加了一个带进度条的返回顶部按钮，默认向下滚动 100px 后显示。

你可以在主题选项中设置 `plugins.backToTop: false` 来禁用它，或者用一个对象来设置它来自定义它的阈值距离和进度条显示：

```ts twoslash {8,13-26} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      // 通过 `backToTop: false` 禁用返回顶部按钮
      // 或自定义返回顶部按钮
      backToTop: {
        /**
         * 显示返回顶部按钮的滚动阈值距离（以像素为单位）
         *
         * @default 100
         */
        threshold: 500,
        /**
         * 是否显示滚动进度
         *
         * @default true
         */
        progress: false,
      },
    },
  }),
});
```

## 完整无障碍支持

主题完全支持无障碍功能。

- 主题全部的页面结构都经过语义化处理。

- 所有的按钮、图标都有其相应的无障碍标签

- 所有主要可交互元素均可通过键盘进行聚焦与交互

这是我们为全球视障人群做出的支持! :heart:

## 专注模式

如果你更喜欢专注于内容，你可以在主题选项中设置 `focus: true` 启用专注模式。

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    focus: true,
  }),
};
```

在这个模式下，我们会模糊内容之外元素，提供更好的专注体验。

## 纯净模式

如果你的网站是一个纯文档站点，并且你更喜欢干净的样式，你可以在主题选项中设置 `pure: true` 启用纯净模式。

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    pure: true,
  }),
};
```

在这个模式下，我们会禁用一些花哨的动画以及一些色彩，只提供功能。

默认延迟为 1500ms，你可以通过设置为一个数字来自定义延迟时间。

## RTL 布局

`vuepress-theme-hope` 完全支持 RTL 布局。只需在多语言配置内的对应语言设置 `rtl: true`

试一试: <ToggleRTLButton />

```ts twoslash {9} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    locales: {
      // ...
      "/ar/": {
        // enable RTL layout
        rtl: true,
      },
    },
  }),
};
```

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
</script>

[back-to-top]: https://ecosystem.vuejs.press/zh/plugins/features/back-to-top.html

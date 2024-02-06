---
title: Vite 常见问题
icon: circle-question
order: -2
category:
  - FAQ
---

## 运行错误

Vite 默认情况下仅支持“现代浏览器”，详见 [Vite 支持](https://vitejs.dev/guide/build.html#browser-compatibility)。

## Vite 冷启动速度慢

这是预期的行为，而且请注意开发服务器冷启动慢**不代表**构建结果部署到线上性能不佳。

`vuepress-theme-hope` 添加了更多功能，这意味着根据你使用的功能，与 `@vuepress/theme-default` 相比，我们代码行数约为 2 倍到 8 倍。因此，将主题和插件代码转译并发送到浏览器预计将从 `@vuepress/theme-default` 中的 `0.8s - 2s` 增加到 `3s - 10s` (范围取决于机器性能)。

::: info Tree-shaking 负担

为了让功能与样式完全支持 Tree-shaking，主题和插件会进行额外工作，包括模块化、局部注入、生成临时文件等。这些额外行为确保没有被启用的功能代码会在构建时被移除，但这也意味着在开发模式下需要执行更多逻辑、加载更加零碎的文件。

兄弟，你不能指望在拥有全面支持 Tree-shaking 的强大功能时，还能在开发服务器启动时保持极快的速度，它俩是矛盾的。

:::

::: info 样式系统

为了让组件样式和组件绑定，我们将样式按照组件层级拆分并于在组件导入，这很大程度上减慢了速度。

- `@vuepress/theme-default` 将所有样式放在 `styles` 文件夹中并完整导入，因此 `sass` 只需要编译一次，vite 只需要发送 1 个额外的 web 请求。这就是为什么它很快。

  但这会让样式与组件解除绑定，无论如何它们都会被注入。因此，当你覆盖组件或布局时，你必须覆盖旧样式来构建你想要的样式。

- `vuepress-theme-hope` 为组件绑定样式，但这意味着 `sass` 必须为每个组件编译样式，并且 vite 需要为每个组件发送一个额外的样式请求。由于 `vuepress-theme-hope` 与 `@vuepress/theme-default` 相比有 2 到 6 倍的组件 (取决于你是否启用博客功能) ，因此需要 `2.4s - 4s` 的额外的时间请求这些样式。

  但是，你可以通过这种方式轻松地覆盖组件及其样式。

:::

所以，由于以上原因，`vuepress-theme-hope` 与`@vuepress/theme-default` 相比，平均会有 4 倍的代码和 10 倍的请求，所以时间从 `2s` 增加到 `10s` 是合理和预期的。

::: tip 不影响 HMR 和线上速度

不用担心，上述的额外开销主要存在于 Vite 冷启动时，另外由于开发环境下未优化的代码体积较大刷新后重新相应的时间也会有一定增加。

- 这些额外开销不影响 HMR，所以编辑 Markdown 文件后，页面的 HMR 相应仍然能够保持在 100 ms 级别。

- 在构建阶段精心设计的结构会使得未使用的代码被移除，所以正式环境通常仅会比默认主题增加 200 KB - 500 KB 的 JS 入口体积和约 100 ms 的额外脚本执行时间，所以构建后影响很小。

:::

## `@import` 语法无效

在 VuePress2 中，你在 `index.scss` 中通过 `@import` 导入网络 CSS 是无效的。你可能需要在 VuePress 配置的 `head` 选项中手动导入它们。

<!-- ```ts {5-13}
import { defineUserConfig } from "vuepress-theme-hope";

export default defineUserConfig({
  head: [
    [
      "link",
      {
        rel: "preload",
        as: "style",
        onload: 'this.onload=null;this.rel="stylesheet"',
        href: "//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
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

::: info 原因

1. Sass 中通过 `@import` 导入 CSS 会被编译为标准的 CSS `@import` 语法；
1. CSS `@import` 语法仅在 CSS 文件开始生效；
1. 为了让用户样式具有更高优先级，我们会在主题和插件样式后导入用户样式；
1. 在 Vite 构建 VuePress2 App 的中，它会将所有样式压缩为单个 CSS 文件。

上述内容导致用户在 Sass 中的 CSS `@import` 导入出现在最终 CSS 文件的中间位置，进而无效。

默认主题也具有同样的问题，并且这无法在主题侧修复。

:::

::: note

Webpack 没有这个问题。

:::

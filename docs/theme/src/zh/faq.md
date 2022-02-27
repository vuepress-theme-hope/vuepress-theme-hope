---
title: 常见问题
icon: question
category:
  - FAQ
---

## 官方 QQ 群

- [点击加入](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555)

## 获得帮助

如果你遇到问题，请确保你使用最新版本并尝试删除 `node_modules` 文件夹，然后进行全新安装。

如果问题仍然存在，请在 GitHub 上[新开一个讨论](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new)，并粘贴完整的运行日志 `vuepress dev [docs -dir] --debug`，如果你的问题与显示有关，请同时提供相关截图。

如果有你不知道如何解决的问题，也欢迎你 [新开一个讨论](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new)。问题总是受欢迎的，无论**它们是否简单**。你只需要确保两点:

1. 你已经尝试过搜索相关文档。

1. 你在讨论中提供了详细的描述。

   - 如果你不知道如何配置某些内容，请描述你想要的内容、搜索的内容或你希望看到指南的哪个部分 (以便我们改进我们的文档)

   - 如果你遇到问题，请提供相关的错误日志 (通过运行 `vuepress dev <docs dir> --debug`) 和屏幕截图。

1. 你不是在问与 VuePress 无关的问题，也不是在寻求“技术支持”。

   如果你有关于 vue、typescript、sass 的学习问题，或者你不知道如何写你想要的东西，你可能需要在 vue 论坛、stackoverflow 等地方提问。 我们不期望“成为文档提供者”或“教你如何编写代码”。

   此外，对于自定义部分，我们仅提供关于 “怎样去自定义某些内容 (以何种方式)” 的支持，我们不提供 “如何自定义某些内容” (如何编写自己的代码) 的任何帮助。 除非你捐赠此项目，否则请不要为该部分寻求帮助。

如果你确定某处有问题，请在 GitHub 上 [open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new/choose) 并指出问题在完整的具体细节。

<!-- ## 不能用 Vite 构建

这是 `@vuepress/bundler-vite` 中的一个已知问题，请参阅 [Issue 585 评论](https://github.com/vuepress/vuepress-next/issues/585#issuecomment-1046064242)。

::: tip

你现在可以同时安装 `vuepress-vite` 和 `vuepress-webpack` 并使用 `vuepress-vite dev` `vuepress-webpack build` 作为解决方法。

::: -->

## Vite 冷启动速度慢

这是预期的行为。我们正在添加更多功能，这意味着根据你使用的功能，与 `@vuepress/theme-default` 相比，我们代码行数约为 2 倍到 8 倍。因此，将主题和插件代码转译并发送到浏览器预计将从 `@vuepress/theme-default` 中的 `0.8s - 2s` 增加到 `3s - 8s` (范围取决于机器性能) 。

::: tip

兄弟，你不能指望同时拥有极快的速度和强大的功能，它俩是矛盾的。

:::

此外，样式系统大大减慢了速度。

- `@vuepress/theme-default` 将所有样式放在 `styles` 文件夹中并完整导入，因此 `sass` 只需要编译一次，vite 只需要发送 1 个额外的 web 请求。这就是为什么它很快。

  但这会让样式与组件解除绑定，无论如何它们都会被注入。因此，当你覆盖组件或布局时，你必须覆盖旧样式来构建你想要的样式。

- `vuepress-theme-hope` 为组件绑定样式，但这意味着 `sass` 必须为每个组件编译样式，并且 vite 需要为每个组件发送一个额外的样式请求。由于 `vuepress-theme-hope` 与 `@vupress/theme-default` 相比有 2 到 6 倍的组件 (取决于你是否启用博客功能) ，因此需要 `2.4s - 4s` 的额外的时间请求这些样式。

  但是，你可以通过这种方式轻松地覆盖组件及其样式。

所以，由于以上原因，`vuepress-theme-hope` 与`@vuepress/theme-default` 相比，平均会有 4 倍的代码和 10 倍的请求，所以时间从 `2s` 增加到 `10s` 是合理和预期的。

::: tip

不用担心，由于网络缓存，编辑 markdown 文件时的热重载仍然很快。

:::

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

如果你在开发进程启动时看到 `xxx is not assign with a lang, and will return 'en-US'.`，请检查是否为每种语言设置了语言。

如果你只有一种语言，你仍然需要 [设置你的根目录语言](config/i18n.md#设置根目录语言)。

## 导入 Iconfont 图标无效

如果你在使用 IconFont 图标，并可以在开发服务器正常看到图标，而在部署环境失效，你可能需要检查图标的导入方式。

在 VuePress2 中，你在 `index.scss` 中通过 `@import` 导入网络 CSS 是无效的。你可能需要在 VuePress 配置的 `head` 选项中手动导入它。

```js{5,13}
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  head: [
    [
      "link",
      {
        rel: "preload",
        as: "style",
        onload: 'this.onload=null;this.rel="stylesheet"',
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  // ...
});
```

::: info 原因

1. Sass 中通过 `@import` 导入 CSS 会被编译为标准的 CSS `@import` 语法；
1. CSS `@import` 语法仅在 CSS 文件开始生效；
1. 为了让用户样式具有更高优先级，我们会在主题和插件样式后导入用户样式；
1. 在 VuePress2 的构建过程中，所有样式会被压缩为单个 CSS 文件。

上述内容导致用户在 Sass 中的 CSS `@import` 导入出现在最终 CSS 文件的中间位置，进而无效。

默认主题也具有同样的问题，并且这无法在主题侧修复。

:::

## 部分页面设置无效

你可以先查看文档以查看设置是否**不支持页面配置**。

**支持页面配置**表示主题允许页面的配置覆盖同名的全局配置 (相同功能) ，但并非所有功能都满足此设置。

::: tip

你应该了解，当某些功能的全局设置被禁用时，在准备阶段它们压根就不会加载，因此无法局部启用它们。

:::

## 代码块背景在浅色模式下看起来不正确

我想这是你的问题。请删除 `.vuepress/styles/palette.scss` 中的 `$codeBgColor`。 `vuepress-theme-hope` 的默认值为浅蓝色，而 `@vuepress/theme-default` 的默认值为深蓝色。

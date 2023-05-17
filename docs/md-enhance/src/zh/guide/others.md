---
title: 其他
icon: ellipsis
---

## 链接检查

`vuepress-plugin-md-enhance` 默认在开发模式下检查你的 Markdown 链接。

您可以通过插件选项中的 `checkLinks` 自定义此功能。 `checkLinks` 接收一个对象。

- 您可以使用 `checkLinks.status` 自定义链接检查状态，您可以在 `'always'`、`'never'`、`'dev'` 和 `'build'` 中选择。
- 要忽略某些链接，您可以将 `checkLinks.ignore` 设置为字符串和 RegExp 的数组，或者填入一个接收 link 和 isDev 作为参数并返回一个布尔值以标识是否忽略此链接的函数。

例如:

```js
export default {
  plugins: [
    mdEnhancePlugins({
      checkLinks: {
        // 仅在开发模式下检查链接
        status: "dev",
        ignore: [
          // 忽略以 `/api/` 开头的链接
          /^\/api\//,
          // 忽略 `/playground.html`
          "/playground.html",
        ],
      },
    }),
  ],
};
```

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们提供了一个 `gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: note

自定义容器在 `@vuepress/theme-default` 和 `vuepress-theme-hope` 中默认启用，但在 GitHub Markdown 预览中不可用。

:::

## v-pre

由于 VuePress2 已经在 `@vuepress/core` 中移除了 V1 的 v-pre 容器，插件提供了一个选项支持它。也就是你可以在下面的容器中使用任何 Mustache 语法。

```md
::: v-pre

{{ abc }}

:::
```

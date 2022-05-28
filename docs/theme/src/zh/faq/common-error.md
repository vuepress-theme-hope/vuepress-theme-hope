---
title: 常见错误
icon: warn
category:
  - FAQ
---

## `TypeError: Invalid value used as weak map key`

如果你遇到这样的错误，你可能在项目中使用了非标准标签。

有像 `<center>` 或 `<font>` 这样的标签，它们在 HTML1.0 规范中，但自 1999 年发布的 HTML4.0 以来被标记为不推荐，然后在 2008 年的 HTML5 版本中被删除。所以 Vue 在默认设置下不允许你使用它们。 你应当移除它们并使用标准的 HTML5 标签。

如果要删除它们，请使用 `--debug` Flag 运行主题，你将收到警告日志，告诉你可能无法识别的标签。

如果你仍然想使用它们，请查看 [此处](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E9%9D%9E%E6%A0%87%E5%87%86%E7%9A%84-html-%E6%A0%87%E7%AD%BE) 以获得解决方法。

## `Hydration completed but contains mismatches.`

这个错误表明你遇到了 SSR 错配，而且这应该不是主题的问题。

请首先检查你是否在使用 CloudFlare 相关服务，如果有，请确保你关闭静态资源压缩。方法: [dash.cloudflare.com](https://dash.cloudflare.com) → 网站 → `域名` → 速度 → 优化 → Auto Minify，关闭 JavaScript 和 HTML 即可。

::: warning

CloudFlare 的 Auto Minify 会错误的对 HTML 的空格和换行进行处理，这会导致 Vue 在初始化时产生 SSR 错配。

:::

另外你还可以检查:

- 如果你只是在个别页面遇到了这个问题，请检查该界面是否有你额外添加的组件。

  如果有，那这些组件大概率在 SSR 和客户端拥有不同的渲染结果，你可以尝试让其行为一致，或用 `@vuepress/client` 提供的 `<ClientOnly />` 组件包裹你的组件。

- 如果你在所有页面都遇到了这个问题，请同样按照上一步检查你在布局或全局组件中添加的组件。

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

如果你在开发进程启动时看到 `xxx is not assign with a lang, and will return 'en-US'.`，请检查是否为每种语言设置了语言。

即使你只有一种语言，你仍然需要 [设置你的根目录语言](../config/i18n.md#设置语言)。

## `useXXX() is called without provider`

此类错误通常是因为项目中错误的含有多个 `@vue/xxx`, `@vuepress/xxx`, `vue` 或 `vue-router` 版本引起的。

请确保你正在使用最新的 `vuepress` 和 `vuepress-theme-hope` 版本:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add vuepress@next vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next
```

:::

同时，升级依赖以确保你的项目只包含单个版本的相关包:

::: code-tabs#shell

@tab pnpm

```bash
pnpm i && pnpm up
```

@tab yarn

```bash
yarn && yarn upgrade
```

@tab npm

```bash
npm i && npm update
```

:::

## 部分页面设置无效

你可以先查看文档以查看设置是否**不支持页面配置**。

**支持页面配置**表示主题允许页面的配置覆盖同名的全局配置 (相同功能) ，但并非所有功能都满足此设置。

::: tip

你应该了解，当某些功能的全局设置被禁用时，在准备阶段它们压根就不会加载，因此无法局部启用它们。

:::

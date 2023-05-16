---
title: 常见错误
icon: triangle-exclamation
category:
  - FAQ
---

## `useXXX() is called without provider`

此类错误通常是因为项目中错误的含有多个 `@vue/xxx`, `@vuepress/xxx`, `vue` 或 `vue-router` 版本引起的。

请确保你正在使用最新的 `vuepress` 和 `vuepress-theme-hope` 版本:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add @vuepress/client@next vuepress@next vuepress-theme-hope vue@latest -E
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@latest -E
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@latest -E
```

:::

同时，升级依赖以确保你的项目只包含单个版本的相关包:

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::

::: warning

任何以 `@vuepress/` 开头的官方包应该和 VuePress 保持相同版本。

比如，如果你正在使用 `@vuepress/plugin-search` 和 `@vuepress/utils`，你应该确保他们和 `vuepress` 版本相同。

另外，`vuepress-theme-hope` 仓库的插件应与 `vuepress-theme-hope` 版本相同。

此外，如果你使用了其他第三方插件，请确保它兼容你要升级到的 VuePress 版本。

:::

## `[Vue warn]: Failed to resolve component: XXX`

如果你遇到这样的错误，你可能在项目中使用了非标准标签。

有像 `<center>` 或 `<font>` 这样的标签，它们在 HTML1.0 规范中，但自 1999 年发布的 HTML4.0 以来被标记为不推荐，然后在 2008 年的 HTML5 版本中被删除。所以 Vue 在默认设置下不允许你使用它们。 你应当移除它们并使用标准的 HTML5 标签。

如果要删除它们，请使用 `--debug` Flag 运行主题，你将收到警告日志，告诉你可能无法识别的标签。

如果你仍然想使用它们，请查看 [此处](https://vuejs.press/zh/guide/markdown.html#%E9%9D%9E%E6%A0%87%E5%87%86%E7%9A%84-html-%E6%A0%87%E7%AD%BE) 以获得解决方法。

## `Hydration completed but contains mismatches.`

这个错误表明你遇到了 SSR 错配，而且这应该不是主题的问题。

请首先检查你是否在使用 CloudFlare 相关服务，如果有，请确保你关闭静态资源压缩。方法: [dash.cloudflare.com](https://dash.cloudflare.com) → 网站 → `域名` → 速度 → 优化 → Auto Minify，关闭 JavaScript 和 HTML 即可。

::: warning

CloudFlare 的 Auto Minify 会错误的对 HTML 的空格和换行进行处理，这会导致 Vue 在初始化时产生 SSR 错配。

:::

另外你还可以检查:

- 如果你只是在个别页面遇到了这个问题，请检查该界面是否有你额外添加的组件。

  如果有，那这些组件大概率在 SSR[^ssr] 和 CSR[^csr] 拥有不同的渲染结果，你可以尝试让其行为一致，或用 `@vuepress/client` 提供的 `<ClientOnly />` 组件包裹你的组件。

[^ssr]: **SSR**: **S**erver **S**ide **R**endering，服务端渲染
[^csr]: **CSR**: **C**lient **S**ide **R**endering，客户端渲染

- 如果你在所有页面都遇到了这个问题，请同样按照上一步检查你在布局或全局组件中添加的组件。

## `You are not allowed to use plugin XXX yourself in vuepress config file.`

这意味着你在 VuePress 配置文件中自己调用主题捆绑插件。

大多数情况下，当你将一些插件与主题一起使用时，主题会自动为你处理一些插件选项，所以当你想自定义这些插件时，你应该在主题选项下的 `plugin.PLUGIN_NAME` 中将它们的选项设置为 让主题为你调用这些插件。详见 [插件配置](../config/plugins/intro.md)。

## `FATAL ERROR: XXX - JavaScript heap out of memory`

这意味着你的 Node.js 的 `max_old_space_size` 设置太小而无法构建此应用程序。 你可以尝试通过设置 `NODE_OPTIONS` 环境变量来增加 `max_old_space_size`。

`max_old_space_size` 以 MB 为单位，默认情况下 `max_old_space_size` 是机器内存大小的一半。该值可以大于你机器的实际内存大小。

- 对于小型项目，通常不会超过 2 GB (2048 MB)。
- 对于大型项目，通常不会超过 4 GB (4048 MB)
- 如果你在大型网站上同时启用博客功能和大量 Markdown 增强功能，通常不会超过 8 GB (8192 MB)

::: details 增加方法

使用 GitHub 工作流时，在你的工作流文件中设置 `env`:

```diff
  - name: Build project
+   env:
+     NODE_OPTIONS: --max_old_space_size=8192
    run: pnpm run build
```

在 Windows，你可以参考 [此指南](https://blog.csdn.net/weixin_37204973/article/details/82504570).

:::

## `xxx isn't assign with a lang, and will return 'en-US' instead.`

如果你在开发进程启动时看到 `xxx is not assign with a lang, and will return 'en-US'.`，请检查是否为每种语言设置了语言。

即使你只有一种语言，你仍然需要 [设置你的根目录语言](../config/i18n.md#设置语言)。

## `xxx is missing sidebar config.`

使用对象格式侧边栏配置意味着你想根据路由设置不同的侧边栏。

- 如果你想避免这个警告，你需要为当前语言根路径添加侧边栏配置，因为所有页面都会回退到那个配置。
- 如果你想在当前路由中禁用侧边栏，请在 frontmatter 中设置 `sidebar: false`。
- 如果要在当前文件夹中禁用侧边栏，请在侧边栏配置中添加 `[当前文件夹路由]: false`。
- 如果你想告诉主题你仅在设置的路由中需要侧边栏，请在侧边栏配置中添加 `[当前语言根路径]: false` 以告诉主题侧边栏配置默认禁用。

## 热更新在开发服务器中不工作

某些配置对开发服务器有高性能影响，因此默认情况下禁用它们的热重载，你可以通过在主题选项中设置 `hotReload: true` 手动开启。

其中包括博客的类别和标签、结构化侧边栏和基于 git 的信息。

## 部分页面设置无效

你可以先查看文档以查看设置是否**不支持页面配置**。

**支持页面配置**表示主题允许页面的配置覆盖同名的全局配置 (相同功能) ，但并非所有功能都满足此设置。

::: tip

你应该了解，当某些功能的全局设置被禁用时，在准备阶段它们压根就不会加载，因此无法局部启用它们。

:::

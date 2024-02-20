---
title: 常见错误
icon: triangle-exclamation
order: 3
category:
  - FAQ
---

## `useXXX() is called without provider`

此类错误通常是因为项目中错误的含有多个 `vue` 或 `vuepress` 版本引起的。

请确保你正在使用最新的 `vuepress` 和 `vuepress-theme-hope` 版本并且升级依赖以确保你的项目只包含单个版本的相关包。你可以使用 `vp-update` 命令来升级你的依赖。

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

## `Issues with peer dependencies found`

这意味着你在项目中安装了错误的依赖。

这是一个例子:

```
 WARN  Issues with peer dependencies found
.
├─┬ @vuepress/plugin-docsearch 2.0.0-rc.7
│ └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
├─┬ vuepress-plugin-append-date 2.0.0-rc.20
│ ├── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
│ ├─┬ @vuepress/helper 2.0.0-rc.9
│ │ └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
│ └─┬ vuepress-shared 2.0.0-rc.20
│   └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
├─┬ @vuepress/plugin-git 2.0.0-rc.7
│ └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
├─┬ vuepress 2.0.0-rc.5
│ └── ✕ unmet peer @vuepress/bundler-vite@2.0.0-rc.5: found 2.0.0-rc.4
└─┬ vuepress-theme-hope 2.0.0-rc.21
  └── ✕ unmet peer @vuepress/plugin-docsearch@2.0.0-rc.10: found 2.0.0-rc.7
```

例子显示:

- `vuepress` 需要一个与自己相同版本的 `@vuepress/bundler-vite`，但是你拥有 `rc.4` 版本的打包器和 `rc.5` 版本的 vuepress。

- Some of the plugin requires `vuepress@2.0.0-rc.2`.

- 一些插件要求 `vuepress@2.0.0-rc.2`，但你当前是 `2.0.0-rc.5`。

你总可以编辑你的依赖版本以使它们相互匹配。通常你会尝试将 vuepress、vuepress 打包器和插件升级到最新版本，但也有可能插件尚未兼容最新版本的 vuepress。在这种情况下，你应该将 vuepress 降级到与插件兼容的版本，或者暂时删除插件直到它支持最新的 vuepress。

## `You are not allowed to use plugin XXX yourself in vuepress config file.`

这意味着你在 VuePress 配置文件中自己调用主题捆绑插件。

- 大多数情况下，当你将一些插件与主题一起使用时，主题会自动为你处理一些插件选项，
- 部分插件是主题必须的，如果你没有启用主题需要的功能，主题会发生错误。

所以当你想自定义这些插件时，你应该在主题选项下的 `plugin.PLUGIN_NAME` 中设置它们的选项，让主题为你调用这些插件。

主题所有的插件详见 [主题插件](../config/plugins/intro.md)。

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

## `xxx is not installed`

为了加快主题和插件的安装速度，我们将体积较大的依赖设置为可选，这意味着当你使用的功能需要这样的依赖时，你需要手动安装对应的依赖。

直接通过当前的包管理器在项目中安装它们即可:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D xxx
```

@tab yarn

```bash
yarn add -D xxx
```

@tab:active npm

```bash
npm i -D xxx
```

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

为了调试这个问题，设置 `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` 为 `true`，这样你就可以在浏览器控制台中看到错误的详细信息。

另外你还可以检查:

如果一个组件件大概率在 SSR[^ssr] 和 CSR[^csr] 拥有不同的渲染结果，你可以用 `vuepress/client` 提供的 `<ClientOnly />` 组件包裹你的组件。

[^ssr]: **SSR**: **S**erver **S**ide **R**endering，服务端渲染
[^csr]: **CSR**: **C**lient **S**ide **R**endering，客户端渲染

## 热更新在开发服务器中不工作

某些配置对开发服务器有高性能影响，因此默认情况下禁用它们的热重载，你可以通过在主题选项中设置 `hotReload: true` 手动开启。

其中包括博客的类别和标签、结构化侧边栏和基于 git 的信息。

## 部分页面设置无效

你可以先查看文档以查看设置是否**不支持页面配置**。

**支持页面配置**表示主题允许页面的配置覆盖同名的全局配置 (相同功能) ，但并非所有功能都满足此设置。

::: tip

你应该了解，当某些功能的全局设置被禁用时，在准备阶段它们压根就不会加载，因此无法局部启用它们。

:::

## 样式出现问题

为了支持 RTL 布局以及减少样式体积，主题使用较新的 CSS，比如 `padding-inline` `margin-block` `inset-inline-start` 等。

最低支持它们的版本是:

- Chrome >= 87
- Edge >= 87
- Firefox >= 66
- Safari >= 14.1

如果你需要对更低版本的浏览器提供支持，你可以使用 `postcss-preset-env` 兼容到你设置的环境:

::: code-tabs#bundler

@tab Vite

```ts title=".vuepress/config.ts"
import { addViteConfig } from "@vuepress/helper";
import postcssPresetEnv from "postcss-preset-env";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsBundlerOptions: (config, app) => {
    addViteConfig(bundlerOptions, app, {
      css: {
        postcss: {
          plugins: [postcssPresetEnv()],
        },
      },
    });
  },
});
```

@tab Webpack

```ts title=".vuepress/config.ts"
import { addViteConfig } from "@vuepress/helper";
import postcssPresetEnv from "postcss-preset-env";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsBundlerOptions: (config, app) => {
    configWebpack(bundlerOptions, app, (config) => {
      (((config.postcss ??= {}).postcssOptions ??= {}).plugins ??= []).push(
        postcssPresetEnv(),
      );
    });
  },
});
```

:::

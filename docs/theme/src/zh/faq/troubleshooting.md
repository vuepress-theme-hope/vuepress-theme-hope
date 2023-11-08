---
title: 故障排查
icon: square-check
category:
  - FAQ
---

## 确认使用正确的环境

`vuepress-theme-hope` 仅支持 `>=18.16.0` 版本的 Node.js。

你可以通过 `node -v` 查看它的版本，如果不满足要求，请 [下载并安装 LTS 版本的 Node.js](../get-started/env.md#nodejs)。

同时，你应该使用满足下方要求的包管理器 (推荐 `pnpm@8`):

- pnpm: >= 7

  检查: `pnpm -v`

  安装: `npm i -g pnpm`

- npm: >= 8

  检查: `npm -v`

  安装: `npm i -g npm`

- yarn: >= 2

  检查: `yarn -v`

  安装: `npm i -g yarn@2`

## 确定使用最新版本与正确的依赖树

请确保你在使用最新的 `vuepress` 和 `vuepress-theme-hope` V2 版本，因为一些你遇到的 bug 可能已经在新版本中修复。

另外在一些情况下，你可能会在升级某些依赖后生成错误的依赖树，这是因为 `vuepress` 和 `vue` 都由很多名为 `@vuepress/xxx` 和 `@vue/xxx` 的包构成。

为了让 VuePress 正确工作，在整个项目中，应该只能存在一个版本的 `@vuepress/xxx` `@vue/xxx` `vue` 与 `vue-router`。多个版本的包会导致应用的不同部分在使用不同的 Vue 与对应包实例，进而引发如 `useXXX() is called without provider` 之类的错误。

::: warning

任何以 `@vuepress/` 开头的官方包应该和 VuePress 保持相同版本。

比如，如果你正在使用 `@vuepress/plugin-search` 和 `@vuepress/utils`，你应该确保他们和 `vuepress` 版本相同

另外，如果你使用了其他第三方插件，请确保它兼容你要升级到的 VuePress 版本。

:::

你可以通过执行下列命令来更新到最新版本。

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

## 确认配置正确

请确认你的配置文件没有出现错误 (如红色波浪线)，如果有，请根据提示修改配置文件直至你正确配置了 VuePress 与主题。

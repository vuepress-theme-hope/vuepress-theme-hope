---
title: 故障排查
icon: square-check
order: 2
category:
  - FAQ
---

## 确认使用正确的环境

`vuepress-theme-hope` 仅支持 `^18.19.0 || >= 20.6.0` 版本的 Node.js。

你可以通过 `node -v` 查看它的版本，如果不满足要求，请 [下载并安装 LTS 版本的 Node.js](../get-started/env.md#nodejs)。

同时，你应该使用满足下方要求的包管理器 (推荐 `pnpm@10`):

- pnpm: >= 7

  检查: `pnpm -v`

- npm: >= 8

  检查: `npm -v`

- yarn: >= 2

  检查: `yarn -v` (同时需要在 `.yarnrc.yml` 中设置 `nodeLinker: 'node-modules'`)

想要使用正确的包管理器，运行 `corepack enable` (在 Windows 上可能需要以管理员身份运行)，然后运行下列命令之一:

- npm: `corepack use npm@10`
- yarn: `corepack use yarn@4`
- pnpm: `corepack use pnpm@9`

## 确定使用最新版本与正确的依赖树

请确保你在使用最新的 `vuepress` ，插件以及 `vuepress-theme-hope` V2 版本，因为一些你遇到的 bug 可能已经在新版本中修复。

另外在一些情况下，你可能会在升级某些依赖后生成错误的依赖树。为了让 VuePress 正确工作，在整个项目中，应该只能存在一个版本的 `vue` 和 `vuepress`。多个版本的包会导致应用的不同部分在使用不同的包，进而引发如 `useXXX() is called without provider` 之类的错误。

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
